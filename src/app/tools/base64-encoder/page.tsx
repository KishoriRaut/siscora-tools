'use client';

import { useState, useCallback } from 'react';
import { Code, ArrowLeft, Copy, Upload, Download } from 'lucide-react';
import Link from 'next/link';

export default function Base64EncoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [file, setFile] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEncode = useCallback(async () => {
    if (!input.trim() && !file) return;

    setIsProcessing(true);
    try {
      let content = input;
      
      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        content = Array.from(uint8Array).map(byte => String.fromCharCode(byte)).join('');
      }

      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(content)));
        setOutput(encoded);
      } else {
        try {
          const decoded = decodeURIComponent(escape(atob(content)));
          setOutput(decoded);
        } catch (error) {
          setOutput('Error: Invalid Base64 string');
        }
      }
    } catch (error) {
      setOutput('Error processing input');
    }
    setIsProcessing(false);
  }, [input, file, mode]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setInput(''); // Clear text input when file is selected
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleDownload = () => {
    if (output && mode === 'encode') {
      const blob = new Blob([output], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'base64-encoded.txt';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setFile(null);
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
            <div className="w-12 h-12 bg-linear-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Code className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Base64 Encoder/Decoder
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Encode and decode Base64 strings with file support
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Input
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setMode('encode')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    mode === 'encode'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Encode
                </button>
                <button
                  onClick={() => setMode('decode')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    mode === 'decode'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Decode
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Text Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
                </label>
                <textarea
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setFile(null); // Clear file when text is entered
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono"
                  rows={8}
                  placeholder={
                    mode === 'encode' 
                      ? 'Enter text to encode to Base64...' 
                      : 'Enter Base64 string to decode...'
                  }
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
                        Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    )}
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleEncode}
                  disabled={(!input.trim() && !file) || isProcessing}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label={mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Code className="w-4 h-4" />
                      {mode === 'encode' ? 'Encode' : 'Decode'}
                    </>
                  )}
                </button>
                <button
                  onClick={clearAll}
                  className="px-4 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 hover:shadow-lg transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  aria-label="Clear all inputs and outputs"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Output
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!output}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    copied
                      ? 'bg-green-500 text-white cursor-default focus:ring-green-500'
                      : output
                      ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg focus:ring-blue-500 active:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed'
                  }`}
                  aria-label={copied ? 'Output copied to clipboard' : 'Copy output to clipboard'}
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                {output && mode === 'encode' && (
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 hover:shadow-lg transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    aria-label="Download encoded output as file"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Output Display */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <textarea
                  value={output}
                  readOnly
                  className="w-full bg-transparent border-none outline-none resize-none font-mono text-sm text-gray-900 dark:text-white"
                  rows={8}
                  placeholder="Output will appear here..."
                />
              </div>

              {/* Output Info */}
              {output && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Length:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {output.length} characters
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Size:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {(output.length * 0.75).toFixed(1)} bytes
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            About Base64 Encoding
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                What is Base64?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. 
                It's commonly used for encoding data in URLs, email attachments, and data storage.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Common Uses
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                <li>• Email attachments (MIME)</li>
                <li>• Data URLs in web pages</li>
                <li>• API authentication tokens</li>
                <li>• Storing binary data in JSON</li>
                <li>• Image encoding for web</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
