'use client';

import React from 'react';
import { 
  X, 
  MapPin, 
  Globe2, 
  ShieldAlert, 
  Server, 
  Network, 
  Flame, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  Lock,
  Eye
} from 'lucide-react';
import { InfrastructureLocation } from '@/app/types/geo';
import { getRiskMarkerStyle } from './InfrastructureMap';
import Link from 'next/link';

interface LocationDetailsPanelProps {
  location: InfrastructureLocation | null;
  onClose: () => void;
}

export const LocationDetailsPanel: React.FC<LocationDetailsPanelProps> = ({
  location,
  onClose,
}) => {
  if (!location) return null;

  const style = getRiskMarkerStyle(location.risk);

  return (
    <aside className="w-full lg:w-80 shrink-0 rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xl flex flex-col justify-between transition-all duration-300 animate-in slide-in-from-right-4">
      <div className="space-y-4">
        
        {/* Panel Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 border border-teal-100 shadow-xs">
              <span className="text-xl">{location.flag}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Infrastructure Details
              </span>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {location.city}, {location.country}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Risk Pill Summary */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
          <span className="text-xs font-semibold text-slate-600">Infrastructure Risk</span>
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${style.badge}`}>
            <span className={`h-2 w-2 rounded-full ${style.bg}`} />
            {location.risk.toUpperCase()} RISK
          </span>
        </div>

        {/* Metadata Details Grid */}
        <div className="space-y-2 text-xs">
          
          <div className="rounded-xl border border-slate-100 p-2.5 bg-white">
            <div className="text-[10px] text-slate-400 font-medium">IP Address</div>
            <div className="font-mono font-bold text-slate-900 mt-0.5">{location.ip}</div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-slate-100 p-2.5 bg-white">
              <div className="text-[10px] text-slate-400 font-medium">ASN</div>
              <div className="font-semibold text-slate-800 mt-0.5">{location.asn}</div>
            </div>
            <div className="rounded-xl border border-slate-100 p-2.5 bg-white">
              <div className="text-[10px] text-slate-400 font-medium">Network Type</div>
              <div className="font-semibold text-slate-800 truncate mt-0.5">{location.networkType}</div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 p-2.5 bg-white">
            <div className="text-[10px] text-slate-400 font-medium">ISP / Provider</div>
            <div className="font-semibold text-slate-800 truncate mt-0.5">{location.provider}</div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl border border-slate-100 p-2 bg-slate-50">
              <div className="text-[9px] text-slate-400">Reputation</div>
              <div className="font-bold text-rose-600 text-[11px] mt-0.5">{location.reputation}</div>
            </div>
            <div className="rounded-xl border border-slate-100 p-2 bg-slate-50">
              <div className="text-[9px] text-slate-400">VPN/Proxy</div>
              <div className="font-bold text-orange-600 text-[11px] mt-0.5">{location.vpnStatus}</div>
            </div>
            <div className="rounded-xl border border-slate-100 p-2 bg-slate-50">
              <div className="text-[9px] text-slate-400">TOR</div>
              <div className="font-bold text-emerald-600 text-[11px] mt-0.5">{location.torStatus}</div>
            </div>
          </div>

          {/* Location Confidence Gauge */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-3 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Observed Confidence</div>
              <div className="text-xs text-slate-500">Based on 6 evidence signals</div>
            </div>
            <div className="text-xl font-black text-blue-800">{location.confidence}%</div>
          </div>

          {/* Related Count Badges */}
          <div className="grid grid-cols-4 gap-1.5 text-center pt-1">
            <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-1.5">
              <div className="text-[9px] text-blue-600">Emails</div>
              <div className="font-extrabold text-blue-900 text-sm">{location.relatedEmails}</div>
            </div>
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-1.5">
              <div className="text-[9px] text-indigo-600">Domains</div>
              <div className="font-extrabold text-indigo-900 text-sm">{location.relatedDomains}</div>
            </div>
            <div className="rounded-xl border border-purple-100 bg-purple-50/40 p-1.5">
              <div className="text-[9px] text-purple-600">Campaigns</div>
              <div className="font-extrabold text-purple-900 text-sm">{location.relatedCampaigns}</div>
            </div>
            <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-1.5">
              <div className="text-[9px] text-rose-600">Cases</div>
              <div className="font-extrabold text-rose-900 text-sm">{location.relatedCases}</div>
            </div>
          </div>

        </div>
      </div>

      {/* Action Buttons (Prompt Section 10 Spec) */}
      <div className="pt-4 border-t border-slate-100 space-y-2 mt-4">
        <Link
          href={`/threat-graph?search=${location.ip}`}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-all"
        >
          <span>View Threat Graph</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href={`/investigations?ip=${location.ip}`}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all"
        >
          View Related Cases
        </Link>
      </div>
    </aside>
  );
};
