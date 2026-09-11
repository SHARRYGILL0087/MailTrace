'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Activity, BrainCircuit } from 'lucide-react';

export const IntelHeader: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Link href="/" className="hover:text-slate-700 transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-slate-700 font-bold">Threat Intelligence</span>
      </nav>

      {/* Header Container */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 text-white shadow-sm shadow-emerald-500/25">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Threat Intelligence
              </h1>
            </div>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl pl-13">
            Investigate IPs, domains, URLs and other indicators associated with suspicious emails.
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-bold text-emerald-800 shadow-xs self-start sm:self-auto shrink-0">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Threat Intel Active</span>
        </div>
      </div>
    </div>
  );
};
