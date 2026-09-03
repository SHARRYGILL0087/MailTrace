'use client';

import React from 'react';
import { 
  RotateCcw, 
  FolderPlus, 
  Share2, 
  Globe2, 
  FileText, 
  ShieldCheck, 
  AlertTriangle,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface Props {
  onAnalyzeAgain?: () => void;
  onAddToCase?: () => void;
  onViewThreatGraph?: () => void;
  onViewGeolocation?: () => void;
  onGenerateReport?: () => void;
  onVerifyEvidence?: () => void;
  onEscalate?: () => void;
}

export const InvestigationActionPanel: React.FC<Props> = ({
  onAnalyzeAgain,
  onAddToCase,
  onViewThreatGraph,
  onViewGeolocation,
  onGenerateReport,
  onVerifyEvidence,
  onEscalate,
}) => {
  const actions = [
    {
      label: 'Analyze Again',
      icon: RotateCcw,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50/70 hover:bg-emerald-100/70',
      onClick: onAnalyzeAgain,
    },
    {
      label: 'Add to Case',
      icon: FolderPlus,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50/70 hover:bg-indigo-100/70',
      onClick: onAddToCase,
    },
    {
      label: 'View Threat Graph',
      icon: Share2,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50/70 hover:bg-purple-100/70',
      onClick: onViewThreatGraph,
    },
    {
      label: 'View Geolocation',
      icon: Globe2,
      iconColor: 'text-cyan-600',
      bgColor: 'bg-cyan-50/70 hover:bg-cyan-100/70',
      onClick: onViewGeolocation,
    },
    {
      label: 'Generate Report',
      icon: FileText,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50/70 hover:bg-emerald-100/70',
      onClick: onGenerateReport,
    },
    {
      label: 'Verify Evidence',
      icon: ShieldCheck,
      iconColor: 'text-teal-600',
      bgColor: 'bg-teal-50/70 hover:bg-teal-100/70',
      onClick: onVerifyEvidence,
    },
  ];

  return (
    <div className="sticky top-24 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
      <div className="pb-3 border-b border-slate-100">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <span>⚡</span> Investigation Actions
        </h2>
        <p className="text-[11px] text-slate-400 mt-0.5">Quick SOC incident response controls</p>
      </div>

      <div className="space-y-2">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.label}
              onClick={act.onClick}
              className={`group flex w-full items-center justify-between rounded-2xl p-3 text-xs font-bold text-slate-800 transition-all duration-200 hover:-translate-y-0.5 border border-slate-100 ${act.bgColor}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-2xs border border-slate-100 group-hover:scale-105 transition-transform">
                  <Icon className={`h-4 w-4 ${act.iconColor}`} />
                </div>
                <span>{act.label}</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          );
        })}
      </div>

      <div className="pt-2 border-t border-slate-100">
        <button
          onClick={onEscalate}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-700 hover:bg-rose-100 hover:border-rose-300 transition-all active:scale-95"
        >
          <AlertTriangle className="h-4 w-4 text-rose-600" />
          <span>Escalate Investigation</span>
        </button>
      </div>
    </div>
  );
};
