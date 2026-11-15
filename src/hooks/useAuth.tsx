import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { authApi } from '../api/auth';
import { ADMIN_EMAIL } from '../constants';

type Status = 'loading' | 'guest' | 'authed';
interface AuthValue { status: Status; email: string; login: (password: string) => Promise<void>; logout: () => Promise<void> }

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ status: Status; email: string }>({ status: 'loading', email: '' });

  useEffect(() => {
    authApi.me().then((r) => setState({ status: 'authed', email: r.data.email })).catch(() => setState({ status: 'guest', email: '' }));
    const expire = () => setState({ status: 'guest', email: '' });
    window.addEventListener('auth:expired', expire);
    return () => window.removeEventListener('auth:expired', expire);
  }, []);

  const login = async (password: string) => {
    const r = await authApi.login(ADMIN_EMAIL, password);
    setState({ status: 'authed', email: r.data.email });
  };
  const logout = async () => {
    try { await authApi.logout(); } catch { /* the session is dropped locally either way */ }
    setState({ status: 'guest', email: '' });
  };

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
