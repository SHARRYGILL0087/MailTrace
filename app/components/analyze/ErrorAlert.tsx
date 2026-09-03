'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onDismiss: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onDismiss }) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-rose-200 bg-rose-50/90 p-4 text-xs font-semibold text-rose-800 shadow-2xs mb-4 animate-in fade-in slide-in-from-top-1 duration-200">
      <div className="flex items-center gap-2.5">
        <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
        <span>{message}</span>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="rounded-lg p-1 text-rose-500 hover:bg-rose-100 hover:text-rose-700 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
