'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Info, 
  Layers, 
  Code2, 
  ExternalLink, 
  BookOpen, 
  Network, 
  FileText, 
  CheckCircle2, 
  X,
  Share2
} from 'lucide-react';
import { ThreatShieldLogo } from '@/app/components/ui/ThreatShieldLogo';

export const AboutSettings: React.FC = () => {
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isArchOpen, setIsArchOpen] = useState(false);

  const techStack = [
    { name: 'Next.js 16', desc: 'React 19 App Router & Server Actions' },
    { name: 'MySQL', desc: 'Relational Case Data & Evidence Store' },
    { name: 'Python AI/ML', desc: 'PyTorch Threat Classifier' },
    { name: 'SHAP / LIME', desc: 'Explainable AI Feature Attribution' },
    { name: 'Neo4j / NetworkX', desc: 'Graph Threat Relationship Correlation' },
    { name: 'VirusTotal', desc: 'Multi-AV Engine File & URL Sandboxing' },
    { name: 'AbuseIPDB', desc: 'Crowdsourced IP Telemetry' },
    { name: 'MaxMind / IPinfo', desc: 'BGP ASN & Infrastructure Geolocation' },
  ];

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Info className="h-4 w-4 text-emerald-600" />
            <span>About Threat Shield</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            System build details, architectural specifications, and platform telemetry
          </p>
        </div>

        <span className="rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 text-[11px] font-extrabold font-mono">
          v1.0.0
        </span>
      </div>

      {/* Hero Banner Box */}
      <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-tr from-slate-50 via-white to-blue-50/30 p-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25">
              <ThreatShieldLogo size={36} variant="on-blue" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Threat Shield</h3>
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200/80">
                  SIH PS 26106
                </span>
              </div>
              <p className="text-xs font-medium text-slate-600 mt-0.5">
                AI-Powered Email Threat Detection, GeoLocation & Forensic Intelligence Platform
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-200/60">
          Designed for Security Operations Centers (SOC) and cyber-forensic analysts to accelerate triage, identify adversarial email infrastructure, and track coordinated phishing campaigns with explainable AI.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={() => setIsDocsOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>View Documentation</span>
          </button>

          <button
            type="button"
            onClick={() => setIsArchOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <Network className="h-3.5 w-3.5 text-slate-400" />
            <span>View Architecture</span>
          </button>

          <Link
            href="/graph"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Share2 className="h-3.5 w-3.5 text-slate-400" />
            <span>Threat Graph</span>
          </Link>
        </div>
      </div>

      {/* Technology Stack Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Integrated Technologies & Standards
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 space-y-1 hover:bg-white hover:border-slate-200 transition-all shadow-2xs"
            >
              <div className="font-mono text-xs font-bold text-slate-900">{tech.name}</div>
              <p className="text-[11px] text-slate-400 leading-tight">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance & Problem Statement Notice */}
      <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <span className="font-bold text-slate-800">Smart India Hackathon 2024 / 2025</span>
          <p className="text-[11px] text-slate-400 font-mono">
            Problem Statement ID: SIH PS 26106 • Cyber Forensics & Anti-Phishing Domain
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-bold text-emerald-800 self-start sm:self-auto">
          Operational Build
        </span>
      </div>

      {/* Documentation Modal */}
      {isDocsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={() => setIsDocsOpen(false)} />
          <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl z-10 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Threat Shield Documentation Reference</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDocsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 text-xs text-slate-600 leading-relaxed pr-2">
              <section className="space-y-1">
                <h4 className="font-bold text-slate-900">1. Email Header Extraction</h4>
                <p>Ingests raw RFC 5322 email headers and parses Received hops, SPF, DKIM, DMARC, Return-Path, and X-Originating-IP tags.</p>
              </section>

              <section className="space-y-1">
                <h4 className="font-bold text-slate-900">2. Threat Classification & XAI</h4>
                <p>A multi-stage classification pipeline applies natural language semantic parsing and header heuristic scoring, outputting SHAP/LIME feature attributions.</p>
              </section>

              <section className="space-y-1">
                <h4 className="font-bold text-slate-900">3. Infrastructure Geolocation</h4>
                <p>Traces the physical host nodes of observed MTAs and C2 proxies without attributing identity, ensuring compliance with forensic standards.</p>
              </section>

              <section className="space-y-1">
                <h4 className="font-bold text-slate-900">4. Relationship Graph</h4>
                <p>Constructs bipartite connection networks linking IPs, domains, hashes, and campaigns to uncover coordinated adversarial clusters.</p>
              </section>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsDocsOpen(false)}
                className="rounded-xl bg-slate-900 px-4 py-2 font-bold text-white text-xs hover:bg-slate-800"
              >
                Close Documentation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Architecture Modal */}
      {isArchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={() => setIsArchOpen(false)} />
          <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl z-10 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Network className="h-4 w-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">System Architecture Overview</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsArchOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 text-xs text-slate-600 leading-relaxed pr-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4 text-slate-200 font-mono text-[11px] space-y-2">
                <div>[Client Console: Next.js 16 + React 19]</div>
                <div className="text-emerald-400 pl-4">↓ HTTPS / REST & Server Actions</div>
                <div>[API Gateway & Next.js App Router]</div>
                <div className="text-cyan-400 pl-4">├── MySQL Database (Incident Dossiers & Evidence Hashes)</div>
                <div className="text-cyan-400 pl-4">├── Python AI Service (PyTorch, SHAP / LIME Feature Engine)</div>
                <div className="text-cyan-400 pl-4">├── Neo4j Graph Database (Adversarial Relationship Graph)</div>
                <div className="text-cyan-400 pl-4">└── External OSINT Feeds (VirusTotal, AbuseIPDB, MaxMind, RDAP)</div>
              </div>

              <p>
                Microservices communicate via secure internal Docker network channels, ensuring separation of concerns between web presentation, machine learning classification, and graph relationship querying.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsArchOpen(false)}
                className="rounded-xl bg-slate-900 px-4 py-2 font-bold text-white text-xs hover:bg-slate-800"
              >
                Close Architecture
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
