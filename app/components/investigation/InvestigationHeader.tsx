'use client';

import React, { useState } from 'react';
import { Download, MoreVertical, ShieldAlert, Sparkles, Share2, Printer, Flag } from 'lucide-react';
import { InvestigationData } from '@/app/types/investigation';

interface Props {
  data: InvestigationData;
  onExportReport: () => void;
}

export const InvestigationHeader: React.FC<Props> = ({ data, onExportReport }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  return (
    <div className="relative rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
              <span className="text-2xl">🕵️</span>
              <span>Investigation #{data.id}</span>
            </h1>

            {/* Risk Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              {data.riskLevel}
            </span>

            {/* Status Pill */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              {data.status}
            </span>
          </div>

          <p className="text-sm font-medium text-slate-600">
            {data.title}
          </p>
          <p className="text-xs text-slate-400">
            {data.subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 self-start lg:self-auto shrink-0">
          <button
            onClick={onExportReport}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>

          {/* More Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              aria-label="More Actions"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            {showMoreMenu && (
              <div className="absolute right-0 top-12 z-30 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={() => {
                    setShowMoreMenu(false);
                    onExportReport();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Share2 className="h-4 w-4 text-slate-400" />
                  <span>Share Case Link</span>
                </button>
                <button
                  onClick={() => {
                    setShowMoreMenu(false);
                    window.print();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Printer className="h-4 w-4 text-slate-400" />
                  <span>Print Case Summary</span>
                </button>
                <div className="my-1 border-t border-slate-100" />
                <button
                  onClick={() => {
                    setShowMoreMenu(false);
                    alert('Case flagged for tier-3 senior SOC review');
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                >
                  <Flag className="h-4 w-4 text-rose-500" />
                  <span>Escalate to Tier-3 SOC</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
