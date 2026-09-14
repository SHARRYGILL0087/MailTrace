'use client';

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const AIInsightCard: React.FC = () => {
  return (
    <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/80 via-indigo-50/30 to-white p-6 shadow-xs min-h-[365px]">
      <div className="flex items-center gap-2 text-blue-700">
        <Sparkles className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wider">AI Security Insight</span>
      </div>
      <h4 className="mt-3 text-sm font-bold text-slate-900">
        Potential impersonation campaign detected
      </h4>
      <p className="mt-2 text-xs text-slate-600 leading-relaxed">
        7 suspicious emails share similar sender patterns and infrastructure. 4 domains resolve to related IP addresses.
      </p>
      <button className="mt-4 flex items-center gap-1.5 rounded-xl bg-white border border-blue-200/90 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50 transition-colors">
        Investigate Campaign
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};