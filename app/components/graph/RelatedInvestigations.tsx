'use client';

import React from 'react';
import { ShieldAlert, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const RelatedInvestigations: React.FC = () => {
  const cases = [
    {
      id: 'INV-2026-00482',
      title: 'Suspicious Invoice Wire Fraud',
      type: 'Phishing',
      risk: 91,
      severity: 'Critical',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      id: 'INV-2026-00418',
      title: 'Executive Assistant Email Spoofing',
      type: 'BEC',
      risk: 88,
      severity: 'High Risk',
      badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    },
    {
      id: 'INV-2026-00407',
      title: 'IT Helpdesk Account Takeover',
      type: 'Impersonation',
      risk: 84,
      severity: 'High Risk',
      badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm flex flex-col justify-between h-full flex-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">🔗 Related Investigations</h3>
            <p className="text-xs text-slate-500">Active threat cases connected to this relationship graph</p>
          </div>
        </div>

        <Link
          href="/investigations"
          className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
        >
          <span>View All Investigations</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
        {cases.map((c) => (
          <Link
            key={c.id}
            href={`/investigation?id=${c.id}`}
            className="group rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all hover:bg-white hover:border-blue-300 hover:shadow-md flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold font-mono text-blue-700 group-hover:text-blue-800">
                  {c.id}
                </span>
                <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${c.badgeBg}`}>
                  {c.severity}
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                {c.title}
              </h4>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-slate-200/60 pt-2.5 text-[11px]">
              <span className="text-slate-500">Type: <strong className="text-slate-800 font-semibold">{c.type}</strong></span>
              <span className="text-slate-500">Risk Score: <strong className="text-rose-600 font-bold">{c.risk}/100</strong></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
