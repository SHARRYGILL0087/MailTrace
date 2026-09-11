'use client';

import React from 'react';
import { X, CheckCircle2, AlertCircle, Wifi, Clock, Server, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  result: {
    providerName: string;
    status: string;
    latencyMs?: number;
    message: string;
    timestamp: string;
  } | null;
}

export const TestConnectionModal: React.FC<Props> = ({ isOpen, onClose, result }) => {
  if (!isOpen || !result) return null;

  const isConnected = result.status === 'Connected';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl z-10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${
              isConnected ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}>
              <Wifi className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Integration Diagnostics</h3>
              <p className="text-[11px] text-slate-500">{result.providerName}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Diagnostics Card */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Handshake Status</span>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
              isConnected
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-rose-100 text-rose-800 border border-rose-200'
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-emerald-600' : 'bg-rose-600'}`} />
              {result.status}
            </span>
          </div>

          {result.latencyMs && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Roundtrip Latency</span>
              <span className="font-mono font-bold text-emerald-700">{result.latencyMs} ms</span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Response Timestamp</span>
            <span className="font-mono text-[11px] text-slate-600">
              {new Date(result.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/60">
          {result.message}
        </p>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-xs"
          >
            Close Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};
