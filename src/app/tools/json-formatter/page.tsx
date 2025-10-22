'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/CopyButton';
import { Code, CheckCircle, XCircle, Download, Settings } from 'lucide-react';

interface JSONResult {
  formatted: string;
  isValid: boolean;
  error: string | null;
  size: number;
  keys: number;
  depth: number;
}

export default function JSONFormatter() {
  const [inputJSON, setInputJSON] = useState('');
  const [result, setResult] = useState<JSONResult | null>(null);
  const [indentSize, setIndentSize] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);

  const formatJSON = (json: string): JSONResult => {
    try {
      const parsed = JSON.parse(json);
      
      const formatted = JSON.stringify(
        parsed, 
        null, 
        indentSize
      );

      const keys = countKeys(parsed);
      const depth = getDepth(parsed);

      return {
        formatted,
        isValid: true,
        error: null,
        size: formatted.length,
        keys,
        depth
      };
    } catch (error) {
      return {
        formatted: '',
        isValid: false,
        error: error instanceof Error ? error.message : 'Invalid JSON',
        size: 0,
        keys: 0,
        depth: 0
      };
    }
  };

  const countKeys = (obj: any): number => {
    if (typeof obj !== 'object' || obj === null) return 0;
    
    let count = 0;
    for (const key in obj) {
      count++;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        count += countKeys(obj[key]);
      }
    }
    return count;
  };

  const getDepth = (obj: any, currentDepth = 0): number => {
    if (typeof obj !== 'object' || obj === null) return currentDepth;
    
    let maxDepth = currentDepth;
    for (const key in obj) {
      const depth = getDepth(obj[key], currentDepth + 1);
      maxDepth = Math.max(maxDepth, depth);
    }
    return maxDepth;
  };

  const handleFormat = () => {
    if (!inputJSON.trim()) {
      setResult(null);
      return;
    }
    
    const formatted = formatJSON(inputJSON);
    setResult(formatted);
  };

  const handleMinify = () => {
    if (!inputJSON.trim()) return;
    
    try {
      const parsed = JSON.parse(inputJSON);
      const minified = JSON.stringify(parsed);
      setInputJSON(minified);
    } catch (error) {
      alert('Invalid JSON. Cannot minify.');
    }
  };

  const handleValidate = () => {
    if (!inputJSON.trim()) return;
    
    try {
      JSON.parse(inputJSON);
      alert('✅ Valid JSON!');
    } catch (error) {
      alert('❌ Invalid JSON: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const downloadAsFile = () => {
    if (!result || !result.isValid) return;
    
    const blob = new Blob([result.formatted], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadExample = () => {
    const example = {
      "name": "John Doe",
      "age": 30,
      "email": "john@example.com",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "country": "USA"
      },
      "hobbies": ["reading", "swimming", "coding"],
      "isActive": true,
      "metadata": {
        "createdAt": "2023-01-01T00:00:00Z",
        "lastLogin": "2023-12-01T10:30:00Z"
      }
    };
    
    setInputJSON(JSON.stringify(example));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              JSON Formatter
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Format, validate, and beautify JSON data. Make your JSON readable with proper indentation and syntax highlighting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                JSON Input
              </h2>
              <div className="flex gap-2">
                <Button
                  onClick={loadExample}
                  variant="outline"
                  size="sm"
                >
                  Example
                </Button>
                <Button
                  onClick={handleMinify}
                  variant="outline"
                  size="sm"
                >
                  Minify
                </Button>
                <Button
                  onClick={handleValidate}
                  variant="outline"
                  size="sm"
                >
                  Validate
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter JSON to format
                </label>
                <textarea
                  value={inputJSON}
                  onChange={(e) => setInputJSON(e.target.value)}
                  placeholder='{"name": "John", "age": 30, "city": "New York"}'
                  className="w-full h-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                />
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Indent Size
                  </label>
                  <select
                    value={indentSize}
                    onChange={(e) => setIndentSize(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                    <option value={8}>8 spaces</option>
                    <option value={0}>Minified</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={sortKeys}
                      onChange={(e) => setSortKeys(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Sort keys
                    </span>
                  </label>
                </div>
              </div>

              <Button
                onClick={handleFormat}
                className="w-full"
                disabled={!inputJSON.trim()}
              >
                <Code className="w-4 h-4 mr-2" />
                Format JSON
              </Button>
            </div>
          </Card>

          {/* Output Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Formatted JSON
              </h2>
              {result && result.isValid && (
                <div className="flex gap-2">
                  <CopyButton text={result.formatted} />
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
              {result ? (
                <>
                  {/* Status */}
                  <div className={`flex items-center gap-2 p-3 rounded-lg ${
                    result.isValid 
                      ? 'bg-green-50 dark:bg-green-900/20' 
                      : 'bg-red-50 dark:bg-red-900/20'
                  }`}>
                    {result.isValid ? (
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                    <span className={`font-medium ${
                      result.isValid 
                        ? 'text-green-700 dark:text-green-300' 
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {result.isValid ? 'Valid JSON' : 'Invalid JSON'}
                    </span>
                  </div>

                  {result.error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-red-700 dark:text-red-300 text-sm">{result.error}</p>
                    </div>
                  )}

                  {result.isValid && (
                    <>
                      {/* Statistics */}
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                          <div className="font-bold text-gray-900 dark:text-white">{result.size.toLocaleString()}</div>
                          <div className="text-gray-600 dark:text-gray-400">Characters</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                          <div className="font-bold text-gray-900 dark:text-white">{result.keys}</div>
                          <div className="text-gray-600 dark:text-gray-400">Keys</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                          <div className="font-bold text-gray-900 dark:text-white">{result.depth}</div>
                          <div className="text-gray-600 dark:text-gray-400">Depth</div>
                        </div>
                      </div>

                      {/* Formatted JSON */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Formatted Output
                        </label>
                        <pre className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm overflow-x-auto max-h-64 overflow-y-auto">
                          {result.formatted}
                        </pre>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Enter JSON to format it
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* JSON Examples */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            JSON Examples
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Simple Object</h4>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com"
}`}
              </pre>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Array of Objects</h4>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`[
  {"id": 1, "name": "Alice"},
  {"id": 2, "name": "Bob"},
  {"id": 3, "name": "Charlie"}
]`}
              </pre>
            </div>
          </div>
        </Card>

        {/* Common Use Cases */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Common Use Cases
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">API Development</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Format API responses and requests for better readability and debugging.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Configuration Files</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Format JSON configuration files for applications and services.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Data Analysis</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Make large JSON datasets readable for analysis and documentation.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
