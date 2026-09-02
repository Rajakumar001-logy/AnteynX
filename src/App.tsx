import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { TechnologiesPage } from './pages/TechnologiesPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { QuotePage } from './pages/QuotePage';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Handle URL hash deep linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'services', 'technologies', 'applications', 'portfolio', 'about', 'contact', 'quote'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'services':
        return <ServicesPage setCurrentPage={handlePageChange} />;
      case 'technologies':
        return <TechnologiesPage setCurrentPage={handlePageChange} />;
      case 'applications':
        return <ApplicationsPage setCurrentPage={handlePageChange} />;
      case 'portfolio':
        return <PortfolioPage setCurrentPage={handlePageChange} />;
      case 'about':
        return <AboutPage setCurrentPage={handlePageChange} />;
      case 'contact':
        return <ContactPage setCurrentPage={handlePageChange} />;
      case 'quote':
        return <QuotePage />;
      case 'home':
      default:
        return <HomePage setCurrentPage={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-rf-dark text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar currentPage={currentPage} setCurrentPage={handlePageChange} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer setCurrentPage={handlePageChange} />
    </div>
  );
}

export default App;
