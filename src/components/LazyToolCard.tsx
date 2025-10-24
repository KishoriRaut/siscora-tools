'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface LazyToolCardProps {
  tool: {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    color: string;
  };
  reducedMotion: boolean;
  variants: {
    initial: { opacity: number; y: number };
    animate: { opacity: number; y: number };
    transition: { duration: number; ease: string };
  };
}

export function LazyToolCard({ tool, reducedMotion, variants }: LazyToolCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = tool.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Small delay to ensure smooth loading
          setTimeout(() => setIsLoaded(true), 100);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.article 
      ref={cardRef}
      className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100"
      variants={variants}
      whileHover={{ y: reducedMotion ? 0 : -6, scale: reducedMotion ? 1 : 1.02 }}
      whileTap={{ scale: reducedMotion ? 1 : 0.98 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={tool.href} className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-2xl">
        <div className="flex items-center mb-4">
          <motion.div 
            className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-all duration-300`}
            whileHover={{ 
              scale: reducedMotion ? 1 : 1.1,
              rotate: reducedMotion ? 0 : 5,
              transition: { duration: 0.3 }
            }}
            aria-hidden="true"
          >
            {isLoaded && <Icon className="w-6 h-6 text-white" />}
          </motion.div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {tool.name}
          </h3>
        </div>
        <p className="text-gray-600 mb-4 text-sm group-hover:text-gray-700 transition-colors">
          {tool.description}
        </p>
        <motion.div 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm group-hover:translate-x-1 transition-all duration-200"
          whileHover={{ x: reducedMotion ? 0 : 4 }}
          aria-hidden="true"
        >
          Open Tool
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
        </motion.div>
      </Link>
    </motion.article>
  );
}
