export type UserRole = 'User' | 'Analyst' | 'Admin';

export interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export interface SignupFormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
  general?: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
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
