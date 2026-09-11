'use client';

import React from 'react';

export const SettingsSkeleton: React.FC = () => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-xs space-y-6 animate-pulse">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="space-y-2">
          <div className="h-5 w-44 rounded bg-slate-200" />
          <div className="h-3.5 w-72 rounded bg-slate-100" />
        </div>
        <div className="h-6 w-24 rounded-full bg-slate-100" />
      </div>

      <div className="space-y-4">
        <div className="h-10 w-full rounded-xl bg-slate-100" />
        <div className="h-10 w-full rounded-xl bg-slate-100" />
        <div className="h-24 w-full rounded-2xl bg-slate-100" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-14 rounded-xl bg-slate-100" />
          <div className="h-14 rounded-xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
};
