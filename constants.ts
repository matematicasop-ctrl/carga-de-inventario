import { SalesRecord } from './types';

export const INITIAL_DATA: SalesRecord[] = [
  { id: '1', date: '2023-10-01', product: 'Consulting Pro', category: 'Services', units: 5, revenue: 2500, status: 'Completed' },
  { id: '2', date: '2023-10-03', product: 'Basic License', category: 'Software', units: 12, revenue: 1200, status: 'Completed' },
  { id: '3', date: '2023-10-05', product: 'Premium Audit', category: 'Services', units: 1, revenue: 1500, status: 'Pending' },
  { id: '4', date: '2023-10-10', product: 'Hardware Kit', category: 'Hardware', units: 3, revenue: 4500, status: 'Completed' },
  { id: '5', date: '2023-10-12', product: 'Maintenance', category: 'Services', units: 10, revenue: 1000, status: 'Cancelled' },
  { id: '6', date: '2023-10-15', product: 'Enterprise Lic', category: 'Software', units: 2, revenue: 5000, status: 'Completed' },
];

export const CATEGORIES = ['Services', 'Software', 'Hardware', 'Training'];
export const STATUSES = ['Completed', 'Pending', 'Cancelled'];