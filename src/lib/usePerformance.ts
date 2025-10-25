import { useEffect, useCallback, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage?: number;
  isSlowConnection: boolean;
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    isSlowConnection: false
  });

  const measurePerformance = useCallback(() => {
    if (typeof window === 'undefined') return;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const loadTime = navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0;
    
    // Check connection speed
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const isSlowConnection = connection ? connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' : false;

    // Memory usage (if available)
    const memoryUsage = (performance as any).memory ? (performance as any).memory.usedJSHeapSize : undefined;

    setMetrics({
      loadTime,
      renderTime: performance.now(),
      memoryUsage,
      isSlowConnection
    });
  }, []);

  useEffect(() => {
    measurePerformance();
  }, [measurePerformance]);

  return { metrics, measurePerformance };
}

// Hook for lazy loading optimization
export function useLazyLoading() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsIntersecting(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(node);
  }, [hasLoaded]);

  return { ref, isIntersecting, hasLoaded };
}

// Hook for debounced operations
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook for throttled operations
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const [lastCall, setLastCall] = useState(0);

  return useCallback(
    ((...args: any[]) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        setLastCall(now);
        return callback(...args);
      }
    }) as T,
    [callback, delay, lastCall]
  );
}

// Hook for memory optimization
export function useMemoryOptimization() {
  const [isLowMemory, setIsLowMemory] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMemory = () => {
      if ((performance as any).memory) {
        const memory = (performance as any).memory;
        const usedRatio = memory.usedJSHeapSize / memory.totalJSHeapSize;
        setIsLowMemory(usedRatio > 0.8);
      }
    };

    checkMemory();
    const interval = setInterval(checkMemory, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { isLowMemory };
}
