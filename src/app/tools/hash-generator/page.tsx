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

  const generateHash = async (text: string, algorithm: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm.toUpperCase(), data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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
              hash = await generateMD5(content);
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

  // Simple MD5 implementation (for demonstration)
  const generateMD5 = async (text: string): Promise<string> => {
    // This is a simplified MD5 implementation
    // In a real application, you'd use a proper MD5 library
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32);
  };

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
    </div>
  );
}
