'use client';

import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

export const CountryDistributionCard: React.FC = () => {
  const countries = [
    { flag: '🇳🇱', name: 'Netherlands', count: 18, percentage: 38 },
    { flag: '🇺🇸', name: 'United States', count: 14, percentage: 30 },
    { flag: '🇸🇬', name: 'Singapore', count: 9, percentage: 19 },
    { flag: '🇮🇳', name: 'India', count: 7, percentage: 15 },
    { flag: '🇩🇪', name: 'Germany', count: 5, percentage: 11 },
  ];

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm flex flex-col justify-between h-full flex-1">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 border border-teal-100">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">🌍 Top Countries</h3>
              <p className="text-xs text-slate-500">Highest concentration of observed infrastructure</p>
            </div>
          </div>
        </div>

        <div className="space-y-2.5 my-2 text-xs">
          {countries.map((c) => (
            <div key={c.name} className="flex items-center justify-between rounded-2xl border border-slate-100 p-2.5 bg-slate-50/60">
              <div className="flex items-center gap-2">
                <span className="text-base">{c.flag}</span>
                <span className="font-bold text-slate-800">{c.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 rounded-full bg-slate-200 overflow-hidden hidden sm:block">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: `${c.percentage * 2}%` }} />
                </div>
                <span className="font-extrabold text-teal-700">{c.count} <span className="text-[10px] font-medium text-slate-400">IPs</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors mt-auto">
        <span>View All Countries</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
