'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/CopyButton';
import { Code, ArrowRightLeft, Download, RefreshCw, ArrowLeft } from 'lucide-react';

export default function HTMLEncoderDecoder() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [operation, setOperation] = useState<'encode' | 'decode'>('encode');

  const htmlEntities: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;',
    '=': '&#61;',
    '!': '&#33;',
    '@': '&#64;',
    '#': '&#35;',
    '$': '&#36;',
    '%': '&#37;',
    '^': '&#94;',
    '*': '&#42;',
    '(': '&#40;',
    ')': '&#41;',
    '+': '&#43;',
    '[': '&#91;',
    ']': '&#93;',
    '{': '&#123;',
    '}': '&#125;',
    '|': '&#124;',
    '\\': '&#92;',
    ':': '&#58;',
    ';': '&#59;',
    '?': '&#63;',
    '/': '&#47;',
    ' ': '&nbsp;',
    '\n': '<br>',
    '\t': '&nbsp;&nbsp;&nbsp;&nbsp;'
  };

  const reverseEntities: { [key: string]: string } = Object.fromEntries(
    Object.entries(htmlEntities).map(([key, value]) => [value, key])
  );

  const encodeHTML = (text: string): string => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/`/g, '&#96;')
      .replace(/=/g, '&#61;')
      .replace(/!/g, '&#33;')
      .replace(/@/g, '&#64;')
      .replace(/#/g, '&#35;')
      .replace(/\$/g, '&#36;')
      .replace(/%/g, '&#37;')
      .replace(/\^/g, '&#94;')
      .replace(/\*/g, '&#42;')
      .replace(/\(/g, '&#40;')
      .replace(/\)/g, '&#41;')
      .replace(/\+/g, '&#43;')
      .replace(/\[/g, '&#91;')
      .replace(/\]/g, '&#93;')
      .replace(/\{/g, '&#123;')
      .replace(/\}/g, '&#125;')
      .replace(/\|/g, '&#124;')
      .replace(/\\/g, '&#92;')
      .replace(/:/g, '&#58;')
      .replace(/;/g, '&#59;')
      .replace(/\?/g, '&#63;')
      .replace(/\//g, '&#47;')
      .replace(/ /g, '&nbsp;')
      .replace(/\n/g, '<br>')
      .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  };

  const decodeHTML = (text: string): string => {
    return text
      .replace(/&nbsp;/g, ' ')
      .replace(/<br>/g, '\n')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#96;/g, '`')
      .replace(/&#61;/g, '=')
      .replace(/&#33;/g, '!')
      .replace(/&#64;/g, '@')
      .replace(/&#35;/g, '#')
      .replace(/&#36;/g, '$')
      .replace(/&#37;/g, '%')
      .replace(/&#94;/g, '^')
      .replace(/&#42;/g, '*')
      .replace(/&#40;/g, '(')
      .replace(/&#41;/g, ')')
      .replace(/&#43;/g, '+')
      .replace(/&#91;/g, '[')
      .replace(/&#93;/g, ']')
      .replace(/&#123;/g, '{')
      .replace(/&#125;/g, '}')
      .replace(/&#124;/g, '|')
      .replace(/&#92;/g, '\\')
      .replace(/&#58;/g, ':')
      .replace(/&#59;/g, ';')
      .replace(/&#63;/g, '?')
      .replace(/&#47;/g, '/')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
  };

  const handleConvert = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }
    
    const result = operation === 'encode' 
      ? encodeHTML(inputText) 
      : decodeHTML(inputText);
    
    setOutputText(result);
  };

  const handleSwap = () => {
    setInputText(outputText);
    setOutputText('');
    setOperation(operation === 'encode' ? 'decode' : 'encode');
  };

  const downloadAsFile = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `html_${operation}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadExample = () => {
    const example = operation === 'encode' 
      ? '<div class="example">Hello & welcome!</div>'
      : '&lt;div class=&quot;example&quot;&gt;Hello &amp; welcome!&lt;/div&gt;';
    setInputText(example);
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
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                HTML Encoder/Decoder
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Encode and decode HTML entities. Convert special characters to HTML entities and vice versa for safe web content.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {operation === 'encode' ? 'Text to Encode' : 'HTML to Decode'}
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
                  onClick={handleSwap}
                  variant="outline"
                  size="sm"
                >
                  <ArrowRightLeft className="w-4 h-4 mr-1" />
                  Swap
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {operation === 'encode' ? 'Enter text to encode' : 'Enter HTML entities to decode'}
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={operation === 'encode' 
                    ? 'Enter text with special characters...' 
                    : 'Enter HTML entities like &lt;div&gt;...'
                  }
                  className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setOperation('encode')}
                  className={`flex-1 p-3 text-center rounded-lg border transition-colors ${
                    operation === 'encode'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="font-medium">Encode</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Text → HTML</div>
                </button>
                <button
                  onClick={() => setOperation('decode')}
                  className={`flex-1 p-3 text-center rounded-lg border transition-colors ${
                    operation === 'decode'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="font-medium">Decode</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">HTML → Text</div>
                </button>
              </div>

              <Button
                onClick={handleConvert}
                className="w-full"
                disabled={!inputText.trim()}
              >
                <Code className="w-4 h-4 mr-2" />
                {operation === 'encode' ? 'Encode to HTML' : 'Decode from HTML'}
              </Button>
            </div>
          </Card>

          {/* Output Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {operation === 'encode' ? 'HTML Entities' : 'Decoded Text'}
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
                  {operation === 'encode' ? 'Encoded HTML' : 'Decoded Text'}
                </label>
                <textarea
                  value={outputText}
                  readOnly
                  placeholder={operation === 'encode' 
                    ? 'HTML entities will appear here...' 
                    : 'Decoded text will appear here...'
                  }
                  className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none resize-none font-mono text-sm"
                />
              </div>

              {outputText && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Characters: {outputText.length}</span>
                    <span>
                      {operation === 'encode' 
                        ? `Entities: ${(outputText.match(/&[^;]+;/g) || []).length}`
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
            HTML Entity Examples
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Common Characters</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  <div className="font-mono">&amp; → &amp;amp;</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  <div className="font-mono">&lt; → &amp;lt;</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  <div className="font-mono">&gt; → &amp;gt;</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  <div className="font-mono">" → &amp;quot;</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  <div className="font-mono">' → &amp;#39;</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Special Characters</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  <div className="font-mono">@ → &amp;#64;</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  <div className="font-mono"># → &amp;#35;</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  <div className="font-mono">$ → &amp;#36;</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  <div className="font-mono">% → &amp;#37;</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  <div className="font-mono">+ → &amp;#43;</div>
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
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Web Development</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Encode user input to prevent XSS attacks and display special characters safely.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Email Templates</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Encode HTML content for email templates to ensure proper rendering across clients.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Data Processing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Process HTML entities in data files, APIs, and content management systems.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
