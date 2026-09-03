'use client';

import React from 'react';
import { ShieldAlert, Server, Layers, ArrowRight } from 'lucide-react';

interface Props {
  onNextStepClick?: () => void;
}

export const InvestigationSummary: React.FC<Props> = ({ onNextStepClick }) => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md space-y-6">
      <div>
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <span>📋</span> Investigation Summary
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">High-level outcome status matrix</p>
      </div>

      {/* 3 Outcome Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Threat */}
        <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4 shadow-xs">
          <div className="flex items-center gap-2 text-rose-700 mb-1">
            <ShieldAlert className="h-4 w-4" />
            <span className="text-xs font-extrabold uppercase tracking-wider">Threat Level</span>
          </div>
          <div className="text-sm font-extrabold text-rose-900">🔴 High Risk</div>
          <p className="text-[11px] text-rose-700 mt-1 font-medium">91/100 Threat Assessment Score</p>
        </div>

        {/* Infrastructure */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4 shadow-xs">
          <div className="flex items-center gap-2 text-amber-800 mb-1">
            <Server className="h-4 w-4" />
            <span className="text-xs font-extrabold uppercase tracking-wider">Infrastructure</span>
          </div>
          <div className="text-sm font-extrabold text-amber-900">🟠 Suspicious</div>
          <p className="text-[11px] text-amber-800 mt-1 font-medium">185.220.101.5 (Netherlands C2)</p>
        </div>

        {/* Campaign */}
        <div className="rounded-2xl border border-purple-200 bg-purple-50/40 p-4 shadow-xs">
          <div className="flex items-center gap-2 text-purple-700 mb-1">
            <Layers className="h-4 w-4" />
            <span className="text-xs font-extrabold uppercase tracking-wider">Campaign Correlation</span>
          </div>
          <div className="text-sm font-extrabold text-purple-900">🟠 Related Activity Detected</div>
          <p className="text-[11px] text-purple-700 mt-1 font-medium">Campaign #CAMP-024 (87% Match)</p>
        </div>
      </div>

      {/* Next Recommended Step Box */}
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50/60 p-4 space-y-2">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 block">
          Next Recommended Step
        </span>
        <blockquote className="text-xs font-bold text-slate-800 leading-relaxed italic">
          "Investigate the related campaign and review other emails associated with the observed IP/domain infrastructure."
        </blockquote>
      </div>
    </div>
  );
};
