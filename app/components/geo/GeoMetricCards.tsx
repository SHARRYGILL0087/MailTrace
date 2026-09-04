'use client';

import React from 'react';
import { Globe, Map, Monitor, AlertTriangle, Target } from 'lucide-react';

export const GeoMetricCards: React.FC = () => {
  const metrics = [
    {
      id: 'locations',
      label: 'Locations Observed',
      value: '24',
      subtext: '+4 in last 24 hours',
      icon: Globe,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      id: 'countries',
      label: 'Countries',
      value: '11',
      subtext: 'Across 4 global regions',
      icon: Map,
      iconBg: 'bg-cyan-50 text-cyan-600 border-cyan-100',
    },
    {
      id: 'ips',
      label: 'Suspicious IPs',
      value: '47',
      subtext: '32 associated with domains',
      icon: Monitor,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      id: 'high-risk',
      label: 'High-Risk Locations',
      value: '8',
      subtext: 'Bulletproof / offshore hosts',
      icon: AlertTriangle,
      iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
      valueColor: 'text-rose-600',
    },
    {
      id: 'campaigns',
      label: 'Active Campaigns',
      value: '6',
      subtext: 'Correlated infrastructure',
      icon: Target,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
      valueColor: 'text-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.id}
            className="group rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {m.label}
              </span>
              <div className={`flex h-9 w-9 items-center justify-center rounded-2xl border ${m.iconBg} group-hover:scale-105 transition-transform`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-3">
              <div className={`text-2xl sm:text-3xl font-black tracking-tight ${m.valueColor || 'text-slate-900'}`}>
                {m.value}
              </div>
              <p className="mt-1 text-[11px] font-medium text-slate-500 truncate">
                {m.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
