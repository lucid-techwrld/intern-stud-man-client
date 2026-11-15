import { BookOpen, GraduationCap, UserCheck } from 'lucide-react';
import { IStats } from '../types';

export function Hero({ stats }: { stats: IStats | null }) {
  const top = (stats?.by_course ?? []).slice(0, 4);
  const max = Math.max(1, ...top.map((c) => c.count));
  const tiles = [
    { icon: UserCheck, label: 'Active students', value: stats?.active, tone: 'o' },
    { icon: GraduationCap, label: 'Graduated', value: stats?.graduated, tone: 'g' },
    { icon: BookOpen, label: 'Courses', value: stats?.courses, tone: '' },
  ];
  return (
    <>
      <section className="hero">
        <div>
          <h1>Student register</h1>
          <p>Everyone enrolled, all in one place. Add, update and review records in seconds.</p>
          <div className="big"><b>{stats?.total ?? '–'}</b><span>students enrolled</span></div>
        </div>
        <div className="mini">
          <h3>Enrollment by course</h3>
          {top.length === 0 && <p style={{ margin: 0, fontSize: 13 }}>No enrollments yet.</p>}
          {top.map((c) => (
            <div className="crs" key={c.course}><span>{c.course}</span><div className="bar"><i style={{ width: `${(c.count / max) * 100}%` }} /></div><b>{c.count}</b></div>
          ))}
        </div>
      </section>
      <section className="stats" aria-label="Summary">
        {tiles.map(({ icon: Icon, label, value, tone }) => (
          <div className="stat" key={label}><span className={`ic ${tone}`}><Icon size={22} /></span><div><b>{value ?? '–'}</b><small>{label}</small></div></div>
        ))}
      </section>
    </>
  );
}
