'use client';

import React, { useState } from 'react';
import { Mail, Globe, Link2, Monitor, Target, ArrowRight, Share2 } from 'lucide-react';

interface Props {
  onOpenThreatGraph?: () => void;
  onNodeSelect?: (nodeType: string, label: string) => void;
}

export const ThreatGraphPreview: React.FC<Props> = ({ onOpenThreatGraph, onNodeSelect }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes = [
    { id: 'email', label: 'Email Payload', icon: Mail, color: 'border-blue-200 bg-blue-50 text-blue-700' },
    { id: 'domain', label: 'Domain', icon: Globe, color: 'border-indigo-200 bg-indigo-50 text-indigo-700' },
    { id: 'url', label: 'Phishing URL', icon: Link2, color: 'border-cyan-200 bg-cyan-50 text-cyan-700' },
    { id: 'ip', label: 'Host IP', icon: Monitor, color: 'border-rose-200 bg-rose-50 text-rose-700' },
    { id: 'campaign', label: 'Campaign CAMP-024', icon: Target, color: 'border-purple-200 bg-purple-50 text-purple-700' },
  ];

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>🕸️</span> Threat Relationship
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Interactive entity graph correlation</p>
          </div>
          <span className="rounded-full bg-purple-50 border border-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
            5 Nodes Connected
          </span>
        </div>

        {/* Mini Interactive SVG Graph Network */}
        <div className="relative py-6 flex flex-col items-center justify-center min-h-[220px]">
          {/* Node 1: Email */}
          <div
            onMouseEnter={() => setHoveredNode('email')}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => onNodeSelect?.('email', 'Email Payload')}
            className={`cursor-pointer transition-all duration-200 flex items-center gap-2 rounded-full border px-4 py-1.5 shadow-xs ${
              hoveredNode === 'email' || hoveredNode === null ? 'scale-105 shadow-md' : 'opacity-60'
            } border-emerald-300 bg-emerald-50 text-emerald-800 font-bold text-xs`}
          >
            <Mail className="h-3.5 w-3.5 text-emerald-600" />
            <span>📧 Email (INV-2026-00482)</span>
          </div>

          {/* Connector 1 */}
          <div className="h-4 w-0.5 bg-gradient-to-b from-emerald-400 to-indigo-400 my-1" />

          {/* Node 2: Domain */}
          <div
            onMouseEnter={() => setHoveredNode('domain')}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => onNodeSelect?.('domain', 'company-support.xyz')}
            className={`cursor-pointer transition-all duration-200 flex items-center gap-2 rounded-full border px-4 py-1.5 shadow-xs ${
              hoveredNode === 'domain' || hoveredNode === 'email' || hoveredNode === null ? 'scale-105 shadow-md' : 'opacity-60'
            } border-indigo-300 bg-indigo-50 text-indigo-800 font-bold text-xs`}
          >
            <Globe className="h-3.5 w-3.5 text-indigo-600" />
            <span>🌐 Domain (company-support.xyz)</span>
          </div>

          {/* Split Connectors */}
          <div className="flex justify-center gap-16 w-full max-w-xs my-1">
            <div className="h-4 w-0.5 bg-indigo-400" />
            <div className="h-4 w-0.5 bg-indigo-400" />
          </div>

          {/* Row 3: URL & IP */}
          <div className="flex items-center justify-center gap-6">
            <div
              onMouseEnter={() => setHoveredNode('url')}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => onNodeSelect?.('url', 'login-example.xyz')}
              className={`cursor-pointer transition-all duration-200 flex items-center gap-1.5 rounded-full border px-3 py-1 shadow-xs ${
                hoveredNode === 'url' || hoveredNode === null ? 'scale-105 shadow-md' : 'opacity-60'
              } border-cyan-300 bg-cyan-50 text-cyan-800 font-bold text-xs`}
            >
              <Link2 className="h-3.5 w-3.5 text-cyan-600" />
              <span>🔗 URL Target</span>
            </div>

            <div
              onMouseEnter={() => setHoveredNode('ip')}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => onNodeSelect?.('ip', '185.220.101.5')}
              className={`cursor-pointer transition-all duration-200 flex items-center gap-1.5 rounded-full border px-3 py-1 shadow-xs ${
                hoveredNode === 'ip' || hoveredNode === null ? 'scale-105 shadow-md' : 'opacity-60'
              } border-rose-300 bg-rose-50 text-rose-800 font-bold text-xs`}
            >
              <Monitor className="h-3.5 w-3.5 text-rose-600" />
              <span>🖥️ Host IP</span>
            </div>
          </div>

          {/* Connector 3 */}
          <div className="h-4 w-0.5 bg-gradient-to-b from-rose-400 to-purple-400 my-1" />

          {/* Node 4: Campaign */}
          <div
            onMouseEnter={() => setHoveredNode('campaign')}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => onNodeSelect?.('campaign', 'CAMP-024')}
            className={`cursor-pointer transition-all duration-200 flex items-center gap-2 rounded-full border px-4 py-1.5 shadow-xs ${
              hoveredNode === 'campaign' || hoveredNode === null ? 'scale-105 shadow-md' : 'opacity-60'
            } border-purple-300 bg-purple-50 text-purple-800 font-bold text-xs`}
          >
            <Target className="h-3.5 w-3.5 text-purple-600" />
            <span>🎯 Campaign #CAMP-024</span>
          </div>
        </div>
      </div>

      <button
        onClick={onOpenThreatGraph}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
      >
        <span>Open Threat Graph</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
