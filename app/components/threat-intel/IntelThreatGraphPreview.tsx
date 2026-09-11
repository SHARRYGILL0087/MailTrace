'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Globe, Server, Network, MapPin, ArrowRight, Share2, Target } from 'lucide-react';
import { ThreatIntelligenceResponse } from '@/app/types/threatIntel';

interface Props {
  data: ThreatIntelligenceResponse;
}

export const IntelThreatGraphPreview: React.FC<Props> = ({ data }) => {
  const { indicator, type, infrastructure, geolocation, asn } = data;

  const emailNode = type === 'email' ? indicator : 'phishing@enterprise-support.co';
  const domainNode = type === 'domain' ? indicator : infrastructure.domain || 'evil-payload.ru';
  const ipNode = type === 'ip' ? indicator : infrastructure.ip_address || '185.220.101.5';
  const asnNode = asn.asn || 'AS208323';
  const countryNode = geolocation.country || 'Netherlands';

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>🕸️</span> Forensic Threat Graph Correlation
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Hierarchical lineage trace connecting message ingress to transit infrastructure
          </p>
        </div>

        <Link
          href="/graph"
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors self-start sm:self-auto shadow-xs"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>Open Full Threat Graph</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Hierarchical Chain Diagram */}
      <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 flex flex-col md:flex-row items-center justify-between gap-4 overflow-x-auto">
        
        {/* Node 1: Email */}
        <div className="flex flex-col items-center text-center space-y-1.5 min-w-[130px]">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 shadow-xs">
            <Mail className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email</span>
          <span className="font-mono text-xs font-bold text-slate-900 max-w-[140px] truncate" title={emailNode}>
            {emailNode}
          </span>
        </div>

        {/* Divider / Arrow */}
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="h-4 w-px md:h-px md:w-8 bg-slate-300" />
          <ArrowRight className="h-3.5 w-3.5 text-slate-400 hidden md:block" />
        </div>

        {/* Node 2: Domain */}
        <div className="flex flex-col items-center text-center space-y-1.5 min-w-[130px]">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 shadow-xs">
            <Globe className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Domain</span>
          <span className="font-mono text-xs font-bold text-slate-900 max-w-[140px] truncate" title={domainNode}>
            {domainNode}
          </span>
        </div>

        {/* Divider / Arrow */}
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="h-4 w-px md:h-px md:w-8 bg-slate-300" />
          <ArrowRight className="h-3.5 w-3.5 text-slate-400 hidden md:block" />
        </div>

        {/* Node 3: IP */}
        <div className="flex flex-col items-center text-center space-y-1.5 min-w-[130px]">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-700 shadow-xs">
            <Server className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">IP Host</span>
          <span className="font-mono text-xs font-bold text-slate-900 max-w-[140px] truncate" title={ipNode}>
            {ipNode}
          </span>
        </div>

        {/* Divider / Arrow */}
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="h-4 w-px md:h-px md:w-8 bg-slate-300" />
          <ArrowRight className="h-3.5 w-3.5 text-slate-400 hidden md:block" />
        </div>

        {/* Node 4: ASN */}
        <div className="flex flex-col items-center text-center space-y-1.5 min-w-[130px]">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 shadow-xs">
            <Network className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ASN</span>
          <span className="font-mono text-xs font-bold text-slate-900 max-w-[140px] truncate" title={asnNode}>
            {asnNode}
          </span>
        </div>

        {/* Divider / Arrow */}
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="h-4 w-px md:h-px md:w-8 bg-slate-300" />
          <ArrowRight className="h-3.5 w-3.5 text-slate-400 hidden md:block" />
        </div>

        {/* Node 5: Country */}
        <div className="flex flex-col items-center text-center space-y-1.5 min-w-[130px]">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 shadow-xs">
            <MapPin className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Country</span>
          <span className="font-sans text-xs font-bold text-slate-900 max-w-[140px] truncate" title={countryNode}>
            {countryNode}
          </span>
        </div>

      </div>
    </div>
  );
};
