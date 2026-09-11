export type IndicatorType = 'ip' | 'domain' | 'url' | 'hash' | 'email';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface SourceProvider {
  name: string;
  category: string;
  status: 'Connected' | 'Available' | 'No Data';
  is_demo: boolean;
  last_queried: string;
  detections?: string;
  details?: string;
}

export interface RelatedCase {
  id: string;
  title: string;
  threat_type: string;
  risk_score: number;
  status: 'Investigating' | 'Contained' | 'Escalated' | 'Resolved';
  related_indicator: string;
  last_updated: string;
}

export interface RelatedIndicatorRelation {
  from: string;
  to: string;
  type: IndicatorType | 'campaign' | 'case';
  relation: string;
  risk: RiskLevel;
}

export interface ThreatIntelligenceResponse {
  indicator: string;
  type: IndicatorType;
  risk_score: number;
  risk_level: RiskLevel;
  classification: string;
  first_seen: string;
  last_seen: string;
  ai_summary: string;
  reputation: {
    ip?: {
      reputation_score: number;
      abuse_reports: number;
      confidence: number;
      status: string;
      tor_exit: boolean;
      vpn_proxy: 'Possible' | 'Detected' | 'Not Detected';
    };
    domain?: {
      domain_risk: 'High' | 'Medium' | 'Low' | 'Clean';
      registrar: string;
      domain_age_days: number;
      status: string;
      is_newly_registered: boolean;
    };
    url?: {
      detection_count: number;
      total_vendors: number;
      redirect_status: string;
      final_destination: string;
      status: string;
    };
    hash?: {
      file_type: string;
      sha256: string;
      md5: string;
      detection_rate: string;
      family: string;
      file_size: string;
    };
    email?: {
      dmarc_status: 'PASS' | 'FAIL' | 'NEUTRAL';
      spf_status: 'PASS' | 'FAIL' | 'NEUTRAL';
      mx_valid: boolean;
      disposable: boolean;
      domain_age: string;
    };
  };
  infrastructure: {
    ip_address?: string;
    country?: string;
    city?: string;
    region?: string;
    asn?: string;
    isp?: string;
    organization?: string;
    hosting_provider?: string;
    domain?: string;
    registrar?: string;
    creation_date?: string;
    expiration_date?: string;
    nameservers?: string[];
    mx_records?: string[];
    dns_records?: { type: string; value: string; ttl: string }[];
    url?: string;
    protocol?: string;
    redirects_count?: number;
    final_destination?: string;
    reputation?: string;
  };
  geolocation: {
    country: string;
    city: string;
    region: string;
    country_code: string;
    isp: string;
    asn: string;
    lat: number;
    lng: number;
  };
  asn: {
    asn: string;
    org: string;
    network: string;
    route: string;
  };
  related_cases: RelatedCase[];
  related_indicators: RelatedIndicatorRelation[];
  sources: SourceProvider[];
}

export interface ThreatIntelFilterState {
  indicator: string;
  type: IndicatorType | 'auto';
}
