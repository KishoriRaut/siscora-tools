import { useEffect, useCallback, useState } from 'react';

interface DesktopEnhancements {
  isDesktop: boolean;
  isHoverSupported: boolean;
  isKeyboardUser: boolean;
}

export function useDesktopEnhancements(): DesktopEnhancements {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHoverSupported, setIsHoverSupported] = useState(false);
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isDesktopSize = width >= 1024 && height >= 768;
      setIsDesktop(isDesktopSize);
    };

    const checkHoverSupport = () => {
      setIsHoverSupported(window.matchMedia('(hover: hover)').matches);
    };

    const checkKeyboardUser = () => {
      // Detect if user is primarily using keyboard
      let keyboardUsed = false;
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab' || e.key === 'Enter' || e.key === ' ') {
          keyboardUsed = true;
          setIsKeyboardUser(true);
        }
      };

      const handleMouseDown = () => {
        setIsKeyboardUser(false);
      };

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleMouseDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('mousedown', handleMouseDown);
      };
    };

    checkDesktop();
    checkHoverSupport();
    const cleanup = checkKeyboardUser();

    const resizeObserver = new ResizeObserver(checkDesktop);
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      cleanup();
    };
  }, []);

  return { isDesktop, isHoverSupported, isKeyboardUser };
}

// Hook for keyboard shortcuts
export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const modifiers = {
        ctrl: event.ctrlKey,
        alt: event.altKey,
        shift: event.shiftKey,
        meta: event.metaKey
      };

      // Create shortcut key
      const shortcutKey = [
        modifiers.ctrl && 'ctrl',
        modifiers.alt && 'alt',
        modifiers.shift && 'shift',
        modifiers.meta && 'meta',
        key
      ].filter(Boolean).join('+');

      if (shortcuts[shortcutKey]) {
        event.preventDefault();
        shortcuts[shortcutKey]();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

// Hook for enhanced hover effects
export function useHoverEffects() {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  const handleMouseEnter = useCallback((elementId: string) => {
    setHoveredElement(elementId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredElement(null);
  }, []);

  return { hoveredElement, handleMouseEnter, handleMouseLeave };
}

// Hook for desktop-specific animations
export function useDesktopAnimations() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return { prefersReducedMotion };
}
