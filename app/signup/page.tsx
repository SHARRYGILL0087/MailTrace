'use client';

import React, { useState } from 'react';
import { Navbar } from '@/app/components/layout/Navbar';
import { SignupCard } from '@/app/components/auth/SignupCard';
import { OtpVerificationCard } from '@/app/components/auth/OtpVerificationCard';
import { SignupSuccessCard } from '@/app/components/auth/SignupSuccessCard';
import { authService } from '@/app/services/authService';
import { SignupFormData } from '@/app/types/auth';
import { Shield, Lock, CheckCircle2, FileCheck } from 'lucide-react';

type SignupStep = 'signup' | 'otp' | 'success';

export default function SignupPage() {
  const [step, setStep] = useState<SignupStep>('signup');
  const [registeredEmail, setRegisteredEmail] = useState<string>('');
  const [registeredUsername, setRegisteredUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Step 1: Submit signup form
  const handleSignupSubmit = async (formData: SignupFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const result = await authService.signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        setRegisteredEmail(result.email || formData.email);
        setRegisteredUsername(formData.username);
        setStep('otp');
      } else {
        setServerError(result.message || 'Signup failed. Please try again.');
      }
    } catch {
      setServerError('An unexpected network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify 6-digit OTP
  const handleVerifyOtp = async (otp: string) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const result = await authService.verifyOtp({
        email: registeredEmail,
        otp,
      });

      if (result.success) {
        setStep('success');
      } else {
        setServerError(result.message || 'Invalid verification code.');
      }
    } catch {
      setServerError('Failed to verify code. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    await authService.resendOtp(registeredEmail);
  };

  // Step indicator steps
  const stepsConfig = [
    { id: 'signup', label: '1. Account', icon: Shield },
    { id: 'otp', label: '2. Email OTP', icon: Lock },
    { id: 'success', label: '3. Completed', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 relative overflow-hidden">
      
      {/* Background Ambience: Subtle SOC grid and radial glow */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] [background-size:24px_24px] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]"
      />
      <div 
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-400/10 via-indigo-400/10 to-transparent blur-3xl rounded-full"
      />

      {/* Global Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 pt-2 sm:pt-6 flex flex-col items-center justify-center">
        
        {/* Step Progress Indicator */}
        <div className="mb-6 inline-flex items-center gap-1 sm:gap-2 rounded-full border border-slate-200/80 bg-white/90 px-3 py-1.5 shadow-2xs backdrop-blur-md">
          {stepsConfig.map((item, idx) => {
            const Icon = item.icon;
            const isCurrent = step === item.id;
            const isDone = 
              (step === 'otp' && item.id === 'signup') ||
              (step === 'success' && (item.id === 'signup' || item.id === 'otp'));

            return (
              <React.Fragment key={item.id}>
                {idx > 0 && <div className="h-px w-4 sm:w-6 bg-slate-200" />}
                <div 
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isDone
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-400'
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  <span>{item.label}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Dynamic Step View */}
        <div className="w-full flex justify-center">
          {step === 'signup' && (
            <SignupCard
              onSubmit={handleSignupSubmit}
              isLoading={isLoading}
              serverError={serverError}
              onClearServerError={() => setServerError(null)}
            />
          )}

          {step === 'otp' && (
            <OtpVerificationCard
              email={registeredEmail}
              onVerify={handleVerifyOtp}
              onResend={handleResendOtp}
              onBackToSignup={() => {
                setServerError(null);
                setStep('signup');
              }}
              isLoading={isLoading}
              serverError={serverError}
              onClearServerError={() => setServerError(null)}
            />
          )}

          {step === 'success' && (
            <SignupSuccessCard
              email={registeredEmail}
              username={registeredUsername}
            />
          )}
        </div>

        {/* Security Compliance Footer */}
        <div className="mt-8 text-center space-y-1.5 max-w-sm">
          <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-400">
            <Lock className="h-3 w-3 text-slate-400" />
            <span>256-Bit TLS Encryption</span>
            <span>•</span>
            <FileCheck className="h-3 w-3 text-slate-400" />
            <span>SOC 2 Type II Certified</span>
          </div>
          <p className="text-[10px] text-slate-400">
            MailTrace AI Security Operations Center Forensics Platform
          </p>
        </div>

      </main>
    </div>
  );
}
