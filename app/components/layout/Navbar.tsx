'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, HelpCircle, ChevronDown } from 'lucide-react';
import { ThreatShieldLogo } from '@/app/components/ui/ThreatShieldLogo';

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Analyze Email', href: '/analyze' },
    { label: 'Threat Graph', href: '/threat-graph' },
    { label: 'Investigations', href: '/investigations' },
    { label: 'Threat Intelligence', href: '/threat-intelligence' },
    { label: 'Reports', href: '/reports' },
  ];

  return (
    <header className="sticky top-4 z-40 px-4 md:px-8 mb-6">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-slate-200/80 bg-white/95 px-6 shadow-sm backdrop-blur-md transition-all">
        
        {/* Left Identity */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 group-hover:scale-105 group-hover:shadow-blue-500/35 transition-all">
            <ThreatShieldLogo size={24} variant="on-blue" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              Threat Shield
            </span>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 border border-blue-200/80 shadow-2xs">
              AI
            </span>
          </div>
        </Link>

        {/* Center Main Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-50/90 text-emerald-800'
                    : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>


        {/* Right Status & Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/70 px-3 py-1 text-xs font-medium text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            System Operational
          </div>

          <div className="flex items-center gap-1 border-l border-slate-200 pl-3">
            <button aria-label="Search" className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-colors">
              <Search className="h-4 w-4" />
            </button>
            <button aria-label="Notifications" className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-emerald-600" />
            </button>
            <button aria-label="Help" className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-colors">
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-3 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700 border border-slate-200">
              IR
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>

      </div>
    </header>
  );
};