import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { COURSES, STATUSES } from '../constants';
import { IListQuery } from '../types';

interface Props { query: IListQuery; onChange: (patch: Partial<IListQuery>) => void }

export function Filters({ query, onChange }: Props) {
  const [text, setText] = useState(query.q);
  useEffect(() => {
    const t = setTimeout(() => { if (text !== query.q) onChange({ q: text, page: 1 }); }, 250);
    return () => clearTimeout(t);
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="toolbar">
      <div className="search"><Search size={18} /><input value={text} onChange={(e) => setText(e.target.value)} placeholder="Search name, email or student ID" aria-label="Search students" /></div>
      <select className="select" value={query.course} onChange={(e) => onChange({ course: e.target.value, page: 1 })} aria-label="Course">
        <option value="">All courses</option>{COURSES.map((c) => <option key={c}>{c}</option>)}
      </select>
      <div className="tabs" role="tablist">
        {['', ...STATUSES].map((s) => <button key={s} role="tab" aria-selected={query.status === s} onClick={() => onChange({ status: s, page: 1 })}>{s || 'All'}</button>)}
      </div>
    </div>
  );
}
