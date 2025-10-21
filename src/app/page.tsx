'use client';

import { 
  Mail, 
  QrCode, 
  Key, 
  Palette, 
  Hash, 
  Calculator, 
  FileText, 
  Image, 
  Code,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const tools = [
  {
    name: 'Email Signature Generator',
    href: '/tools/email-signature',
    icon: Mail,
    description: 'Create professional email signatures with custom styling and social links',
    color: 'from-blue-500 to-blue-600',
    features: ['Custom styling', 'Social media links', 'Logo upload', 'Multiple formats']
  },
  {
    name: 'QR Code Generator',
    href: '/tools/qr-generator',
    icon: QrCode,
    description: 'Generate QR codes for URLs, text, WiFi credentials, and more',
    color: 'from-green-500 to-green-600',
    features: ['URL encoding', 'Text encoding', 'WiFi QR codes', 'Custom styling']
  },
  {
    name: 'Password Generator',
    href: '/tools/password-generator',
    icon: Key,
    description: 'Generate secure passwords with customizable length and character sets',
    color: 'from-red-500 to-red-600',
    features: ['Custom length', 'Character sets', 'Strength indicator', 'Copy to clipboard']
  },
  {
    name: 'Color Picker',
    href: '/tools/color-picker',
    icon: Palette,
    description: 'Pick colors and get hex, RGB, HSL values with color palette generation',
    color: 'from-purple-500 to-purple-600',
    features: ['Color picker', 'Multiple formats', 'Palette generation', 'Color history']
  },
  {
    name: 'Hash Generator',
    href: '/tools/hash-generator',
    icon: Hash,
    description: 'Generate MD5, SHA-1, SHA-256, and other cryptographic hashes',
    color: 'from-orange-500 to-orange-600',
    features: ['Multiple algorithms', 'File hashing', 'Text hashing', 'Hash comparison']
  },
  {
    name: 'Base64 Encoder',
    href: '/tools/base64-encoder',
    icon: Code,
    description: 'Encode and decode Base64 strings with file support',
    color: 'from-indigo-500 to-indigo-600',
    features: ['Text encoding', 'File encoding', 'URL encoding', 'Validation']
  },
  {
    name: 'Text Counter',
    href: '/tools/text-counter',
    icon: FileText,
    description: 'Count words, characters, lines, and paragraphs in your text',
    color: 'from-teal-500 to-teal-600',
    features: ['Word count', 'Character count', 'Line count', 'Reading time']
  },
  {
    name: 'Image Converter',
    href: '/tools/image-converter',
    icon: Image,
    description: 'Convert images between different formats (JPG, PNG, WebP, etc.)',
    color: 'from-pink-500 to-pink-600',
    features: ['Format conversion', 'Quality adjustment', 'Batch processing', 'Preview']
  },
  {
    name: 'Calculator',
    href: '/tools/calculator',
    icon: Calculator,
    description: 'Advanced calculator with scientific functions and history',
    color: 'from-gray-500 to-gray-600',
    features: ['Basic operations', 'Scientific functions', 'History', 'Memory']
  }
];

export default function Home() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Code className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              DevTools Hub
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive collection of developer tools and utilities to boost your productivity
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              >
                <div className={`h-2 bg-gradient-to-r ${tool.color}`} />
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {tool.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {tool.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              More Tools Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're constantly adding new tools to help developers work more efficiently. 
              Stay tuned for updates!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>• JSON Formatter</span>
              <span>• URL Shortener</span>
              <span>• Regex Tester</span>
              <span>• Lorem Ipsum Generator</span>
              <span>• UUID Generator</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}