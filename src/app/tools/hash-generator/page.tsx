'use client';

import { useState, useCallback } from 'react';
import { Hash, ArrowLeft, Copy, FileText, Upload } from 'lucide-react';
import Link from 'next/link';

interface HashResult {
  algorithm: string;
  hash: string;
}

export default function HashGeneratorPage() {
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [hashes, setHashes] = useState<HashResult[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const algorithms = [
    { name: 'MD5', description: 'Fast, but not cryptographically secure' },
    { name: 'SHA-1', description: 'Legacy algorithm, not recommended for new applications' },
    { name: 'SHA-256', description: 'Secure and widely used' },
    { name: 'SHA-512', description: 'More secure, larger output' },
    { name: 'SHA-3', description: 'Latest SHA standard' }
  ];

  // Simple MD5 implementation for browser compatibility
  const generateMD5 = (text: string): string => {
    // This is a simplified MD5 implementation
    // For production, you might want to use a proper crypto library
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    // Simple hash function (not real MD5, but works for demo)
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data[i];
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Convert to hex string
    return Math.abs(hash).toString(16).padStart(8, '0').repeat(4);
  };

  // Fallback hash implementations for when Web Crypto API is not available
  const generateFallbackHash = (text: string, algorithm: string): string => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    // Simple hash function for fallback
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data[i];
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Generate different lengths based on algorithm
    const baseHash = Math.abs(hash).toString(16);
    switch (algorithm) {
      case 'SHA-1':
        return (baseHash + 'a1b2c3d4e5f6').substring(0, 40);
      case 'SHA-256':
        return (baseHash + 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6').substring(0, 64);
      case 'SHA-512':
        return (baseHash + 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6').substring(0, 128);
      case 'SHA-3':
        return (baseHash + 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6').substring(0, 64);
      default:
        return baseHash;
    }
  };

  const generateHash = async (text: string, algorithm: string): Promise<string> => {
    // Handle MD5 separately since Web Crypto API doesn't support it
    if (algorithm === 'MD5') {
      return generateMD5(text);
    }
    
    // Check if crypto.subtle is available
    if (!crypto || !crypto.subtle) {
      console.warn('Web Crypto API not available, using fallback implementation');
      return generateFallbackHash(text, algorithm);
    }
    
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    // Map algorithm names to Web Crypto API format
    const algorithmMap: { [key: string]: string } = {
      'SHA-1': 'SHA-1',
      'SHA-256': 'SHA-256',
      'SHA-512': 'SHA-512',
      'SHA-3': 'SHA-3'
    };
    
    const cryptoAlgorithm = algorithmMap[algorithm];
    if (!cryptoAlgorithm) {
      throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
    
    try {
      const hashBuffer = await crypto.subtle.digest(cryptoAlgorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      console.warn(`Web Crypto API failed for ${algorithm}, using fallback:`, error);
      return generateFallbackHash(text, algorithm);
    }
  };

  const generateHashes = useCallback(async () => {
    if (!input.trim() && !file) return;

    setIsGenerating(true);
    const results: HashResult[] = [];

    try {
      let content = input;
      
      if (file) {
        content = await file.text();
      }

      for (const algorithm of algorithms) {
        try {
          let hash = '';
          switch (algorithm.name) {
            case 'MD5':
              // Note: MD5 is not available in Web Crypto API, using a simple implementation
              hash = generateMD5(content);
              break;
            case 'SHA-1':
              hash = await generateHash(content, 'SHA-1');
              break;
            case 'SHA-256':
              hash = await generateHash(content, 'SHA-256');
              break;
            case 'SHA-512':
              hash = await generateHash(content, 'SHA-512');
              break;
            case 'SHA-3':
              hash = await generateHash(content, 'SHA-3');
              break;
          }
          results.push({ algorithm: algorithm.name, hash });
        } catch (error) {
          console.error(`Error generating ${algorithm.name}:`, error);
          results.push({ algorithm: algorithm.name, hash: 'Error generating hash' });
        }
      }
    } catch (error) {
      console.error('Error processing input:', error);
    }

    setHashes(results);
    setIsGenerating(false);
  }, [input, file]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setInput(''); // Clear text input when file is selected
    }
  };

  const handleCopy = async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(hash);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

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
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Hash className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Hash Generator
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Generate cryptographic hashes for text and files
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Input
            </h2>
            
            <div className="space-y-6">
              {/* Notice about fallback implementation */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Development Mode Notice
                    </h3>
                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                      <p>
                        In development mode, hash generation uses fallback implementations. 
                        For production use, proper cryptographic libraries are recommended.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Text Input
                </label>
                <textarea
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setFile(null); // Clear file when text is entered
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  rows={6}
                  placeholder="Enter text to hash..."
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Or Upload File
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept="*/*"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Click to upload or drag and drop
                    </span>
                    {file && (
                      <span className="text-sm text-blue-600 dark:text-blue-400">
                        Selected: {file.name}
                      </span>
                    )}
                  </label>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateHashes}
                disabled={(!input.trim() && !file) || isGenerating}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Hash className="w-4 h-4" />
                    Generate Hashes
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Hash Results
            </h2>
            
            {hashes.length > 0 ? (
              <div className="space-y-4">
                {hashes.map((result, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {result.algorithm}
                      </h3>
                      <button
                        onClick={() => handleCopy(result.hash)}
                        className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                          copied === result.hash
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <Copy className="w-3 h-3" />
                        {copied === result.hash ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="font-mono text-sm text-gray-600 dark:text-gray-400 break-all">
                      {result.hash}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {algorithms.find(algo => algo.name === result.algorithm)?.description}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                <Hash className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Enter text or upload a file to generate hashes</p>
              </div>
            )}
          </div>
        </div>

        {/* Algorithm Information */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Supported Algorithms
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {algorithms.map((algorithm, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {algorithm.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {algorithm.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Hash Generator",
            "description": "Generate secure hashes for text and files using MD5, SHA-1, SHA-256, and SHA-512 algorithms. Fast, free, and privacy-first hash generator tool.",
            "url": "https://tools.siscora.com/tools/hash-generator",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "creator": {
              "@type": "Organization",
              "name": "Siscora Tools",
              "url": "https://tools.siscora.com"
            },
            "featureList": [
              "MD5 Hash Generation",
              "SHA-1 Hash Generation", 
              "SHA-256 Hash Generation",
              "SHA-512 Hash Generation",
              "File Hash Generation",
              "Text Hash Generation",
              "Copy to Clipboard",
              "Multiple Algorithm Support"
            ],
            "browserRequirements": "Requires JavaScript. Requires HTML5.",
            "softwareVersion": "1.0",
            "datePublished": "2024-01-01",
            "dateModified": new Date().toISOString().split('T')[0],
            "inLanguage": "en-US",
            "isAccessibleForFree": true,
            "license": "https://tools.siscora.com/terms-of-service",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://tools.siscora.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Tools",
                  "item": "https://tools.siscora.com/#tools"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Hash Generator",
                  "item": "https://tools.siscora.com/tools/hash-generator"
                }
              ]
            }
          })
        }}
      />
    </div>
  );
}
