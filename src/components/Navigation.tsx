'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Home, 
  Mail, 
  QrCode, 
  Key, 
  Palette, 
  Hash,
  Calculator,
  FileText,
  Image,
  Code,
  Info,
  Phone,
  Shield,
  FileText as TermsIcon,
  ChevronDown,
  ChevronRight,
  Wrench,
  Search,
  Filter,
  Type,
  Link as LinkIcon,
  GraduationCap
} from 'lucide-react';

const mainNavigation = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
    description: 'Overview of all available tools'
  },
  {
    name: 'About',
    href: '/about',
    icon: Info,
    description: 'Learn about our mission and team'
  }
];

const toolCategories = {
  'Text & String': [
    {
      name: 'Text Case Converter',
      href: '/tools/text-case-converter',
      icon: Type,
      description: 'Convert text between different cases'
    },
    {
      name: 'Text Diff Checker',
      href: '/tools/text-diff-checker',
      icon: FileText,
      description: 'Compare two texts and see differences'
    },
    {
      name: 'Lorem Ipsum Generator',
      href: '/tools/lorem-ipsum-generator',
      icon: FileText,
      description: 'Generate placeholder text for designs'
    },
    {
      name: 'Text to Binary Converter',
      href: '/tools/text-binary-converter',
      icon: Code,
      description: 'Convert text to binary and vice versa'
    },
    {
      name: 'String Length Calculator',
      href: '/tools/string-length-calculator',
      icon: Hash,
      description: 'Analyze text with detailed statistics'
    }
  ],
  'Security & Encryption': [
    {
      name: 'Password Generator',
      href: '/tools/password-generator',
      icon: Key,
      description: 'Generate secure passwords with custom options'
    },
    {
      name: 'Hash Generator',
      href: '/tools/hash-generator',
      icon: Hash,
      description: 'Generate MD5, SHA-1, SHA-256 hashes'
    },
    {
      name: 'JWT Decoder',
      href: '/tools/jwt-decoder',
      icon: Shield,
      description: 'Decode and analyze JWT tokens'
    },
    {
      name: 'UUID Generator',
      href: '/tools/uuid-generator',
      icon: Hash,
      description: 'Generate universally unique identifiers'
    },
    {
      name: 'Password Strength Checker',
      href: '/tools/password-strength-checker',
      icon: Shield,
      description: 'Analyze password security and strength'
    }
  ],
  'Web Development': [
    {
      name: 'Base64 Encoder',
      href: '/tools/base64-encoder',
      icon: Code,
      description: 'Encode and decode Base64 strings'
    },
    {
      name: 'URL Shortener',
      href: '/tools/url-shortener',
      icon: LinkIcon,
      description: 'Create short, memorable URLs'
    },
    {
      name: 'JSON Formatter',
      href: '/tools/json-formatter',
      icon: Code,
      description: 'Format and validate JSON data'
    },
    {
      name: 'HTML Encoder/Decoder',
      href: '/tools/html-encoder-decoder',
      icon: Code,
      description: 'Encode and decode HTML entities'
    },
    {
      name: 'Website Analyzer',
      href: '/tools/website-analyzer',
      icon: Search,
      description: 'Analyze websites for SEO, performance, and accessibility'
    }
  ],
  'Design & Color': [
    {
      name: 'Color Picker',
      href: '/tools/color-picker',
      icon: Palette,
      description: 'Pick colors and get hex, RGB, HSL values'
    },
    {
      name: 'Color Palette Generator',
      href: '/tools/color-palette-generator',
      icon: Palette,
      description: 'Generate beautiful color palettes'
    },
    {
      name: 'CSS Gradient Generator',
      href: '/tools/css-gradient-generator',
      icon: Palette,
      description: 'Create CSS gradients with visual editor'
    },
    {
      name: 'Image Converter',
      href: '/tools/image-converter',
      icon: Image,
      description: 'Convert images between different formats'
    }
  ],
  'Calculators': [
    {
      name: 'Calculator',
      href: '/tools/calculator',
      icon: Calculator,
      description: 'Advanced calculator with multiple functions'
    },
    {
      name: 'Percentage Calculator',
      href: '/tools/percentage-calculator',
      icon: Calculator,
      description: 'Calculate percentages, tips, and discounts'
    },
    {
      name: 'GPA to Percentage',
      href: '/tools/gpa-to-percentage',
      icon: GraduationCap,
      description: 'Convert GPA to percentage on different scales'
    },
    {
      name: 'Percentage to GPA',
      href: '/tools/percentage-to-gpa',
      icon: GraduationCap,
      description: 'Convert percentage grades to GPA'
    },
    {
      name: 'Unit Converter',
      href: '/tools/unit-converter',
      icon: Calculator,
      description: 'Convert between different units of measurement'
    }
  ],
  'Communication': [
    {
      name: 'Email Signature',
      href: '/tools/email-signature',
      icon: Mail,
      description: 'Generate professional email signatures'
    },
    {
      name: 'QR Code Generator',
      href: '/tools/qr-generator',
      icon: QrCode,
      description: 'Create QR codes for URLs, text, and more'
    }
  ],
  'Utilities': [
    {
      name: 'Text Counter',
      href: '/tools/text-counter',
      icon: FileText,
      description: 'Count words, characters, and lines in text'
    }
  ]
};

