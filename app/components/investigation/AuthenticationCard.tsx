'use client';

import React from 'react';
import { ShieldCheck, ShieldAlert, XCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { InvestigationData } from '@/app/types/investigation';

interface Props {
  authentication: InvestigationData['authentication'];
}

export const AuthenticationCard: React.FC<Props> = ({ authentication }) => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>🔐</span> Email Authentication
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographic signature and domain protocol policy compliance checks
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1 text-xs font-extrabold text-rose-800 self-start sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
          {authentication.summary}
        </div>
      </div>

      {/* 3 Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* SPF */}
        <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="font-mono text-xs font-extrabold tracking-wider text-slate-700">SPF</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-black text-rose-700 border border-rose-200">
              <XCircle className="h-3.5 w-3.5 text-rose-600" />
              FAIL
            </span>
          </div>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            {authentication.spf.explanation}
          </p>
        </div>

        {/* DKIM */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="font-mono text-xs font-extrabold tracking-wider text-slate-700">DKIM</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-black text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              PASS
            </span>
          </div>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            {authentication.dkim.explanation}
          </p>
        </div>

        {/* DMARC */}
        <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="font-mono text-xs font-extrabold tracking-wider text-slate-700">DMARC</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-black text-rose-700 border border-rose-200">
              <XCircle className="h-3.5 w-3.5 text-rose-600" />
              FAIL
            </span>
          </div>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            {authentication.dmarc.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};
