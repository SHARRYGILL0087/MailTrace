'use client';

import React from 'react';
import { Link2, ShieldAlert, ArrowRight, ExternalLink } from 'lucide-react';
import { RelatedIncident } from '@/app/types/investigation';

interface Props {
  incidents: RelatedIncident[];
  onSelectIncident: (inc: RelatedIncident) => void;
}

export const RelatedIncidents: React.FC<Props> = ({ incidents, onSelectIncident }) => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md">
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>🔗</span> Related Incidents
          </h2>
          <p className="text-xs text-slate-500">Historical tickets matching infrastructure telemetry</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          {incidents.length} Cases Matched
        </span>
      </div>

      <div className="space-y-3">
        {incidents.map((inc) => (
          <div
            key={inc.id}
            onClick={() => onSelectIncident(inc)}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 hover:border-blue-300 hover:bg-blue-50/40 transition-all cursor-pointer"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-extrabold text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded">
                  {inc.id}
                </span>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {inc.title}
                </h3>
              </div>
              <p className="text-xs text-slate-500">{inc.reason}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-semibold block">Correlation</span>
                <span className="font-mono text-xs font-extrabold text-blue-700">
                  {inc.confidence}%
                </span>
              </div>
              <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
