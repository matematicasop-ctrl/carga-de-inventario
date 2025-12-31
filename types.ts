export interface SalesRecord {
  id: string;
  date: string;
  product: string;
  category: string;
  units: number;
  revenue: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
}

export enum ReportStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface AiReport {
  summary: string;
  keyInsights: string[];
  recommendation: string;
  generatedAt: string;
}