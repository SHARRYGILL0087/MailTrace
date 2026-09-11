'use client';

import React from 'react';

export const IntelLoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* 1. Result Summary Skeleton */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Circular gauge skeleton */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-6 pb-6 lg:pb-0 lg:border-r border-slate-100 pr-0 lg:pr-6">
            <div className="h-36 w-36 rounded-full bg-slate-100 shrink-0" />
            <div className="space-y-2 w-full">
              <div className="h-5 w-24 rounded-full bg-slate-200" />
              <div className="h-4 w-36 rounded bg-slate-200" />
              <div className="h-4 w-28 rounded bg-slate-100" />
            </div>
          </div>

          {/* AI Assessment skeleton */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-5 w-48 rounded bg-slate-200" />
              <div className="h-5 w-28 rounded-full bg-slate-100" />
            </div>
            <div className="h-20 rounded-2xl bg-slate-100" />
            <div className="grid grid-cols-3 gap-3">
              <div className="h-12 rounded-xl bg-slate-100" />
              <div className="h-12 rounded-xl bg-slate-100" />
              <div className="h-12 rounded-xl bg-slate-100" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Three Reputation Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-44 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
          <div className="h-5 w-32 rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-3/4 rounded bg-slate-100" />
          <div className="h-4 w-1/2 rounded bg-slate-100" />
        </div>
        <div className="h-44 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
          <div className="h-5 w-32 rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-3/4 rounded bg-slate-100" />
          <div className="h-4 w-1/2 rounded bg-slate-100" />
        </div>
        <div className="h-44 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
          <div className="h-5 w-32 rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-3/4 rounded bg-slate-100" />
          <div className="h-4 w-1/2 rounded bg-slate-100" />
        </div>
      </div>

      {/* 3. Infrastructure & Map Skeleton */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
        <div className="h-6 w-48 rounded bg-slate-200" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="h-16 rounded-2xl bg-slate-100" />
          <div className="h-16 rounded-2xl bg-slate-100" />
          <div className="h-16 rounded-2xl bg-slate-100" />
          <div className="h-16 rounded-2xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
};
