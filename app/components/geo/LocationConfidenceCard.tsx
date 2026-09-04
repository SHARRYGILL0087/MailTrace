'use client';

import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';

export const LocationConfidenceCard: React.FC = () => {
  const evidenceList = [
    'IP geolocation databases',
    'ASN & BGP routing data',
    'Hosting provider WHOIS',
    'Reverse DNS resolution',
    'Email header route trace',
    'Threat intelligence feeds',
  ];

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
            <Target className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">🎯 Location Confidence</h3>
            <p className="text-xs text-slate-500">Multilateral verification of network location</p>
          </div>
        </div>

        {/* Circular Gauge Score */}
        <div className="flex items-center justify-center my-4">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-blue-100 bg-blue-50/50 shadow-inner">
            <div className="text-center">
              <span className="text-3xl font-black text-blue-900">82%</span>
              <div className="text-[9px] font-bold uppercase tracking-wider text-blue-600 mt-0.5">
                Confidence
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <h4 className="text-xs font-bold text-slate-800">Observed Infrastructure Confidence</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">High precision correlation across network layers</p>
        </div>

        {/* Evidence Used Checklist */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Evidence Used</span>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
            {evidenceList.map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-slate-700 text-[11px]">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
