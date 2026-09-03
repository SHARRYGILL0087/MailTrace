'use client';

import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ACTIVITY_TIMELINE } from '@/app/data/mockDashboardData';

export const ThreatActivityChart: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">Threat Activity</h3>
          <p className="text-xs text-slate-500">Email security events detected over the selected period.</p>
        </div>
        <select className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 outline-none">
          <option>24 Hours</option>
          <option>7 Days</option>
          <option>30 Days</option>
        </select>
      </div>

      <div className="h-64 w-full">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ACTIVITY_TIMELINE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="phishGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="becGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                  fontSize: '12px',
                }}
              />
              <Area type="monotone" dataKey="Phishing" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#phishGrad)" />
              <Area type="monotone" dataKey="BEC" stroke="#06B6D4" strokeWidth={2} fillOpacity={1} fill="url(#becGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full bg-slate-50 animate-pulse rounded-2xl" />
        )}
      </div>
    </div>
  );
};