import { CSSProperties, useState } from 'react';

const BASE = 'https://api.dicebear.com/9.x/lorelei/svg';

interface Props { seed: string; className?: string; fallback?: string; style?: CSSProperties }

export function Face({ seed, className = 'av', fallback = '', style }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className={className} style={style}>{fallback}</span>;
  return (
    <img
      className={className}
      src={`${BASE}?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear&backgroundColor=ffd5dc,c0aede,b6e3f4,d1d4f9,ffdfbf`}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
