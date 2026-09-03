'use client';

import React from 'react';
import { UserCheck, AlertTriangle, AlertCircle, ArrowRightLeft, Copy, Check } from 'lucide-react';
import { InvestigationData } from '@/app/types/investigation';

interface Props {
  senderIdentity: InvestigationData['senderIdentity'];
  onInspectDomain?: (domain: string) => void;
}

export const SenderIdentityCard: React.FC<Props> = ({ senderIdentity, onInspectDomain }) => {
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  const handleCopy = (field: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>👤</span> Sender Identity
          </h2>
          <p className="text-xs text-slate-500">
            Envelope vs header sender fields cross-correlation analysis
          </p>
        </div>
        <span className="rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-xs font-bold text-rose-700">
          Domain Alignment Mismatch
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* FROM CARD */}
        <div className="rounded-3xl border border-amber-200/80 bg-amber-50/30 p-5 shadow-xs transition-all hover:bg-amber-50/50">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">FROM</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-100/80 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
              <AlertTriangle className="h-3 w-3 text-amber-600" />
              {senderIdentity.from.status}
            </span>
          </div>

          <div className="group relative flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white p-3 shadow-xs">
            <span className="font-mono text-xs font-bold text-slate-900 truncate">
              {senderIdentity.from.address}
            </span>
            <button
              onClick={() => handleCopy('from', senderIdentity.from.address)}
              className="text-slate-400 hover:text-slate-700 transition-colors p-1"
              title="Copy email address"
            >
              {copiedField === 'from' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>

          <p className="mt-2 text-[11px] font-medium text-amber-800">
            {senderIdentity.from.label}
          </p>
        </div>

        {/* REPLY-TO CARD */}
        <div className="rounded-3xl border border-rose-200/80 bg-rose-50/30 p-5 shadow-xs transition-all hover:bg-rose-50/50">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <span>REPLY-TO</span>
              <ArrowRightLeft className="h-3 w-3 text-rose-500" />
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-100 px-2.5 py-0.5 text-[11px] font-bold text-rose-800">
              <AlertCircle className="h-3 w-3 text-rose-600" />
              {senderIdentity.replyTo.status}
            </span>
          </div>

          <div className="group relative flex items-center justify-between rounded-2xl border border-rose-200 bg-white p-3 shadow-xs">
            <span className="font-mono text-xs font-bold text-rose-900 truncate">
              {senderIdentity.replyTo.address}
            </span>
            <button
              onClick={() => handleCopy('replyTo', senderIdentity.replyTo.address)}
              className="text-slate-400 hover:text-slate-700 transition-colors p-1"
              title="Copy email address"
            >
              {copiedField === 'replyTo' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>

          <p className="mt-2 text-[11px] font-medium text-rose-800">
            {senderIdentity.replyTo.label}
          </p>
        </div>

        {/* RETURN-PATH CARD */}
        <div className="rounded-3xl border border-rose-200/80 bg-rose-50/30 p-5 shadow-xs transition-all hover:bg-rose-50/50">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">RETURN-PATH</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-100 px-2.5 py-0.5 text-[11px] font-bold text-rose-800">
              <AlertCircle className="h-3 w-3 text-rose-600" />
              {senderIdentity.returnPath.status}
            </span>
          </div>

          <div className="group relative flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white p-3 shadow-xs">
            <span className="font-mono text-xs font-bold text-slate-900 truncate">
              {senderIdentity.returnPath.address}
            </span>
            <button
              onClick={() => handleCopy('returnPath', senderIdentity.returnPath.address)}
              className="text-slate-400 hover:text-slate-700 transition-colors p-1"
              title="Copy email address"
            >
              {copiedField === 'returnPath' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>

          <p className="mt-2 text-[11px] font-medium text-rose-800">
            {senderIdentity.returnPath.label}
          </p>
        </div>
      </div>
    </div>
  );
};
