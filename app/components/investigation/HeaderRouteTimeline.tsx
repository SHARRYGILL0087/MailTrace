'use client';

import React from 'react';
import { Server, ArrowDown, Globe, ShieldAlert, AlertTriangle, ExternalLink } from 'lucide-react';
import { HeaderNode } from '@/app/types/investigation';

interface Props {
  routeNodes: HeaderNode[];
  onNodeClick: (node: HeaderNode) => void;
}

export const HeaderRouteTimeline: React.FC<Props> = ({ routeNodes, onNodeClick }) => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md">
      <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>🔍</span> Header Forensics
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Observed transmission path reconstructed from email headers
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
          {routeNodes.length} Hops Reconstructed
        </span>
      </div>

      {/* Route Transmission Timeline */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-rose-400 via-emerald-400 to-teal-400">
        {routeNodes.map((node, index) => {
          return (
            <div
              key={node.id}
              onClick={() => onNodeClick(node)}
              className="group relative flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 hover:border-emerald-300 hover:bg-emerald-50/40 hover:shadow-xs transition-all cursor-pointer"
            >
              {/* Timeline Connector Pin */}
              <div className="absolute -left-6 top-5 flex h-6 w-6 items-center justify-center rounded-full bg-white border-2 border-slate-300 shadow-2xs group-hover:border-emerald-600 transition-colors">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    node.isSuspicious ? 'bg-rose-500 animate-ping' : 'bg-emerald-600'
                  }`}
                />
              </div>

              {/* Node Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                  node.isSuspicious
                    ? 'bg-rose-100 text-rose-700 border border-rose-200'
                    : 'bg-white text-emerald-600 border border-slate-200'
                } shadow-xs group-hover:scale-105 transition-transform`}
              >
                <Server className="h-5 w-5" />
              </div>

              {/* Details Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {node.name}
                    </h3>
                    <span className="text-base">{node.flag}</span>
                    {node.isSuspicious && (
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                        High Risk
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-slate-400">
                    {node.timestamp}
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                  <span className="font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                    {node.ip}
                  </span>
                  <span className="text-slate-500 font-medium">
                    {node.location}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 truncate max-w-[200px]">
                    {node.provider}
                  </span>
                </div>
              </div>

              {/* Click Drawer Hint */}
              <div className="text-[11px] font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity self-center">
                Inspect →
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
