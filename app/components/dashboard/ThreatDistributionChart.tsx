'use client';

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { THREAT_DISTRIBUTION_PIE } from '@/app/data/mockDashboardData';

export const ThreatDistributionChart: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-slate-900">Threat Distribution</h3>
        <p className="text-xs text-slate-500">Breakdown by threat taxonomy</p>
      </div>

      <div className="relative h-44 w-full my-2">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={THREAT_DISTRIBUTION_PIE}
                innerRadius={50}
                outerRadius={68}
                paddingAngle={4}
                dataKey="value"
              >
                {THREAT_DISTRIBUTION_PIE.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  fontSize: '11px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full bg-slate-50 animate-pulse rounded-2xl" />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-lg font-bold text-slate-900">1,284</span>
          <span className="text-[10px] text-slate-400 font-medium">Events</span>
        </div>
      </div>


      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
        {THREAT_DISTRIBUTION_PIE.map((d) => (
          <div key={d.name} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
            <span className="text-[11px] text-slate-600 truncate">{d.name}</span>
            <span className="text-[11px] font-bold text-slate-800 ml-auto">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};