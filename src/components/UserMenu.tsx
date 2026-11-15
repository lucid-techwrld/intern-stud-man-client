import { LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Face } from './Face';

export function UserMenu({ compact }: { compact?: boolean }) {
  const { email, logout } = useAuth();
  return (
    <div className={`user ${compact ? 'compact' : ''}`}>
      <Face seed={email} className="face" fallback="A" />
      <div className="meta"><b>Administrator</b><span>{email}</span></div>
      <button className="icon-btn" onClick={logout} aria-label="Sign out" title="Sign out"><LogOut size={18} /></button>
    </div>
  );
}
