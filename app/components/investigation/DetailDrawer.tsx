'use client';

import React from 'react';
import { X, ExternalLink, ShieldAlert, Globe, Server, Link2, Target, ArrowRight } from 'lucide-react';
import { DetailDrawerData } from '@/app/types/investigation';

interface Props {
  drawerData: DetailDrawerData;
  onClose: () => void;
  onNavigateThreatIntelligence: (entityName: string) => void;
}

export const DetailDrawer: React.FC<Props> = ({
  drawerData,
  onClose,
  onNavigateThreatIntelligence,
}) => {
  if (!drawerData.isOpen) return null;

  const getIcon = () => {
    switch (drawerData.type) {
      case 'ip':
        return <Server className="h-5 w-5 text-rose-600" />;
      case 'domain':
        return <Globe className="h-5 w-5 text-indigo-600" />;
      case 'url':
        return <Link2 className="h-5 w-5 text-cyan-600" />;
      case 'campaign':
        return <Target className="h-5 w-5 text-purple-600" />;
      default:
        return <ShieldAlert className="h-5 w-5 text-emerald-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 border border-slate-200">
                  {getIcon()}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Forensic Telemetry Drawer
                  </span>
                  <h2 className="text-base font-extrabold text-slate-900 font-mono">
                    {drawerData.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                aria-label="Close drawer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Subtitle / Reputation Tag */}
            {drawerData.reputation && (
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2.5">
                <span className="text-xs font-bold text-slate-700">Threat Intelligence Score</span>
                <span className="font-mono text-xs font-extrabold text-rose-700">
                  🔴 {drawerData.reputation}
                </span>
              </div>
            )}

            {/* Attributes Grid */}
            <div className="mt-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Entity Technical Telemetry
              </h3>

              <div className="grid grid-cols-1 gap-2.5">
                {Object.entries(drawerData.attributes).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 p-3 text-xs"
                  >
                    <span className="font-semibold text-slate-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="font-mono font-bold text-slate-900 truncate max-w-[200px]">
                      {String(val)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross Correlation Metrics */}
            <div className="mt-6 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Threat Network Overlap
              </h3>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <div className="font-mono text-base font-extrabold text-slate-900">15</div>
                  <div className="text-[10px] font-semibold text-slate-500">Related Emails</div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <div className="font-mono text-base font-extrabold text-slate-900">7</div>
                  <div className="text-[10px] font-semibold text-slate-500">Related Domains</div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <div className="font-mono text-base font-extrabold text-slate-900">4</div>
                  <div className="text-[10px] font-semibold text-slate-500">Related Cases</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                onNavigateThreatIntelligence(drawerData.title);
                onClose();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              <span>View in Threat Intelligence</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
