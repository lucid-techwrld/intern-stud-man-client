import { Moon, Plus, Sun } from 'lucide-react';
import { useState } from 'react';
import { ConfirmDialog } from './components/ConfirmDialog';
import { Filters } from './components/Filters';
import { Logo } from './components/Logo';
import { Hero } from './components/Hero';
import { UserMenu } from './components/UserMenu';
import { StudentCard } from './components/StudentCard';
import { StudentDrawer } from './components/StudentDrawer';
import { StudentFormDialog } from './components/StudentFormDialog';
import { EmptyState, ErrorBanner, Pagination } from './components/ui';
import { useStudents } from './hooks/useStudents';
import { useTheme } from './hooks/useTheme';
import { useToast } from './hooks/useToast';
import { IStudent, IStudentInput } from './types';
import { errMsg } from './utils';

export default function App() {
  const s = useStudents();
  const toast = useToast();
  const { theme, toggle } = useTheme();
  const [form, setForm] = useState<{ open: boolean; student: IStudent | null }>({ open: false, student: null });
  const [view, setView] = useState<IStudent | null>(null);
  const [del, setDel] = useState<IStudent | null>(null);

  const submit = async (input: IStudentInput) => {
    if (form.student) await s.update(form.student.id, input); else await s.create(input);
    toast(form.student ? 'Changes saved' : 'Student added');
    setForm((f) => ({ ...f, open: false }));
  };
  const confirmDelete = async () => {
    if (!del) return;
    try { await s.remove(del.id); toast('Student deleted'); } catch (e) { toast(errMsg(e)); }
    setDel(null); setView(null);
  };

  return (
    <>
      <header className="top">
        <div className="in">
          <Logo />
          <div className="acts">
            <UserMenu compact />
            <button className="icon-btn" onClick={toggle} aria-label="Toggle theme">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
            <button className="btn" onClick={() => setForm({ open: true, student: null })}><Plus size={18} /><span className="t">Add student</span></button>
          </div>
        </div>
      </header>
      <div className="wrap">
        <Hero stats={s.stats} />
        <Filters query={s.query} onChange={s.updateQuery} />
        {s.error && <ErrorBanner message={s.error} />}
        <div className="grid" aria-busy={s.loading}>
          {s.loading && s.rows.length === 0 && Array.from({ length: 6 }, (_, i) => <div className="skeleton" key={i} />)}
          {!s.loading && s.rows.length === 0 && <EmptyState title="No students found" text="Clear the filters or add a new student." />}
          {s.rows.map((st) => <StudentCard key={st.id} student={st} onOpen={() => setView(st)} />)}
        </div>
        <Pagination meta={s.meta} onPage={(page) => s.updateQuery({ page })} />
      </div>
      <StudentDrawer student={view} onClose={() => setView(null)} onEdit={(st) => { setView(null); setForm({ open: true, student: st }); }} onDelete={setDel} />
      <StudentFormDialog open={form.open} student={form.student} onClose={() => setForm((f) => ({ ...f, open: false }))} onSubmit={submit} />
      <ConfirmDialog open={!!del} title="Delete student?" message={del ? `${del.first_name} ${del.last_name} (${del.student_code}) will be removed permanently.` : ''} confirmLabel="Delete student" onClose={() => setDel(null)} onConfirm={confirmDelete} />
    </>
  );
}
