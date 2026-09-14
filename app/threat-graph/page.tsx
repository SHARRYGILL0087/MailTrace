'use client';

import React, { useState } from 'react';
import { Navbar } from '@/app/components/layout/Navbar';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { Plus, Activity, RefreshCw, Eye, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { GraphFilterState, ThreatNode, PathSearchResult } from '@/app/types/graph';
import { INITIAL_NODES, INITIAL_EDGES } from '@/app/data/mockGraphData';

import { GraphControlBar } from '@/app/components/graph/GraphControlBar';
import { InteractiveThreatGraph } from '@/app/components/graph/InteractiveThreatGraph';
import { NodeDetailPanel } from '@/app/components/graph/NodeDetailPanel';
import { ConnectionFinder } from '@/app/components/graph/ConnectionFinder';
import { AIInsightsCard } from '@/app/components/graph/AIInsightsCard';
import { RelatedInvestigations } from '@/app/components/graph/RelatedInvestigations';
import { GraphStatistics } from '@/app/components/graph/GraphStatistics';
import { GeoPreviewCard } from '@/app/components/graph/GeoPreviewCard';
import { GraphEmptyState } from '@/app/components/graph/GraphEmptyState';
import { GraphLoadingState } from '@/app/components/graph/GraphLoadingState';

export default function ThreatGraphPage() {
  const [viewState, setViewState] = useState<'normal' | 'loading' | 'empty'>('normal');
  const [filters, setFilters] = useState<GraphFilterState>({
    searchQuery: '',
    nodeType: 'all',
    riskLevel: 'all',
    timeRange: '7d',
    layoutMode: 'radial',
    clusterView: false,
  });

  const [selectedNode, setSelectedNode] = useState<ThreatNode | null>(null); // default hidden, only shown when clicking a node
  const [activePath, setActivePath] = useState<PathSearchResult | null>(null);

  const handleFilterChange = (updates: Partial<GraphFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      nodeType: 'all',
      riskLevel: 'all',
      timeRange: '7d',
      layoutMode: 'radial',
      clusterView: false,
    });
    setSelectedNode(null);
    setActivePath(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 text-slate-900 selection:bg-blue-100 selection:text-blue-700">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex gap-6">
          <Sidebar />

          <div className="flex-1 min-w-0 space-y-6">
            
            {/* 1. BREADCRUMB */}
            <div className="flex items-center justify-between">
              <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Link href="/" className="hover:text-slate-700 transition-colors">Dashboard</Link>
                <span>/</span>
                <span className="text-slate-700 font-bold">Threat Graph</span>
              </nav>

              {/* Quick View Mode Toggle (For Demonstration & Testing) */}
              <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white p-1 text-[11px] font-bold shadow-xs">
                <button
                  onClick={() => setViewState('normal')}
                  className={`rounded-full px-2.5 py-0.5 transition-colors ${
                    viewState === 'normal' ? 'bg-blue-100 text-blue-800' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Live Graph
                </button>
                <button
                  onClick={() => setViewState('loading')}
                  className={`rounded-full px-2.5 py-0.5 transition-colors ${
                    viewState === 'loading' ? 'bg-blue-100 text-blue-800' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Loading State
                </button>
                <button
                  onClick={() => setViewState('empty')}
                  className={`rounded-full px-2.5 py-0.5 transition-colors ${
                    viewState === 'empty' ? 'bg-blue-100 text-blue-800' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Empty State
                </button>
              </div>
            </div>

            {/* 2. PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  Threat Relationship Graph
                </h1>
                <p className="mt-1 text-xs text-slate-500 max-w-2xl">
                  Visualize connections between emails, domains, IPs, URLs, infrastructure and threat campaigns.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-bold text-emerald-800 shadow-xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Graph Engine Online</span>
                </div>

                <Link
                  href="/investigations?action=new"
                  className="flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-all hover:scale-[1.02]"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Investigation</span>
                </Link>
              </div>
            </div>

            {/* 3. GRAPH CONTROL BAR */}
            <GraphControlBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />

            {/* 4 & 5. MAIN GRAPH CANVAS SECTION */}
            {viewState === 'loading' ? (
              <GraphLoadingState />
            ) : viewState === 'empty' ? (
              <GraphEmptyState />
            ) : (
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="flex-1 w-full min-w-0">
                  <InteractiveThreatGraph
                    nodes={INITIAL_NODES}
                    edges={INITIAL_EDGES}
                    filters={filters}
                    selectedNode={selectedNode}
                    onSelectNode={setSelectedNode}
                    activePath={activePath}
                  />
                </div>

                {/* 11 & 12. RIGHT-SIDE NODE DETAIL PANEL */}
                {selectedNode && (
                  <NodeDetailPanel
                    node={selectedNode}
                    onClose={() => setSelectedNode(null)}
                  />
                )}
              </div>
            )}

            {/* 16. AI GRAPH INSIGHTS */}
            <AIInsightsCard />

            {/* 17. SHORTEST PATH / CONNECTION ANALYSIS */}
            <ConnectionFinder
              nodes={INITIAL_NODES}
              onFindPath={setActivePath}
            />

            {/* 19. RELATED INVESTIGATIONS */}
            <RelatedInvestigations />

            {/* 20 & 21. GRAPH STATISTICS & GEOLOCATION PREVIEW */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7 flex flex-col">
                <GraphStatistics />
              </div>
              <div className="lg:col-span-5 flex flex-col">
                <GeoPreviewCard />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
