'use client';

import React from 'react';
import { Navbar } from '@/app/components/layout/Navbar';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { HeroBanner } from '@/app/components/dashboard/HeroBanner';
import { MetricCard } from '@/app/components/dashboard/MetricCard';
import { ThreatActivityChart } from '@/app/components/dashboard/ThreatActivityChart';
import { ThreatDistributionChart } from '@/app/components/dashboard/ThreatDistributionChart';
import { RecentThreatsTable } from '@/app/components/dashboard/RecentThreatsTable';
import { AIInsightCard } from '@/app/components/dashboard/AIInsightCard';
import { InfrastructureMapPreview } from '@/app/components/dashboard/InfrastructureMapPreview';
import { ThreatGraphPreview } from '@/app/components/dashboard/ThreatGraphPreview';
import { SecurityStatusCard } from '@/app/components/dashboard/SecurityStatusCard';
import { METRIC_CARDS_DATA } from '@/app/data/mockDashboardData';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex gap-6">
          <Sidebar />

          <div className="flex-1 space-y-6 min-w-0">
            {/* Hero Section */}
            <HeroBanner />

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {METRIC_CARDS_DATA.map((metric) => (
                <MetricCard key={metric.id} {...metric} />
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <ThreatActivityChart />
              </div>
              <div className="lg:col-span-4">
                <ThreatDistributionChart />
              </div>
            </div>

            {/* Live Feed & Intelligence Widgets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <RecentThreatsTable />
              </div>
              <div className="lg:col-span-4 space-y-6">
                <AIInsightCard />
                <InfrastructureMapPreview />
                <ThreatGraphPreview />
                <SecurityStatusCard />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}