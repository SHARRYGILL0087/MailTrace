'use client';

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  onRetry: () => void;
}

export const SettingsErrorState: React.FC<Props> = ({ onRetry }) => {
  return (
    <div className="rounded-3xl border border-rose-200/80 bg-white p-10 md:p-12 text-center shadow-xs space-y-4">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-100">
        <AlertCircle className="h-7 w-7" />
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-bold text-slate-900">
          Unable to load settings
        </h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          An error occurred while loading the application settings. Please try again.
        </p>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-xs"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Retry</span>
        </button>
      </div>
    </div>
  );
};
