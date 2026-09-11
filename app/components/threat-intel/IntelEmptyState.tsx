'use client';

import React from 'react';
import { ShieldCheck, Search, Globe, Server, Link2, Hash, Mail, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { IndicatorType } from '@/app/types/threatIntel';

interface Props {
  onSelectIndicator: (indicator: string, type?: IndicatorType) => void;
}

export const IntelEmptyState: React.FC<Props> = ({ onSelectIndicator }) => {
  const quickCategories = [
    {
      title: 'IP Address Lookup',
      desc: 'Investigate IP reputation, Tor nodes, proxy detection and BGP ASN routing.',
      example: '8.8.8.8',
      type: 'ip' as IndicatorType,
      icon: Server,
    },
    {
      title: 'Domain Risk Analysis',
      desc: 'Check domain age, registration WHOIS, fast-flux DNS and spoofing status.',
      example: 'evil-payload.ru',
      type: 'domain' as IndicatorType,
      icon: Globe,
    },
    {
      title: 'Malicious URL Sandbox',
      desc: 'Trace redirect hops, HTTP header chains and multi-AV sandbox detections.',
      example: 'malicious-url.com',
      type: 'url' as IndicatorType,
      icon: Link2,
    },
    {
      title: 'Payload Hash Lookup',
      desc: 'Identify malware families, file signatures, and campaign attachments.',
      example: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      type: 'hash' as IndicatorType,
      icon: Hash,
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Primary Empty State Box */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-10 md:p-14 text-center shadow-xs">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-50 border border-slate-200/80 text-emerald-600 shadow-2xs mb-4">
          <div className="relative">
            <ShieldCheck className="h-8 w-8 text-emerald-600" />
            <Search className="h-4 w-4 text-slate-500 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
          </div>
        </div>

        <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
          Search an Indicator
        </h2>
        
        <p className="mt-2 text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Enter an IP, domain, URL, hash or email address to investigate its threat intelligence.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Supported queries:</span>
          <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[11px] font-mono text-slate-600">IPv4 / IPv6</span>
          <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[11px] font-mono text-slate-600">FQDN Domains</span>
          <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[11px] font-mono text-slate-600">HTTP/HTTPS URLs</span>
          <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[11px] font-mono text-slate-600">SHA-256 / MD5</span>
          <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[11px] font-mono text-slate-600">Sender Emails</span>
        </div>
      </div>

      {/* Suggested Quick Starter Cards */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-emerald-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Quick Investigation Starters
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.title}
                type="button"
                onClick={() => onSelectIndicator(cat.example, cat.type)}
                className="group text-left rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-3 cursor-pointer"
              >
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-50 text-slate-700 border border-slate-100 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors mb-3">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {cat.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-emerald-700">
                  <span className="font-mono text-[11px] truncate max-w-[120px]">{cat.example}</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
