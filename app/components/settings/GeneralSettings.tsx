'use client';

import React, { useState } from 'react';
import { Sliders, Save, RotateCcw, Check, Sparkles } from 'lucide-react';
import { GeneralSettings as IGeneralSettings } from '@/app/types/settings';

interface Props {
  settings: IGeneralSettings;
  onSave: (updated: IGeneralSettings) => void;
  onReset: () => void;
}

const TIMEZONES = [
  'Asia/Kolkata (IST, UTC+05:30)',
  'UTC (Coordinated Universal Time)',
  'America/New_York (EST/EDT, UTC-05:00)',
  'America/Los_Angeles (PST/PDT, UTC-08:00)',
  'Europe/London (GMT/BST, UTC+00:00)',
  'Europe/Berlin (CET/CEST, UTC+01:00)',
  'Asia/Singapore (SGT, UTC+08:00)',
  'Asia/Tokyo (JST, UTC+09:00)',
];

export const GeneralSettings: React.FC<Props> = ({ settings, onSave, onReset }) => {
  const [formData, setFormData] = useState<IGeneralSettings>({ ...settings });
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = <K extends keyof IGeneralSettings>(key: K, value: IGeneralSettings[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleResetClick = () => {
    onReset();
    setFormData({ ...settings });
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="h-4 w-4 text-emerald-600" />
            <span>General Settings</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure application identity, internationalization, and default analyst views
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600">
            Workspace: Global
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Application Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Application Name
          </label>
          <p className="text-[11px] text-slate-400">
            Name displayed in the top navbar brand identity and report headers.
          </p>
          <input
            type="text"
            value={formData.appName}
            onChange={(e) => handleChange('appName', e.target.value)}
            className="w-full sm:w-80 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-semibold text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Timezone */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Forensic Timezone
          </label>
          <p className="text-[11px] text-slate-400">
            Standard timezone for email header hop calculations, timeline tracing and report timestamps.
          </p>
          <select
            value={formData.timezone}
            onChange={(e) => handleChange('timezone', e.target.value)}
            className="w-full sm:w-80 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-semibold text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>

        {/* Date Format */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Date Format
          </label>
          <p className="text-[11px] text-slate-400">
            Preferred chronological notation across investigation feeds and log timelines.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {(['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'] as const).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => handleChange('dateFormat', fmt)}
                className={`rounded-xl border px-3.5 py-2 text-xs font-mono font-bold transition-all cursor-pointer ${
                  formData.dateFormat === fmt
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800 shadow-2xs'
                    : 'border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Theme (UI-ready) */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Theme Preference
          </label>
          <p className="text-[11px] text-slate-400">
            Threat Shield SOC light workspace theme. (Theme is UI-ready).
          </p>
          <div className="flex flex-wrap gap-2.5">
            {(['Light', 'Dark', 'System'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleChange('theme', t)}
                className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  formData.theme === t
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800 shadow-2xs'
                    : 'border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Default Investigation View */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Default Investigation Workspace View
          </label>
          <p className="text-[11px] text-slate-400">
            Select the landing tab opened when launching a new forensic case.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 max-w-2xl">
            {(['Overview', 'Forensics', 'Threat Intelligence', 'Threat Graph'] as const).map((view) => (
              <div
                key={view}
                onClick={() => handleChange('defaultView', view)}
                className={`rounded-2xl border p-3.5 transition-all cursor-pointer ${
                  formData.defaultView === view
                    ? 'border-emerald-400 bg-emerald-50/60 text-emerald-900 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{view}</span>
                  {formData.defaultView === view && (
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:from-emerald-700 hover:to-teal-700 transition-all cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>

            <button
              type="button"
              onClick={handleResetClick}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
              <span>Reset</span>
            </button>
          </div>

          {isSaved && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 animate-in fade-in">
              <Check className="h-4 w-4" />
              <span>Settings saved successfully.</span>
            </span>
          )}
        </div>

      </form>

    </div>
  );
};
