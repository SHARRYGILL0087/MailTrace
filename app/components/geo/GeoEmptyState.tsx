'use client';

import React from 'react';
import { Globe2, MailSearch, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const GeoEmptyState: React.FC = () => {
  return (
    <div className="flex h-[480px] w-full flex-col items-center justify-center rounded-3xl border border-slate-200/90 bg-gradient-to-b from-teal-50/40 via-white to-slate-50 p-8 text-center shadow-xs">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-100/70 text-teal-600 shadow-inner">
        <Globe2 className="h-10 w-10 text-teal-600" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">
        🌍 No Infrastructure Locations Yet
      </h3>

      <p className="text-xs text-slate-500 max-w-md leading-relaxed mb-6">
        Analyze an email to discover and map its observed infrastructure, IPs, hosting providers, and geographic threat footprint.
      </p>

      <Link
        href="/analyze"
        className="flex items-center gap-2 rounded-2xl bg-teal-600 px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition-all hover:scale-[1.02]"
      >
        <MailSearch className="h-4 w-4" />
        <span>Analyze Email →</span>
      </Link>
    </div>
  );
};
