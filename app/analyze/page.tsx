'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/app/components/layout/Navbar';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { AnalyzeHeader } from '@/app/components/analyze/AnalyzeHeader';
import { InputMethodTabs } from '@/app/components/analyze/InputMethodTabs';
import { EmailDropzone } from '@/app/components/analyze/EmailDropzone';
import { HeaderTextarea } from '@/app/components/analyze/HeaderTextarea';
import { UploadedFileCard } from '@/app/components/analyze/UploadedFileCard';
import { DemoEmailButton } from '@/app/components/analyze/DemoEmailButton';
import { AnalysisOptions, AnalysisOptionsState } from '@/app/components/analyze/AnalysisOptions';
import { PrivacyNotice } from '@/app/components/analyze/PrivacyNotice';
import { AnalysisCapabilities } from '@/app/components/analyze/AnalysisCapabilities';
import { AnalysisProgress } from '@/app/components/analyze/AnalysisProgress';
import { AnalysisSuccess } from '@/app/components/analyze/AnalysisSuccess';
import { RecentAnalyses } from '@/app/components/analyze/RecentAnalyses';
import { ErrorAlert } from '@/app/components/analyze/ErrorAlert';
import { Search, Sparkles } from 'lucide-react';

export default function AnalyzeEmailPage() {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [demoLoaded, setDemoLoaded] = useState(false);
  const [rawHeaders, setRawHeaders] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [analysisState, setAnalysisState] = useState<'idle' | 'analyzing' | 'success'>('idle');
  const [autoBrowse, setAutoBrowse] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('browse') === 'true' || params.get('action') === 'browse') {
        setActiveTab('upload');
        setAnalysisState('idle');
        setSelectedFile(null);
        setDemoLoaded(false);
        setAutoBrowse(true);
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, []);

  const [options, setOptions] = useState<AnalysisOptionsState>({
    threatDetection: true,
    headerForensics: true,
    urlIntelligence: true,
    ipDomainIntelligence: true,
    geolocation: true,
    campaignCorrelation: true,
  });

  const handleFileSelect = (file: File) => {
    setErrorMsg(null);
    setSelectedFile(file);
    setDemoLoaded(false);
  };

  const handleLoadDemo = () => {
    setErrorMsg(null);
    setSelectedFile(null);
    setDemoLoaded(true);
    if (activeTab === 'paste') {
      setRawHeaders(`From: billing@secure-update-portal.eu
To: executive@enterprise-holdings.co
Subject: Urgent Payment Authorization #INV-2026
Date: Wed, 02 Sep 2026 20:14:12 +0000
Received: from mail.secure-update-portal.eu (185.220.101.5) by mx.enterprise-holdings.co (8.14.4/8.14.4)
Reply-To: security@sso-domain-verify.net
Return-Path: <bounce@secure-update-portal.eu>
Message-ID: <20260902201412.9941@secure-update-portal.eu>
Authentication-Results: mx.enterprise-holdings.co; spf=fail (sender IP 185.220.101.5); dkim=fail header.d=secure-update-portal.eu; dmarc=fail (p=reject dis=none)`);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setDemoLoaded(false);
  };

  const handleStartAnalysis = () => {
    setErrorMsg(null);

    if (activeTab === 'upload') {
      if (!selectedFile && !demoLoaded) {
        setErrorMsg('Please upload a valid .EML file or click "Load Demo Email" to proceed.');
        return;
      }
    } else {
      if (!rawHeaders.trim()) {
        setErrorMsg('Please paste raw email headers before starting analysis.');
        return;
      }
    }

    setAnalysisState('analyzing');
  };

  const handleResetAnalysis = () => {
    setAnalysisState('idle');
    setSelectedFile(null);
    setDemoLoaded(false);
    setRawHeaders('');
    setErrorMsg(null);
  };

  const activeFileName = selectedFile
    ? selectedFile.name
    : demoLoaded
    ? 'suspicious_invoice.eml'
    : 'raw_email_headers.txt';

  const activeFileSize = selectedFile
    ? `${(selectedFile.size / 1024).toFixed(1)} KB`
    : '184 KB';

  const isInputReady =
    activeTab === 'upload'
      ? selectedFile !== null || demoLoaded
      : rawHeaders.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex gap-6">
          <Sidebar />

          <div className="flex-1 space-y-6 min-w-0">
            {/* Header / Breadcrumb */}
            <AnalyzeHeader />

            {/* Error Notification Alert */}
            {errorMsg && (
              <ErrorAlert message={errorMsg} onDismiss={() => setErrorMsg(null)} />
            )}

            {/* Analysis Workspace */}
            <div className="w-full space-y-6">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
                {analysisState === 'analyzing' ? (
                  <AnalysisProgress onComplete={() => setAnalysisState('success')} />
                ) : analysisState === 'success' ? (
                  <AnalysisSuccess fileName={activeFileName} onReset={handleResetAnalysis} />
                ) : (
                  /* IDLE STATE WORKSPACE */
                  <div className="space-y-6">
                    {/* Card Header & Tabs */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                          <span>📧</span> Email Analysis
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Upload an .EML file or provide raw email headers for forensic analysis.
                        </p>
                      </div>
                      <InputMethodTabs activeTab={activeTab} onTabChange={setActiveTab} />
                    </div>

                    {/* Input Zone */}
                    {activeTab === 'upload' ? (
                      selectedFile || demoLoaded ? (
                        <UploadedFileCard
                          fileName={activeFileName}
                          fileSize={activeFileSize}
                          fileFormat="EML"
                          onRemove={handleRemoveFile}
                          onReplace={handleRemoveFile}
                        />
                      ) : (
                        <EmailDropzone
                          onFileSelected={handleFileSelect}
                          onError={(err) => setErrorMsg(err)}
                          autoBrowse={autoBrowse}
                          onAutoBrowseHandled={() => setAutoBrowse(false)}
                        />
                      )
                    ) : (
                      <HeaderTextarea value={rawHeaders} onChange={setRawHeaders} />
                    )}

                    {/* Demo Email Trigger Option */}
                    {!isInputReady && (
                      <DemoEmailButton onLoadDemo={handleLoadDemo} />
                    )}

                    {/* Analysis Options Accordion */}
                    <AnalysisOptions options={options} onOptionsChange={setOptions} />

                    {/* Privacy Notice */}
                    <PrivacyNotice />

                    {/* Primary CTA Area */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <span className="text-[11px] font-semibold text-slate-400">
                        Analysis usually takes a few seconds.
                      </span>

                      <button
                        type="button"
                        onClick={handleStartAnalysis}
                        className={`flex items-center justify-center gap-2.5 rounded-2xl px-7 py-3 text-xs font-bold text-white shadow-md transition-all duration-200 ${
                          isInputReady
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.01] active:scale-[0.99]'
                            : 'bg-blue-600/80 hover:bg-blue-600'
                        }`}
                      >
                        <Search className="h-4 w-4 stroke-[2.5]" />
                        Analyze Email
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Recent Analyses Feed */}
            <RecentAnalyses />
          </div>
        </div>
      </main>
    </div>
  );
}
