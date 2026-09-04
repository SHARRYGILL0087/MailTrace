'use client';

import React from 'react';
import { Plus, ShieldCheck, Activity } from 'lucide-react';

interface ReportHeaderProps {
  onGenerateClick: () => void;
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({ onGenerateClick }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Forensic Reports
          </h1>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-800 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Reporting Engine Online
          </div>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl">
          Generate, review and manage investigation-ready email threat reports.
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onGenerateClick}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-cyan-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Generate Report</span>
        </button>
      </div>
    </div>
  );
};
