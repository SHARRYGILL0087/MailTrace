'use client';

import React from 'react';
import { ArrowRight, Mail, Globe, Link2, Monitor, Target } from 'lucide-react';

export const ThreatGraphPreview: React.FC = () => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-slate-900">Threat Relationship Network</h3>
        <p className="text-xs text-slate-500">Direct forensic graph correlation</p>
      </div>

      <div className="py-4 flex flex-col items-center justify-center space-y-2.5">
        <div className="flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 shadow-xs">
          <Mail className="h-3 w-3 text-blue-600" />
          <span className="text-[11px] font-semibold text-blue-900">Suspicious Email</span>
        </div>

        <div className="h-3 w-px bg-slate-300" />

        <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-xs">
          <Globe className="h-3 w-3 text-indigo-500" />
          <span className="text-[11px] font-semibold text-slate-700">Adversary Domain</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center">
            <div className="h-3 w-px bg-slate-300" />
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5">
              <Link2 className="h-3 w-3 text-cyan-600" />
              <span className="text-[10px] font-medium text-slate-600">URL Target</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-3 w-px bg-slate-300" />
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5">
              <Monitor className="h-3 w-3 text-rose-500" />
              <span className="text-[10px] font-medium text-slate-600">Host IP</span>
            </div>
          </div>
        </div>

        <div className="h-3 w-px bg-slate-300" />

        <div className="flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 shadow-xs">
          <Target className="h-3 w-3 text-purple-600" />
          <span className="text-[11px] font-semibold text-purple-900">Campaign Cluster</span>
        </div>
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
        Open Threat Graph
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};