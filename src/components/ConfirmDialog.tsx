import { Modal } from './ui';

interface Props { open: boolean; title: string; message: string; confirmLabel: string; onClose: () => void; onConfirm: () => void }

export function ConfirmDialog({ open, title, message, confirmLabel, onClose, onConfirm }: Props) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="db"><p style={{ margin: 0, color: 'var(--mute)' }}>{message}</p>
        <div className="foot"><button className="btn ghost" onClick={onClose}>Keep it</button><button className="btn danger" onClick={onConfirm}>{confirmLabel}</button></div></div>
    </Modal>
  );
}
