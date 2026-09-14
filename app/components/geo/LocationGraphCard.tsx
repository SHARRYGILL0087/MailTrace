'use client';

import React from 'react';
import { Share2, ArrowRight, Globe, Monitor, Link2, Target } from 'lucide-react';
import Link from 'next/link';

export const LocationGraphCard: React.FC = () => {
  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm flex flex-col justify-between h-full flex-1">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Share2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">🕸️ Location Relationships</h3>
              <p className="text-xs text-slate-500">Cross-infrastructure correlation network</p>
            </div>
          </div>
        </div>

        {/* Visual Relationship Diagram */}
        <div className="py-4 flex flex-col items-center justify-center space-y-2 text-xs">
          <div className="flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 shadow-xs font-bold text-teal-900">
            <span>🇳🇱 Netherlands Region</span>
          </div>

          <div className="h-3 w-px bg-slate-300" />

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 font-bold text-purple-900">
              <Monitor className="h-3 w-3 text-purple-600" /> IP A
            </div>
            <div className="flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 font-bold text-purple-900">
              <Monitor className="h-3 w-3 text-purple-600" /> IP B
            </div>
          </div>

          <div className="h-3 w-px bg-slate-300" />

          <div className="flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 shadow-xs font-bold text-indigo-900">
            <Globe className="h-3 w-3 text-indigo-600" /> vendor-secure-login.xyz
          </div>

          <div className="h-3 w-px bg-slate-300" />

          <div className="flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 shadow-xs font-bold text-rose-900">
            <Target className="h-3 w-3 text-rose-600" /> Campaign CAMP-024
          </div>
        </div>
      </div>

      <Link
        href="/threat-graph"
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition-all mt-auto"
      >
        <span>Open Threat Graph</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};
