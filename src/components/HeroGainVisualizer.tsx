import React, { useState, useEffect } from 'react';
import { Activity, Play, Pause, ChevronRight, ChevronLeft, ShieldCheck, Sparkles, Maximize2, X, RefreshCw } from 'lucide-react';

interface GainPlot {
  id: string;
  title: string;
  maxGain: string;
  minGain: string;
  imageSrc: string;
  solver: string;
  application: string;
  description: string;
  color: string;
}

const GAIN_PLOTS: GainPlot[] = [
  {
    id: 'plot-1',
    title: 'High-Gain Phased Array 3D Directivity (20.59 dBi)',
    maxGain: '20.59 dBi',
    minGain: '-51.77 dBi',
    imageSrc: '/assets/ansys-gain-plot-20.59dB.png',
    solver: 'Ansys HFSS 2024 R1 (FEA Engine)',
    application: '5G mmWave & Long-Range Telemetry Array',
    description: 'Full 3D spherical gain total plot extracted from Finite Element Analysis. Displays sharp broadside main beam with sidelobe suppression.',
    color: 'from-blue-600 to-sky-500'
  },
  {
    id: 'plot-2',
    title: 'Shaped Beam Array 3D Gain Lobe (18.67 dBi)',
    maxGain: '18.67 dBi',
    minGain: '-43.29 dBi',
    imageSrc: '/assets/ansys-gain-plot-18.67dB.png',
    solver: 'Ansys HFSS 2024 R1 (MoM Solver)',
    application: 'Aerospace & Radar Sensing Subarray',
    description: 'High-efficiency directional radiation pattern showing continuous broadside gain lobe with low back-radiation.',
    color: 'from-sky-600 to-cyan-500'
  },
  {
    id: 'plot-3',
    title: 'Broadside Microstrip Patch Gain (11.18 dBi)',
    maxGain: '11.18 dBi',
    minGain: '-27.57 dBi',
    imageSrc: '/assets/ansys-gain-plot-11.18dB.png',
    solver: 'Ansys HFSS 2024 R1 (Full-Wave FEA)',
    application: 'UAV & Space-Constrained Payload Antenna',
    description: 'Hemispherical broadside gain pattern synthesized for compact printed microstrip patch antenna architectures.',
    color: 'from-indigo-600 to-blue-500'
  }
];

export const HeroGainVisualizer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [inspectModalOpen, setInspectModalOpen] = useState<boolean>(false);
  const [scanPosition, setScanPosition] = useState<number>(0);

  const activePlot = GAIN_PLOTS[currentIndex];

  // Auto-slide effect for gain animation
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GAIN_PLOTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  // Laser scanner animation effect
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
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                Ansys HFSS 3D Electromagnetic Gain Visualizer
              </h3>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-mono font-bold rounded border border-blue-200">
                HFSS 2024 R1
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              3D Far-Field Directivity & Power Distribution Lobe
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition border font-bold text-[11px] ${
              isAutoplay
                ? 'bg-blue-50 text-blue-700 border-blue-300'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            {isAutoplay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isAutoplay ? 'Auto' : 'Paused'}</span>
          </button>

          <button
            onClick={() => setInspectModalOpen(true)}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-200"
            title="Inspect Full-Screen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Image Display with Scanning Animation */}
      <div className="relative w-full h-[320px] sm:h-[350px] bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center group">
        {/* Animated Scanning Laser Line */}
        <div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent z-20 pointer-events-none opacity-75 shadow-[0_0_8px_#2563eb]"
          style={{ top: `${scanPosition}%` }}
        />

        {/* Ansys Plot Image */}
        <img
          key={activePlot.id}
          src={activePlot.imageSrc}
          alt={activePlot.title}
          className="max-h-full max-w-full object-contain p-2 transition-all duration-700 transform scale-100 group-hover:scale-105"
        />

        {/* Floating Peak Gain Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm font-mono text-xs z-10 space-y-0.5">
          <span className="text-[10px] text-slate-500 block uppercase">Peak Realized Gain</span>
          <span className="text-sm font-bold text-blue-600">{activePlot.maxGain}</span>
        </div>

        {/* Floating Solver Badge */}
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
            onClick={() => {
              setCurrentIndex(idx);
              setIsAutoplay(false);
            }}
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

      {/* Plot Description Box */}
      <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs font-sans">
        <div className="flex items-center justify-between font-mono">
          <span className="font-bold text-slate-900 text-xs">{activePlot.title}</span>
          <span className="text-[10px] text-blue-600 font-bold">{activePlot.application}</span>
        </div>
        <p className="text-slate-600 text-xs leading-relaxed">
          {activePlot.description}
        </p>
      </div>

      {/* Full-Screen Inspection Modal */}
      {inspectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-5xl w-full p-6 space-y-4 shadow-2xl relative">
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

            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex items-center justify-center h-[500px]">
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
