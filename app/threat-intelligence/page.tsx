'use client';

import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/app/components/layout/Navbar';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { IntelHeader } from '@/app/components/threat-intel/IntelHeader';
import { IntelSearchBar } from '@/app/components/threat-intel/IntelSearchBar';
import { IntelResultSummary } from '@/app/components/threat-intel/IntelResultSummary';
import { IntelReputationCards } from '@/app/components/threat-intel/IntelReputationCards';
import { IntelInfrastructureDetails } from '@/app/components/threat-intel/IntelInfrastructureDetails';
import { IntelSources } from '@/app/components/threat-intel/IntelSources';
import { IntelGeolocationPreview } from '@/app/components/threat-intel/IntelGeolocationPreview';
import { IntelRelatedInvestigations } from '@/app/components/threat-intel/IntelRelatedInvestigations';
import { IntelRelatedIndicators } from '@/app/components/threat-intel/IntelRelatedIndicators';
import { IntelThreatGraphPreview } from '@/app/components/threat-intel/IntelThreatGraphPreview';
import { IntelActionPanel } from '@/app/components/threat-intel/IntelActionPanel';
import { IntelEmptyState } from '@/app/components/threat-intel/IntelEmptyState';
import { IntelLoadingSkeleton } from '@/app/components/threat-intel/IntelLoadingSkeleton';
import { IntelErrorState } from '@/app/components/threat-intel/IntelErrorState';
import { IntelCreateCaseModal } from '@/app/components/threat-intel/IntelCreateCaseModal';
import { IntelExportModal } from '@/app/components/threat-intel/IntelExportModal';

import { ThreatIntelligenceResponse, IndicatorType } from '@/app/types/threatIntel';
import { MOCK_THREAT_INTEL_DATABASE, generateDynamicMockIntel, inferIndicatorType } from '@/app/data/mockThreatIntelData';

function ThreatIntelligenceContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentIndicator, setCurrentIndicator] = useState<string>('');
  const [currentType, setCurrentType] = useState<IndicatorType>('domain');
  const [data, setData] = useState<ThreatIntelligenceResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Modals
  const [isCreateCaseOpen, setIsCreateCaseOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const fetchThreatIntel = useCallback(async (indicator: string, type?: IndicatorType) => {
    if (!indicator || !indicator.trim()) return;

    setIsLoading(true);
    setHasError(false);
    const resolvedType = type || inferIndicatorType(indicator);
    setCurrentIndicator(indicator);
    setCurrentType(resolvedType);

    try {
      // Call the API endpoint
      const res = await fetch('/api/threat-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ indicator: indicator.trim(), type: resolvedType }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const intelData: ThreatIntelligenceResponse = await res.json();
      setData(intelData);
    } catch (err) {
      // Fallback to local mock data generator if network/api throws
      try {
        const fallback = generateDynamicMockIntel(indicator, resolvedType);
        setData(fallback);
      } catch (fallbackErr) {
        setHasError(true);
        setData(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync with URL query parameter ?query=...
  useEffect(() => {
    const queryParam = searchParams.get('query') || searchParams.get('indicator');
    const typeParam = searchParams.get('type') as IndicatorType | null;

    if (queryParam && queryParam !== currentIndicator) {
      fetchThreatIntel(queryParam, typeParam || undefined);
    }
  }, [searchParams, currentIndicator, fetchThreatIntel]);

  const handleSearch = (indicator: string, type?: IndicatorType) => {
    fetchThreatIntel(indicator, type);
  };

  const handleSelectIndicator = (indicator: string, type?: IndicatorType) => {
    fetchThreatIntel(indicator, type);
    // Smooth scroll to top of results
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleRetry = () => {
    if (currentIndicator) {
      fetchThreatIntel(currentIndicator, currentType);
    }
  };

  return (
    <div className="flex-1 min-w-0 space-y-6">
      {/* 1. Page Header */}
      <IntelHeader />

      {/* 2. Search Section */}
      <IntelSearchBar
        onSearch={handleSearch}
        isLoading={isLoading}
        initialQuery={currentIndicator}
        initialType={currentType}
      />

      {/* Main Content Area: Loading, Error, Empty, or Result */}
      {isLoading ? (
        <IntelLoadingSkeleton />
      ) : hasError ? (
        <IntelErrorState onRetry={handleRetry} />
      ) : !data ? (
        <IntelEmptyState onSelectIndicator={handleSelectIndicator} />
      ) : (
        <div className="space-y-6">
          
          {/* 3. Search Result Overview */}
          <IntelResultSummary
            data={data}
            onOpenInvestigation={() => setIsCreateCaseOpen(true)}
          />

          {/* 4. Reputation & Threat Status */}
          <IntelReputationCards data={data} />

          {/* 5. Infrastructure Details */}
          <IntelInfrastructureDetails data={data} />

          {/* 6 & 7. Sources & Observed Infrastructure Location */}
          <div className="grid grid-cols-1 gap-6">
            <IntelGeolocationPreview data={data} />
            <IntelSources sources={data.sources} />
          </div>

          {/* 8. Related Investigations */}
          <IntelRelatedInvestigations
            cases={data.related_cases}
            onOpenCreateCase={() => setIsCreateCaseOpen(true)}
          />

          {/* 9. Related Indicators */}
          <IntelRelatedIndicators
            relations={data.related_indicators}
            onSelectIndicator={handleSelectIndicator}
          />

          {/* 10. Threat Graph Preview */}
          <IntelThreatGraphPreview data={data} />

          {/* 11. Actions Panel */}
          <IntelActionPanel
            data={data}
            onCreateCase={() => setIsCreateCaseOpen(true)}
            onExport={() => setIsExportOpen(true)}
          />

          {/* Modals */}
          <IntelCreateCaseModal
            isOpen={isCreateCaseOpen}
            onClose={() => setIsCreateCaseOpen(false)}
            data={data}
          />

          <IntelExportModal
            isOpen={isExportOpen}
            onClose={() => setIsExportOpen(false)}
            data={data}
          />

        </div>
      )}
    </div>
  );
}

export default function ThreatIntelligencePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 text-slate-900 selection:bg-blue-100 selection:text-blue-700">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex gap-6">
          <Sidebar />

          <Suspense fallback={<IntelLoadingSkeleton />}>
            <ThreatIntelligenceContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
