
import { useEffect } from 'react';

interface UseKeyboardNavigationProps {
  onReadPage: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleContrast: () => void;
}

export const useKeyboardNavigation = ({
  onReadPage,
  onZoomIn,
  onZoomOut,
  onToggleContrast
}: UseKeyboardNavigationProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt + R for read page
      if (event.altKey && event.key.toLowerCase() === 'r') {
        event.preventDefault();
        onReadPage();
        return;
      }

      // Alt + C for contrast toggle
      if (event.altKey && event.key.toLowerCase() === 'c') {
        event.preventDefault();
        onToggleContrast();
        return;
      }

      // Ctrl + Plus for zoom in
      if (event.ctrlKey && (event.key === '+' || event.key === '=')) {
        event.preventDefault();
        onZoomIn();
        return;
      }

      // Ctrl + Minus for zoom out
      if (event.ctrlKey && event.key === '-') {
        event.preventDefault();
        onZoomOut();
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onReadPage, onZoomIn, onZoomOut, onToggleContrast]);
};
