import { IStudent } from '../types';
import { Avatar, StatusBadge } from './ui';

export function StudentCard({ student: s, onOpen }: { student: IStudent; onOpen: () => void }) {
  return (
    <button className="scard" onClick={onOpen}>
      <div className="hd"><Avatar id={s.id} first={s.first_name} last={s.last_name} /><div style={{ minWidth: 0 }}><b>{s.first_name} {s.last_name}</b><span className="mt">{s.student_code}</span></div></div>
      <div className="ft"><span className="pill">{s.course}</span><span className="mt">Year {s.year}</span><StatusBadge status={s.status} /></div>
    </button>
  );
}
