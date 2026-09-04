import React, { useState, useEffect } from 'react';
import { Radio, Menu, X, ArrowRight } from 'lucide-react';

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
    { id: 'applications', label: 'Applications' },
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
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/60 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-600/30 flex items-center justify-center group-hover:border-blue-600 group-hover:bg-blue-600/15 transition-all duration-300 shadow-sm">
            <Radio className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-600 rounded-full animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-600 rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-xl tracking-wider text-slate-900">ANTEYN<span className="text-blue-600">X</span></span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono tracking-tight block">Custom Antenna Engineering</span>
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
                  ? 'text-blue-600 bg-blue-50 border border-blue-200 font-bold'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
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
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs font-semibold tracking-wide transition-all duration-300 shadow-md ${
              currentPage === 'quote'
                ? 'bg-blue-600 text-white font-bold shadow-blue-500/20 scale-105'
                : 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 shadow-blue-500/10'
            }`}
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 mt-2 shadow-xl animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg font-mono text-sm transition-all ${
                currentPage === item.id
                  ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-200">
            <button
              onClick={() => handleNavClick('quote')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-mono text-sm font-bold rounded-lg shadow-md"
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
