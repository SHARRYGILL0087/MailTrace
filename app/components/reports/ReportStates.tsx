'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, AlertTriangle, RefreshCw, ArrowRight, ShieldAlert } from 'lucide-react';

export const ReportEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-12 text-center shadow-sm my-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 border border-blue-100 mb-4 shadow-xs">
        <FileText className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-extrabold text-slate-900">
        No Reports Found
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-md">
        Generate a forensic report from an investigation after completing an email threat analysis.
      </p>
      <Link
        href="/investigations"
        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors"
      >
        <span>Go to Investigations</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

export const ReportSkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-28 rounded-3xl border border-slate-200/60 bg-white p-5 space-y-3">
            <div className="h-4 w-24 bg-slate-100 rounded-lg" />
            <div className="h-7 w-16 bg-slate-200 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="rounded-3xl border border-slate-200/60 bg-white p-6 space-y-4">
        <div className="h-5 w-48 bg-slate-100 rounded-lg" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 w-full bg-slate-50 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
};

export const ReportErrorState: React.FC<{ message?: string; onRetry?: () => void }> = ({
  message = 'Unable to generate or load forensic report data.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-rose-200 bg-rose-50/50 p-10 text-center my-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mb-3">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h3 className="text-base font-extrabold text-rose-900">
        Report Generation Error
      </h3>
      <p className="mt-1 text-xs text-rose-700 max-w-md font-medium">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-rose-700 transition-colors cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Retry Loading</span>
        </button>
      )}
    </div>
  );
};
