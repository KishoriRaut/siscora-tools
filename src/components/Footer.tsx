import Link from 'next/link';
import { Code, Mail, Phone, Shield, FileText, Hash, Key, Palette, Image, Calculator, QrCode, Type } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Siscora Tools</h3>
                <p className="text-sm text-gray-300">Free Online Tools for Everyone</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md text-lg">
              Smart, fast, and simple tools for everyday use — from hash generators to calculators, 
              all working directly in your browser.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:support@tools.siscora.com" className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800" title="Send us an email">
                <Mail className="w-5 h-5" />
              </a>
              <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800" title="Call us">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Popular Tools</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/tools/hash-generator" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <Hash className="w-4 h-4 mr-2 group-hover:text-green-400" />
                  Hash Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/password-generator" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <Key className="w-4 h-4 mr-2 group-hover:text-orange-400" />
                  Password Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/color-picker" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <Palette className="w-4 h-4 mr-2 group-hover:text-pink-400" />
                  Color Picker
                </Link>
              </li>
              <li>
                <Link href="/tools/qr-generator" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <QrCode className="w-4 h-4 mr-2 group-hover:text-blue-400" />
                  QR Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Legal & Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <FileText className="w-4 h-4 mr-2 group-hover:text-blue-400" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <Phone className="w-4 h-4 mr-2 group-hover:text-green-400" />
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <Shield className="w-4 h-4 mr-2 group-hover:text-purple-400" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <FileText className="w-4 h-4 mr-2 group-hover:text-indigo-400" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Siscora Tools. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Made with ❤️ for everyone who needs smart tools
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}