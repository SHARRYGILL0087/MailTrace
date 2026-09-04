'use client';

import React from 'react';
import { Loader2, CheckCircle2, Circle } from 'lucide-react';

export const GeoLoadingState: React.FC = () => {
  const steps = [
    { label: 'Loading investigation data', status: 'done' },
    { label: 'Extracting IP addresses', status: 'done' },
    { label: 'Resolving geolocation', status: 'done' },
    { label: 'Loading infrastructure intelligence', status: 'active' },
    { label: 'Mapping locations', status: 'pending' },
    { label: 'Correlating campaigns', status: 'pending' },
    { label: 'Generating geographic insights', status: 'pending' },
  ];

  return (
    <div className="flex h-[480px] w-full flex-col items-center justify-center rounded-3xl border border-slate-200/90 bg-white p-8 text-center shadow-xs">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-teal-50 text-teal-600 border border-teal-100 shadow-xs">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-4">
        Mapping Threat Infrastructure...
      </h3>

      <div className="w-full max-w-sm rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-left space-y-2.5">
        {steps.map((step) => (
          <div key={step.label} className="flex items-center gap-3 text-xs font-semibold">
            {step.status === 'done' && (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            )}
            {step.status === 'active' && (
              <span className="h-4 w-4 rounded-full border-2 border-teal-600 border-t-transparent animate-spin shrink-0" />
            )}
            {step.status === 'pending' && (
              <Circle className="h-4 w-4 text-slate-300 shrink-0" />
            )}
            <span className={
              step.status === 'done'
                ? 'text-slate-800'
                : step.status === 'active'
                ? 'text-teal-700 font-bold'
                : 'text-slate-400'
            }>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
