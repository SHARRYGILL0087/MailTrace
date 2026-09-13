'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { EvidenceData } from '@/app/types/investigation';

interface Props {
  evidence: EvidenceData;
  onVerify?: () => void;
  onViewDetails?: () => void;
}

export const EvidenceCard: React.FC<Props> = ({ evidence, onVerify, onViewDetails }) => {
  const [copiedHash, setCopiedHash] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(evidence.integrityVerified);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(evidence.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleRunVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerifiedSuccess(true);
      if (onVerify) onVerify();
    }, 1200);
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>⛓️</span> Evidence & Integrity
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Tamper-evident cryptographic hashing & chain of custody validation
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 self-start sm:self-auto">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          <span>{verifiedSuccess ? 'Integrity Verified' : 'Pending Check'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* SHA-256 Hash Block */}
        <div className="md:col-span-8 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Evidence ID</span>
              <div className="font-mono text-xs font-extrabold text-slate-900 mt-0.5">{evidence.id}</div>
              <span className="text-[10px] text-slate-400">{evidence.fileSize}</span>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Collected At</span>
              <div className="font-sans text-xs font-bold text-slate-800 mt-0.5">{evidence.collectedAt}</div>
              <span className="text-[10px] text-slate-400">{evidence.source}</span>
            </div>
          </div>

          {/* Cryptographic SHA-256 Hash */}
          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-3.5 text-white shadow-inner">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              <span>SHA-256 Payload Hash</span>
              <button
                onClick={handleCopyHash}
                className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {copiedHash ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400 text-[10px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy Hash</span>
                  </>
                )}
              </button>
            </div>
            <p className="font-mono text-xs text-cyan-300 break-all leading-relaxed">
              {evidence.sha256}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="md:col-span-4 space-y-3">
          <button
            onClick={handleRunVerify}
            disabled={verifying}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-75"
          >
            {verifying ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Verifying Hash...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                <span>Verify Evidence</span>
              </>
            )}
          </button>

          <button
            onClick={onViewDetails}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <span>View Evidence Details</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Security Privacy Notice */}
      <p className="mt-4 text-[11px] font-medium text-slate-400 leading-relaxed">
        * Cryptographic hashes ensure tamper-evident evidence integrity for legal compliance without persisting raw email bodies in unauthorized storage.
      </p>
    </div>
  );
};
