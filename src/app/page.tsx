'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Code, Mail, Calculator, Hash, Palette, Image, FileText, Zap, Shield, QrCode, Key, Type, ArrowRight, Sparkles, ChevronUp, Send, Wrench, Grid, Calendar, Search } from 'lucide-react';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LazyToolCard } from '@/components/LazyToolCard';
import { useDesktopEnhancements, useKeyboardShortcuts } from '@/lib/useDesktopEnhancements';

function HomeContent() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visibleToolsCount, setVisibleToolsCount] = useState(8); // Show only 8 tools initially
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const searchParams = useSearchParams();
  const { isDesktop, isHoverSupported, isKeyboardUser } = useDesktopEnhancements();
  
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const toolsRef = useRef(null);

  // Desktop keyboard shortcuts
  useKeyboardShortcuts({
    'ctrl+k': () => {
      // Focus search
      const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    },
    'ctrl+/': () => {
      // Show keyboard shortcuts help
      alert('Keyboard Shortcuts:\nCtrl+K: Focus search\nCtrl+/: Show this help\nEscape: Clear search');
    },
    'escape': () => {
      // Clear search
      setSearchQuery('');
    }
  });
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleReducedMotionChange);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle search query from URL
  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
      setActiveTab('all'); // Show all tools when searching
    }
  }, [searchParams]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0.1 : 0.6, ease: "easeOut" }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1
      }
    }
  };


  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1,
        delayChildren: reducedMotion ? 0 : 0.2
      }
    }
  };



  const tabs = [
    { id: 'all', name: 'All Tools', icon: Grid },
    { id: 'communication', name: 'Communication', icon: Mail },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'development', name: 'Development', icon: Code },
    { id: 'design', name: 'Design', icon: Palette },
    { id: 'utilities', name: 'Utilities', icon: Wrench }
  ];

  const allTools = [
    // Text & String Tools
    {
      name: 'Text Case Converter',
      href: '/tools/text-case-converter',
      icon: Type,
      description: 'Convert text between different cases',
      color: 'from-blue-500 to-blue-600',
      category: 'utilities'
    },
    {
      name: 'Text Diff Checker',
      href: '/tools/text-diff-checker',
      icon: FileText,
      description: 'Compare two texts and see differences',
      color: 'from-green-500 to-emerald-600',
      category: 'utilities'
    },
    {
      name: 'Lorem Ipsum Generator',
      href: '/tools/lorem-ipsum-generator',
      icon: FileText,
      description: 'Generate placeholder text for designs',
      color: 'from-purple-500 to-violet-600',
      category: 'utilities'
    },
    {
      name: 'Text to Binary Converter',
      href: '/tools/text-binary-converter',
      icon: Code,
      description: 'Convert text to binary and vice versa',
      color: 'from-indigo-500 to-blue-600',
      category: 'development'
    },
    {
      name: 'String Length Calculator',
      href: '/tools/string-length-calculator',
      icon: Hash,
      description: 'Analyze text with detailed statistics',
      color: 'from-orange-500 to-red-600',
      category: 'utilities'
    },
    // Security & Encryption Tools
    {
      name: 'Password Generator',
      href: '/tools/password-generator',
      icon: Key,
      description: 'Generate secure, random passwords for your accounts',
      color: 'from-red-500 to-pink-600',
      category: 'security'
    },
    {
      name: 'Hash Generator',
      href: '/tools/hash-generator',
      icon: Hash,
      description: 'Generate secure hashes for passwords and data verification',
      color: 'from-green-500 to-emerald-600',
      category: 'security'
    },
    {
      name: 'JWT Decoder',
      href: '/tools/jwt-decoder',
      icon: Shield,
      description: 'Decode and analyze JWT tokens',
      color: 'from-blue-500 to-cyan-600',
      category: 'security'
    },
    {
      name: 'UUID Generator',
      href: '/tools/uuid-generator',
      icon: Hash,
      description: 'Generate universally unique identifiers',
      color: 'from-teal-500 to-cyan-600',
      category: 'security'
    },
    {
      name: 'Password Strength Checker',
      href: '/tools/password-strength-checker',
      icon: Shield,
      description: 'Analyze password security and strength',
      color: 'from-orange-500 to-red-600',
      category: 'security'
    },
    // Web Development Tools
    {
      name: 'Base64 Encoder',
      href: '/tools/base64-encoder',
      icon: FileText,
      description: 'Encode and decode data for various applications',
      color: 'from-teal-500 to-cyan-600',
      category: 'development'
    },
    {
      name: 'URL Shortener',
      href: '/tools/url-shortener',
      icon: Mail,
      description: 'Create short, memorable URLs',
      color: 'from-blue-500 to-indigo-600',
      category: 'development'
    },
    {
      name: 'JSON Formatter',
      href: '/tools/json-formatter',
      icon: Code,
      description: 'Format and validate JSON data',
      color: 'from-green-500 to-teal-600',
      category: 'development'
    },
    {
      name: 'HTML Encoder/Decoder',
      href: '/tools/html-encoder-decoder',
      icon: Code,
      description: 'Encode and decode HTML entities',
      color: 'from-purple-500 to-pink-600',
      category: 'development'
    },
    {
      name: 'Website Analyzer',
      href: '/tools/website-analyzer',
      icon: Search,
      description: 'Analyze websites for SEO, performance, and accessibility',
      color: 'from-orange-500 to-red-600',
      category: 'development'
    },
    // Design & Color Tools
    {
      name: 'Color Picker',
      href: '/tools/color-picker',
      icon: Palette,
      description: 'Find the perfect colors for your designs and projects',
      color: 'from-pink-500 to-rose-600',
      category: 'design'
    },
    {
      name: 'Color Palette Generator',
      href: '/tools/color-palette-generator',
      icon: Palette,
      description: 'Generate beautiful color palettes',
      color: 'from-violet-500 to-purple-600',
      category: 'design'
    },
    {
      name: 'CSS Gradient Generator',
      href: '/tools/css-gradient-generator',
      icon: Palette,
      description: 'Create CSS gradients with visual editor',
      color: 'from-indigo-500 to-purple-600',
      category: 'design'
    },
    {
      name: 'Image Converter',
      href: '/tools/image-converter',
      icon: Image,
      description: 'Convert images between different formats seamlessly',
      color: 'from-cyan-500 to-blue-600',
      category: 'design'
    },
    // Calculator Tools
    {
      name: 'Calculator',
      href: '/tools/calculator',
      icon: Calculator,
      description: 'Advanced calculator for quick computations and math problems',
      color: 'from-violet-500 to-pink-600',
      category: 'utilities'
    },
    {
      name: 'Percentage Calculator',
      href: '/tools/percentage-calculator',
      icon: Calculator,
      description: 'Calculate percentages, tips, and discounts',
      color: 'from-green-500 to-emerald-600',
      category: 'utilities'
    },
    {
      name: 'Unit Converter',
      href: '/tools/unit-converter',
      icon: Calculator,
      description: 'Convert between different units of measurement',
      color: 'from-blue-500 to-cyan-600',
      category: 'utilities'
    },
    {
      name: 'GPA to Percentage',
      href: '/tools/gpa-to-percentage',
      icon: Calculator,
      description: 'Convert GPA to percentage on different scales',
      color: 'from-purple-500 to-violet-600',
      category: 'utilities'
    },
    {
      name: 'Percentage to GPA',
      href: '/tools/percentage-to-gpa',
      icon: Calculator,
      description: 'Convert percentage grades to GPA',
      color: 'from-pink-500 to-rose-600',
      category: 'utilities'
    },
    // Communication Tools
    {
      name: 'Email Signature Generator',
      href: '/tools/email-signature',
      icon: Mail,
      description: 'Create professional email signatures with custom styling',
      color: 'from-blue-500 to-blue-600',
      category: 'communication'
    },
    {
      name: 'QR Code Generator',
      href: '/tools/qr-generator',
      icon: QrCode,
      description: 'Create QR codes for URLs, text, and contact information',
      color: 'from-blue-500 to-cyan-600',
      category: 'communication'
    },
    // Utilities
    {
      name: 'Text Counter',
      href: '/tools/text-counter',
      icon: Type,
      description: 'Count words, characters, and analyze text content',
      color: 'from-amber-500 to-orange-600',
      category: 'utilities'
    },
    // Date & Time Tools
    {
      name: 'Date Converter',
      href: '/tools/date-converter',
      icon: Calendar,
      description: 'Convert between Nepali and English dates',
      color: 'from-purple-500 to-indigo-600',
      category: 'utilities'
    }
  ];

  const filteredTools = (() => {
    let tools = activeTab === 'all' 
      ? allTools 
      : allTools.filter(tool => tool.category === activeTab);
    
    // Apply search filter if there's a search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      tools = tools.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
      );
    }
    
    return tools;
  })();

  // Show only a subset of tools for better performance
  const visibleTools = filteredTools.slice(0, visibleToolsCount);
  const hasMoreTools = filteredTools.length > visibleToolsCount;

  const loadMoreTools = () => {
    setIsLoadingMore(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisibleToolsCount(prev => Math.min(prev + 8, filteredTools.length));
      setIsLoadingMore(false);
    }, 300);
  };

  // Reset visible tools count when tab changes
  useEffect(() => {
    setVisibleToolsCount(8);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>
      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ y }}
      >
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? 0.1 : 1, delay: 0.2 }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? 0.1 : 1, delay: 0.4 }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.08),transparent_50%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? 0.1 : 1, delay: 0.6 }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div 
            className="text-center"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            {/* Logo */}
            <motion.div 
              className="flex items-center justify-center gap-3 mb-8"
              variants={fadeInUp}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl"
                whileHover={{ 
                  scale: reducedMotion ? 1 : 1.1,
                  rotate: reducedMotion ? 0 : 5,
                  transition: { duration: 0.3 }
                }}
              >
                <Code className="w-8 h-8 text-white" />
              </motion.div>
              <motion.h1 
                className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-violet-900 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0.1 : 0.8, delay: 0.2 }}
              >
                Siscora Tools
              </motion.h1>
            </motion.div>
            
            {/* Main Headline */}
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight"
              variants={fadeInUp}
            >
              Smart, Free & Fast Online Utilities
            </motion.h2>
            
            {/* Subtext */}
            <motion.p 
              className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Explore 21+ developer, design, and everyday tools that work instantly in your browser. Fast loading, optimized performance.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              variants={fadeInUp}
            >
              <motion.div
                whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
                whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
              >
                <Link 
                  href="#tools"
                  className="group bg-gradient-to-r from-blue-600 to-violet-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 inline-flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Explore Tools
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
                whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
              >
                <Link 
                  href="/about"
                  className="group border-2 border-blue-500 text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 inline-flex items-center justify-center"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Why Choose Siscora Tools Section */}
      <motion.div 
        ref={featuresRef}
        className="py-20 bg-white/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0.1 : 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Siscora Tools?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with modern web standards and user experience in mind
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div 
              className="group text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-500"
              variants={fadeInUp}
              whileHover={{ y: reducedMotion ? 0 : -6, scale: reducedMotion ? 1 : 1.02 }}
              whileTap={{ scale: reducedMotion ? 1 : 0.98 }}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300"
                whileHover={{ 
                  scale: reducedMotion ? 1 : 1.1,
                  rotate: reducedMotion ? 0 : 5,
                  transition: { duration: 0.3 }
                }}
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">💨 Free & Fast</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">All tools load instantly, no signup needed.</p>
            </motion.div>
            
            <motion.div 
              className="group text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-500"
              variants={fadeInUp}
              whileHover={{ y: reducedMotion ? 0 : -6, scale: reducedMotion ? 1 : 1.02 }}
              whileTap={{ scale: reducedMotion ? 1 : 0.98 }}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-green-500/25 transition-all duration-300"
                whileHover={{ 
                  scale: reducedMotion ? 1 : 1.1,
                  rotate: reducedMotion ? 0 : 5,
                  transition: { duration: 0.3 }
                }}
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🔒 Privacy First</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Your data never leaves your browser.</p>
            </motion.div>
            
            <motion.div 
              className="group text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-500"
              variants={fadeInUp}
              whileHover={{ y: reducedMotion ? 0 : -6, scale: reducedMotion ? 1 : 1.02 }}
              whileTap={{ scale: reducedMotion ? 1 : 0.98 }}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-violet-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-violet-500/25 transition-all duration-300"
                whileHover={{ 
                  scale: reducedMotion ? 1 : 1.1,
                  rotate: reducedMotion ? 0 : 5,
                  transition: { duration: 0.3 }
                }}
              >
                <Wrench className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">⚙️ Professional Tools</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Built for developers, designers, and everyday users.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* All Tools Section with Tab Navigation */}
      <motion.div 
        ref={toolsRef}
        id="tools"
        className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/50 dark:from-gray-900/50 dark:to-gray-800/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0.1 : 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'All Tools'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {searchQuery 
                ? `Found ${filteredTools.length} tool${filteredTools.length !== 1 ? 's' : ''} matching your search`
                : 'Discover our collection of powerful, free tools designed to boost your productivity'
              }
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div 
            id="categories"
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.6 }}
            viewport={{ once: true }}
          >
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
                  whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: reducedMotion ? 0.1 : 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.name}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Tools Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            key={activeTab}
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {visibleTools.map((tool) => (
              <LazyToolCard
                key={tool.href}
                tool={tool}
                reducedMotion={reducedMotion}
                variants={fadeInUp}
              />
            ))}
          </motion.div>

          {/* Load More Button */}
          {hasMoreTools && (
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.button
                onClick={loadMoreTools}
                disabled={isLoadingMore}
                className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
                whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
              >
                {isLoadingMore ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                  </div>
                ) : (
                  `Load More Tools (${filteredTools.length - visibleToolsCount} remaining)`
                )}
              </motion.button>
            </motion.div>
          )}

          {/* No tools message for empty categories */}
          {filteredTools.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-gray-500 dark:text-gray-400 text-lg">
                No tools found in this category.
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Subscribe to Updates Section */}
      <motion.div 
        className="py-20 bg-white/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0.1 : 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.6 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: reducedMotion ? 1 : 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0.1 : 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Subscribe to Updates
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0.1 : 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Get notified when we release new tools and features
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0.1 : 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                whileFocus={{ scale: reducedMotion ? 1 : 1.02 }}
              />
              <motion.button 
                className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center"
                whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
                whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
              >
                <Send className="w-5 h-5 mr-2" />
                Subscribe
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-violet-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { 
                type: "spring", 
                stiffness: 500, 
                damping: 30,
                duration: reducedMotion ? 0.1 : 0.5
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0, 
              y: 20,
              transition: { duration: reducedMotion ? 0.1 : 0.3 }
            }}
            whileHover={{ 
              scale: reducedMotion ? 1 : 1.1,
              y: reducedMotion ? 0 : -2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: reducedMotion ? 1 : 0.9,
              transition: { duration: 0.1 }
            }}
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}