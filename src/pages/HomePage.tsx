import React from 'react';
import { EMWaveVisualizer } from '../components/EMWaveVisualizer';
import { S11Plotter } from '../components/S11Plotter';
import { RFCalculator } from '../components/RFCalculator';
import {
  Radio,
  Cpu,
  Layers,
  Zap,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileText,
  Activity,
  Sliders,
  ChevronRight
} from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const problems = [
    { text: "Limited PCB ground plane space", detail: "Standard antennas require large, uncommitted ground planes that ruin compact board layouts." },
    { text: "Unusual or custom operating frequencies", detail: "Off-the-shelf chips only target narrow commercial ISM bands, missing specialized telemetry or defense frequencies." },
    { text: "Insufficient impedance bandwidth & high return loss", detail: "Off-resonance mismatch leads to severe power reflection and wasted transmitter RF energy." },
    { text: "Low gain & poor radiation efficiency", detail: "Lossy dielectric substrates and unoptimized feeds drop effective isotropic radiated power (EIRP)." },
    { text: "Severe size & height constraints", detail: "Enclosures in drones or IoT wearables restrict antenna volume, requiring electrically small antenna (ESA) techniques." },
    { text: "Enclosure & dielectric detuning issues", detail: "Placing an off-the-shelf antenna near plastic, metal casing, or battery shifts resonant frequency." },
    { text: "Mismatch between antenna & RF front-end", detail: "Impedance mismatch creates standing waves (high VSWR), heating up your PA." },
    { text: "Need for application-specific radiation patterns", detail: "Requirement for directional broadside, hemispherical circular polarization, or specialized null placement." }
  ];

  const processSteps = [
    { num: '01', title: 'Requirement Analysis', desc: 'We ingest your target frequency band, bandwidth, gain, polarization, maximum physical footprint, and enclosure materials.' },
    { num: '02', title: 'Initial Design & Synthesis', desc: 'Selection of optimal antenna architecture (microstrip patch, slot, PIFA, array) and analytical dimensional synthesis.' },
    { num: '03', title: 'Full 3D EM Simulation', desc: 'Full-wave 3D electromagnetic modeling in HFSS/CST using Finite Element Analysis (FEA) and Method of Moments (MoM).' },
    { num: '04', title: 'Engineering Optimization', desc: 'Parametric tuning of feed impedance, slot dimensions, ground plane coupling, and dielectric matching for peak efficiency.' },
    { num: '05', title: 'Performance Validation', desc: 'Rigorous extraction of S-parameters (S11), 3D farfield radiation patterns, axial ratio, VSWR, and surface current distribution.' },
    { num: '06', title: 'Final Design Package', desc: 'Comprehensive technical CAD bundle (Gerber/DXF/STEP files, S2P Touchstone data, and full PDF engineering report).' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial-gradient">
        {/* Subtle grid background overlay */}
        <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                CUSTOM RF & ANTENNA ENGINEERING LABS
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Custom Antennas. <br />
                <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
                  Engineered for Your Application.
                </span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
                We design high-performance custom antennas using electromagnetic simulation and engineering-driven optimization tailored around your mechanical and electrical constraints.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 font-mono">
                <button
                  onClick={() => setCurrentPage('quote')}
                  className="flex items-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition transform hover:-translate-y-0.5"
                >
                  <span>Request an Antenna Design</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentPage('services')}
                  className="flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-blue-600 border border-slate-300 rounded-xl font-bold transition shadow-sm"
                >
                  <span>View Our Capabilities</span>
                </button>
              </div>

              <div className="pt-4 flex items-center gap-6 text-xs font-mono text-slate-500 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>3D EM Solvers (HFSS / CST)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Application-Specific Geometry</span>
                </div>
              </div>
            </div>

            {/* Right Visualizer */}
            <div className="lg:col-span-6">
              <EMWaveVisualizer interactive={true} />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / CAPABILITY STRIP */}
      <section className="bg-white border-y border-slate-200 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-mono">
            <div className="p-3 border-r border-slate-200 last:border-r-0">
              <span className="text-blue-600 font-bold block text-sm sm:text-base">Custom Design</span>
              <span className="text-slate-500 text-xs">Architectures built to spec</span>
            </div>
            <div className="p-3 border-r border-slate-200 last:border-r-0">
              <span className="text-blue-600 font-bold block text-sm sm:text-base">EM Simulation</span>
              <span className="text-slate-500 text-xs">HFSS & CST 3D Modeling</span>
            </div>
            <div className="p-3 border-r border-slate-200 last:border-r-0">
              <span className="text-blue-600 font-bold block text-sm sm:text-base">Performance Optimization</span>
              <span className="text-slate-500 text-xs">S11, Gain, VSWR & Bandwidth</span>
            </div>
            <div className="p-3">
              <span className="text-blue-600 font-bold block text-sm sm:text-base">Engineering Reports</span>
              <span className="text-slate-500 text-xs">Full CAD & S2P Touchstone</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 text-red-600 rounded-full font-mono text-xs font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              RF INTEGRATION CHALLENGES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Off-the-Shelf Antennas Don't Always Fit.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Standard commercial catalog antennas assume ideal infinite ground planes and standard form factors. In real engineering products, off-the-shelf antennas frequently fail due to severe physical and electromagnetic constraints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((prob, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-5 space-y-3 transition duration-300 shadow-sm group hover:shadow-md"
              >
                <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600 font-mono font-bold text-xs group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-600 transition">
                  0{idx + 1}
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">{prob.text}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{prob.detail}</p>
              </div>
            ))}
          </div>

          {/* Solution Banner */}
          <div className="mt-12 p-6 md:p-8 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-2xl border border-blue-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono text-blue-600 font-bold tracking-wider">THE ANTEYNX SOLUTION</span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Engineered Around Your Exact Board & Enclosure
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Rather than forcing your hardware layout to fit an off-the-shelf antenna, we design custom antenna structures directly on your PCB or substrate, taking full account of nearby components, enclosure materials, and exact frequency targets.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('quote')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs rounded-xl shadow-md shrink-0 transition"
            >
              Discuss Your Requirement
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES SUMMARY SECTION */}
      <section className="py-20 bg-white border-y border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono text-blue-600 font-bold tracking-wider uppercase">Engineering Capabilities</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Our Antenna Design Services</h2>
            <p className="text-slate-600 text-sm">
              We specialize in end-to-end electromagnetic design and computational optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-tech p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Custom Antenna Design</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Microstrip patch, slot, inverted-F (IFA/PIFA), monopoles, and planar wideband topologies designed specifically to your target operating frequency and dielectric substrate.
              </p>
            </div>

            <div className="card-tech p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Electromagnetic Simulation</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Full 3D full-wave modeling using ANSYS HFSS and CST Microwave Studio. Finite Element Analysis (FEA) yields precise far-field and near-field parameters before fabrication.
              </p>
            </div>

            <div className="card-tech p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Antenna Optimization</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Parametric sweep optimization of feed locations, stub matching networks, slot dimensions, and ground plane clearance to maximize gain and radiation efficiency.
              </p>
            </div>

            <div className="card-tech p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Array Antenna Design</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Design of multi-element linear and planar arrays, corporate power divider feed networks, array factor calculation, and mutual coupling reduction techniques.
              </p>
            </div>

            <div className="card-tech p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">MIMO Antenna Systems</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Compact multi-antenna systems with high isolation (&gt;20 dB) and low Envelope Correlation Coefficient (ECC &lt; 0.05) for high-throughput wireless links.
              </p>
            </div>

            <div className="card-tech p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Simulation & Engineering Reports</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Detailed technical design documentation containing return loss curves, Smith charts, radiation patterns, Gerber/DXF manufacturing layers, and Touchstone (.s2p) files.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setCurrentPage('services')}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-600 hover:text-blue-700 border-b border-blue-500 pb-1"
            >
              Explore Full Technical Services & Deliverables <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* DESIGN PROCESS SECTION */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono text-blue-600 font-bold tracking-wider uppercase">Engineering Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">From Requirement to Antenna Design</h2>
            <p className="text-slate-600 text-sm">
              Our structured, simulation-driven methodology guarantees high performance and predictable results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 p-6 rounded-2xl relative space-y-3 group hover:border-blue-400 transition duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-blue-600">{step.num}</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 opacity-60 group-hover:scale-150 transition" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{step.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE RF ESTIMATOR TEASER */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
            <span className="text-xs font-mono text-blue-600 font-bold tracking-wider">INTERACTIVE TOOL</span>
            <h2 className="text-2xl font-extrabold text-slate-900">Calculate Initial Patch Antenna Dimensions</h2>
            <p className="text-slate-600 text-xs">Try our interactive parametric tool to estimate physical patch geometry.</p>
          </div>
          <RFCalculator />
        </div>
      </section>

      {/* FEATURED DEMONSTRATION PROJECTS HIGHLIGHT */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-mono text-blue-600 font-bold tracking-wider uppercase">Engineering Portfolio</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Featured Design Demonstrations</h2>
              <p className="text-slate-600 text-xs mt-1">Sample antenna projects demonstrating design & simulation capabilities.</p>
            </div>

            <div className="inline-block px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 font-mono text-xs font-semibold">
              ★ All Projects Labeled Demonstration Project
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-blue-400 transition shadow-sm">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-amber-50 text-amber-700 font-mono text-[10px] rounded border border-amber-200 font-bold">
                  DEMONSTRATION PROJECT
                </span>
                <span className="text-xs font-mono text-slate-500">Freq: 5.8 GHz</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Compact 5.8 GHz UAV Microstrip Patch</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Custom broadside microstrip patch antenna designed on Rogers RO4003C for 5.8 GHz drone telemetry and video links.
              </p>
              <S11Plotter centerFreq={5.8} bandwidth="320 MHz (5.64 - 5.96 GHz)" minS11={-31.5} title="S11 Return Loss (5.8 GHz UAV Patch)" />
            </div>

            {/* Project 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-blue-400 transition shadow-sm">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-amber-50 text-amber-700 font-mono text-[10px] rounded border border-amber-200 font-bold">
                  DEMONSTRATION PROJECT
                </span>
                <span className="text-xs font-mono text-slate-500">Freq: 2.4 GHz</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">2.4 GHz Compact Printed IoT Antenna</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Space-constrained meandered printed antenna engineered for embedded Wi-Fi/Bluetooth IoT sensor nodes.
              </p>
              <S11Plotter centerFreq={2.45} bandwidth="120 MHz (2.39 - 2.51 GHz)" minS11={-26.8} title="S11 Return Loss (2.4 GHz IoT Antenna)" />
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setCurrentPage('portfolio')}
              className="px-6 py-3 bg-white hover:bg-slate-100 text-blue-600 border border-slate-300 rounded-xl font-mono text-xs font-bold transition shadow-sm"
            >
              View Full Engineering Portfolio & Specifications
            </button>
          </div>
        </div>
      </section>

      {/* ROADMAP BANNER */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono text-blue-600 font-bold tracking-wider uppercase">Strategic Vision</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Our Engineering Capabilities Roadmap</h2>
            <p className="text-slate-600 text-xs mt-1">We are committed to clear, transparent communication of current vs future capabilities.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            <div className="p-5 bg-blue-50 border-2 border-blue-600 rounded-xl space-y-2 shadow-sm">
              <span className="px-2 py-0.5 bg-blue-600 text-white font-bold text-[10px] rounded">CURRENT PHASE</span>
              <h4 className="font-bold text-slate-900 text-sm">NOW</h4>
              <p className="text-blue-800 text-xs font-medium">Custom Antenna Design & 3D EM Simulation (HFSS/CST)</p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="px-2 py-0.5 bg-slate-200 text-slate-700 font-bold text-[10px] rounded">PHASE 2</span>
              <h4 className="font-bold text-slate-800 text-sm">NEXT</h4>
              <p className="text-slate-600 text-xs">Antenna Prototype Fabrication & PCB Milling</p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="px-2 py-0.5 bg-slate-200 text-slate-700 font-bold text-[10px] rounded">PHASE 3</span>
              <h4 className="font-bold text-slate-800 text-sm">FUTURE</h4>
              <p className="text-slate-600 text-xs">RF Testing, VNA Measurement & Anechoic Characterization</p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="px-2 py-0.5 bg-slate-200 text-slate-700 font-bold text-[10px] rounded">PHASE 4</span>
              <h4 className="font-bold text-slate-800 text-sm">VISION</h4>
              <p className="text-slate-600 text-xs">Small-Batch Antenna Manufacturing & Complete RF Solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIMARY CTA STRIP */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 mx-auto">
            <Radio className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Ready to Engineer a Custom Antenna for Your Product?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Provide your operating frequency, form-factor constraints, and target performance requirements. Our engineering team will review your specifications and deliver an electromagnetic design proposal.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 font-mono">
            <button
              onClick={() => setCurrentPage('quote')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>Request an Antenna Design</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentPage('contact')}
              className="px-8 py-4 bg-white hover:bg-slate-100 text-blue-600 border border-slate-300 font-bold text-sm rounded-xl transition shadow-sm"
            >
              Discuss Your Requirement
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
