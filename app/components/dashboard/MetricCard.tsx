'use client';

import React from 'react';
import { Mail, Shield, AlertTriangle, UserCheck, Share2 } from 'lucide-react';
import { MetricItem } from '@/app/types/dashboard';

const icons = {
  email: Mail,
  shield: Shield,
  warning: AlertTriangle,
  investigation: UserCheck,
  network: Share2,
};

export const MetricCard: React.FC<MetricItem> = ({ title, value, trend, isPositive, iconType }) => {
  const IconComponent = icons[iconType];

  return (
    <div className="group rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-blue-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">{title}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <IconComponent className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-bold tracking-tight text-slate-900">{value}</span>
        <span className={`text-[11px] font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
};