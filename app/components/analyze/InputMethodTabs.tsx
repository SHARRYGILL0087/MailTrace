'use client';

import React from 'react';
import { Upload, FileText } from 'lucide-react';

interface InputMethodTabsProps {
  activeTab: 'upload' | 'paste';
  onTabChange: (tab: 'upload' | 'paste') => void;
}

export const InputMethodTabs: React.FC<InputMethodTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100/80 border border-slate-200/60 w-fit">
      <button
        type="button"
        onClick={() => onTabChange('upload')}
        className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
          activeTab === 'upload'
            ? 'bg-white text-blue-700 shadow-xs font-bold border border-slate-200/70'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
        }`}
      >
        <Upload className="h-3.5 w-3.5" />
        Upload Email
      </button>

      <button
        type="button"
        onClick={() => onTabChange('paste')}
        className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
          activeTab === 'paste'
            ? 'bg-white text-blue-700 shadow-xs font-bold border border-slate-200/70'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
        }`}
      >
        <FileText className="h-3.5 w-3.5" />
        Paste Headers
      </button>
    </div>
  );
};
