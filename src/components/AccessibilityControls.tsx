
import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Eye, EyeOff } from 'lucide-react';

interface AccessibilityControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  highContrast: boolean;
  onToggleContrast: () => void;
  onReadPage: () => void;
}

const AccessibilityControls = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  highContrast,
  onToggleContrast,
  onReadPage
}: AccessibilityControlsProps) => {
  return (
    <div 
      className="fixed top-4 right-4 z-50 bg-card border border-border rounded-lg p-4 shadow-lg"
      role="region"
      aria-label="Accessibility Controls"
    >
      <h2 className="text-lg font-bold mb-3 sr-only">Accessibility Controls</h2>
      
      <div className="flex flex-col gap-2">
        <Button
          onClick={onReadPage}
          className="w-full justify-start text-left px-3 py-2"
          aria-label="Read page content aloud"
          title="Read page content aloud"
        >
          <Eye className="mr-2 h-4 w-4" />
          Read Page
        </Button>
        
        <div className="flex gap-2">
          <Button
            onClick={onZoomOut}
            variant="outline"
            className="flex-1 px-3 py-2"
            aria-label={`Zoom out, current zoom is ${Math.round(zoomLevel * 100)}%`}
            title="Zoom out"
            disabled={zoomLevel <= 0.8}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={onZoomIn}
            variant="outline"
            className="flex-1 px-3 py-2"
            aria-label={`Zoom in, current zoom is ${Math.round(zoomLevel * 100)}%`}
            title="Zoom in"
            disabled={zoomLevel >= 2}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
        
        <Button
          onClick={onToggleContrast}
          variant={highContrast ? "default" : "outline"}
          className="w-full justify-start text-left px-3 py-2"
          aria-label={`${highContrast ? 'Disable' : 'Enable'} high contrast mode`}
          title={`${highContrast ? 'Disable' : 'Enable'} high contrast mode`}
        >
          {highContrast ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
          {highContrast ? 'Normal Mode' : 'High Contrast'}
        </Button>
        
        <div className="text-sm text-muted-foreground text-center mt-2">
          Zoom: {Math.round(zoomLevel * 100)}%
        </div>
      </div>
    </div>
  );
};

export default AccessibilityControls;
