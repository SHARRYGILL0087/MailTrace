'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ShieldAlert, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';

interface AnalysisSuccessProps {
  fileName?: string;
  onReset: () => void;
}

export const AnalysisSuccess: React.FC<AnalysisSuccessProps> = ({ fileName = 'suspicious_invoice.eml', onReset }) => {
  return (
    <div className="rounded-3xl border border-emerald-200/90 bg-gradient-to-b from-emerald-50/60 via-white to-slate-50/50 p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Analysis Complete
            </h2>
            <p className="text-xs text-slate-500">
              Threat assessment is ready for <strong className="text-slate-700 font-semibold">{fileName}</strong>
            </p>
          </div>
        </div>

        <span className="rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1 text-xs font-bold text-rose-700 shadow-2xs">
          High Risk Threat Detected
        </span>
      </div>

      {/* Summary Matrix Cards */}
      <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-4">
          <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider">Threat Score</span>
          <p className="mt-1 text-2xl font-black text-rose-700">94<span className="text-xs font-normal text-rose-500">/100</span></p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Classification</span>
          <p className="mt-1 text-lg font-bold text-slate-900">Phishing</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Confidence</span>
          <p className="mt-1 text-lg font-bold text-emerald-600">96%</p>
        </div>

        <div className="rounded-2xl border border-rose-200/80 bg-white p-4">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Risk Level</span>
          <p className="mt-1 text-lg font-bold text-rose-600 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            HIGH
          </p>
        </div>
      </div>

      {/* Key Finding Preview */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-xs text-slate-600 leading-relaxed mb-6">
        <strong className="text-slate-900 font-bold block mb-1">Key Forensic Findings:</strong>
        Sender address <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-[11px] text-slate-800">billing@secure-update-portal.eu</code> failed SPF and DKIM checks. Originating IP <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-[11px] text-slate-800">185.220.101.5</code> (Amsterdam, NL) maps to a known C2 infrastructure cluster.
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Run New Analysis
        </button>

        <Link
          href="/investigations"
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-500/25 hover:bg-blue-700 transition-all hover:scale-[1.01]"
        >
          View Investigation
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
