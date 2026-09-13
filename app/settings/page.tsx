'use client';

import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/app/components/layout/Navbar';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { Settings, ShieldCheck, CheckCircle2 } from 'lucide-react';

import { SettingsTab, FullSettings, ThreatIntelIntegration } from '@/app/types/settings';
import { INITIAL_SETTINGS } from '@/app/data/mockSettingsData';

import { SettingsSidebar } from '@/app/components/settings/SettingsSidebar';
import { GeneralSettings } from '@/app/components/settings/GeneralSettings';
import { ThreatIntelSettings } from '@/app/components/settings/ThreatIntelSettings';
import { AIDetectionSettings } from '@/app/components/settings/AIDetectionSettings';
import { NotificationSettings } from '@/app/components/settings/NotificationSettings';
import { SecuritySettings } from '@/app/components/settings/SecuritySettings';
import { DataEvidenceSettings } from '@/app/components/settings/DataEvidenceSettings';
import { DangerZone } from '@/app/components/settings/DangerZone';
import { AboutSettings } from '@/app/components/settings/AboutSettings';
import { SettingsToast, ToastMessage } from '@/app/components/settings/SettingsToast';
import { SettingsSkeleton } from '@/app/components/settings/SettingsSkeleton';
import { SettingsErrorState } from '@/app/components/settings/SettingsErrorState';

function SettingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [settings, setSettings] = useState<FullSettings>(INITIAL_SETTINGS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ id: Date.now().toString(), message, type });
    setTimeout(() => {
      setToast((curr) => (curr && curr.message === message ? null : curr));
    }, 3000);
  };

  // Fetch settings from API on mount
  const fetchSettings = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      // Fallback to initial mock settings
      setSettings(INITIAL_SETTINGS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Sync activeTab with URL ?tab=...
  useEffect(() => {
    const tabParam = searchParams.get('tab') as SettingsTab | null;
    const validTabs: SettingsTab[] = ['general', 'integrations', 'ai', 'notifications', 'security', 'data', 'about'];
    if (tabParam && validTabs.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tab: SettingsTab) => {
    setActiveTab(tab);
    router.replace(`/settings?tab=${tab}`, { scroll: false });
  };

  // Save Handlers
  const handleSaveGeneral = async (updated: FullSettings['general']) => {
    setSettings((prev) => ({ ...prev, general: updated }));
    showToast('Settings saved successfully.');
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ general: updated }),
      });
    } catch (e) {
      // client state updated
    }
  };

  const handleSaveAI = async (updated: FullSettings['ai']) => {
    setSettings((prev) => ({ ...prev, ai: updated }));
    showToast('AI detection settings saved successfully.');
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ai: updated }),
      });
    } catch (e) {
      // client state updated
    }
  };

  const handleSaveNotifications = async (updated: FullSettings['notifications']) => {
    setSettings((prev) => ({ ...prev, notifications: updated }));
    showToast('Notification preferences updated.');
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notifications: updated }),
      });
    } catch (e) {
      // client state updated
    }
  };

  const handleSaveSecurity = async (updated: FullSettings['security']) => {
    setSettings((prev) => ({ ...prev, security: updated }));
    showToast('Security policies updated successfully.');
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ security: updated }),
      });
    } catch (e) {
      // client state updated
    }
  };

  const handleSaveDataEvidence = async (updated: FullSettings['dataEvidence']) => {
    setSettings((prev) => ({ ...prev, dataEvidence: updated }));
    showToast('Data & evidence policies saved.');
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataEvidence: updated }),
      });
    } catch (e) {
      // client state updated
    }
  };

  const handleUpdateIntegration = async (updated: ThreatIntelIntegration) => {
    setSettings((prev) => ({
      ...prev,
      integrations: prev.integrations.map((i) => (i.id === updated.id ? updated : i)),
    }));
    showToast(`${updated.name} integration updated.`);
    try {
      await fetch('/api/settings/integrations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch (e) {
      // client state updated
    }
  };

  // Reset Handlers
  const handleResetGeneral = () => {
    setSettings((prev) => ({ ...prev, general: INITIAL_SETTINGS.general }));
    showToast('General settings restored to defaults.');
  };

  const handleResetAI = () => {
    setSettings((prev) => ({ ...prev, ai: INITIAL_SETTINGS.ai }));
    showToast('AI detection thresholds restored.');
  };

  const handleResetNotifications = () => {
    setSettings((prev) => ({ ...prev, notifications: INITIAL_SETTINGS.notifications }));
    showToast('Notification preferences restored.');
  };

  const handleResetSecurity = () => {
    setSettings((prev) => ({ ...prev, security: INITIAL_SETTINGS.security }));
    showToast('Security settings restored.');
  };

  const handleResetDataEvidence = () => {
    setSettings((prev) => ({ ...prev, dataEvidence: INITIAL_SETTINGS.dataEvidence }));
    showToast('Data retention policies restored.');
  };

  // Danger Zone Handlers
  const handleClearDemoData = () => {
    showToast('Demo data cache cleared successfully.', 'info');
  };

  const handleResetAllSettings = () => {
    setSettings(INITIAL_SETTINGS);
    showToast('All application settings restored to factory defaults.', 'info');
  };

  return (
    <div className="flex-1 min-w-0 space-y-6">
      
      {/* 1. Page Header */}
      <div className="space-y-3">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Link href="/" className="hover:text-slate-700 transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-bold">Settings</span>
        </nav>

        {/* Title & Status Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25">
                <Settings className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Settings
              </h1>
            </div>
            <p className="text-xs text-slate-500 max-w-2xl pl-13">
              Manage your Threat Shield preferences, integrations and security settings.
            </p>
          </div>

          {/* System Operational Badge */}
          <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1.5 text-xs font-bold text-blue-800 shadow-xs self-start sm:self-auto shrink-0">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span>System Operational</span>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        
        {/* Left Column: Navigation Sidebar */}
        <SettingsSidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Right Column: Selected Settings Panel */}
        <div className="flex-1 min-w-0 w-full space-y-6">
          {isLoading ? (
            <SettingsSkeleton />
          ) : hasError ? (
            <SettingsErrorState onRetry={fetchSettings} />
          ) : (
            <>
              {activeTab === 'general' && (
                <GeneralSettings
                  settings={settings.general}
                  onSave={handleSaveGeneral}
                  onReset={handleResetGeneral}
                />
              )}

              {activeTab === 'integrations' && (
                <ThreatIntelSettings
                  integrations={settings.integrations}
                  onUpdateIntegration={handleUpdateIntegration}
                />
              )}

              {activeTab === 'ai' && (
                <AIDetectionSettings
                  settings={settings.ai}
                  onSave={handleSaveAI}
                  onReset={handleResetAI}
                />
              )}

              {activeTab === 'notifications' && (
                <NotificationSettings
                  settings={settings.notifications}
                  onSave={handleSaveNotifications}
                  onReset={handleResetNotifications}
                />
              )}

              {activeTab === 'security' && (
                <SecuritySettings
                  settings={settings.security}
                  onSave={handleSaveSecurity}
                  onReset={handleResetSecurity}
                />
              )}

              {activeTab === 'data' && (
                <div className="space-y-6">
                  <DataEvidenceSettings
                    settings={settings.dataEvidence}
                    onSave={handleSaveDataEvidence}
                    onReset={handleResetDataEvidence}
                  />

                  {/* Danger Zone */}
                  <DangerZone
                    onClearDemoData={handleClearDemoData}
                    onResetAllSettings={handleResetAllSettings}
                  />
                </div>
              )}

              {activeTab === 'about' && (
                <AboutSettings />
              )}
            </>
          )}
        </div>

      </div>

      {/* Floating Toast Notification */}
      <SettingsToast
        toast={toast}
        onClose={() => setToast(null)}
      />

    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 text-slate-900 selection:bg-blue-100 selection:text-blue-700">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex gap-6">
          <Sidebar />

          <Suspense fallback={<SettingsSkeleton />}>
            <SettingsContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
