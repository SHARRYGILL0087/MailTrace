'use client';

import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Globe, 
  Link2, 
  Server, 
  Clock, 
  Building2, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  FileCode,
  Mail
} from 'lucide-react';
import { ThreatIntelligenceResponse } from '@/app/types/threatIntel';

interface Props {
  data: ThreatIntelligenceResponse;
}

export const IntelReputationCards: React.FC<Props> = ({ data }) => {
  const { reputation, type } = data;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <span>🛡️</span> Reputation & Threat Status
        </h2>
        <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
          Telemetry: Demo Data
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* 1. IP Reputation Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Server className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900">IP Reputation</h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400">
                {reputation.ip ? (reputation.ip.tor_exit ? 'Tor Node' : 'Public IPv4') : 'General'}
              </span>
            </div>

            <div className="space-y-3 mt-3">
              {/* Score */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Reputation Score</span>
                <span className="font-mono font-extrabold text-slate-900">
                  {reputation.ip ? `${reputation.ip.reputation_score}/100` : '85/100'}
                </span>
              </div>

              {/* Abuse Reports */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Abuse Reports</span>
                <span className="font-mono font-extrabold text-rose-600">
                  {reputation.ip ? `${reputation.ip.abuse_reports} records` : '0 records'}
                </span>
              </div>

              {/* Confidence */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Confidence</span>
                <span className="font-mono font-bold text-emerald-700">
                  {reputation.ip ? `${reputation.ip.confidence}%` : '92%'}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="text-slate-500 font-medium">Status</span>
                <span className={`font-sans font-bold px-2 py-0.5 rounded-full text-[10px] ${
                  reputation.ip?.status.includes('Malicious') || data.risk_level === 'critical'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {reputation.ip?.status || 'Clean / Safe'}
                </span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 bg-slate-50 rounded-xl p-2 font-mono">
            Provider: AbuseIPDB & MaxMind (Demo)
          </div>
        </div>

        {/* 2. Domain Reputation Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <Globe className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900">Domain Reputation</h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400">DNS WHOIS</span>
            </div>

            <div className="space-y-3 mt-3">
              {/* Domain Risk */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Domain Risk</span>
                <span className={`font-sans font-bold px-2 py-0.5 rounded-full text-[10px] ${
                  reputation.domain?.domain_risk === 'High' || data.risk_score > 70
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {reputation.domain?.domain_risk || (data.risk_score > 70 ? 'High' : 'Low')} Risk
                </span>
              </div>

              {/* Registrar */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Registrar</span>
                <span className="font-sans font-semibold text-slate-800 truncate max-w-[140px]" title={reputation.domain?.registrar || data.infrastructure.registrar || 'ICANN Verified'}>
                  {reputation.domain?.registrar || data.infrastructure.registrar || 'ICANN Verified'}
                </span>
              </div>

              {/* Domain Age */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Domain Age</span>
                <span className="font-mono font-extrabold text-slate-800">
                  {reputation.domain?.domain_age_days ? `${reputation.domain.domain_age_days} days` : '320 days'}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="text-slate-500 font-medium">Status</span>
                <span className="font-mono text-[11px] font-bold text-slate-700">
                  {reputation.domain?.status || 'Active Registered'}
                </span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 bg-slate-50 rounded-xl p-2 font-mono">
            Provider: RDAP & WHOIS Telemetry (Demo)
          </div>
        </div>

        {/* 3. URL Reputation Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100">
                  <Link2 className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900">URL Reputation</h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400">Sandbox Feed</span>
            </div>

            <div className="space-y-3 mt-3">
              {/* Detection count */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Detection Count</span>
                <span className="font-mono font-extrabold text-rose-600">
                  {reputation.url?.detection_count ? `${reputation.url.detection_count} flags` : data.risk_score > 70 ? '42 flags' : '0 flags'}
                </span>
              </div>

              {/* Security vendors */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Security Vendors</span>
                <span className="font-mono font-bold text-slate-800">
                  {reputation.url ? `${reputation.url.detection_count}/${reputation.url.total_vendors}` : '88 scanned'}
                </span>
              </div>

              {/* Redirect status */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Redirects</span>
                <span className="font-sans font-semibold text-slate-700 truncate max-w-[140px]" title={reputation.url?.redirect_status || 'Direct (0 Redirects)'}>
                  {reputation.url?.redirect_status || 'Direct (0 Redirects)'}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="text-slate-500 font-medium">Status</span>
                <span className={`font-sans font-bold px-2 py-0.5 rounded-full text-[10px] ${
                  data.risk_score > 70
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {reputation.url?.status || (data.risk_score > 70 ? 'Malicious Destination' : 'Safe / Reachable')}
                </span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 bg-slate-50 rounded-xl p-2 font-mono">
            Provider: VirusTotal & URLScan (Demo)
          </div>
        </div>

      </div>
    </div>
  );
};
