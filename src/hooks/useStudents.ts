import { useCallback, useEffect, useState } from 'react';
import { studentsApi } from '../api/students';
import { PAGE_SIZE } from '../constants';
import { IListQuery, IMeta, IStats, IStudent, IStudentInput } from '../types';
import { errMsg } from '../utils';

export function useStudents() {
  const [query, setQuery] = useState<IListQuery>({ q: '', course: '', status: '', page: 1, limit: PAGE_SIZE });
  const [rows, setRows] = useState<IStudent[]>([]);
  const [meta, setMeta] = useState<IMeta>({ page: 1, limit: PAGE_SIZE, total: 0 });
  const [stats, setStats] = useState<IStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [list, st] = await Promise.all([studentsApi.list(query), studentsApi.stats()]);
      if (list.data.length === 0 && query.page > 1) { setQuery((q) => ({ ...q, page: q.page - 1 })); return; }
      setRows(list.data);
      setMeta(list.meta);
      setStats(st);
    } catch (e) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => { void load(); }, [load]);

  const updateQuery = (patch: Partial<IListQuery>) => setQuery((q) => ({ ...q, ...patch }));
  const create = async (input: IStudentInput) => {
    await studentsApi.create(input);
    if (query.page !== 1) updateQuery({ page: 1 }); else await load();
  };
  const update = async (id: number, input: IStudentInput) => { await studentsApi.update(id, input); await load(); };
  const remove = async (id: number) => { await studentsApi.remove(id); await load(); };

  return { query, updateQuery, rows, meta, stats, loading, error, reload: load, create, update, remove };
}
