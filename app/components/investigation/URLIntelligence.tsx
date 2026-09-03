'use client';

import React, { useState } from 'react';
import { Link2, ShieldAlert, Copy, Check, Info, ArrowUpRight, Lock } from 'lucide-react';
import { URLIntelligenceItem } from '@/app/types/investigation';

interface Props {
  urls: URLIntelligenceItem[];
  onOpenDetails: (item: URLIntelligenceItem) => void;
}

export const URLIntelligence: React.FC<Props> = ({ urls, onOpenDetails }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md">
      <div className="mb-6 pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>🔗</span> URL Intelligence
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Extracted hyperlinks, redirect paths, and sandbox reputation telemetry
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full self-start sm:self-auto">
          <Lock className="h-3.5 w-3.5" />
          <span>Direct browser opening disabled for safety</span>
        </div>
      </div>

      {/* URL Table / Cards Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              <th className="pb-3 pr-4">Extracted URL</th>
              <th className="pb-3 px-4">Target Domain</th>
              <th className="pb-3 px-4">Reputation</th>
              <th className="pb-3 px-4 text-center">Redirects</th>
              <th className="pb-3 px-4">Risk Level</th>
              <th className="pb-3 pl-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {urls.map((item) => {
              const isMalicious = item.reputation === 'malicious';

              return (
                <tr key={item.id} className="group hover:bg-slate-50/80 transition-colors">
                  {/* URL */}
                  <td className="py-3.5 pr-4 max-w-[260px]">
                    <div className="flex items-center gap-2">
                      <Link2 className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                      <span className="font-mono font-bold text-slate-900 truncate" title={item.url}>
                        {item.url}
                      </span>
                    </div>
                  </td>

                  {/* Domain */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-slate-700 font-semibold">{item.domain}</span>
                  </td>

                  {/* Reputation */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        isMalicious
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${isMalicious ? 'bg-rose-600' : 'bg-amber-600'}`} />
                      {isMalicious ? '🔴 Malicious' : '🟡 Suspicious'}
                    </span>
                  </td>

                  {/* Redirects */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold text-slate-700">
                      {item.redirects}
                    </span>
                  </td>

                  {/* Risk */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-bold ${
                        item.risk === 'High' ? 'text-rose-600' : 'text-amber-600'
                      }`}
                    >
                      {item.risk}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 pl-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleCopy(item.id, item.url)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-all"
                        title="Copy link"
                      >
                        {copiedId === item.id ? (
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>

                      <button
                        onClick={() => onOpenDetails(item)}
                        className="rounded-xl bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-800 hover:bg-emerald-100 transition-colors"
                      >
                        Inspect →
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
