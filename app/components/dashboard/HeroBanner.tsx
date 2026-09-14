'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, BrainCircuit, Search, Globe2, Share2 } from 'lucide-react';
import { ThreatShieldLogo } from '@/app/components/ui/ThreatShieldLogo';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-blue-100/70 bg-gradient-to-r from-blue-50/80 via-white to-cyan-50/40 p-7 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        <div className="lg:col-span-7 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/90 bg-blue-50/90 px-3.5 py-1 text-[11px] font-bold text-blue-700 shadow-2xs">
            <ThreatShieldLogo size={16} variant="blue" />
            <span>Threat Shield Forensic Engine v4.2 Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Detect. Trace. Investigate.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
            Threat Shield combines AI-powered threat detection, email header forensics, infrastructure intelligence, geolocation and threat correlation in one investigation platform.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/analyze?browse=true"
              className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              Analyze an Email
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/threat-intelligence"
              className="rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all"
            >
              Explore Threat Intelligence
            </Link>
          </div>
        </div>

        {/* Pipeline Process Flow */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 p-3.5 rounded-3xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-sm">
            {[
              { label: 'Email', icon: Mail },
              { label: 'AI', icon: BrainCircuit },
              { label: 'Forensics', icon: Search },
              { label: 'Infra', icon: Globe2 },
              { label: 'Graph', icon: Share2 },
            ].map((node, i, arr) => {
              const Icon = node.icon;
              return (
                <React.Fragment key={node.label}>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 border border-slate-100 min-w-[50px]">
                    <Icon className="h-3.5 w-3.5 text-blue-600" />
                    <span className="text-[10px] font-semibold text-slate-700">{node.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-slate-300 font-bold text-xs select-none">→</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};