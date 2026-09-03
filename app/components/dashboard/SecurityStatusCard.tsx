'use client';

import React from 'react';
import { ENGINE_STATUS_DATA } from '@/app/data/mockDashboardData';

export const SecurityStatusCard: React.FC = () => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Platform Security</h4>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          99.98% Availability
        </span>
      </div>
      <ul className="space-y-2">
        {ENGINE_STATUS_DATA.map((engine) => (
          <li key={engine.name} className="flex items-center justify-between text-xs">
            <span className="text-slate-600">{engine.name}</span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-medium text-slate-400">{engine.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};