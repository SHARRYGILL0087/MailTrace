'use client';

import React, { useState } from 'react';
import { Search, ArrowRight, Route, Sparkles, CheckCircle2 } from 'lucide-react';
import { ThreatNode, PathSearchResult } from '@/app/types/graph';

interface ConnectionFinderProps {
  nodes: ThreatNode[];
  onFindPath: (result: PathSearchResult | null) => void;
}

export const ConnectionFinder: React.FC<ConnectionFinderProps> = ({
  nodes,
  onFindPath,
}) => {
  const [fromNodeId, setFromNodeId] = useState<string>('email-001');
  const [toNodeId, setToNodeId] = useState<string>('campaign-024');
  const [activePathResult, setActivePathResult] = useState<PathSearchResult | null>(null);

  const handleSearchPath = () => {
    // Preset shortest path logic for demo graph
    // Email 001 -> Domain 001 -> IP 001 -> Hosting 001 -> Campaign 024
    const pathNodes = ['email-001', 'domain-001', 'ip-001', 'hosting-001', 'campaign-024'];
    const pathEdges = ['e1-d1', 'd1-ip1', 'ip1-h1', 'h1-c1'];

    const result = {
      pathNodeIds: pathNodes,
      pathEdgeIds: pathEdges,
    };

    setActivePathResult(result);
    onFindPath(result);
  };

  const handleClearPath = () => {
    setActivePathResult(null);
    onFindPath(null);
  };

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
            <Route className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Find Connection / Shortest Path</h3>
            <p className="text-xs text-slate-500">Trace multi-hop infrastructure relationships</p>
          </div>
        </div>

        {activePathResult && (
          <button
            onClick={handleClearPath}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            Clear Path
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* From Select */}
        <div className="md:col-span-5 space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">From Node</label>
          <select
            value={fromNodeId}
            onChange={(e) => setFromNodeId(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {nodes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.type.toUpperCase()}: {n.label}
              </option>
            ))}
          </select>
        </div>

        {/* Arrow Divider */}
        <div className="md:col-span-1 flex justify-center items-center pt-4">
          <ArrowRight className="h-4 w-4 text-slate-400" />
        </div>

        {/* To Select */}
        <div className="md:col-span-4 space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">To Node</label>
          <select
            value={toNodeId}
            onChange={(e) => setToNodeId(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {nodes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.type.toUpperCase()}: {n.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Button */}
        <div className="md:col-span-2 pt-4">
          <button
            onClick={handleSearchPath}
            className="flex w-full items-center justify-center gap-1.5 rounded-2xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Find Path
          </button>
        </div>
      </div>

      {/* Path Result Visual Representation */}
      {activePathResult && (
        <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-3.5 transition-all">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900 mb-2">
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
            <span>Path Discovered (4 Hops, 97% Confidence)</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-xl border border-blue-200 bg-white px-2.5 py-1 font-bold text-blue-900 shadow-xs">
              📧 Email (suspicious_invoice.eml)
            </span>
            <ArrowRight className="h-3 w-3 text-blue-400 shrink-0" />
            <span className="rounded-xl border border-indigo-200 bg-white px-2.5 py-1 font-bold text-indigo-900 shadow-xs">
              🌐 Domain (vendor-secure-login.xyz)
            </span>
            <ArrowRight className="h-3 w-3 text-blue-400 shrink-0" />
            <span className="rounded-xl border border-purple-200 bg-white px-2.5 py-1 font-bold text-purple-900 shadow-xs">
              🖥️ IP (185.220.101.45)
            </span>
            <ArrowRight className="h-3 w-3 text-blue-400 shrink-0" />
            <span className="rounded-xl border border-slate-200 bg-white px-2.5 py-1 font-bold text-slate-800 shadow-xs">
              ☁️ Hosting (FastServer VPS)
            </span>
            <ArrowRight className="h-3 w-3 text-blue-400 shrink-0" />
            <span className="rounded-xl border border-rose-200 bg-white px-2.5 py-1 font-bold text-rose-900 shadow-xs">
              🎯 Campaign (CAMP-024)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
