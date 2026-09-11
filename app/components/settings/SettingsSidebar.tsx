'use client';

import React from 'react';
import { 
  Sliders, 
  BrainCircuit, 
  Sparkles, 
  Bell, 
  ShieldCheck, 
  Database, 
  Info,
  ChevronRight
} from 'lucide-react';
import { SettingsTab } from '@/app/types/settings';

interface Props {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

const SETTINGS_TABS: { id: SettingsTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
  { id: 'general', label: 'General', icon: Sliders },
  { id: 'integrations', label: 'Threat Intelligence', icon: BrainCircuit, badge: '4 Feeds' },
  { id: 'ai', label: 'AI & Detection', icon: Sparkles },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: ShieldCheck },
  { id: 'data', label: 'Data & Evidence', icon: Database },
  { id: 'about', label: 'About', icon: Info, badge: 'v1.0' },
];

export const SettingsSidebar: React.FC<Props> = ({ activeTab, onTabChange }) => {
  return (
    <>
      {/* Mobile Horizontal Tab Navigation */}
      <div className="md:hidden w-full overflow-x-auto pb-2 mb-4 scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max p-1 rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
          {SETTINGS_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-bold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Vertical Navigation Menu */}
      <aside className="hidden md:flex w-64 flex-col rounded-3xl border border-slate-200/80 bg-white p-3.5 shadow-xs shrink-0 self-start">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Preferences
        </div>

        <nav className="space-y-1 mt-1">
          {SETTINGS_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`group flex w-full items-center justify-between rounded-2xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-bold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-0.5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 transition-colors duration-200 ${
                      isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-emerald-600'
                    }`}
                  />
                  <span>{tab.label}</span>
                </div>

                {tab.badge && (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isActive
                      ? 'bg-emerald-100/80 text-emerald-800'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Security Compliance Badge */}
        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-700">SOC Profile</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
          <p className="mt-0.5 text-[10px] text-slate-400">Admin Role: Tier-3 Forensics</p>
        </div>
      </aside>
    </>
  );
};
