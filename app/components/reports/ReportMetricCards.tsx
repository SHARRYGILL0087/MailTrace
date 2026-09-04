'use client';

import React from 'react';
import { 
  FileText, 
  Calendar, 
  AlertTriangle, 
  Link2, 
  ShieldAlert, 
  TrendingUp 
} from 'lucide-react';
import { ReportSummaryMetrics } from '@/app/types/report';

interface ReportMetricCardsProps {
  metrics: ReportSummaryMetrics;
}

export const ReportMetricCards: React.FC<ReportMetricCardsProps> = ({ metrics }) => {
  const cards = [
    {
      id: 'total',
      label: 'Total Reports',
      value: metrics.totalReports,
      icon: FileText,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
      badge: '+12% this month',
      badgeColor: 'bg-blue-50 text-blue-700',
    },
    {
      id: 'month',
      label: 'This Month',
      value: metrics.thisMonth,
      icon: Calendar,
      iconBg: 'bg-cyan-50 text-cyan-600 border-cyan-100',
      badge: 'Current Cycle',
      badgeColor: 'bg-cyan-50 text-cyan-700',
    },
    {
      id: 'highRisk',
      label: 'High-Risk Reports',
      value: metrics.highRiskReports,
      icon: AlertTriangle,
      iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
      badge: 'Critical & High',
      badgeColor: 'bg-rose-50 text-rose-700 font-bold',
    },
    {
      id: 'verified',
      label: 'Verified Evidence',
      value: metrics.verifiedEvidence,
      icon: Link2,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      badge: '98.3% Integrity',
      badgeColor: 'bg-emerald-50 text-emerald-700',
    },
    {
      id: 'active',
      label: 'Active Investigations',
      value: metrics.activeInvestigations,
      icon: ShieldAlert,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
      badge: 'In Progress',
      badgeColor: 'bg-amber-50 text-amber-800',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {card.label}
              </span>
              <div className={`flex h-9 w-9 items-center justify-center rounded-2xl border ${card.iconBg} shadow-2xs group-hover:scale-110 transition-transform`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                {card.value}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${card.badgeColor}`}>
                {card.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
