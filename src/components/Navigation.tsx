
import React from 'react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navigation = ({ currentPage, onNavigate }: NavigationProps) => {
  const navItems = [
    { id: 'home', label: 'Home', ariaLabel: 'Navigate to home page' },
    { id: 'contact', label: 'Contact', ariaLabel: 'Navigate to contact form' },
    { id: 'resources', label: 'Resources', ariaLabel: 'Navigate to accessibility resources' }
  ];

  return (
    <nav 
      className="bg-card border-b border-border p-4"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">AccessibleWeb</h1>
        
        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              variant={currentPage === item.id ? "default" : "outline"}
              className="px-6 py-3 text-lg"
              aria-label={item.ariaLabel}
              aria-current={currentPage === item.id ? "page" : undefined}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
