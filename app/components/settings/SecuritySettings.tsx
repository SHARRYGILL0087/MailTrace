'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, Clock, Key, ShieldAlert, Save, RotateCcw, Check, ArrowRight, ExternalLink } from 'lucide-react';
import { SecuritySettings as ISecuritySettings } from '@/app/types/settings';
import { LoginActivityModal } from './LoginActivityModal';

interface Props {
  settings: ISecuritySettings;
  onSave: (updated: ISecuritySettings) => void;
  onReset: () => void;
}

export const SecuritySettings: React.FC<Props> = ({ settings, onSave, onReset }) => {
  const [formData, setFormData] = useState<ISecuritySettings>({ ...settings });
  const [isSaved, setIsSaved] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [apiAccessNotice, setApiAccessNotice] = useState(false);
  const [twoFactorNotice, setTwoFactorNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            <span>Security</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage session timeouts, authentication protocols, and access control audit trails
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600">
          Policy: Strict Zero-Trust
        </span>
      </div>

      {/* Security Information Card */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 text-xs shadow-2xs">
        <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h4 className="font-bold text-amber-950">Data Protection Advisory</h4>
          <p className="text-[11px] text-amber-900/80 leading-relaxed font-medium">
            Your investigation data and evidence should be protected using secure authentication and access controls. Ensure sessions are bounded by organization compliance lifecycles.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Session Timeout */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-800">
            Console Session Timeout
          </label>
          <p className="text-[11px] text-slate-400">
            Automatically lock the analyst terminal after a period of inactive keyboard/mouse telemetry.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl">
            {(['15m', '30m', '1h', '4h'] as const).map((to) => {
              const labelMap: Record<string, string> = {
                '15m': '15 minutes',
                '30m': '30 minutes',
                '1h': '1 hour',
                '4h': '4 hours',
              };

              return (
                <button
                  key={to}
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, sessionTimeout: to }));
                    setIsSaved(false);
                  }}
                  className={`rounded-2xl border p-3 text-xs font-bold transition-all cursor-pointer ${
                    formData.sessionTimeout === to
                      ? 'border-blue-300 bg-blue-50 text-blue-800 shadow-2xs'
                      : 'border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Clock className="h-3.5 w-3.5 mx-auto mb-1 text-slate-400" />
                  <span>{labelMap[to]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Factor Authentication Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-slate-900">Two-Factor Authentication (2FA)</h3>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${
                formData.twoFactorStatus === 'Enabled'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                {formData.twoFactorStatus}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Hardware FIDO2 / WebAuthn security keys and TOTP authenticator app enforcement.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setTwoFactorNotice(true)}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs self-start sm:self-auto shrink-0"
          >
            Configure 2FA
          </button>
        </div>

        {twoFactorNotice && (
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-3 text-xs text-blue-900 font-medium animate-in fade-in flex items-center justify-between">
            <span>2FA enrollment requires Enterprise SSO authentication gateway integration (Coming Soon).</span>
            <button
              type="button"
              onClick={() => setTwoFactorNotice(false)}
              className="text-xs font-bold text-blue-700 ml-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Action Buttons Row: Login Activity & API Security */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          
          {/* View Login Activity */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 flex items-center justify-between shadow-2xs">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Console Login Activity</h4>
              <p className="text-[11px] text-slate-400">Inspect active sessions and device IPs</p>
            </div>
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-1 rounded-xl bg-slate-100 hover:bg-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors"
            >
              <span>View Activity</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Manage API Access */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 flex items-center justify-between shadow-2xs">
            <div>
              <h4 className="text-xs font-bold text-slate-900">API Access & Tokens</h4>
              <p className="text-[11px] text-slate-400">Manage automation service tokens</p>
            </div>
            <button
              type="button"
              onClick={() => setApiAccessNotice(true)}
              className="flex items-center gap-1 rounded-xl bg-slate-100 hover:bg-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors"
            >
              <span>Manage API Access</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

        </div>

        {apiAccessNotice && (
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-3 text-xs text-blue-900 font-medium animate-in fade-in flex items-center justify-between">
            <span>Scoped RBAC service accounts and webhook keys are configured in the cluster management plane (Coming Soon).</span>
            <button
              type="button"
              onClick={() => setApiAccessNotice(false)}
              className="text-xs font-bold text-blue-700 ml-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>

            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
              <span>Reset</span>
            </button>
          </div>

          {isSaved && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-blue-700 animate-in fade-in">
              <Check className="h-4 w-4" />
              <span>Settings saved successfully.</span>
            </span>
          )}
        </div>

      </form>

      {/* Login Activity Modal */}
      <LoginActivityModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

    </div>
  );
};
