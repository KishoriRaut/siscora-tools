'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/CopyButton';
import { Hash, BarChart3, FileText, Type } from 'lucide-react';

interface StringStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  lines: number;
  sentences: number;
  paragraphs: number;
  bytes: number;
  readingTime: number;
}

export default function StringLengthCalculator() {
  const [inputText, setInputText] = useState('');
  const [stats, setStats] = useState<StringStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    lines: 0,
    sentences: 0,
    paragraphs: 0,
    bytes: 0,
    readingTime: 0
  });

  const calculateStats = (text: string): StringStats => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split('\n').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;
    const bytes = new Blob([text]).size;
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute

    return {
      characters,
      charactersNoSpaces,
      words,
      lines,
      sentences,
      paragraphs,
      bytes,
      readingTime
    };
  };

  const handleCalculate = () => {
    const newStats = calculateStats(inputText);
    setStats(newStats);
  };

  const handleTextChange = (text: string) => {
    setInputText(text);
    const newStats = calculateStats(text);
    setStats(newStats);
  };

  const clearText = () => {
    setInputText('');
    setStats({
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      lines: 0,
      sentences: 0,
      paragraphs: 0,
      bytes: 0,
      readingTime: 0
    });
  };

  const getStatsSummary = () => {
    return `Characters: ${stats.characters} | Words: ${stats.words} | Lines: ${stats.lines} | Reading Time: ${stats.readingTime} min`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <Hash className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              String Length Calculator
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Analyze your text with detailed statistics including character count, word count, reading time, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Text Input
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter your text
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder="Enter text to analyze..."
                  className="w-full h-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleCalculate}
                  className="flex-1"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Calculate Stats
                </Button>
                <Button
                  onClick={clearText}
                  variant="outline"
                >
                  Clear
                </Button>
              </div>
            </div>
          </Card>

          {/* Statistics */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Statistics
              </h2>
              {inputText && (
                <CopyButton text={getStatsSummary()} />
              )}
            </div>
            
            <div className="space-y-4">
              {/* Main Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Type className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Characters</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.characters.toLocaleString()}
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">Words</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {stats.words.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Characters (no spaces)</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {stats.charactersNoSpaces.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Lines</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {stats.lines.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sentences</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {stats.sentences.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Paragraphs</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {stats.paragraphs.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Bytes</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {stats.bytes.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Reading Time</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {stats.readingTime} min
                  </span>
                </div>
              </div>

              {/* Analysis */}
              {inputText && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Analysis</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {stats.words > 0 && (
                      <div>Average words per sentence: {(stats.words / stats.sentences).toFixed(1)}</div>
                    )}
                    {stats.characters > 0 && (
                      <div>Average characters per word: {(stats.characters / stats.words).toFixed(1)}</div>
                    )}
                    {stats.words > 0 && (
                      <div>Average words per paragraph: {(stats.words / stats.paragraphs).toFixed(1)}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Examples */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Common Use Cases
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Social Media</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Check character limits for Twitter (280), Instagram captions, LinkedIn posts, and other platforms.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Content Writing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track word count for articles, blog posts, essays, and other written content.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">SEO & Marketing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Optimize meta descriptions, titles, and content length for better search rankings.
              </p>
            </div>
          </div>
        </Card>

        {/* Character Limits Reference */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Popular Character Limits
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="font-bold text-blue-600 dark:text-blue-400">280</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Twitter</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="font-bold text-pink-600 dark:text-pink-400">2,200</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Instagram</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="font-bold text-blue-700 dark:text-blue-300">3,000</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">LinkedIn</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="font-bold text-green-600 dark:text-green-400">160</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">SMS</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
