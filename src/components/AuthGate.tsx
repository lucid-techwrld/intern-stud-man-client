import { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import Login from './Login';

export function AuthGate({ children }: { children: ReactNode }) {
  const { status } = useAuth();
  if (status === 'loading') return <div className="boot" aria-busy="true"><span className="spin" /></div>;
  return status === 'authed' ? <>{children}</> : <Login />;
}
