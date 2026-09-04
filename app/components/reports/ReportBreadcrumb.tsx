'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, FileText, Home } from 'lucide-react';

interface ReportBreadcrumbProps {
  reportId?: string;
  title?: string;
}

export const ReportBreadcrumb: React.FC<ReportBreadcrumbProps> = ({ reportId, title }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3">
      <Link 
        href="/" 
        className="flex items-center gap-1.5 hover:text-slate-700 transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
        <span>Dashboard</span>
      </Link>

      <ChevronRight className="h-3.5 w-3.5 text-slate-300" />

      <Link 
        href="/reports" 
        className={`flex items-center gap-1.5 transition-colors ${
          !reportId ? 'text-slate-800 font-bold' : 'hover:text-slate-700'
        }`}
      >
        <FileText className="h-3.5 w-3.5" />
        <span>Reports</span>
      </Link>

      {reportId && (
        <>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          <span className="text-slate-800 font-bold truncate max-w-xs" title={title || reportId}>
            {reportId}
          </span>
        </>
      )}
    </nav>
  );
};
