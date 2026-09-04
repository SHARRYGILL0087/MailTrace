'use client';

import React from 'react';
import { Server, ArrowUpRight, Flame, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { InfrastructureLocation } from '@/app/types/geo';
import { getRiskMarkerStyle } from './InfrastructureMap';

interface InfrastructureTableProps {
  locations: InfrastructureLocation[];
  selectedLocation: InfrastructureLocation | null;
  onSelectLocation: (loc: InfrastructureLocation) => void;
}

export const InfrastructureTable: React.FC<InfrastructureTableProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
}) => {
  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-100">
            <Server className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">🖥️ Observed Infrastructure</h3>
            <p className="text-xs text-slate-500">Live feed of correlated IP addresses and hosting entities</p>
          </div>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          Showing {locations.length} Entities
        </span>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="pb-3 pl-3">IP Address</th>
              <th className="pb-3">Location</th>
              <th className="pb-3">Provider</th>
              <th className="pb-3">ASN</th>
              <th className="pb-3">Risk Level</th>
              <th className="pb-3 text-center">Emails</th>
              <th className="pb-3 text-center">Domains</th>
              <th className="pb-3">Last Seen</th>
              <th className="pb-3 pr-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {locations.map((loc) => {
              const style = getRiskMarkerStyle(loc.risk);
              const isSelected = selectedLocation?.id === loc.id;

              return (
                <tr
                  key={loc.id}
                  onClick={() => onSelectLocation(loc)}
                  className={`group cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/80 font-semibold text-slate-900'
                      : 'hover:bg-slate-50/80'
                  }`}
                >
                  <td className="py-3.5 pl-3 font-mono font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {loc.ip}
                  </td>
                  <td className="py-3.5">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <span>{loc.flag}</span>
                      <span>{loc.city}, {loc.country}</span>
                    </span>
                  </td>
                  <td className="py-3.5 font-semibold text-slate-800 max-w-[140px] truncate">
                    {loc.provider}
                  </td>
                  <td className="py-3.5 text-slate-500 font-mono">
                    {loc.asn}
                  </td>
                  <td className="py-3.5">
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${style.badge}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${style.bg}`} />
                      {loc.risk.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 text-center font-bold text-blue-900">
                    {loc.relatedEmails}
                  </td>
                  <td className="py-3.5 text-center font-bold text-indigo-900">
                    {loc.relatedDomains}
                  </td>
                  <td className="py-3.5 text-slate-400 text-[11px]">
                    {loc.lastSeen}
                  </td>
                  <td className="py-3.5 pr-3 text-right">
                    <span className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                      {loc.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
