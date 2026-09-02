import React, { useEffect, useRef, useState } from 'react';

interface RadiationPatternProps {
  peakGain?: string;
  beamwidth?: string;
  antennaType?: string;
}

export const RadiationPattern3D: React.FC<RadiationPatternProps> = ({
  peakGain = '6.2 dBi',
  beamwidth = '78° (HPBW)',
  antennaType = 'Microstrip Patch'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'e-plane' | 'h-plane'>('3d');
  const [rotationAngle] = useState(45);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let angle = rotationAngle;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight || 340;
      }
    };
    resize();

    const drawPolarGrid = (cx: number, cy: number, maxRadius: number) => {
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1;

      // Concentric gain circles (dB levels)
      const dBLevels = [0, -3, -10, -20];
      dBLevels.forEach((db, idx) => {
        const r = maxRadius * (1 - idx * 0.25);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#64748B';
        ctx.font = '9px JetBrains Mono';
        ctx.fillText(`${db} dB`, cx + 4, cy - r + 10);
      });

      // Radial angle lines
      for (let a = 0; a < 360; a += 30) {
        const rad = (a * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + maxRadius * Math.cos(rad), cy + maxRadius * Math.sin(rad));
        ctx.stroke();

        if (a % 90 === 0) {
          ctx.fillStyle = '#2563EB';
          ctx.font = 'bold 10px JetBrains Mono';
          const labelR = maxRadius + 14;
          ctx.fillText(`${a}°`, cx + labelR * Math.cos(rad) - 8, cy + labelR * Math.sin(rad) + 3);
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2 + 10;
      const maxRadius = Math.min(width, height) * 0.35;

      if (viewMode === 'e-plane' || viewMode === 'h-plane') {
        // 2D Polar Radiation Pattern Cut
        drawPolarGrid(cx, cy, maxRadius);

        ctx.beginPath();
        ctx.strokeStyle = viewMode === 'e-plane' ? '#2563EB' : '#D97706';
        ctx.lineWidth = 2.5;
        ctx.fillStyle = viewMode === 'e-plane' ? 'rgba(37, 99, 235, 0.15)' : 'rgba(217, 119, 6, 0.15)';

        for (let theta = 0; theta <= 360; theta += 2) {
          const rad = (theta * Math.PI) / 180;
          let g = Math.pow(Math.cos(rad * 0.5), 2.2);
          if (viewMode === 'h-plane') {
            g = Math.pow(Math.cos(rad * 0.5), 1.6);
          }
          const r = maxRadius * Math.max(0.08, g);

          const px = cx + r * Math.sin(rad);
          const py = cy - r * Math.cos(rad);

          if (theta === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.fillStyle = viewMode === 'e-plane' ? '#2563EB' : '#D97706';
        ctx.font = 'bold 11px JetBrains Mono';
        ctx.fillText(viewMode === 'e-plane' ? 'E-Plane Cut (XZ φ=0°)' : 'H-Plane Cut (YZ φ=90°)', 20, 25);
      } else {
        // 3D Isometric Gain Lobe Visualization
        angle += 0.4;
        const radA = (angle * Math.PI) / 180;

        ctx.strokeStyle = '#CBD5E1';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);

        // Z-axis
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx, cy - 140);
        ctx.stroke();
        ctx.fillStyle = '#2563EB';
        ctx.font = 'bold 10px JetBrains Mono';
        ctx.fillText('+Z (Broadside)', cx + 5, cy - 130);

        // X and Y axes
        const xDir = Math.cos(radA) * 110;
        const yDir = Math.sin(radA) * 60;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + xDir, cy + yDir);
        ctx.stroke();

        ctx.setLineDash([]);

        // Render 3D Mesh Lobe
        const uSteps = 24;
        const vSteps = 16;

        for (let i = 0; i < uSteps; i++) {
          const phi = (i / uSteps) * Math.PI * 2;
          ctx.beginPath();
          ctx.strokeStyle = `hsla(${210 + i * 4}, 90%, 50%, 0.7)`;
          ctx.lineWidth = 1.2;

          for (let j = 0; j <= vSteps; j++) {
            const theta = (j / vSteps) * Math.PI;
            const rVal = Math.pow(Math.abs(Math.cos(theta * 0.5)), 2) * 100;

            const x3d = rVal * Math.sin(theta) * Math.cos(phi);
            const y3d = rVal * Math.sin(theta) * Math.sin(phi);
            const z3d = rVal * Math.cos(theta);

            const projX = cx + x3d * Math.cos(radA) - y3d * Math.sin(radA);
            const projY = cy + x3d * Math.sin(radA) * 0.4 + y3d * Math.cos(radA) * 0.4 - z3d * 0.8;

            if (j === 0) ctx.moveTo(projX, projY);
            else ctx.lineTo(projX, projY);
          }
          ctx.stroke();
        }

        // Antenna Ground Plate Base
        ctx.fillStyle = '#E2E8F0';
        ctx.strokeStyle = '#2563EB';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(cx, cy + 15, 60, 25, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 11px JetBrains Mono';
        ctx.fillText(`3D Far-Field Directivity (Gain Lobe)`, 20, 25);
      }

      // Legend box
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(width - 150, 15, 135, 65);
      ctx.strokeStyle = '#CBD5E1';
      ctx.strokeRect(width - 150, 15, 135, 65);

      ctx.fillStyle = '#2563EB';
      ctx.font = 'bold 10px JetBrains Mono';
      ctx.fillText(`Peak: ${peakGain}`, width - 140, 32);
      ctx.fillStyle = '#475569';
      ctx.fillText(`HPBW: ${beamwidth}`, width - 140, 47);
      ctx.fillText(`Type: ${antennaType}`, width - 140, 62);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [viewMode, peakGain, beamwidth, antennaType, rotationAngle]);

  return (
    <div className="relative w-full h-[340px] bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Mode Controls */}
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 p-1 bg-white rounded-lg border border-slate-200 text-xs font-mono shadow-sm">
        <button
          onClick={() => setViewMode('3d')}
          className={`px-2.5 py-1 rounded transition font-bold ${
            viewMode === '3d' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3D Farfield Lobe
        </button>
        <button
          onClick={() => setViewMode('e-plane')}
          className={`px-2.5 py-1 rounded transition font-bold ${
            viewMode === 'e-plane' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          E-Cut (XZ)
        </button>
        <button
          onClick={() => setViewMode('h-plane')}
          className={`px-2.5 py-1 rounded transition font-bold ${
            viewMode === 'h-plane' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          H-Cut (YZ)
        </button>
      </div>
    </div>
  );
};
