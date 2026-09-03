import { ThreatRecord, MetricItem, ServiceHealth } from '@/app/types/dashboard';

export const METRIC_CARDS_DATA: MetricItem[] = [
  { id: 'm1', title: 'Emails Analyzed', value: '12,842', trend: '+14.2%', isPositive: true, iconType: 'email' },
  { id: 'm2', title: 'Threats Detected', value: '1,284', trend: '+8.4%', isPositive: false, iconType: 'shield' },
  { id: 'm3', title: 'High Risk Threats', value: '247', trend: '+12.8%', isPositive: false, iconType: 'warning' },
  { id: 'm4', title: 'Active Investigations', value: '36', trend: '+4.2%', isPositive: true, iconType: 'investigation' },
  { id: 'm5', title: 'Threat Campaigns', value: '18', trend: '+6.3%', isPositive: false, iconType: 'network' },
];

export const ACTIVITY_TIMELINE = [
  { time: '00:00', Phishing: 42, BEC: 12, Impersonation: 15, Malware: 5, CredentialTheft: 8 },
  { time: '04:00', Phishing: 28, BEC: 8, Impersonation: 10, Malware: 4, CredentialTheft: 6 },
  { time: '08:00', Phishing: 95, BEC: 34, Impersonation: 40, Malware: 18, CredentialTheft: 22 },
  { time: '12:00', Phishing: 135, BEC: 48, Impersonation: 52, Malware: 26, CredentialTheft: 31 },
  { time: '16:00', Phishing: 105, BEC: 32, Impersonation: 38, Malware: 15, CredentialTheft: 19 },
  { time: '20:00', Phishing: 62, BEC: 18, Impersonation: 22, Malware: 9, CredentialTheft: 12 },
];

export const THREAT_DISTRIBUTION_PIE = [
  { name: 'Phishing', value: 48, color: '#F87171' },
  { name: 'BEC', value: 19, color: '#FB923C' },
  { name: 'Impersonation', value: 15, color: '#FBBF24' },
  { name: 'Malware', value: 10, color: '#60A5FA' },
  { name: 'Other', value: 8, color: '#34D399' },
];

export const RECENT_THREATS_DATA: ThreatRecord[] = [
  {
    id: 'TR-9941',
    threat: 'Suspicious Invoice #INV-2026',
    sender: 'billing@secure-update-portal.eu',
    classification: 'Phishing',
    riskScore: 94,
    origin: 'Netherlands',
    timestamp: '2 min ago',
    status: 'Investigating',
  },
  {
    id: 'TR-9940',
    threat: 'Urgent Payment Authorization',
    sender: 'ceo-office@enterprise-holdings.co',
    classification: 'BEC',
    riskScore: 89,
    origin: 'United States',
    timestamp: '8 min ago',
    status: 'Contained',
  },
  {
    id: 'TR-9939',
    threat: 'Active Directory Re-auth Request',
    sender: 'security@sso-domain-verify.net',
    classification: 'Credential Theft',
    riskScore: 97,
    origin: 'Singapore',
    timestamp: '15 min ago',
    status: 'Escalated',
  },
  {
    id: 'TR-9938',
    threat: 'Scanned AirWaybill Payload',
    sender: 'delivery@cargo-tracking-express.in',
    classification: 'Malware',
    riskScore: 78,
    origin: 'India',
    timestamp: '29 min ago',
    status: 'Remediated',
  },
];

export const ENGINE_STATUS_DATA: ServiceHealth[] = [
  { name: 'Email Analysis Engine', status: 'Operational', latency: '12ms' },
  { name: 'Threat Intelligence Matrix', status: 'Operational', latency: '18ms' },
  { name: 'Geolocation Trace Engine', status: 'Operational', latency: '24ms' },
  { name: 'Investigation Graph Correlation', status: 'Operational', latency: '32ms' },
  { name: 'Telemetry Distributed DB', status: 'Operational', latency: '8ms' },
];