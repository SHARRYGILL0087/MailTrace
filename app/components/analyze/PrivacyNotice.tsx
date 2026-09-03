'use client';

import React from 'react';
import { Lock, ArrowRight } from 'lucide-react';

export const PrivacyNotice: React.FC = () => {
  return (
    <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/70 via-indigo-50/30 to-white p-4 shadow-2xs">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100/90 text-blue-700 shrink-0 mt-0.5">
          <Lock className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold text-blue-900">
            Privacy & Evidence Protection
          </h4>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed">
            Email content and metadata are processed according to your configured retention and privacy policies. Sensitive information can be masked during analysis.
          </p>
          <a
            href="#privacy-policy"
            onClick={(e) => e.preventDefault()}
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
          >
            Learn about privacy
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
