'use client';

import React, { useState } from 'react';
import { Navbar } from '@/app/components/layout/Navbar';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { RefreshCw, Info, Globe2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

import { GeoFilterState, InfrastructureLocation } from '@/app/types/geo';
import { MOCK_INFRASTRUCTURE } from '@/app/data/mockGeoData';

import { GeoMetricCards } from '@/app/components/geo/GeoMetricCards';
import { InfrastructureMap } from '@/app/components/geo/InfrastructureMap';
import { LocationDetailsPanel } from '@/app/components/geo/LocationDetailsPanel';
import { LocationConfidenceCard } from '@/app/components/geo/LocationConfidenceCard';
import { RegionalThreatChart } from '@/app/components/geo/RegionalThreatChart';
import { CountryDistributionCard } from '@/app/components/geo/CountryDistributionCard';
import { InfrastructureTable } from '@/app/components/geo/InfrastructureTable';
import { LocationGraphCard } from '@/app/components/geo/LocationGraphCard';
import { RelatedInvestigations } from '@/app/components/graph/RelatedInvestigations';
import { CampaignGeoCard } from '@/app/components/geo/CampaignGeoCard';
import { GeoTimeline } from '@/app/components/geo/GeoTimeline';
import { GeoAIInsight } from '@/app/components/geo/GeoAIInsight';
import { GeoPrivacyNotice } from '@/app/components/geo/GeoPrivacyNotice';
import { GeoEmptyState } from '@/app/components/geo/GeoEmptyState';
import { GeoLoadingState } from '@/app/components/geo/GeoLoadingState';
import { GeoErrorState } from '@/app/components/geo/GeoErrorState';

export default function GeolocationPage() {
  const [viewState, setViewState] = useState<'normal' | 'loading' | 'empty' | 'error'>('normal');
  const [filters, setFilters] = useState<GeoFilterState>({
    searchQuery: '',
    riskLevel: 'all',
    nodeType: 'all',
    region: 'all',
    infrastructureType: 'all',
    timeRange: '7d',
  });

  const [selectedLocation, setSelectedLocation] = useState<InfrastructureLocation | null>(MOCK_INFRASTRUCTURE[0]);

  const handleFilterChange = (updates: Partial<GeoFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
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
                <span className="text-slate-700 font-bold">Geolocation</span>
              </nav>

              {/* View State Toggle for Testing & Demonstration */}
              <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white p-1 text-[11px] font-bold shadow-xs">
                <button
                  onClick={() => setViewState('normal')}
                  className={`rounded-full px-2.5 py-0.5 transition-colors ${
                    viewState === 'normal' ? 'bg-blue-100 text-blue-800' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Live Map
                </button>
                <button
                  onClick={() => setViewState('loading')}
                  className={`rounded-full px-2.5 py-0.5 transition-colors ${
                    viewState === 'loading' ? 'bg-blue-100 text-blue-800' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Loading
                </button>
                <button
                  onClick={() => setViewState('empty')}
                  className={`rounded-full px-2.5 py-0.5 transition-colors ${
                    viewState === 'empty' ? 'bg-blue-100 text-blue-800' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Empty
                </button>
                <button
                  onClick={() => setViewState('error')}
                  className={`rounded-full px-2.5 py-0.5 transition-colors ${
                    viewState === 'error' ? 'bg-rose-100 text-rose-800' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Error
                </button>
              </div>
            </div>

            {/* 2. PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  Infrastructure Geolocation
                </h1>
                <p className="mt-1 text-xs text-slate-500 max-w-2xl">
                  Map and investigate the geographic footprint of suspicious email infrastructure.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-bold text-emerald-800 shadow-xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Geo Intelligence Online</span>
                </div>

                <button
                  onClick={() => setFilters({ searchQuery: '', riskLevel: 'all', nodeType: 'all', region: 'all', infrastructureType: 'all', timeRange: '7d' })}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition-all"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Refresh Intelligence</span>
                </button>
              </div>
            </div>

            {/* 3. IMPORTANT DISCLAIMER BANNER */}
            <div className="flex items-start gap-3 rounded-2xl border border-blue-200/80 bg-blue-50/70 p-4 shadow-xs">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold text-xs">
                ℹ️
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-blue-950">Geolocation Notice</h4>
                <p className="text-blue-900/80 mt-0.5 leading-relaxed">
                  Location data represents probable observed network infrastructure. It does not establish the physical location or identity of an attacker.
                </p>
              </div>
            </div>

            {/* 4. TOP METRIC CARDS */}
            <GeoMetricCards />

            {/* 5, 6, 7 & 10. MAIN MAP & DETAILS PANEL SECTION */}
            {viewState === 'loading' ? (
              <GeoLoadingState />
            ) : viewState === 'empty' ? (
              <GeoEmptyState />
            ) : viewState === 'error' ? (
              <GeoErrorState onRetry={() => setViewState('normal')} />
            ) : (
              <div className="space-y-6">
                
                {/* Map + Detail Panel */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  <div className="flex-1 w-full min-w-0">
                    <InfrastructureMap
                      locations={MOCK_INFRASTRUCTURE}
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      selectedLocation={selectedLocation}
                      onSelectLocation={setSelectedLocation}
                    />
                  </div>

                  {selectedLocation && (
                    <LocationDetailsPanel
                      location={selectedLocation}
                      onClose={() => setSelectedLocation(null)}
                    />
                  )}
                </div>

                {/* 11, 12 & 13. CONFIDENCE & REGIONAL ANALYTICS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-4">
                    <LocationConfidenceCard />
                  </div>
                  <div className="lg:col-span-4">
                    <RegionalThreatChart />
                  </div>
                  <div className="lg:col-span-4">
                    <CountryDistributionCard />
                  </div>
                </div>

                {/* 14. INFRASTRUCTURE TABLE */}
                <InfrastructureTable
                  locations={MOCK_INFRASTRUCTURE}
                  selectedLocation={selectedLocation}
                  onSelectLocation={setSelectedLocation}
                />

                {/* 16 & 17. LOCATION RELATIONSHIPS & RELATED INVESTIGATIONS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5">
                    <LocationGraphCard />
                  </div>
                  <div className="lg:col-span-7">
                    <RelatedInvestigations />
                  </div>
                </div>

                {/* 18. CAMPAIGN GEOGRAPHIC INTELLIGENCE */}
                <CampaignGeoCard />

                {/* 19. GEOGRAPHIC ACTIVITY TIMELINE */}
                <GeoTimeline />

                {/* 24. AI GEOGRAPHIC INSIGHT */}
                <GeoAIInsight />

                {/* 28. ACCURACY & PRIVACY NOTICE */}
                <GeoPrivacyNotice />

              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
