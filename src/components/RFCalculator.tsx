import React, { useState } from 'react';
import { Calculator, Cpu, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

interface Substrate {
  name: string;
  er: number;
  tanD: number;
  hDefault: number;
}

const SUBSTRATES: Substrate[] = [
  { name: 'Rogers RO4003C', er: 3.55, tanD: 0.0027, hDefault: 0.813 },
  { name: 'FR4 Epoxy', er: 4.4, tanD: 0.02, hDefault: 1.6 },
  { name: 'Rogers RT/duroid 5880', er: 2.2, tanD: 0.0009, hDefault: 0.787 },
  { name: 'Taconic TLX-8', er: 2.55, tanD: 0.0019, hDefault: 1.57 }
];

export const RFCalculator: React.FC = () => {
  const [freqGHz, setFreqGHz] = useState<number>(5.8);
  const [selectedSubstrate, setSelectedSubstrate] = useState<Substrate>(SUBSTRATES[0]);
  const [hMm, setHMm] = useState<number>(0.813);

  // RF Patch Formulas
  const c = 3e8; // speed of light m/s
  const fHz = freqGHz * 1e9;
  const er = selectedSubstrate.er;
  const h = hMm / 1000; // in meters

  // Patch Width W = c / (2 * f) * sqrt(2 / (er + 1))
  const widthM = (c / (2 * fHz)) * Math.sqrt(2 / (er + 1));
  const widthMm = widthM * 1000;

  // Effective Dielectric Constant er_eff = (er + 1)/2 + (er - 1)/2 * (1 + 12 * h / W)^(-0.5)
  const erEff = (er + 1) / 2 + ((er - 1) / 2) * Math.pow(1 + (12 * h) / widthM, -0.5);

  // Length extension deltaL
  const deltaL = 0.412 * h * ((erEff + 0.3) * (widthMm / hMm + 0.264)) / ((erEff - 0.258) * (widthMm / hMm + 0.8));
  
  // Physical Length L = c / (2 * f * sqrt(er_eff)) - 2 * deltaL
  const lengthM = c / (2 * fHz * Math.sqrt(erEff)) - 2 * (deltaL / 1000);
  const lengthMm = lengthM * 1000;

  // Guided wavelength lambda_g
  const lambdaGMm = (c / (fHz * Math.sqrt(erEff))) * 1000;

  return (
    <div className="w-full bg-rf-navy/90 rounded-2xl border border-rf-border p-6 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-rf-border/80">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
            <Calculator className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide">Interactive Microstrip Patch Design Estimator</h3>
            <p className="text-xs text-slate-400 font-mono">Formulas based on Transmission Line Model & Cavity Solver</p>
          </div>
        </div>
        <span className="hidden sm:inline-block px-3 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full text-xs font-mono">
          EM Parametric Engine
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 flex justify-between">
              <span>Target Operating Frequency (f₀)</span>
              <span className="text-cyan-400 font-bold">{freqGHz.toFixed(2)} GHz</span>
            </label>
            <input
              type="range"
              min="0.8"
              max="24.0"
              step="0.1"
              value={freqGHz}
              onChange={(e) => setFreqGHz(parseFloat(e.target.value))}
              className="w-full h-2 bg-rf-border rounded-lg accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>Sub-GHz</span>
              <span>2.4 GHz</span>
              <span>5.8 GHz</span>
              <span>10 GHz (X-band)</span>
              <span>24 GHz (mmWave)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">Substrate Dielectric Material</label>
            <select
              value={selectedSubstrate.name}
              onChange={(e) => {
                const sub = SUBSTRATES.find((s) => s.name === e.target.value) || SUBSTRATES[0];
                setSelectedSubstrate(sub);
                setHMm(sub.hDefault);
              }}
              className="w-full bg-rf-dark border border-rf-border rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              {SUBSTRATES.map((sub) => (
                <option key={sub.name} value={sub.name}>
                  {sub.name} (εr = {sub.er}, tanδ = {sub.tanD})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 flex justify-between">
              <span>Substrate Height (h)</span>
              <span className="text-cyan-400 font-bold">{hMm.toFixed(3)} mm</span>
            </label>
            <input
              type="number"
              step="0.05"
              min="0.1"
              max="6.0"
              value={hMm}
              onChange={(e) => setHMm(parseFloat(e.target.value) || 0.813)}
              className="w-full bg-rf-dark border border-rf-border rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Dynamic Computed Outputs */}
        <div className="lg:col-span-7 bg-rf-dark/80 rounded-xl border border-rf-border p-4 space-y-4">
          <h4 className="text-xs font-mono text-slate-400 border-b border-rf-border pb-2 flex items-center justify-between">
            <span>COMPUTED DIMENSIONS & PARAMETERS</span>
            <span className="text-cyan-400 font-bold">εr,eff = {erEff.toFixed(3)}</span>
          </h4>

          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-3 bg-rf-navy/90 rounded-lg border border-rf-border/80">
              <span className="text-[10px] text-slate-400 block">Patch Width (W)</span>
              <span className="text-lg font-bold text-cyan-300">{widthMm.toFixed(2)} mm</span>
            </div>

            <div className="p-3 bg-rf-navy/90 rounded-lg border border-rf-border/80">
              <span className="text-[10px] text-slate-400 block">Patch Length (L)</span>
              <span className="text-lg font-bold text-cyan-300">{lengthMm.toFixed(2)} mm</span>
            </div>

            <div className="p-3 bg-rf-navy/90 rounded-lg border border-rf-border/80">
              <span className="text-[10px] text-slate-400 block">Guided Wavelength (λg)</span>
              <span className="text-sm font-bold text-slate-200">{lambdaGMm.toFixed(2)} mm</span>
            </div>

            <div className="p-3 bg-rf-navy/90 rounded-lg border border-rf-border/80">
              <span className="text-[10px] text-slate-400 block">Suggested Ground (Wg × Lg)</span>
              <span className="text-sm font-bold text-slate-200">
                {(widthMm + 6 * hMm).toFixed(1)} × {(lengthMm + 6 * hMm).toFixed(1)} mm
              </span>
            </div>
          </div>

          <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-lg text-xs text-slate-300 flex items-start gap-2">
            <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              These initial specs serve as the analytical seed. Our engineering team performs full 3D Finite Element Analysis (FEA) in HFSS to optimize feed insertion point ($y_0$), surface wave suppression, cross-polarization, and broadside gain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
