export type Status = 'Active' | 'Graduated' | 'Suspended' | 'Deferred';

export interface IStudent {
  id: number; student_code: string; first_name: string; last_name: string; email: string; phone: string | null;
  dob: string; course: string; year: number; status: Status; created_at: string;
}
export type IStudentInput = Omit<IStudent, 'id' | 'student_code' | 'created_at'>;
export interface IStats { total: number; active: number; graduated: number; courses: number; by_course: { course: string; count: number }[] }
export interface IMeta { page: number; limit: number; total: number }
export interface IListQuery { q: string; course: string; status: string; page: number; limit: number }
