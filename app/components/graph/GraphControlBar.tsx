'use client';

import React from 'react';
import { Search, Filter, ShieldAlert, Clock, Network, Layers, RotateCcw } from 'lucide-react';
import { GraphFilterState, NodeType, RiskLevel } from '@/app/types/graph';

interface GraphControlBarProps {
  filters: GraphFilterState;
  onFilterChange: (updates: Partial<GraphFilterState>) => void;
  onResetFilters: () => void;
}

export const GraphControlBar: React.FC<GraphControlBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-4 shadow-sm backdrop-blur-md transition-all">
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative min-w-[260px] flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search email, domain, IP, URL or campaign..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              ×
            </button>
          )}
        </div>

        {/* Dropdown Filters Group */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Node Type Filter */}
          <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs font-medium text-slate-700">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-[11px] font-semibold text-slate-400">Node:</span>
            <select
              value={filters.nodeType}
              onChange={(e) => onFilterChange({ nodeType: e.target.value as NodeType | 'all' })}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="email">📧 Email</option>
              <option value="sender">👤 Sender</option>
              <option value="domain">🌐 Domain</option>
              <option value="ip">🖥️ IP Address</option>
              <option value="url">🔗 URL</option>
              <option value="campaign">🎯 Campaign</option>
              <option value="hosting">☁️ Hosting</option>
              <option value="location">🌍 Location</option>
            </select>
          </div>

          {/* Risk Filter */}
          <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs font-medium text-slate-700">
            <ShieldAlert className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-[11px] font-semibold text-slate-400">Risk:</span>
            <select
              value={filters.riskLevel}
              onChange={(e) => onFilterChange({ riskLevel: e.target.value as RiskLevel | 'all' })}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="all">All Risks</option>
              <option value="critical">🔴 Critical</option>
              <option value="high">🟠 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🔵 Low</option>
              <option value="safe">🟢 Safe</option>
            </select>
          </div>

          {/* Time Range Filter */}
          <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs font-medium text-slate-700">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-[11px] font-semibold text-slate-400">Time:</span>
            <select
              value={filters.timeRange}
              onChange={(e) => onFilterChange({ timeRange: e.target.value as any })}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Cluster View Toggle */}
          <button
            onClick={() => onFilterChange({ clusterView: !filters.clusterView })}
            className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2 text-xs font-bold transition-all ${
              filters.clusterView
                ? 'border-purple-300 bg-purple-50 text-purple-700 shadow-xs'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className={`h-3.5 w-3.5 ${filters.clusterView ? 'text-purple-600' : 'text-slate-400'}`} />
            <span>Cluster View</span>
          </button>

          {/* Layout Mode Segmented Controls */}
          <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-100 p-1">
            {(['force', 'radial', 'tree'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => onFilterChange({ layoutMode: mode })}
                className={`rounded-xl px-3 py-1 text-xs font-bold capitalize transition-all ${
                  filters.layoutMode === mode
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Reset Filters */}
          <button
            onClick={onResetFilters}
            title="Reset Filters"
            className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

        </div>

      </div>
    </div>
  );
};
