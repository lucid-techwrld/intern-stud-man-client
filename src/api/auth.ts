import { apiClient } from './client';

export const authApi = {
  login: (email: string, password: string) =>
    apiClient.request<{ data: { email: string } }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => apiClient.request<void>('/auth/logout', { method: 'POST' }),
  me: () => apiClient.request<{ data: { email: string } }>('/auth/me'),
};
