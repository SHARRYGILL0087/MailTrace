'use client';

import React from 'react';
import { Target, ArrowRight, Layers, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const CampaignGeoCard: React.FC = () => {
  return (
    <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/90 via-cyan-50/50 to-purple-50/80 p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-blue-600 border border-blue-100 shadow-xs">
              <Target className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">🎯 Campaign Geographic Intelligence</h3>
              <p className="text-xs text-slate-500">Multi-region threat cluster correlation</p>
            </div>
          </div>

          <span className="rounded-full bg-orange-100 text-orange-800 px-3 py-1 text-xs font-bold border border-orange-200">
            Campaign #CAMP-024
          </span>
        </div>

        {/* Campaign Metrics */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs mb-4">
          <div className="rounded-2xl border border-blue-200/80 bg-white p-2">
            <div className="text-[10px] text-slate-400">Emails</div>
            <div className="font-extrabold text-blue-900 text-base">18</div>
          </div>
          <div className="rounded-2xl border border-indigo-200/80 bg-white p-2">
            <div className="text-[10px] text-slate-400">Domains</div>
            <div className="font-extrabold text-indigo-900 text-base">7</div>
          </div>
          <div className="rounded-2xl border border-purple-200/80 bg-white p-2">
            <div className="text-[10px] text-slate-400">IPs</div>
            <div className="font-extrabold text-purple-900 text-base">4</div>
          </div>
          <div className="rounded-2xl border border-teal-200/80 bg-white p-2">
            <div className="text-[10px] text-slate-400">Countries</div>
            <div className="font-extrabold text-teal-900 text-base">3</div>
          </div>
        </div>

        {/* Country Breakdown Tree */}
        <div className="space-y-2 text-xs mb-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-3 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span>🇳🇱 Netherlands</span>
            </div>
            <div className="pl-4 text-[11px] text-slate-600 flex flex-wrap gap-2">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-slate-700">IP 185.220.101.45</span>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-slate-700">IP 203.0.113.88</span>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-slate-700">Domain vendor-secure.xyz</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-3 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span>🇺🇸 United States</span>
            </div>
            <div className="pl-4 text-[11px] text-slate-600 flex flex-wrap gap-2">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-slate-700">IP 104.28.19.82</span>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-slate-700">Domain portal-auth.net</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-3 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span>🇸🇬 Singapore</span>
            </div>
            <div className="pl-4 text-[11px] text-slate-600 flex flex-wrap gap-2">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-slate-700">IP 103.21.244.18</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-purple-200/80 bg-purple-50/60 p-3 mb-2 text-xs">
          <span className="font-semibold text-purple-900">Correlation Confidence</span>
          <span className="font-black text-purple-900 text-lg">87%</span>
        </div>
      </div>

      <Link
        href="/investigations?campaign=CAMP-024"
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-all mt-2"
      >
        <span>Investigate Campaign</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};
