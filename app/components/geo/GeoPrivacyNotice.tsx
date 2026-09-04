'use client';

import React from 'react';
import { Lock, Info, ShieldCheck } from 'lucide-react';

export const GeoPrivacyNotice: React.FC = () => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-slate-50/70 p-5 shadow-xs">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-white text-slate-600 border border-slate-200">
          <Lock className="h-3.5 w-3.5" />
        </div>
        <h4 className="text-xs font-bold text-slate-800">🔒 Accuracy & Privacy Notice</h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-[11px] text-slate-500 pt-1">
        <div className="rounded-xl border border-slate-200/60 bg-white p-2.5">
          <strong className="text-slate-700 block mb-0.5">Approximate Data</strong>
          IP geolocation is inherently approximate and based on registry observations.
        </div>
        <div className="rounded-xl border border-slate-200/60 bg-white p-2.5">
          <strong className="text-slate-700 block mb-0.5">Network Infrastructure</strong>
          Locations reflect server host points, ASNs, and Cloud VPS relays.
        </div>
        <div className="rounded-xl border border-slate-200/60 bg-white p-2.5">
          <strong className="text-slate-700 block mb-0.5">Anonymizers & Proxies</strong>
          VPNs, proxies, and TOR nodes can obscure original origin IPs.
        </div>
        <div className="rounded-xl border border-slate-200/60 bg-white p-2.5">
          <strong className="text-slate-700 block mb-0.5">Internal Addresses</strong>
          Private/RFC1918 addresses cannot be geolocated on public maps.
        </div>
        <div className="rounded-xl border border-slate-200/60 bg-white p-2.5">
          <strong className="text-slate-700 block mb-0.5">Non-Attribution</strong>
          Geographic location does not establish the physical identity of an actor.
        </div>
      </div>
    </div>
  );
};
