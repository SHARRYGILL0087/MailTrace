export type UserRole = 'User' | 'Analyst' | 'Admin';

export interface RoleInfo {
  role: UserRole;
  label: string;
  description: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
}

export const ROLE_CONFIGS: Record<UserRole, RoleInfo> = {
  User: {
    role: 'User',
    label: 'User',
    description: 'Basic Analysis',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
    badgeBorder: 'border-blue-200',
  },
  Analyst: {
    role: 'Analyst',
    label: 'Analyst',
    description: 'Full Investigation',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-700',
    badgeBorder: 'border-indigo-200',
  },
  Admin: {
    role: 'Admin',
    label: 'Admin',
    description: 'Platform Management',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-800',
    badgeBorder: 'border-emerald-200',
  },
};

export interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  role: UserRole;
}

export interface SignupFormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
  role?: string;
  general?: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  email?: string;
  role?: UserRole;
  error?: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  user?: {
    username: string;
    email: string;
    role: UserRole;
    roleDescription: string;
    createdAt: string;
  };
  error?: string;
}

export interface ResendOtpResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface UserSession {
  username: string;
  email: string;
  role: UserRole;
}
