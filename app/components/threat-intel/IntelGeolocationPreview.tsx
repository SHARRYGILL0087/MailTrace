'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Globe2, ArrowRight, Server, Info, ShieldAlert } from 'lucide-react';
import { ThreatIntelligenceResponse } from '@/app/types/threatIntel';

interface Props {
  data: ThreatIntelligenceResponse;
}

export const IntelGeolocationPreview: React.FC<Props> = ({ data }) => {
  const { geolocation, asn, infrastructure, risk_level } = data;

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          {/* Strictly labeled "Observed Infrastructure Location" */}
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>📍</span> Observed Infrastructure Location
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Geographic location of observed network nodes and transit routing points
          </p>
        </div>

        <Link
          href="/geolocation"
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all self-start sm:self-auto"
        >
          <span>View Geolocation</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Visual Map Radar Representation */}
        <div className="lg:col-span-6 relative h-48 w-full rounded-2xl border border-slate-200/80 bg-slate-900 overflow-hidden flex items-center justify-center">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-60" />

          {/* World map stylized outline */}
          <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
            <Globe2 className="h-44 w-44 text-slate-400 stroke-1" />
          </div>

          {/* Glowing Ping for the observed host */}
          <div className="relative z-10 flex flex-col items-center">
            <span className="relative flex h-4 w-4">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                risk_level === 'critical' || risk_level === 'high' ? 'bg-rose-400' : 'bg-emerald-400'
              }`} />
              <span className={`relative inline-flex rounded-full h-4 w-4 border-2 border-white shadow-md ${
                risk_level === 'critical' || risk_level === 'high' ? 'bg-rose-500' : 'bg-emerald-500'
              }`} />
            </span>
            <span className="mt-2 text-[11px] font-mono font-black text-white bg-slate-800/90 border border-slate-700 px-2.5 py-0.5 rounded-md shadow-md backdrop-blur-xs">
              {geolocation.city}, {geolocation.country_code} ({geolocation.lat.toFixed(2)}°, {geolocation.lng.toFixed(2)}°)
            </span>
          </div>

          {/* Mini overlay pill */}
          <div className="absolute top-2.5 left-2.5 z-10 rounded-lg bg-slate-800/80 border border-slate-700 px-2 py-0.5 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>GEO-IP RESOLVED</span>
          </div>
        </div>

        {/* Telemetry Details */}
        <div className="lg:col-span-6 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Country</div>
              <div className="font-sans text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <span>🌐</span>
                <span>{geolocation.country} ({geolocation.country_code})</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">City / Region</div>
              <div className="font-sans text-xs font-extrabold text-slate-900">
                {geolocation.city}, {geolocation.region}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ISP Provider</div>
              <div className="font-sans text-xs font-bold text-slate-900 truncate" title={geolocation.isp}>
                {geolocation.isp}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Autonomous System</div>
              <div className="font-mono text-xs font-bold text-slate-900">
                {asn.asn}
              </div>
            </div>
          </div>

          {/* Mandatory Geolocation Disclaimer */}
          <div className="flex items-start gap-2.5 rounded-2xl border border-blue-200/80 bg-blue-50/70 p-3 text-xs">
            <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-900 leading-relaxed font-medium">
              <strong>Forensic Notice:</strong> Geolocation represents observed infrastructure and does not establish the physical location or identity of an attacker.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
