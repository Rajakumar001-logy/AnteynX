import React from 'react';
import { Radio, ArrowRight, AlertTriangle } from 'lucide-react';

export const AboutPage: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-28 pb-20">
      {/* HEADER */}
      <section className="relative py-12 bg-radial-gradient border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-full font-mono text-xs font-semibold">
            <Radio className="w-3.5 h-3.5" />
            ABOUT ANTEYNX
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Research-Driven RF & Antenna Engineering
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Delivering high-fidelity computational electromagnetic simulation and custom antenna design for modern technology teams.
          </p>
        </div>
      </section>

      {/* MISSION STATEMENT */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-blue-200 rounded-2xl p-8 sm:p-12 space-y-6 shadow-md relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Radio className="w-6 h-6" />
          </div>

          <span className="text-xs font-mono text-blue-600 font-bold tracking-wider uppercase block">
            COMPANY MISSION
          </span>

          <blockquote className="text-xl sm:text-2xl font-bold text-slate-900 leading-relaxed italic font-serif border-l-4 border-blue-600 pl-4">
            "We aim to make custom RF and antenna engineering more accessible to startups, researchers and technology companies by providing simulation-driven antenna design tailored to real application requirements."
          </blockquote>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Standard catalog antennas force engineers into awkward compromises regarding board space, enclosure clearance, and operating efficiency. AnteynX bridges the gap between electromagnetic theory and product integration by delivering custom antenna designs synthesized specifically around your mechanical boundaries and frequency specs.
          </p>
        </div>
      </section>

      {/* SERVICE BOUNDARY STATEMENT */}
      <section className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 font-mono text-xs text-slate-700 shadow-sm">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-blue-600" />
            <span>TRANSPARENT ENGINEERING SCOPE</span>
          </div>
          <p className="leading-relaxed text-slate-600">
            AnteynX is initially focused strictly on <strong>custom antenna design and electromagnetic simulation</strong>. We do not claim existing in-house manufacturing plants, anechoic chamber testing facilities, or accredited certification labs. Our deliverables focus on full 3D CAD modeling, HFSS/CST full-wave electromagnetic analysis, Gerber/DXF layouts, and comprehensive engineering reports.
          </p>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono text-blue-600 font-bold tracking-wider uppercase">ENGINEERING ADVANTAGES</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Why Work With AnteynX</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold font-mono">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base">Application-Specific</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Every antenna geometry is designed from scratch around your specific device housing, PCB clearance, and ground plane boundaries.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold font-mono">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base">Simulation-Driven</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              All architectural decisions are backed by rigorous 3D Finite Element Analysis (FEA) and full-wave electromagnetic solvers in HFSS/CST.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold font-mono">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base">Engineering-Focused</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              We focus purely on physics and target RF performance requirements: impedance bandwidth, return loss (S11), radiation efficiency, and gain.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold font-mono">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-base">Flexible Collaboration</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Ideal partner for early-stage hardware startups, university R&D groups, robotics companies, and product development engineering teams.
            </p>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Let's Engineer Your Antenna</h2>
          <p className="text-slate-600 text-xs sm:text-sm font-mono">
            Get in touch with our engineering team to discuss your project requirements.
          </p>
          <button
            onClick={() => setCurrentPage('quote')}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition inline-flex items-center gap-2"
          >
            <span>Request an Antenna Design</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
