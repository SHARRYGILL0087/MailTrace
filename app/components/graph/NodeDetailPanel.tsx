'use client';

import React from 'react';
import { 
  X, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  Globe2, 
  Layers, 
  Search, 
  ArrowRight,
  Flame,
  AlertTriangle,
  Building,
  Server,
  MapPin
} from 'lucide-react';
import { ThreatNode } from '@/app/types/graph';
import { getRiskBadge, getNodeIcon } from './GraphNodeCard';

interface NodeDetailPanelProps {
  node: ThreatNode | null;
  onClose: () => void;
  onSelectRelatedNode?: (nodeId: string) => void;
}

export const NodeDetailPanel: React.FC<NodeDetailPanelProps> = ({
  node,
  onClose,
}) => {
  if (!node) return null;

  const Icon = getNodeIcon(node.type);
  const riskBadge = getRiskBadge(node.risk);
  const meta = node.metadata || {};

  return (
    <aside className="w-full lg:w-80 shrink-0 rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xl flex flex-col justify-between transition-all duration-300 animate-in slide-in-from-right-4">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 border border-blue-100 shadow-xs">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {node.type} Intelligence
              </span>
              <h3 className="text-base font-bold text-slate-900 break-all leading-tight">
                {node.label}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Risk & Main Summary Pill */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
          <span className="text-xs font-semibold text-slate-600">Risk Assessment</span>
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${riskBadge.bg}`}>
            <span className={`h-2 w-2 rounded-full ${riskBadge.dot}`} />
            {riskBadge.label}
            {node.riskScore !== undefined && (
              <span className="ml-1 text-[11px] opacity-80">({node.riskScore}/100)</span>
            )}
          </span>
        </div>

        {/* Specific Details based on Node Type */}
        {node.type === 'ip' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">IP Metadata</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-slate-100 p-2.5 bg-white">
                <div className="text-[10px] text-slate-400 font-medium">Country</div>
                <div className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <span>{meta.flag || '🌍'}</span>
                  <span>{meta.country || 'Unknown'}</span>
                </div>
              </div>
              <div className="rounded-xl border border-slate-100 p-2.5 bg-white">
                <div className="text-[10px] text-slate-400 font-medium">City</div>
                <div className="font-semibold text-slate-800 mt-0.5">{meta.city || 'Unknown'}</div>
              </div>
              <div className="rounded-xl border border-slate-100 p-2.5 bg-white">
                <div className="text-[10px] text-slate-400 font-medium">ASN</div>
                <div className="font-semibold text-slate-800 mt-0.5">{meta.asn || 'AS12345'}</div>
              </div>
              <div className="rounded-xl border border-slate-100 p-2.5 bg-white">
                <div className="text-[10px] text-slate-400 font-medium">ISP</div>
                <div className="font-semibold text-slate-800 truncate mt-0.5">{meta.isp || 'Example Hosting'}</div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 p-3 bg-white space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Network Category</span>
                <span className="font-semibold text-slate-800">{meta.network || 'Cloud Hosting'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Reputation</span>
                <span className="font-bold text-rose-600 flex items-center gap-1">
                  <Flame className="h-3 w-3" /> High Risk
                </span>
              </div>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pt-2">Relationships</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-2.5 text-center">
                <div className="text-[10px] text-blue-600 font-medium">Related Emails</div>
                <div className="text-lg font-bold text-blue-900">{meta.relatedEmails || 15}</div>
              </div>
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-2.5 text-center">
                <div className="text-[10px] text-indigo-600 font-medium">Related Domains</div>
                <div className="text-lg font-bold text-indigo-900">{meta.relatedDomains || 7}</div>
              </div>
              <div className="rounded-xl border border-cyan-100 bg-cyan-50/50 p-2.5 text-center">
                <div className="text-[10px] text-cyan-600 font-medium">Related URLs</div>
                <div className="text-lg font-bold text-cyan-900">{meta.relatedURLs || 11}</div>
              </div>
              <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-2.5 text-center">
                <div className="text-[10px] text-purple-600 font-medium">Related Cases</div>
                <div className="text-lg font-bold text-purple-900">{meta.relatedCases || 4}</div>
              </div>
            </div>
          </div>
        )}

        {node.type === 'email' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Details</h4>
            <div className="space-y-2 text-xs">
              <div className="rounded-xl border border-slate-100 p-2.5 bg-white">
                <div className="text-[10px] text-slate-400 font-medium">Filename</div>
                <div className="font-semibold text-slate-800 break-all">{meta.filename || node.label}</div>
              </div>
              <div className="rounded-xl border border-slate-100 p-2.5 bg-white">
                <div className="text-[10px] text-slate-400 font-medium">Sender Address</div>
                <div className="font-semibold text-slate-800 break-all">{meta.sender || 'accounts@vendor-example.com'}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-slate-100 p-2.5 bg-white">
                  <div className="text-[10px] text-slate-400 font-medium">Classification</div>
                  <div className="font-semibold text-slate-800">{meta.classification || 'Phishing'}</div>
                </div>
                <div className="rounded-xl border border-slate-100 p-2.5 bg-white">
                  <div className="text-[10px] text-slate-400 font-medium">Received</div>
                  <div className="font-semibold text-slate-800 text-[11px]">{meta.receivedDate || '01 Sep 2026'}</div>
                </div>
              </div>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pt-1">Authentication Checks</h4>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-2">
                <div className="text-[10px] text-slate-500 font-medium">SPF</div>
                <div className="flex items-center justify-center gap-1 font-bold text-rose-600 mt-0.5">
                  <XCircle className="h-3.5 w-3.5" /> Fail
                </div>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-2">
                <div className="text-[10px] text-slate-500 font-medium">DKIM</div>
                <div className="flex items-center justify-center gap-1 font-bold text-emerald-600 mt-0.5">
                  <CheckCircle className="h-3.5 w-3.5" /> Pass
                </div>
              </div>
              <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-2">
                <div className="text-[10px] text-slate-500 font-medium">DMARC</div>
                <div className="flex items-center justify-center gap-1 font-bold text-rose-600 mt-0.5">
                  <XCircle className="h-3.5 w-3.5" /> Fail
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center rounded-xl border border-slate-100 p-3 bg-slate-50/60 text-xs">
              <span className="text-slate-600">Connected Domains: <strong className="text-slate-900">{meta.relatedDomains || 7}</strong></span>
              <span className="text-slate-600">Connected IPs: <strong className="text-slate-900">{meta.relatedIPs || 3}</strong></span>
            </div>
          </div>
        )}

        {node.type === 'campaign' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Campaign Intelligence</h4>
            <div className="rounded-2xl border border-purple-100 bg-purple-50/40 p-3 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 font-medium">Correlation Confidence</span>
                <span className="text-base font-extrabold text-purple-700">{meta.confidence || 87}%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 font-medium">Campaign Status</span>
                <span className="rounded-full bg-orange-100 text-orange-800 px-2.5 py-0.5 text-[11px] font-bold border border-orange-200">
                  🟠 {meta.status || 'Active'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-slate-100 p-2.5 bg-white">
                <div className="text-[10px] text-slate-400 font-medium">First Seen</div>
                <div className="font-semibold text-slate-800 mt-0.5">{meta.firstSeen || '20 Aug 2026'}</div>
              </div>
              <div className="rounded-xl border border-slate-100 p-2.5 bg-white">
                <div className="text-[10px] text-slate-400 font-medium">Last Seen</div>
                <div className="font-semibold text-slate-800 mt-0.5">{meta.lastSeen || '01 Sep 2026'}</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-2">
                <div className="text-[9px] text-slate-400">Emails</div>
                <div className="font-bold text-slate-800 text-sm">{meta.relatedEmails || 18}</div>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-2">
                <div className="text-[9px] text-slate-400">Domains</div>
                <div className="font-bold text-slate-800 text-sm">{meta.relatedDomains || 7}</div>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-2">
                <div className="text-[9px] text-slate-400">IPs</div>
                <div className="font-bold text-slate-800 text-sm">{meta.relatedIPs || 4}</div>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-2">
                <div className="text-[9px] text-slate-400">Countries</div>
                <div className="font-bold text-slate-800 text-sm">3</div>
              </div>
            </div>
          </div>
        )}

        {/* Fallback for other node types */}
        {['domain', 'sender', 'url', 'hosting', 'location'].includes(node.type) && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Entity Details</h4>
            <div className="space-y-2 text-xs">
              {Object.entries(meta).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center rounded-xl border border-slate-100 p-2.5 bg-white">
                  <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-semibold text-slate-800 break-all text-right max-w-[160px]">{String(val)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-100 space-y-2 mt-4">
        {node.type === 'email' ? (
          <a 
            href={`/investigations?id=INV-2026-00482`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-all"
          >
            Open Investigation
            <ArrowRight className="h-4 w-4" />
          </a>
        ) : node.type === 'campaign' ? (
          <a
            href={`/investigations?campaign=${node.label}`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-purple-700 transition-all"
          >
            Investigate Campaign
            <ArrowRight className="h-4 w-4" />
          </a>
        ) : (
          <div className="space-y-2">
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-all">
              Open Intelligence
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all">
              View Related Cases
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
