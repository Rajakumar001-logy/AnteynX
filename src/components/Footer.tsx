import React from 'react';
import { Radio, ArrowRight, Shield, Linkedin, Mail, MapPin, Globe } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const handleNav = (id: string) => {
    setCurrentPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-rf-dark border-t border-rf-border pt-16 pb-12 font-sans relative overflow-hidden">
      {/* Background grid accent */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-rf-border">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center">
                <Radio className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="font-mono font-bold text-xl tracking-wider text-white">
                ANTEYN<span className="text-cyan-400">X</span> <span className="text-xs font-normal text-slate-400 border-l border-rf-border pl-2">RF</span>
              </span>
            </div>

            <p className="text-cyan-300 font-mono text-sm font-semibold">
              "Your Requirement. Our Antenna."
            </p>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Custom antenna design and electromagnetic simulation engineered around your application. Providing simulation-driven RF engineering for startups, IoT, UAVs, aerospace, and research laboratories.
            </p>

            <div className="p-3 bg-rf-navy/80 rounded-lg border border-rf-border text-[11px] font-mono text-slate-400 max-w-md">
              <span className="text-cyan-400 font-bold block mb-1">SERVICE BOUNDARY NOTICE</span>
              Currently focused exclusively on custom antenna design, 3D electromagnetic simulation (HFSS / CST), and optimization services. Fabrication and RF testing capabilities planned for future phase rollout.
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-rf-border/60 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-slate-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-cyan-300 transition">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-cyan-300 transition">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('technologies')} className="hover:text-cyan-300 transition">
                  Antenna Technologies
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('applications')} className="hover:text-cyan-300 transition">
                  Applications
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('portfolio')} className="hover:text-cyan-300 transition">
                  Portfolio Projects
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-cyan-300 transition">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-cyan-300 transition">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-rf-border/60 pb-2">
              Design Services
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>Custom Antenna Design</li>
              <li>HFSS / CST EM Simulation</li>
              <li>Dimension & Impedance Tuning</li>
              <li>Antenna Array Design</li>
              <li>Compact MIMO Systems</li>
              <li>Technical Engineering Reports</li>
            </ul>
          </div>

          {/* Call to Action & Contact */}
          <div>
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-rf-border/60 pb-2">
              Start a Project
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed font-mono">
              Have an antenna requirement? Submit your parameters for an engineering review.
            </p>
            <button
              onClick={() => handleNav('quote')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-cyan-400 text-slate-950 font-mono text-xs font-bold rounded-lg shadow-lg hover:bg-cyan-300 transition"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="mt-6 space-y-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>engineering@anteynx.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                <a href="#linkedin" className="hover:text-cyan-300">LinkedIn Profile</a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 <strong className="text-slate-400">AnteynX Engineering Labs</strong>. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400">Terms of Service</a>
            <span className="text-cyan-500/80">HFSS / CST Engineering Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
