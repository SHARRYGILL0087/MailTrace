'use client';

import React from 'react';
import { Database, CheckCircle2, AlertCircle, Clock, ExternalLink } from 'lucide-react';
import { SourceProvider } from '@/app/types/threatIntel';

interface Props {
  sources: SourceProvider[];
}

export const IntelSources: React.FC<Props> = ({ sources }) => {
  const getStatusBadge = (status: SourceProvider['status']) => {
    switch (status) {
      case 'Connected':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
          text: 'Connected',
        };
      case 'Available':
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          dot: 'bg-blue-500',
          text: 'Available',
        };
      case 'No Data':
      default:
        return {
          bg: 'bg-slate-100 text-slate-600 border-slate-200',
          dot: 'bg-slate-400',
          text: 'No Data',
        };
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>📡</span> Threat Intelligence Sources
          </h3>
          <p className="text-xs text-slate-500">
            External feeds and forensic telemetry providers contributing to this assessment
          </p>
        </div>

        <span className="rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-600 self-start sm:self-auto">
          Notice: Mock Telemetry / Demo Data
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {sources.map((src) => {
          const badge = getStatusBadge(src.status);

          return (
            <div
              key={src.name}
              className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 flex flex-col justify-between space-y-3 hover:bg-white hover:border-slate-300 transition-all shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs text-slate-900">{src.name}</span>
                  <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${badge.bg}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
                    {badge.text}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{src.category}</p>

                {src.detections && (
                  <div className="mt-2.5 rounded-xl bg-white border border-slate-200/80 px-2.5 py-1.5 font-mono text-[11px] font-semibold text-slate-800">
                    {src.detections}
                  </div>
                )}

                {src.details && !src.detections && (
                  <div className="mt-2.5 rounded-xl bg-white border border-slate-200/80 px-2.5 py-1.5 font-sans text-[11px] font-semibold text-slate-700 truncate">
                    {src.details}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-2 font-mono">
                <span>Queried: {src.last_queried}</span>
                <span className="rounded bg-slate-200/70 px-1 py-0.2 text-[9px] font-bold text-slate-600">
                  DEMO
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
