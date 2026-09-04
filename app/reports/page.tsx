'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/app/components/layout/Navbar';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { ReportBreadcrumb } from '@/app/components/reports/ReportBreadcrumb';
import { ReportHeader } from '@/app/components/reports/ReportHeader';
import { ReportMetricCards } from '@/app/components/reports/ReportMetricCards';
import { ReportSearchBar } from '@/app/components/reports/ReportSearchBar';
import { ReportsTable } from '@/app/components/reports/ReportsTable';
import { GenerateReportModal } from '@/app/components/reports/GenerateReportModal';
import { EvidenceVerificationModal } from '@/app/components/reports/EvidenceVerificationModal';
import { ForensicReportPreview } from '@/app/components/reports/ForensicReportPreview';
import { ReportEmptyState, ReportSkeletonLoader } from '@/app/components/reports/ReportStates';
import { MOCK_REPORTS, MOCK_REPORT_METRICS } from '@/app/data/mockReportData';
import { ForensicReport, ReportFilterState } from '@/app/types/report';
import { X } from 'lucide-react';

export default function ReportsPage() {
  const router = useRouter();

  // Filter State
  const [filters, setFilters] = useState<ReportFilterState>({
    searchQuery: '',
    type: 'All Reports',
    risk: 'All',
    status: 'All',
    dateRange: 'Last 30 Days',
    sortBy: 'newest',
  });

  // Modal States
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [selectedReportForVerify, setSelectedReportForVerify] = useState<ForensicReport | null>(null);

  // Selected Report Preview Drawer
  const [previewReport, setPreviewReport] = useState<ForensicReport | null>(null);

  const handleFilterChange = (updated: Partial<ReportFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      type: 'All Reports',
      risk: 'All',
      status: 'All',
      dateRange: 'Last 30 Days',
      sortBy: 'newest',
    });
  };

  // Filter & Sort Logic
  const filteredReports = useMemo(() => {
    return MOCK_REPORTS.filter((report) => {
      // Search
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesQuery =
          report.id.toLowerCase().includes(q) ||
          report.caseId.toLowerCase().includes(q) ||
          report.title.toLowerCase().includes(q) ||
          report.emailInfo.sender.toLowerCase().includes(q) ||
          report.domainIntelligence.domain.toLowerCase().includes(q) ||
          report.campaignCorrelation.campaignId.toLowerCase().includes(q) ||
          report.analyst.name.toLowerCase().includes(q);

        if (!matchesQuery) return false;
      }

      // Type
      if (filters.type !== 'All Reports' && report.type !== filters.type) {
        return false;
      }

      // Risk
      if (filters.risk !== 'All' && report.riskLevel !== filters.risk) {
        return false;
      }

      // Status
      if (filters.status !== 'All' && report.status !== filters.status) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime();
      }
      if (filters.sortBy === 'oldest') {
        return new Date(a.generatedAt).getTime() - new Date(b.generatedAt).getTime();
      }
      if (filters.sortBy === 'risk_high') {
        return b.riskScore - a.riskScore;
      }
      if (filters.sortBy === 'risk_low') {
        return a.riskScore - b.riskScore;
      }
      return 0;
    });
  }, [filters]);

  // Action handlers
  const handleViewReport = (report: ForensicReport) => {
    router.push(`/reports/${report.id}`);
  };

  const handleVerifyEvidence = (report: ForensicReport) => {
    setSelectedReportForVerify(report);
    setIsVerifyModalOpen(true);
  };

  const handleExportJson = (report: ForensicReport) => {
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

  const handleDownloadPdf = (report: ForensicReport) => {
    router.push(`/reports/${report.id}`);
    setTimeout(() => window.print(), 500);
  };

  const handleOpenInvestigation = (caseId: string) => {
    router.push(`/investigations`);
  };

  const handleOpenCampaign = (campaignId: string) => {
    router.push(`/threat-intelligence`);
  };

  const handleArchiveReport = (reportId: string) => {
    alert(`Report ${reportId} archived.`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex gap-6">
          <Sidebar />

          <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <ReportBreadcrumb />

            {/* Page Header */}
            <ReportHeader onGenerateClick={() => setIsGenerateModalOpen(true)} />

            {/* Summary Metrics Grid */}
            <ReportMetricCards metrics={MOCK_REPORT_METRICS} />

            {/* Search & Filter Toolbar */}
            <ReportSearchBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />

            {/* Recent Reports Table or Empty State */}
            {filteredReports.length > 0 ? (
              <ReportsTable
                reports={filteredReports}
                onViewReport={handleViewReport}
                onVerifyEvidence={handleVerifyEvidence}
                onExportJson={handleExportJson}
                onDownloadPdf={handleDownloadPdf}
                onOpenInvestigation={handleOpenInvestigation}
                onOpenCampaign={handleOpenCampaign}
                onArchiveReport={handleArchiveReport}
              />
            ) : (
              <ReportEmptyState />
            )}
          </div>
        </div>
      </main>

      {/* Generate Report Modal Flow */}
      <GenerateReportModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onSuccessViewReport={(reportId) => router.push(`/reports/${reportId}`)}
      />

      {/* Evidence Verification Cryptographic Modal */}
      <EvidenceVerificationModal
        isOpen={isVerifyModalOpen}
        report={selectedReportForVerify}
        onClose={() => {
          setIsVerifyModalOpen(false);
          setSelectedReportForVerify(null);
        }}
      />
    </div>
  );
}
