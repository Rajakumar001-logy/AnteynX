import React from 'react';
import { Radio, Shield, Cpu, Activity, ArrowRight, CheckCircle2, AlertTriangle, Layers, Clock } from 'lucide-react';

export const AboutPage: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-rf-dark text-slate-100 font-sans pt-28 pb-20">
      {/* HEADER */}
      <section className="relative py-12 bg-radial-gradient border-b border-rf-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-full font-mono text-xs font-semibold">
            <Radio className="w-3.5 h-3.5" />
            ABOUT ANTEYNX
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Research-Driven RF & Antenna Engineering
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Delivering high-fidelity computational electromagnetic simulation and custom antenna design for modern technology teams.
          </p>
        </div>
      </section>

      {/* MISSION STATEMENT */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-rf-navy/90 border border-cyan-500/40 rounded-2xl p-8 sm:p-12 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Radio className="w-6 h-6" />
          </div>

          <span className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase block">
            COMPANY MISSION
          </span>

          <blockquote className="text-xl sm:text-2xl font-bold text-white leading-relaxed italic font-serif border-l-4 border-cyan-400 pl-4">
            "We aim to make custom RF and antenna engineering more accessible to startups, researchers and technology companies by providing simulation-driven antenna design tailored to real application requirements."
          </blockquote>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Standard catalog antennas force engineers into awkward compromises regarding board space, enclosure clearance, and operating efficiency. AnteynX bridges the gap between electromagnetic theory and product integration by delivering custom antenna designs synthesized specifically around your mechanical boundaries and frequency specs.
          </p>
        </div>
      </section>

      {/* SERVICE BOUNDARY STATEMENT */}
      <section className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 bg-rf-dark border border-rf-border rounded-xl space-y-3 font-mono text-xs text-slate-300">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-cyan-400" />
            <span>TRANSPARENT ENGINEERING SCOPE</span>
          </div>
          <p className="leading-relaxed text-slate-400">
            AnteynX is initially focused strictly on <strong>custom antenna design and electromagnetic simulation</strong>. We do not claim existing in-house manufacturing plants, anechoic chamber testing facilities, or accredited certification labs. Our deliverables focus on full 3D CAD modeling, HFSS/CST full-wave electromagnetic analysis, Gerber/DXF layouts, and comprehensive engineering reports.
          </p>
        </div>
      </section>

      {/* FUTURE ROADMAP */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">CAPABILITY EVOLUTION</span>
          <h2 className="text-3xl font-extrabold text-white">Our Strategic Roadmap</h2>
          <p className="text-slate-400 text-xs sm:text-sm">Phased expansion plan from computational design to small-batch production.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
          {/* NOW */}
          <div className="bg-cyan-500/10 border-2 border-cyan-400 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-cyan-400 text-slate-950 font-bold text-[10px] rounded">PHASE 1 (ACTIVE)</span>
              <Clock className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white">NOW</h3>
            <h4 className="text-cyan-300 text-xs font-bold">Custom Antenna Design & EM Simulation</h4>
            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              3D electromagnetic modeling in HFSS & CST, impedance tuning, bandwidth optimization, radiation pattern synthesis, and Gerber/STEP CAD generation.
            </p>
          </div>

          {/* NEXT */}
          <div className="bg-rf-navy/60 border border-rf-border rounded-2xl p-6 space-y-4 opacity-80 hover:opacity-100 transition">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-slate-800 text-slate-400 font-bold text-[10px] rounded">PHASE 2 (PLANNED)</span>
            </div>
            <h3 className="text-xl font-bold text-slate-200">NEXT</h3>
            <h4 className="text-slate-300 text-xs font-bold">Antenna Prototype Fabrication</h4>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              Rapid physical prototyping via precision PCB milling and fast-turn RF substrate etching for initial physical validation.
            </p>
          </div>

          {/* FUTURE */}
          <div className="bg-rf-navy/60 border border-rf-border rounded-2xl p-6 space-y-4 opacity-80 hover:opacity-100 transition">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-slate-800 text-slate-400 font-bold text-[10px] rounded">PHASE 3 (FUTURE)</span>
            </div>
            <h3 className="text-xl font-bold text-slate-200">FUTURE</h3>
            <h4 className="text-slate-300 text-xs font-bold">RF Testing & Characterization</h4>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              Vector Network Analyzer (VNA) S-parameter measurement, gain calibration, and far-field radiation pattern testing.
            </p>
          </div>

          {/* VISION */}
          <div className="bg-rf-navy/60 border border-rf-border rounded-2xl p-6 space-y-4 opacity-80 hover:opacity-100 transition">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-slate-800 text-slate-400 font-bold text-[10px] rounded">PHASE 4 (VISION)</span>
            </div>
            <h3 className="text-xl font-bold text-slate-200">VISION</h3>
            <h4 className="text-slate-300 text-xs font-bold">Small-Batch Manufacturing</h4>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              Small-batch antenna production, automated pick-and-place assembly, and turn-key RF engineering solutions.
            </p>
          </div>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">ENGINEERING ADVANTAGES</span>
          <h2 className="text-3xl font-extrabold text-white">Why Work With AnteynX</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-rf-navy/80 border border-rf-border p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold font-mono">
              01
            </div>
            <h3 className="font-bold text-white text-base">Application-Specific</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Every antenna geometry is designed from scratch around your specific device housing, PCB clearance, and ground plane boundaries.
            </p>
          </div>

          <div className="bg-rf-navy/80 border border-rf-border p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold font-mono">
              02
            </div>
            <h3 className="font-bold text-white text-base">Simulation-Driven</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              All architectural decisions are backed by rigorous 3D Finite Element Analysis (FEA) and full-wave electromagnetic solvers in HFSS/CST.
            </p>
          </div>

          <div className="bg-rf-navy/80 border border-rf-border p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold font-mono">
              03
            </div>
            <h3 className="font-bold text-white text-base">Engineering-Focused</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              We focus purely on physics and target RF performance requirements: impedance bandwidth, return loss (S11), radiation efficiency, and gain.
            </p>
          </div>

          <div className="bg-rf-navy/80 border border-rf-border p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold font-mono">
              04
            </div>
            <h3 className="font-bold text-white text-base">Flexible Collaboration</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Ideal partner for early-stage hardware startups, university R&D groups, robotics companies, and product development engineering teams.
            </p>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Let's Engineer Your Antenna</h2>
          <p className="text-slate-300 text-xs sm:text-sm font-mono">
            Get in touch with our engineering team to discuss your project requirements.
          </p>
          <button
            onClick={() => setCurrentPage('quote')}
            className="px-8 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs rounded-xl shadow-xl shadow-cyan-500/20 transition inline-flex items-center gap-2"
          >
            <span>Request an Antenna Design</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
