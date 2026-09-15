'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  ArrowRight, 
  Loader2, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft,
  KeyRound
} from 'lucide-react';

interface OtpVerificationCardProps {
  email: string;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  onBackToSignup: () => void;
  isLoading: boolean;
  serverError?: string | null;
  onClearServerError?: () => void;
}

export const OtpVerificationCard: React.FC<OtpVerificationCardProps> = ({
  email,
  onVerify,
  onResend,
  onBackToSignup,
  isLoading,
  serverError,
  onClearServerError,
}) => {
  // 6 separate digits
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [resendNotice, setResendNotice] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState<boolean>(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 30s Countdown timer effect
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Focus the first input on load
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    setOtpError(null);
    if (serverError && onClearServerError) onClearServerError();

    // Clean input - only numbers
    const cleanValue = value.replace(/\D/g, '');

    // If pasted multi-digit text
    if (cleanValue.length > 1) {
      const chars = cleanValue.slice(0, 6).split('');
      const newDigits = [...digits];
      chars.forEach((ch, idx) => {
        if (index + idx < 6) {
          newDigits[index + idx] = ch;
        }
      });
      setDigits(newDigits);
      const nextFocus = Math.min(index + chars.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = cleanValue.slice(-1);
    setDigits(newDigits);

    // Auto-advance to next input
    if (cleanValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Move back and clear previous
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const newDigits = [...digits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pastedData[i] || '';
    }
    setDigits(newDigits);
    const targetIndex = Math.min(pastedData.length, 5);
    inputRefs.current[targetIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = digits.join('');

    if (otp.length < 6) {
      setOtpError('Please enter all 6 digits of your verification code.');
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setOtpError('Verification code must contain 6 numbers.');
      return;
    }

    await onVerify(otp);
  };

  const handleResendClick = async () => {
    if (!canResend || isResending) return;
    setIsResending(true);
    setResendNotice(null);
    setOtpError(null);

    try {
      await onResend();
      setCanResend(false);
      setCountdown(30);
      setResendNotice('A new verification code has been sent to your email.');
      setTimeout(() => setResendNotice(null), 5000);
    } finally {
      setIsResending(false);
    }
  };

  const isComplete = digits.every((d) => d !== '');

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm backdrop-blur-xs">
      
      {/* Top Header */}
      <div className="text-center space-y-3 pb-5 border-b border-slate-100">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100">
          <KeyRound className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Verify your email
          </h2>
          <p className="mt-1 text-xs text-slate-500 leading-relaxed">
            We sent a verification code to your email address.
          </p>
        </div>

        {/* Email Badge & Edit */}
        <div className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-1.5 border border-slate-200/80 text-xs">
          <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="font-bold text-slate-800 truncate max-w-[200px]">{email}</span>
          <button
            type="button"
            onClick={onBackToSignup}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer ml-1"
          >
            Change
          </button>
        </div>
      </div>

      {/* Success Notification for Resend */}
      {resendNotice && (
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-3 text-xs font-semibold text-emerald-800 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{resendNotice}</span>
        </div>
      )}

      {/* Server or Validation Error Alert */}
      {(serverError || otpError) && (
        <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50/90 p-3.5 text-xs font-semibold text-rose-800 animate-in fade-in">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{serverError || otpError}</span>
        </div>
      )}

      {/* 6-Digit OTP Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        
        {/* Digits Container */}
        <div>
          <label className="block text-center text-xs font-bold text-slate-700 mb-3">
            Enter 6-digit code
          </label>
          <div className="flex items-center justify-between gap-2 sm:gap-2.5">
            {digits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                id={`otp-input-${idx}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                disabled={isLoading}
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                className={`h-12 w-11 sm:h-13 sm:w-13 text-center text-lg sm:text-xl font-black rounded-xl border bg-slate-50/80 text-slate-900 transition-all focus:bg-white focus:outline-none ${
                  digit
                    ? 'border-blue-500 bg-blue-50/40 text-blue-900 ring-2 ring-blue-500/10'
                    : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              />
            ))}
          </div>
          <p className="mt-2 text-center text-[11px] text-slate-400">
            Enter the 6 numbers sent to your inbox (Default: <span className="font-mono font-bold text-slate-600">123456</span>)
          </p>
        </div>

        {/* Primary Action Button: Verify Email */}
        <div>
          <button
            id="otp-verify-btn"
            type="submit"
            disabled={isLoading || !isComplete}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-indigo-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Verifying Code...</span>
              </>
            ) : (
              <>
                <span>Verify Email</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {/* Resend OTP Section with Countdown */}
        <div className="pt-1 flex flex-col items-center justify-center gap-1.5 text-center">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500">Didn&apos;t receive code?</span>
            {canResend ? (
              <button
                id="otp-resend-btn"
                type="button"
                disabled={isResending}
                onClick={handleResendClick}
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer flex items-center gap-1"
              >
                {isResending ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <RotateCcw className="h-3 w-3" />
                )}
                <span>Resend OTP</span>
              </button>
            ) : (
              <span className="font-semibold text-slate-400">
                Resend in {countdown}s
              </span>
            )}
          </div>

          {/* Back button */}
          <button
            type="button"
            onClick={onBackToSignup}
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to signup details</span>
          </button>
        </div>

      </form>

    </div>
  );
};
