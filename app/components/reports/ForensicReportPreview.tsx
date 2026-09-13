'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ForensicReport, 
  AnalystFinding 
} from '@/app/types/report';
import { 
  FileText, 
  Download, 
  Package, 
  Printer, 
  Share2, 
  Link2, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Globe2, 
  Share2 as ShareIcon, 
  Target, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Edit3, 
  Lock, 
  Mail, 
  Server, 
  Info,
  Layers,
  ChevronRight
} from 'lucide-react';
import { RiskBadge, EvidenceStatusBadge } from '@/app/components/reports/ReportStatusBadge';
import { ThreatShieldLogo } from '@/app/components/ui/ThreatShieldLogo';

interface ForensicReportPreviewProps {
  report: ForensicReport;
  onVerifyClick: () => void;
}

export const ForensicReportPreview: React.FC<ForensicReportPreviewProps> = ({
  report,
  onVerifyClick,
}) => {
  const [activeTab, setActiveTab] = useState<'report' | 'evidence' | 'graph' | 'map' | 'notes'>('report');
  const [findings, setFindings] = useState<AnalystFinding[]>(report.analystFindings || []);
  const [newFindingTitle, setNewFindingTitle] = useState('');
  const [newFindingDesc, setNewFindingDesc] = useState('');
  const [showAddFinding, setShowAddFinding] = useState(false);

  // JSON Export Handler
  const handleExportJson = () => {
    const jsonStr = JSON.stringify(report, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.id}-Forensic-Report.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // PDF Download / Print Handler
  const handleDownloadPdf = () => {
    window.print();
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Report link copied to clipboard!');
  };

  const handleAddFinding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFindingTitle.trim()) return;
    const newFinding: AnalystFinding = {
      id: `find-${Date.now()}`,
      number: findings.length + 1,
      title: newFindingTitle,
      description: newFindingDesc || 'No additional details provided.',
      severity: 'medium',
      category: 'Analyst Assessment',
    };
    setFindings([...findings, newFinding]);
    setNewFindingTitle('');
    setNewFindingDesc('');
    setShowAddFinding(false);
  };

  const handleDeleteFinding = (id: string) => {
    setFindings(findings.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* 27. PREVIEW MODE TABS & 26. STICKY ACTION BAR */}
      <div className="sticky top-20 z-30 rounded-3xl border border-slate-200/90 bg-white/95 p-3 shadow-md backdrop-blur-md flex flex-col md:flex-row md:items-center md:justify-between gap-3 print:hidden">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'report', label: '📄 Report' },
            { id: 'evidence', label: '🔍 Evidence' },
            { id: 'graph', label: '🕸️ Graph' },
            { id: 'map', label: '🌍 Map' },
            { id: 'notes', label: '📝 Notes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:from-blue-700 hover:to-cyan-700 transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Package className="h-3.5 w-3.5 text-slate-500" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-slate-500" />
            <span>Print</span>
          </button>

          <button
            onClick={handleShareLink}
            className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5 text-slate-500" />
            <span>Share</span>
          </button>

          <button
            onClick={onVerifyClick}
            className="inline-flex items-center gap-1.5 rounded-2xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <Link2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>Verify Evidence</span>
          </button>
        </div>
      </div>

      {/* 28. MAIN PRINT-FRIENDLY FORENSIC REPORT DOCUMENT CARD */}
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-sm space-y-8 relative overflow-hidden print:shadow-none print:border-none print:p-0">
        
        {/* Confidential Watermark Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-slate-900 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2.5 text-slate-900 font-black tracking-tight text-xl">
              <ThreatShieldLogo size={28} />
              <span>Threat Shield — Forensic Email Intelligence</span>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-1">
              Confidential Digital Forensics & Threat Assessment Report
            </p>
          </div>

          <div className="flex flex-col sm:items-end">
            <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-extrabold text-white tracking-wide">
              {report.classification}
            </span>
            <span className="text-[11px] font-bold text-slate-400 mt-1">
              Report Version {report.version} • {report.generatedAt ? new Date(report.generatedAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
            </span>
          </div>
        </div>

        {/* 11. TOP METADATA & RISK SCORE BANNER */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Report ID</div>
            <div className="text-sm font-extrabold text-slate-900 mt-0.5">{report.id}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Case ID</div>
            <div className="text-sm font-extrabold text-blue-600 mt-0.5">{report.caseId}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Evidence Status</div>
            <div className="mt-1">
              <EvidenceStatusBadge status={report.evidenceStatus} />
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Threat Score</div>
            <div className="text-xl font-black text-rose-600 mt-0.5 flex items-center gap-1">
              <span>{report.riskScore}/100</span>
              <span className="text-xs">🔴</span>
            </div>
          </div>
        </div>

        {/* TAB 1: REPORT MAIN FORENSIC VIEW */}
        {(activeTab === 'report' || activeTab === 'notes') && (
          <>
            {/* 12. EXECUTIVE SUMMARY */}
            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span>Executive Summary</span>
              </h2>
              <blockquote className="rounded-2xl border-l-4 border-blue-600 bg-blue-50/40 p-4 text-xs sm:text-sm font-medium leading-relaxed text-slate-800">
                "{report.executiveSummary}"
              </blockquote>
            </section>

            {/* 13. EMAIL INFORMATION */}
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>Email Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Sender</span>
                  <div className="font-mono font-bold text-slate-800 break-all">{report.emailInfo.sender}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Recipient</span>
                  <div className="font-mono font-bold text-slate-800 break-all">{report.emailInfo.recipient}</div>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Subject</span>
                  <div className="font-bold text-slate-900 text-sm">{report.emailInfo.subject}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Date Received</span>
                  <div className="font-semibold text-slate-700">{report.emailInfo.date}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Message-ID</span>
                  <div className="font-mono text-[11px] text-slate-600 truncate">{report.emailInfo.messageId}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Reply-To</span>
                  <div className="font-mono font-bold text-rose-600 truncate">{report.emailInfo.replyTo}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Return-Path</span>
                  <div className="font-mono text-slate-600 truncate">{report.emailInfo.returnPath}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Attachments</span>
                  <div className="font-bold text-slate-800">{report.emailInfo.attachmentCount} attached</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">URLs Extracted</span>
                  <div className="font-bold text-slate-800">{report.emailInfo.urlCount} URLs found</div>
                </div>
              </div>
            </section>

            {/* 14. THREAT ASSESSMENT */}
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Target className="h-4 w-4 text-rose-600" />
                <span>Threat Assessment</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Metric Summary Card */}
                <div className="md:col-span-5 rounded-2xl border border-rose-200 bg-rose-50/30 p-4 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase text-rose-700 tracking-wider">
                      Classification & Confidence
                    </div>
                    <div className="text-lg font-black text-rose-900 mt-1">
                      {report.threatAssessment.classification}
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-xs font-semibold">
                    <div className="flex justify-between border-b border-rose-200/50 pb-1">
                      <span className="text-slate-600">Overall Confidence:</span>
                      <span className="font-bold text-slate-900">{report.threatAssessment.confidence}%</span>
                    </div>
                    <div className="flex justify-between border-b border-rose-200/50 pb-1">
                      <span className="text-slate-600">Potential BEC Score:</span>
                      <span className="font-bold text-slate-900">{report.threatAssessment.potentialBec}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Impersonation Confidence:</span>
                      <span className="font-bold text-slate-900">{report.threatAssessment.impersonation}%</span>
                    </div>
                  </div>
                </div>

                {/* Risk Factor Breakdown Bar Chart */}
                <div className="md:col-span-7 rounded-2xl border border-slate-200/80 bg-white p-4 space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Risk Factor Scoring Contributions
                  </div>
                  {report.threatAssessment.riskFactors.map((factor) => (
                    <div key={factor.id} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                        <span>{factor.name}</span>
                        <span className="font-bold text-rose-600">+{factor.scoreDelta} pts</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-rose-600 rounded-full"
                          style={{ width: `${Math.min(100, factor.scoreDelta * 4)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 15. AUTHENTICATION RESULTS */}
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Lock className="h-4 w-4 text-blue-600" />
                <span>Authentication & Alignment Checks</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* SPF */}
                <div className={`rounded-2xl border p-4 space-y-2 ${
                  report.authentication.spf.status === 'FAIL'
                    ? 'border-rose-200 bg-rose-50/40 text-rose-900'
                    : 'border-emerald-200 bg-emerald-50/40 text-emerald-900'
                }`}>
                  <div className="flex items-center justify-between font-bold text-xs">
                    <span>SPF Validation</span>
                    <span className="text-sm">
                      {report.authentication.spf.status === 'FAIL' ? '❌ FAIL' : '✅ PASS'}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium leading-relaxed">
                    {report.authentication.spf.explanation}
                  </p>
                </div>

                {/* DKIM */}
                <div className={`rounded-2xl border p-4 space-y-2 ${
                  report.authentication.dkim.status === 'FAIL'
                    ? 'border-rose-200 bg-rose-50/40 text-rose-900'
                    : 'border-emerald-200 bg-emerald-50/40 text-emerald-900'
                }`}>
                  <div className="flex items-center justify-between font-bold text-xs">
                    <span>DKIM Signature</span>
                    <span className="text-sm">
                      {report.authentication.dkim.status === 'FAIL' ? '❌ FAIL' : '✅ PASS'}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium leading-relaxed">
                    {report.authentication.dkim.explanation}
                  </p>
                </div>

                {/* DMARC */}
                <div className={`rounded-2xl border p-4 space-y-2 ${
                  report.authentication.dmarc.status === 'FAIL'
                    ? 'border-rose-200 bg-rose-50/40 text-rose-900'
                    : 'border-emerald-200 bg-emerald-50/40 text-emerald-900'
                }`}>
                  <div className="flex items-center justify-between font-bold text-xs">
                    <span>DMARC Policy</span>
                    <span className="text-sm">
                      {report.authentication.dmarc.status === 'FAIL' ? '❌ FAIL' : '✅ PASS'}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium leading-relaxed">
                    {report.authentication.dmarc.explanation}
                  </p>
                </div>
              </div>
            </section>

            {/* 16. HEADER FORENSICS ROUTE */}
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-blue-600" />
                  <span>Header Forensics Observed Route</span>
                </h2>
                <Link
                  href={`/investigations`}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>View Full Header Analysis</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Observed Route Diagram */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
                  {report.headerRoute.map((node, idx) => (
                    <React.Fragment key={node.id}>
                      <div className={`flex flex-col items-center rounded-xl p-3 border text-center transition-all ${
                        node.isSuspicious 
                          ? 'border-rose-200 bg-rose-50/90 text-rose-900 shadow-2xs' 
                          : 'border-slate-200 bg-white text-slate-800'
                      }`}>
                        <span className="text-lg mb-1">{node.flag}</span>
                        <span className="font-bold text-[11px]">{node.name}</span>
                        <span className="font-mono text-[10px] text-slate-500 mt-0.5">{node.ip}</span>
                        <span className="text-[9px] text-slate-400 mt-0.5">{node.location}</span>
                      </div>
                      {idx < report.headerRoute.length - 1 && (
                        <div className="text-slate-300 font-bold text-lg hidden sm:block">
                          ↓
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </section>

            {/* 17. URL & DOMAIN INTELLIGENCE */}
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Globe2 className="h-4 w-4 text-blue-600" />
                <span>URL & Domain Intelligence</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* URL Intelligence */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-3">
                  <div className="text-xs font-extrabold text-slate-900 flex items-center justify-between">
                    <span>🔗 URL Intelligence</span>
                    <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200">
                      {report.urlIntelligence.length} Flagged
                    </span>
                  </div>

                  {report.urlIntelligence.map((urlItem) => (
                    <div key={urlItem.id} className="rounded-xl bg-slate-50 p-3 text-xs space-y-1.5 border border-slate-100">
                      <div className="font-mono font-bold text-slate-800 break-all text-[11px]">
                        {urlItem.url}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                        <span>Reputation: <strong className="text-rose-600 uppercase">{urlItem.reputation}</strong></span>
                        <span>Redirects: {urlItem.redirects}</span>
                        <span>Category: {urlItem.targetCategory}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Domain Intelligence */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-3">
                  <div className="text-xs font-extrabold text-slate-900 flex items-center justify-between">
                    <span>🌐 Domain Intelligence</span>
                    <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200">
                      {report.domainIntelligence.reputation}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Domain</span>
                      <div className="font-mono font-bold text-slate-900">{report.domainIntelligence.domain}</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Domain Age</span>
                      <div className="font-bold text-rose-600">{report.domainIntelligence.ageDays} days old</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Registrar</span>
                      <div className="font-semibold text-slate-700">{report.domainIntelligence.registrar}</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Related Domains</span>
                      <div className="font-bold text-slate-800">{report.domainIntelligence.relatedDomainsCount} domains</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 18. IP & GEOLOCATION */}
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Server className="h-4 w-4 text-blue-600" />
                <span>Observed Infrastructure Location & Geolocation</span>
              </h2>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">IP Address</span>
                    <div className="font-mono font-bold text-slate-900">{report.geolocation.ip}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Observed City/Country</span>
                    <div className="font-bold text-slate-800">{report.geolocation.city}, {report.geolocation.country}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Hosting Provider / ISP</span>
                    <div className="font-semibold text-slate-700">{report.geolocation.provider}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Confidence</span>
                    <div className="font-extrabold text-emerald-700">{report.geolocation.confidence}%</div>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-3 text-xs text-amber-900 font-medium leading-relaxed">
                  <strong>Important Notice:</strong> {report.geolocation.disclaimer}
                </div>
              </div>
            </section>

            {/* 19. THREAT GRAPH PREVIEW */}
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <ShareIcon className="h-4 w-4 text-blue-600" />
                  <span>Threat Relationship Graph Preview</span>
                </h2>
                <Link
                  href="/threat-graph"
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>Open Interactive Graph →</span>
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white text-center space-y-3 font-mono text-xs">
                <div className="text-slate-400 font-semibold text-[11px]">
                  {report.threatGraphPreview.summary}
                </div>
                <div className="py-2 text-cyan-400 tracking-widest font-bold">
                  📧 Email ➔ 🌐 Domain (2) ➔ 🔗 URL & 🖥️ IP (4) ➔ 🌍 Geo ➔ 🎯 Campaign ({report.campaignCorrelation.campaignId})
                </div>
              </div>
            </section>

            {/* 20. CAMPAIGN CORRELATION */}
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Target className="h-4 w-4 text-amber-600" />
                <span>Campaign Intelligence & Correlation</span>
              </h2>

              <div className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-amber-900 text-sm">{report.campaignCorrelation.name}</span>
                    <span className="rounded-full bg-amber-200/80 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                      {report.campaignCorrelation.campaignId}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                    <span>Emails: <strong>{report.campaignCorrelation.relatedEmails}</strong></span>
                    <span>Domains: <strong>{report.campaignCorrelation.domains}</strong></span>
                    <span>IPs: <strong>{report.campaignCorrelation.ips}</strong></span>
                    <span>Countries: <strong>{report.campaignCorrelation.countries}</strong></span>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end shrink-0">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Correlation Confidence</div>
                  <div className="text-2xl font-black text-amber-800">{report.campaignCorrelation.confidence}%</div>
                  <Link
                    href={`/threat-intelligence`}
                    className="mt-1 rounded-xl bg-amber-700 px-3 py-1 text-[11px] font-bold text-white hover:bg-amber-800 transition-colors"
                  >
                    Investigate Campaign →
                  </Link>
                </div>
              </div>
            </section>

            {/* 21. INVESTIGATION TIMELINE */}
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>Investigation Timeline</span>
              </h2>

              <div className="relative pl-6 space-y-4 border-l-2 border-blue-200">
                {report.timeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white text-[9px] font-bold">
                      ✓
                    </span>
                    <div className="text-xs font-bold text-slate-800">
                      <span className="font-mono text-blue-600 mr-2">{item.time}</span>
                      <span>{item.event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 22. EVIDENCE INTEGRITY & 23. CHAIN OF CUSTODY */}
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Link2 className="h-4 w-4 text-emerald-600" />
                <span>Evidence Integrity & Chain of Custody</span>
              </h2>

              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/30 p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-emerald-200/60 pb-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase text-slate-400">Evidence SHA-256 Hash</div>
                    <div className="font-mono text-xs font-extrabold text-slate-900 break-all">
                      {report.evidenceIntegrity.sha256}
                    </div>
                  </div>
                  <button
                    onClick={onVerifyClick}
                    className="inline-flex items-center gap-1.5 rounded-2xl bg-emerald-700 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-800 transition-colors cursor-pointer shrink-0"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Verify Ledger Signature</span>
                  </button>
                </div>

                {/* Chain of custody timeline */}
                <div className="space-y-2">
                  <div className="text-[11px] font-extrabold text-emerald-900 uppercase">
                    Verified Chain of Custody Log
                  </div>
                  <div className="space-y-2 text-xs">
                    {report.chainOfCustody.map((coc) => (
                      <div key={coc.id} className="flex items-center justify-between rounded-xl bg-white p-2.5 border border-emerald-100 shadow-2xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          <div>
                            <span className="font-bold text-slate-800">{coc.action}</span>
                            <span className="text-[10px] text-slate-400 font-semibold ml-2">by {coc.actor} ({coc.role})</span>
                          </div>
                        </div>
                        <span className="font-mono text-[10px] text-slate-400 shrink-0">{coc.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 24. ANALYST FINDINGS */}
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span>Analyst Findings ({findings.length})</span>
                </h2>
                <button
                  onClick={() => setShowAddFinding(!showAddFinding)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Finding</span>
                </button>
              </div>

              {/* Add finding form */}
              {showAddFinding && (
                <form onSubmit={handleAddFinding} className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 space-y-3">
                  <div className="text-xs font-bold text-blue-900">Add Analyst Finding</div>
                  <input
                    type="text"
                    placeholder="Finding Title"
                    value={newFindingTitle}
                    onChange={(e) => setNewFindingTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs font-medium focus:outline-hidden focus:border-blue-500"
                    required
                  />
                  <textarea
                    placeholder="Finding Description & Details"
                    value={newFindingDesc}
                    onChange={(e) => setNewFindingDesc(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs font-medium focus:outline-hidden focus:border-blue-500"
                    rows={2}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddFinding(false)}
                      className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white"
                    >
                      Save Finding
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2">
                {findings.map((f, idx) => (
                  <div key={f.id} className="group rounded-2xl border border-slate-200 bg-white p-4 space-y-1 shadow-2xs hover:border-slate-300">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span className="flex items-center gap-2">
                        <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-extrabold text-blue-800">
                          Finding 0{idx + 1}
                        </span>
                        <span>{f.title}</span>
                      </span>
                      <button
                        onClick={() => handleDeleteFinding(f.id)}
                        className="text-slate-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete Finding"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 font-medium pl-1">
                      {f.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 25. FINAL ASSESSMENT */}
            <section className="space-y-3">
              <div className="rounded-3xl border-2 border-rose-500 bg-gradient-to-br from-rose-50 via-white to-amber-50 p-6 space-y-3 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-rose-200 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-600">Final Forensic Determination</span>
                    <h3 className="text-xl font-black text-rose-950 mt-0.5">
                      {report.finalAssessment.classificationTag}
                    </h3>
                  </div>
                  <div className="text-3xl font-black text-rose-600">
                    {report.finalAssessment.riskScore}/100 🔴
                  </div>
                </div>

                <div className="text-xs font-semibold text-slate-800 leading-relaxed bg-white/80 rounded-2xl p-4 border border-rose-100">
                  <span className="font-extrabold text-slate-900 block mb-1">Recommended Action Plan:</span>
                  "{report.finalAssessment.recommendedAction}"
                </div>
              </div>
            </section>
          </>
        )}

        {/* TAB 2: EVIDENCE DIRECTORY VIEW */}
        {activeTab === 'evidence' && (
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">Cryptographic Evidence Locker</h3>
            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 font-mono text-xs text-emerald-400 space-y-2">
              <div>RAW EML FILE CHECKSUM: {report.evidenceIntegrity.sha256}</div>
              <div>INGESTION STREAM SOURCE: {report.evidenceIntegrity.source}</div>
              <div>COLLECTED TIMESTAMP: {report.evidenceIntegrity.collectedAt}</div>
              <div>LEDGER RECORD NODE: {report.evidenceIntegrity.ledgerStatus}</div>
            </div>
          </div>
        )}

        {/* TAB 3: THREAT GRAPH PREVIEW */}
        {activeTab === 'graph' && (
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">Threat Infrastructure Graph</h3>
            <div className="h-64 rounded-2xl border border-slate-200 bg-slate-950 p-4 flex items-center justify-center text-cyan-400 font-mono text-xs">
              [ Interactive Threat Node Canvas Preview Mode Active ]
            </div>
          </div>
        )}

        {/* TAB 4: GEOLOCATION MAP */}
        {activeTab === 'map' && (
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">Observed Infrastructure Map</h3>
            <div className="h-64 rounded-2xl border border-slate-200 bg-slate-100 p-4 flex flex-col items-center justify-center text-slate-500 font-semibold text-xs space-y-2">
              <Globe2 className="h-8 w-8 text-blue-600" />
              <span>Frankfurt, Germany (IP 198.51.100.42) • Lat: 50.1109, Lon: 8.6821</span>
            </div>
          </div>
        )}

        {/* Footer Notice */}
        <div className="border-t border-slate-200 pt-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Threat Shield — Confidential Security Investigation • Report ID: {report.id}
        </div>
      </div>
    </div>
  );
};
