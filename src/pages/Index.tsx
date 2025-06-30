
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HomePage from '@/components/HomePage';
import ContactPage from '@/components/ContactPage';
import ResourcesPage from '@/components/ResourcesPage';
import LoginPage from '@/components/LoginPage';
import RegisterPage from '@/components/RegisterPage';
import EmailVerificationPage from '@/components/EmailVerificationPage';
import ProfilePage from '@/components/ProfilePage';
import AccessibilityControls from '@/components/AccessibilityControls';
import { AuthProvider } from '@/contexts/AuthContext';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

const IndexContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [verificationEmail, setVerificationEmail] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const { speak, stop, isSpeaking } = useTextToSpeech();

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.8));
  };

  const handleToggleContrast = () => {
    setHighContrast(prev => !prev);
  };

  const handleReadPage = () => {
    if (isSpeaking) {
      stop();
      return;
    }

    const mainContent = document.querySelector('main');
    if (mainContent) {
      const textContent = mainContent.innerText || mainContent.textContent || '';
      speak(textContent);
    }
  };

  const handleShowVerification = (email: string) => {
    setVerificationEmail(email);
    setCurrentPage('verify-email');
  };

  useKeyboardNavigation({
    onReadPage: handleReadPage,
    onZoomIn: handleZoomIn,
    onZoomOut: handleZoomOut,
    onToggleContrast: handleToggleContrast
  });

  // Apply zoom and contrast styles
  useEffect(() => {
    document.documentElement.style.fontSize = `${zoomLevel}rem`;
    
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
      document.documentElement.style.setProperty('--background', '0 0% 0%');
      document.documentElement.style.setProperty('--foreground', '0 0% 100%');
      document.documentElement.style.setProperty('--card', '0 0% 10%');
      document.documentElement.style.setProperty('--card-foreground', '0 0% 100%');
      document.documentElement.style.setProperty('--border', '0 0% 30%');
      document.documentElement.style.setProperty('--primary', '60 100% 50%');
      document.documentElement.style.setProperty('--primary-foreground', '0 0% 0%');
      document.documentElement.style.setProperty('--muted', '0 0% 20%');
      document.documentElement.style.setProperty('--muted-foreground', '0 0% 80%');
    } else {
      document.documentElement.classList.remove('high-contrast');
      // Reset to default colors
      document.documentElement.style.removeProperty('--background');
      document.documentElement.style.removeProperty('--foreground');
      document.documentElement.style.removeProperty('--card');
      document.documentElement.style.removeProperty('--card-foreground');
      document.documentElement.style.removeProperty('--border');
      document.documentElement.style.removeProperty('--primary');
      document.documentElement.style.removeProperty('--primary-foreground');
      document.documentElement.style.removeProperty('--muted');
      document.documentElement.style.removeProperty('--muted-foreground');
    }
  }, [zoomLevel, highContrast]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'contact':
        return <ContactPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'register':
        return <RegisterPage onNavigate={setCurrentPage} onShowVerification={handleShowVerification} />;
      case 'verify-email':
        return <EmailVerificationPage email={verificationEmail} onNavigate={setCurrentPage} />;
      case 'profile':
        return <ProfilePage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>

      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <div id="main-content">
        {renderCurrentPage()}
      </div>

      <AccessibilityControls
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        highContrast={highContrast}
        onToggleContrast={handleToggleContrast}
        onReadPage={handleReadPage}
      />

      {/* Live region for announcements */}
      <div
        id="live-region"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <IndexContent />
    </AuthProvider>
  );
};

export default Index;
