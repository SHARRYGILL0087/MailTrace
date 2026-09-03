'use client';

import React from 'react';
import { 
  Server, 
  ArrowRight, 
  MapPin, 
  Building2, 
  Monitor, 
  Network, 
  Lock, 
  ShieldAlert 
} from 'lucide-react';
import { IPIntelligenceData } from '@/app/types/investigation';

interface Props {
  ipData: IPIntelligenceData;
  onOpenDrawer: (ipData: IPIntelligenceData) => void;
}

export const IPIntelligence: React.FC<Props> = ({ ipData, onOpenDrawer }) => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>🖥️</span> IP Intelligence
            </h2>
            <p className="text-xs font-mono font-bold text-slate-600 mt-0.5">{ipData.ip}</p>
          </div>

          <span className="rounded-full bg-rose-100 border border-rose-200 px-3 py-1 text-xs font-extrabold text-rose-800 shrink-0">
            🔴 {ipData.reputation}
          </span>
        </div>

        {/* Spacious 2-Column Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-3">
          
          {/* 1. Country / Location */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              <MapPin className="h-3.5 w-3.5 text-slate-500" />
              <span>Location</span>
            </div>
            <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-slate-900">
              <span className="text-sm">🇳🇱</span>
              <span>{ipData.country}</span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              {ipData.city}, {ipData.region} ({ipData.countryCode})
            </span>
          </div>

          {/* 2. ISP & Provider */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              <Building2 className="h-3.5 w-3.5 text-slate-500" />
              <span>ISP Provider</span>
            </div>
            <div className="font-sans text-xs font-bold text-slate-900 leading-snug">
              {ipData.isp}
            </div>
            <span className="text-[11px] font-medium text-slate-400">Datacenter Hosting</span>
          </div>

          {/* 3. Host / Reverse DNS */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              <Monitor className="h-3.5 w-3.5 text-slate-500" />
              <span>Reverse DNS Host</span>
            </div>
            <div className="font-mono text-xs font-bold text-slate-900 break-all leading-snug">
              {ipData.host}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">PTR Record Verified</span>
          </div>

          {/* 4. ASN & Network */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              <Network className="h-3.5 w-3.5 text-slate-500" />
              <span>ASN Network</span>
            </div>
            <div className="font-mono text-xs font-bold text-slate-900">
              {ipData.asn}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Cloud Datacenter Subnet</span>
          </div>

          {/* 5. Proxy / VPN Service */}
          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-3.5 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-900">
              <Lock className="h-3.5 w-3.5 text-amber-600" />
              <span>Proxy / VPN Service</span>
            </div>
            <div className="font-sans text-xs font-extrabold text-amber-950">
              🟠 {ipData.vpnProxy}
            </div>
            <span className="text-[11px] font-bold text-amber-800">
              {ipData.proxyService}
            </span>
          </div>

          {/* 6. Threat Reputation & TOR */}
          <div className="rounded-2xl border border-rose-200/80 bg-rose-50/40 p-3.5 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-rose-800">
              <ShieldAlert className="h-3.5 w-3.5 text-rose-600" />
              <span>Reputation & TOR</span>
            </div>
            <div className="font-sans text-xs font-extrabold text-rose-900">
              🔴 Malicious Host
            </div>
            <span className="text-[11px] font-semibold text-rose-700">TOR Exit Node: {ipData.torNode}</span>
          </div>

        </div>
      </div>

      <button
        onClick={() => onOpenDrawer(ipData)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all"
      >
        <span>View IP Intelligence</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
