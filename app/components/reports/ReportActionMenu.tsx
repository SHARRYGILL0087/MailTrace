'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MoreHorizontal, 
  Eye, 
  FileText, 
  Package, 
  Link2, 
  Copy, 
  ShieldAlert, 
  Target, 
  Archive,
  Check
} from 'lucide-react';
import { ForensicReport } from '@/app/types/report';

interface ReportActionMenuProps {
  report: ForensicReport;
  onView: (report: ForensicReport) => void;
  onVerify: (report: ForensicReport) => void;
  onExportJson: (report: ForensicReport) => void;
  onDownloadPdf: (report: ForensicReport) => void;
  onOpenInvestigation: (caseId: string) => void;
  onOpenCampaign: (campaignId: string) => void;
  onArchive: (reportId: string) => void;
}

export const ReportActionMenu: React.FC<ReportActionMenuProps> = ({
  report,
  onView,
  onVerify,
  onExportJson,
  onDownloadPdf,
  onOpenInvestigation,
  onOpenCampaign,
  onArchive,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleCopyLink = () => {
    const link = `${window.location.origin}/reports/${report.id}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1200);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
        aria-label="Actions menu"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-1 w-56 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl animate-in fade-in duration-150">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
            Report Actions
          </div>

          <button
            onClick={() => {
              onView(report);
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5 text-blue-600" />
            <span>👁️ View Report</span>
          </button>

          <button
            onClick={() => {
              onDownloadPdf(report);
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <FileText className="h-3.5 w-3.5 text-slate-500" />
            <span>📄 Download PDF</span>
          </button>

          <button
            onClick={() => {
              onExportJson(report);
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Package className="h-3.5 w-3.5 text-slate-500" />
            <span>📦 Export JSON</span>
          </button>

          <button
            onClick={() => {
              onVerify(report);
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <Link2 className="h-3.5 w-3.5 text-blue-600" />
            <span>⛓️ Verify Evidence</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-slate-500" />
            )}
            <span>{copied ? 'Copied Link!' : '🔗 Copy Report Link'}</span>
          </button>

          <div className="my-1 border-t border-slate-100" />

          <button
            onClick={() => {
              onOpenInvestigation(report.caseId);
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ShieldAlert className="h-3.5 w-3.5 text-slate-500" />
            <span>🕵️ Open Investigation</span>
          </button>

          {report.campaignCorrelation?.campaignId && (
            <button
              onClick={() => {
                onOpenCampaign(report.campaignCorrelation.campaignId);
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Target className="h-3.5 w-3.5 text-slate-500" />
              <span>🎯 Open Campaign</span>
            </button>
          )}

          <button
            onClick={() => {
              onArchive(report.id);
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <Archive className="h-3.5 w-3.5 text-rose-500" />
            <span>🗄️ Archive</span>
          </button>
        </div>
      )}
    </div>
  );
};
