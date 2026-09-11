import { ThreatIntelligenceResponse, IndicatorType } from '@/app/types/threatIntel';

export const MOCK_THREAT_INTEL_DATABASE: Record<string, ThreatIntelligenceResponse> = {
  // 1. IP Indicator: 8.8.8.8 (Clean DNS)
  '8.8.8.8': {
    indicator: '8.8.8.8',
    type: 'ip',
    risk_score: 8,
    risk_level: 'low',
    classification: 'Benign Infrastructure (Public Resolver)',
    first_seen: '14 May 2012, 00:00 UTC',
    last_seen: 'Just now',
    ai_summary: 'Observed IP matches Google Public DNS. No malicious command-and-control activity or botnet participation recorded in passive DNS logs.',
    reputation: {
      ip: {
        reputation_score: 98,
        abuse_reports: 2,
        confidence: 99,
        status: 'Clean / Allowlisted',
        tor_exit: false,
        vpn_proxy: 'Not Detected',
      },
    },
    infrastructure: {
      ip_address: '8.8.8.8',
      country: 'United States',
      city: 'Mountain View',
      region: 'California',
      asn: 'AS15169',
      isp: 'Google LLC',
      organization: 'Google Public Anycast DNS',
      hosting_provider: 'Google LLC Cloud Infrastructure',
    },
    geolocation: {
      country: 'United States',
      city: 'Mountain View',
      region: 'California',
      country_code: 'US',
      isp: 'Google LLC',
      asn: 'AS15169',
      lat: 37.386,
      lng: -122.0838,
    },
    asn: {
      asn: 'AS15169',
      org: 'Google LLC',
      network: '8.8.8.0/24',
      route: 'Anycast Tier-1 Global BGP',
    },
    related_cases: [],
    related_indicators: [
      { from: '8.8.8.8', to: 'dns.google', type: 'domain', relation: 'PTR Hostname', risk: 'low' },
      { from: '8.8.8.8', to: '8.8.4.4', type: 'ip', relation: 'Secondary Anycast Peer', risk: 'low' },
    ],
    sources: [
      { name: 'VirusTotal', category: 'Multi-AV Scanner', status: 'Available', is_demo: true, last_queried: '2 mins ago', detections: '0/89 flagged' },
      { name: 'AbuseIPDB', category: 'IP Abuse Database', status: 'Available', is_demo: true, last_queried: '5 mins ago', detections: 'Confidence of Abuse: 0%' },
      { name: 'MaxMind/IPinfo', category: 'Geo & ASN Telemetry', status: 'Connected', is_demo: true, last_queried: '1 min ago', details: 'AS15169 Anycast US' },
      { name: 'RDAP/WHOIS', category: 'Registry Allocation', status: 'Connected', is_demo: true, last_queried: 'Just now', details: 'ARIN Allocated' },
    ],
  },

  // 2. IP Indicator: 185.220.101.5 (Known Malicious / Tor Exit Node)
  '185.220.101.5': {
    indicator: '185.220.101.5',
    type: 'ip',
    risk_score: 94,
    risk_level: 'critical',
    classification: 'Active Tor Exit Node & Phishing Relay',
    first_seen: '12 Jan 2026, 04:18 UTC',
    last_seen: '8 mins ago',
    ai_summary: 'Critical threat indicator. Node identified as an anonymization relay hosting automated credential extraction tools and spoofed OAuth gateways.',
    reputation: {
      ip: {
        reputation_score: 6,
        abuse_reports: 342,
        confidence: 96,
        status: 'Malicious / Active C2',
        tor_exit: true,
        vpn_proxy: 'Detected',
      },
    },
    infrastructure: {
      ip_address: '185.220.101.5',
      country: 'Netherlands',
      city: 'Amsterdam',
      region: 'North Holland',
      asn: 'AS208323',
      isp: 'Zwiebelfreunde e.V.',
      organization: 'Tor Network Relay Host',
      hosting_provider: 'DataOne Datacenter Amsterdam',
    },
    geolocation: {
      country: 'Netherlands',
      city: 'Amsterdam',
      region: 'North Holland',
      country_code: 'NL',
      isp: 'Zwiebelfreunde e.V.',
      asn: 'AS208323',
      lat: 52.3676,
      lng: 4.9041,
    },
    asn: {
      asn: 'AS208323',
      org: 'Zwiebelfreunde e.V.',
      network: '185.220.101.0/24',
      route: 'European Datacenter Transit',
    },
    related_cases: [
      {
        id: 'INV-2026-00482',
        title: 'Executive Wire Transfer Phishing Probe',
        threat_type: 'BEC / Wire Fraud',
        risk_score: 96,
        status: 'Investigating',
        related_indicator: '185.220.101.5',
        last_updated: '14 mins ago',
      },
      {
        id: 'INV-2026-00480',
        title: 'Active Directory SSO Harvest Cluster',
        threat_type: 'Credential Harvesting',
        risk_score: 91,
        status: 'Escalated',
        related_indicator: '185.220.101.5',
        last_updated: '2 hours ago',
      },
    ],
    related_indicators: [
      { from: '185.220.101.5', to: 'evil-payload.ru', type: 'domain', relation: 'Hosted Phishing Hostname', risk: 'critical' },
      { from: '185.220.101.5', to: 'https://secure-login.apple-verification.com/login', type: 'url', relation: 'Served Payload URL', risk: 'critical' },
      { from: '185.220.101.5', to: 'accounts@company-support.com', type: 'email', relation: 'SMTP Relay Sender', risk: 'high' },
      { from: '185.220.101.5', to: 'AS208323', type: 'campaign', relation: 'ASN Infrastructure Pool', risk: 'medium' },
    ],
    sources: [
      { name: 'VirusTotal', category: 'Multi-AV Scanner', status: 'Available', is_demo: true, last_queried: '3 mins ago', detections: '68/91 security vendors flagged' },
      { name: 'AbuseIPDB', category: 'IP Abuse Database', status: 'Available', is_demo: true, last_queried: '7 mins ago', detections: 'Confidence of Abuse: 100%' },
      { name: 'MaxMind/IPinfo', category: 'Geo & ASN Telemetry', status: 'Connected', is_demo: true, last_queried: '1 min ago', details: 'High risk Tor relay detected' },
      { name: 'RDAP/WHOIS', category: 'Registry Allocation', status: 'Connected', is_demo: true, last_queried: '10 mins ago', details: 'RIPE NCC Allocated' },
    ],
  },

  // 3. Domain Indicator: example.com (Clean)
  'example.com': {
    indicator: 'example.com',
    type: 'domain',
    risk_score: 2,
    risk_level: 'low',
    classification: 'ICANN Special-Use Reserved Domain',
    first_seen: '11 Aug 1995, 00:00 UTC',
    last_seen: 'Just now',
    ai_summary: 'IANA reserved documentation domain. No malicious telemetry, phishing records, or abusive subdomains detected.',
    reputation: {
      domain: {
        domain_risk: 'Clean',
        registrar: 'Internet Assigned Numbers Authority (IANA)',
        domain_age_days: 11354,
        status: 'Reserved / Safe',
        is_newly_registered: false,
      },
    },
    infrastructure: {
      domain: 'example.com',
      registrar: 'IANA Reserved',
      creation_date: '1995-08-11',
      expiration_date: '2030-08-13',
      nameservers: ['a.iana-servers.net', 'b.iana-servers.net'],
      mx_records: ['0 . (Null MX / Disabled)'],
      dns_records: [
        { type: 'A', value: '93.184.215.14', ttl: '86400' },
        { type: 'AAAA', value: '2606:2800:21f:cb07:6820:80da:af6b:8b2c', ttl: '86400' },
        { type: 'TXT', value: 'v=spf1 -all', ttl: '3600' },
      ],
    },
    geolocation: {
      country: 'United States',
      city: 'Los Angeles',
      region: 'California',
      country_code: 'US',
      isp: 'EDGECAST',
      asn: 'AS15133',
      lat: 34.0522,
      lng: -118.2437,
    },
    asn: {
      asn: 'AS15133',
      org: 'Verizon Digital Media Services (Edgecast)',
      network: '93.184.215.0/24',
      route: 'US Anycast Content Delivery',
    },
    related_cases: [],
    related_indicators: [
      { from: 'example.com', to: '93.184.215.14', type: 'ip', relation: 'Resolved A Record', risk: 'low' },
      { from: 'example.com', to: 'example.org', type: 'domain', relation: 'Sibling Reserved Domain', risk: 'low' },
    ],
    sources: [
      { name: 'VirusTotal', category: 'Multi-AV Scanner', status: 'Available', is_demo: true, last_queried: '4 mins ago', detections: '0/90 flagged' },
      { name: 'AbuseIPDB', category: 'IP Abuse Database', status: 'Available', is_demo: true, last_queried: '12 mins ago', detections: '0 Abuse Reports' },
      { name: 'MaxMind/IPinfo', category: 'Geo & ASN Telemetry', status: 'Connected', is_demo: true, last_queried: '2 mins ago', details: 'AS15133 EdgeCast' },
      { name: 'RDAP/WHOIS', category: 'Registry Allocation', status: 'Connected', is_demo: true, last_queried: 'Just now', details: 'ICANN Reserved' },
    ],
  },

  // 4. Domain Indicator: evil-payload.ru (Malicious Domain)
  'evil-payload.ru': {
    indicator: 'evil-payload.ru',
    type: 'domain',
    risk_score: 97,
    risk_level: 'critical',
    classification: 'Active Malicious Domain (Fast-Flux Phishing)',
    first_seen: '28 Aug 2026, 02:14 UTC',
    last_seen: '12 mins ago',
    ai_summary: 'High-confidence phishing domain registered 14 days ago. Configured with fast-flux DNS pointing to bulletproof servers in Eastern Europe and Netherlands.',
    reputation: {
      domain: {
        domain_risk: 'High',
        registrar: 'Regtime Ltd (RU-CENTER)',
        domain_age_days: 14,
        status: 'Active Malicious / Blocklisted',
        is_newly_registered: true,
      },
    },
    infrastructure: {
      domain: 'evil-payload.ru',
      registrar: 'Regtime Ltd',
      creation_date: '2026-08-28',
      expiration_date: '2027-08-28',
      nameservers: ['ns1.bulletproof-dns.is', 'ns2.bulletproof-dns.is'],
      mx_records: ['10 mail.evil-payload.ru (185.220.101.5)'],
      dns_records: [
        { type: 'A', value: '185.220.101.5', ttl: '300' },
        { type: 'A', value: '194.26.29.112', ttl: '300' },
        { type: 'TXT', value: 'v=spf1 ip4:185.220.101.0/24 +all', ttl: '600' },
      ],
    },
    geolocation: {
      country: 'Russian Federation',
      city: 'Moscow',
      region: 'Moscow',
      country_code: 'RU',
      isp: 'Selectel Datacenter',
      asn: 'AS49505',
      lat: 55.7558,
      lng: 37.6173,
    },
    asn: {
      asn: 'AS49505',
      org: 'Selectel Networks Network Operations',
      network: '194.26.29.0/24',
      route: 'Eastern Europe Fast-Flux Transit',
    },
    related_cases: [
      {
        id: 'INV-2026-00482',
        title: 'Executive Wire Transfer Phishing Probe',
        threat_type: 'BEC / Wire Fraud',
        risk_score: 96,
        status: 'Investigating',
        related_indicator: 'evil-payload.ru',
        last_updated: '14 mins ago',
      },
    ],
    related_indicators: [
      { from: 'evil-payload.ru', to: '185.220.101.5', type: 'ip', relation: 'Resolved Hosting IP', risk: 'critical' },
      { from: 'evil-payload.ru', to: 'https://evil-payload.ru/invoice.pdf.exe', type: 'url', relation: 'Malware Dropper Endpoint', risk: 'critical' },
      { from: 'evil-payload.ru', to: 'phishing@enterprise-support.co', type: 'email', relation: 'Campaign Sender', risk: 'high' },
      { from: 'evil-payload.ru', to: 'Storm-0821', type: 'campaign', relation: 'Threat Actor Attribution', risk: 'critical' },
    ],
    sources: [
      { name: 'VirusTotal', category: 'Multi-AV Scanner', status: 'Available', is_demo: true, last_queried: '5 mins ago', detections: '74/91 security vendors flagged' },
      { name: 'AbuseIPDB', category: 'Domain Blacklists', status: 'Available', is_demo: true, last_queried: '10 mins ago', detections: 'Listed on SURBL & Spamhaus DBL' },
      { name: 'MaxMind/IPinfo', category: 'Geo & ASN Telemetry', status: 'Connected', is_demo: true, last_queried: '1 min ago', details: 'AS49505 Moscow Datacenter' },
      { name: 'RDAP/WHOIS', category: 'Registry Allocation', status: 'Connected', is_demo: true, last_queried: 'Just now', details: 'Regtime Ltd Privacy Guard' },
    ],
  },

  // 5. URL Indicator: malicious-url.com
  'malicious-url.com': {
    indicator: 'http://malicious-url.com/login/auth-session?token=89231f',
    type: 'url',
    risk_score: 88,
    risk_level: 'high',
    classification: 'Credential Phishing Portal (Microsoft 365 Lure)',
    first_seen: '01 Sep 2026, 09:15 UTC',
    last_seen: '19 mins ago',
    ai_summary: 'Target URL hosts a high-fidelity Microsoft 365 SSO login clone with real-time 2FA interception capabilities (Evilginx framework).',
    reputation: {
      url: {
        detection_count: 53,
        total_vendors: 89,
        redirect_status: '2 HTTP Redirects (HTTP 302 -> 301)',
        final_destination: 'https://secure-portal-auth-verification.workers.dev/login',
        status: 'Malicious / Phishing Landing Page',
      },
    },
    infrastructure: {
      url: 'http://malicious-url.com/login/auth-session?token=89231f',
      domain: 'malicious-url.com',
      protocol: 'HTTP/1.1 (Upgraded via proxy)',
      redirects_count: 2,
      final_destination: 'https://secure-portal-auth-verification.workers.dev/login',
      reputation: 'Known Active Phishing Host',
    },
    geolocation: {
      country: 'Germany',
      city: 'Frankfurt',
      region: 'Hesse',
      country_code: 'DE',
      isp: 'DigitalOcean LLC',
      asn: 'AS14061',
      lat: 50.1109,
      lng: 8.6821,
    },
    asn: {
      asn: 'AS14061',
      org: 'DigitalOcean Cloud Frankfurt',
      network: '159.65.120.0/20',
      route: 'Cloud VPS Reverse Proxy',
    },
    related_cases: [
      {
        id: 'INV-2026-00481',
        title: 'Urgent Executive Payroll Wire Transfer Request',
        threat_type: 'BEC / Wire Fraud',
        risk_score: 89,
        status: 'Contained',
        related_indicator: 'malicious-url.com',
        last_updated: '3 hours ago',
      },
    ],
    related_indicators: [
      { from: 'malicious-url.com', to: '159.65.120.44', type: 'ip', relation: 'Origin Host IP', risk: 'high' },
      { from: 'malicious-url.com', to: 'evil-payload.ru', type: 'domain', relation: 'Parent Phishing Campaign', risk: 'critical' },
      { from: 'malicious-url.com', to: 'INV-2026-00481', type: 'case', relation: 'Observed in Active Case', risk: 'high' },
    ],
    sources: [
      { name: 'VirusTotal', category: 'Multi-AV Scanner', status: 'Available', is_demo: true, last_queried: '1 min ago', detections: '53/89 security vendors flagged' },
      { name: 'AbuseIPDB', category: 'URL Sandbox Report', status: 'Available', is_demo: true, last_queried: '4 mins ago', detections: 'High Confidence PhishTank Match' },
      { name: 'MaxMind/IPinfo', category: 'Geo & ASN Telemetry', status: 'Connected', is_demo: true, last_queried: '3 mins ago', details: 'AS14061 Frankfurt VPS' },
      { name: 'RDAP/WHOIS', category: 'Registry Allocation', status: 'Connected', is_demo: true, last_queried: 'Just now', details: 'Cloudflare Registrar' },
    ],
  },

  // 6. Hash Indicator: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855': {
    indicator: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    type: 'hash',
    risk_score: 98,
    risk_level: 'critical',
    classification: 'Emotet Trojan Payload / Malicious Dropper',
    first_seen: '29 Aug 2026, 14:02 UTC',
    last_seen: '45 mins ago',
    ai_summary: 'Binary hash associated with Emotet banking trojan delivery staging. Uses polymorphic obfuscation and attempts LSASS memory dumping.',
    reputation: {
      hash: {
        file_type: 'Win32 EXE (PE32+ executable)',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        md5: 'd41d8cd98f00b204e9800998ecf8427e',
        detection_rate: '68/72 AV Engines',
        family: 'Trojan:Win32/Emotet.RP!MTB',
        file_size: '482.5 KB',
      },
    },
    infrastructure: {
      ip_address: '185.220.101.5',
      country: 'Netherlands',
      city: 'Amsterdam',
      region: 'North Holland',
      asn: 'AS208323',
      isp: 'Zwiebelfreunde e.V.',
    },
    geolocation: {
      country: 'Netherlands',
      city: 'Amsterdam',
      region: 'North Holland',
      country_code: 'NL',
      isp: 'Zwiebelfreunde e.V.',
      asn: 'AS208323',
      lat: 52.3676,
      lng: 4.9041,
    },
    asn: {
      asn: 'AS208323',
      org: 'Zwiebelfreunde e.V.',
      network: '185.220.101.0/24',
      route: 'Tor Exit Node Subnet',
    },
    related_cases: [
      {
        id: 'INV-2026-00479',
        title: 'Malicious AirWaybill Attachment Payload Delivery',
        threat_type: 'Malware Dropper',
        risk_score: 98,
        status: 'Investigating',
        related_indicator: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        last_updated: '1 hour ago',
      },
    ],
    related_indicators: [
      { from: 'e3b0c44298fc...', to: '185.220.101.5', type: 'ip', relation: 'C2 Command Server', risk: 'critical' },
      { from: 'e3b0c44298fc...', to: 'evil-payload.ru', type: 'domain', relation: 'Distribution Domain', risk: 'critical' },
      { from: 'e3b0c44298fc...', to: 'INV-2026-00479', type: 'case', relation: 'Attachment In Case', risk: 'critical' },
    ],
    sources: [
      { name: 'VirusTotal', category: 'Multi-AV Scanner', status: 'Available', is_demo: true, last_queried: 'Just now', detections: '68/72 engines flagged as Emotet' },
      { name: 'AbuseIPDB', category: 'Threat Feed', status: 'Available', is_demo: true, last_queried: '8 mins ago', detections: 'High Confidence Malware Indicator' },
      { name: 'MaxMind/IPinfo', category: 'Infrastructure Telemetry', status: 'Connected', is_demo: true, last_queried: '10 mins ago', details: 'C2 Relay Telemetry Mapped' },
      { name: 'RDAP/WHOIS', category: 'Registrar', status: 'No Data', is_demo: true, last_queried: '-', details: 'Not applicable to File Hash' },
    ],
  },

  // 7. Email Indicator: phishing@enterprise-support.co
  'phishing@enterprise-support.co': {
    indicator: 'phishing@enterprise-support.co',
    type: 'email',
    risk_score: 86,
    risk_level: 'high',
    classification: 'Spoofed Executive Impersonation Sender',
    first_seen: '27 Aug 2026, 11:40 UTC',
    last_seen: '1 hour ago',
    ai_summary: 'Email address originates from newly spun lookalike domain masquerading as internal enterprise support. SPF and DMARC alignment completely failed.',
    reputation: {
      email: {
        dmarc_status: 'FAIL',
        spf_status: 'FAIL',
        mx_valid: true,
        disposable: false,
        domain_age: '9 days old',
      },
    },
    infrastructure: {
      domain: 'enterprise-support.co',
      registrar: 'NameCheap Inc.',
      creation_date: '2026-09-02',
      expiration_date: '2027-09-02',
      nameservers: ['dns1.registrar-servers.com', 'dns2.registrar-servers.com'],
      mx_records: ['10 mail.enterprise-support.co (185.220.101.5)'],
    },
    geolocation: {
      country: 'United Kingdom',
      city: 'London',
      region: 'Greater London',
      country_code: 'GB',
      isp: 'OVH Ltd',
      asn: 'AS16276',
      lat: 51.5074,
      lng: -0.1278,
    },
    asn: {
      asn: 'AS16276',
      org: 'OVH SAS Hosted VPS Infrastructure',
      network: '198.244.128.0/18',
      route: 'European VPS Transit',
    },
    related_cases: [
      {
        id: 'INV-2026-00482',
        title: 'Executive Wire Transfer Phishing Probe',
        threat_type: 'BEC / Wire Fraud',
        risk_score: 96,
        status: 'Investigating',
        related_indicator: 'phishing@enterprise-support.co',
        last_updated: '14 mins ago',
      },
    ],
    related_indicators: [
      { from: 'phishing@enterprise-support.co', to: 'enterprise-support.co', type: 'domain', relation: 'Sender Domain', risk: 'high' },
      { from: 'phishing@enterprise-support.co', to: '185.220.101.5', type: 'ip', relation: 'Originating Server IP', risk: 'critical' },
      { from: 'phishing@enterprise-support.co', to: 'INV-2026-00482', type: 'case', relation: 'Sender In Investigation', risk: 'critical' },
    ],
    sources: [
      { name: 'VirusTotal', category: 'Multi-AV Scanner', status: 'Available', is_demo: true, last_queried: '4 mins ago', detections: 'Domain flagged by 18 engines' },
      { name: 'AbuseIPDB', category: 'Reputation Feed', status: 'Available', is_demo: true, last_queried: '15 mins ago', detections: 'Spamhaus Listed Domain' },
      { name: 'MaxMind/IPinfo', category: 'Geo & ASN Telemetry', status: 'Connected', is_demo: true, last_queried: '2 mins ago', details: 'AS16276 London Hosting' },
      { name: 'RDAP/WHOIS', category: 'Registry Allocation', status: 'Connected', is_demo: true, last_queried: 'Just now', details: 'Namecheap Privacy Protection' },
    ],
  },
};

