'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mail, Upload, AlertCircle } from 'lucide-react';

interface EmailDropzoneProps {
  onFileSelected: (file: File) => void;
  onError: (errorMsg: string) => void;
  autoBrowse?: boolean;
  onAutoBrowseHandled?: () => void;
}

export const EmailDropzone: React.FC<EmailDropzoneProps> = ({ 
  onFileSelected, 
  onError,
  autoBrowse,
  onAutoBrowseHandled 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoBrowse) {
      const timer = setTimeout(() => {
        try {
          fileInputRef.current?.click();
        } catch (err) {
          console.warn('Auto browse trigger:', err);
        }
        onAutoBrowseHandled?.();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [autoBrowse, onAutoBrowseHandled]);

  const validateAndProcessFile = (file: File) => {
    // Validate size (max 25MB)
    const MAX_SIZE = 25 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      onError(`File exceeds the 25 MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB)`);
      return;
    }

    // Validate extension/type (.eml, .txt, or msg)
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'eml' && ext !== 'txt' && file.type !== 'message/rfc822' && file.type !== 'text/plain') {
      onError('Unsupported file format. Please upload a valid .EML file.');
      return;
    }

    onFileSelected(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndProcessFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`group relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 md:p-12 text-center cursor-pointer transition-all duration-200 ${
        isDragging
          ? 'border-blue-500 bg-blue-100/60 scale-[1.005]'
          : 'border-blue-200/90 bg-gradient-to-b from-blue-50/50 via-slate-50/40 to-white hover:border-blue-400 hover:bg-blue-50/70'
      }`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".eml,.txt,message/rfc822,text/plain"
        className="hidden"
      />

      {/* Animated Upload Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100/80 text-blue-600 shadow-sm border border-blue-200/60 group-hover:-translate-y-1 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
        <Mail className="h-8 w-8" />
      </div>

      <h3 className="mt-4 text-base font-bold text-slate-900">
        Drop your email here
      </h3>
      <p className="mt-1 text-xs text-slate-600 font-medium">
        or click to browse from your computer
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] font-semibold text-slate-500">
        <span className="rounded-full bg-slate-100 px-3 py-1 border border-slate-200">
          Supported formats: <strong className="text-slate-800">.EML</strong>
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 border border-slate-200">
          Maximum file size: <strong className="text-slate-800">25 MB</strong>
        </span>
      </div>

      <button
        type="button"
        className="mt-6 flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-500/25 group-hover:bg-blue-700 transition-all"
      >
        <Upload className="h-3.5 w-3.5" />
        Browse File
      </button>
    </div>
  );
};
