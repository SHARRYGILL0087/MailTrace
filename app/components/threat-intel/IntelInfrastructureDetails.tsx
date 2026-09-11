'use client';

import React, { useState } from 'react';
import { 
  Server, 
  Globe, 
  Link2, 
  Database, 
  Layers, 
  ShieldCheck, 
  Network, 
  Building2, 
  MapPin, 
  Calendar, 
  Hash, 
  Mail,
  Copy,
  Check
} from 'lucide-react';
import { ThreatIntelligenceResponse } from '@/app/types/threatIntel';

interface Props {
  data: ThreatIntelligenceResponse;
}

export const IntelInfrastructureDetails: React.FC<Props> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'primary' | 'dns' | 'asn'>('primary');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const { type, infrastructure, geolocation, asn } = data;

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
      
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>🏗️</span> Infrastructure Details
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Technical hosting, registration records, and protocol parameters
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50/80 p-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('primary')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'primary' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Attributes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dns')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'dns' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            DNS & MX Records
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('asn')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'asn' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            ASN & Routing
          </button>
        </div>
      </div>

      {/* Tab 1: Primary Attributes */}
      {activeTab === 'primary' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
          
          {/* IP Specific Fields */}
          {(type === 'ip' || infrastructure.ip_address) && (
            <>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <Server className="h-3.5 w-3.5 text-blue-500" />
                  <span>IP Address</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-900 truncate">
                    {infrastructure.ip_address || data.indicator}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy('ip', infrastructure.ip_address || data.indicator)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    {copiedKey === 'ip' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-rose-500" />
                  <span>Country & City</span>
                </div>
                <div className="font-sans text-xs font-bold text-slate-900">
                  {geolocation.country}, {geolocation.city}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <Network className="h-3.5 w-3.5 text-emerald-500" />
                  <span>ASN Number</span>
                </div>
                <div className="font-mono text-xs font-bold text-slate-900">
                  {asn.asn}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <Building2 className="h-3.5 w-3.5 text-indigo-500" />
                  <span>ISP / Organization</span>
                </div>
                <div className="font-sans text-xs font-bold text-slate-900 truncate" title={infrastructure.isp || asn.org}>
                  {infrastructure.isp || asn.org}
                </div>
              </div>
            </>
          )}

          {/* Domain Specific Fields */}
          {(type === 'domain' || infrastructure.domain) && (
            <>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <Globe className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Domain Hostname</span>
                </div>
                <div className="font-mono text-xs font-bold text-slate-900 truncate">
                  {infrastructure.domain || data.indicator}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <Building2 className="h-3.5 w-3.5 text-slate-500" />
                  <span>Registrar</span>
                </div>
                <div className="font-sans text-xs font-bold text-slate-900 truncate">
                  {infrastructure.registrar || 'ICANN Registrar'}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Creation Date</span>
                </div>
                <div className="font-mono text-xs font-bold text-slate-900">
                  {infrastructure.creation_date || '2026-08-28'}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-amber-500" />
                  <span>Expiration Date</span>
                </div>
                <div className="font-mono text-xs font-bold text-slate-900">
                  {infrastructure.expiration_date || '2027-08-28'}
                </div>
              </div>
            </>
          )}

          {/* URL Specific Fields */}
          {type === 'url' && (
            <>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1 col-span-1 sm:col-span-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <Link2 className="h-3.5 w-3.5 text-cyan-500" />
                  <span>Target URL</span>
                </div>
                <div className="font-mono text-xs font-bold text-slate-900 truncate" title={infrastructure.url || data.indicator}>
                  {infrastructure.url || data.indicator}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <Layers className="h-3.5 w-3.5 text-purple-500" />
                  <span>Protocol & Port</span>
                </div>
                <div className="font-mono text-xs font-bold text-slate-900">
                  {infrastructure.protocol || 'HTTPS (Port 443)'}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-rose-500" />
                  <span>Redirect Hops</span>
                </div>
                <div className="font-mono text-xs font-bold text-slate-900">
                  {infrastructure.redirects_count || 2} Hops Tracked
                </div>
              </div>
            </>
          )}

          {/* Hash Specific Fields */}
          {type === 'hash' && data.reputation.hash && (
            <>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1 col-span-1 sm:col-span-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <Hash className="h-3.5 w-3.5 text-rose-500" />
                  <span>SHA-256 Checksum</span>
                </div>
                <div className="font-mono text-[11px] font-bold text-slate-900 truncate">
                  {data.reputation.hash.sha256}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <Database className="h-3.5 w-3.5 text-blue-500" />
                  <span>File Format</span>
                </div>
                <div className="font-sans text-xs font-bold text-slate-900">
                  {data.reputation.hash.file_type}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <Layers className="h-3.5 w-3.5 text-amber-500" />
                  <span>Threat Family</span>
                </div>
                <div className="font-mono text-xs font-bold text-rose-700">
                  {data.reputation.hash.family}
                </div>
              </div>
            </>
          )}

          {/* Email Specific Fields */}
          {type === 'email' && data.reputation.email && (
            <>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1 col-span-1 sm:col-span-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <Mail className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Sender Address</span>
                </div>
                <div className="font-mono text-xs font-bold text-slate-900 truncate">
                  {data.indicator}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-rose-500" />
                  <span>SPF / DMARC Status</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold">
                  <span className={data.reputation.email.spf_status === 'PASS' ? 'text-emerald-700' : 'text-rose-600'}>
                    SPF: {data.reputation.email.spf_status}
                  </span>
                  <span>•</span>
                  <span className={data.reputation.email.dmarc_status === 'PASS' ? 'text-emerald-700' : 'text-rose-600'}>
                    DMARC: {data.reputation.email.dmarc_status}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <Database className="h-3.5 w-3.5 text-slate-500" />
                  <span>Disposable Check</span>
                </div>
                <div className="font-sans text-xs font-bold text-slate-800">
                  {data.reputation.email.disposable ? 'Yes (Disposable Mailbox)' : 'No (Persistent MX)'}
                </div>
              </div>
            </>
          )}

        </div>
      )}

      {/* Tab 2: DNS & Nameservers */}
      {activeTab === 'dns' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Nameservers */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <Globe className="h-3.5 w-3.5 text-indigo-500" />
              <span>Nameservers (Authoritative)</span>
            </h4>
            <div className="space-y-1.5">
              {(infrastructure.nameservers || ['ns1.bulletproof-dns.is', 'ns2.bulletproof-dns.is']).map((ns, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-xl bg-white border border-slate-200/60 px-3 py-1.5 text-xs font-mono text-slate-700">
                  <span>{ns}</span>
                  <span className="text-[10px] text-slate-400 font-sans">Active</span>
                </div>
              ))}
            </div>
          </div>

          {/* MX Records */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-cyan-500" />
              <span>Mail Exchange (MX) Records</span>
            </h4>
            <div className="space-y-1.5">
              {(infrastructure.mx_records || ['10 mail.evil-payload.ru (185.220.101.5)']).map((mx, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-xl bg-white border border-slate-200/60 px-3 py-1.5 text-xs font-mono text-slate-700">
                  <span className="truncate">{mx}</span>
                  <span className="text-[10px] text-emerald-600 font-bold font-sans shrink-0 ml-2">Resolved</span>
                </div>
              ))}
            </div>
          </div>

          {/* Passive DNS Records Table */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 space-y-2 md:col-span-2">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <Database className="h-3.5 w-3.5 text-emerald-600" />
              <span>Passive DNS History & TXT Verification</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] font-bold uppercase text-slate-400">
                    <th className="pb-2">Record Type</th>
                    <th className="pb-2">Value</th>
                    <th className="pb-2 text-right">TTL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {(infrastructure.dns_records || [
                    { type: 'A', value: '185.220.101.5', ttl: '300s' },
                    { type: 'TXT', value: 'v=spf1 ip4:185.220.101.0/24 +all', ttl: '600s' },
                  ]).map((rec, idx) => (
                    <tr key={idx}>
                      <td className="py-2 text-indigo-700 font-bold">{rec.type}</td>
                      <td className="py-2 text-slate-800">{rec.value}</td>
                      <td className="py-2 text-right text-slate-400">{rec.ttl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: ASN & Routing */}
      {activeTab === 'asn' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400">BGP Autonomous System</div>
            <div className="font-mono text-xs font-bold text-slate-900">{asn.asn}</div>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400">Routing Organization</div>
            <div className="font-sans text-xs font-bold text-slate-900 truncate" title={asn.org}>{asn.org}</div>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400">Announced Subnet</div>
            <div className="font-mono text-xs font-bold text-slate-900">{asn.network}</div>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400">Transit Profile</div>
            <div className="font-sans text-xs font-bold text-slate-900 truncate">{asn.route}</div>
          </div>
        </div>
      )}

    </div>
  );
};
