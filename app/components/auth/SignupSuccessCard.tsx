'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ArrowRight, ShieldCheck, User, Mail, Sparkles } from 'lucide-react';

interface SignupSuccessCardProps {
  email: string;
  username: string;
}

export const SignupSuccessCard: React.FC<SignupSuccessCardProps> = ({
  email,
  username,
}) => {
  const router = useRouter();
  const [redirectCountdown, setRedirectCountdown] = useState<number>(5);

  useEffect(() => {
    if (redirectCountdown <= 0) {
      router.push('/login');
      return;
    }

    const timer = setInterval(() => {
      setRedirectCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [redirectCountdown, router]);

  const handleContinue = () => {
    router.push('/login');
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50/30 p-6 sm:p-8 shadow-sm backdrop-blur-xs text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Icon Badge */}
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 ring-8 ring-emerald-50">
        <CheckCircle2 className="h-8 w-8" />
      </div>

      {/* Main Text */}
      <div className="space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
          Account created successfully
        </h2>
        <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
          Your MailTrace AI console access is active and ready to investigate email threats.
        </p>
      </div>

      {/* Account Details Summary Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-left space-y-2.5 shadow-2xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Account Profile
          </span>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
            Active
          </span>
        </div>

        <div className="flex items-center gap-2.5 text-xs">
          <User className="h-4 w-4 text-slate-400 shrink-0" />
          <span className="text-slate-500 font-medium">Username:</span>
          <span className="font-bold text-slate-900">{username || 'User'}</span>
        </div>

        <div className="flex items-center gap-2.5 text-xs">
          <Mail className="h-4 w-4 text-slate-400 shrink-0" />
          <span className="text-slate-500 font-medium">Email:</span>
          <span className="font-bold text-slate-900 truncate max-w-[200px]">{email}</span>
        </div>

        <div className="flex items-center gap-2.5 text-xs pt-1 border-t border-slate-100">
          <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
          <span className="text-slate-500 font-medium">Assigned Role:</span>
          <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-700 border border-blue-200/60">
            User (Basic Analysis)
          </span>
        </div>
      </div>

      {/* Role Notice */}
      <div className="flex items-start gap-2.5 rounded-2xl bg-blue-50/60 border border-blue-100 p-3 text-left">
        <Sparkles className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-[11px] text-blue-900/80 leading-relaxed font-medium">
          New accounts begin with <strong>Basic Analysis</strong> permissions. SOC Administrators can elevate your role to <strong>Analyst</strong> or <strong>Admin</strong> anytime.
        </p>
      </div>

      {/* Action Button: Continue to Login */}
      <div className="space-y-2">
        <button
          id="continue-to-login-btn"
          type="button"
          onClick={handleContinue}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
        >
          <span>Continue to Login</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <p className="text-[11px] text-slate-400">
          Redirecting to login in <span className="font-bold text-slate-600">{redirectCountdown}s</span>...
        </p>
      </div>

    </div>
  );
};
