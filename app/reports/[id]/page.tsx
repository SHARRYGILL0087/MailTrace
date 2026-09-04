'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { Navbar } from '@/app/components/layout/Navbar';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { ReportBreadcrumb } from '@/app/components/reports/ReportBreadcrumb';
import { ForensicReportPreview } from '@/app/components/reports/ForensicReportPreview';
import { EvidenceVerificationModal } from '@/app/components/reports/EvidenceVerificationModal';
import { MOCK_REPORTS } from '@/app/data/mockReportData';
import { ForensicReport } from '@/app/types/report';
import { AlertCircle, ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ReportDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  // Find target report or fallback to first report
  const report: ForensicReport | undefined = MOCK_REPORTS.find(
    (r) => r.id.toLowerCase() === id.toLowerCase()
  ) || MOCK_REPORTS[0];

  if (!report) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 md:px-8 pt-8">
          <div className="flex gap-6">
            <Sidebar />
            <div className="flex-1 text-center py-20 bg-white rounded-3xl border border-slate-200">
              <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-slate-900">Report Not Found</h2>
              <p className="text-xs text-slate-500 mt-1">
                The requested report ID ({id}) could not be located in forensic storage.
              </p>
              <Link
                href="/reports"
                className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Reports</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex gap-6">
          <Sidebar />

          <div className="flex-1 min-w-0 space-y-4">
            {/* Breadcrumb */}
            <ReportBreadcrumb reportId={report.id} title={report.title} />

            {/* Forensic Document Preview Workspace */}
            <ForensicReportPreview
              report={report}
              onVerifyClick={() => setIsVerifyModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Evidence Verification Modal */}
      <EvidenceVerificationModal
        isOpen={isVerifyModalOpen}
        report={report}
        onClose={() => setIsVerifyModalOpen(false)}
      />
    </div>
  );
}
