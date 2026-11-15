import { ChangeEvent, FormEvent, useState } from 'react';
import { COURSES, STATUSES } from '../constants';
import { IStudent, IStudentInput, Status } from '../types';
import { splitError } from '../utils';
import { ErrorBanner, Field, Modal } from './ui';

interface Props { open: boolean; student: IStudent | null; onClose: () => void; onSubmit: (input: IStudentInput) => Promise<void> }

export function StudentFormDialog({ open, student, onClose, onSubmit }: Props) {
  return <Modal open={open} onClose={onClose} title={student ? 'Edit student' : 'Add a student'}><StudentForm student={student} onClose={onClose} onSubmit={onSubmit} /></Modal>;
}

function StudentForm({ student, onClose, onSubmit }: Omit<Props, 'open'>) {
  const [f, setF] = useState({
    first_name: student?.first_name ?? '', last_name: student?.last_name ?? '', email: student?.email ?? '', phone: student?.phone ?? '',
    dob: student?.dob ?? '', course: student?.course ?? COURSES[0], year: String(student?.year ?? 1), status: (student?.status ?? 'Active') as Status,
  });
  const [err, setErr] = useState<Record<string, string>>({});
  const [banner, setBanner] = useState('');
  const [saving, setSaving] = useState(false);
  const set = (k: keyof typeof f) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!f.first_name.trim()) er.first_name = 'Enter a first name';
    if (!f.last_name.trim()) er.last_name = 'Enter a last name';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = 'Enter a valid email address';
    if (!f.dob) er.dob = 'Pick a date of birth';
    setErr(er); setBanner('');
    if (Object.keys(er).length) return;
    setSaving(true);
    try { await onSubmit({ ...f, phone: f.phone.trim() || null, year: Number(f.year) }); }
    catch (x) { const s = splitError(x); setErr(s.fields); setBanner(s.banner); } finally { setSaving(false); }
  };

  return (
    <form className="db" onSubmit={submit} noValidate>
      <ErrorBanner message={banner} />
      <Field label="First name" error={err.first_name}><input value={f.first_name} onChange={set('first_name')} autoFocus /></Field>
      <Field label="Last name" error={err.last_name}><input value={f.last_name} onChange={set('last_name')} /></Field>
      <Field label="Email" error={err.email} className="w"><input type="email" value={f.email} onChange={set('email')} /></Field>
      <Field label="Phone (optional)" error={err.phone}><input inputMode="tel" value={f.phone} onChange={set('phone')} /></Field>
      <Field label="Date of birth" error={err.dob}><input type="date" value={f.dob} onChange={set('dob')} /></Field>
      <Field label="Course"><select value={f.course} onChange={set('course')}>{COURSES.map((c) => <option key={c}>{c}</option>)}</select></Field>
      <Field label="Year"><select value={f.year} onChange={set('year')}>{[1, 2, 3, 4].map((y) => <option key={y}>{y}</option>)}</select></Field>
      <Field label="Status" className="w"><select value={f.status} onChange={set('status')}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></Field>
      <div className="foot"><button type="button" className="btn ghost" onClick={onClose}>Cancel</button><button className="btn" disabled={saving}>{saving ? 'Saving…' : 'Save student'}</button></div>
    </form>
  );
}
