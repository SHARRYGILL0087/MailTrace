'use client';

import React from 'react';
import { Clock, Inbox, Sparkles, ShieldAlert, Globe, Server, Layers, FileCheck } from 'lucide-react';
import { InvestigationData } from '@/app/types/investigation';

interface Props {
  timeline: InvestigationData['timeline'];
}

const iconMap: Record<string, React.ElementType> = {
  Inbox,
  Sparkles,
  ShieldAlert,
  Globe,
  Server,
  Layers,
  FileCheck,
};

export const InvestigationTimeline: React.FC<Props> = ({ timeline }) => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md">
      <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>🕐</span> Investigation Timeline
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Automated detection & forensic triage event log</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          7 Recorded Milestones
        </span>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 space-y-4 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {timeline.map((item, idx) => {
          const IconComponent = iconMap[item.icon] || Clock;

          return (
            <div key={idx} className="relative flex items-center gap-4 group">
              {/* Dot Pin */}
              <div className="absolute -left-6 flex h-6 w-6 items-center justify-center rounded-full bg-white border-2 border-slate-300 group-hover:border-emerald-600 transition-colors">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
              </div>

              {/* Time Badge */}
              <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg shrink-0">
                {item.time}
              </span>

              {/* Event Box */}
              <div className="flex-1 flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 group-hover:bg-emerald-50/40 group-hover:border-emerald-200 transition-all">
                <IconComponent className="h-4 w-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800">{item.event}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
