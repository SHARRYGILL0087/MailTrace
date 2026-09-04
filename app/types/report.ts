import { 
  RiskFactor, 
  HeaderNode, 
  HeaderAnomaly, 
  URLIntelligenceItem, 
  DomainIntelligenceData, 
  IPIntelligenceData, 
  RelatedIncident, 
  CampaignData, 
  EvidenceData, 
  AnalystNote, 
  RecommendedAction 
} from '@/app/types/investigation';

export type ReportType = 
  | 'Phishing' 
  | 'BEC' 
  | 'Impersonation' 
  | 'Malware' 
  | 'Credential Theft' 
  | 'Infrastructure Investigation';

export type ReportRiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export type ReportStatus = 'Draft' | 'Generated' | 'Reviewed' | 'Verified' | 'Archived' | 'Needs Review';

export type ReportFormat = 'PDF' | 'JSON' | 'Both';

export interface ChainOfCustodyEntry {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  role: string;
  hash: string;
  verified: boolean;
  notes?: string;
}

export interface AnalystFinding {
  id: string;
  number: number;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  category: string;
}

export interface ReportVersion {
  version: string;
  timestamp: string;
  updatedBy: string;
  changesDescription: string;
}

export interface ForensicReport {
  id: string; // e.g. REP-2026-00482
  caseId: string; // e.g. INV-2026-00482
  title: string;
  type: ReportType;
  riskScore: number; // 0-100
  riskLevel: ReportRiskLevel;
  evidenceStatus: 'Verified' | 'Pending' | 'Unverified';
  generatedAt: string;
  updatedAt: string;
  analyst: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  status: ReportStatus;
  version: string; // e.g. 1.0, 1.1
  versionHistory: ReportVersion[];
  
  // Detailed Forensic Document Sections
  classification: string;
  executiveSummary: string;
  
  emailInfo: {
    sender: string;
    recipient: string;
    subject: string;
    date: string;
    messageId: string;
    replyTo: string;
    returnPath: string;
    attachmentCount: number;
    urlCount: number;
  };

  threatAssessment: {
    threatScore: number;
    classification: string;
    confidence: number;
    potentialBec: number;
    impersonation: number;
    riskFactors: {
      id: string;
      name: string;
      scoreDelta: number;
    }[];
  };

  authentication: {
    spf: { status: 'PASS' | 'FAIL' | 'NEUTRAL'; explanation: string };
    dkim: { status: 'PASS' | 'FAIL' | 'NEUTRAL'; explanation: string };
    dmarc: { status: 'PASS' | 'FAIL' | 'NEUTRAL'; explanation: string };
  };

  headerRoute: HeaderNode[];
  headerAnomalies: HeaderAnomaly[];

  urlIntelligence: URLIntelligenceItem[];
  domainIntelligence: DomainIntelligenceData;
  ipIntelligence: IPIntelligenceData;

  geolocation: {
    ip: string;
    country: string;
    city: string;
    provider: string;
    asn: string;
    confidence: number;
    disclaimer: string;
  };

  threatGraphPreview: {
    nodesCount: number;
    edgesCount: number;
    summary: string;
  };

  campaignCorrelation: {
    campaignId: string;
    name: string;
    relatedEmails: number;
    domains: number;
    ips: number;
    countries: number;
    confidence: number;
    status: 'Active' | 'Dormant' | 'Contained';
  };

  timeline: {
    time: string;
    event: string;
    actor?: string;
  }[];

  evidenceIntegrity: {
    evidenceId: string;
    sha256: string;
    collectedAt: string;
    source: string;
    verified: boolean;
    verificationMethod: string;
    ledgerStatus: 'Recorded' | 'Pending';
  };

  chainOfCustody: ChainOfCustodyEntry[];
  analystFindings: AnalystFinding[];

  finalAssessment: {
    classificationTag: string;
    riskScore: number;
    infrastructureConfidence: number;
    campaignCorrelationConfidence: number;
    recommendedAction: string;
  };
}

export interface ReportSummaryMetrics {
  totalReports: number;
  thisMonth: number;
  highRiskReports: number;
  verifiedEvidence: number;
  activeInvestigations: number;
}

export interface ReportFilterState {
  searchQuery: string;
  type: ReportType | 'All Reports';
  risk: ReportRiskLevel | 'All';
  status: ReportStatus | 'All';
  dateRange: 'Today' | 'Last 7 Days' | 'Last 30 Days' | 'Last 90 Days' | 'Custom';
  sortBy: 'newest' | 'oldest' | 'risk_high' | 'risk_low';
}

export interface ReportGenerationPayload {
  investigationId: string;
  sections: {
    executiveSummary: boolean;
    emailMetadata: boolean;
    headerForensics: boolean;
    authChecks: boolean;
    urlIntelligence: boolean;
    domainIntelligence: boolean;
    ipIntelligence: boolean;
    geolocation: boolean;
    threatGraph: boolean;
    campaignCorrelation: boolean;
    timeline: boolean;
    evidenceIntegrity: boolean;
    analystNotes: boolean;
  };
  format: ReportFormat;
  includeSha256: boolean;
  includeChainOfCustody: boolean;
}
