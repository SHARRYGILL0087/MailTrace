'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, FileCheck2 } from 'lucide-react';

interface RecentAnalysisRecord {
  id: string;
  emailFile: string;
  classification: string;
  riskScore: number;
  timeAgo: string;
  status: 'Completed' | 'In Progress' | 'Escalated';
}

const RECENT_ANALYSES_MOCK: RecentAnalysisRecord[] = [
  {
    id: 'RA-1094',
    emailFile: 'suspicious_invoice.eml',
    classification: 'Phishing',
    riskScore: 94,
    timeAgo: '2 min ago',
    status: 'Completed',
  },
  {
    id: 'RA-1093',
    emailFile: 'ceo_payment_request.eml',
    classification: 'BEC',
    riskScore: 89,
    timeAgo: '8 min ago',
    status: 'Completed',
  },
  {
    id: 'RA-1092',
    emailFile: 'sso_reauth_verify.eml',
    classification: 'Credential Theft',
    riskScore: 97,
    timeAgo: '15 min ago',
    status: 'Escalated',
  },
  {
    id: 'RA-1091',
    emailFile: 'airwaybill_payload.eml',
    classification: 'Malware',
    riskScore: 78,
    timeAgo: '29 min ago',
    status: 'Completed',
  },
  {
    id: 'RA-1090',
    emailFile: 'quarterly_audit_doc.eml',
    classification: 'Clean / Safe',
    riskScore: 12,
    timeAgo: '42 min ago',
    status: 'Completed',
  },
];

export const RecentAnalyses: React.FC = () => {
  const getRiskBadge = (score: number) => {
    if (score >= 85) return 'bg-rose-50 text-rose-700 border-rose-200';
    if (score >= 60) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  };

  const getStatusBadge = (status: RecentAnalysisRecord['status']) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Escalated': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900">Recent Analyses</h3>
          <p className="text-xs text-slate-500">History of recently submitted email evidence</p>
        </div>
        <Link href="/investigations" className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          View All Analyses <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-medium">
              <th className="pb-3">Email File</th>
              <th className="pb-3">Classification</th>
              <th className="pb-3">Risk Score</th>
              <th className="pb-3">Time</th>
              <th className="pb-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {RECENT_ANALYSES_MOCK.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 font-semibold text-slate-900 flex items-center gap-2">
                  <FileCheck2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  <span className="font-mono text-[11px] truncate max-w-[180px]">{item.emailFile}</span>
                </td>
                <td className="py-3 text-slate-600 font-medium">{item.classification}</td>
                <td className="py-3">
                  <span className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${getRiskBadge(item.riskScore)}`}>
                    {item.riskScore}/100
                  </span>
                </td>
                <td className="py-3 text-slate-400">{item.timeAgo}</td>
                <td className="py-3 text-right">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
