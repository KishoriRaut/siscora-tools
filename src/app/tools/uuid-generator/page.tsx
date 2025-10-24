'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/CopyButton';
import { Hash, RefreshCw, Download, Settings, ArrowLeft } from 'lucide-react';

interface UUIDOptions {
  version: 'v1' | 'v4';
  count: number;
  format: 'uppercase' | 'lowercase';
  dashes: boolean;
}

export default function UUIDGenerator() {
  const [options, setOptions] = useState<UUIDOptions>({
    version: 'v4',
    count: 1,
    format: 'lowercase',
    dashes: true
  });
  const [generatedUUIDs, setGeneratedUUIDs] = useState<string[]>([]);

  const generateUUIDv4 = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateUUIDv1 = (): string => {
    // Simplified v1 UUID generation (timestamp-based)
    const timestamp = Date.now();
    const random = Math.random().toString(16).substring(2, 14);
    const clockSeq = Math.floor(Math.random() * 0x3fff) + 0x8000;
    const node = Math.random().toString(16).substring(2, 14);
    
    const timestampHex = timestamp.toString(16).padStart(12, '0');
    const timeLow = timestampHex.substring(8);
    const timeMid = timestampHex.substring(4, 8);
    const timeHigh = timestampHex.substring(0, 4);
    
    return `${timeLow}-${timeMid}-${timeHigh}-${clockSeq.toString(16)}-${node}`;
  };

  const formatUUID = (uuid: string): string => {
    let formatted = uuid;
    
    if (!options.dashes) {
      formatted = formatted.replace(/-/g, '');
    }
    
    if (options.format === 'uppercase') {
      formatted = formatted.toUpperCase();
    }
    
    return formatted;
  };

  const generateUUIDs = () => {
    const uuids: string[] = [];
    
    for (let i = 0; i < options.count; i++) {
      const uuid = options.version === 'v4' ? generateUUIDv4() : generateUUIDv1();
      uuids.push(formatUUID(uuid));
    }
    
    setGeneratedUUIDs(uuids);
  };

  const downloadAsFile = () => {
    const content = generatedUUIDs.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids_${options.version}_${options.count}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getUUIDInfo = (uuid: string) => {
    const version = uuid.charAt(14);
    const variant = uuid.charAt(19);
    
    return {
      version: version === '4' ? 'Version 4 (Random)' : version === '1' ? 'Version 1 (Time-based)' : 'Unknown',
      variant: variant === '8' || variant === '9' || variant === 'a' || variant === 'b' ? 'RFC 4122' : 'Unknown'
    };
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
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/20 rounded-lg flex items-center justify-center">
                <Hash className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                UUID Generator
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Generate universally unique identifiers (UUIDs) for your applications. Choose between different versions and formats.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Options */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Generator Options
            </h2>
            
            <div className="space-y-6">
              {/* Version */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  UUID Version
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOptions({...options, version: 'v4'})}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      options.version === 'v4'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium">Version 4</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Random</div>
                  </button>
                  <button
                    onClick={() => setOptions({...options, version: 'v1'})}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      options.version === 'v1'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium">Version 1</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Time-based</div>
                  </button>
                </div>
              </div>

              {/* Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number of UUIDs
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={options.count}
                  onChange={(e) => setOptions({...options, count: parseInt(e.target.value) || 1})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Number of UUIDs to generate"
                />
              </div>

              {/* Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOptions({...options, format: 'lowercase'})}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      options.format === 'lowercase'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium">Lowercase</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">abc123</div>
                  </button>
                  <button
                    onClick={() => setOptions({...options, format: 'uppercase'})}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      options.format === 'uppercase'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium">Uppercase</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">ABC123</div>
                  </button>
                </div>
              </div>

              {/* Dashes */}
              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={options.dashes}
                    onChange={(e) => setOptions({...options, dashes: e.target.checked})}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Include dashes
                  </span>
                </label>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateUUIDs}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate UUIDs
              </Button>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => setOptions({...options, count: 1})}
                  className="text-sm"
                >
                  Single UUID
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setOptions({...options, count: 10})}
                  className="text-sm"
                >
                  Batch (10)
                </Button>
              </div>
            </div>
          </Card>

          {/* Results */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Generated UUIDs
              </h2>
              {generatedUUIDs.length > 0 && (
                <div className="flex gap-2">
                  <CopyButton text={generatedUUIDs.join('\n')} />
                  <Button
                    onClick={downloadAsFile}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {generatedUUIDs.length > 0 ? (
                <div className="space-y-3">
                  {generatedUUIDs.map((uuid, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          UUID #{index + 1}
                        </span>
                        <CopyButton text={uuid} />
                      </div>
                      <div className="font-mono text-sm text-gray-900 dark:text-white break-all">
                        {uuid}
                      </div>
                      {uuid.includes('-') && (
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          {getUUIDInfo(uuid).version} • {getUUIDInfo(uuid).variant}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Click "Generate UUIDs" to create UUIDs
                </div>
              )}

              {generatedUUIDs.length > 0 && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Total UUIDs: {generatedUUIDs.length}</span>
                    <span>Version: {options.version.toUpperCase()}</span>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* UUID Information */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            UUID Versions Explained
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Version 4 (Random)</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Most commonly used version</li>
                <li>• Generated using random or pseudo-random numbers</li>
                <li>• 122 bits of randomness</li>
                <li>• Best for most applications</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Version 1 (Time-based)</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Generated using timestamp and MAC address</li>
                <li>• Contains temporal information</li>
                <li>• Can be sorted chronologically</li>
                <li>• Good for distributed systems</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Use Cases */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Common Use Cases
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Database Keys</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use as primary keys in databases to ensure uniqueness across distributed systems.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">API Tokens</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generate unique identifiers for API keys, session tokens, and authentication.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">File Names</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create unique file names for uploads, temporary files, and data exports.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
