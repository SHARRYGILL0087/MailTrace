'use client';

import React, { useState } from 'react';
import { AlertOctagon, CheckSquare, Square, CheckCircle2, ShieldCheck, PlusCircle } from 'lucide-react';
import { RecommendedAction } from '@/app/types/investigation';

interface Props {
  actions: RecommendedAction[];
  onToggleAction: (actionId: string) => void;
  onCreateTask: () => void;
  onMarkResolved: () => void;
}

export const RecommendedActions: React.FC<Props> = ({
  actions,
  onToggleAction,
  onCreateTask,
  onMarkResolved,
}) => {
  return (
    <div className="rounded-3xl border border-rose-200/80 bg-rose-50/20 p-6 shadow-xs transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-rose-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🚨</span>
            <h2 className="text-base font-bold text-slate-900">Recommended Response</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Automated mitigation playbook tasks for SOC analysts</p>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 border border-rose-200 px-3 py-1 text-xs font-bold text-rose-800 self-start sm:self-auto">
          <AlertOctagon className="h-3.5 w-3.5 text-rose-600" />
          High Priority Containment
        </span>
      </div>

      {/* Interactive Checkbox Playbook */}
      <div className="space-y-2.5 mb-6">
        {actions.map((act) => (
          <div
            key={act.id}
            onClick={() => onToggleAction(act.id)}
            className={`group flex items-center justify-between rounded-2xl border p-3.5 transition-all cursor-pointer ${
              act.completed
                ? 'border-emerald-200 bg-emerald-50/50 text-slate-500 line-through'
                : 'border-slate-200 bg-white text-slate-900 hover:border-blue-300 hover:shadow-2xs'
            }`}
          >
            <div className="flex items-center gap-3">
              {act.completed ? (
                <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0" />
              ) : (
                <Square className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
              )}
              <span className="text-xs font-bold">{act.text}</span>
            </div>

            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${
                act.completed
                  ? 'bg-emerald-100 text-emerald-800'
                  : act.priority === 'High'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {act.completed ? 'Done' : act.priority}
            </span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
        <button
          onClick={onCreateTask}
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <PlusCircle className="h-4 w-4 text-emerald-600" />
          <span>Create Response Task</span>
        </button>

        <button
          onClick={onMarkResolved}
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:from-emerald-700 hover:to-teal-700 transition-all active:scale-95"
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>Mark as Resolved</span>
        </button>
      </div>
    </div>
  );
};
