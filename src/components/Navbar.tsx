import React, { useState, useEffect } from 'react';
import { Radio, Menu, X, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'technologies', label: 'Antenna Tech' },
    { id: 'applications', label: 'Applications' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-rf-dark/95 backdrop-blur-md border-b border-rf-border shadow-xl py-3'
          : 'bg-rf-dark/80 backdrop-blur-sm border-b border-rf-border/50 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-500/20 transition-all duration-300 shadow-md">
            <Radio className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-xl tracking-wider text-white">ANTEYN<span className="text-cyan-400">X</span></span>
              <span className="px-1.5 py-0.5 bg-rf-border/80 text-[10px] font-mono text-cyan-300 rounded border border-cyan-500/20">RF</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono tracking-tight block">Custom Antenna Engineering</span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-2 text-xs font-mono font-medium rounded-md transition-all duration-200 ${
                currentPage === item.id
                  ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-cyan-300 hover:bg-rf-navy/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Primary CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('quote')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs font-semibold tracking-wide transition-all duration-300 shadow-lg ${
              currentPage === 'quote'
                ? 'bg-cyan-400 text-slate-950 font-bold shadow-cyan-500/30 shadow-lg scale-105'
                : 'bg-cyan-500/20 hover:bg-cyan-400 hover:text-slate-950 text-cyan-300 border border-cyan-400/50 hover:shadow-cyan-500/25'
            }`}
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-rf-navy rounded-lg border border-rf-border"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-rf-dark/98 border-b border-rf-border px-4 pt-3 pb-6 space-y-2 mt-2 backdrop-blur-xl animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg font-mono text-sm transition-all ${
                currentPage === item.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
                  : 'text-slate-300 hover:bg-rf-navy'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-rf-border">
            <button
              onClick={() => handleNavClick('quote')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-400 text-slate-950 font-mono text-sm font-bold rounded-lg shadow-md"
            >
              <span>Request an Antenna Design</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
