'use client';

import React, { useEffect, useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  FolderArchive, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { ThreatIntelligenceResponse } from '@/app/types/threatIntel';

interface Props {
  data: ThreatIntelligenceResponse;
  onOpenInvestigation?: () => void;
}

export const IntelResultSummary: React.FC<Props> = ({ data, onOpenInvestigation }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let start = 0;
    const end = data.risk_score;
    const duration = 800;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = (end - start) / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayScore(end);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [data.risk_score]);

  // SVG Gauge calculations
  const strokeDasharray = 283; // 2 * pi * 45
  const strokeDashoffset = strokeDasharray - (strokeDasharray * displayScore) / 100;

  // Determine colors based on risk level
  const getRiskStyles = () => {
    switch (data.risk_level) {
      case 'critical':
        return {
          stroke: 'stroke-rose-600',
          bgBadge: 'bg-rose-50 text-rose-800 border-rose-200',
          dot: 'bg-rose-600',
          label: 'CRITICAL RISK',
        };
      case 'high':
        return {
          stroke: 'stroke-rose-500',
          bgBadge: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-500',
          label: 'HIGH RISK',
        };
      case 'medium':
        return {
          stroke: 'stroke-amber-500',
          bgBadge: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          label: 'MEDIUM RISK',
        };
      case 'low':
      default:
        return {
          stroke: 'stroke-emerald-500',
          bgBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
          label: 'LOW RISK',
        };
    }
  };

  const riskStyles = getRiskStyles();

  const handleCopy = () => {
    navigator.clipboard.writeText(data.indicator);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs hover:shadow-md transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT: Score Gauge & Classification */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-6 pb-6 lg:pb-0 lg:border-r border-slate-100 pr-0 lg:pr-6">
          <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-slate-100"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                className={`${riskStyles.stroke} transition-all duration-1000 ease-out`}
                strokeWidth="8"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Score */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-mono text-3xl font-black text-slate-900 tracking-tight">
                {displayScore}
              </span>
              <span className="text-[11px] font-bold text-slate-400">Risk Score</span>
            </div>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div>
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black tracking-wide ${riskStyles.bgBadge}`}>
                <span className={`h-2 w-2 rounded-full ${riskStyles.dot} animate-ping`} />
                {riskStyles.label}
              </span>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Classification
              </p>
              <h3 className="text-sm font-extrabold text-slate-900 leading-snug mt-0.5">
                {data.classification}
              </h3>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2 pt-0.5">
              <span className="text-[11px] text-slate-500 font-medium">Indicator Type:</span>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-slate-700">
                {data.type}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Indicator Dossier & Assessment */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Indicator Header with Copy */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase text-slate-400 shrink-0">Indicator:</span>
              <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-1 border border-slate-200/80 min-w-0">
                <span className="font-mono text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                  {data.indicator}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-slate-400 hover:text-slate-700 transition-colors shrink-0"
                  title="Copy indicator"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Related Cases Pill */}
            <div className="flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700 shrink-0">
              <FolderArchive className="h-3.5 w-3.5" />
              <span>{data.related_cases.length} Related Case{data.related_cases.length === 1 ? '' : 's'}</span>
            </div>
          </div>

          {/* AI Assessment Quote */}
          <blockquote className="rounded-2xl border border-slate-100 bg-slate-50/90 p-4 text-xs font-medium leading-relaxed text-slate-700 italic relative">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold not-italic text-[11px] mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Intelligence Assessment</span>
            </div>
            "{data.ai_summary}"
          </blockquote>

          {/* Telemetry Timestamps Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-2.5 space-y-0.5">
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <Calendar className="h-3 w-3" />
                <span>First Seen</span>
              </div>
              <p className="font-sans font-bold text-slate-800 text-[11px]">{data.first_seen}</p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-2.5 space-y-0.5">
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <Clock className="h-3 w-3" />
                <span>Last Seen</span>
              </div>
              <p className="font-sans font-bold text-slate-800 text-[11px]">{data.last_seen}</p>
            </div>

            <div className="col-span-2 sm:col-span-1 rounded-xl border border-slate-100 bg-slate-50/60 p-2.5 space-y-0.5">
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <FolderArchive className="h-3 w-3" />
                <span>Investigation Status</span>
              </div>
              <p className="font-sans font-bold text-slate-800 text-[11px]">
                {data.related_cases.length > 0 ? `${data.related_cases[0].status}` : 'No Active Cases'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
