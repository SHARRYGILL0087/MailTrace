'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RefreshCw, 
  Locate, 
  Layers, 
  Filter, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  Globe2, 
  ExternalLink,
  Flame,
  AlertTriangle,
  CheckCircle2,
  Server
} from 'lucide-react';
import { InfrastructureLocation, GeoFilterState, RiskLevel } from '@/app/types/geo';

interface InfrastructureMapProps {
  locations: InfrastructureLocation[];
  filters: GeoFilterState;
  onFilterChange: (updates: Partial<GeoFilterState>) => void;
  selectedLocation: InfrastructureLocation | null;
  onSelectLocation: (location: InfrastructureLocation | null) => void;
}

export const getRiskMarkerStyle = (risk: RiskLevel) => {
  switch (risk) {
    case 'critical':
      return {
        bg: 'bg-rose-600',
        ring: 'ring-rose-400/40',
        pulse: 'animate-ping bg-rose-500',
        border: 'border-rose-300',
        text: 'text-rose-700',
        badge: 'bg-rose-50 text-rose-700 border-rose-200',
        label: 'Critical Risk',
      };
    case 'high':
      return {
        bg: 'bg-orange-500',
        ring: 'ring-orange-400/40',
        pulse: 'animate-pulse bg-orange-400',
        border: 'border-orange-300',
        text: 'text-orange-700',
        badge: 'bg-orange-50 text-orange-700 border-orange-200',
        label: 'High Risk',
      };
    case 'medium':
      return {
        bg: 'bg-amber-500',
        ring: 'ring-amber-400/40',
        pulse: '',
        border: 'border-amber-300',
        text: 'text-amber-700',
        badge: 'bg-amber-50 text-amber-700 border-amber-200',
        label: 'Medium Risk',
      };
    case 'low':
    case 'safe':
    default:
      return {
        bg: 'bg-emerald-500',
        ring: 'ring-emerald-400/40',
        pulse: '',
        border: 'border-emerald-300',
        text: 'text-emerald-700',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        label: 'Low / Trusted',
      };
  }
};

// Map lat/long to Mercator SVG coordinates inside 1000x500 box
const latLngToCoords = (lat: number, lng: number) => {
  const x = (lng + 180) * (1000 / 360);
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = 250 - (1000 * mercN) / (2 * Math.PI);
  return { x: Math.max(50, Math.min(950, x)), y: Math.max(40, Math.min(460, y)) };
};

