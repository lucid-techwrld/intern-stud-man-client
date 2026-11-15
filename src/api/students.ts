import { IListQuery, IMeta, IStats, IStudent, IStudentInput } from '../types';
import { apiClient } from './client';

export const studentsApi = {
  async list(q: IListQuery): Promise<{ data: IStudent[]; meta: IMeta }> {
    const params = new URLSearchParams();
    (Object.entries(q) as [string, string | number][]).forEach(([k, v]) => { if (v !== '' && v !== undefined) params.set(k, String(v)); });
    return apiClient.request(`/students?${params}`);
  },
  async stats(): Promise<IStats> {
    return (await apiClient.request<{ data: IStats }>('/students/stats')).data;
  },
  async create(input: IStudentInput): Promise<IStudent> {
    return (await apiClient.request<{ data: IStudent }>('/students', { method: 'POST', body: JSON.stringify(input) })).data;
  },
  async update(id: number, input: IStudentInput): Promise<IStudent> {
    return (await apiClient.request<{ data: IStudent }>(`/students/${id}`, { method: 'PUT', body: JSON.stringify(input) })).data;
  },
  async remove(id: number): Promise<void> {
    await apiClient.request<void>(`/students/${id}`, { method: 'DELETE' });
  },
};
