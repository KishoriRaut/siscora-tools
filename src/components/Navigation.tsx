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
  Code
} from 'lucide-react';

const tools = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
    description: 'Overview of all available tools'
  },
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
  },
  {
    name: 'Password Generator',
    href: '/tools/password-generator',
    icon: Key,
    description: 'Generate secure passwords with custom options'
  },
  {
    name: 'Color Picker',
    href: '/tools/color-picker',
    icon: Palette,
    description: 'Pick colors and get hex, RGB, HSL values'
  },
  {
    name: 'Hash Generator',
    href: '/tools/hash-generator',
    icon: Hash,
    description: 'Generate MD5, SHA-1, SHA-256 hashes'
  },
  {
    name: 'Base64 Encoder',
    href: '/tools/base64-encoder',
    icon: Code,
    description: 'Encode and decode Base64 strings'
  },
  {
    name: 'Text Counter',
    href: '/tools/text-counter',
    icon: FileText,
    description: 'Count words, characters, and lines in text'
  },
  {
    name: 'Image Converter',
    href: '/tools/image-converter',
    icon: Image,
    description: 'Convert images between different formats'
  },
  {
    name: 'Calculator',
    href: '/tools/calculator',
    icon: Calculator,
    description: 'Advanced calculator with multiple functions'
  }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
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
        fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">DevTools Hub</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Developer Tools</p>
            </div>
          </div>

          <nav className="space-y-2">
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
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{tool.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {tool.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
