'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2, 
  ShieldCheck, 
  AlertCircle,
  CheckCircle2,
  Shield,
  ShieldAlert,
  Check
} from 'lucide-react';
import { ThreatShieldLogo } from '@/app/components/ui/ThreatShieldLogo';
import { SignupFormData, SignupFormErrors, UserRole, ROLE_CONFIGS } from '@/app/types/auth';

interface SignupCardProps {
  onSubmit: (data: SignupFormData) => Promise<void>;
  isLoading: boolean;
  serverError?: string | null;
  onClearServerError?: () => void;
}

export const SignupCard: React.FC<SignupCardProps> = ({
  onSubmit,
  isLoading,
  serverError,
  onClearServerError,
}) => {
  const [formData, setFormData] = useState<SignupFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    role: 'User',
  });

  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Field change handler with instant error clearing
  const handleChange = (field: keyof SignupFormData, value: string | boolean | UserRole) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (serverError && onClearServerError) {
      onClearServerError();
    }
  };

  // Frontend Validation logic
  const validateForm = (): boolean => {
    const newErrors: SignupFormErrors = {};

    // 1. Username
    const trimmedUsername = formData.username.trim();
    if (!trimmedUsername) {
      newErrors.username = 'Username is required.';
    } else if (trimmedUsername.length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
    } else if (!/^[a-zA-Z0-9._-]+$/.test(trimmedUsername)) {
      newErrors.username = 'Username can only contain letters, numbers, dots, and hyphens.';
    }

    // 2. Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // 3. Password
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    // 4. Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    // 5. Terms and conditions
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms & Conditions and Privacy Policy.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    await onSubmit(formData);
  };

  const currentRoleConfig = ROLE_CONFIGS[formData.role];

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm backdrop-blur-xs">
      
      {/* Brand & Heading Section */}
      <div className="text-center space-y-3 pb-6 border-b border-slate-100">
        <div className="inline-flex items-center justify-center">
          <Link href="/" className="inline-flex items-center gap-3 group cursor-pointer">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 group-hover:scale-105 group-hover:shadow-blue-500/35 transition-all">
              <ThreatShieldLogo size={26} variant="on-blue" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                MailTrace
              </span>
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 border border-blue-200/80 shadow-2xs">
                AI
              </span>
            </div>
          </Link>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Create your account
          </h1>
          <p className="mt-1 text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            Join MailTrace AI to analyze and investigate suspicious emails.
          </p>
        </div>

        {/* Dynamic Security Role Badge */}
        <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold transition-all ${currentRoleConfig.badgeBg} ${currentRoleConfig.badgeText} ${currentRoleConfig.badgeBorder}`}>
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Assigned Role: {currentRoleConfig.label} ({currentRoleConfig.description})</span>
        </div>
      </div>

      {/* Server Error Alert */}
      {serverError && (
        <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50/90 p-3.5 text-xs font-semibold text-rose-800 animate-in fade-in">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{serverError}</span>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        
        {/* 1. Username */}
        <div className="space-y-1.5">
          <label htmlFor="signup-username" className="block text-xs font-bold text-slate-800">
            Username
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <User className="h-4 w-4" />
            </div>
            <input
              id="signup-username"
              name="username"
              type="text"
              autoComplete="username"
              disabled={isLoading}
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              placeholder="Enter your username"
              className={`w-full rounded-xl border bg-slate-50/70 pl-10 pr-3.5 py-2.5 text-xs font-semibold text-slate-900 transition-all placeholder:text-slate-400 focus:bg-white focus:outline-none ${
                errors.username
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            />
          </div>
          {errors.username && (
            <p className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 animate-in fade-in">
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span>{errors.username}</span>
            </p>
          )}
        </div>

        {/* 2. Email */}
        <div className="space-y-1.5">
          <label htmlFor="signup-email" className="block text-xs font-bold text-slate-800">
            Email
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              disabled={isLoading}
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter your email address"
              className={`w-full rounded-xl border bg-slate-50/70 pl-10 pr-3.5 py-2.5 text-xs font-semibold text-slate-900 transition-all placeholder:text-slate-400 focus:bg-white focus:outline-none ${
                errors.email
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            />
          </div>
          {errors.email && (
            <p className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 animate-in fade-in">
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* 3. Password */}
        <div className="space-y-1.5">
          <label htmlFor="signup-password" className="block text-xs font-bold text-slate-800">
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Lock className="h-4 w-4" />
            </div>
            <input
              id="signup-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              disabled={isLoading}
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Create a password"
              className={`w-full rounded-xl border bg-slate-50/70 pl-10 pr-10 py-2.5 text-xs font-semibold text-slate-900 transition-all placeholder:text-slate-400 focus:bg-white focus:outline-none ${
                errors.password
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 animate-in fade-in">
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        {/* 4. Confirm Password */}
        <div className="space-y-1.5">
          <label htmlFor="signup-confirm-password" className="block text-xs font-bold text-slate-800">
            Confirm Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Lock className="h-4 w-4" />
            </div>
            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              disabled={isLoading}
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              placeholder="Confirm your password"
              className={`w-full rounded-xl border bg-slate-50/70 pl-10 pr-10 py-2.5 text-xs font-semibold text-slate-900 transition-all placeholder:text-slate-400 focus:bg-white focus:outline-none ${
                errors.confirmPassword
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 animate-in fade-in">
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span>{errors.confirmPassword}</span>
            </p>
          )}
        </div>

        {/* 5. Role Choose Option */}
        <div className="space-y-1.5 pt-1">
          <label className="block text-xs font-bold text-slate-800">
            Choose Your Role
          </label>
          <p className="text-[11px] text-slate-400">
            Select your primary operations tier for MailTrace AI.
          </p>
          <div className="grid grid-cols-3 gap-2 pt-1">
            {(['User', 'Analyst', 'Admin'] as const).map((r) => {
              const isSelected = formData.role === r;
              const configs = {
                User: { icon: Shield, subtitle: 'Basic Analysis' },
                Analyst: { icon: ShieldAlert, subtitle: 'Full Investigation' },
                Admin: { icon: ShieldCheck, subtitle: 'Platform Admin' },
              }[r];
              const Icon = configs.icon;

              return (
                <button
                  key={r}
                  id={`signup-role-${r.toLowerCase()}-btn`}
                  type="button"
                  onClick={() => handleChange('role', r)}
                  className={`flex flex-col items-start p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-400 bg-blue-50/70 text-blue-900 shadow-2xs ring-2 ring-blue-500/10'
                      : 'border-slate-200 bg-slate-50/60 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <Icon className={`h-4 w-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                    {isSelected && <Check className="h-3 w-3 text-blue-600" />}
                  </div>
                  <span className="mt-1.5 text-xs font-bold text-slate-900">{r}</span>
                  <span className="text-[10px] text-slate-400 font-medium leading-tight">{configs.subtitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. Terms & Conditions checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              id="signup-agree-terms"
              type="checkbox"
              disabled={isLoading}
              checked={formData.agreeTerms}
              onChange={(e) => handleChange('agreeTerms', e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer accent-blue-600"
            />
            <span className="text-[11px] font-medium text-slate-600 leading-tight">
              I agree to the{' '}
              <span className="font-semibold text-blue-600 hover:underline">Terms &amp; Conditions</span>
              {' '}and{' '}
              <span className="font-semibold text-blue-600 hover:underline">Privacy Policy</span>
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-rose-600 animate-in fade-in">
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span>{errors.agreeTerms}</span>
            </p>
          )}
        </div>

        {/* 7. Primary Button: Create Account */}
        <div className="pt-2">
          <button
            id="signup-submit-btn"
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-indigo-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {/* 8. Below Button: Already have an account? Login */}
        <div className="pt-2 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link
            id="signup-login-link"
            href="/login"
            className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            Login
          </Link>
        </div>

      </form>

      {/* Role Notice Guarantee */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          <span>Zero-Trust Role-Based Access Control</span>
        </div>
        <span className="font-semibold text-slate-600">Selected Tier: {formData.role}</span>
      </div>

    </div>
  );
};
