'use client';

import React from 'react';
import { Globe2, ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';

export const GeoPreviewCard: React.FC = () => {
  const locations = [
    { flag: '🇳🇱', country: 'Netherlands', count: 12, risk: 'Critical' },
    { flag: '🇺🇸', country: 'United States', count: 9, risk: 'High' },
    { flag: '🇸🇬', country: 'Singapore', count: 6, risk: 'Medium' },
    { flag: '🇮🇳', country: 'India', count: 4, risk: 'Low' },
  ];

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm flex flex-col justify-between h-full flex-1">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
              <Globe2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">🌍 Infrastructure Locations</h3>
              <p className="text-xs text-slate-500">Geographic origin of correlated threat nodes</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {locations.map((loc) => (
            <div key={loc.country} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3 text-center transition-all hover:bg-white hover:border-blue-200 hover:shadow-xs">
              <div className="text-2xl mb-1">{loc.flag}</div>
              <div className="text-xs font-bold text-slate-800 truncate">{loc.country}</div>
              <div className="mt-1 text-sm font-extrabold text-blue-700">{loc.count} <span className="text-[10px] font-normal text-slate-500">Nodes</span></div>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/geolocation"
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-blue-50/70 py-2.5 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors"
      >
        <span>View Map</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};
