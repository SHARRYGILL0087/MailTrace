'use client';

import React from 'react';
import { Target, ArrowRight, Layers, Mail, Globe, Server, MapPin } from 'lucide-react';
import { CampaignData } from '@/app/types/investigation';

interface Props {
  campaign: CampaignData;
  onInvestigateCampaign: (campaign: CampaignData) => void;
}

export const CampaignCard: React.FC<Props> = ({ campaign, onInvestigateCampaign }) => {
  return (
    <div className="rounded-3xl border border-purple-200/80 bg-gradient-to-br from-purple-50/40 via-white to-indigo-50/30 p-6 shadow-xs transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-purple-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <h2 className="text-base font-bold text-slate-900">Campaign Intelligence</h2>
          </div>
          <p className="text-xs font-semibold text-purple-700 mt-0.5">{campaign.name}</p>
        </div>

        {/* Correlation score gauge badge */}
        <div className="flex items-center gap-2 rounded-2xl border border-purple-200 bg-purple-100/80 px-4 py-2 self-start sm:self-auto shadow-2xs">
          <span className="text-[11px] font-bold text-purple-900">Correlation Confidence:</span>
          <span className="font-mono text-base font-black text-purple-800">{campaign.correlationConfidence}%</span>
        </div>
      </div>

      {/* Campaign Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        <div className="rounded-2xl border border-purple-100 bg-white p-3 shadow-2xs text-center">
          <Mail className="h-4 w-4 text-purple-600 mx-auto mb-1" />
          <div className="font-mono text-base font-extrabold text-slate-900">{campaign.relatedEmailsCount}</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase">Related Emails</div>
        </div>

        <div className="rounded-2xl border border-purple-100 bg-white p-3 shadow-2xs text-center">
          <Globe className="h-4 w-4 text-indigo-600 mx-auto mb-1" />
          <div className="font-mono text-base font-extrabold text-slate-900">{campaign.domainsCount}</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase">Domains</div>
        </div>

        <div className="rounded-2xl border border-purple-100 bg-white p-3 shadow-2xs text-center">
          <Server className="h-4 w-4 text-rose-600 mx-auto mb-1" />
          <div className="font-mono text-base font-extrabold text-slate-900">{campaign.ipAddressesCount}</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase">IP Addresses</div>
        </div>

        <div className="rounded-2xl border border-purple-100 bg-white p-3 shadow-2xs text-center">
          <MapPin className="h-4 w-4 text-amber-600 mx-auto mb-1" />
          <div className="font-mono text-base font-extrabold text-slate-900">{campaign.countriesCount}</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase">Countries</div>
        </div>

        <div className="col-span-2 sm:col-span-1 rounded-2xl border border-purple-100 bg-white p-3 shadow-2xs text-center">
          <Layers className="h-4 w-4 text-cyan-600 mx-auto mb-1" />
          <div className="font-mono text-base font-extrabold text-slate-900">{campaign.activeDays} Days</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase">Active Duration</div>
        </div>
      </div>

      <button
        onClick={() => onInvestigateCampaign(campaign)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:bg-purple-700 transition-all active:scale-[0.99]"
      >
        <span>Investigate Campaign</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};
