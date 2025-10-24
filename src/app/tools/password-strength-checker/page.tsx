'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/CopyButton';
import { Shield, Eye, EyeOff, CheckCircle, XCircle, AlertTriangle, ArrowLeft } from 'lucide-react';

interface PasswordAnalysis {
  score: number;
  strength: 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong' | 'Very Strong';
  feedback: string[];
  suggestions: string[];
  timeToCrack: string;
  entropy: number;
}

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState<PasswordAnalysis | null>(null);

  const analyzePassword = (pwd: string): PasswordAnalysis => {
    const feedback: string[] = [];
    const suggestions: string[] = [];
    let score = 0;
    let entropy = 0;

    // Length analysis
    if (pwd.length < 8) {
      feedback.push('Password is too short (minimum 8 characters)');
      suggestions.push('Use at least 8 characters');
    } else if (pwd.length >= 12) {
      score += 2;
      feedback.push('Good length');
    } else {
      score += 1;
    }

    // Character variety analysis
    const hasLowercase = /[a-z]/.test(pwd);
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasNumbers = /[0-9]/.test(pwd);
    const hasSymbols = /[^a-zA-Z0-9]/.test(pwd);

    if (hasLowercase) {
      score += 1;
      entropy += 26;
    } else {
      suggestions.push('Add lowercase letters');
    }

    if (hasUppercase) {
      score += 1;
      entropy += 26;
    } else {
      suggestions.push('Add uppercase letters');
    }

    if (hasNumbers) {
      score += 1;
      entropy += 10;
    } else {
      suggestions.push('Add numbers');
    }

    if (hasSymbols) {
      score += 2;
      entropy += 32;
    } else {
      suggestions.push('Add special characters (!@#$%^&*)');
    }

    // Common patterns
    const commonPatterns = [
      /123|abc|qwe|asd|zxc/i,
      /password|admin|user|login/i,
      /111|222|333|444|555|666|777|888|999|000/,
      /(.)\1{2,}/, // Repeated characters
    ];

    const hasCommonPattern = commonPatterns.some(pattern => pattern.test(pwd));
    if (hasCommonPattern) {
      score -= 2;
      feedback.push('Contains common patterns');
      suggestions.push('Avoid common patterns and sequences');
    }

    // Dictionary words
    const commonWords = ['password', 'admin', 'user', 'login', 'welcome', 'hello', 'test'];
    const hasCommonWord = commonWords.some(word => pwd.toLowerCase().includes(word));
    if (hasCommonWord) {
      score -= 1;
      feedback.push('Contains common dictionary words');
      suggestions.push('Avoid common words');
    }

    // Calculate entropy
    entropy = Math.log2(Math.pow(entropy, pwd.length));

    // Determine strength
    let strength: PasswordAnalysis['strength'];
    if (score <= 2) strength = 'Very Weak';
    else if (score <= 4) strength = 'Weak';
    else if (score <= 6) strength = 'Fair';
    else if (score <= 8) strength = 'Good';
    else if (score <= 10) strength = 'Strong';
    else strength = 'Very Strong';

    // Calculate time to crack (simplified)
    const timeToCrack = calculateTimeToCrack(entropy);

    return {
      score: Math.max(0, Math.min(10, score)),
      strength,
      feedback,
      suggestions,
      timeToCrack,
      entropy: Math.round(entropy)
    };
  };

  const calculateTimeToCrack = (entropy: number): string => {
    const combinations = Math.pow(2, entropy);
    const attemptsPerSecond = 1e9; // 1 billion attempts per second (modern GPU)
    const seconds = combinations / (attemptsPerSecond * 2); // Divide by 2 for average case

    if (seconds < 1) return 'Less than 1 second';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
    return `${Math.round(seconds / 3153600000)} centuries`;
  };

  const handleAnalyze = () => {
    if (!password.trim()) {
      setAnalysis(null);
      return;
    }
    
    const result = analyzePassword(password);
    setAnalysis(result);
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'Very Weak': return 'text-red-600 dark:text-red-400';
      case 'Weak': return 'text-red-500 dark:text-red-400';
      case 'Fair': return 'text-orange-500 dark:text-orange-400';
      case 'Good': return 'text-yellow-500 dark:text-yellow-400';
      case 'Strong': return 'text-green-500 dark:text-green-400';
      case 'Very Strong': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-500 dark:text-gray-400';
    }
  };

  const getStrengthBgColor = (strength: string) => {
    switch (strength) {
      case 'Very Weak': return 'bg-red-50 dark:bg-red-900/20';
      case 'Weak': return 'bg-red-50 dark:bg-red-900/20';
      case 'Fair': return 'bg-orange-50 dark:bg-orange-900/20';
      case 'Good': return 'bg-yellow-50 dark:bg-yellow-900/20';
      case 'Strong': return 'bg-green-50 dark:bg-green-900/20';
      case 'Very Strong': return 'bg-green-50 dark:bg-green-900/20';
      default: return 'bg-gray-50 dark:bg-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Password Strength Checker
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Analyze your password strength and get suggestions to improve security. Your password is analyzed locally and never sent anywhere.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Password Input
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter password to analyze
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password..."
                    className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAnalyze}
                className="w-full"
                disabled={!password.trim()}
              >
                <Shield className="w-4 h-4 mr-2" />
                Analyze Password
              </Button>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p className="mb-2"><strong>Privacy Note:</strong> Your password is analyzed locally in your browser.</p>
                <p>No data is sent to external servers or stored anywhere.</p>
              </div>
            </div>
          </Card>

          {/* Results Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Analysis Results
              </h2>
              {analysis && (
                <CopyButton text={`Password Strength: ${analysis.strength}\nScore: ${analysis.score}/10\nTime to Crack: ${analysis.timeToCrack}`} />
              )}
            </div>
            
            {analysis ? (
              <div className="space-y-4">
                {/* Strength Score */}
                <div className={`p-4 rounded-lg ${getStrengthBgColor(analysis.strength)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">Strength</span>
                    <span className={`font-bold ${getStrengthColor(analysis.strength)}`}>
                      {analysis.strength}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          analysis.score <= 2 ? 'bg-red-500' :
                          analysis.score <= 4 ? 'bg-red-400' :
                          analysis.score <= 6 ? 'bg-orange-400' :
                          analysis.score <= 8 ? 'bg-yellow-400' :
                          analysis.score <= 10 ? 'bg-green-400' : 'bg-green-500'
                        }`}
                        style={{ width: `${(analysis.score / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {analysis.score}/10
                    </span>
                  </div>
                </div>

                {/* Security Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Entropy</div>
                    <div className="font-bold text-gray-900 dark:text-white">{analysis.entropy} bits</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Time to Crack</div>
                    <div className="font-bold text-gray-900 dark:text-white">{analysis.timeToCrack}</div>
                  </div>
                </div>

                {/* Feedback */}
                {analysis.feedback.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Analysis</h3>
                    <div className="space-y-1">
                      {analysis.feedback.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          {item.includes('Good') || item.includes('length') ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {analysis.suggestions.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Suggestions</h3>
                    <div className="space-y-1">
                      {analysis.suggestions.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Enter a password to analyze its strength
              </div>
            )}
          </Card>
        </div>

        {/* Password Guidelines */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Strong Password Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Do's</h4>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Use at least 12 characters
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Mix uppercase and lowercase letters
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Include numbers and symbols
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Use passphrases (multiple words)
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Don'ts</h4>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  Use personal information
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  Use common words or patterns
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  Reuse passwords across accounts
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  Use keyboard patterns (qwerty, 123456)
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
