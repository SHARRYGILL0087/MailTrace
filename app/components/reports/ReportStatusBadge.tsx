'use client';

import React from 'react';
import { ReportStatus, ReportRiskLevel } from '@/app/types/report';

interface ReportStatusBadgeProps {
  status: ReportStatus;
}

export const ReportStatusBadge: React.FC<ReportStatusBadgeProps> = ({ status }) => {
  const getBadgeStyle = (status: ReportStatus) => {
    switch (status) {
      case 'Draft':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'Generated':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Reviewed':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Verified':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Archived':
        return 'bg-slate-50 text-slate-400 border-slate-200';
      case 'Needs Review':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${getBadgeStyle(
        status
      )}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
};

export const RiskBadge: React.FC<{ score: number; level: ReportRiskLevel }> = ({ score, level }) => {
  const getRiskStyle = (score: number) => {
    if (score >= 90) return { bg: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500', icon: '🔴' };
    if (score >= 75) return { bg: 'bg-amber-50 text-amber-800 border-amber-200', dot: 'bg-amber-500', icon: '🟠' };
    if (score >= 50) return { bg: 'bg-yellow-50 text-yellow-800 border-yellow-200', dot: 'bg-yellow-500', icon: '🟡' };
    return { bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', dot: 'bg-emerald-500', icon: '🟢' };
  };

  const style = getRiskStyle(score);

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${style.bg}`}>
      <span>{style.icon}</span>
      <span>{score}/100</span>
    </span>
  );
};

export const EvidenceStatusBadge: React.FC<{ status: 'Verified' | 'Pending' | 'Unverified' }> = ({ status }) => {
  if (status === 'Verified') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
        <span>🟢</span> Verified
      </span>
    );
  }
  if (status === 'Pending') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
        <span>🟠</span> Pending
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
      <span>⚪</span> Unverified
    </span>
  );
};
