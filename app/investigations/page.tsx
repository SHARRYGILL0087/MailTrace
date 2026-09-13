'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/app/components/layout/Navbar';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { ShieldAlert, ArrowRight, AlertTriangle, CheckCircle2, Clock, Filter, Search } from 'lucide-react';
import { MOCK_INVESTIGATION_DATA } from '@/app/data/mockInvestigationData';

export default function InvestigationsListPage() {
  const activeCase = MOCK_INVESTIGATION_DATA;

  const demoCases = [
    {
      id: activeCase.id,
      title: activeCase.title,
      riskScore: activeCase.riskScore,
      riskLevel: activeCase.riskLevel,
      status: activeCase.status,
      sender: 'accounts@company-support.com',
      date: '01 Sep 2026, 10:32 AM',
      isActive: true,
    },
    {
      id: 'INV-2026-00481',
      title: 'Urgent Executive Payroll Wire Transfer Request',
      riskScore: 89,
      riskLevel: 'HIGH RISK',
      status: 'Contained',
      sender: 'ceo-office@enterprise-holdings.co',
      date: '31 Aug 2026, 16:45 PM',
      isActive: false,
    },
    {
      id: 'INV-2026-00480',
      title: 'Active Directory Re-authentication Credential Harvesting',
      riskScore: 97,
      riskLevel: 'HIGH RISK',
      status: 'Escalated',
      sender: 'security@sso-domain-verify.net',
      date: '31 Aug 2026, 14:12 PM',
      isActive: false,
    },
    {
      id: 'INV-2026-00479',
      title: 'Malicious AirWaybill Attachment Payload Delivery',
      riskScore: 78,
      riskLevel: 'MEDIUM RISK',
      status: 'Resolved',
      sender: 'delivery@cargo-tracking-express.in',
      date: '30 Aug 2026, 09:20 AM',
      isActive: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex gap-6">
          <Sidebar />

          <div className="flex-1 space-y-6 min-w-0">
            {/* Header */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                  <span>🕵️</span> Forensic Investigations Workspace
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Active threats under active SOC analyst triage and forensic investigation
                </p>
              </div>

              <Link
                href={`/investigation/${activeCase.id}`}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition-all self-start md:self-auto"
              >
                <span>View Active Case #{activeCase.id}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-2xs">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter investigations by ID, domain, sender..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100">
                  <Filter className="h-3.5 w-3.5 text-slate-400" />
                  <span>All Statuses</span>
                </button>
              </div>
            </div>

            {/* Investigations Table */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900">Active Forensic Cases</h2>

              <div className="space-y-3">
                {demoCases.map((c) => (
                  <Link
                    key={c.id}
                    href={`/investigation/${c.id}`}
                    className={`group flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border p-4 transition-all ${
                      c.isActive
                        ? 'border-blue-300 bg-blue-50/40 shadow-xs'
                        : 'border-slate-100 bg-slate-50/60 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-extrabold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-md">
                          {c.id}
                        </span>
                        <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {c.title}
                        </h3>
                        {c.isActive && (
                          <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
                            Active Session
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-mono">
                        From: {c.sender} • {c.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 self-end md:self-auto">
                      <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-extrabold text-rose-700">
                        {c.riskScore}/100 Risk
                      </span>

                      <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-800">
                        {c.status}
                      </span>

                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
