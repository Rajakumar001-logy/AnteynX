import React, { useState } from 'react';
import { Plane, Cpu, Bot, Radio, Navigation, Shield, GraduationCap, HardDrive, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ApplicationItem {
  id: string;
  category: string;
  icon: any;
  title: string;
  subtitle: string;
  desc: string;
  requirements: string[];
  recommendedTech: string;
}

export const ApplicationsPage: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const apps: ApplicationItem[] = [
    {
      id: 'uav',
      category: 'aviation',
      icon: Plane,
      title: 'UAV & Drones',
      subtitle: 'Compact antennas for long-range communication, video telemetry, navigation & GNSS.',
      desc: 'Drones and uncrewed aerial systems (UAS) operate in harsh multipath and aerodynamic environments. Antenna solutions must deliver high gain, circular polarization for tumbling airframes, and low wind resistance while fitting inside tight carbon-fiber or plastic fuselages.',
      requirements: [
        'RHCP / LHCP circular polarization for GNSS positioning',
        'Aerodynamic low-profile planar patch form factor',
        'Dual-band 2.4 GHz / 5.8 GHz video telemetry links',
        'Immunity to carbon-fiber frame loading'
      ],
      recommendedTech: 'Circular Patch, Dual-Band PIFA, 5.8 GHz High-Gain Array'
    },
    {
      id: 'iot',
      category: 'embedded',
      icon: Cpu,
      title: 'IoT & Embedded Systems',
      subtitle: 'Space-constrained antennas for miniaturized smart devices and sensors.',
      desc: 'Internet of Things (IoT) sensors often present severe volume restrictions and proximity to batteries, plastic enclosures, and human bodies. Custom antennas are optimized directly on the device PCB to maximize efficiency despite ground plane limitations.',
      requirements: [
        'Miniaturized footprint (< 15x15 mm)',
        'Sub-GHz (868/915 MHz LoRa/Sigfox) & 2.4 GHz Wi-Fi/BLE integration',
        'Enclosure plastic detuning compensation',
        'Ultra-low power loss to extend battery lifetime'
      ],
      recommendedTech: 'Printed Meandered Inverted-F (IFA), Chip Antenna Matching, Slot Loop'
    },
    {
      id: 'robotics',
      category: 'embedded',
      icon: Bot,
      title: 'Robotics & Autonomous Systems',
      subtitle: 'Robust wireless communication, telemetry, and radar sensing antennas.',
      desc: 'Mobile robots, AMR warehouse carts, and outdoor rover systems require reliable wireless connectivity in high metal reflection environments. Antennas are designed for high mechanical shock resistance and pattern coverage.',
      requirements: [
        'Hemispherical or omnidirectional coverage patterns',
        'Industrial ISM band optimization (2.4 GHz, 5.8 GHz, 24 GHz)',
        'High isolation from motor driver EMI',
        'Conformal mounting on metallic chassis'
      ],
      recommendedTech: 'Wideband Monopole, Slot Antenna, 24 GHz Millimeter-Wave Radar Patch'
    },
    {
      id: 'wireless-comm',
      category: 'wireless',
      icon: Radio,
      title: 'Wireless Communication',
      subtitle: 'Custom antennas for Wi-Fi 6E/7, cellular 4G/5G, and high-throughput RF systems.',
      desc: 'High-throughput routers, access points, and custom wireless transceivers demand multi-band MIMO antennas with high port isolation to achieve maximal beamforming and spatial multiplexing throughput.',
      requirements: [
        'Multi-band 2.4 / 5.2 / 5.8 / 6.0 GHz Wi-Fi coverage',
        'Port isolation > 22 dB & Envelope Correlation ECC < 0.04',
        'Controlled phase center for spatial beamforming',
        '50-ohm microstrip feed line matching'
      ],
      recommendedTech: '4x4 MIMO Patch Array, Dual-Polarized Dipole, Metamaterial Decoupled Array'
    },
    {
      id: 'aerospace',
      category: 'aerospace',
      icon: Navigation,
      title: 'Aerospace Systems',
      subtitle: 'Compact and application-specific RF antenna concepts for atmospheric and avionics platforms.',
      desc: 'Avionics, CubeSats, and high-altitude research payloads require extreme thermal stability, low outgassing substrate materials, and rigorous electromagnetic validation against structural frame reflections.',
      requirements: [
        'High-dielectric substrate stability across wide temperature ranges',
        'Conformal skin-flush mounting',
        'S-Band, C-Band, and X-Band SATCOM frequencies',
        'Cross-polarization discrimination > 25 dB'
      ],
      recommendedTech: 'Cavity-Backed Slot, Substrate Integrated Waveguide (SIW), Circular Patch'
    },
    {
      id: 'defence',
      category: 'aerospace',
      icon: Shield,
      title: 'Defence & Tactical Systems',
      subtitle: 'Specialized antenna engineering for secure communication and sensing applications.',
      desc: 'Tactical radios, uncrewed defense vehicles, and electronic surveillance equipment demand broadband coverage, low radar cross section (RCS) profiles, and directional beam shaping.',
      requirements: [
        'Broadband multi-octave operating frequency range',
        'High power handling capability',
        'Low profile for reduced visibility',
        'Directional null steering and high front-to-back ratio'
      ],
      recommendedTech: 'Vivaldi Antenna, Log-Periodic Array, Phased Array Concept'
    },
    {
      id: 'research',
      category: 'research',
      icon: GraduationCap,
      title: 'Research & Prototyping',
      subtitle: 'Custom antenna designs for universities, laboratories, and R&D technology teams.',
      desc: 'Academic research labs and corporate R&D teams often require novel antenna geometries to prove theoretical concepts, validate novel metamaterials, or test new frequency allocations.',
      requirements: [
        'Parametric CAD models for easy dimensional scaling',
        'Full HFSS / CST simulation source files & S2P data',
        'Clear mathematical rationale and design equations',
        'Custom frequency targets (e.g. 3.5 GHz, 10 GHz, 28 GHz)'
      ],
      recommendedTech: 'Metamaterial EBG, Reconfigurable Slot, Ultra-Wideband (UWB)'
    },
    {
      id: 'rf-electronics',
      category: 'embedded',
      icon: HardDrive,
      title: 'RF Electronics & PCB Systems',
      subtitle: 'Antennas integrated with PCB stackup, power amplifiers, and RF front-ends.',
      desc: 'Designing the antenna is only half the battle; integrating it with the RF front-end, LNA, PA, and transceiver chip requires co-simulation of microstrip feed lines and impedance matching circuits.',
      requirements: [
        'Controlled impedance feed lines (50 Ω coplanar waveguide / microstrip)',
        'PCB dielectric stackup co-design (e.g. FR4 + Rogers hybrid layer)',
        'Harmonic filtering and spurious suppression',
        'Ground stitch via array design for isolation'
      ],
      recommendedTech: 'Co-planar Waveguide Feed (CPW), Inset-fed Patch, Integrated Filter-Antenna'
    }
  ];

  const filtered = filterCategory === 'all' ? apps : apps.filter((a) => a.category === filterCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-28 pb-20">
      {/* HEADER */}
      <section className="relative py-12 bg-radial-gradient border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-full font-mono text-xs font-semibold">
            <Radio className="w-3.5 h-3.5" />
            APPLICATION DOMAINS
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Target Industry Applications
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Engineered antenna solutions designed around the physical, electrical, and environmental constraints of modern technology sectors.
          </p>

          {/* Filter Bar */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
            {[
              { id: 'all', label: 'All Industries' },
              { id: 'aviation', label: 'UAV & Aerospace' },
              { id: 'embedded', label: 'IoT & Embedded PCB' },
              { id: 'wireless', label: 'Wireless Comm & MIMO' },
              { id: 'research', label: 'R&D & University Labs' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-4 py-2 rounded-xl transition border ${
                  filterCategory === tab.id
                    ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS CARDS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((app) => {
            const IconComponent = app.icon;
            return (
              <div
                key={app.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-blue-400 transition duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-600">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{app.title}</h3>
                      <span className="text-xs font-mono text-blue-700 font-medium">{app.subtitle}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{app.desc}</p>

                  <div className="pt-2 space-y-2">
                    <h4 className="font-mono text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Key Technical Requirements:
                    </h4>
                    <ul className="space-y-1.5 font-mono text-xs text-slate-600">
                      {app.requirements.map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Recommended Architecture</span>
                    <span className="text-blue-700 font-bold">{app.recommendedTech}</span>
                  </div>
                  <button
                    onClick={() => setCurrentPage('quote')}
                    className="px-3.5 py-2 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 border border-blue-200 rounded-lg transition font-bold"
                  >
                    Request Design
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Have a Specific Application Constraint?</h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto font-mono">
            Tell us about your enclosure dimensions, operating environment, and ground plane limitations.
          </p>
          <button
            onClick={() => setCurrentPage('quote')}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition inline-flex items-center gap-2"
          >
            <span>Submit Your RF Requirement</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
