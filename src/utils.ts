import { ApiError } from './api/client';

export const HUES = [225, 160, 330, 35, 265, 190];
export const initials = (first: string, last: string) => (first[0] + last[0]).toUpperCase();
export const fmtDate = (d: string) => new Date(d + 'T00:00').toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
export const errMsg = (e: unknown) => (e instanceof Error ? e.message : 'Something went wrong. Please try again.');
export const splitError = (e: unknown): { fields: Record<string, string>; banner: string } =>
  e instanceof ApiError && Object.keys(e.errors).length ? { fields: e.errors, banner: '' } : { fields: {}, banner: errMsg(e) };
