'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  Globe2, 
  Share2, 
  FolderPlus, 
  Download, 
  ArrowUpRight 
} from 'lucide-react';
import { ThreatIntelligenceResponse } from '@/app/types/threatIntel';

interface Props {
  data: ThreatIntelligenceResponse;
  onCreateCase: () => void;
  onExport: () => void;
}

export const IntelActionPanel: React.FC<Props> = ({ data, onCreateCase, onExport }) => {
  const activeCaseId = data.related_cases.length > 0 ? data.related_cases[0].id : null;

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h3 className="text-sm font-bold text-slate-900">Analyst Action Center</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Take forensic mitigation actions or export dossier telemetry for incident reports
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        
        {/* Open Investigation */}
        {activeCaseId ? (
          <Link
            href={`/investigation/${activeCaseId}`}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:from-emerald-700 hover:to-teal-700 transition-all cursor-pointer"
          >
            <ShieldAlert className="h-4 w-4" />
            <span>Open Investigation</span>
          </Link>
        ) : (
          <Link
            href="/investigations"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:from-emerald-700 hover:to-teal-700 transition-all cursor-pointer"
          >
            <ShieldAlert className="h-4 w-4" />
            <span>Open Investigations</span>
          </Link>
        )}

        {/* View Geolocation */}
        <Link
          href="/geolocation"
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <Globe2 className="h-4 w-4 text-slate-500" />
          <span>View Geolocation</span>
        </Link>

        {/* Open Threat Graph */}
        <Link
          href="/graph"
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <Share2 className="h-4 w-4 text-slate-500" />
          <span>Open Threat Graph</span>
        </Link>

        {/* Create Case */}
        <button
          type="button"
          onClick={onCreateCase}
          className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/70 px-3.5 py-2.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
        >
          <FolderPlus className="h-4 w-4 text-emerald-600" />
          <span>Create Case</span>
        </button>

        {/* Export Intelligence */}
        <button
          type="button"
          onClick={onExport}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <Download className="h-4 w-4 text-slate-500" />
          <span>Export Intelligence</span>
        </button>

      </div>
    </div>
  );
};
