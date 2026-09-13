'use client';

import React, { useState } from 'react';
import { MessageSquare, Save, User, Send, Check } from 'lucide-react';
import { AnalystNote } from '@/app/types/investigation';

interface Props {
  notes: AnalystNote[];
  onAddNote: (content: string) => void;
}

export const AnalystNotes: React.FC<Props> = ({ notes, onAddNote }) => {
  const [newNoteText, setNewNoteText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    onAddNote(newNoteText.trim());
    setNewNoteText('');
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md">
      <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>📝</span> Analyst Notes
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Collaborative SOC responder comments & observations</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          {notes.length} Notes
        </span>
      </div>

      {/* Textarea Input Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <div className="relative">
          <textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Enter investigation notes..."
            rows={3}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-blue-100 transition-all resize-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400">
            Markdown formatting supported
          </span>

          <button
            type="submit"
            disabled={!newNoteText.trim()}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaved ? (
              <>
                <Check className="h-3.5 w-3.5 text-blue-200" />
                <span>Note Saved</span>
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" />
                <span>Save Note</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Existing Notes Feed */}
      <div className="space-y-3">
        {notes.map((note) => (
          <div key={note.id} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold border border-emerald-200">
                  {note.avatarInitials}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{note.author}</h3>
                  <p className="text-[10px] text-slate-400">{note.role}</p>
                </div>
              </div>

              <span className="font-mono text-[10px] font-semibold text-slate-400">
                {note.timestamp}
              </span>
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed pl-9">
              "{note.content}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
