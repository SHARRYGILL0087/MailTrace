'use client';

import React, { useState } from 'react';
import { Sparkles, Save, RotateCcw, Check, BrainCircuit, Info } from 'lucide-react';
import { AIDetectionSettings as IAIDetectionSettings } from '@/app/types/settings';

interface Props {
  settings: IAIDetectionSettings;
  onSave: (updated: IAIDetectionSettings) => void;
  onReset: () => void;
}

export const AIDetectionSettings: React.FC<Props> = ({ settings, onSave, onReset }) => {
  const [formData, setFormData] = useState<IAIDetectionSettings>({ ...settings });
  const [isSaved, setIsSaved] = useState(false);

  const toggleField = (key: keyof IAIDetectionSettings) => {
    setFormData((prev) => ({ ...prev, [key]: !prev[key] }));
    setIsSaved(false);
  };

  const handleSensitivity = (val: 'Low' | 'Medium' | 'High') => {
    setFormData((prev) => ({ ...prev, threatSensitivity: val }));
    setIsSaved(false);
  };

  const handleExplainabilityMethod = (val: 'SHAP' | 'LIME' | 'Both') => {
    setFormData((prev) => ({ ...prev, explainabilityMethod: val }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span>AI & Detection</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Heuristic thresholds, machine learning models, and explainability algorithms
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600">
          Engine: PyTorch / Scikit-Learn
        </span>
      </div>

      {/* Backend Engine Informational Box */}
      <div className="flex items-start gap-3 rounded-2xl border border-blue-200/80 bg-blue-50/70 p-4 text-xs shadow-2xs">
        <BrainCircuit className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h4 className="font-bold text-blue-950">AI Forensic Backend Notice</h4>
          <p className="text-[11px] text-blue-900/80 leading-relaxed font-medium">
            AI analysis is performed by the Python AI/forensics service. Configuration toggles below adjust pipeline execution flags and score weightings across the detection cluster.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Detection Pipeline Toggles */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Detection Modules
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* 1. AI Detection */}
            <div
              onClick={() => toggleField('aiDetection')}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-slate-900">AI Detection Engine</p>
                <p className="text-[11px] text-slate-400">Core neural classifier for phishing lures</p>
              </div>
              <div className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                formData.aiDetection ? 'bg-blue-600' : 'bg-slate-300'
              }`}>
                <div className={`h-4 w-4 rounded-full bg-white shadow-xs transform transition-transform ${
                  formData.aiDetection ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </div>
            </div>

            {/* 2. NLP Analysis */}
            <div
              onClick={() => toggleField('nlpAnalysis')}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-slate-900">NLP Semantic Analysis</p>
                <p className="text-[11px] text-slate-400">Transformer-based intent & urgency extraction</p>
              </div>
              <div className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                formData.nlpAnalysis ? 'bg-blue-600' : 'bg-slate-300'
              }`}>
                <div className={`h-4 w-4 rounded-full bg-white shadow-xs transform transition-transform ${
                  formData.nlpAnalysis ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </div>
            </div>

            {/* 3. Anomaly Detection */}
            <div
              onClick={() => toggleField('anomalyDetection')}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-slate-900">Header Anomaly Detection</p>
                <p className="text-[11px] text-slate-400">MIME anomalies, relay delays & hop deviations</p>
              </div>
              <div className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                formData.anomalyDetection ? 'bg-blue-600' : 'bg-slate-300'
              }`}>
                <div className={`h-4 w-4 rounded-full bg-white shadow-xs transform transition-transform ${
                  formData.anomalyDetection ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </div>
            </div>

            {/* 4. Spoofing Detection */}
            <div
              onClick={() => toggleField('spoofingDetection')}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-slate-900">Spoofing & Impersonation</p>
                <p className="text-[11px] text-slate-400">Executive lookalike domain & homoglyph checks</p>
              </div>
              <div className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                formData.spoofingDetection ? 'bg-blue-600' : 'bg-slate-300'
              }`}>
                <div className={`h-4 w-4 rounded-full bg-white shadow-xs transform transition-transform ${
                  formData.spoofingDetection ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </div>
            </div>

            {/* 5. Explainability */}
            <div
              onClick={() => toggleField('explainability')}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all cursor-pointer col-span-1 sm:col-span-2"
            >
              <div>
                <p className="text-xs font-bold text-slate-900">Model Explainability (XAI)</p>
                <p className="text-[11px] text-slate-400">Generate feature attribution rationale for security audit compliance</p>
              </div>
              <div className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                formData.explainability ? 'bg-blue-600' : 'bg-slate-300'
              }`}>
                <div className={`h-4 w-4 rounded-full bg-white shadow-xs transform transition-transform ${
                  formData.explainability ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </div>
            </div>

          </div>
        </div>

        {/* Explainability Method Selector */}
        {formData.explainability && (
          <div className="space-y-2 pt-1 border-t border-slate-100 animate-in fade-in">
            <label className="block text-xs font-bold text-slate-800">
              Explainability Method
            </label>
            <div className="flex flex-wrap gap-2.5">
              {(['SHAP', 'LIME', 'Both'] as const).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => handleExplainabilityMethod(method)}
                  className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                    formData.explainabilityMethod === method
                      ? 'border-blue-300 bg-blue-50 text-blue-800 shadow-2xs'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {method === 'Both' ? 'Both (SHAP + LIME Hybrid)' : method}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Threat Score Sensitivity */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-800">
            Threat Score Sensitivity
          </label>
          <p className="text-[11px] text-slate-400">
            Controls the aggressiveness of heuristic scoring when ambiguous evidence is detected.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {(['Low', 'Medium', 'High'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => handleSensitivity(level)}
                className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  formData.threatSensitivity === level
                    ? level === 'High'
                      ? 'border-rose-300 bg-rose-50 text-rose-800 shadow-2xs'
                      : 'border-blue-300 bg-blue-50 text-blue-800 shadow-2xs'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {level} Sensitivity
              </button>
            ))}
          </div>
        </div>

        {/* Confidence Threshold */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800">
              Confidence Threshold
            </label>
            <span className="font-mono text-xs font-extrabold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-lg">
              {(formData.confidenceThreshold * 100).toFixed(0)}% ({formData.confidenceThreshold.toFixed(2)})
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Minimum model probability required before automatically escalating cases to Critical.
          </p>
          <input
            type="range"
            min="0.50"
            max="0.95"
            step="0.05"
            value={formData.confidenceThreshold}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, confidenceThreshold: parseFloat(e.target.value) }));
              setIsSaved(false);
            }}
            className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>

            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
              <span>Reset</span>
            </button>
          </div>

          {isSaved && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-blue-700 animate-in fade-in">
              <Check className="h-4 w-4" />
              <span>Settings saved successfully.</span>
            </span>
          )}
        </div>

      </form>

    </div>
  );
};
