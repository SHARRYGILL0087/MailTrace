'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { RECENT_THREATS_DATA } from '@/app/data/mockDashboardData';
import { ThreatRecord } from '@/app/types/dashboard';

export const RecentThreatsTable: React.FC = () => {
  const getRiskColor = (score: number) => {
    if (score >= 90) return 'bg-red-50 text-red-700 border-red-200';
    if (score >= 75) return 'bg-amber-50 text-amber-700 border-amber-200';
    if (score >= 50) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  };

  const getStatusColor = (status: ThreatRecord['status']) => {
    switch (status) {
      case 'Investigating': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Contained': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Escalated': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Remediated': return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900">Recent Threats</h3>
          <p className="text-xs text-slate-500">Live security triage feed</p>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700">
          View All <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-medium">
              <th className="pb-3">Threat</th>
              <th className="pb-3">Sender</th>
              <th className="pb-3">Classification</th>
              <th className="pb-3">Risk</th>
              <th className="pb-3">Origin</th>
              <th className="pb-3">Time</th>
              <th className="pb-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {RECENT_THREATS_DATA.map((threat) => (
              <tr key={threat.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 font-semibold text-slate-900">{threat.threat}</td>
                <td className="py-3 font-mono text-[11px] text-slate-500">{threat.sender}</td>
                <td className="py-3 text-slate-600">{threat.classification}</td>
                <td className="py-3">
                  <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${getRiskColor(threat.riskScore)}`}>
                    {threat.riskScore}/100
                  </span>
                </td>
                <td className="py-3 text-slate-600">{threat.origin}</td>
                <td className="py-3 text-slate-400">{threat.timestamp}</td>
                <td className="py-3 text-right">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${getStatusColor(threat.status)}`}>
                    {threat.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};