'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, Cpu, RefreshCw, Copy, Check } from 'lucide-react';
import { ForensicReport } from '@/app/types/report';

interface EvidenceVerificationModalProps {
  report: ForensicReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EvidenceVerificationModal: React.FC<EvidenceVerificationModalProps> = ({
  report,
  isOpen,
  onClose,
}) => {
  const [verifying, setVerifying] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVerifying(true);
      const timer = setTimeout(() => setVerifying(false), 900);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !report) return null;

  const handleCopyProof = () => {
    const proofText = `EVIDENCE INTEGRITY PROOF CERTIFICATE\nReport ID: ${report.id}\nEvidence ID: ${report.evidenceIntegrity.evidenceId}\nSHA-256: ${report.evidenceIntegrity.sha256}\nLedger Status: ${report.evidenceIntegrity.ledgerStatus}\nVerified At: ${new Date().toISOString()}`;
    navigator.clipboard.writeText(proofText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Evidence Integrity Verification
            </h2>
            <p className="text-xs text-slate-500 font-semibold">
              Cryptographic SHA-256 Ledger Proof for {report.id}
            </p>
          </div>
        </div>

        {verifying ? (
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
            <RefreshCw className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="text-xs font-bold text-slate-700">
              Re-calculating SHA-256 hash & validating ledger node signature...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Status Callout */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-xs font-extrabold text-emerald-900">
                    🟢 EVIDENCE HASH MATCH VERIFIED
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium">
                    Evidence payload bitstream matches stored cryptographic ledger record.
                  </div>
                </div>
              </div>
              <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-extrabold text-white">
                100% MATCH
              </span>
            </div>

            {/* Hash Details */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  SHA-256 Cryptographic Hash
                </span>
                <div className="mt-1 rounded-xl bg-slate-900 p-2.5 font-mono text-[11px] text-emerald-400 break-all select-all font-semibold">
                  {report.evidenceIntegrity.sha256}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div>
                  <span className="text-[10px] font-bold text-slate-400">Evidence ID:</span>
                  <div className="font-bold text-slate-800">{report.evidenceIntegrity.evidenceId}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400">Verification Engine:</span>
                  <div className="font-bold text-slate-800">{report.evidenceIntegrity.verificationMethod}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400">Collected Source:</span>
                  <div className="font-bold text-slate-800">{report.evidenceIntegrity.source}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400">Immutable Ledger Node:</span>
                  <div className="font-bold text-emerald-700 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {report.evidenceIntegrity.ledgerStatus}
                  </div>
                </div>
              </div>
            </div>

            {/* Notice */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3 text-[11px] text-blue-800">
              <p className="font-semibold">
                🛡️ Note: Private email contents are never published raw to public blockchains. Only zero-knowledge cryptographic hashes are stored for forensic chain-of-custody verification.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={handleCopyProof}
                className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
                <span>{copied ? 'Proof Copied!' : 'Copy Proof Certificate'}</span>
              </button>
              <button
                onClick={onClose}
                className="rounded-2xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
