'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CopyButton } from '@/components/CopyButton';
import { Type, ArrowUpDown, ArrowLeft } from 'lucide-react';

const caseTypes = [
  { name: 'UPPERCASE', value: 'uppercase', description: 'ALL CAPS' },
  { name: 'lowercase', value: 'lowercase', description: 'all small' },
  { name: 'Title Case', value: 'title', description: 'First Letter Capital' },
  { name: 'camelCase', value: 'camel', description: 'noSpacesFirstSmall' },
  { name: 'PascalCase', value: 'pascal', description: 'NoSpacesFirstCapital' },
  { name: 'snake_case', value: 'snake', description: 'underscore_separated' },
  { name: 'kebab-case', value: 'kebab', description: 'dash-separated' },
  { name: 'CONSTANT_CASE', value: 'constant', description: 'UPPER_SNAKE_CASE' }
];

export default function TextCaseConverter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedCase, setSelectedCase] = useState('uppercase');

  const convertCase = (text: string, caseType: string) => {
    if (!text.trim()) return '';

    switch (caseType) {
      case 'uppercase':
        return text.toUpperCase();
      case 'lowercase':
        return text.toLowerCase();
      case 'title':
        return text.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
      case 'camel':
        return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        ).replace(/\s+/g, '');
      case 'pascal':
        return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => 
          word.toUpperCase()
        ).replace(/\s+/g, '');
      case 'snake':
        return text.replace(/\W+/g, ' ')
          .split(/ |\B(?=[A-Z])/)
          .map(word => word.toLowerCase())
          .join('_');
      case 'kebab':
        return text.replace(/\W+/g, ' ')
          .split(/ |\B(?=[A-Z])/)
          .map(word => word.toLowerCase())
          .join('-');
      case 'constant':
        return text.replace(/\W+/g, ' ')
          .split(/ |\B(?=[A-Z])/)
          .map(word => word.toUpperCase())
          .join('_');
      default:
        return text;
    }
  };

  const handleConvert = () => {
    const converted = convertCase(inputText, selectedCase);
    setOutputText(converted);
  };

  const handleCaseSelect = (caseType: string) => {
    setSelectedCase(caseType);
    const converted = convertCase(inputText, caseType);
    setOutputText(converted);
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
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Type className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Text Case Converter
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Convert text between different cases: uppercase, lowercase, camelCase, PascalCase, snake_case, kebab-case, and more.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Input Text
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter your text
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter text to convert..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Choose case type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {caseTypes.map((caseType) => (
                    <button
                      key={caseType.value}
                      onClick={() => handleCaseSelect(caseType.value)}
                      className={`p-3 text-left rounded-lg border transition-colors ${
                        selectedCase === caseType.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="font-medium text-sm">{caseType.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {caseType.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleConvert}
                className="w-full"
                disabled={!inputText.trim()}
              >
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Convert Text
              </Button>
            </div>
          </Card>

          {/* Output Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Converted Text
              </h2>
              {outputText && (
                <CopyButton text={outputText} />
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Result
                </label>
                <textarea
                  value={outputText}
                  readOnly
                  placeholder="Converted text will appear here..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none resize-none"
                />
              </div>

              {outputText && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Characters: {outputText.length}</span>
                    <span>Words: {outputText.trim() ? outputText.trim().split(/\s+/).length : 0}</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Input:</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                "hello world example"
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Outputs:</h4>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <div><strong>UPPERCASE:</strong> HELLO WORLD EXAMPLE</div>
                <div><strong>lowercase:</strong> hello world example</div>
                <div><strong>Title Case:</strong> Hello World Example</div>
                <div><strong>camelCase:</strong> helloWorldExample</div>
                <div><strong>PascalCase:</strong> HelloWorldExample</div>
                <div><strong>snake_case:</strong> hello_world_example</div>
                <div><strong>kebab-case:</strong> hello-world-example</div>
                <div><strong>CONSTANT_CASE:</strong> HELLO_WORLD_EXAMPLE</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
