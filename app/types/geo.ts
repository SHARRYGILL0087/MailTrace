export type RiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'safe';

export interface InfrastructureLocation {
  id: string;
  ip: string;
  latitude: number;
  longitude: number;
  country: string;
  countryCode: string;
  flag: string;
  city: string;
  region: 'Europe' | 'North America' | 'Asia' | 'Other';
  asn: string;
  provider: string;
  networkType: 'Cloud Hosting' | 'Offshore VPS' | 'Enterprise ISP' | 'CDN Fronting' | 'Proxy Node';
  risk: RiskLevel;
  confidence: number;
  reputation: 'Malicious' | 'High Risk' | 'Suspicious' | 'Neutral' | 'Trusted';
  vpnStatus: 'Possible' | 'Detected' | 'Not Detected';
  torStatus: 'Detected' | 'Not Detected';
  relatedEmails: number;
  relatedDomains: number;
  relatedCampaigns: number;
  relatedCases: number;
  firstSeen: string;
  lastSeen: string;
  status: 'Investigating' | 'Monitoring' | 'Blocked' | 'Verified';
}

export interface GeoFilterState {
  searchQuery: string;
  riskLevel: RiskLevel | 'all';
  nodeType: 'ip' | 'hosting' | 'domain' | 'campaign' | 'all';
  region: 'all' | 'Europe' | 'North America' | 'Asia' | 'Other';
  infrastructureType: 'all' | 'Cloud' | 'Hosting' | 'Enterprise' | 'ISP';
  timeRange: '24h' | '7d' | '30d' | '90d';
}