export const InfrastructureMap: React.FC<InfrastructureMapProps> = ({
  locations,
  filters,
  onFilterChange,
  selectedLocation,
  onSelectLocation,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [hoveredLocation, setHoveredLocation] = useState<InfrastructureLocation | null>(null);

  // Filtered locations
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      if (filters.riskLevel !== 'all' && loc.risk !== filters.riskLevel) return false;
      if (filters.region !== 'all' && loc.region !== filters.region) return false;
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchIp = loc.ip.toLowerCase().includes(q);
        const matchCountry = loc.country.toLowerCase().includes(q);
        const matchCity = loc.city.toLowerCase().includes(q);
        const matchProvider = loc.provider.toLowerCase().includes(q);
        const matchAsn = loc.asn.toLowerCase().includes(q);
        if (!matchIp && !matchCountry && !matchCity && !matchProvider && !matchAsn) return false;
      }
      return true;
    });
  }, [locations, filters]);

  // Handle Zoom
  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.min(Math.max(0.8, prev + delta), 2.5));
  };

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm flex flex-col justify-between">
      
      {/* Header & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">🌍 Global Infrastructure Map</h2>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 border border-blue-100">
              {filteredLocations.length} Nodes Plotted
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Observed IP and hosting infrastructure associated with investigated email threats.
          </p>
        </div>

        {/* Top-Right Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Search Box */}
          <div className="relative min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Search IP, country, city, domain..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Time Range */}
          <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={filters.timeRange}
              onChange={(e) => onFilterChange({ timeRange: e.target.value as any })}
              className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
            </select>
          </div>

          {/* Risk Dropdown */}
          <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
            <ShieldAlert className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={filters.riskLevel}
              onChange={(e) => onFilterChange({ riskLevel: e.target.value as RiskLevel | 'all' })}
              className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="all">All Risks</option>
              <option value="critical">🔴 Critical</option>
              <option value="high">🟠 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main World Map Canvas */}
      <div 
        className="relative h-[480px] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-[#F0F4F8] shadow-inner select-none"
        onClick={() => onSelectLocation(null)}
      >
        {/* Floating Map Controls (Top-Right) */}
        <div className="absolute right-4 top-4 z-30 flex flex-col gap-1 rounded-2xl border border-slate-200/80 bg-white/95 p-1.5 shadow-md backdrop-blur-md">
          <button
            onClick={(e) => { e.stopPropagation(); handleZoom(0.2); }}
            title="Zoom In"
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleZoom(-0.2); }}
            title="Zoom Out"
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setZoom(1); }}
            title="Fit All"
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onFilterChange({ searchQuery: '', riskLevel: 'all' }); }}
            title="Refresh Map"
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {/* Floating Compact Legend (Bottom-Left) */}
        <div className="absolute left-4 bottom-4 z-30 rounded-2xl border border-slate-200/80 bg-white/95 p-3 shadow-md backdrop-blur-md text-[11px] space-y-1">
          <div className="font-bold text-slate-700 mb-1 flex items-center gap-1">
            <Globe2 className="h-3.5 w-3.5 text-blue-600" /> Map Legend
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-500" /> Critical</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-orange-500" /> High</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> Medium</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Low</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500 pt-0.5 border-t border-slate-100">
            <span className="flex items-center gap-1">🖥️ IP</span>
            <span className="flex items-center gap-1">☁️ Hosting</span>
            <span className="flex items-center gap-1">🎯 Campaign</span>
          </div>
        </div>

        {/* Vector World Map Viewport */}
        <div 
          className="absolute inset-0 transition-transform duration-200 origin-center"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Light World Map Outlines (Stylized SVG Projection) */}
          <svg viewBox="0 0 1000 500" className="h-full w-full opacity-40">
            <path
              d="M150,150 Q180,120 220,140 Q250,160 280,130 L300,200 Q260,250 200,220 Z M350,120 Q450,100 520,130 Q580,180 500,240 Q400,250 350,190 Z M650,140 Q750,120 850,160 Q900,220 820,280 Q720,260 650,200 Z M220,300 Q260,280 300,340 Q280,420 220,400 Z M750,340 Q820,320 860,380 Q800,440 740,400 Z"
              fill="#CBD5E1"
              stroke="#94A3B8"
              strokeWidth="1"
            />
            {/* Grid lines */}
            <line x1="0" y1="250" x2="1000" y2="250" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="500" y1="0" x2="500" y2="500" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          {/* Infrastructure Markers */}
          {filteredLocations.map((loc) => {
            const coords = latLngToCoords(loc.latitude, loc.longitude);
            const style = getRiskMarkerStyle(loc.risk);
            const isSelected = selectedLocation?.id === loc.id;
            const isHovered = hoveredLocation?.id === loc.id;

            return (
              <div
                key={loc.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectLocation(loc);
                }}
                onMouseEnter={() => setHoveredLocation(loc)}
                onMouseLeave={() => setHoveredLocation(null)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                style={{ left: `${coords.x / 10}%`, top: `${coords.y / 5}%` }}
              >
                {/* Marker Pin */}
                <div className={`relative flex items-center justify-center transition-all duration-200 ${
                  isSelected ? 'scale-125 z-30' : isHovered ? 'scale-110 z-30' : 'scale-100 z-10'
                }`}>
                  {/* Pulsing ring for high risk */}
                  {style.pulse && (
                    <span className={`absolute h-7 w-7 rounded-full opacity-75 ${style.pulse}`} />
                  )}
                  
                  {/* Main Marker Badge */}
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full text-white font-bold text-xs shadow-md border-2 border-white ${style.bg} ${
                    isSelected ? 'ring-4 ring-blue-400' : 'hover:ring-2 hover:ring-blue-300'
                  }`}>
                    {loc.flag}
                  </div>
                </div>

                {/* Hover Tooltip (Section 9 Prompt Spec) */}
                {isHovered && !isSelected && (
                  <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-48 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-40 text-xs animate-in fade-in zoom-in-95 pointer-events-none">
                    <div className="flex items-center justify-between font-bold text-slate-900 pb-1 border-b border-slate-100">
                      <span className="flex items-center gap-1">📍 {loc.city}, {loc.country}</span>
                      <span className={`rounded-full border px-1.5 py-0.2 text-[9px] font-extrabold ${style.badge}`}>
                        {loc.risk.toUpperCase()}
                      </span>
                    </div>

                    <div className="mt-2 space-y-1 text-[11px] text-slate-600">
                      <div className="flex justify-between">
                        <span>IP:</span> <strong className="text-slate-900 font-mono">{loc.ip}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Provider:</span> <strong className="text-slate-800 truncate max-w-[90px]">{loc.provider}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Related Emails:</span> <strong className="text-blue-700 font-extrabold">{loc.relatedEmails}</strong>
                      </div>
                    </div>

                    <div className="mt-2 text-[10px] font-bold text-blue-600 flex items-center justify-end gap-1">
                      <span>View Details</span>
                      <ExternalLink className="h-3 w-3" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
