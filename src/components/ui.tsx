import { AlertTriangle, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ReactNode, useEffect, useRef } from 'react';
import { IMeta, Status } from '../types';
import { HUES, initials } from '../utils';
import { Face } from './Face';

export function Modal({ open, onClose, title, children, sheet }: { open: boolean; onClose: () => void; title: string; children: ReactNode; sheet?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} className={sheet ? 'sheet' : ''} onClose={onClose} onClick={(e) => { if (e.target === ref.current) onClose(); }}>
      <div className="dh"><h3>{title}</h3><button className="icon-btn" onClick={onClose} aria-label="Close"><X size={18} /></button></div>
      {open && children}
    </dialog>
  );
}

export function PageHeader({ title, sub, action }: { title: string; sub: string; action?: ReactNode }) {
  return <div className="ph"><div><h1>{title}</h1><p>{sub}</p></div>{action && <div className="acts">{action}</div>}</div>;
}

export function Field({ label, error, className, children }: { label: string; error?: string; className?: string; children: ReactNode }) {
  return <label className={className}>{label}{children}<span className="err">{error}</span></label>;
}

export function ErrorBanner({ message }: { message: string }) {
  return message ? <div className="banner w" role="alert"><AlertTriangle size={18} />{message}</div> : null;
}

export function Skeletons({ n = 4 }: { n?: number }) {
  return <>{Array.from({ length: n }, (_, i) => <div className="skeleton" key={i} />)}</>;
}

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`badge ${status}`}>{status}</span>;
}

export function Avatar({ id, first, last, large }: { id: number; first: string; last: string; large?: boolean }) {
  return (
    <Face
      seed={`${first} ${last}`}
      className={`av ${large ? 'lg' : ''}`}
      fallback={initials(first, last)}
      style={{ background: `linear-gradient(135deg, hsl(${HUES[id % 6]} 70% 52%), hsl(${HUES[id % 6] + 30} 70% 40%))` }}
    />
  );
}

export function EmptyState({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return (
    <div className="empty">
      <svg viewBox="0 0 160 120" width="160" height="120" aria-hidden="true">
        <ellipse cx="80" cy="108" rx="62" ry="7" fill="var(--soft)" />
        <path d="M80 22 22 48l58 26 58-26z" fill="var(--soft)" stroke="var(--brand)" strokeWidth="3" strokeLinejoin="round" />
        <path d="M46 60v22c0 8 15 16 34 16s34-8 34-16V60" fill="none" stroke="var(--brand)" strokeWidth="3" strokeLinecap="round" />
        <path d="M138 48v28" stroke="#FFC53D" strokeWidth="4" strokeLinecap="round" /><circle cx="138" cy="82" r="6" fill="#FFC53D" />
      </svg>
      <h3>{title}</h3><p style={{ margin: 0 }}>{text}</p>{action}
    </div>
  );
}

export function Pagination({ meta, onPage }: { meta: IMeta; onPage: (p: number) => void }) {
  if (meta.total === 0) return null;
  const pages = Math.max(1, Math.ceil(meta.total / meta.limit));
  const from = (meta.page - 1) * meta.limit + 1;
  return (
    <div className="pager">
      <span>{from}–{Math.min(meta.total, from + meta.limit - 1)} of {meta.total}</span>
      <div>
        <button className="btn ghost sm" disabled={meta.page <= 1} onClick={() => onPage(meta.page - 1)} aria-label="Previous page"><ChevronLeft size={16} /></button>
        <button className="btn ghost sm" disabled={meta.page >= pages} onClick={() => onPage(meta.page + 1)} aria-label="Next page"><ChevronRight size={16} /></button>
      </div>
    </div>
  );
}
