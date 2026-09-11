'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface Props {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const SettingsToast: React.FC<Props> = ({ toast, onClose }) => {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-md ${
        isSuccess
          ? 'border-emerald-200 bg-emerald-50/95 text-emerald-900'
          : isError
          ? 'border-rose-200 bg-rose-50/95 text-rose-900'
          : 'border-blue-200 bg-blue-50/95 text-blue-900'
      }`}>
        {isSuccess && <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />}
        {isError && <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />}
        {!isSuccess && !isError && <Info className="h-4 w-4 text-blue-600 shrink-0" />}

        <span className="text-xs font-bold font-sans">{toast.message}</span>

        <button
          type="button"
          onClick={onClose}
          className="ml-2 rounded-lg p-1 text-slate-400 hover:bg-black/5 hover:text-slate-700 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
