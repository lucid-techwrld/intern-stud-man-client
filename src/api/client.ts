const BASE = import.meta.env.VITE_API_URL ?? '/api';

export class ApiError extends Error {
  constructor(public status: number, message: string, public errors: Record<string, string> = {}) {
    super(message);
  }
}

export const apiClient = {
  async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    let res: Response;
    try {
      res = await fetch(`${BASE}${path}`, {
        ...init,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'fetch', ...init.headers },
      });
    } catch {
      throw new ApiError(0, 'Can\u2019t connect right now. Please try again in a moment.');
    }
    if (res.status === 204) return undefined as T;
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (res.status === 401 && !path.startsWith('/auth/')) window.dispatchEvent(new Event('auth:expired'));
      throw new ApiError(res.status, body.message ?? 'Something went wrong. Please try again.', body.errors ?? {});
    }
    return body as T;
  },
};
