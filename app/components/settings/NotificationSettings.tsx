'use client';

import React, { useState } from 'react';
import { Bell, Save, RotateCcw, Check, ShieldAlert, AlertTriangle, FileText, UserCheck, Mail, Monitor } from 'lucide-react';
import { NotificationSettings as INotificationSettings } from '@/app/types/settings';

interface Props {
  settings: INotificationSettings;
  onSave: (updated: INotificationSettings) => void;
  onReset: () => void;
}

export const NotificationSettings: React.FC<Props> = ({ settings, onSave, onReset }) => {
  const [formData, setFormData] = useState<INotificationSettings>({ ...settings });
  const [isSaved, setIsSaved] = useState(false);

  const toggleField = (key: keyof INotificationSettings) => {
    setFormData((prev) => ({ ...prev, [key]: !prev[key] }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const notificationOptions: {
    key: keyof INotificationSettings;
    label: string;
    desc: string;
    icon: React.FC<{ className?: string }>;
    category: 'threats' | 'channels';
  }[] = [
    {
      key: 'highRiskDetected',
      label: 'High-risk investigation detected',
      desc: 'Alert when an email scores between 70–89 risk score threshold.',
      icon: AlertTriangle,
      category: 'threats',
    },
    {
      key: 'criticalThreatDetected',
      label: 'Critical threat detected',
      desc: 'Instant priority alert for confirmed credential harvesters and malware payloads.',
      icon: ShieldAlert,
      category: 'threats',
    },
    {
      key: 'apiFailure',
      label: 'Threat intelligence API failure',
      desc: 'Notify when third-party lookup providers exceed timeouts or return 5xx errors.',
      icon: AlertTriangle,
      category: 'threats',
    },
    {
      key: 'reportCompleted',
      label: 'Report generation completed',
      desc: 'Send an alert when automated executive or technical PDF reports finish building.',
      icon: FileText,
      category: 'threats',
    },
    {
      key: 'caseAssigned',
      label: 'Case assignment / update',
      desc: 'Notify when an active triage dossier is assigned to your analyst queue.',
      icon: UserCheck,
      category: 'threats',
    },
    {
      key: 'emailNotifications',
      label: 'Email notifications',
      desc: 'Dispatch SMTP summary digests to the primary security operations mailbox.',
      icon: Mail,
      category: 'channels',
    },
    {
      key: 'browserNotifications',
      label: 'Browser push notifications',
      desc: 'Deliver native desktop push notifications for urgent security incidents.',
      icon: Monitor,
      category: 'channels',
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Bell className="h-4 w-4 text-emerald-600" />
            <span>Notifications</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure real-time alerting triggers, report webhooks, and communication channels
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600">
          Delivery: Real-time Dispatch
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Incident Trigger Rules */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Trigger Conditions
          </h3>

          <div className="space-y-2.5">
            {notificationOptions.filter((o) => o.category === 'threats').map((item) => {
              const Icon = item.icon;
              const isChecked = formData[item.key];

              return (
                <div
                  key={item.key}
                  onClick={() => toggleField(item.key)}
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-slate-200/80 text-slate-700 shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{item.label}</p>
                      <p className="text-[11px] text-slate-400">{item.desc}</p>
                    </div>
                  </div>

                  <div className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                    isChecked ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}>
                    <div className={`h-4 w-4 rounded-full bg-white shadow-xs transform transition-transform ${
                      isChecked ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Channels */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Notification Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {notificationOptions.filter((o) => o.category === 'channels').map((item) => {
              const Icon = item.icon;
              const isChecked = formData[item.key];

              return (
                <div
                  key={item.key}
                  onClick={() => toggleField(item.key)}
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-slate-200/80 text-slate-700 shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{item.label}</p>
                      <p className="text-[11px] text-slate-400">{item.desc}</p>
                    </div>
                  </div>

                  <div className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                    isChecked ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}>
                    <div className={`h-4 w-4 rounded-full bg-white shadow-xs transform transition-transform ${
                      isChecked ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </div>
                </div>
              );
            })}
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
              onClick={onReset}
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
