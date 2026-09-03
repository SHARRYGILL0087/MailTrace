export type ThreatLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type ClassificationType = 'Phishing' | 'BEC' | 'Impersonation' | 'Malware' | 'Credential Theft';
export type IncidentStatus = 'Investigating' | 'Contained' | 'Remediated' | 'Escalated';

export interface ThreatRecord {
  id: string;
  threat: string;
  sender: string;
  classification: ClassificationType;
  riskScore: number;
  origin: string;
  timestamp: string;
  status: IncidentStatus;
}

export interface MetricItem {
  id: string;
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  iconType: 'email' | 'shield' | 'warning' | 'investigation' | 'network';
}

export interface ServiceHealth {
  name: string;
  status: 'Operational' | 'Degraded' | 'Downtime';
  latency: string;
}