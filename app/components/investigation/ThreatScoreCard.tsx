'use client';

import React, { useEffect, useState } from 'react';
import { ShieldAlert, AlertTriangle, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { InvestigationData } from '@/app/types/investigation';

interface Props {
  data: InvestigationData;
  onQuickActionClick?: (action: string) => void;
}

export const ThreatScoreCard: React.FC<Props> = ({ data, onQuickActionClick }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = data.riskScore;
    const duration = 1000;
    const stepTime = 15;
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
  }, [data.riskScore]);

  // Calculate SVG stroke offset for score circle
  const strokeDasharray = 283; // 2 * pi * 45
  const strokeDashoffset = strokeDasharray - (strokeDasharray * displayScore) / 100;

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT: Circular Score Gauge & Key Metrics */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-6 pb-6 lg:pb-0 lg:border-r border-slate-100 pr-0 lg:pr-6">
          <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
            {/* SVG Circle Gauge */}
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
                className="stroke-rose-500 transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Score Number */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-mono text-3xl font-extrabold text-slate-900 tracking-tight">
                {displayScore}
              </span>
              <span className="text-[11px] font-bold text-slate-400">/ 100</span>
            </div>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                {data.riskLevel}
              </span>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Classification</p>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight mt-0.5">
                {data.classification}
              </h3>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2 pt-0.5">
              <span className="text-xs text-slate-500">AI Confidence:</span>
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-mono text-xs font-bold text-emerald-800 border border-emerald-100">
                {data.confidence}%
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Threat Assessment & Recommended Actions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">Threat Assessment</h2>
          </div>

          <blockquote className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-xs font-medium leading-relaxed text-slate-700 italic">
            "{data.aiSummary}"
          </blockquote>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Recommended Action
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.recommendedQuickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => onQuickActionClick?.(action)}
                  className="flex items-center gap-1.5 rounded-full border border-rose-200/80 bg-rose-50/60 px-3 py-1.5 text-xs font-semibold text-rose-800 hover:bg-rose-100 hover:border-rose-300 transition-all duration-150 active:scale-95"
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                  <span>{action}</span>
                  <ArrowUpRight className="h-3 w-3 text-rose-500 opacity-70" />
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
