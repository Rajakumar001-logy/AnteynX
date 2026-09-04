import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { AboutPage } from './pages/AboutPage';
import { GOOGLE_FORM_URL } from './constants';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Handle URL hash deep linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'quote') {
        window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
        return;
      }
      if (['home', 'services', 'applications', 'about'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handlePageChange = (page: string) => {
    if (page === 'quote') {
      window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
      return;
    }
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'services':
        return <ServicesPage setCurrentPage={handlePageChange} />;
      case 'applications':
        return <ApplicationsPage setCurrentPage={handlePageChange} />;
      case 'about':
        return <AboutPage setCurrentPage={handlePageChange} />;
      case 'home':
      default:
        return <HomePage setCurrentPage={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <Navbar currentPage={currentPage} setCurrentPage={handlePageChange} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer setCurrentPage={handlePageChange} />
    </div>
  );
}

export default App;
