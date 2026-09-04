'use client';

import React from 'react';
import { 
  Mail, 
  User, 
  Globe, 
  Monitor, 
  Link2, 
  Cloud, 
  MapPin, 
  Target, 
  Building2,
  AlertTriangle,
  ShieldCheck,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { ThreatNode, RiskLevel } from '@/app/types/graph';

interface GraphNodeCardProps {
  node: ThreatNode;
  isSelected: boolean;
  isHighlighted: boolean;
  isDimmed: boolean;
  onSelect: (node: ThreatNode) => void;
}

export const getRiskBadge = (risk?: RiskLevel) => {
  switch (risk) {
    case 'critical':
      return {
        label: 'Malicious',
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        dot: 'bg-rose-500',
        icon: Flame
      };
    case 'high':
      return {
        label: 'High Risk',
        bg: 'bg-orange-50 text-orange-700 border-orange-200',
        dot: 'bg-orange-500',
        icon: AlertTriangle
      };
    case 'medium':
      return {
        label: 'Suspicious',
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
        icon: AlertTriangle
      };
    case 'low':
      return {
        label: 'Low Risk',
        bg: 'bg-blue-50 text-blue-700 border-blue-200',
        dot: 'bg-blue-500',
        icon: ShieldCheck
      };
    case 'safe':
    default:
      return {
        label: 'Trusted',
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
        icon: CheckCircle2
      };
  }
};

export const getNodeIcon = (type: string) => {
  switch (type) {
    case 'email':
      return Mail;
    case 'sender':
      return User;
    case 'domain':
      return Globe;
    case 'ip':
      return Monitor;
    case 'url':
      return Link2;
    case 'hosting':
      return Cloud;
    case 'location':
      return MapPin;
    case 'campaign':
      return Target;
    case 'organization':
      return Building2;
    default:
      return Globe;
  }
};

export const getNodeTypeTheme = (type: string) => {
  switch (type) {
    case 'email':
      return { iconBg: 'bg-blue-100 text-blue-700', border: 'border-blue-200' };
    case 'sender':
      return { iconBg: 'bg-sky-100 text-sky-700', border: 'border-sky-200' };
    case 'domain':
      return { iconBg: 'bg-indigo-100 text-indigo-700', border: 'border-indigo-200' };
    case 'ip':
      return { iconBg: 'bg-purple-100 text-purple-700', border: 'border-purple-200' };
    case 'url':
      return { iconBg: 'bg-cyan-100 text-cyan-700', border: 'border-cyan-200' };
    case 'hosting':
      return { iconBg: 'bg-slate-100 text-slate-700', border: 'border-slate-200' };
    case 'location':
      return { iconBg: 'bg-teal-100 text-teal-700', border: 'border-teal-200' };
    case 'campaign':
      return { iconBg: 'bg-rose-100 text-rose-700', border: 'border-rose-200' };
    default:
      return { iconBg: 'bg-slate-100 text-slate-700', border: 'border-slate-200' };
  }
};

export const GraphNodeCard: React.FC<GraphNodeCardProps> = ({
  node,
  isSelected,
  isHighlighted,
  isDimmed,
  onSelect,
}) => {
  const Icon = getNodeIcon(node.type);
  const riskBadge = getRiskBadge(node.risk);
  const theme = getNodeTypeTheme(node.type);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node);
      }}
      className={`group relative cursor-pointer select-none rounded-2xl border bg-white p-3 shadow-sm transition-all duration-200 ${
        isSelected
          ? 'ring-2 ring-blue-500 border-blue-400 shadow-md scale-[1.03] z-30 bg-blue-50/20'
          : isHighlighted
          ? 'border-blue-400 shadow-md scale-105 z-20 ring-1 ring-blue-300'
          : isDimmed
          ? 'opacity-35 grayscale-[20%]'
          : 'border-slate-200/90 hover:border-blue-300 hover:shadow-md hover:scale-[1.02] z-10'
      }`}
      style={{
        width: 190,
      }}
    >
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl ${theme.iconBg}`}>
            <Icon className="h-3.5 w-3.5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
            {node.type}
          </span>
        </div>

        {node.risk && (
          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold ${riskBadge.bg}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${riskBadge.dot}`} />
            {riskBadge.label}
          </span>
        )}
      </div>

      <div className="font-semibold text-xs text-slate-900 truncate leading-tight group-hover:text-blue-600 transition-colors">
        {node.label}
      </div>

      {node.sublabel && (
        <div className="text-[10px] text-slate-500 truncate mt-0.5 font-normal">
          {node.sublabel}
        </div>
      )}

      {node.metadata?.flag && (
        <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-600">
          <span>{node.metadata.flag}</span>
          <span className="truncate">{node.metadata.country}</span>
        </div>
      )}
    </div>
  );
};
