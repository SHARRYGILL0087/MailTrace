'use client';

import React from 'react';
import { FileCheck, Trash2, RefreshCw, CheckCircle2 } from 'lucide-react';

interface UploadedFileCardProps {
  fileName: string;
  fileSize: string;
  fileFormat: string;
  onRemove: () => void;
  onReplace: () => void;
}

export const UploadedFileCard: React.FC<UploadedFileCardProps> = ({
  fileName,
  fileSize,
  fileFormat,
  onRemove,
  onReplace,
}) => {
  return (
    <div className="rounded-3xl border border-emerald-200/90 bg-gradient-to-r from-emerald-50/70 via-white to-blue-50/40 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100/80 text-emerald-700 border border-emerald-200 shrink-0">
            <FileCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900 truncate max-w-xs sm:max-w-sm">
                {fileName}
              </h4>
              <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                Ready
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
              <span>Size: <strong className="text-slate-700 font-semibold">{fileSize}</strong></span>
              <span>•</span>
              <span>Format: <strong className="text-slate-700 font-semibold">{fileFormat.toUpperCase()}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onReplace}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Replace
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors shadow-2xs"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
