'use client';

import React from 'react';
import { Clipboard, Code2 } from 'lucide-react';

interface HeaderTextareaProps {
  value: string;
  onChange: (val: string) => void;
}

export const HeaderTextarea: React.FC<HeaderTextareaProps> = ({ value, onChange }) => {
  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChange(text);
      }
    } catch {
      // Fallback
    }
  };

  const samplePlaceholder = `From: billing@secure-update-portal.eu
To: executive@enterprise-holdings.co
Subject: Urgent Payment Authorization #INV-2026
Date: Wed, 02 Sep 2026 20:14:12 +0000
Received: from mail.secure-update-portal.eu (185.220.101.5) by mx.enterprise-holdings.co (8.14.4/8.14.4)
Reply-To: security@sso-domain-verify.net
Return-Path: <bounce@secure-update-portal.eu>
Message-ID: <20260902201412.9941@secure-update-portal.eu>
Authentication-Results: mx.enterprise-holdings.co; spf=fail (sender IP 185.220.101.5); dkim=fail header.d=secure-update-portal.eu; dmarc=fail (p=reject dis=none)`;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Paste Raw Email Headers
          </h4>
          <p className="text-xs text-slate-500">
            Paste complete RFC 822 email headers for forensic investigation.
          </p>
        </div>
        <button
          type="button"
          onClick={handlePasteClipboard}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <Clipboard className="h-3.5 w-3.5 text-slate-500" />
          Paste Headers
        </button>
      </div>

      <div className="relative">
        <textarea
          rows={9}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={samplePlaceholder}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 p-4 font-mono text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all leading-relaxed"
        />
        <Code2 className="absolute top-3.5 right-3.5 h-4 w-4 text-slate-300 pointer-events-none" />
      </div>
    </div>
  );
};
