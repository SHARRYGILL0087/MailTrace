'use client';

import React from 'react';
import { 
  Brain, 
  Info, 
  Globe, 
  ShieldAlert, 
  Link, 
  ArrowLeftRight, 
  Zap, 
  Server, 
  Layers 
} from 'lucide-react';
import { RiskFactor } from '@/app/types/investigation';

interface Props {
  riskFactors: RiskFactor[];
}

const iconMap: Record<string, React.ElementType> = {
  Globe,
  ShieldAlert,
  Link,
  ArrowLeftRight,
  Zap,
  Server,
  Layers,
};

export const RiskFactorCard: React.FC<Props> = ({ riskFactors }) => {
  const getRiskTier = (score: number) => {
    if (score >= 15) {
      return {
        level: 'High Risk',
        barGradient: 'bg-gradient-to-r from-amber-400 via-rose-500 to-rose-600',
        iconStyle: 'bg-rose-50 text-rose-600 border-rose-200',
        badgeStyle: 'bg-rose-100 text-rose-800 border-rose-200',
        scoreColor: 'text-rose-600',
      };
    } else if (score >= 8) {
      return {
        level: 'Medium Risk',
        barGradient: 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500',
        iconStyle: 'bg-amber-50 text-amber-600 border-amber-200',
        badgeStyle: 'bg-amber-100 text-amber-900 border-amber-200',
        scoreColor: 'text-amber-600',
      };
    } else {
      return {
        level: 'Low Risk',
        barGradient: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500',
        iconStyle: 'bg-emerald-50 text-emerald-600 border-emerald-200',
        badgeStyle: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        scoreColor: 'text-emerald-600',
      };
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>🧠</span> Why was this email flagged?
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Individual risk signals contributing to the overall threat assessment score.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600 self-start sm:self-auto">
          7 Contributing Signals
        </span>
      </div>

      {/* Horizontal Risk Bars */}
      <div className="space-y-4">
        {riskFactors.map((factor) => {
          const IconComponent = iconMap[factor.iconName] || Brain;
          const percentage = Math.round((factor.score / factor.maxScore) * 100);
          const tier = getRiskTier(factor.score);

          return (
            <div key={factor.id} className="group relative rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5 hover:bg-slate-50 hover:border-slate-200 transition-all">
              <div className="flex items-center justify-between gap-3 text-xs mb-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-xl shadow-xs border ${tier.iconStyle} group-hover:scale-105 transition-transform`}>
                    <IconComponent className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-bold text-slate-800 truncate">{factor.name}</span>
                  <span className={`hidden sm:inline-flex rounded-full px-2 py-0.5 text-[10px] font-extrabold border ${tier.badgeStyle}`}>
                    {tier.level}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono shrink-0">
                  <span className={`text-xs font-extrabold ${tier.scoreColor}`}>+{factor.score}</span>
                  <span className="text-[10px] font-semibold text-slate-400">({percentage}%)</span>
                </div>
              </div>

              {/* Progress Bar Container with Yellow Middle Part for Medium Risk */}
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-200/70">
                <div
                  className={`h-full rounded-full ${tier.barGradient} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Description Tooltip / Subtext */}
              <p className="mt-1.5 text-[11px] text-slate-500 leading-tight">
                {factor.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Disclaimer Message */}
      <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3 text-xs text-emerald-900">
        <Info className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="leading-normal font-medium">
          <strong>Signal Notice:</strong> Scores represent contributing signals, not standalone proof of malicious activity.
        </p>
      </div>
    </div>
  );
};
