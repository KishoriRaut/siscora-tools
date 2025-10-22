'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/CopyButton';
import { Binary, Type, ArrowRightLeft, Download } from 'lucide-react';

export default function TextBinaryConverter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [conversionType, setConversionType] = useState<'text-to-binary' | 'binary-to-text'>('text-to-binary');
  const [binaryFormat, setBinaryFormat] = useState<'8-bit' | '7-bit'>('8-bit');

  const textToBinary = (text: string, format: '8-bit' | '7-bit') => {
    return text
      .split('')
      .map(char => {
        const binary = char.charCodeAt(0).toString(2);
        return format === '8-bit' 
          ? binary.padStart(8, '0')
          : binary.padStart(7, '0');
      })
      .join(' ');
  };

  const binaryToText = (binary: string) => {
    try {
      return binary
        .split(' ')
        .filter(group => group.trim() !== '')
        .map(group => {
          const decimal = parseInt(group, 2);
          return String.fromCharCode(decimal);
        })
        .join('');
    } catch (error) {
      return 'Invalid binary input';
    }
  };

  const handleConvert = () => {
    if (conversionType === 'text-to-binary') {
      const result = textToBinary(inputText, binaryFormat);
      setOutputText(result);
    } else {
      const result = binaryToText(inputText);
      setOutputText(result);
    }
  };

  const handleSwap = () => {
    setInputText(outputText);
    setOutputText('');
    setConversionType(conversionType === 'text-to-binary' ? 'binary-to-text' : 'text-to-binary');
  };

  const downloadAsFile = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted_${conversionType === 'text-to-binary' ? 'binary' : 'text'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
              <Binary className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Text to Binary Converter
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Convert text to binary code and binary code back to text. Perfect for encoding messages, learning binary, and data processing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {conversionType === 'text-to-binary' ? 'Text Input' : 'Binary Input'}
              </h2>
              <Button
                onClick={handleSwap}
                variant="outline"
                size="sm"
              >
                <ArrowRightLeft className="w-4 h-4 mr-2" />
                Swap
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {conversionType === 'text-to-binary' ? 'Enter text to convert' : 'Enter binary code (space-separated)'}
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={conversionType === 'text-to-binary' 
                    ? 'Enter text to convert to binary...' 
                    : 'Enter binary code like: 01001000 01100101 01101100 01101100 01101111'
                  }
                  className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono"
                />
              </div>

              {conversionType === 'text-to-binary' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Binary Format
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setBinaryFormat('8-bit')}
                      className={`px-3 py-2 rounded-lg border transition-colors ${
                        binaryFormat === '8-bit'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      8-bit (Standard)
                    </button>
                    <button
                      onClick={() => setBinaryFormat('7-bit')}
                      className={`px-3 py-2 rounded-lg border transition-colors ${
                        binaryFormat === '7-bit'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      7-bit (ASCII)
                    </button>
                  </div>
                </div>
              )}

              <Button
                onClick={handleConvert}
                className="w-full"
                disabled={!inputText.trim()}
              >
                <Type className="w-4 h-4 mr-2" />
                Convert {conversionType === 'text-to-binary' ? 'to Binary' : 'to Text'}
              </Button>
            </div>
          </Card>

          {/* Output Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {conversionType === 'text-to-binary' ? 'Binary Output' : 'Text Output'}
              </h2>
              {outputText && (
                <div className="flex gap-2">
                  <CopyButton text={outputText} />
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
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {conversionType === 'text-to-binary' ? 'Binary Code' : 'Converted Text'}
                </label>
                <textarea
                  value={outputText}
                  readOnly
                  placeholder={conversionType === 'text-to-binary' 
                    ? 'Binary code will appear here...' 
                    : 'Converted text will appear here...'
                  }
                  className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none resize-none font-mono"
                />
              </div>

              {outputText && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Characters: {outputText.length}</span>
                    <span>
                      {conversionType === 'text-to-binary' 
                        ? `Binary Groups: ${outputText.split(' ').filter(g => g.trim()).length}`
                        : `Words: ${outputText.trim() ? outputText.trim().split(/\s+/).length : 0}`
                      }
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Examples */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Examples
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Text to Binary:</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <div className="font-medium mb-1">Input: "Hello"</div>
                  <div className="font-mono text-gray-600 dark:text-gray-400">
                    01001000 01100101 01101100 01101100 01101111
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <div className="font-medium mb-1">Input: "A"</div>
                  <div className="font-mono text-gray-600 dark:text-gray-400">
                    01000001
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Binary to Text:</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <div className="font-medium mb-1">Input: "01001000 01100101 01101100 01101100 01101111"</div>
                  <div className="font-mono text-gray-600 dark:text-gray-400">
                    Output: "Hello"
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <div className="font-medium mb-1">Input: "01000001"</div>
                  <div className="font-mono text-gray-600 dark:text-gray-400">
                    Output: "A"
                  </div>
                </div>
              </div>
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
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Education</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Learn how text is represented in binary format and understand computer encoding.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Data Processing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Convert text data for binary operations, file formats, and data transmission.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Encoding</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Encode messages, create binary puzzles, and work with low-level data formats.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
