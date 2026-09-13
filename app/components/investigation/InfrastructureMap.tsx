'use client';

import React, { useState } from 'react';
import { MapPin, Server, AlertTriangle, ArrowRight, ShieldCheck, Compass } from 'lucide-react';
import { InvestigationData } from '@/app/types/investigation';

interface Props {
  geoData: InvestigationData['geolocation'];
  onOpenGeolocation?: () => void;
}

export const InfrastructureMap: React.FC<Props> = ({ geoData, onOpenGeolocation }) => {
  const [activePinHover, setActivePinHover] = useState<string | null>(null);

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>🌍</span> Observed Infrastructure
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Probable location of observed email infrastructure
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 self-start sm:self-auto">
          Confidence: {geoData.confidence}%
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual Vector Map Container */}
        <div className="lg:col-span-8 relative h-64 w-full rounded-2xl border border-slate-200 bg-slate-900 overflow-hidden shadow-inner flex items-center justify-center">
          {/* Cyber Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-60" />

          {/* Continents Vector Graphic Mock */}
          <svg className="absolute inset-0 h-full w-full opacity-20 text-slate-400" viewBox="0 0 800 400" fill="currentColor">
            {/* Simple world map path representation */}
            <path d="M150,120 Q180,90 220,110 T300,100 T380,130 T450,110 T520,140 T600,120 T700,150 L750,220 L650,280 L550,250 L450,300 L350,270 L250,290 L150,220 Z" />
            <path d="M480,160 Q520,140 560,150 T620,180 T680,160 L720,240 L620,260 L540,240 Z" />
          </svg>

          {/* C2 Marker Pin 1 - Amsterdam (Primary Flagged Node) */}
          <div
            onMouseEnter={() => setActivePinHover('amsterdam')}
            onMouseLeave={() => setActivePinHover(null)}
            className="absolute top-1/3 left-1/2 -translate-x-12 flex flex-col items-center cursor-pointer group z-10"
          >
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-5 w-5 bg-rose-600 border-2 border-white items-center justify-center text-[9px] font-bold text-white shadow-md">
                1
              </span>
            </span>

            {/* Hover Map Tooltip */}
            <div className="mt-1 flex flex-col items-center rounded-xl bg-white/95 px-3 py-1.5 shadow-lg border border-slate-200 text-center animate-in fade-in duration-150">
              <span className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <span>🇳🇱</span> {geoData.city}, {geoData.country}
              </span>
              <span className="font-mono text-[10px] text-rose-600 font-bold">{geoData.ip}</span>
            </div>
          </div>

          {/* Secondary Relay Pin - Frankfurt */}
          <div className="absolute top-2/5 left-1/2 translate-x-6 flex flex-col items-center cursor-pointer opacity-80 hover:opacity-100">
            <span className="h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
            <span className="mt-1 text-[9px] font-bold text-slate-300 bg-slate-800/90 px-1.5 py-0.5 rounded">Frankfurt, DE</span>
          </div>

          {/* Compass Rose Badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-slate-800/80 px-2.5 py-1 text-[10px] font-bold text-slate-300 border border-slate-700">
            <Compass className="h-3 w-3 text-emerald-400 animate-spin-slow" />
            <span>GEO-IP Matrix Active</span>
          </div>
        </div>

        {/* Right Info Panel */}
        <div className="lg:col-span-4 space-y-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-rose-600" />
              {geoData.city}, {geoData.country}
            </h3>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Observed IP:</span>
                <span className="font-mono font-bold text-slate-800">{geoData.ip}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Hosting Provider:</span>
                <span className="font-medium text-slate-700 truncate max-w-[140px]">{geoData.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ASN:</span>
                <span className="font-mono font-bold text-slate-800">{geoData.asn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Geo Confidence:</span>
                <span className="font-bold text-emerald-700">{geoData.confidence}%</span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenGeolocation}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-50 border border-blue-200 py-2.5 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors"
          >
            <span>Open Full Geolocation</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Mandatory Geolocation Disclaimer */}
      <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-amber-200/70 bg-amber-50/50 p-3 text-xs text-amber-900">
        <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Disclaimer:</strong> Geolocation indicates probable observed network infrastructure and does not establish the physical location or identity of the attacker.
        </p>
      </div>
    </div>
  );
};
