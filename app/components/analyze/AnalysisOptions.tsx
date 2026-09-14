'use client';

import React, { useState } from 'react';
import { Settings, ChevronDown, ChevronUp, Check } from 'lucide-react';

export interface AnalysisOptionsState {
  threatDetection: boolean;
  headerForensics: boolean;
  urlIntelligence: boolean;
  ipDomainIntelligence: boolean;
  geolocation: boolean;
  campaignCorrelation: boolean;
}

interface AnalysisOptionsProps {
  options: AnalysisOptionsState;
  onOptionsChange: (newOptions: AnalysisOptionsState) => void;
}

export const AnalysisOptions: React.FC<AnalysisOptionsProps> = ({ options, onOptionsChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOption = (key: keyof AnalysisOptionsState) => {
    onOptionsChange({
      ...options,
      [key]: !options[key],
    });
  };

  const optionItems: { key: keyof AnalysisOptionsState; label: string; desc: string }[] = [
    { key: 'threatDetection', label: 'Threat Detection', desc: 'AI classification & phishing heuristics' },
    { key: 'headerForensics', label: 'Header Forensics', desc: 'Hop analysis, SPF, DKIM & DMARC validation' },
    { key: 'urlIntelligence', label: 'URL Intelligence', desc: 'Malicious domain & link sandboxing' },
    { key: 'ipDomainIntelligence', label: 'IP & Domain Intelligence', desc: 'Sender IP reputation & WHOIS telemetry' },
    { key: 'geolocation', label: 'Geolocation', desc: 'Observed C2 & relay server mapping' },
    { key: 'campaignCorrelation', label: 'Campaign Correlation', desc: 'Cluster matching with active threat actors' },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-blue-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Analysis Options
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500">
            {Object.values(options).filter(Boolean).length} / 6 Enabled
          </span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3 border-t border-slate-200/60">
          {optionItems.map((item) => {
            const isChecked = options[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggleOption(item.key)}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/60 bg-white hover:border-blue-200 cursor-pointer transition-colors"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-800">{item.label}</p>
                  <p className="text-[10px] text-slate-400">{item.desc}</p>
                </div>
                <div
                  className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                    isChecked ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white shadow-xs transform transition-transform ${
                      isChecked ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
