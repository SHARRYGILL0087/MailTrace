'use client';

import React, { useState } from 'react';
import { Database, Hash, FileCheck, Save, RotateCcw, Check, ShieldCheck, Info } from 'lucide-react';
import { DataEvidenceSettings as IDataEvidenceSettings } from '@/app/types/settings';

interface Props {
  settings: IDataEvidenceSettings;
  onSave: (updated: IDataEvidenceSettings) => void;
  onReset: () => void;
}

export const DataEvidenceSettings: React.FC<Props> = ({ settings, onSave, onReset }) => {
  const [formData, setFormData] = useState<IDataEvidenceSettings>({ ...settings });
  const [isSaved, setIsSaved] = useState(false);

  const toggleField = (key: keyof IDataEvidenceSettings) => {
    setFormData((prev) => ({ ...prev, [key]: !prev[key] }));
    setIsSaved(false);
  };

  const handleRetention = (val: IDataEvidenceSettings['retentionPeriod']) => {
    setFormData((prev) => ({ ...prev, retentionPeriod: val }));
    setIsSaved(false);
  };

  const handleAlgorithm = (val: IDataEvidenceSettings['hashAlgorithm']) => {
    setFormData((prev) => ({ ...prev, hashAlgorithm: val }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Database className="h-4 w-4 text-blue-600" />
            <span>Data & Evidence Preservation</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure forensic evidence retention lifecycles, cryptographic hashing and audit integrity
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600">
          Standard: NIST SP 800-86
        </span>
      </div>

      {/* Information Card */}
      <div className="flex items-start gap-3 rounded-2xl border border-blue-200/80 bg-blue-50/70 p-4 text-xs shadow-2xs">
        <Hash className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h4 className="font-bold text-blue-950">Cryptographic Integrity Notice</h4>
          <p className="text-[11px] text-blue-900/80 leading-relaxed font-medium">
            Evidence hashes help verify that investigation artifacts have not been modified. All email attachments, headers, and triage snapshots receive a tamper-evident timestamped digest.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Evidence Retention Period */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-800">
            Evidence Retention Policy
          </label>
          <p className="text-[11px] text-slate-400">
            Automatic archival and purge horizon for forensic artifacts and case telemetry.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {[
              { id: '30d', label: '30 days' },
              { id: '90d', label: '90 days' },
              { id: '180d', label: '180 days' },
              { id: '1y', label: '1 year' },
              { id: 'custom', label: 'Custom' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleRetention(opt.id as any)}
                className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  formData.retentionPeriod === opt.id
                    ? 'border-blue-400 bg-blue-50 text-blue-700 shadow-2xs'
                    : 'border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Forensic Toggles */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Cryptographic & Audit Controls
          </h3>

          <div className="space-y-2.5">
            
            {/* Automatic Evidence Hashing */}
            <div
              onClick={() => toggleField('autoHashing')}
              className="flex items-center justify-between p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-slate-900">Automatic Evidence Hashing</p>
                <p className="text-[11px] text-slate-400">Calculate cryptographic checksum immediately upon email ingestion</p>
              </div>
              <div className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                formData.autoHashing ? 'bg-blue-600' : 'bg-slate-300'
              }`}>
                <div className={`h-4 w-4 rounded-full bg-white shadow-xs transform transition-transform ${
                  formData.autoHashing ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </div>
            </div>

            {/* Chain of Custody Tracking */}
            <div
              onClick={() => toggleField('chainOfCustody')}
              className="flex items-center justify-between p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-slate-900">Chain of Custody Tracking</p>
                <p className="text-[11px] text-slate-400">Log immutable audit entries for every analyst inspection and note creation</p>
              </div>
              <div className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                formData.chainOfCustody ? 'bg-blue-600' : 'bg-slate-300'
              }`}>
                <div className={`h-4 w-4 rounded-full bg-white shadow-xs transform transition-transform ${
                  formData.chainOfCustody ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </div>
            </div>

            {/* Report Integrity Verification */}
            <div
              onClick={() => toggleField('reportIntegrityVerification')}
              className="flex items-center justify-between p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-slate-900">Report Integrity Verification</p>
                <p className="text-[11px] text-slate-400">Embed digital signatures and verification QR codes inside exported reports</p>
              </div>
              <div className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                formData.reportIntegrityVerification ? 'bg-blue-600' : 'bg-slate-300'
              }`}>
                <div className={`h-4 w-4 rounded-full bg-white shadow-xs transform transition-transform ${
                  formData.reportIntegrityVerification ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </div>
            </div>

          </div>
        </div>

        {/* Hash Algorithm */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-800">
            Hash Algorithm
          </label>
          <p className="text-[11px] text-slate-400">
            Primary cryptographic hashing function used for forensic digests.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {(['SHA-256', 'SHA-512', 'SHA3-256'] as const).map((algo) => (
              <button
                key={algo}
                type="button"
                onClick={() => handleAlgorithm(algo)}
                className={`rounded-xl border px-4 py-2 font-mono text-xs font-bold transition-all cursor-pointer ${
                  formData.hashAlgorithm === algo
                    ? 'border-blue-300 bg-blue-50 text-blue-800 shadow-2xs'
                    : 'border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {algo}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
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
            <span className="flex items-center gap-1.5 text-xs font-bold text-blue-700 animate-in fade-in">
              <Check className="h-4 w-4" />
              <span>Settings saved successfully.</span>
            </span>
          )}
        </div>

      </form>

    </div>
  );
};
