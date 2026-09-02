import React, { useEffect, useRef } from 'react';
import { Target, Activity } from 'lucide-react';

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

    // Background circle (Outer unity reflection circle |Gamma| = 1)
    ctx.strokeStyle = '#1E2D4A';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    // Horizontal Real Axis (Short circuit on left, open circuit on right, 50 ohm in center)
    ctx.beginPath();
    ctx.moveTo(cx - r, cy);
    ctx.lineTo(cx + r, cy);
    ctx.stroke();

    // Constant Resistance Circles (r = 0.5, 1.0, 2.0)
    const rCircles = [0.5, 1.0, 2.0];
    rCircles.forEach((res) => {
      const circleR = r / (1 + res);
      const circleCx = cx + r - circleR;

      ctx.beginPath();
      ctx.strokeStyle = res === 1.0 ? 'rgba(0, 240, 255, 0.4)' : 'rgba(30, 45, 74, 0.7)';
      ctx.lineWidth = res === 1.0 ? 1.5 : 1;
      ctx.arc(circleCx, cy, circleR, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Constant Reactance Arcs (x = +1.0 inductive, -1.0 capacitive)
    const xArcs = [0.5, 1.0, 2.0, -0.5, -1.0, -2.0];
    xArcs.forEach((xVal) => {
      const arcR = r / Math.abs(xVal);
      const arcCy = cy - (r / xVal);

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(30, 45, 74, 0.5)';
      ctx.lineWidth = 1;
      ctx.arc(cx + r, arcCy, arcR, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Ideal 50 Ohm Match Point (Z0 = 50 + j0 -> Center of Smith Chart)
    ctx.fillStyle = '#00F0FF';
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();

    // Label 50 Ohm match
    ctx.fillStyle = '#00F0FF';
    ctx.font = 'bold 10px JetBrains Mono';
    ctx.fillText('Z0 = 50 Ω (Matched)', cx + 8, cy - 8);

    // Antenna Impedance Curve over frequency (from mismatched to matched point)
    ctx.beginPath();
    ctx.strokeStyle = '#EAB308';
    ctx.lineWidth = 2;

    const sweepPoints = [];
    for (let t = -1; t <= 1; t += 0.05) {
      // Parametric impedance trajectory around 50 ohms
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
    <div className="w-full h-[280px] bg-rf-navy/90 rounded-xl border border-rf-border/80 p-3 relative font-mono shadow-xl">
      <div className="flex items-center justify-between border-b border-rf-border/60 pb-2 mb-1">
        <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-cyan-400" />
          Impedance Matching Smith Chart (Z0 = 50 Ω)
        </span>
        <span className="text-[10px] text-slate-400">HFSS Port Solver</span>
      </div>
      <canvas ref={canvasRef} className="w-full h-[220px] block" />
    </div>
  );
};
