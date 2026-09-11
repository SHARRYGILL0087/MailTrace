'use client';

import React, { useState } from 'react';
import { AlertTriangle, Trash2, RotateCcw } from 'lucide-react';
import { ConfirmActionModal } from './ConfirmActionModal';

interface Props {
  onClearDemoData: () => void;
  onResetAllSettings: () => void;
}

export const DangerZone: React.FC<Props> = ({ onClearDemoData, onResetAllSettings }) => {
  const [activeModal, setActiveModal] = useState<'clear' | 'reset' | null>(null);

  return (
    <div className="rounded-3xl border border-rose-200/80 bg-rose-50/20 p-6 md:p-8 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-rose-100">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-rose-950 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-600" />
            <span>Danger Zone</span>
          </h3>
          <p className="text-xs text-rose-900/70">
            Irreversible maintenance operations affecting mock caches and local preferences
          </p>
        </div>

        <span className="rounded-full bg-rose-100/70 border border-rose-200 px-3 py-0.5 text-[10px] font-mono font-bold text-rose-800 self-start sm:self-auto">
          Demo / Sandbox Environment
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Clear Demo Data */}
        <div className="rounded-2xl border border-rose-200/60 bg-white p-5 flex flex-col justify-between space-y-3 shadow-2xs">
          <div>
            <h4 className="text-xs font-bold text-slate-900">Clear Demo Data Cache</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Purges temporary browser state, cached indicators, and custom mock dossiers.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveModal('clear')}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50/80 px-4 py-2 text-xs font-bold text-rose-800 hover:bg-rose-100 hover:border-rose-300 transition-colors cursor-pointer self-start"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear Demo Data</span>
          </button>
        </div>

        {/* Reset Application Settings */}
        <div className="rounded-2xl border border-rose-200/60 bg-white p-5 flex flex-col justify-between space-y-3 shadow-2xs">
          <div>
            <h4 className="text-xs font-bold text-slate-900">Reset Application Settings</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Restores all detection thresholds, notification rules, and timezone settings to factory defaults.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveModal('reset')}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50/80 px-4 py-2 text-xs font-bold text-rose-800 hover:bg-rose-100 hover:border-rose-300 transition-colors cursor-pointer self-start"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Settings to Default</span>
          </button>
        </div>

      </div>

      {/* Confirmation Modals */}
      <ConfirmActionModal
        isOpen={activeModal === 'clear'}
        onClose={() => setActiveModal(null)}
        onConfirm={onClearDemoData}
        title="Clear Demo Data Cache"
        description="Are you sure you want to clear all cached demo intelligence records and local session states? This action is designed for testing and will reset your in-browser mock data."
        confirmLabel="Confirm Purge"
        isDestructive={true}
      />

      <ConfirmActionModal
        isOpen={activeModal === 'reset'}
        onClose={() => setActiveModal(null)}
        onConfirm={onResetAllSettings}
        title="Reset Application Settings"
        description="Are you sure you want to reset all preferences, AI detection thresholds, and notification rules back to the initial baseline? This action cannot be undone."
        confirmLabel="Reset All Settings"
        isDestructive={true}
      />
    </div>
  );
};
