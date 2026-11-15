import { useId } from 'react';

export function Logo({ size = 38 }: { size?: number }) {
  const gid = 'lg' + useId().replace(/:/g, '');
  return (
    <span className="logo-lockup">
      <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden="true">
        <defs><linearGradient id={gid} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2B44FF" /><stop offset="1" stopColor="#8B3DFF" /></linearGradient></defs>
        <rect width="40" height="40" rx="11" fill={`url(#${gid})`} />
        <path d="M20 9 34 16 20 23 6 16z" fill="#fff" />
        <path d="M12 21v5c0 2.6 3.6 4.6 8 4.6s8-2 8-4.6v-5l-8 4.2z" fill="#fff" opacity=".85" />
        <path d="M34 16v9" stroke="#FFC53D" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="34" cy="27" r="2.6" fill="#FFC53D" />
      </svg>
      <span className="wm">Registrar</span>
    </span>
  );
}
