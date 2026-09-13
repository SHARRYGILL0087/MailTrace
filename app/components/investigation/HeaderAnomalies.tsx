'use client';

import React from 'react';
import { AlertTriangle, AlertCircle, Info, ExternalLink } from 'lucide-react';
import { HeaderAnomaly } from '@/app/types/investigation';

interface Props {
  anomalies: HeaderAnomaly[];
  onViewEvidence?: (anomaly: HeaderAnomaly) => void;
}

export const HeaderAnomalies: React.FC<Props> = ({ anomalies, onViewEvidence }) => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md">
      <div className="mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>⚠️</span> Header Anomalies
          </h2>
          <p className="text-xs text-slate-500">Detected discrepancies in route telemetry</p>
        </div>
        <span className="rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-xs font-bold text-rose-700">
          {anomalies.length} Flags
        </span>
      </div>

      <div className="space-y-3">
        {anomalies.map((anom) => {
          const isHigh = anom.severity === 'high';
          const isMed = anom.severity === 'medium';

          return (
            <div
              key={anom.id}
              className={`rounded-2xl border p-3.5 transition-all ${
                isHigh
                  ? 'border-rose-200 bg-rose-50/40 hover:bg-rose-50/70'
                  : isMed
                  ? 'border-amber-200 bg-amber-50/40 hover:bg-amber-50/70'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {isHigh ? (
                    <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                  )}
                  <h3 className="text-xs font-bold text-slate-900">{anom.title}</h3>
                </div>

                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                    isHigh
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : isMed
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {anom.severity}
                </span>
              </div>

              <p className="mt-1.5 text-xs text-slate-600 leading-normal">
                {anom.description}
              </p>

              <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-200/50 text-[11px]">
                <span className="font-mono text-slate-400">{anom.evidenceRef}</span>
                <button
                  onClick={() => onViewEvidence?.(anom)}
                  className="flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  <span>View evidence</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
