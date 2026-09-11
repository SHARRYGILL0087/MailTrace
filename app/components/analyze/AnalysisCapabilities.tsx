'use client';

import React from 'react';
import { 
  Bot, 
  ShieldCheck, 
  Search, 
  Globe, 
  MapPin, 
  Share2 
} from 'lucide-react';

export const AnalysisCapabilities: React.FC = () => {
  const capabilities = [
    {
      icon: Bot,
      title: 'AI Threat Detection',
      desc: 'Phishing, BEC, impersonation and social engineering',
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      icon: ShieldCheck,
      title: 'Authentication',
      desc: 'SPF, DKIM and DMARC verification & alignment',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      icon: Search,
      title: 'Header Forensics',
      desc: 'Email routing, relay hops and sender anomalies',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      icon: Globe,
      title: 'Infrastructure',
      desc: 'IP, domain, WHOIS and URL sandbox intelligence',
      color: 'bg-cyan-50 text-cyan-600 border-cyan-100',
    },
    {
      icon: MapPin,
      title: 'Geolocation',
      desc: 'Observed sending & C2 infrastructure location',
      color: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      icon: Share2,
      title: 'Correlation',
      desc: 'Related indicators and threat campaign clustering',
      color: 'bg-purple-50 text-purple-600 border-purple-100',
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-900">
          What Suraksha Shield analyzes
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Automated multi-vector threat inspection engine
        </p>
      </div>

      <div className="space-y-3">
        {capabilities.map((cap) => {
          const Icon = cap.icon;
          return (
            <div
              key={cap.title}
              className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:border-slate-200 hover:shadow-xs"
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${cap.color} shrink-0`}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {cap.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {cap.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
