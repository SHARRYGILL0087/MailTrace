'use client';

import React from 'react';
import { Clock, Calendar, CheckCircle2 } from 'lucide-react';

export const GeoTimeline: React.FC = () => {
  const events = [
    {
      date: '20 Aug 2026',
      flag: '🇺🇸',
      country: 'United States',
      title: 'First Infrastructure Observed',
      description: 'Initial C2 relay IP 198.51.100.14 registered in Chicago.',
    },
    {
      date: '24 Aug 2026',
      flag: '🇳🇱',
      country: 'Netherlands',
      title: 'New Infrastructure Detected',
      description: 'Bulletproof host 185.220.101.45 provisioned in Amsterdam.',
    },
    {
      date: '27 Aug 2026',
      flag: '🇸🇬',
      country: 'Singapore',
      title: 'Additional Infrastructure Active',
      description: 'Proxy node 103.21.244.18 added to campaign cluster.',
    },
    {
      date: '01 Sep 2026',
      flag: '🇳🇱',
      country: 'Netherlands',
      title: 'Latest Threat Activity Observed',
      description: 'Phishing campaign CAMP-024 sent 18 emails via NL hosts.',
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
          <Clock className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">🕐 Geographic Activity Timeline</h3>
          <p className="text-xs text-slate-500">Chronological emergence of infrastructure nodes over time</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative pt-2">
        {events.map((e, idx) => (
          <div key={e.date} className="relative rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all hover:bg-white hover:border-blue-200 hover:shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-blue-700 mb-1">
              <span>{e.date}</span>
              <span className="text-base">{e.flag}</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 mt-1">{e.title}</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{e.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
