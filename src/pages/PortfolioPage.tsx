import React, { useState } from 'react';
import { S11Plotter } from '../components/S11Plotter';
import { RadiationPattern3D } from '../components/RadiationPattern3D';
import { Radio, Eye, X, ArrowRight, Box } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  frequency: string;
  centerFreqNum: number;
  application: string;
  type: string;
  simulation: string;
  status: string;
  gain: string;
  bandwidth: string;
  polarization: string;
  substrate: string;
  dimensions: string;
  efficiency: string;
  description: string;
}

export const PortfolioPage: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
  const projects: Project[] = [
    {
      id: '5.8ghz-uav',
      title: 'Compact 5.8 GHz UAV Microstrip Patch Antenna',
      frequency: '5.8 GHz (5.47 - 5.95 GHz)',
      centerFreqNum: 5.8,
      application: 'UAV / Drone Telemetry & Video Link',
      type: 'Microstrip Patch',
      simulation: 'ANSYS HFSS (Finite Element Solvers)',
      status: 'Demonstration Project',
      gain: '6.2 dBi',
      bandwidth: '480 MHz (-10 dB BW)',
      polarization: 'Linear (Broadside)',
      substrate: 'Rogers RO4003C (εr = 3.55, h = 0.813 mm)',
      dimensions: '14.2 mm × 11.8 mm (Patch), 28.0 mm × 25.0 mm (Ground)',
      efficiency: '91.4%',
      description: 'Engineered broadside microstrip patch antenna designed to operate in the 5.8 GHz ISM video telemetry band. Optimized for carbon-fiber drone airframe installation with integrated inset microstrip line feed.'
    },
    {
      id: '2.4ghz-iot',
      title: '2.4 GHz Compact Printed IoT Sensor Antenna',
      frequency: '2.45 GHz (2.40 - 2.50 GHz)',
      centerFreqNum: 2.45,
      application: 'IoT / Smart Wearables / Bluetooth',
      type: 'Compact Printed Inverted-F (PIFA)',
      simulation: 'CST Microwave Studio (Transient Solver)',
      status: 'Demonstration Project',
      gain: '2.8 dBi',
      bandwidth: '120 MHz (-10 dB BW)',
      polarization: 'Linear (Omnidirectional Azimuth)',
      substrate: 'FR4 Epoxy (εr = 4.4, h = 1.6 mm)',
      dimensions: '18.5 mm × 6.2 mm (Meandered Trace)',
      efficiency: '74.2%',
      description: 'Space-constrained meandered printed antenna engineered for integration directly onto IoT sensor PCBs. Robust against dielectric detuning caused by surrounding plastic ABS enclosures.'
    },
    {
      id: '10ghz-circular',
      title: '10 GHz Circular Microstrip Patch Antenna',
      frequency: '10.0 GHz (9.82 - 10.18 GHz)',
      centerFreqNum: 10.0,
      application: 'X-Band Radar & Sensor Demonstrator',
      type: 'Circular Microstrip Patch',
      simulation: 'ANSYS HFSS (Finite Element Solver)',
      status: 'Research Demonstration',
      gain: '7.1 dBi',
      bandwidth: '360 MHz (-10 dB BW)',
      polarization: 'Right-Hand Circular (RHCP via dual orthogonal feed)',
      substrate: 'Taconic TLX-8 (εr = 2.55, h = 0.79 mm)',
      dimensions: 'D = 9.4 mm (Circular Diameter)',
      efficiency: '88.6%',
      description: 'X-Band circular microstrip patch incorporating a quadrature 90° hybrid coupler feed network to generate high-purity Right-Hand Circular Polarization (RHCP) with Axial Ratio < 2.0 dB.'
    },
    {
      id: '16-element-array',
      title: '16-Element 28 GHz Phased Array Concept',
      frequency: '28.0 GHz (27.2 - 28.8 GHz)',
      centerFreqNum: 28.0,
      application: '5G mmWave / High-Speed Beamforming',
      type: '4x4 Planar Patch Array',
      simulation: 'ANSYS HFSS (Unit-Cell Floquet & Full Array)',
      status: 'Research Demonstration',
      gain: '16.5 dBi (Peak Broadside)',
      bandwidth: '1.6 GHz (-10 dB BW)',
      polarization: 'Linear Dual-Polarized',
      substrate: 'Rogers RT/duroid 5880 (εr = 2.2, h = 0.508 mm)',
      dimensions: '22.0 mm × 22.0 mm (Full 4x4 Aperture)',
      efficiency: '84.0%',
      description: '16-element (4x4) planar microstrip array featuring a corporate Wilkinson power divider feed network. Designed for high EIRP mmWave links with ±45° electronic scan capability.'
    },
    {
      id: 'dualband-mimo',
      title: 'Dual-Band 2.4 / 5.8 GHz Wi-Fi 2x2 MIMO Antenna',
      frequency: '2.45 GHz & 5.80 GHz Dual-Resonant',
      centerFreqNum: 5.8,
      application: 'Wireless Routers / High-Throughput Access Points',
      type: 'Dual-Slot MIMO Array',
      simulation: 'CST Microwave Studio',
      status: 'Demonstration Project',
      gain: '3.5 dBi (2.4G) / 5.8 dBi (5.8G)',
      bandwidth: '150 MHz @ 2.4G / 500 MHz @ 5.8G',
      polarization: 'Orthogonal Polarization Diversity',
      substrate: 'FR4 Epoxy (εr = 4.4, h = 1.0 mm)',
      dimensions: '32.0 mm × 18.0 mm',
      efficiency: '78.5%',
      description: 'Dual-port MIMO antenna system providing concurrent dual-band operation. Employs a defected ground structure (DGS) to achieve port isolation > 24 dB and Envelope Correlation ECC < 0.02.'
    }
  ];

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-28 pb-20">
      {/* HEADER */}
      <section className="relative py-12 bg-radial-gradient border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full font-mono text-xs font-semibold">
            <Radio className="w-3.5 h-3.5" />
            ENGINEERING DEMONSTRATIONS
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Engineering Demonstration Portfolio
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Examine sample antenna design and simulation projects demonstrating our electromagnetic modeling, return loss optimization, and far-field radiation synthesis capabilities.
          </p>

          <div className="p-3 bg-white border border-slate-200 rounded-xl max-w-xl mx-auto text-xs font-mono text-slate-600 shadow-sm">
            <strong className="text-amber-700">TRANSPARENCY NOTICE:</strong> All projects shown below are internally generated <span className="text-blue-600 underline font-bold">Demonstration Projects</span> created using HFSS / CST simulation to display technical capability. We do not display proprietary customer work.
          </div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 hover:border-blue-400 transition duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-800 font-mono text-[10px] rounded border border-amber-200 font-bold">
                    {proj.status.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-blue-600 font-bold">{proj.frequency.split(' ')[0]}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">{proj.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{proj.description}</p>

                {/* Key Specs Table */}
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 space-y-2 font-mono text-xs">
                  <div className="flex justify-between border-b border-slate-200 pb-1">
                    <span className="text-slate-500">Antenna Type:</span>
                    <span className="text-slate-800 font-semibold">{proj.type}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1">
                    <span className="text-slate-500">Application:</span>
                    <span className="text-blue-700 font-semibold">{proj.application}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1">
                    <span className="text-slate-500">Peak Gain:</span>
                    <span className="text-blue-600 font-bold">{proj.gain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Efficiency:</span>
                    <span className="text-emerald-700 font-bold">{proj.efficiency}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 border border-blue-200 rounded-xl font-mono text-xs font-bold transition"
                >
                  <Eye className="w-4 h-4" />
                  <span>Inspect S11 & 3D Radiation Pattern</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPANDABLE MODAL / DETAIL DRAWER */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 font-sans">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 bg-slate-100 rounded-lg border border-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-amber-50 text-amber-800 font-mono text-xs font-bold rounded border border-amber-200">
                  {selectedProject.status}
                </span>
                <span className="text-xs font-mono text-slate-500">Solver: {selectedProject.simulation}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{selectedProject.title}</h2>
              <p className="text-slate-600 text-xs sm:text-sm">{selectedProject.description}</p>
            </div>

            {/* Interactive S11 & Radiation Pattern Dual Visualizer Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-mono font-bold text-blue-600 uppercase mb-2">Simulated Return Loss (S11)</h4>
                <S11Plotter
                  centerFreq={selectedProject.centerFreqNum}
                  bandwidth={selectedProject.bandwidth}
                  minS11={-31.5}
                  title={`S11 Plot - ${selectedProject.title}`}
                />
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold text-blue-600 uppercase mb-2">3D Far-Field Directivity</h4>
                <RadiationPattern3D
                  peakGain={selectedProject.gain}
                  beamwidth="76° HPBW"
                  antennaType={selectedProject.type}
                />
              </div>
            </div>

            {/* Full Specs Breakdown Table */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3 font-mono text-xs">
              <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                <Box className="w-4 h-4 text-blue-600" />
                Complete Parameter Breakdown
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                <div><span className="text-slate-500">Center Frequency:</span> <strong className="text-blue-700">{selectedProject.frequency}</strong></div>
                <div><span className="text-slate-500">Peak Gain:</span> <strong className="text-blue-700">{selectedProject.gain}</strong></div>
                <div><span className="text-slate-500">Impedance Bandwidth:</span> <strong className="text-slate-800">{selectedProject.bandwidth}</strong></div>
                <div><span className="text-slate-500">Radiation Efficiency:</span> <strong className="text-emerald-700">{selectedProject.efficiency}</strong></div>
                <div><span className="text-slate-500">Polarization:</span> <strong className="text-slate-800">{selectedProject.polarization}</strong></div>
                <div><span className="text-slate-500">Substrate Material:</span> <strong className="text-slate-800">{selectedProject.substrate}</strong></div>
                <div className="sm:col-span-2"><span className="text-slate-500">Physical Dimensions:</span> <strong className="text-blue-700">{selectedProject.dimensions}</strong></div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-mono font-bold"
              >
                Close View
              </button>

              <button
                onClick={() => {
                  setSelectedProject(null);
                  setCurrentPage('quote');
                }}
                className="px-6 py-2.5 bg-blue-600 text-white font-mono font-bold text-xs rounded-lg shadow-sm hover:bg-blue-700 transition flex items-center gap-2"
              >
                <span>Request Similar Antenna Design</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
