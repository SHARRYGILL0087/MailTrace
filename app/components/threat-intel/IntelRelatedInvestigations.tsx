'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowRight, ExternalLink, FolderArchive, ArrowUpRight } from 'lucide-react';
import { RelatedCase } from '@/app/types/threatIntel';

interface Props {
  cases: RelatedCase[];
  onOpenCreateCase?: () => void;
}

export const IntelRelatedInvestigations: React.FC<Props> = ({ cases, onOpenCreateCase }) => {
  if (!cases || cases.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>📁</span> Related Investigations
          </h3>
          <button
            type="button"
            onClick={onOpenCreateCase}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            + Create New Case
          </button>
        </div>
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
          <FolderArchive className="h-6 w-6 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-bold text-slate-700">No active investigations linked to this indicator</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            This indicator has not yet been linked to an open forensic dossier in your SOC queue.
          </p>
          <button
            type="button"
            onClick={onOpenCreateCase}
            className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
          >
            <span>Create Case From Indicator</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>📁</span> Related Investigations ({cases.length})
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Security incident dossiers and email triage cases matching this indicator
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCreateCase}
            className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            + Create Case
          </button>
          <Link
            href="/investigations"
            className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors ml-1"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Case Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              <th className="pb-3 pr-3">Case ID</th>
              <th className="pb-3 px-3">Title & Threat Type</th>
              <th className="pb-3 px-3 text-center">Risk Score</th>
              <th className="pb-3 px-3 text-center">Status</th>
              <th className="pb-3 px-3">Related Indicator</th>
              <th className="pb-3 px-3">Last Updated</th>
              <th className="pb-3 pl-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cases.map((c) => (
              <tr key={c.id} className="group hover:bg-slate-50/80 transition-colors">
                {/* Case ID */}
                <td className="py-3.5 pr-3">
                  <span className="font-mono text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {c.id}
                  </span>
                </td>

                {/* Title & Type */}
                <td className="py-3.5 px-3 max-w-[220px]">
                  <p className="font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                    {c.title}
                  </p>
                  <span className="text-[11px] text-slate-400 font-medium">{c.threat_type}</span>
                </td>

                {/* Risk Score */}
                <td className="py-3.5 px-3 text-center">
                  <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[11px] font-extrabold text-rose-700">
                    {c.risk_score}/100
                  </span>
                </td>

                {/* Status */}
                <td className="py-3.5 px-3 text-center">
                  <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${
                    c.status === 'Investigating'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : c.status === 'Escalated'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : c.status === 'Contained'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {c.status}
                  </span>
                </td>

                {/* Related Indicator */}
                <td className="py-3.5 px-3">
                  <span className="font-mono text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {c.related_indicator}
                  </span>
                </td>

                {/* Last Updated */}
                <td className="py-3.5 px-3 text-[11px] text-slate-500 font-mono">
                  {c.last_updated}
                </td>

                {/* Action */}
                <td className="py-3.5 pl-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      href={`/investigation/${c.id}`}
                      className="inline-flex items-center gap-1 rounded-xl bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-800 hover:bg-emerald-100 transition-colors"
                    >
                      <span>View</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
