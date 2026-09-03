'use client';

import React from 'react';
import { Server } from 'lucide-react';

export const InfrastructureMapPreview: React.FC = () => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-900">Threat Infrastructure</h3>
        <p className="text-xs text-slate-500">Command & control hosting telemetry</p>
      </div>

      <div className="relative h-44 w-full rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-50" />

        <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
          </span>
          <span className="mt-1 text-[9px] font-bold text-slate-600 bg-white/90 px-1.5 py-0.5 rounded shadow-xs">Netherlands</span>
        </div>

        <div className="absolute bottom-1/3 left-1/2 flex flex-col items-center">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          <span className="mt-1 text-[9px] font-bold text-slate-600 bg-white/90 px-1.5 py-0.5 rounded shadow-xs">India</span>
        </div>

        <div className="absolute top-1/3 right-1/4 flex flex-col items-center">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          <span className="mt-1 text-[9px] font-bold text-slate-600 bg-white/90 px-1.5 py-0.5 rounded shadow-xs">Singapore</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100/70 text-blue-700">
            <Server className="h-4 w-4" />
          </div>
          <div>
            <p className="font-mono text-xs font-bold text-slate-800">185.xxx.xxx.xxx</p>
            <p className="text-[11px] text-slate-500">Amsterdam, Netherlands • Cloud Hosting</p>
          </div>
        </div>
        <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-700">
          High Risk
        </span>
      </div>
    </div>
  );
};