// Helper function to infer indicator type
export function inferIndicatorType(input: string): IndicatorType {
  const clean = input.trim().toLowerCase();

  // IP Address (IPv4)
  const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  if (ipv4Regex.test(clean)) return 'ip';

  // Email
  if (clean.includes('@') && clean.includes('.')) return 'email';

  // URL
  if (clean.startsWith('http://') || clean.startsWith('https://') || clean.includes('/')) return 'url';

  // Hash (MD5: 32, SHA1: 40, SHA256: 64)
  const hexRegex = /^[a-f0-9]{32,64}$/;
  if (hexRegex.test(clean)) return 'hash';

  // Domain
  return 'domain';
}

// Dynamic Mock Fallback Generator for arbitrary indicators
export function generateDynamicMockIntel(indicator: string, forcedType?: IndicatorType): ThreatIntelligenceResponse {
  const clean = indicator.trim();
  const lower = clean.toLowerCase();

  // Check if we have an exact match or normalized match in our database
  if (MOCK_THREAT_INTEL_DATABASE[clean]) {
    return MOCK_THREAT_INTEL_DATABASE[clean];
  }
  if (MOCK_THREAT_INTEL_DATABASE[lower]) {
    return MOCK_THREAT_INTEL_DATABASE[lower];
  }

  // Handle URL matching variations (e.g. searching 'malicious-url.com')
  for (const key of Object.keys(MOCK_THREAT_INTEL_DATABASE)) {
    if (key.includes(clean) || clean.includes(key)) {
      return MOCK_THREAT_INTEL_DATABASE[key];
    }
  }

  const type = forcedType || inferIndicatorType(clean);

  // Generate dynamic, realistic demo response
  const isSuspicious = lower.includes('phish') || lower.includes('evil') || lower.includes('malicious') || lower.includes('hack') || lower.includes('test') || lower.includes('attack');
  const riskScore = isSuspicious ? 84 : 45;
  const riskLevel = riskScore > 80 ? 'high' : riskScore > 60 ? 'medium' : 'low';

  return {
    indicator: clean,
    type,
    risk_score: riskScore,
    risk_level: riskLevel,
    classification: isSuspicious ? 'Suspicious Indicator (Observed in Forensic Telemetry)' : 'Unclassified Indicator (Demo Intelligence)',
    first_seen: '02 Sep 2026, 14:22 UTC',
    last_seen: '15 mins ago',
    ai_summary: `Intelligence assessment for ${clean} (${type.toUpperCase()}). Telemetry indicates ${isSuspicious ? 'elevated risk patterns correlating with targeted spearphishing infrastructure' : 'moderate baseline activity with no active botnet command nodes'}. Marked as Demo Data.`,
    reputation: {
      ip: type === 'ip' ? {
        reputation_score: 100 - riskScore,
        abuse_reports: isSuspicious ? 87 : 4,
        confidence: 82,
        status: isSuspicious ? 'Suspicious Relay' : 'Standard Host',
        tor_exit: false,
        vpn_proxy: isSuspicious ? 'Possible' : 'Not Detected',
      } : undefined,
      domain: type === 'domain' ? {
        domain_risk: isSuspicious ? 'High' : 'Medium',
        registrar: 'Cloudflare Inc. / Demo Registrar',
        domain_age_days: isSuspicious ? 18 : 340,
        status: isSuspicious ? 'Suspicious Domain' : 'Active Domain',
        is_newly_registered: isSuspicious,
      } : undefined,
      url: type === 'url' ? {
        detection_count: isSuspicious ? 34 : 2,
        total_vendors: 89,
        redirect_status: 'Single HTTP 301 Redirect',
        final_destination: clean,
        status: isSuspicious ? 'Suspicious Link' : 'Accessible Endpoint',
      } : undefined,
      hash: type === 'hash' ? {
        file_type: 'Executable Binary / Demo Payload',
        sha256: clean.length === 64 ? clean : 'a9b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0',
        md5: '8f14e45fceea167a5a36dedd4bea2543',
        detection_rate: `${isSuspicious ? 42 : 3}/70 AV Engines`,
        family: isSuspicious ? 'Trojan.Generic.KD' : 'Clean Binary',
        file_size: '342.1 KB',
      } : undefined,
      email: type === 'email' ? {
        dmarc_status: isSuspicious ? 'FAIL' : 'PASS',
        spf_status: isSuspicious ? 'FAIL' : 'PASS',
        mx_valid: true,
        disposable: false,
        domain_age: '60 days',
      } : undefined,
    },
    infrastructure: {
      ip_address: type === 'ip' ? clean : '198.51.100.42',
      country: 'United States',
      city: 'Chicago',
      region: 'Illinois',
      asn: 'AS396982',
      isp: 'Google Fiber / Tier-2 Datacenter',
      organization: 'Cloud Infrastructure Services',
      hosting_provider: 'Dedicated Cloud Nodes',
      domain: type === 'domain' ? clean : 'observed-host.net',
      registrar: 'Public Domain Registry',
      creation_date: '2025-11-12',
      expiration_date: '2027-11-12',
      nameservers: ['ns1.demo-infra.org', 'ns2.demo-infra.org'],
      mx_records: ['10 mx1.demo-infra.org'],
      dns_records: [
        { type: 'A', value: '198.51.100.42', ttl: '3600' },
        { type: 'TXT', value: 'v=spf1 include:_spf.google.com ~all', ttl: '3600' },
      ],
      url: type === 'url' ? clean : undefined,
      protocol: 'HTTPS',
      redirects_count: 1,
      final_destination: clean,
    },
    geolocation: {
      country: 'United States',
      city: 'Chicago',
      region: 'Illinois',
      country_code: 'US',
      isp: 'Cloud Infrastructure Services',
      asn: 'AS396982',
      lat: 41.8781,
      lng: -87.6298,
    },
    asn: {
      asn: 'AS396982',
      org: 'Cloud Infrastructure Services LLC',
      network: '198.51.100.0/24',
      route: 'North America Commercial Transit',
    },
    related_cases: isSuspicious ? [
      {
        id: 'INV-2026-00482',
        title: 'Executive Wire Transfer Phishing Probe',
        threat_type: 'Phishing',
        risk_score: 96,
        status: 'Investigating',
        related_indicator: clean,
        last_updated: '20 mins ago',
      },
    ] : [],
    related_indicators: [
      { from: clean, to: '198.51.100.42', type: 'ip', relation: 'Associated Routing IP', risk: riskLevel },
      { from: clean, to: 'observed-host.net', type: 'domain', relation: 'Correlated Domain', risk: 'medium' },
      { from: clean, to: 'INV-2026-00482', type: 'case', relation: 'Investigative Artifact', risk: riskLevel },
    ],
    sources: [
      { name: 'VirusTotal', category: 'Multi-AV Scanner', status: 'Available', is_demo: true, last_queried: 'Just now', detections: `${isSuspicious ? '34/89' : '0/89'} vendors flagged` },
      { name: 'AbuseIPDB', category: 'IP Abuse Database', status: 'Available', is_demo: true, last_queried: '10 mins ago', detections: isSuspicious ? 'Confidence 65%' : '0 Abuse Reports' },
      { name: 'MaxMind/IPinfo', category: 'Geo & ASN Telemetry', status: 'Connected', is_demo: true, last_queried: '1 min ago', details: 'AS396982 Mapped' },
      { name: 'RDAP/WHOIS', category: 'Registry Allocation', status: 'Connected', is_demo: true, last_queried: 'Just now', details: 'WHOIS Record Verified' },
    ],
  };
}
