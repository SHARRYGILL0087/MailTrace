export interface RiskFactor {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  iconName: string;
  description: string;
}

export interface HeaderNode {
  id: string;
  type: 'sender' | 'server' | 'relay' | 'recipient';
  name: string;
  ip: string;
  timestamp: string;
  location: string;
  provider: string;
  flag: string;
  isSuspicious?: boolean;
}

export interface HeaderAnomaly {
  id: string;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  evidenceRef: string;
}

export interface URLIntelligenceItem {
  id: string;
  url: string;
  domain: string;
  reputation: 'malicious' | 'suspicious' | 'safe';
  redirects: number;
  risk: 'High' | 'Medium' | 'Low';
  ipAddress: string;
  targetCategory: string;
}

export interface DomainIntelligenceData {
  domain: string;
  ageDays: number;
  isNewlyRegistered: boolean;
  registrar: string;
  dnsRecordsCount: number;
  mxServersCount: number;
  reputation: 'High Risk' | 'Medium Risk' | 'Low Risk';
  relatedDomainsCount: number;
  creationDate: string;
  nameservers: string[];
}

export interface IPIntelligenceData {
  ip: string;
  country: string;
  region: string;
  city: string;
  countryCode: string;
  asn: string;
  isp: string;
  host: string;
  networkType: string;
  reputation: 'Malicious' | 'Suspicious' | 'Clean';
  vpnProxy: 'Possible' | 'Detected' | 'Not Detected';
  proxyService: string;
  torNode: 'Detected' | 'Not Detected';
  openPorts: number[];
}

export interface RelatedIncident {
  id: string;
  title: string;
  reason: string;
  confidence: number;
  date: string;
  severity: 'High' | 'Medium' | 'Low';
}

export interface CampaignData {
  id: string;
  name: string;
  relatedEmailsCount: number;
  domainsCount: number;
  ipAddressesCount: number;
  countriesCount: number;
  activeDays: number;
  correlationConfidence: number;
  firstSeen: string;
  lastSeen: string;
}

export interface EvidenceData {
  id: string;
  sha256: string;
  collectedAt: string;
  source: string;
  integrityVerified: boolean;
  fileSize: string;
  algorithm: string;
}

export interface AnalystNote {
  id: string;
  author: string;
  role: string;
  timestamp: string;
  content: string;
  avatarInitials: string;
}

export interface RecommendedAction {
  id: string;
  text: string;
  priority: 'High' | 'Medium';
  completed: boolean;
}

export interface DetailDrawerData {
  isOpen: boolean;
  type: 'ip' | 'domain' | 'url' | 'headerNode' | 'campaign' | 'incident' | null;
  title: string;
  subtitle?: string;
  attributes: Record<string, string | number | boolean>;
  reputation?: string;
  metrics?: { label: string; value: string | number }[];
  tags?: string[];
  rawDetails?: string;
}

export interface InvestigationData {
  id: string;
  title: string;
  subtitle: string;
  riskScore: number;
  riskLevel: 'HIGH RISK' | 'MEDIUM RISK' | 'LOW RISK';
  status: 'Investigating' | 'Contained' | 'Escalated' | 'Resolved';
  classification: string;
  confidence: number;
  aiSummary: string;
  recommendedQuickActions: string[];
  riskFactors: RiskFactor[];
  senderIdentity: {
    from: { address: string; status: 'Suspicious' | 'Valid' | 'Unknown'; label: string };
    replyTo: { address: string; status: 'Mismatch' | 'Valid' | 'Warning'; label: string };
    returnPath: { address: string; status: 'Suspicious' | 'Valid' | 'Warning'; label: string };
  };
  authentication: {
    spf: { status: 'FAIL' | 'PASS' | 'NEUTRAL'; explanation: string };
    dkim: { status: 'FAIL' | 'PASS' | 'NEUTRAL'; explanation: string };
    dmarc: { status: 'FAIL' | 'PASS' | 'NEUTRAL'; explanation: string };
    summary: string;
    failedCount: number;
  };
  metadata: {
    messageId: string;
    sender: string;
    recipient: string;
    date: string;
    subject: string;
    mimeType: string;
    returnPath: string;
    replyTo: string;
    userAgent: string;
  };
  headerRoute: HeaderNode[];
  headerAnomalies: HeaderAnomaly[];
  urls: URLIntelligenceItem[];
  domainIntelligence: DomainIntelligenceData;
  ipIntelligence: IPIntelligenceData;
  geolocation: {
    city: string;
    country: string;
    ip: string;
    provider: string;
    asn: string;
    confidence: number;
    latitude: number;
    longitude: number;
  };
  threatGraphNodesCount: number;
  relatedIncidents: RelatedIncident[];
  campaign: CampaignData;
  timeline: { time: string; event: string; icon: string }[];
  evidence: EvidenceData;
  analystNotes: AnalystNote[];
  recommendedActions: RecommendedAction[];
}
