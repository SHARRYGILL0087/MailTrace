'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  MailSearch, 
  ShieldAlert, 
  BrainCircuit, 
  Share2, 
  Globe2, 
  FileText, 
  Settings 
} from 'lucide-react';

const navigationRoutes = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: MailSearch, label: 'Analyze Email', href: '/analyze' },
  { icon: ShieldAlert, label: 'Investigations', href: '/investigations' },
  { icon: BrainCircuit, label: 'Threat Intelligence', href: '/threat-intelligence' },
  { icon: Share2, label: 'Threat Graph', href: '/threat-graph' },
  { icon: Globe2, label: 'Geolocation', href: '/geolocation' },
  { icon: FileText, label: 'Reports', href: '/reports' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-24 hidden h-[calc(100vh-8rem)] w-60 flex-col rounded-3xl border border-slate-200/80 bg-white p-3.5 shadow-sm md:flex shrink-0">
      <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
        Command Center
      </div>

      <nav className="flex-1 space-y-1 mt-1">
        {navigationRoutes.map((route) => {
          const Icon = route.icon;
          const isActive = 
            pathname === route.href || 
            (route.href !== '/' && pathname.startsWith(route.href)) ||
            (route.href === '/threat-graph' && pathname === '/graph');
          return (
            <Link
              key={route.label}
              href={route.href}
              className={`group flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-50 text-emerald-800 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-0.5'
              }`}
            >
              <Icon
                className={`h-4 w-4 transition-colors duration-200 ${
                  isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-emerald-600'
                }`}
              />
              <span>{route.label}</span>
            </Link>
          );
        })}
      </nav>


      {/* Cluster Node Status Widget */}
      <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-700">Cluster US-East-1</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </div>
        <p className="mt-0.5 text-[10px] text-slate-400">Active Sensors: 1,420</p>
      </div>
    </aside>
  );
};