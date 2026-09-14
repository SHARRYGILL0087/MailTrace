'use client';

import React from 'react';
import { PieChart, Server, Globe2, BarChart2 } from 'lucide-react';

export const GraphStatistics: React.FC = () => {
  const threatTypes = [
    { label: 'Phishing', percentage: 48, color: 'bg-rose-500', text: 'text-rose-700' },
    { label: 'BEC', percentage: 22, color: 'bg-orange-500', text: 'text-orange-700' },
    { label: 'Impersonation', percentage: 18, color: 'bg-purple-500', text: 'text-purple-700' },
    { label: 'Malware', percentage: 12, color: 'bg-cyan-500', text: 'text-cyan-700' },
  ];

  const infraTypes = [
    { label: 'Cloud Infrastructure', percentage: 52, color: 'bg-blue-500' },
    { label: 'Offshore Hosting', percentage: 31, color: 'bg-indigo-500' },
    { label: 'Enterprise Networks', percentage: 17, color: 'bg-slate-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full flex-1">
      
      {/* Threat Nodes Distribution */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-100">
              <PieChart className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Threat Nodes Breakdown</h3>
              <p className="text-xs text-slate-500">Distribution by threat classification</p>
            </div>
          </div>

          {/* Multi-segmented Progress Bar */}
          <div className="h-3 w-full rounded-full bg-slate-100 flex overflow-hidden mb-4">
            {threatTypes.map((t) => (
              <div key={t.label} className={`${t.color} h-full`} style={{ width: `${t.percentage}%` }} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          {threatTypes.map((t) => (
            <div key={t.label} className="flex items-center justify-between rounded-xl border border-slate-100 p-2.5 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${t.color}`} />
                <span className="font-semibold text-slate-700">{t.label}</span>
              </div>
              <span className={`font-bold ${t.text}`}>{t.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Infrastructure Distribution */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
              <Server className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Infrastructure Distribution</h3>
              <p className="text-xs text-slate-500">Hosting & network footprint breakdown</p>
            </div>
          </div>

          {/* Multi-segmented Progress Bar */}
          <div className="h-3 w-full rounded-full bg-slate-100 flex overflow-hidden mb-4">
            {infraTypes.map((t) => (
              <div key={t.label} className={`${t.color} h-full`} style={{ width: `${t.percentage}%` }} />
            ))}
          </div>
        </div>

        <div className="space-y-2 text-xs">
          {infraTypes.map((t) => (
            <div key={t.label} className="flex items-center justify-between rounded-xl border border-slate-100 p-2.5 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${t.color}`} />
                <span className="font-semibold text-slate-700">{t.label}</span>
              </div>
              <span className="font-bold text-slate-900">{t.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
