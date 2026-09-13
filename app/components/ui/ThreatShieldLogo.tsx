'use client';

import React from 'react';

interface ThreatShieldLogoProps {
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'blue' | 'on-blue';
  showText?: boolean;
  textClassName?: string;
  badgeClassName?: string;
  showAIBadge?: boolean;
}

const SIZE_MAP = {
  sm: 24,
  md: 36,
  lg: 48,
  xl: 64,
};

export const ThreatShieldLogo: React.FC<ThreatShieldLogoProps> = ({
  size = 'md',
  className = '',
  variant = 'blue',
  showText = false,
  textClassName = '',
  badgeClassName = '',
  showAIBadge = false,
}) => {
  const pixelSize = typeof size === 'number' ? size : SIZE_MAP[size] || 36;
  const idPrefix = React.useId().replace(/:/g, '');
  const isOnBlue = variant === 'on-blue';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* SVG Shield Emblem */}
      <svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        style={{
          filter: isOnBlue
            ? 'drop-shadow(0 2px 8px rgba(30, 58, 138, 0.35))'
            : 'drop-shadow(0 4px 12px rgba(37, 99, 235, 0.25))',
        }}
      >
        <defs>
          {isOnBlue ? (
            <>
              {/* On-Blue Variant: Crisp White, Ice Blue & Cyan Facets */}
              <linearGradient id={`${idPrefix}-facet-left`} x1="10" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#BAE6FD" />
                <stop offset="50%" stopColor="#7DD3FC" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>

              <linearGradient id={`${idPrefix}-facet-right`} x1="50" y1="5" x2="90" y2="95" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#F0F9FF" />
                <stop offset="100%" stopColor="#E0F2FE" />
              </linearGradient>

              <linearGradient id={`${idPrefix}-edge-glow`} x1="10" y1="5" x2="90" y2="95" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#BAE6FD" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id={`${idPrefix}-inner-left`} x1="20" y1="18" x2="50" y2="82" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>

              <linearGradient id={`${idPrefix}-inner-right`} x1="50" y1="18" x2="80" y2="82" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>

              <linearGradient id={`${idPrefix}-core-left`} x1="26" y1="24" x2="50" y2="76" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="100%" stopColor="#BAE6FD" />
              </linearGradient>

              <linearGradient id={`${idPrefix}-core-right`} x1="50" y1="24" x2="74" y2="76" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E0F2FE" />
              </linearGradient>

              <linearGradient id={`${idPrefix}-specular`} x1="50" y1="20" x2="50" y2="78" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#E0F2FE" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </>
          ) : (
            <>
              {/* Normal Blue Variant: Rich Royal Blue, Cobalt & Sky Accents */}
              <linearGradient id={`${idPrefix}-facet-left`} x1="10" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1D4ED8" />
                <stop offset="50%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1E40AF" />
              </linearGradient>

              <linearGradient id={`${idPrefix}-facet-right`} x1="50" y1="5" x2="90" y2="95" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>

              <linearGradient id={`${idPrefix}-edge-glow`} x1="10" y1="5" x2="90" y2="95" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#60A5FA" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id={`${idPrefix}-inner-left`} x1="20" y1="18" x2="50" y2="82" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1E40AF" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>

              <linearGradient id={`${idPrefix}-inner-right`} x1="50" y1="18" x2="80" y2="82" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>

              <linearGradient id={`${idPrefix}-core-left`} x1="26" y1="24" x2="50" y2="76" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>

              <linearGradient id={`${idPrefix}-core-right`} x1="50" y1="24" x2="74" y2="76" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>

              <linearGradient id={`${idPrefix}-specular`} x1="50" y1="20" x2="50" y2="78" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="30%" stopColor="#E0F2FE" />
                <stop offset="70%" stopColor="#93C5FD" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
            </>
          )}

          {/* Glow Filter */}
          <filter id={`${idPrefix}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. OUTER SHIELD BASE & GLOW STROKE */}
        <path
          d="M50 5 L86 15 L90 23 L86 52 L68 74 L50 95 L32 74 L14 52 L10 23 L14 15 Z"
          fill="none"
          stroke={`url(#${idPrefix}-edge-glow)`}
          strokeWidth="1.5"
          strokeLinejoin="miter"
        />

        {/* 2. OUTER SHIELD 3D FACETS */}
        {/* Left Facet */}
        <path
          d="M50 6 L15 15.5 L11.5 23 L15 51.5 L32.5 73.5 L50 94 Z"
          fill={`url(#${idPrefix}-facet-left)`}
        />
        {/* Right Facet */}
        <path
          d="M50 6 L85 15.5 L88.5 23 L85 51.5 L67.5 73.5 L50 94 Z"
          fill={`url(#${idPrefix}-facet-right)`}
        />

        {/* 3. INNER RECESSED WELL */}
        <path
          d="M50 14 L22 22 L19 27 L22 48 L35 67 L50 84 Z"
          fill={`url(#${idPrefix}-inner-left)`}
          stroke={isOnBlue ? 'rgba(255, 255, 255, 0.4)' : 'rgba(147, 197, 253, 0.4)'}
          strokeWidth="0.8"
        />
        <path
          d="M50 14 L78 22 L81 27 L78 48 L65 67 L50 84 Z"
          fill={`url(#${idPrefix}-inner-right)`}
          stroke={isOnBlue ? 'rgba(255, 255, 255, 0.6)' : 'rgba(147, 197, 253, 0.5)'}
          strokeWidth="0.8"
        />

        {/* 4. CYBER ACCENT SLITS */}
        <path
          d="M21 34 L27 38 L25 41 L19 37 Z"
          fill={isOnBlue ? '#BAE6FD' : '#3B82F6'}
          opacity="0.9"
        />
        <path
          d="M23 44 L28 48 L26 50.5 L21 46.5 Z"
          fill={isOnBlue ? '#7DD3FC' : '#60A5FA'}
          opacity="0.85"
        />
        <path
          d="M79 34 L73 38 L75 41 L81 37 Z"
          fill={isOnBlue ? '#FFFFFF' : '#60A5FA'}
          opacity="0.95"
        />
        <path
          d="M77 44 L72 48 L74 50.5 L79 46.5 Z"
          fill={isOnBlue ? '#E0F2FE' : '#93C5FD'}
          opacity="0.9"
        />

        {/* 5. CENTRAL SHARP THREAT EMBLEM - STEALTH "T" & CORE */}
        <path
          d="M50 21 L75 28.5 L66.5 35 L50 30.5 Z"
          fill={`url(#${idPrefix}-core-right)`}
        />
        <path
          d="M50 21 L25 28.5 L33.5 35 L50 30.5 Z"
          fill={`url(#${idPrefix}-core-left)`}
        />

        {/* Blade Shaft */}
        <path
          d="M50 30.5 L42 41 L45 58 L50 76 Z"
          fill={`url(#${idPrefix}-core-left)`}
        />
        <path
          d="M50 30.5 L58 41 L55 58 L50 76 Z"
          fill={`url(#${idPrefix}-core-right)`}
        />

        {/* Inner Bevel */}
        <path
          d="M50 34 L54 41 L52 54 L50 67 L48 54 L46 41 Z"
          fill={isOnBlue ? '#0369A1' : '#1E3A8A'}
          opacity="0.75"
        />

        {/* 6. CENTRAL LASER SPINE */}
        <line
          x1="50"
          y1="8"
          x2="50"
          y2="92"
          stroke={`url(#${idPrefix}-specular)`}
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.95"
        />

        {/* Central Diamond Node */}
        <path
          d="M50 37 L54 41 L50 45 L46 41 Z"
          fill={`url(#${idPrefix}-specular)`}
          filter={`url(#${idPrefix}-glow)`}
        />
        <circle cx="50" cy="41" r="1.3" fill="#FFFFFF" />
        <circle cx="50" cy="6" r="1.5" fill="#FFFFFF" />
      </svg>

      {/* Optional Logotype Text */}
      {showText && (
        <div className="flex items-center gap-2">
          <span className={`text-base font-extrabold tracking-tight text-slate-900 ${textClassName}`}>
            Threat Shield
          </span>
          {showAIBadge && (
            <span
              className={`rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200 shadow-2xs ${badgeClassName}`}
            >
              AI
            </span>
          )}
        </div>
      )}
    </div>
  );
};
