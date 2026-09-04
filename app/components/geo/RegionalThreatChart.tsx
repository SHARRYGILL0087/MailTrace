'use client';

import React from 'react';
import { Globe, BarChart3 } from 'lucide-react';

export const RegionalThreatChart: React.FC = () => {
  const regions = [
    { label: 'Europe', percentage: 42, color: 'bg-blue-600', text: 'text-blue-900' },
    { label: 'North America', percentage: 31, color: 'bg-cyan-500', text: 'text-cyan-900' },
    { label: 'Asia', percentage: 18, color: 'bg-indigo-500', text: 'text-indigo-900' },
    { label: 'Other Regions', percentage: 9, color: 'bg-purple-400', text: 'text-purple-900' },
  ];

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100">
            <Globe className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">🌎 Threats by Region</h3>
            <p className="text-xs text-slate-500">Geographic footprint by continent</p>
          </div>
        </div>

        <div className="space-y-3.5 my-2">
          {regions.map((r) => (
            <div key={r.label} className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>{r.label}</span>
                <span>{r.percentage}%</span>
              </div>
              <div className="h-3.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className={`h-full ${r.color} rounded-full transition-all duration-500`} style={{ width: `${r.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
