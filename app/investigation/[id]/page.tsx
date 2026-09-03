'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/app/components/layout/Navbar';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { InvestigationBreadcrumb } from '@/app/components/investigation/InvestigationBreadcrumb';
import { InvestigationHeader } from '@/app/components/investigation/InvestigationHeader';
import { ThreatScoreCard } from '@/app/components/investigation/ThreatScoreCard';
import { RiskFactorCard } from '@/app/components/investigation/RiskFactorCard';
import { SenderIdentityCard } from '@/app/components/investigation/SenderIdentityCard';
import { AuthenticationCard } from '@/app/components/investigation/AuthenticationCard';
import { EmailMetadata } from '@/app/components/investigation/EmailMetadata';
import { HeaderRouteTimeline } from '@/app/components/investigation/HeaderRouteTimeline';
import { HeaderAnomalies } from '@/app/components/investigation/HeaderAnomalies';
import { URLIntelligence } from '@/app/components/investigation/URLIntelligence';
import { DomainIntelligence } from '@/app/components/investigation/DomainIntelligence';
import { IPIntelligence } from '@/app/components/investigation/IPIntelligence';
import { InfrastructureMap } from '@/app/components/investigation/InfrastructureMap';
import { ThreatGraphPreview } from '@/app/components/investigation/ThreatGraphPreview';
import { RelatedIncidents } from '@/app/components/investigation/RelatedIncidents';
import { CampaignCard } from '@/app/components/investigation/CampaignCard';
import { InvestigationTimeline } from '@/app/components/investigation/InvestigationTimeline';
import { EvidenceCard } from '@/app/components/investigation/EvidenceCard';
import { AnalystNotes } from '@/app/components/investigation/AnalystNotes';
import { RecommendedActions } from '@/app/components/investigation/RecommendedActions';
import { InvestigationActionPanel } from '@/app/components/investigation/InvestigationActionPanel';
import { DetailDrawer } from '@/app/components/investigation/DetailDrawer';
import { InvestigationSummary } from '@/app/components/investigation/InvestigationSummary';

import { MOCK_INVESTIGATION_DATA } from '@/app/data/mockInvestigationData';
import { DetailDrawerData, RecommendedAction, AnalystNote, HeaderNode, URLIntelligenceItem, DomainIntelligenceData, IPIntelligenceData, RelatedIncident, CampaignData } from '@/app/types/investigation';

