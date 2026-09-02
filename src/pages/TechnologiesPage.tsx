import React, { useState } from 'react';
import { Cpu, CheckCircle2, Info } from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  category: string;
  freqRange: string;
  typicalGain: string;
  polarization: string;
  bandwidth: string;
  applications: string;
  advantages: string[];
  designConsiderations: string;
}

export const TechnologiesPage: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
  const technologies: TechItem[] = [
    {
      id: 'patch',
      name: 'Microstrip Patch Antennas',
      category: 'Planar / PCB Integrated',
      freqRange: '0.9 GHz - 30.0 GHz',
      typicalGain: '5.0 - 9.0 dBi',
      polarization: 'Linear (RHCP / LHCP via dual-feed)',
      bandwidth: '2% - 8% (Narrowband)',
      applications: 'UAVs, IoT sensors, wireless transceivers, radar modules.',
      advantages: [
        'Low profile, lightweight planar surface',
        'Directly printable on standard PCB substrates',
        'Broadside directional radiation pattern'
      ],
      designConsiderations: 'Substrate surface waves and dielectric loss tangent (tan δ) require careful material selection (e.g. Rogers RO4003C).'
    },
    {
      id: 'slot',
      name: 'Slot Antennas',
      category: 'Aperture / Enclosure Integrated',
      freqRange: '1.5 GHz - 40.0 GHz',
      typicalGain: '3.0 - 7.0 dBi',
      polarization: 'Linear (perpendicular to slot)',
      bandwidth: '5% - 15%',
      applications: 'Metal casing integration, aerospace skin structures, waveguide feeds.',
      advantages: [
        'Can be cut directly into metallic structural enclosures',
        'Babinet principle dual of dipole antennas',
        'High mechanical durability'
      ],
      designConsiderations: 'Requires solid metallic ground plane backing or cavity backing to prevent back-radiation.'
    },
    {
      id: 'monopole-dipole',
      name: 'Monopole & Dipole Antennas',
      category: 'Omnidirectional Wire / Printed',
      freqRange: '100 MHz - 10.0 GHz',
      typicalGain: '2.15 - 5.0 dBi',
      polarization: 'Linear',
      bandwidth: '10% - 25%',
      applications: 'Wi-Fi routers, telemetry dongles, base station omni links.',
      advantages: [
        '360° omnidirectional azimuth radiation pattern',
        'Simple impedance matching structure',
        'High radiation efficiency (&gt;85%)'
      ],
      designConsiderations: 'Monopole antennas mandate a robust ground plane dimension (quarter-wavelength minimum radius).'
    },
    {
      id: 'wideband',
      name: 'Wideband Antennas',
      category: 'Broadband / Frequency Independent',
      freqRange: '0.8 GHz - 18.0 GHz (Multi-octave)',
      typicalGain: '4.0 - 10.0 dBi',
      polarization: 'Linear / Elliptical',
      bandwidth: '&gt; 50% (Wideband / UWB)',
      applications: 'Spectrum monitoring, EMC testing, ultra-wideband (UWB) positioning.',
      advantages: [
        'Multi-octave continuous frequency coverage',
        'Vivaldi, log-periodic, and biconical planar geometries',
        'Consistent gain across broad band'
      ],
      designConsiderations: 'Phase center variations over frequency require group delay optimization.'
    },
    {
      id: 'compact',
      name: 'Compact & Electrically Small Antennas',
      category: 'Miniaturized / Space-Constrained',
      freqRange: '433 MHz - 5.8 GHz',
      typicalGain: '0.5 - 3.5 dBi',
      polarization: 'Linear',
      bandwidth: '1% - 5%',
      applications: 'Wearable IoT, medical implants, compact drone payloads.',
      advantages: [
        'Extreme volume reduction (&lt;λ/10 footprint)',
        'PIFA and meandered inverted-F architectures',
        'Enclosure surface conformal layout'
      ],
      designConsiderations: 'Subject to the Chu-Harrington fundamental limit: trade-off between miniaturization, bandwidth, and efficiency.'
    },
    {
      id: 'mimo',
      name: 'MIMO Antennas',
      category: 'Multi-Antenna Arrays',
      freqRange: '2.4 GHz - 28.0 GHz',
      typicalGain: '3.0 - 8.0 dBi (Per element)',
      polarization: 'Dual-polarized / Orthogonal',
      bandwidth: '10% - 30%',
      applications: 'Wi-Fi 6E/7 routers, 5G NR terminals, multipath telemetry.',
      advantages: [
        'High port isolation (&gt;20 dB)',
        'Low Envelope Correlation Coefficient (ECC &lt; 0.05)',
        'Multiplied channel spatial capacity'
      ],
      designConsiderations: 'Requires mutual coupling suppression techniques (defected ground structures, neutral lines).'
    },
    {
      id: 'array',
      name: 'Array Antennas',
      category: 'High-Gain Multi-Element',
      freqRange: '2.4 GHz - 60.0 GHz',
      typicalGain: '12.0 - 24.0 dBi',
      polarization: 'Linear / Circular',
      bandwidth: '5% - 15%',
      applications: 'Long-range point-to-point links, radar sensing, SATCOM.',
      advantages: [
        'High directivity and EIRP amplification',
        'Corporate Wilkinson power divider feed networks',
        'Sidelobe suppression through amplitude tapering'
      ],
      designConsiderations: 'Transmission line dielectric loss in corporate feed networks scales with array size.'
    },
    {
      id: 'circular-polarization',
      name: 'Circularly Polarized Antennas',
      category: 'Polarization Diversity',
      freqRange: '1.2 GHz - 12.0 GHz',
      typicalGain: '4.0 - 8.0 dBi',
      polarization: 'RHCP / LHCP (Right/Left Hand Circular)',
      bandwidth: 'Axial Ratio &lt; 3 dB over band',
      applications: 'GNSS (GPS/GLONASS/Galileo), satellite telemetry, FPV drones.',
      advantages: [
        'Mitigates polarization mismatch losses caused by tumbling platforms',
        'Truncated corner patches, cross-slots, and sequential rotation feeds',
        'Suppresses multipath reflection interference'
      ],
      designConsiderations: '3 dB Axial Ratio bandwidth is narrower than impedance bandwidth, requiring dual quadrature feeding.'
    },
    {
      id: 'dual-multiband',
      name: 'Dual-Band / Multi-Band Antennas',
      category: 'Multi-Frequency Integrated',
      freqRange: '2.4 / 5.8 GHz & 868 / 2400 MHz',
      typicalGain: '2.5 - 6.0 dBi',
      polarization: 'Linear',
      bandwidth: 'Dual resonant bands',
      applications: 'Dual-band Wi-Fi/Bluetooth dongles, cellular (4G/5G) multi-band devices.',
      advantages: [
        'Single physical aperture serves multiple operating standards',
        'Concentric slot / dual-stub resonant structures',
        'Reduces component count and assembly cost'
      ],
      designConsiderations: 'Independent tuning of low and high band resonances requires decoupling stubs.'
    },
    {
      id: 'metamaterial',
      name: 'Metamaterial-Inspired Antennas',
      category: 'Advanced Electromagnetic Surfaces',
      freqRange: '2.0 GHz - 24.0 GHz',
      typicalGain: '4.0 - 9.0 dBi',
      polarization: 'Linear / Dual',
      bandwidth: 'Tailored dispersion',
      applications: 'Zeroth-order resonators, beam shaping, surface wave suppression.',
      advantages: [
        'Split-Ring Resonators (SRR) and Electromagnetic Bandgap (EBG) surfaces',
        'Miniaturization beyond conventional standing-wave limits',
        'Enhanced gain and backlobe reduction'
      ],
      designConsiderations: 'Requires rigorous unit-cell dispersion analysis ($S_{11}, S_{21}$ phase curves) in HFSS.'
    },
    {
      id: 'phased-array',
      name: 'Phased Array Antenna Concepts',
      category: 'Electronic Beam Steering',
      freqRange: '10.0 GHz - 38.0 GHz (mmWave)',
      typicalGain: '14.0 - 22.0 dBi',
      polarization: 'Linear / Dual',
      bandwidth: '5% - 15%',
      applications: '5G mmWave base stations, satellite tracking, automotive radar.',
      advantages: [
        'Agile inertia-less electronic beam steering',
        'Phased delay integration capability',
        'Deep spatial null placement for anti-jamming'
      ],
      designConsiderations: 'Grating lobes and active element impedance variation over scan angle requires unit-cell Floquet analysis.'
    }
  ];

  const [selectedTech, setSelectedTech] = useState<TechItem>(technologies[0]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-28 pb-20">
      {/* HEADER */}
      <section className="relative py-12 bg-radial-gradient border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-full font-mono text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            ELECTROMAGNETIC CAPABILITIES
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Antenna Technologies & Design Capabilities
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our computational engineering expertise spans planar microstrip patches, wideband Vivaldi structures, compact PIFAs, MIMO systems, and phased array architectures.
          </p>
        </div>
      </section>

      {/* INTERACTIVE TECH MATRIX & COMPARATOR */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Tech Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Select Technology Architecture</span>
              <span className="text-blue-600 font-normal">11 Capabilities</span>
            </h3>

            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {technologies.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => setSelectedTech(tech)}
                  className={`w-full text-left p-3.5 rounded-xl font-mono text-xs transition duration-200 border flex items-center justify-between ${
                    selectedTech.id === tech.id
                      ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className="block text-slate-900 font-sans font-semibold text-sm">{tech.name}</span>
                    <span className="text-[10px] text-slate-500">{tech.category}</span>
                  </div>
                  <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold">
                    {tech.freqRange.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Tech Specification Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-mono text-[10px] rounded border border-blue-200 font-bold">
                  {selectedTech.category}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">{selectedTech.name}</h2>
              </div>
              <button
                onClick={() => setCurrentPage('quote')}
                className="px-4 py-2 bg-blue-600 text-white font-mono font-bold text-xs rounded-lg shadow-sm hover:bg-blue-700 transition"
              >
                Request Design
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Frequency Band</span>
                <span className="text-blue-700 font-bold text-sm">{selectedTech.freqRange}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Typical Peak Gain</span>
                <span className="text-blue-700 font-bold text-sm">{selectedTech.typicalGain}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Polarization</span>
                <span className="text-slate-800 font-bold">{selectedTech.polarization}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Bandwidth (S11 &lt; -10dB)</span>
                <span className="text-slate-800 font-bold">{selectedTech.bandwidth}</span>
              </div>
            </div>

            <div className="space-y-3 font-sans">
              <h4 className="font-mono text-xs font-bold text-slate-700 uppercase tracking-wider">Target Applications</h4>
              <p className="text-slate-700 text-xs sm:text-sm bg-slate-50 p-3 rounded-lg border border-slate-200">
                {selectedTech.applications}
              </p>

              <h4 className="font-mono text-xs font-bold text-slate-700 uppercase tracking-wider pt-2">Key Engineering Advantages</h4>
              <ul className="space-y-2 font-mono text-xs text-slate-700">
                {selectedTech.advantages.map((adv, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>

              <h4 className="font-mono text-xs font-bold text-slate-700 uppercase tracking-wider pt-2">Design & Simulation Considerations</h4>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-slate-700 font-mono flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{selectedTech.designConsiderations}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER STRIP */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 bg-white border border-slate-200 rounded-xl text-center text-xs font-mono text-slate-600 shadow-sm">
          <strong className="text-blue-600">ENGINEERING SCOPE NOTICE:</strong> All antenna architectures listed above are provided as custom design and electromagnetic simulation services. Final performance is optimized based on customer-provided enclosure models and substrate stackup.
        </div>
      </section>
    </div>
  );
};
