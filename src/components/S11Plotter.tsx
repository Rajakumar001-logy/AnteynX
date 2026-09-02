import React, { useState } from 'react';
import { TrendingDown, Activity, Info } from 'lucide-react';

interface S11PlotterProps {
  centerFreq?: number; // GHz
  bandwidth?: string; // e.g. "240 MHz (2.35 - 2.59 GHz)"
  minS11?: number; // dB e.g. -28.4
  title?: string;
}

export const S11Plotter: React.FC<S11PlotterProps> = ({
  centerFreq = 5.8,
  bandwidth = '320 MHz (5.64 - 5.96 GHz)',
  minS11 = -31.5,
  title = 'S11 Return Loss vs Frequency (HFSS Engine)'
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<{ freq: number; s11: number; x: number; y: number } | null>(null);

  // Generate synthetic accurate S11 curve data around center frequency
  const fStart = centerFreq * 0.8;
  const fEnd = centerFreq * 1.2;
  const steps = 100;
  
  const points: { freq: number; s11: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const freq = fStart + (i / steps) * (fEnd - fStart);
    // Lorentzian / Resonance formula for S11 dip in dB
    const delta = (freq - centerFreq) / (centerFreq * 0.04);
    const s11Linear = 1 - 1 / (1 + delta * delta);
    // Convert to dB with minimum clamp
    let s11 = 20 * Math.log10(Math.max(0.005, s11Linear));
    if (s11 < minS11) s11 = minS11;
    points.push({ freq, s11 });
  }

  // Plotting dimensions
  const svgW = 500;
  const svgH = 240;
  const paddingLeft = 50;
  const paddingBottom = 40;
  const paddingTop = 30;
  const paddingRight = 20;

  const graphW = svgW - paddingLeft - paddingRight;
  const graphH = svgH - paddingTop - paddingBottom;

  const minDb = -35;
  const maxDb = 0;

  const getX = (freq: number) => paddingLeft + ((freq - fStart) / (fEnd - fStart)) * graphW;
  const getY = (s11: number) => paddingTop + ((maxDb - s11) / (maxDb - minDb)) * graphH;

  // Path SVG line string
  const pathData = points.reduce((acc, pt, idx) => {
    const x = getX(pt.freq);
    const y = getY(pt.s11);
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }, '');

  // -10 dB Line Y
  const y10dB = getY(-10);
  const centerX = getX(centerFreq);
  const centerY = getY(minS11);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    if (mouseX >= paddingLeft && mouseX <= svgW - paddingRight) {
      const relX = (mouseX - paddingLeft) / graphW;
      const targetFreq = fStart + relX * (fEnd - fStart);
      
      // Find closest point
      const closest = points.reduce((prev, curr) => 
        Math.abs(curr.freq - targetFreq) < Math.abs(prev.freq - targetFreq) ? curr : prev
      );

      setHoveredPoint({
        freq: closest.freq,
        s11: closest.s11,
        x: getX(closest.freq),
        y: getY(closest.s11)
      });
    }
  };

  return (
    <div className="w-full bg-rf-navy/90 rounded-xl border border-rf-border/80 p-4 font-mono shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-rf-border/60">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-cyan-400" />
          <h4 className="text-sm font-semibold text-slate-100">{title}</h4>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400">f0: <strong className="text-cyan-300">{centerFreq.toFixed(2)} GHz</strong></span>
          <span className="text-slate-400">Min S11: <strong className="text-cyan-300">{minS11.toFixed(1)} dB</strong></span>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="w-full h-auto cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          {/* Background Grid */}
          <rect x={paddingLeft} y={paddingTop} width={graphW} height={graphH} fill="#070B14" rx="4" />
          
          {/* Y Axis Grid Lines & Labels */}
          {[-30, -20, -10, 0].map((db) => {
            const y = getY(db);
            return (
              <g key={db}>
                <line x1={paddingLeft} y1={y} x2={svgW - paddingRight} y2={y} stroke="#1E2D4A" strokeWidth="1" strokeDasharray="3 3" />
                <text x={paddingLeft - 8} y={y + 3} fill="#64748B" fontSize="10" textAnchor="end">{db}</text>
              </g>
            );
          })}

          {/* -10 dB Reference Threshold Line (Bandwidth criteria) */}
          <line x1={paddingLeft} y1={y10dB} x2={svgW - paddingRight} y2={y10dB} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="5 3" />
          <text x={svgW - paddingRight - 60} y={y10dB - 5} fill="#EF4444" fontSize="9" fontWeight="bold">-10 dB Line</text>

          {/* Resonance Center Vertical Guideline */}
          <line x1={centerX} y1={paddingTop} x2={centerX} y2={svgH - paddingBottom} stroke="rgba(0,240,255,0.3)" strokeWidth="1" strokeDasharray="2 2" />

          {/* X Axis Grid Lines & Labels */}
          {[fStart, centerFreq, fEnd].map((f, i) => {
            const x = getX(f);
            return (
              <g key={i}>
                <line x1={x} y1={paddingTop} x2={x} y2={svgH - paddingBottom} stroke="#1E2D4A" strokeWidth="1" />
                <text x={x} y={svgH - paddingBottom + 16} fill="#94A3B8" fontSize="10" textAnchor="middle">{f.toFixed(2)}</text>
              </g>
            );
          })}

          {/* S11 Curve */}
          <path d={pathData} fill="none" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" />

          {/* Resonant Point Dip Marker */}
          <circle cx={centerX} cy={centerY} r="5" fill="#00F0FF" stroke="#070B14" strokeWidth="2" />
          
          {/* Annotation text for resonant dip */}
          <g transform={`translate(${centerX - 45}, ${centerY - 18})`}>
            <rect width="90" height="18" rx="3" fill="rgba(14,22,40,0.9)" stroke="#00F0FF" strokeWidth="1" />
            <text x="45" y="12" fill="#00F0FF" fontSize="9" fontWeight="bold" textAnchor="middle">
              {minS11.toFixed(1)} dB @ {centerFreq.toFixed(2)}G
            </text>
          </g>

          {/* Interactive Hover Marker */}
          {hoveredPoint && (
            <g>
              <line x1={hoveredPoint.x} y1={paddingTop} x2={hoveredPoint.x} y2={svgH - paddingBottom} stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r="4" fill="#EAB308" />
            </g>
          )}

          {/* X-Axis Label */}
          <text x={svgW / 2} y={svgH - 8} fill="#94A3B8" fontSize="10" textAnchor="middle">Frequency (GHz)</text>
          
          {/* Y-Axis Label */}
          <text x={14} y={svgH / 2} fill="#94A3B8" fontSize="10" textAnchor="middle" transform={`rotate(-90 14 ${svgH / 2})`}>S11 (dB)</text>
        </svg>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-slate-400 bg-rf-dark/60 p-2 rounded border border-rf-border/40">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          -10 dB Bandwidth: <strong className="text-cyan-300 font-bold">{bandwidth}</strong>
        </span>
        <span className="text-slate-400">VSWR &lt; 2:1 inside band</span>
      </div>
    </div>
  );
};
