import React, { useState, useEffect } from 'react';
import { Activity, ChevronRight, ChevronLeft, Maximize2, X } from 'lucide-react';

interface GainPlot {
  id: string;
  title: string;
  maxGain: string;
  minGain: string;
  imageSrc: string;
  solver: string;
}

const GAIN_PLOTS: GainPlot[] = [
  {
    id: 'plot-1',
    title: 'High-Gain Phased Array 3D Directivity (20.59 dBi)',
    maxGain: '20.59 dBi',
    minGain: '-51.77 dBi',
    imageSrc: '/assets/ansys-gain-plot-20.59dB.png',
    solver: 'Ansys HFSS FEA Engine'
  },
  {
    id: 'plot-2',
    title: 'Shaped Beam Array 3D Gain Lobe (18.67 dBi)',
    maxGain: '18.67 dBi',
    minGain: '-43.29 dBi',
    imageSrc: '/assets/ansys-gain-plot-18.67dB.png',
    solver: 'Ansys HFSS MoM Solver'
  },
  {
    id: 'plot-3',
    title: 'Broadside Microstrip Patch Gain (11.18 dBi)',
    maxGain: '11.18 dBi',
    minGain: '-27.57 dBi',
    imageSrc: '/assets/ansys-gain-plot-11.18dB.png',
    solver: 'Ansys HFSS Full-Wave Solver'
  }
];

export const HeroGainVisualizer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inspectModalOpen, setInspectModalOpen] = useState<boolean>(false);
  const [scanPosition, setScanPosition] = useState<number>(0);

  const activePlot = GAIN_PLOTS[currentIndex];

  // Continuous laser scanner animation effect
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanPosition((prev) => (prev + 1) % 100);
    }, 30);
    return () => clearInterval(scanInterval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GAIN_PLOTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? GAIN_PLOTS.length - 1 : prev - 1));
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-md p-4 sm:p-5 font-sans relative overflow-hidden">
      {/* Top Bar Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
            <Activity className="w-4 h-4 text-blue-600 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
              Ansys HFSS 3D Gain Plot Visualizer
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setInspectModalOpen(true)}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-200 transition"
            title="Inspect Full-Screen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Image Display - ONLY THE 3D GAIN PLOT */}
      <div className="relative w-full h-[320px] sm:h-[350px] bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center group">
        {/* Animated Scanning Line */}
        <div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent z-20 pointer-events-none opacity-75 shadow-[0_0_8px_#2563eb]"
          style={{ top: `${scanPosition}%` }}
        />

        {/* Cropped Ansys 3D Gain Lobe Plot Image */}
        <img
          key={activePlot.id}
          src={activePlot.imageSrc}
          alt={activePlot.title}
          className="max-h-[85%] max-w-[85%] object-contain transition-all duration-700 transform hover:scale-110 drop-shadow-md"
        />

        {/* Floating Peak Gain Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm font-mono text-xs z-10 space-y-0.5">
          <span className="text-[10px] text-slate-500 block uppercase">Peak Realized Gain</span>
          <span className="text-sm font-bold text-blue-600">{activePlot.maxGain}</span>
        </div>

        {/* Floating Range Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm font-mono text-xs z-10">
          <span className="text-[10px] text-slate-500 block">Dynamic Range</span>
          <span className="text-xs font-bold text-slate-800">{activePlot.minGain} to {activePlot.maxGain}</span>
        </div>

        {/* Carousel Navigation Arrow Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white text-slate-800 rounded-full border border-slate-200 shadow-md transition z-20 hover:scale-110"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white text-slate-800 rounded-full border border-slate-200 shadow-md transition z-20 hover:scale-110"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Plot Selector Tabs */}
      <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-xs">
        {GAIN_PLOTS.map((plot, idx) => (
          <button
            key={plot.id}
            onClick={() => setCurrentIndex(idx)}
            className={`p-2 rounded-lg border text-left transition ${
              currentIndex === idx
                ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <span className="text-[10px] text-slate-500 block">PLOT 0{idx + 1}</span>
            <span className="truncate block font-bold text-[11px]">{plot.maxGain}</span>
          </button>
        ))}
      </div>

      {/* Plot Title Box */}
      <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl font-sans">
        <span className="font-bold text-slate-900 text-xs font-mono">{activePlot.title}</span>
      </div>

      {/* Full-Screen Inspection Modal */}
      {inspectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setInspectModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 bg-slate-100 rounded-lg border border-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 font-mono">
              <span className="text-xs font-bold text-blue-600 uppercase">{activePlot.solver}</span>
              <h2 className="text-xl font-bold text-slate-900 font-sans">{activePlot.title}</h2>
            </div>

            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 flex items-center justify-center h-[420px]">
              <img
                src={activePlot.imageSrc}
                alt={activePlot.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between font-mono text-xs pt-2">
              <div>
                <span className="text-slate-500">Max Realized Gain: </span>
                <strong className="text-blue-600">{activePlot.maxGain}</strong>
              </div>
              <button
                onClick={() => setInspectModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
