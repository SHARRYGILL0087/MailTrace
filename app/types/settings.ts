export type SettingsTab =
  | 'general'
  | 'integrations'
  | 'ai'
  | 'notifications'
  | 'security'
  | 'data'
  | 'about';

export interface GeneralSettings {
  appName: string;
  timezone: string;
  dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
  theme: 'Light' | 'Dark' | 'System';
  defaultView: 'Overview' | 'Forensics' | 'Threat Intelligence' | 'Threat Graph';
}

export type IntegrationStatus = 'Connected' | 'Not Configured' | 'Connection Error';

export interface ThreatIntelIntegration {
  id: string;
  name: string;
  category: string;
  description: string;
  status: IntegrationStatus;
  maskedKey: string;
  isConfigured: boolean;
  lastTested?: string;
  latencyMs?: number;
  rateLimit?: string;
}

export interface AIDetectionSettings {
  aiDetection: boolean;
  nlpAnalysis: boolean;
  anomalyDetection: boolean;
  spoofingDetection: boolean;
  explainability: boolean;
  explainabilityMethod: 'SHAP' | 'LIME' | 'Both';
  threatSensitivity: 'Low' | 'Medium' | 'High';
  confidenceThreshold: number; // 0.0 to 1.0
}

export interface NotificationSettings {
  highRiskDetected: boolean;
  criticalThreatDetected: boolean;
  apiFailure: boolean;
  reportCompleted: boolean;
  caseAssigned: boolean;
  emailNotifications: boolean;
  browserNotifications: boolean;
}

export interface SecuritySettings {
  sessionTimeout: '15m' | '30m' | '1h' | '4h';
  twoFactorStatus: 'Enabled' | 'Not Configured';
  enforceStrongPasswords: boolean;
  auditLogging: boolean;
}

export interface LoginActivityItem {
  id: string;
  ip: string;
  location: string;
  device: string;
  time: string;
  status: 'Current Session' | 'Active' | 'Revoked';
}

export interface DataEvidenceSettings {
  retentionPeriod: '30d' | '90d' | '180d' | '1y' | 'custom';
  autoHashing: boolean;
  chainOfCustody: boolean;
  reportIntegrityVerification: boolean;
  hashAlgorithm: 'SHA-256' | 'SHA-512' | 'SHA3-256';
}

export interface FullSettings {
  general: GeneralSettings;
  integrations: ThreatIntelIntegration[];
  ai: AIDetectionSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
  dataEvidence: DataEvidenceSettings;
}
