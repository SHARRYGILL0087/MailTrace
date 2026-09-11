'use client';

import React from 'react';
import { ArrowRight, Globe, Server, Link2, Mail, ShieldAlert, Target, Sparkles, FolderArchive } from 'lucide-react';
import { RelatedIndicatorRelation, IndicatorType } from '@/app/types/threatIntel';

interface Props {
  relations: RelatedIndicatorRelation[];
  onSelectIndicator: (indicator: string, type?: IndicatorType) => void;
}

export const IntelRelatedIndicators: React.FC<Props> = ({ relations, onSelectIndicator }) => {
  const getIcon = (type: RelatedIndicatorRelation['type']) => {
    switch (type) {
      case 'ip':
        return Server;
      case 'domain':
        return Globe;
      case 'url':
        return Link2;
      case 'email':
        return Mail;
      case 'campaign':
        return Target;
      case 'case':
        return FolderArchive;
      default:
        return Sparkles;
    }
  };

  const getRiskBadge = (risk: RelatedIndicatorRelation['risk']) => {
    switch (risk) {
      case 'critical':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'high':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'medium':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'low':
      default:
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>🕸️</span> Related Indicators & Infrastructure Graph
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Correlated entities discovered through passive DNS, certificate logs, and header forensic tracing. Click to pivot.
          </p>
        </div>

        <span className="rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-600 self-start sm:self-auto">
          Interactive Pivoting Active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {relations.map((rel, idx) => {
          const TargetIcon = getIcon(rel.type);
          const isNavigable = rel.type !== 'campaign' && rel.type !== 'case';

          return (
            <div
              key={idx}
              onClick={() => {
                if (isNavigable) {
                  onSelectIndicator(rel.to, rel.type as IndicatorType);
                }
              }}
              className={`rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 transition-all duration-200 space-y-2.5 ${
                isNavigable
                  ? 'hover:bg-white hover:border-emerald-400 hover:shadow-xs cursor-pointer group'
                  : 'opacity-90'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400 uppercase font-bold tracking-wider">{rel.relation}</span>
                <span className={`px-2 py-0.5 rounded-full border font-bold uppercase ${getRiskBadge(rel.risk)}`}>
                  {rel.risk}
                </span>
              </div>

              {/* Relationship Flow: From -> To */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-slate-500 truncate max-w-[100px]">
                  {rel.from}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                    <TargetIcon className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                    {rel.to}
                  </span>
                </div>
              </div>

              {isNavigable && (
                <div className="flex items-center justify-end text-[10px] font-bold text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Pivot to indicator →</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
