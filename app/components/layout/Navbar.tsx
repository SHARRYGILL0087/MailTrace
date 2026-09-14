'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  ChevronDown, 
  X, 
  Settings, 
  ShieldAlert, 
  User, 
  ExternalLink, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  LogOut,
  Sparkles,
  Shield,
  FileText,
  Mail,
  ArrowRight
} from 'lucide-react';
import { ThreatShieldLogo } from '@/app/components/ui/ThreatShieldLogo';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Dropdown and modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Refs for click outside
  const notificationsRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (notificationsRef.current && !notificationsRef.current.contains(target)) {
        setIsNotificationsOpen(false);
      }
      if (helpRef.current && !helpRef.current.contains(target)) {
        setIsHelpOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut (Cmd+K / Ctrl+K) for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsNotificationsOpen(false);
        setIsHelpOpen(false);
        setIsProfileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus search input on open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Mock Notifications Data
  const notifications = [
    {
      id: 1,
      title: 'Critical Phishing Campaign Detected',
      desc: 'CEO Spoofing attempt flagged with 98% AI confidence.',
      time: '5m ago',
      unread: true,
      href: '/investigations',
    },
    {
      id: 2,
      title: 'VirusTotal Sync Completed',
      desc: 'Threat hash 7f8a9... correlated across 68 AV engines.',
      time: '34m ago',
      unread: true,
      href: '/threat-intelligence',
    },
    {
      id: 3,
      title: 'Investigation Report Generated',
      desc: 'Forensic PDF ready for Case #INV-2026-084.',
      time: '2h ago',
      unread: false,
      href: '/reports',
    },
  ];

  // Quick search results
  const searchSuggestions = [
    { type: 'Quick Action', title: 'Analyze Suspicious Email (.eml)', href: '/analyze', icon: Mail },
    { type: 'Investigation', title: 'INV-2026-001 • Urgent Wire Transfer Phish', href: '/investigations', icon: ShieldAlert },
    { type: 'Threat Graph', title: 'Inspect Multi-hop Relay Infrastructure', href: '/threat-graph', icon: Sparkles },
    { type: 'Reports', title: 'Forensic Evidence Archive', href: '/reports', icon: FileText },
    { type: 'Settings', title: 'Threat Intelligence API Keys & AI Config', href: '/settings', icon: Settings },
  ].filter(item => 
    !searchQuery.trim() || 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="sticky top-4 z-40 px-4 md:px-8 mb-6">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-slate-200/80 bg-white/95 px-5 sm:px-6 shadow-sm backdrop-blur-md transition-all">
          
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

          {/* Right Action Icons & User Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* System Operational Badge */}
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/70 px-3 py-1 text-xs font-medium text-emerald-800 mr-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              System Operational
            </div>

            {/* Divider 1 */}
            <div className="h-5 w-px bg-slate-200 mx-1" />

            {/* 1. Search Button */}
            <button
              id="navbar-search-btn"
              type="button"
              onClick={() => setIsSearchOpen(true)}
              title="Search indicators, investigations or reports (Ctrl+K)"
              className="group flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <Search className="h-[18px] w-[18px] transition-transform group-hover:scale-105" />
            </button>

            {/* 2. Notification Bell with Blue Dot */}
            <div className="relative" ref={notificationsRef}>
              <button
                id="navbar-notifications-btn"
                type="button"
                onClick={() => {
                  setIsNotificationsOpen((prev) => !prev);
                  setIsHelpOpen(false);
                  setIsProfileOpen(false);
                }}
                title="Notifications"
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <Bell className="h-[18px] w-[18px]" />
                {hasUnread && (
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">Notifications</span>
                      {hasUnread && (
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                          New
                        </span>
                      )}
                    </div>
                    {hasUnread && (
                      <button
                        onClick={() => setHasUnread(false)}
                        className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-slate-100 mt-2 max-h-72 overflow-y-auto">
                    {notifications.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setIsNotificationsOpen(false)}
                        className="block py-2.5 px-2 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </p>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{item.time}</span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-slate-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 text-center">
                    <Link
                      href="/investigations"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                    >
                      View incident feed <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Help Circle Button */}
            <div className="relative" ref={helpRef}>
              <button
                id="navbar-help-btn"
                type="button"
                onClick={() => {
                  setIsHelpOpen((prev) => !prev);
                  setIsNotificationsOpen(false);
                  setIsProfileOpen(false);
                }}
                title="Help & Documentation"
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <HelpCircle className="h-[18px] w-[18px]" />
              </button>

              {/* Help Dropdown */}
              {isHelpOpen && (
                <div className="absolute right-0 mt-3 w-72 sm:w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                    <HelpCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-bold text-slate-900">Forensics Help & Guide</span>
                  </div>

                  <div className="mt-3 space-y-2 text-xs">
                    <Link
                      href="/analyze"
                      onClick={() => setIsHelpOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-slate-400" /> How to analyze .eml headers
                      </span>
                      <ArrowRight className="h-3 w-3 text-slate-400" />
                    </Link>
                    <Link
                      href="/threat-graph"
                      onClick={() => setIsHelpOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-slate-400" /> Threat Graph interactive guide
                      </span>
                      <ArrowRight className="h-3 w-3 text-slate-400" />
                    </Link>
                    <Link
                      href="/threat-intelligence"
                      onClick={() => setIsHelpOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Shield className="h-3.5 w-3.5 text-slate-400" /> VirusTotal & AbuseIPDB intel
                      </span>
                      <ArrowRight className="h-3 w-3 text-slate-400" />
                    </Link>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Threat Shield v4.2</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> SOC Online
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Settings Button */}
            <Link
              id="navbar-settings-btn"
              href="/settings"
              title="Settings & Integrations"
              className={`group flex h-9 w-9 items-center justify-center rounded-full transition-all cursor-pointer ${
                pathname && pathname.startsWith('/settings')
                  ? 'bg-blue-50 text-blue-600 font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Settings className="h-[18px] w-[18px] transition-transform duration-300 group-hover:rotate-45" />
            </Link>

            {/* Divider 2 */}
            <div className="h-5 w-px bg-slate-200 mx-1" />

            {/* 4. Avatar (IR) with Dropdown Chevron */}
            <div className="relative" ref={profileRef}>
              <button
                id="navbar-profile-btn"
                type="button"
                onClick={() => {
                  setIsProfileOpen((prev) => !prev);
                  setIsNotificationsOpen(false);
                  setIsHelpOpen(false);
                }}
                className="group flex items-center gap-1.5 rounded-full p-0.5 hover:bg-slate-100/70 transition-colors cursor-pointer"
                title="User Profile & Settings"
              >
                {/* Circle Avatar with IR */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 border border-slate-200/80 text-xs font-bold text-slate-800 shadow-2xs group-hover:border-slate-300 transition-colors">
                  IR
                </div>

                {/* Dropdown Chevron */}
                <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180 text-slate-700' : 'group-hover:text-slate-600'}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xl shadow-slate-900/10 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* User Info Header */}
                  <div className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold shadow-xs">
                        IR
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">Incident Responder</p>
                        <p className="text-[10px] font-medium text-slate-500 truncate">Tier-2 Forensics Lead</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-0.5 text-xs">
                    {/* Settings Link - relocated from sidebar */}
                    <Link
                      href="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-semibold transition-colors"
                    >
                      <Settings className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                      <span>Settings & Integrations</span>
                    </Link>

                    <Link
                      href="/investigations"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-semibold transition-colors"
                    >
                      <ShieldAlert className="h-4 w-4 text-slate-400" />
                      <span>My Investigations</span>
                    </Link>

                    <Link
                      href="/settings?tab=security"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-semibold transition-colors"
                    >
                      <User className="h-4 w-4 text-slate-400" />
                      <span>Active Sessions & Security</span>
                    </Link>
                  </div>

                  <div className="my-1.5 border-t border-slate-100" />

                  {/* Lock / Sign Out */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      router.push('/');
                    }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 text-rose-500" />
                    <span>Lock Session</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* Global Quick Search Modal (Command Palette) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search indicators, IP addresses, domains, investigations or settings..."
                className="w-full text-sm font-medium text-slate-900 placeholder-slate-400 outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Navigation Results */}
            <div className="p-3 max-h-80 overflow-y-auto">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Navigation & Forensics
              </div>
              <div className="mt-1 space-y-1">
                {searchSuggestions.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                        <span>{item.title}</span>
                      </div>
                      <span className="text-[10px] font-normal text-slate-400 bg-slate-100 group-hover:bg-blue-100/70 group-hover:text-blue-700 px-2 py-0.5 rounded-md transition-colors">
                        {item.type}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Footer shortcut tips */}
            <div className="bg-slate-50/80 px-4 py-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span>Navigate</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono">↓</kbd>
                <span className="ml-2">Select</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono">↵</kbd>
              </div>
              <div>
                <span>Press</span> <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono">ESC</kbd> to close
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};