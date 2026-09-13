'use client';

import React from 'react';
import Link from 'next/link';

export const AnalyzeHeader: React.FC = () => {
  return (
    <div className="mb-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
        <Link href="/" className="hover:text-blue-600 font-medium transition-colors">
          Dashboard
        </Link>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-slate-700">Analyze Email</span>
      </nav>

      {/* Main Title & Engine Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Analyze Suspicious Email
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Upload an email and let Threat Shield detect threats, analyze technical evidence, and investigate its origin.
          </p>
        </div>

        {/* Engine Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-xs shrink-0 self-start sm:self-center">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Analysis Engine Online
        </div>
      </div>
    </div>
  );
};
