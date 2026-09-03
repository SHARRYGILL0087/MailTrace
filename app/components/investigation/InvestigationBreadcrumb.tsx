'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ShieldAlert, Copy, Check } from 'lucide-react';

interface Props {
  investigationId: string;
}

export const InvestigationBreadcrumb: React.FC<Props> = ({ investigationId }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(investigationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
      <nav className="flex items-center gap-2">
        <Link
          href="/investigations"
          className="flex items-center gap-1.5 font-medium text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ShieldAlert className="h-3.5 w-3.5 text-slate-400" />
          <span>Investigations</span>
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
        <span className="font-mono font-bold text-slate-800">{investigationId}</span>
      </nav>

      <div className="flex items-center gap-2">
        <button
          onClick={handleCopyId}
          className="group flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-600 shadow-xs hover:border-slate-300 hover:bg-slate-50 transition-all"
          title="Copy Case Reference ID"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-600" />
              <span className="text-emerald-700">Copied ID</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 text-slate-400 group-hover:text-slate-600" />
              <span>Copy Ref ID</span>
            </>
          )}
        </button>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
          SOC Tier-2 Forensic Workspace
        </span>
      </div>
    </div>
  );
};
