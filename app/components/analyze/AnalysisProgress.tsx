'use client';

import React, { useState, useEffect } from 'react';
import { Check, Loader2, Sparkles } from 'lucide-react';

interface AnalysisProgressProps {
  onComplete: () => void;
}

const STEPS = [
  'Email parsed',
  'Headers extracted',
  'URLs identified',
  'Authentication checked',
  'Threat intelligence',
  'Geolocation',
  'Correlation',
  'AI risk assessment',
  'Forensic report',
];

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ onComplete }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev >= STEPS.length - 1) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400);
          return prev;
        }
        return prev + 1;
      });
    }, 450);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="rounded-3xl border border-blue-100 bg-gradient-to-b from-blue-50/50 via-white to-slate-50/50 p-8 shadow-xs text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/25 animate-pulse">
        <Sparkles className="h-7 w-7" />
      </div>

      <h2 className="mt-4 text-xl font-extrabold text-slate-900">
        Analyzing Email
      </h2>
      <p className="mt-1 text-xs text-slate-600 max-w-md mx-auto">
        Suraksha Shield is investigating the message and its associated infrastructure.
      </p>

      {/* Vertical Progress Timeline */}
      <div className="mt-8 max-w-xs mx-auto text-left space-y-3">
        {STEPS.map((stepLabel, idx) => {
          const isDone = idx < activeStepIndex;
          const isCurrent = idx === activeStepIndex;

          return (
            <div key={stepLabel} className="flex items-center gap-3 transition-all duration-300">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold shrink-0 transition-all ${
                  isDone
                    ? 'bg-emerald-500 text-white'
                    : isCurrent
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                    : 'bg-slate-100 text-slate-300 border border-slate-200'
                }`}
              >
                {isDone ? (
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                ) : isCurrent ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                )}
              </div>

              <span
                className={`text-xs transition-colors ${
                  isDone
                    ? 'font-semibold text-slate-700'
                    : isCurrent
                    ? 'font-bold text-blue-700'
                    : 'font-normal text-slate-400'
                }`}
              >
                {stepLabel}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-4 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
        Estimated time: <span className="text-slate-800">a few seconds</span>
      </div>
    </div>
  );
};
