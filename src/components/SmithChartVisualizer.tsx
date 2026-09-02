import React, { useEffect, useRef } from 'react';
import { Target } from 'lucide-react';

export const SmithChartVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight || 280;
      }
    };
    resize();

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) * 0.42;

    ctx.clearRect(0, 0, w, h);

    // Outer unity reflection circle |Gamma| = 1
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    // Horizontal Real Axis
    ctx.beginPath();
    ctx.moveTo(cx - r, cy);
    ctx.lineTo(cx + r, cy);
    ctx.stroke();

    // Constant Resistance Circles
    const rCircles = [0.5, 1.0, 2.0];
    rCircles.forEach((res) => {
      const circleR = r / (1 + res);
      const circleCx = cx + r - circleR;

      ctx.beginPath();
      ctx.strokeStyle = res === 1.0 ? 'rgba(37, 99, 235, 0.4)' : '#E2E8F0';
      ctx.lineWidth = res === 1.0 ? 1.5 : 1;
      ctx.arc(circleCx, cy, circleR, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Constant Reactance Arcs
    const xArcs = [0.5, 1.0, 2.0, -0.5, -1.0, -2.0];
    xArcs.forEach((xVal) => {
      const arcR = r / Math.abs(xVal);
      const arcCy = cy - (r / xVal);

      ctx.beginPath();
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1;
      ctx.arc(cx + r, arcCy, arcR, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Ideal 50 Ohm Match Point (Center of Smith Chart)
    ctx.fillStyle = '#2563EB';
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();

    // Label 50 Ohm match
    ctx.fillStyle = '#2563EB';
    ctx.font = 'bold 10px JetBrains Mono';
    ctx.fillText('Z0 = 50 Ω (Matched)', cx + 8, cy - 8);

    // Antenna Impedance Curve over frequency
    ctx.beginPath();
    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 2;

    const sweepPoints = [];
    for (let t = -1; t <= 1; t += 0.05) {
      const res = 1.0 + t * t * 0.8;
      const react = t * 1.2;
      const gammaReal = (res * res + react * react - 1) / ((res + 1) * (res + 1) + react * react);
      const gammaImag = (2 * react) / ((res + 1) * (res + 1) + react * react);

      const px = cx + gammaReal * r;
      const py = cy - gammaImag * r;
      sweepPoints.push({ px, py });
    }

    sweepPoints.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt.px, pt.py);
      else ctx.lineTo(pt.px, pt.py);
    });
    ctx.stroke();

  }, []);

  return (
    <div className="w-full h-[280px] bg-white rounded-xl border border-slate-200 p-3 relative font-mono shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-1">
        <span className="text-xs font-semibold text-blue-600 flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-blue-600" />
          Impedance Matching Smith Chart (Z0 = 50 Ω)
        </span>
        <span className="text-[10px] text-slate-500">HFSS Port Solver</span>
      </div>
      <canvas ref={canvasRef} className="w-full h-[220px] block" />
    </div>
  );
};
