'use client';

import React from 'react';
import { Bot, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const GeoAIInsight: React.FC = () => {
  return (
    <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50/90 via-cyan-50/60 to-purple-50/80 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm border border-blue-100">
            <Bot className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">🤖 AI Geographic Insight</h3>
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-800 border border-blue-200">
                Pattern Analysis
              </span>
            </div>
            <h4 className="text-sm font-bold text-blue-950">
              Potential infrastructure concentration detected in the Netherlands region.
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              Several investigated emails share observed network infrastructure associated with the Netherlands region. 4 IP addresses are linked to 3 related domains and 2 active investigations. Note: Observed hosting infrastructure does not confirm adversary physical location.
            </p>
          </div>
        </div>

        <Link
          href="/threat-graph"
          className="flex shrink-0 items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-all hover:scale-[1.02]"
        >
          <span>Investigate Connections</span>
          <ArrowRight className="h-4 w-4" />
        </Link>

      </div>
    </div>
  );
};
