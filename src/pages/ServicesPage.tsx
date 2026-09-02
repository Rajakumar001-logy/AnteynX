import React from 'react';
import { Radio, Cpu, Sliders, Layers, Zap, FileText, CheckCircle2, ArrowRight, ShieldCheck, Box } from 'lucide-react';

interface ServicesPageProps {
  setCurrentPage: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ setCurrentPage }) => {
  const servicesList = [
    {
      id: 'custom-design',
      icon: Radio,
      title: 'Custom Antenna Design',
      tagline: 'Tailored RF architectures built around your exact form factor and operating band.',
      desc: 'We engineer application-specific antenna geometries designed from first principles. Whether you require a microstrip patch for broadside radiation, a planar inverted-F antenna (PIFA) for compact handheld devices, or a slot antenna integrated into a metal chassis, we synthesize the optimal topology for your bandwidth, efficiency, and size constraints.',
      capabilities: [
        'Microstrip Patch, Slot, Loop, and Monopole/Dipole topologies',
        'Custom operating frequencies (Sub-GHz to mmWave 28+ GHz)',
        'Dielectric substrate selection (FR4, Rogers RO4003C, Taconic, PTFE)',
        'Impedance matching networks (stub, inset feed, transformer matching)'
      ]
    },
    {
      id: 'em-simulation',
      icon: Cpu,
      title: 'Electromagnetic Simulation (HFSS & CST)',
      tagline: 'High-fidelity full-wave 3D computational electromagnetic modeling.',
      desc: 'Using industry-standard solvers—ANSYS HFSS and CST Microwave Studio—we build 3D virtual CAD models of your antenna along with enclosure geometry and surrounding PCB components. Our full-wave Finite Element Analysis (FEA) and Method of Moments (MoM) solvers compute near-field and far-field radiation parameters with high empirical accuracy.',
      capabilities: [
        'Full 3D CAD modeling of antenna, PCB stackup, and enclosure plastic/metal',
        'Finite Element Analysis (FEA) and Transient Solvers',
        'S-parameter computation ($S_{11}, S_{21}$) and VSWR analysis',
        'Surface current density, E-field, and H-field vector distributions'
      ]
    },
    {
      id: 'optimization',
      icon: Sliders,
      title: 'Antenna Optimization',
      tagline: 'Parametric tuning for bandwidth expansion, gain maximization, and efficiency.',
      desc: 'Antenna design is a continuous optimization challenge. We run multi-objective parametric sweeps and genetic optimization algorithms to tune critical dimensions (slot lengths, feed offsets, ground plane cutouts, and substrate thicknesses) to maximize gain, broaden impedance bandwidth, and suppress cross-polarization.',
      capabilities: [
        'Parametric sweeps for physical dimension tuning',
        'Resonant frequency stabilization against enclosure detuning',
        'Bandwidth expansion using parasitic elements and defected ground structures (DGS)',
        'Efficiency tuning for lossy substrate environments'
      ]
    },
    {
      id: 'array-design',
      icon: Layers,
      title: 'Array Antenna Design',
      tagline: 'Multi-element beamforming and high-gain directional array synthesis.',
      desc: 'For applications requiring high EIRP, long-range links, or directional beamforming, we design multi-element linear and planar antenna arrays. We synthesize corporate feed networks, power dividers (Wilkinson, T-junction), calculate array factor patterns, and engineer mutual coupling mitigation strategies.',
      capabilities: [
        '1x4, 2x2, 4x4, and 16-element planar microstrip arrays',
        'Corporate power divider feed networks with matched impedance',
        'Mutual coupling reduction between adjacent array elements',
        'Array factor synthesis and sidelobe level (SLL) suppression'
      ]
    },
    {
      id: 'mimo-systems',
      icon: Zap,
      title: 'MIMO Antenna Systems',
      tagline: 'Compact multi-antenna architectures for high-throughput wireless links.',
      desc: 'Modern wireless systems (Wi-Fi 6E/7, 5G NR, drone diversity links) demand multiple antennas operating in tight physical space. We engineer compact MIMO antenna arrangements with high port-to-port isolation (&gt;20 dB) and low Envelope Correlation Coefficient (ECC &lt; 0.05).',
      capabilities: [
        'Multi-band MIMO antenna configurations (2x2, 4x4)',
        'Isolation enhancement using neutral lines, DGS, and orthogonal polarization',
        'Envelope Correlation Coefficient (ECC) and Diversity Gain computation',
        'Multipath performance optimization for indoor/dense RF environments'
      ]
    },
    {
      id: 'engineering-reports',
      icon: FileText,
      title: 'Simulation & Engineering Reports',
      tagline: 'Complete, production-ready technical design packages.',
      desc: 'Every project concludes with a complete, transparent engineering report. You receive clear documentation explaining all design rationale, complete dimensional schematics, HFSS simulation data, 3D radiation plots, Gerber/DXF layers for PCB manufacturing, and Touchstone S-parameter (.s2p) files.',
      capabilities: [
        'Comprehensive PDF technical design report with design equations',
        '3D & 2D radiation pattern plots (E-plane & H-plane cuts, Peak Gain, HPBW)',
        'Touchstone format S-parameter (.s1p / .s2p) simulation export',
        'Gerber layout files and 3D STEP CAD models ready for PCB layout'
      ]
    }
  ];

  const deliverables = [
    { title: '3D STEP / IGES CAD Files', desc: 'Exact 3D mechanical CAD geometry of the antenna and substrate for seamless CAD integration.' },
    { title: 'Gerber / DXF Layout Layers', desc: 'Production-ready vector files for microstrip etching on standard PCB fabrication lines.' },
    { title: 'Touchstone S-Parameter Files', desc: 'Industry-standard .s1p / .s2p data files compatible with Keysight ADS, RF solvers, and circuit simulators.' },
    { title: '3D Far-field Radiation Plots', desc: 'High-resolution gain lobes, directivity patterns, axial ratio, and E/H plane cuts.' },
    { title: 'Comprehensive PDF Technical Report', desc: 'In-depth documentation covering design parameters, theoretical analysis, simulation setup, and tuning instructions.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-28 pb-20">
      {/* HEADER */}
      <section className="relative py-12 bg-radial-gradient border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-full font-mono text-xs font-semibold">
            <Radio className="w-3.5 h-3.5" />
            ELECTROMAGNETIC DESIGN SERVICES
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Antenna Design Services
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Full-wave electromagnetic simulation, architectural design, and optimization tailored specifically to your operating frequency, form factor, and application requirements.
          </p>
        </div>
      </section>

      {/* DETAILED SERVICES LIST */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {servicesList.map((service, idx) => {
          const IconComp = service.icon;
          return (
            <div
              key={service.id}
              id={service.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-blue-400 transition duration-300 shadow-sm hover:shadow-md relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-600">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-blue-600 font-bold block">SERVICE 0{idx + 1}</span>
                      <h2 className="text-2xl font-bold text-slate-900">{service.title}</h2>
                    </div>
                  </div>

                  <p className="text-blue-700 font-mono text-xs font-semibold">{service.tagline}</p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{service.desc}</p>
                </div>

                <div className="lg:col-span-5 bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3 font-mono">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    Key Deliverables & Focus Areas
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {service.capabilities.map((cap, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* DELIVERABLES CHECKLIST */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono text-blue-600 font-bold tracking-wider uppercase">DESIGN PACKAGE</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">What You Receive in Your Design Package</h2>
            <p className="text-slate-600 text-xs sm:text-sm">Every completed design project includes full engineering IP artifacts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
            {deliverables.map((del, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                  <Box className="w-4 h-4" />
                  <span>{del.title}</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed font-sans">{del.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Need a Custom Antenna Designed?</h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto font-mono">
            Submit your frequency, space constraints, substrate material, and target gain. Our team will review your specifications.
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
