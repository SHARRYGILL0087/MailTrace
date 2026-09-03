'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check, FileText } from 'lucide-react';
import { InvestigationData } from '@/app/types/investigation';

interface Props {
  metadata: InvestigationData['metadata'];
}

export const EmailMetadata: React.FC<Props> = ({ metadata }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const fields = [
    { label: 'Message-ID', value: metadata.messageId, key: 'msgid' },
    { label: 'Subject', value: metadata.subject, key: 'subj' },
    { label: 'Received Date', value: metadata.date, key: 'date' },
    { label: 'Sender', value: metadata.sender, key: 'send' },
    { label: 'Recipient', value: metadata.recipient, key: 'recip' },
    { label: 'Return-Path', value: metadata.returnPath, key: 'retpath' },
    { label: 'Reply-To', value: metadata.replyTo, key: 'repto' },
    { label: 'MIME Type', value: metadata.mimeType, key: 'mime' },
  ];

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between gap-4 text-left focus:outline-none"
      >
        <div className="flex items-center gap-2.5">
          <FileText className="h-5 w-5 text-emerald-600" />
          <div>
            <h2 className="text-base font-bold text-slate-900">📋 Email Metadata</h2>
            <p className="text-xs text-slate-500">Technical headers and envelope attributes</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            {fields.length} Fields
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-6 space-y-3 pt-4 border-t border-slate-100 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {fields.map((field) => (
              <div
                key={field.key}
                className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  <span>{field.label}</span>
                  <button
                    onClick={() => handleCopy(field.key, field.value)}
                    className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-slate-400 hover:bg-white hover:text-slate-700 shadow-2xs transition-all"
                    title="Copy attribute value"
                  >
                    {copiedKey === field.key ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-600" />
                        <span className="text-emerald-700 text-[10px]">Copied</span>
                      </>
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
                <span className="font-mono text-xs font-bold text-slate-800 break-all">
                  {field.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
