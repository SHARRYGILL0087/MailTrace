'use client';

import React, { useState } from 'react';
import { X, Download, Copy, Check, FileJson, FileText } from 'lucide-react';
import { ThreatIntelligenceResponse } from '@/app/types/threatIntel';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: ThreatIntelligenceResponse;
}

export const IntelExportModal: React.FC<Props> = ({ isOpen, onClose, data }) => {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<'json' | 'markdown'>('json');

  if (!isOpen) return null;

  const jsonContent = JSON.stringify(data, null, 2);

  const markdownContent = `# Threat Intelligence Dossier: ${data.indicator}

- **Indicator**: ${data.indicator}
- **Type**: ${data.type.toUpperCase()}
- **Risk Score**: ${data.risk_score} / 100 (${data.risk_level.toUpperCase()})
- **Classification**: ${data.classification}
- **First Seen**: ${data.first_seen}
- **Last Seen**: ${data.last_seen}

## Summary
> ${data.ai_summary}

## Infrastructure Location
- Country: ${data.geolocation.country} (${data.geolocation.country_code})
- City: ${data.geolocation.city}, ${data.geolocation.region}
- ISP: ${data.geolocation.isp}
- ASN: ${data.asn.asn} (${data.asn.org})

*Notice: Geolocation represents observed infrastructure and does not establish the physical location or identity of an attacker.*
`;

  const activeContent = format === 'json' ? jsonContent : markdownContent;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = format === 'json' ? 'json' : 'md';
    const mime = format === 'json' ? 'application/json' : 'text/markdown';
    const blob = new Blob([activeContent], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `threat-intel-${data.indicator.replace(/[^a-zA-Z0-9]/g, '_')}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Dialog Box */}
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl z-10 space-y-4 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <Download className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Export Intelligence Dossier</h3>
              <p className="text-[11px] text-slate-500">Download formatted telemetry records for SOC ticketing or archive</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFormat('json')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
              format === 'json' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FileJson className="h-3.5 w-3.5" />
            <span>JSON Format</span>
          </button>

          <button
            type="button"
            onClick={() => setFormat('markdown')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
              format === 'markdown' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Markdown Summary</span>
          </button>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 text-slate-200 font-mono text-xs max-h-72 select-all">
          <pre className="whitespace-pre-wrap">{activeContent}</pre>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
          <span className="text-[11px] text-slate-400">
            Target: <code className="text-slate-700 font-bold">{data.indicator}</code>
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 font-bold text-white shadow-md shadow-emerald-500/20 hover:from-emerald-700 hover:to-teal-700 transition-all"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