export default function InvestigationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [investigation, setInvestigation] = useState(MOCK_INVESTIGATION_DATA);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Slide-over Detail Drawer State
  const [drawerData, setDrawerData] = useState<DetailDrawerData>({
    isOpen: false,
    type: null,
    title: '',
    attributes: {},
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Drawer Opening Handlers
  const handleOpenNodeDrawer = (node: HeaderNode) => {
    setDrawerData({
      isOpen: true,
      type: 'headerNode',
      title: node.name,
      reputation: node.isSuspicious ? 'High Risk Server' : 'Clean Transit Node',
      attributes: {
        ipAddress: node.ip,
        provider: node.provider,
        location: `${node.location} ${node.flag}`,
        timestamp: node.timestamp,
        nodeType: node.type,
      },
    });
  };

  const handleOpenUrlDrawer = (item: URLIntelligenceItem) => {
    setDrawerData({
      isOpen: true,
      type: 'url',
      title: item.domain,
      reputation: item.reputation === 'malicious' ? 'Malicious Phishing URL' : 'Suspicious Redirect',
      attributes: {
        fullUrl: item.url,
        ipAddress: item.ipAddress,
        redirects: item.redirects,
        category: item.targetCategory,
        riskRating: item.risk,
      },
    });
  };

  const handleOpenDomainDrawer = (dom: DomainIntelligenceData) => {
    setDrawerData({
      isOpen: true,
      type: 'domain',
      title: dom.domain,
      reputation: dom.reputation,
      attributes: {
        domainAge: `${dom.ageDays} Days Old`,
        registrar: dom.registrar,
        creationDate: dom.creationDate,
        dnsRecords: dom.dnsRecordsCount,
        mxServers: dom.mxServersCount,
        relatedDomains: dom.relatedDomainsCount,
      },
    });
  };

  const handleOpenIpDrawer = (ip: IPIntelligenceData) => {
    setDrawerData({
      isOpen: true,
      type: 'ip',
      title: ip.ip,
      reputation: ip.reputation,
      attributes: {
        country: `${ip.country} (${ip.countryCode})`,
        region: ip.region,
        city: ip.city,
        isp: ip.isp,
        host: ip.host,
        asn: ip.asn,
        proxyService: `${ip.vpnProxy} (${ip.proxyService})`,
        torExitNode: ip.torNode,
        openPorts: ip.openPorts.join(', '),
      },
    });
  };

  const handleOpenCampaignDrawer = (campaign: CampaignData) => {
    setDrawerData({
      isOpen: true,
      type: 'campaign',
      title: campaign.name,
      reputation: `Active Campaign (${campaign.correlationConfidence}% Confidence)`,
      attributes: {
        campaignId: campaign.id,
        relatedEmails: campaign.relatedEmailsCount,
        domainsInvolved: campaign.domainsCount,
        ipAddressesInvolved: campaign.ipAddressesCount,
        activeDuration: `${campaign.activeDays} Days`,
        firstSeen: campaign.firstSeen,
        lastSeen: campaign.lastSeen,
      },
    });
  };

  const handleOpenIncidentDrawer = (inc: RelatedIncident) => {
    setDrawerData({
      isOpen: true,
      type: 'incident',
      title: inc.id,
      reputation: `${inc.severity} Severity Match (${inc.confidence}%)`,
      attributes: {
        title: inc.title,
        matchedReason: inc.reason,
        incidentDate: inc.date,
        confidenceScore: `${inc.confidence}%`,
      },
    });
  };

  // Interactive Playbook & Notes Handlers
  const handleToggleRecommendedAction = (actionId: string) => {
    setInvestigation((prev) => ({
      ...prev,
      recommendedActions: prev.recommendedActions.map((act) =>
        act.id === actionId ? { ...act, completed: !act.completed } : act
      ),
    }));
  };

  const handleAddAnalystNote = (text: string) => {
    const newNote: AnalystNote = {
      id: `note-${Date.now()}`,
      author: 'Security Analyst (You)',
      role: 'SOC Tier-2 Specialist',
      timestamp: 'Just now',
      content: text,
      avatarInitials: 'YOU',
    };
    setInvestigation((prev) => ({
      ...prev,
      analystNotes: [newNote, ...prev.analystNotes],
    }));
    showToast('Analyst note saved successfully.');
  };

  const handleExportReport = () => {
    showToast(`Exporting forensic report for investigation #${investigation.id}...`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      <Navbar />

      {/* Floating Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-slate-900 px-5 py-3 text-xs font-bold text-white shadow-xl animate-in slide-in-from-bottom duration-200 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex gap-6">
          <Sidebar />

          <div className="flex-1 space-y-6 min-w-0">
            {/* 1. BREADCRUMB */}
            <InvestigationBreadcrumb investigationId={resolvedParams.id || investigation.id} />

            {/* 2. INVESTIGATION HEADER */}
            <InvestigationHeader
              data={investigation}
              onExportReport={handleExportReport}
            />

            {/* Main forensic workspace 12-col grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Main Content (8 cols desktop / 12 cols mobile) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* 3. THREAT SCORE HERO */}
                <ThreatScoreCard
                  data={investigation}
                  onQuickActionClick={(action) => showToast(`Executing action: ${action}`)}
                />

                {/* 4. RISK FACTOR BREAKDOWN */}
                <RiskFactorCard riskFactors={investigation.riskFactors} />

                {/* 5. EMAIL IDENTITY ANALYSIS */}
                <SenderIdentityCard
                  senderIdentity={investigation.senderIdentity}
                  onInspectDomain={(dom) => handleOpenDomainDrawer(investigation.domainIntelligence)}
                />

                {/* 6. AUTHENTICATION ANALYSIS */}
                <AuthenticationCard authentication={investigation.authentication} />

                {/* 7. EMAIL METADATA */}
                <EmailMetadata metadata={investigation.metadata} />

                {/* 8. HEADER FORENSICS (ROUTE TIMELINE & ANOMALIES) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-7">
                    <HeaderRouteTimeline
                      routeNodes={investigation.headerRoute}
                      onNodeClick={handleOpenNodeDrawer}
                    />
                  </div>
                  <div className="lg:col-span-5">
                    <HeaderAnomalies
                      anomalies={investigation.headerAnomalies}
                      onViewEvidence={(anom) => showToast(`Opening evidence for: ${anom.title}`)}
                    />
                  </div>
                </div>

                {/* 10. URL INTELLIGENCE */}
                <URLIntelligence
                  urls={investigation.urls}
                  onOpenDetails={handleOpenUrlDrawer}
                />

                {/* 11 & 12. DOMAIN & IP INTELLIGENCE GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DomainIntelligence
                    domainData={investigation.domainIntelligence}
                    onOpenDrawer={handleOpenDomainDrawer}
                  />
                  <IPIntelligence
                    ipData={investigation.ipIntelligence}
                    onOpenDrawer={handleOpenIpDrawer}
                  />
                </div>

                {/* 13. GEOLOCATION PREVIEW */}
                <InfrastructureMap
                  geoData={investigation.geolocation}
                  onOpenGeolocation={() => router.push('/geolocation')}
                />

                {/* 14. THREAT RELATIONSHIP GRAPH PREVIEW */}
                <ThreatGraphPreview
                  onOpenThreatGraph={() => router.push('/threat-graph')}
                  onNodeSelect={(type, label) => showToast(`Selected graph node: ${label}`)}
                />

                {/* 15. RELATED INCIDENTS */}
                <RelatedIncidents
                  incidents={investigation.relatedIncidents}
                  onSelectIncident={handleOpenIncidentDrawer}
                />

                {/* 16. CAMPAIGN CORRELATION */}
                <CampaignCard
                  campaign={investigation.campaign}
                  onInvestigateCampaign={handleOpenCampaignDrawer}
                />

                {/* 17. INVESTIGATION TIMELINE */}
                <InvestigationTimeline timeline={investigation.timeline} />

                {/* 18. EVIDENCE SECTION */}
                <EvidenceCard
                  evidence={investigation.evidence}
                  onVerify={() => showToast('Evidence cryptographic SHA-256 hash verified clean!')}
                  onViewDetails={() => showToast('Displaying raw EML headers evidence manifest.')}
                />

                {/* 19. ANALYST NOTES */}
                <AnalystNotes
                  notes={investigation.analystNotes}
                  onAddNote={handleAddAnalystNote}
                />

                {/* 20. RECOMMENDED ACTIONS */}
                <RecommendedActions
                  actions={investigation.recommendedActions}
                  onToggleAction={handleToggleRecommendedAction}
                  onCreateTask={() => showToast('SOC Response task created in Jira/SOAR.')}
                  onMarkResolved={() => {
                    setInvestigation((prev) => ({ ...prev, status: 'Resolved' }));
                    showToast('Investigation ticket marked as Resolved.');
                  }}
                />

                {/* 22. BOTTOM SUMMARY */}
                <InvestigationSummary
                  onNextStepClick={() => handleOpenCampaignDrawer(investigation.campaign)}
                />
              </div>

              {/* Right Column: Sticky Action Panel (4 cols desktop) */}
              <div className="lg:col-span-4 space-y-6">
                <InvestigationActionPanel
                  onAnalyzeAgain={() => router.push('/analyze')}
                  onAddToCase={() => showToast('Added investigation to existing SOC master case.')}
                  onViewThreatGraph={() => router.push('/threat-graph')}
                  onViewGeolocation={() => router.push('/geolocation')}
                  onGenerateReport={handleExportReport}
                  onVerifyEvidence={() => showToast('Cryptographic hash integrity verified!')}
                  onEscalate={() => showToast('Investigation escalated to SOC Tier-3 Lead.')}
                />
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* 24. ANALYST DETAIL DRAWER */}
      <DetailDrawer
        drawerData={drawerData}
        onClose={() => setDrawerData((prev) => ({ ...prev, isOpen: false }))}
        onNavigateThreatIntelligence={(entity) => router.push(`/threat-intelligence?query=${encodeURIComponent(entity)}`)}
      />
    </div>
  );
}
