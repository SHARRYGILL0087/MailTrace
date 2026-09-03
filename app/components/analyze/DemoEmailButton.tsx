'use client';

import React from 'react';
import { FlaskConical, ArrowRight } from 'lucide-react';

interface DemoEmailButtonProps {
  onLoadDemo: () => void;
}

export const DemoEmailButton: React.FC<DemoEmailButtonProps> = ({ onLoadDemo }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/60 via-purple-50/20 to-white p-4 shadow-2xs">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100/80 text-indigo-700 border border-indigo-200/80 shrink-0">
          <FlaskConical className="h-4.5 w-4.5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900">
            Try a Sample Email
          </h4>
          <p className="text-[11px] text-slate-500">
            Explore the platform with a preloaded phishing scenario.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onLoadDemo}
        className="flex items-center justify-center gap-1.5 rounded-xl border border-indigo-200 bg-white px-4 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors shadow-2xs shrink-0"
      >
        Load Demo Email
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
