export type NodeType = 
  | 'email'
  | 'sender'
  | 'domain'
  | 'ip'
  | 'url'
  | 'hosting'
  | 'location'
  | 'campaign'
  | 'organization';

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'safe';

export type RelationshipType = 
  | 'SENT_FROM'
  | 'RESOLVES_TO'
  | 'HOSTED_BY'
  | 'LOCATED_IN'
  | 'CONTAINS'
  | 'RELATED_TO'
  | 'PART_OF'
  | 'TARGETS';

export interface ThreatNode {
  id: string;
  type: NodeType;
  label: string;
  sublabel?: string;
  risk?: RiskLevel;
  riskScore?: number;
  x?: number;
  y?: number;
  clusterId?: string;
  metadata?: {
    filename?: string;
    sender?: string;
    classification?: string;
    spf?: boolean;
    dkim?: boolean;
    dmarc?: boolean;
    receivedDate?: string;
    ipAddress?: string;
    country?: string;
    flag?: string;
    city?: string;
    asn?: string;
    isp?: string;
    network?: string;
    campaignId?: string;
    confidence?: number;
    firstSeen?: string;
    lastSeen?: string;
    status?: string;
    relatedEmails?: number;
    relatedDomains?: number;
    relatedIPs?: number;
    relatedURLs?: number;
    relatedCases?: number;
    domainName?: string;
    registrar?: string;
    urlPath?: string;
    hostingProvider?: string;
  };
}

export interface ThreatEdge {
  id: string;
  source: string;
  target: string;
  relationship: RelationshipType | string;
  confidence?: number;
  isCorrelated?: boolean; // dashed vs solid line
}

export interface GraphFilterState {
  searchQuery: string;
  nodeType: NodeType | 'all';
  riskLevel: RiskLevel | 'all';
  timeRange: '24h' | '7d' | '30d' | '90d' | 'custom';
  layoutMode: 'force' | 'radial' | 'tree';
  clusterView: boolean;
  activeCampaignFilter?: string;
}

export interface PathSearchResult {
  pathNodeIds: string[];
  pathEdgeIds: string[];
}
