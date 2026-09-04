'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileText, 
  Check, 
  Loader2, 
  ShieldCheck, 
  Download, 
  Package, 
  Eye, 
  Share2, 
  Sparkles,
  Lock,
  ChevronDown
} from 'lucide-react';
import { ReportFormat, ReportGenerationPayload } from '@/app/types/report';

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessViewReport: (reportId: string) => void;
}

export const GenerateReportModal: React.FC<GenerateReportModalProps> = ({
  isOpen,
  onClose,
  onSuccessViewReport,
}) => {
  const [modalStage, setModalStage] = useState<'form' | 'progress' | 'success'>('form');
  const [selectedCase, setSelectedCase] = useState('INV-2026-00482');
  const [format, setFormat] = useState<ReportFormat>('Both');
  const [includeSha256, setIncludeSha256] = useState(true);
  const [includeChainOfCustody, setIncludeChainOfCustody] = useState(true);

  // 13 selectable sections
  const [sections, setSections] = useState({
    executiveSummary: true,
    emailMetadata: true,
    headerForensics: true,
    authChecks: true,
    urlIntelligence: true,
    domainIntelligence: true,
    ipIntelligence: true,
    geolocation: true,
    threatGraph: true,
    campaignCorrelation: true,
    timeline: true,
    evidenceIntegrity: true,
    analystNotes: true,
  });

  // Progress simulation steps state
  const [progressIndex, setProgressIndex] = useState(0);

  const progressSteps = [
    'Investigation loaded',
    'Email metadata compiled',
    'Authentication results added',
    'Header analysis added',
    'IP & domain intelligence added',
    'Geolocation added',
    'Threat graph added',
    'Evidence verification (SHA-256 hash)',
    'Report formatting',
    'PDF & JSON generation',
  ];

  useEffect(() => {
    if (modalStage === 'progress') {
      const interval = setInterval(() => {
        setProgressIndex((prev) => {
          if (prev >= progressSteps.length - 1) {
            clearInterval(interval);
            setTimeout(() => setModalStage('success'), 600);
            return prev;
          }
          return prev + 1;
        });
      }, 350);
      return () => clearInterval(interval);
    }
  }, [modalStage]);

  if (!isOpen) return null;

  const handleToggleSection = (key: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleAll = (enable: boolean) => {
    setSections({
      executiveSummary: enable,
      emailMetadata: enable,
      headerForensics: enable,
      authChecks: enable,
      urlIntelligence: enable,
      domainIntelligence: enable,
      ipIntelligence: enable,
      geolocation: enable,
      threatGraph: enable,
      campaignCorrelation: enable,
      timeline: enable,
      evidenceIntegrity: enable,
      analystNotes: enable,
    });
  };

  const handleStartGeneration = () => {
    setProgressIndex(0);
    setModalStage('progress');
  };

  const handleResetModal = () => {
    setModalStage('form');
    setProgressIndex(0);
    onClose();
  };

  const sectionLabels: { key: keyof typeof sections; label: string }[] = [
    { key: 'executiveSummary', label: 'Executive Summary' },
    { key: 'emailMetadata', label: 'Email Metadata' },
    { key: 'headerForensics', label: 'Header Forensics' },
    { key: 'authChecks', label: 'SPF / DKIM / DMARC' },
    { key: 'urlIntelligence', label: 'URL Intelligence' },
    { key: 'domainIntelligence', label: 'Domain Intelligence' },
    { key: 'ipIntelligence', label: 'IP Intelligence' },
    { key: 'geolocation', label: 'Geolocation' },
    { key: 'threatGraph', label: 'Threat Graph' },
    { key: 'campaignCorrelation', label: 'Campaign Correlation' },
    { key: 'timeline', label: 'Investigation Timeline' },
    { key: 'evidenceIntegrity', label: 'Evidence Integrity' },
    { key: 'analystNotes', label: 'Analyst Notes' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Close Icon */}
        <button
          onClick={handleResetModal}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* STAGE 1: FORM SELECTION */}
        {modalStage === 'form' && (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="mb-5">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                <Sparkles className="h-4 w-4" />
                <span>Forensic Engine v2.4</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                Generate Forensic Report
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select the investigation and evidence you want to include in this document.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-5">
              {/* Select Investigation */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Select Investigation
                </label>
                <div className="relative">
                  <select
                    value={selectedCase}
                    onChange={(e) => setSelectedCase(e.target.value)}
                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/50 py-2.5 pl-4 pr-10 text-xs font-bold text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden cursor-pointer"
                  >
                    <option value="INV-2026-00482">
                      INV-2026-00482 — Vendor Invoice Phishing & Impersonation (Critical)
                    </option>
                    <option value="INV-2026-00418">
                      INV-2026-00418 — Executive Wire Transfer Fraud (High)
                    </option>
                    <option value="INV-2026-00395">
                      INV-2026-00395 — AsyncRAT Malware Delivery Campaign (Critical)
                    </option>
                    <option value="INV-2026-00360">
                      INV-2026-00360 — M365 Credential Harvesting Portal (Medium)
                    </option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
                </div>
              </div>

              {/* Select Sections */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700">
                    Report Sections
                  </label>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-blue-600">
                    <button
                      type="button"
                      onClick={() => handleToggleAll(true)}
                      className="hover:underline cursor-pointer"
                    >
                      Select All
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => handleToggleAll(false)}
                      className="hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-2xl border border-slate-200/80 bg-slate-50/40 p-3">
                  {sectionLabels.map((sec) => (
                    <label
                      key={sec.key}
                      className="flex items-center gap-2.5 rounded-xl bg-white p-2.5 border border-slate-200/60 shadow-2xs hover:border-blue-300 transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={sections[sec.key]}
                        onChange={() => handleToggleSection(sec.key)}
                        className="h-4 w-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-slate-800">
                        {sec.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Format & Evidence Handling Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Format */}
                <div className="rounded-2xl border border-slate-200/80 p-3.5 bg-white">
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Report Format
                  </label>
                  <div className="flex items-center gap-3">
                    {(['PDF', 'JSON', 'Both'] as ReportFormat[]).map((fmt) => (
                      <label key={fmt} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="reportFormat"
                          value={fmt}
                          checked={format === fmt}
                          onChange={() => setFormat(fmt)}
                          className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-xs font-semibold text-slate-700">{fmt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Evidence Handling */}
                <div className="rounded-2xl border border-slate-200/80 p-3.5 bg-white space-y-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Evidence Handling
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeSha256}
                      onChange={(e) => setIncludeSha256(e.target.checked)}
                      className="h-3.5 w-3.5 rounded-md text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-[11px] font-semibold text-slate-700">
                      Include SHA-256 evidence hash
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeChainOfCustody}
                      onChange={(e) => setIncludeChainOfCustody(e.target.checked)}
                      className="h-3.5 w-3.5 rounded-md text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-[11px] font-semibold text-slate-700">
                      Include chain-of-custody information
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={handleResetModal}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStartGeneration}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-cyan-700 cursor-pointer"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: PROGRESS COMPILATION ANIMATION */}
        {modalStage === 'progress' && (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-6">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 border border-blue-100 shadow-inner">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Generating Forensic Report
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Compiling investigation evidence and intelligence for {selectedCase}.
              </p>
            </div>

            {/* Progress list */}
            <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 text-left font-mono text-xs space-y-2">
              {progressSteps.map((step, idx) => {
                if (idx < progressIndex) {
                  return (
                    <div key={step} className="flex items-center gap-2 text-emerald-600 font-semibold">
                      <Check className="h-3.5 w-3.5 shrink-0" />
                      <span>{step}</span>
                    </div>
                  );
                } else if (idx === progressIndex) {
                  return (
                    <div key={step} className="flex items-center gap-2 text-blue-600 font-bold animate-pulse">
                      <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                      <span>{step}...</span>
                    </div>
                  );
                } else {
                  return (
                    <div key={step} className="flex items-center gap-2 text-slate-300 font-normal">
                      <span className="h-2 w-2 rounded-full bg-slate-200 shrink-0" />
                      <span>{step}</span>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}

        {/* STAGE 3: SUCCESS STATE */}
        {modalStage === 'success' && (
          <div className="flex flex-col items-center text-center py-4 space-y-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
              <ShieldCheck className="h-8 w-8" />
            </div>

            <div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700 border border-emerald-200">
                ✅ Report Ready
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                REP-2026-00482
              </h2>
              <p className="text-xs text-slate-500 font-semibold">
                Vendor Invoice Phishing & Impersonation
              </p>
            </div>

            {/* Details Box */}
            <div className="grid grid-cols-3 gap-3 w-full rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-xs">
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400">Risk Score</div>
                <div className="text-sm font-extrabold text-rose-600 mt-0.5">🔴 91/100</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400">Evidence</div>
                <div className="text-sm font-extrabold text-emerald-700 mt-0.5">🟢 Verified</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400">Generated</div>
                <div className="text-xs font-bold text-slate-700 mt-0.5">04 Sep 2026, 10:42 AM</div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full pt-2">
              <button
                onClick={() => {
                  onSuccessViewReport('REP-2026-00482');
                  handleResetModal();
                }}
                className="flex items-center justify-center gap-1.5 rounded-2xl bg-blue-600 px-3 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>View Report</span>
              </button>

              <button
                onClick={() => {
                  window.print();
                }}
                className="flex items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Download className="h-3.5 w-3.5 text-slate-500" />
                <span>Download PDF</span>
              </button>

              <button
                onClick={() => {
                  alert('Exporting structured JSON payload for REP-2026-00482...');
                }}
                className="flex items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Package className="h-3.5 w-3.5 text-slate-500" />
                <span>Export JSON</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Report shareable link copied to clipboard!');
                }}
                className="flex items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Share2 className="h-3.5 w-3.5 text-slate-500" />
                <span>Share</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
