'use client';

import React from 'react';
import { Search, Filter, RotateCcw, ChevronDown } from 'lucide-react';
import { ReportFilterState, ReportType, ReportRiskLevel, ReportStatus } from '@/app/types/report';

interface ReportSearchBarProps {
  filters: ReportFilterState;
  onFilterChange: (updated: Partial<ReportFilterState>) => void;
  onReset: () => void;
}

export const ReportSearchBar: React.FC<ReportSearchBarProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm mb-6 space-y-4">
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-4 w-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
          placeholder="Search by Case ID, Report ID, email, domain or campaign..."
          className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 py-3 pl-11 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-hidden focus:ring-3 focus:ring-blue-100 transition-all"
        />
        {filters.searchQuery && (
          <button
            onClick={() => onFilterChange({ searchQuery: '' })}
            className="absolute right-4 text-xs font-semibold text-slate-400 hover:text-slate-700"
          >
            Clear
          </button>
        )}
      </div>

      {/* Dropdown Filters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
        {/* Report Type */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Report Type
          </label>
          <div className="relative">
            <select
              value={filters.type}
              onChange={(e) => onFilterChange({ type: e.target.value as ReportType | 'All Reports' })}
              className="w-full appearance-none rounded-2xl border border-slate-200/80 bg-white py-2 pl-3 pr-8 text-xs font-semibold text-slate-700 hover:border-slate-300 focus:border-blue-500 focus:outline-hidden cursor-pointer"
            >
              <option value="All Reports">All Reports</option>
              <option value="Phishing">Phishing</option>
              <option value="BEC">BEC</option>
              <option value="Impersonation">Impersonation</option>
              <option value="Malware">Malware</option>
              <option value="Credential Theft">Credential Theft</option>
              <option value="Infrastructure Investigation">Infrastructure Investigation</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>

        {/* Risk */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Risk Level
          </label>
          <div className="relative">
            <select
              value={filters.risk}
              onChange={(e) => onFilterChange({ risk: e.target.value as ReportRiskLevel | 'All' })}
              className="w-full appearance-none rounded-2xl border border-slate-200/80 bg-white py-2 pl-3 pr-8 text-xs font-semibold text-slate-700 hover:border-slate-300 focus:border-blue-500 focus:outline-hidden cursor-pointer"
            >
              <option value="All">All Risks</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Status
          </label>
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) => onFilterChange({ status: e.target.value as ReportStatus | 'All' })}
              className="w-full appearance-none rounded-2xl border border-slate-200/80 bg-white py-2 pl-3 pr-8 text-xs font-semibold text-slate-700 hover:border-slate-300 focus:border-blue-500 focus:outline-hidden cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="Generated">Generated</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Verified">Verified</option>
              <option value="Archived">Archived</option>
              <option value="Needs Review">Needs Review</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>

        {/* Date Range */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Date
          </label>
          <div className="relative">
            <select
              value={filters.dateRange}
              onChange={(e) => onFilterChange({ dateRange: e.target.value as any })}
              className="w-full appearance-none rounded-2xl border border-slate-200/80 bg-white py-2 pl-3 pr-8 text-xs font-semibold text-slate-700 hover:border-slate-300 focus:border-blue-500 focus:outline-hidden cursor-pointer"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
              <option value="Custom">Custom Range</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>

        {/* Sort By */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Sort By
          </label>
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="w-full appearance-none rounded-2xl border border-slate-200/80 bg-white py-2 pl-3 pr-8 text-xs font-semibold text-slate-700 hover:border-slate-300 focus:border-blue-500 focus:outline-hidden cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="risk_high">Highest Risk</option>
              <option value="risk_low">Lowest Risk</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>

        {/* Reset Filters */}
        <div className="flex flex-col justify-end">
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-1.5 rounded-2xl border border-slate-200/80 bg-slate-50 py-2 px-3 text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};
