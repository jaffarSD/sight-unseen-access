
import React from 'react';
import { Button } from '@/components/ui/button';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="space-y-8">
        <section aria-labelledby="welcome-heading">
          <h1 id="welcome-heading" className="text-4xl font-bold mb-6">
            Welcome to AccessibleWeb
          </h1>
          
          <p className="text-xl mb-4 leading-relaxed">
            This website is designed specifically for visually impaired users, 
            providing advanced accessibility features to ensure a seamless browsing experience.
          </p>
        </section>

        <section aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-3xl font-bold mb-6">
            Accessibility Features
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Screen Reader Support</h3>
              <p className="mb-4">
                Click the "Read Page" button in the top-right corner to have the page content read aloud to you.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Intelligent Zoom</h3>
              <p className="mb-4">
                Use the zoom controls to increase or decrease text size without breaking the layout.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">High Contrast Mode</h3>
              <p className="mb-4">
                Toggle high contrast mode for better visibility with white text on black background.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Keyboard Navigation</h3>
              <p className="mb-4">
                Navigate the entire website using only your keyboard. Use Tab to move between elements, Enter to activate buttons.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="instructions-heading">
          <h2 id="instructions-heading" className="text-3xl font-bold mb-6">
            How to Use This Website
          </h2>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <ol className="space-y-4 text-lg">
              <li>
                <strong>1. Screen Reader:</strong> Click the "Read Page" button or press Alt+R to have content read aloud.
              </li>
              <li>
                <strong>2. Zoom:</strong> Use the zoom buttons or press Ctrl+Plus/Minus to adjust text size.
              </li>
              <li>
                <strong>3. High Contrast:</strong> Toggle the contrast mode for better visibility.
              </li>
              <li>
                <strong>4. Keyboard Navigation:</strong> Use Tab to navigate, Enter to select, and Arrow keys where applicable.
              </li>
              <li>
                <strong>5. Skip Links:</strong> Press Tab from the top of any page to access skip navigation links.
              </li>
            </ol>
          </div>
        </section>

        <section aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="text-3xl font-bold mb-6">
            Get Started
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 text-lg"
              aria-label="Go to contact form to get in touch with us"
            >
              Contact Us
            </Button>
            
            <Button
              onClick={() => onNavigate('resources')}
              variant="outline"
              className="px-8 py-4 text-lg"
              aria-label="View accessibility resources and helpful links"
            >
              View Resources
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
