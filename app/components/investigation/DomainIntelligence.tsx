'use client';

import React from 'react';
import { 
  Globe, 
  ArrowRight, 
  ShieldAlert, 
  Clock, 
  Building2, 
  Database, 
  Mail, 
  Layers 
} from 'lucide-react';
import { DomainIntelligenceData } from '@/app/types/investigation';

interface Props {
  domainData: DomainIntelligenceData;
  onOpenDrawer: (domainData: DomainIntelligenceData) => void;
}

export const DomainIntelligence: React.FC<Props> = ({ domainData, onOpenDrawer }) => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>🌐</span> Domain Intelligence
            </h2>
            <p className="text-xs font-mono font-bold text-slate-600 mt-0.5">{domainData.domain}</p>
          </div>

          <span className="rounded-full bg-rose-100 border border-rose-200 px-3 py-1 text-xs font-extrabold text-rose-800 shrink-0">
            🔴 {domainData.reputation}
          </span>
        </div>

        {/* Spacious 2-Column Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-3">
          
          {/* 1. Domain Age */}
          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-3.5 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-900">
              <Clock className="h-3.5 w-3.5 text-amber-600" />
              <span>Domain Age</span>
            </div>
            <div className="font-mono text-sm font-black text-amber-950">
              {domainData.ageDays} Days
            </div>
            <span className="text-[11px] font-bold text-amber-800">
              ⚠️ Newly Registered ({domainData.creationDate})
            </span>
          </div>

          {/* 2. Registrar */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              <Building2 className="h-3.5 w-3.5 text-slate-500" />
              <span>Registrar</span>
            </div>
            <div className="font-sans text-xs font-bold text-slate-900 leading-snug">
              {domainData.registrar}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">ICANN Verified</span>
          </div>

          {/* 3. DNS Records */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              <Database className="h-3.5 w-3.5 text-slate-500" />
              <span>DNS Records</span>
            </div>
            <div className="font-mono text-xs font-bold text-slate-900">
              {domainData.dnsRecordsCount} Active Records
            </div>
            <span className="text-[11px] font-mono text-slate-400">A, AAAA, MX, TXT</span>
          </div>

          {/* 4. MX Servers */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              <Mail className="h-3.5 w-3.5 text-slate-500" />
              <span>MX Servers</span>
            </div>
            <div className="font-mono text-xs font-bold text-slate-900">
              {domainData.mxServersCount} Mail Servers
            </div>
            <span className="text-[11px] text-slate-400 font-medium">External Relay</span>
          </div>

          {/* 5. Reputation */}
          <div className="rounded-2xl border border-rose-200/80 bg-rose-50/40 p-3.5 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-rose-800">
              <ShieldAlert className="h-3.5 w-3.5 text-rose-600" />
              <span>Reputation</span>
            </div>
            <div className="font-sans text-xs font-extrabold text-rose-900">
              🔴 High Risk Flag
            </div>
            <span className="text-[11px] font-semibold text-rose-700">Blocklisted Domain</span>
          </div>

          {/* 6. Related Domains */}
          <div className="rounded-2xl border border-purple-200/80 bg-purple-50/40 p-3.5 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-purple-800">
              <Layers className="h-3.5 w-3.5 text-purple-600" />
              <span>Related Domains</span>
            </div>
            <div className="font-mono text-xs font-bold text-purple-950">
              {domainData.relatedDomainsCount} Linked Domains
            </div>
            <span className="text-[11px] font-semibold text-purple-700">Same Registrant</span>
          </div>

        </div>
      </div>

      <button
        onClick={() => onOpenDrawer(domainData)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all"
      >
        <span>View Domain Intelligence</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
