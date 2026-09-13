'use client';

import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, X, Sparkles, Shield, Globe, Link2, Hash, Mail, ArrowRight } from 'lucide-react';
import { IndicatorType } from '@/app/types/threatIntel';
import { inferIndicatorType } from '@/app/data/mockThreatIntelData';

interface Props {
  onSearch: (indicator: string, type?: IndicatorType) => void;
  isLoading: boolean;
  initialQuery?: string;
  initialType?: IndicatorType;
}

const INDICATOR_TYPE_OPTIONS: { type: IndicatorType | 'auto'; label: string; icon: React.FC<{ className?: string }> }[] = [
  { type: 'auto', label: 'Auto Detect', icon: Sparkles },
  { type: 'ip', label: 'IP Address', icon: Shield },
  { type: 'domain', label: 'Domain', icon: Globe },
  { type: 'url', label: 'URL', icon: Link2 },
  { type: 'hash', label: 'File Hash', icon: Hash },
  { type: 'email', label: 'Email Address', icon: Mail },
];

const EXAMPLE_CHIPS: { label: string; value: string; type: IndicatorType; note: string }[] = [
  { label: '8.8.8.8', value: '8.8.8.8', type: 'ip', note: 'Public DNS' },
  { label: '185.220.101.5', value: '185.220.101.5', type: 'ip', note: 'Tor Relay' },
  { label: 'example.com', value: 'example.com', type: 'domain', note: 'Clean Domain' },
  { label: 'evil-payload.ru', value: 'evil-payload.ru', type: 'domain', note: 'Fast-Flux' },
  { label: 'malicious-url.com', value: 'malicious-url.com', type: 'url', note: 'Phishing URL' },
  { label: 'e3b0c442...', value: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', type: 'hash', note: 'Emotet Hash' },
];

export const IntelSearchBar: React.FC<Props> = ({
  onSearch,
  isLoading,
  initialQuery = '',
  initialType = 'auto' as any,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState<IndicatorType | 'auto'>('auto');
  const [detectedType, setDetectedType] = useState<IndicatorType>('domain');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setDetectedType(inferIndicatorType(initialQuery));
    }
  }, [initialQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      setDetectedType(inferIndicatorType(val));
    }
  };

  const handleClear = () => {
    setQuery('');
    setSelectedType('auto');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    const typeToSend = selectedType === 'auto' ? detectedType : selectedType;
    onSearch(query.trim(), typeToSend);
  };

  const handleSelectChip = (chip: typeof EXAMPLE_CHIPS[0]) => {
    setQuery(chip.value);
    setSelectedType(chip.type);
    setDetectedType(chip.type);
    onSearch(chip.value, chip.type);
  };

  const currentOption = INDICATOR_TYPE_OPTIONS.find((opt) => opt.type === selectedType) || INDICATOR_TYPE_OPTIONS[0];
  const CurrentIcon = currentOption.icon;

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col md:flex-row items-stretch gap-2.5 rounded-2xl border border-slate-200 bg-slate-50/60 p-2 focus-within:border-blue-500 focus-within:bg-white transition-all duration-200 shadow-2xs">
          
          {/* Indicator Type Selector */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex w-full md:w-auto items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <CurrentIcon className="h-4 w-4 text-blue-600 shrink-0" />
                <span className="font-bold">{currentOption.label}</span>
                {selectedType === 'auto' && query.trim() && (
                  <span className="rounded bg-blue-100/70 px-1.5 py-0.2 text-[10px] font-extrabold uppercase text-blue-800">
                    {detectedType}
                  </span>
                )}
              </div>
              <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute left-0 top-full mt-2 z-30 w-52 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-lg">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Indicator Filter
                  </div>
                  {INDICATOR_TYPE_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = selectedType === opt.type;
                    return (
                      <button
                        key={opt.type}
                        type="button"
                        onClick={() => {
                          setSelectedType(opt.type);
                          setIsDropdownOpen(false);
                        }}
                        className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-semibold transition-colors ${
                          isSelected
                            ? 'bg-blue-50 text-blue-800 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 flex items-center min-w-0">
            <Search className="absolute left-3.5 h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search IP, domain, URL, hash or email..."
              className="w-full bg-transparent pl-10 pr-9 py-2.5 font-mono text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 p-1 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
                title="Clear input"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0 cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Querying...</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <span>Analyze Indicator</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            )}
          </button>
        </div>
      </form>

      {/* Quick Example Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Try Example:
        </span>
        {EXAMPLE_CHIPS.map((chip) => (
          <button
            key={chip.label}
            type="button"
            onClick={() => handleSelectChip(chip)}
            className="group flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-3 py-1 text-xs font-mono font-medium text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-800 transition-all cursor-pointer"
          >
            <span className="font-bold">{chip.label}</span>
            <span className="text-[10px] font-sans text-slate-400 group-hover:text-blue-600">
              ({chip.note})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