const footerLinks = [
  {
    name: 'Contact',
    href: '/contact',
    icon: Phone,
    description: 'Get in touch with us'
  },
  {
    name: 'Privacy Policy',
    href: '/privacy-policy',
    icon: Shield,
    description: 'How we protect your data'
  },
  {
    name: 'Terms of Service',
    href: '/terms-of-service',
    icon: TermsIcon,
    description: 'Terms and conditions'
  }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const pathname = usePathname();

  // Get all tools for search
  const allTools = Object.values(toolCategories).flat();
  
  // Filter tools based on search and category
  const filteredTools = allTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || 
                           Object.entries(toolCategories).find(([category, tools]) => 
                             category === selectedCategory && tools.includes(tool)
                           );
    return matchesSearch && matchesCategory;
  });

  // Get categories that have tools matching the search
  const getFilteredCategories = () => {
    if (searchQuery) {
      const categoriesWithMatches = Object.entries(toolCategories).filter(([category, tools]) =>
        tools.some(tool => 
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      return Object.fromEntries(categoriesWithMatches);
    }
    return toolCategories;
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 shadow-lg z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">DevTools Hub</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Developer Tools</p>
            </div>
          </div>

          <nav className="space-y-2 flex-1">
            {/* Main Navigation */}
            {mainNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{item.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Tools Section */}
            <div className="mt-6">
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Wrench className="w-5 h-5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">Tools</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    Developer utilities and generators
                  </div>
                </div>
                {isToolsOpen ? (
                  <ChevronDown className="w-4 h-4 shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 shrink-0" />
                )}
              </button>

              {/* Tools Submenu */}
              {isToolsOpen && (
                <div className="ml-4 mt-2 space-y-3">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tools..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-1">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`px-2 py-1 text-xs rounded-full transition-colors ${
                        !selectedCategory 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' 
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      All
                    </button>
                    {Object.keys(toolCategories).map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                        className={`px-2 py-1 text-xs rounded-full transition-colors ${
                          selectedCategory === category 
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' 
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* Tools List */}
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {searchQuery ? (
                      // Show search results
                      filteredTools.map((tool) => {
                        const Icon = tool.icon;
                        const isActive = pathname === tool.href;
                        
                        return (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            onClick={() => setIsOpen(false)}
                            className={`
                              flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200
                              ${isActive 
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500' 
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                              }
                            `}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate text-sm">{tool.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {tool.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })
                    ) : (
                      // Show categorized tools
                      Object.entries(getFilteredCategories()).map(([category, tools]) => (
                        <div key={category} className="space-y-1">
                          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-1">
                            {category}
                          </div>
                          {tools.map((tool) => {
                            const Icon = tool.icon;
                            const isActive = pathname === tool.href;
                            
                            return (
                              <Link
                                key={tool.href}
                                href={tool.href}
                                onClick={() => setIsOpen(false)}
                                className={`
                                  flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200
                                  ${isActive 
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500' 
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                  }
                                `}
                              >
                                <Icon className="w-4 h-4 shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium truncate text-sm">{tool.name}</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {tool.description}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">Legal & Info</div>
            <div className="space-y-1">
              {footerLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-2 px-2 py-1 rounded text-xs transition-colors duration-200
                      ${isActive 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <Icon className="w-3 h-3 shrink-0" />
                    <span className="truncate">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
