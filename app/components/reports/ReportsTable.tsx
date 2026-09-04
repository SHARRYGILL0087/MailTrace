'use client';

import React from 'react';
import { ForensicReport } from '@/app/types/report';
import { ReportStatusBadge, RiskBadge, EvidenceStatusBadge } from '@/app/components/reports/ReportStatusBadge';
import { ReportActionMenu } from '@/app/components/reports/ReportActionMenu';
import { FileText, ArrowRight, ShieldCheck } from 'lucide-react';

interface ReportsTableProps {
  reports: ForensicReport[];
  onViewReport: (report: ForensicReport) => void;
  onVerifyEvidence: (report: ForensicReport) => void;
  onExportJson: (report: ForensicReport) => void;
  onDownloadPdf: (report: ForensicReport) => void;
  onOpenInvestigation: (caseId: string) => void;
  onOpenCampaign: (campaignId: string) => void;
  onArchiveReport: (reportId: string) => void;
}

export const ReportsTable: React.FC<ReportsTableProps> = ({
  reports,
  onViewReport,
  onVerifyEvidence,
  onExportJson,
  onDownloadPdf,
  onOpenInvestigation,
  onOpenCampaign,
  onArchiveReport,
}) => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white shadow-sm overflow-hidden mb-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-600" />
            <span>Recent Forensic Reports</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing {reports.length} generated threat intelligence reports.
          </p>
        </div>

        <button
          onClick={() => onViewReport(reports[0])}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="py-3.5 px-4 font-bold">Report ID</th>
              <th className="py-3.5 px-4 font-bold">Investigation</th>
              <th className="py-3.5 px-4 font-bold">Type</th>
              <th className="py-3.5 px-4 font-bold">Risk</th>
              <th className="py-3.5 px-4 font-bold">Evidence</th>
              <th className="py-3.5 px-4 font-bold">Generated</th>
              <th className="py-3.5 px-4 font-bold">Analyst</th>
              <th className="py-3.5 px-4 font-bold">Status</th>
              <th className="py-3.5 px-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            {reports.map((report) => (
              <tr
                key={report.id}
                className="group hover:bg-slate-50/80 transition-colors cursor-pointer"
                onClick={() => onViewReport(report)}
              >
                {/* Report ID */}
                <td className="py-4 px-4">
                  <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {report.id}
                  </div>
                  <div className="text-[10px] text-slate-400 font-normal truncate max-w-[140px]" title={report.title}>
                    {report.title}
                  </div>
                </td>

                {/* Investigation */}
                <td className="py-4 px-4 font-mono text-[11px] text-slate-600">
                  <span className="rounded-lg bg-slate-100 px-2 py-0.5 font-bold text-slate-800 border border-slate-200">
                    {report.caseId}
                  </span>
                </td>

                {/* Type */}
                <td className="py-4 px-4 font-semibold text-slate-800">
                  {report.type}
                </td>

                {/* Risk */}
                <td className="py-4 px-4">
                  <RiskBadge score={report.riskScore} level={report.riskLevel} />
                </td>

                {/* Evidence */}
                <td className="py-4 px-4">
                  <EvidenceStatusBadge status={report.evidenceStatus} />
                </td>

                {/* Generated */}
                <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                  {new Date(report.generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>

                {/* Analyst */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 border border-blue-200">
                      {report.analyst.avatarInitials}
                    </div>
                    <span className="text-slate-800 font-semibold text-[11px]">
                      {report.analyst.name}
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="py-4 px-4">
                  <ReportStatusBadge status={report.status} />
                </td>

                {/* Actions */}
                <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <ReportActionMenu
                    report={report}
                    onView={onViewReport}
                    onVerify={onVerifyEvidence}
                    onExportJson={onExportJson}
                    onDownloadPdf={onDownloadPdf}
                    onOpenInvestigation={onOpenInvestigation}
                    onOpenCampaign={onOpenCampaign}
                    onArchive={onArchiveReport}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
