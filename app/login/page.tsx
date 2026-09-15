'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/app/components/layout/Navbar';
import { ThreatShieldLogo } from '@/app/components/ui/ThreatShieldLogo';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Shield, 
  ShieldAlert, 
  Check 
} from 'lucide-react';
import { UserRole, ROLE_CONFIGS } from '@/app/types/auth';
import { authService } from '@/app/services/authService';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('Analyst');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = email.split('@')[0] || 'Analyst';
    const cleanEmail = email || `${cleanUsername.toLowerCase()}@mailtrace.cyber`;

    // Persist session with chosen role
    authService.setSession({
      username: cleanUsername,
      email: cleanEmail,
      role,
    });

    setIsSubmitted(true);
  };

  const currentRoleConfig = ROLE_CONFIGS[role];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 relative overflow-hidden">
      {/* Background Ambience */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] [background-size:24px_24px] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]"
      />
      <div 
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-400/10 via-indigo-400/10 to-transparent blur-3xl rounded-full"
      />

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 pt-4 sm:pt-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm backdrop-blur-xs">
          
          {/* Header */}
          <div className="text-center space-y-3 pb-6 border-b border-slate-100">
            <div className="inline-flex items-center justify-center">
              <Link href="/" className="inline-flex items-center gap-3 group cursor-pointer">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-all">
                  <ThreatShieldLogo size={26} variant="on-blue" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-tight text-slate-900">
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
                Welcome back
              </h1>
              <p className="mt-1 text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Enter your credentials and select your authorization role.
              </p>
            </div>

            <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold transition-all ${currentRoleConfig.badgeBg} ${currentRoleConfig.badgeText} ${currentRoleConfig.badgeBorder}`}>
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Logging in as: {currentRoleConfig.label} ({currentRoleConfig.description})</span>
            </div>
          </div>

          {isSubmitted ? (
            <div className="mt-6 text-center space-y-4 py-4 animate-in fade-in zoom-in-95">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Console Session Authenticated</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Active role: <strong className="text-slate-800 font-semibold">{currentRoleConfig.label}</strong> ({currentRoleConfig.description})
                </p>
              </div>
              <button
                type="button"
                onClick={() => router.push('/')}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
              >
                <span>Enter SOC Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              
              {/* Email input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">Email Address</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-3.5 py-2.5 text-xs font-semibold text-slate-900 transition-all placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              {/* Password input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">Password</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-10 py-2.5 text-xs font-semibold text-slate-900 transition-all placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Role Choose Option */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-xs font-bold text-slate-800">
                  Select Authorization Role
                </label>
                <p className="text-[11px] text-slate-400">
                  Choose the persona role for this console session.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {(['User', 'Analyst', 'Admin'] as const).map((r) => {
                    const isSelected = role === r;
                    const configs = {
                      User: { icon: Shield, subtitle: 'Basic Analysis' },
                      Analyst: { icon: ShieldAlert, subtitle: 'Full Investigation' },
                      Admin: { icon: ShieldCheck, subtitle: 'Platform Admin' },
                    }[r];
                    const Icon = configs.icon;

                    return (
                      <button
                        key={r}
                        id={`login-role-${r.toLowerCase()}-btn`}
                        type="button"
                        onClick={() => setRole(r)}
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

              <div className="pt-2">
                <button
                  id="login-submit-btn"
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
                >
                  <span>Sign In as {role}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="pt-2 text-center text-xs text-slate-500">
                Don&apos;t have an account yet?{' '}
                <Link
                  href="/signup"
                  className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  Create Account
                </Link>
              </div>
            </form>
          )}

        </div>
      </main>
    </div>
  );
}
