'use client';

import React from 'react';
import { MailSearch, ArrowRight, Share2, Network } from 'lucide-react';
import Link from 'next/link';

export const GraphEmptyState: React.FC = () => {
  return (
    <div className="flex h-[540px] w-full flex-col items-center justify-center rounded-3xl border border-slate-200/90 bg-gradient-to-b from-blue-50/40 via-white to-slate-50 p-8 text-center shadow-xs">
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100/70 text-blue-600 shadow-inner">
        <Share2 className="h-10 w-10 text-blue-600" />
        <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold shadow-md">
          🕸️
        </span>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">
        No Threat Relationships Yet
      </h3>

      <p className="text-xs text-slate-500 max-w-md leading-relaxed mb-6">
        Analyze an email or input an indicator of compromise (Domain, IP, URL) to automatically build its relationship graph and correlate campaign infrastructure.
      </p>

      <Link
        href="/analyze"
        className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-all hover:scale-[1.02]"
      >
        <MailSearch className="h-4 w-4" />
        <span>Analyze Email →</span>
      </Link>
    </div>
  );
};
