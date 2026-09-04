'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Info } from 'lucide-react';

interface GeoErrorStateProps {
  onRetry?: () => void;
}

export const GeoErrorState: React.FC<GeoErrorStateProps> = ({ onRetry }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
      {/* 1. API Error */}
      <div className="rounded-3xl border border-rose-200 bg-rose-50/50 p-6 text-left shadow-xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-rose-950">Geolocation API Error</h4>
            <p className="text-xs font-semibold text-rose-800">Unable to retrieve location data</p>
          </div>
        </div>
        <p className="text-xs text-rose-900 leading-relaxed mb-4">
          Threat intelligence is available, but location information could not be retrieved from the primary geolocation resolver.
        </p>
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-2xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-rose-700 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Retry Lookup</span>
        </button>
      </div>

      {/* 2. Invalid / Private IP Warning */}
      <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-6 text-left shadow-xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-950">Invalid or Reserved IP</h4>
            <p className="text-xs font-semibold text-amber-800">Location unavailable for this address</p>
          </div>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed">
          Private, reserved (RFC1918), loopback, anonymized, or unsupported addresses do not possess public geographic routing data.
        </p>
      </div>
    </div>
  );
};
