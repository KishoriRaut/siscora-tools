'use client';

import { useState, useCallback } from 'react';
import { Key, ArrowLeft, Copy, RefreshCw, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
  excludeAmbiguous: boolean;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false
  });
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = '';
    
    if (options.includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.includeNumbers) charset += '0123456789';
    if (options.includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (options.excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }
    
    if (options.excludeAmbiguous) {
      charset = charset.replace(/[{}[\]()\/\\~,;.<>]/g, '');
    }
    
    if (charset === '') {
      setPassword('');
      return;
    }
    
    let result = '';
    for (let i = 0; i < options.length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(result);
  }, [options]);

  const calculatePasswordStrength = (pwd: string): PasswordStrength => {
    let score = 0;
    
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    
    if (score <= 2) return { score, label: 'Weak', color: 'text-red-500' };
    if (score <= 4) return { score, label: 'Fair', color: 'text-orange-500' };
    if (score <= 6) return { score, label: 'Good', color: 'text-yellow-500' };
    return { score, label: 'Strong', color: 'text-green-500' };
  };

  const handleCopy = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  const strength = calculatePasswordStrength(password);

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-linear-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <Key className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Password Generator
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Generate secure passwords with customizable options
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Password Options
            </h2>
            
            <div className="space-y-6">
              {/* Length */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Length: {options.length} characters
                </label>
                  <input
                    type="range"
                    min="4"
                    max="128"
                    value={options.length}
                    onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    aria-label="Password length"
                  />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>4</span>
                  <span>128</span>
                </div>
              </div>

              {/* Character Sets */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Character Sets
                </h3>
                
                {[
                  { key: 'includeUppercase', label: 'Uppercase (A-Z)', example: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
                  { key: 'includeLowercase', label: 'Lowercase (a-z)', example: 'abcdefghijklmnopqrstuvwxyz' },
                  { key: 'includeNumbers', label: 'Numbers (0-9)', example: '0123456789' },
                  { key: 'includeSymbols', label: 'Symbols (!@#$...)', example: '!@#$%^&*()_+-=[]{}|;:,.<>?' }
                ].map((option) => (
                  <label key={option.key} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options[option.key as keyof PasswordOptions] as boolean}
                      onChange={(e) => setOptions({ ...options, [option.key]: e.target.checked })}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {option.label}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                        {option.example}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Advanced Options */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Advanced Options
                </h3>
                
                {[
                  { key: 'excludeSimilar', label: 'Exclude similar characters', description: 'Remove i, l, 1, L, o, 0, O' },
                  { key: 'excludeAmbiguous', label: 'Exclude ambiguous characters', description: 'Remove {}[]()/\\~,;.<>' }
                ].map((option) => (
                  <label key={option.key} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options[option.key as keyof PasswordOptions] as boolean}
                      onChange={(e) => setOptions({ ...options, [option.key]: e.target.checked })}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {option.label}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {option.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Generate Button */}
              <button
                onClick={generatePassword}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Generate Password
              </button>
            </div>
          </div>

          {/* Generated Password */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Generated Password
            </h2>
            
            <div className="space-y-6">
              {/* Password Display */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 font-mono text-lg break-all">
                    {showPassword ? password : '•'.repeat(password.length || 20)}
                  </div>
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Password Strength */}
              {password && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password Strength
                    </span>
                    <span className={`text-sm font-medium ${strength.color}`}>
                      {strength.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        strength.score <= 2 ? 'bg-red-500' :
                        strength.score <= 4 ? 'bg-orange-500' :
                        strength.score <= 6 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(strength.score / 7) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Password Info */}
              {password && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Length:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{password.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Character sets used:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {[
                        options.includeUppercase && 'A-Z',
                        options.includeLowercase && 'a-z',
                        options.includeNumbers && '0-9',
                        options.includeSymbols && '!@#$'
                      ].filter(Boolean).join(', ')}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  disabled={!password}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    copied
                      ? 'bg-green-500 text-white cursor-default focus:ring-green-500'
                      : password
                      ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg focus:ring-blue-500 active:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed'
                  }`}
                  aria-label={copied ? 'Password copied to clipboard' : 'Copy password to clipboard'}
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy Password'}
                </button>
                <button
                  onClick={generatePassword}
                  className="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 hover:shadow-lg transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  aria-label="Generate new password"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
