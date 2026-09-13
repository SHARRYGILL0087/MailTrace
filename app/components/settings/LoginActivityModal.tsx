'use client';

import React from 'react';
import { X, ShieldCheck, Laptop, Globe, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';
import { MOCK_LOGIN_ACTIVITY } from '@/app/data/mockSettingsData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginActivityModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl z-10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Active Login Sessions</h3>
              <p className="text-[11px] text-slate-500">Audit trail of authenticated analyst consoles</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {MOCK_LOGIN_ACTIVITY.map((sess) => {
            const isCurrent = sess.status === 'Current Session';

            return (
              <div
                key={sess.id}
                className={`rounded-2xl border p-3.5 space-y-1.5 transition-all ${
                  isCurrent
                    ? 'border-blue-200 bg-blue-50/50'
                    : 'border-slate-200/80 bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Laptop className="h-3.5 w-3.5 text-slate-500" />
                    <span className="text-xs font-bold text-slate-900">{sess.device}</span>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isCurrent
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {sess.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {sess.ip} ({sess.location})
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {sess.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-400">
            Sessions expire per organization timeout
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-4 py-2 font-bold text-white hover:bg-slate-800 transition-colors shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
