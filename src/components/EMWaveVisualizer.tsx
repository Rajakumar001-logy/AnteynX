import React, { useEffect, useRef, useState } from 'react';
import { Activity, Play, Pause, RefreshCw, Cpu, Layers } from 'lucide-react';

interface EMWaveVisualizerProps {
  interactive?: boolean;
}

export const EMWaveVisualizer: React.FC<EMWaveVisualizerProps> = ({ interactive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [frequency, setFrequency] = useState(5.8); // GHz
  const [showFieldVectors, setShowFieldVectors] = useState(true);
  const [showWaves, setShowWaves] = useState(true);
  const [activeTab, setActiveTab] = useState<'3d' | 'plane'>('3d');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight || 450;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2 + 20;

      // Draw Grid Background
      ctx.strokeStyle = 'rgba(30, 45, 74, 0.4)';
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Substrate / Microstrip Antenna CAD Representation in center
      const patchW = 140;
      const patchH = 100;
      
      // Isometric transformation angles
      const isoAngle = Math.PI / 6;

      // Antenna Ground Plane
      ctx.fillStyle = 'rgba(14, 22, 40, 0.9)';
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(centerX - patchW, centerY + patchH / 2);
      ctx.lineTo(centerX, centerY + patchH / 2 + patchW * Math.sin(isoAngle));
      ctx.lineTo(centerX + patchW, centerY + patchH / 2);
      ctx.lineTo(centerX, centerY + patchH / 2 - patchW * Math.sin(isoAngle));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Substrate dielectric layer (greenish accent)
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.beginPath();
      ctx.moveTo(centerX - patchW, centerY + patchH / 2 - 12);
      ctx.lineTo(centerX, centerY + patchH / 2 + patchW * Math.sin(isoAngle) - 12);
      ctx.lineTo(centerX + patchW, centerY + patchH / 2 - 12);
      ctx.lineTo(centerX, centerY + patchH / 2 - patchW * Math.sin(isoAngle) - 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Radiating Patch Surface (Copper/Gold electric accent)
      const patchWidth3d = 80;
      const patchHeight3d = 60;
      const patchYOffset = -24;

      ctx.fillStyle = 'rgba(234, 179, 8, 0.25)';
      ctx.strokeStyle = '#EAB308';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(centerX - patchWidth3d, centerY + patchYOffset);
      ctx.lineTo(centerX, centerY + patchYOffset + patchWidth3d * Math.sin(isoAngle));
      ctx.lineTo(centerX + patchWidth3d, centerY + patchYOffset);
      ctx.lineTo(centerX, centerY + patchYOffset - patchWidth3d * Math.sin(isoAngle));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Feed Line
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY + patchH / 2 + patchW * Math.sin(isoAngle) - 12);
      ctx.lineTo(centerX, centerY + patchYOffset + patchWidth3d * Math.sin(isoAngle));
      ctx.stroke();

      // Radiating Waves (Spherical / E-Field vector propagation)
      if (showWaves) {
        const numRings = 6;
        const speed = 0.08 * (frequency / 3);

        for (let i = 0; i < numRings; i++) {
          const r = ((time * 60 * speed + i * 45) % 240) + 20;
          const alpha = Math.max(0, 1 - r / 240);

          ctx.save();
          ctx.beginPath();
          ctx.ellipse(centerX, centerY + patchYOffset - 30, r, r * 0.55, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.7})`;
          ctx.lineWidth = 2;
          ctx.setLineDash([6, 4]);
          ctx.stroke();

          // Magnetic Field H-loops (orthogonal in gold)
          ctx.beginPath();
          ctx.ellipse(centerX, centerY + patchYOffset - 30, r * 0.55, r, Math.PI / 2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.5})`;
          ctx.stroke();
          ctx.restore();
        }
      }

      // E-Field Vector Field lines (Transverse EM Wave propagation along Z axis upward)
      if (showFieldVectors) {
        const axisLength = 180;
        const waveK = 0.05 * (frequency / 2.5);
        
        // Z-axis (Poynting Vector S)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + patchYOffset);
        ctx.lineTo(centerX, centerY + patchYOffset - axisLength);
        ctx.stroke();
        ctx.setLineDash([]);

        // Poynting Vector Arrow Header
        ctx.fillStyle = '#00F0FF';
        ctx.font = '11px JetBrains Mono';
        ctx.fillText(`Poynting Vector S (E × H)`, centerX + 10, centerY + patchYOffset - axisLength + 5);

        // Sinusoidal E-field (Cyan, vertical oscillation) and H-field (Gold, horizontal)
        ctx.beginPath();
        ctx.strokeStyle = '#00F0FF';
        ctx.lineWidth = 2.5;

        for (let z = 0; z <= axisLength; z += 3) {
          const eAmp = Math.sin(z * waveK - time * 0.1 * frequency) * 35;
          const yPos = centerY + patchYOffset - z;
          const xPos = centerX + eAmp;

          if (z === 0) ctx.moveTo(xPos, yPos);
          else ctx.lineTo(xPos, yPos);

          // Vector arrows every 20px
          if (z % 20 === 0 && z > 0) {
            ctx.save();
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(centerX, yPos);
            ctx.lineTo(xPos, yPos);
            ctx.stroke();

            // Draw H-field vector (orthogonal 3D depth line)
            const hAmp = Math.sin(z * waveK - time * 0.1 * frequency) * 25;
            ctx.strokeStyle = 'rgba(234, 179, 8, 0.7)';
            ctx.beginPath();
            ctx.moveTo(centerX, yPos);
            ctx.lineTo(centerX - hAmp * 0.7, yPos + hAmp * 0.4);
            ctx.stroke();
            ctx.restore();
          }
        }
        ctx.stroke();
      }

      // Live Technical Annotations Box
      ctx.fillStyle = 'rgba(14, 22, 40, 0.85)';
      ctx.strokeStyle = 'rgba(30, 45, 74, 0.9)';
      ctx.lineWidth = 1;
      ctx.fillRect(15, 15, 220, 90);
      ctx.strokeRect(15, 15, 220, 90);

      ctx.fillStyle = '#00F0FF';
      ctx.font = 'bold 11px JetBrains Mono';
      ctx.fillText('EM SIMULATION MONITOR', 25, 32);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText(`Freq (f0): ${frequency.toFixed(2)} GHz`, 25, 50);
      ctx.fillText(`Wavelength (λ0): ${(300 / (frequency * 1000) * 100).toFixed(2)} mm`, 25, 65);
      ctx.fillText(`Mode: TM10 (Microstrip)`, 25, 80);
      ctx.fillText(`Solver: HFSS FEA Engine`, 25, 95);

      if (isPlaying) {
        time += 1;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isPlaying, frequency, showFieldVectors, showWaves]);

  return (
    <div className="relative w-full h-[450px] bg-rf-navy/90 rounded-xl border border-rf-border/80 overflow-hidden shadow-2xl">
      {/* Visualizer Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Interactive Controls Overlay */}
      {interactive && (
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 p-2.5 bg-rf-dark/90 backdrop-blur-md rounded-lg border border-rf-border/80 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rf-border/60 hover:bg-cyan-500/20 text-cyan-400 rounded transition border border-cyan-500/30"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlaying ? 'Pause' : 'Animate'}
            </button>

            <div className="flex items-center gap-2 border-l border-rf-border pl-3">
              <span className="text-slate-400">Freq:</span>
              <input
                type="range"
                min="0.9"
                max="28.0"
                step="0.1"
                value={frequency}
                onChange={(e) => setFrequency(parseFloat(e.target.value))}
                className="w-24 accent-cyan-400 h-1.5 bg-rf-border rounded-lg cursor-pointer"
              />
              <span className="text-cyan-400 w-16 font-bold">{frequency.toFixed(1)} GHz</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFieldVectors(!showFieldVectors)}
              className={`px-2.5 py-1 rounded transition border ${
                showFieldVectors ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-rf-border/40 border-transparent text-slate-400'
              }`}
            >
              E/H Vectors
            </button>

            <button
              onClick={() => setShowWaves(!showWaves)}
              className={`px-2.5 py-1 rounded transition border ${
                showWaves ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-rf-border/40 border-transparent text-slate-400'
              }`}
            >
              Wavefronts
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
