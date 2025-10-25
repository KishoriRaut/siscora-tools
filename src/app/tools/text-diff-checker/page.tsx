'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/CopyButton';
import { FileText, ArrowRightLeft, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

interface DiffResult {
  type: 'added' | 'removed' | 'unchanged';
  content: string;
}

export default function TextDiffChecker() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffResult, setDiffResult] = useState<DiffResult[]>([]);
  const [showDiff, setShowDiff] = useState(false);

  const calculateDiff = (str1: string, str2: string): DiffResult[] => {
    const lines1 = str1.split('\n');
    const lines2 = str2.split('\n');
    const result: DiffResult[] = [];
    
    const maxLines = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';
      
      if (line1 === line2) {
        result.push({ type: 'unchanged', content: line1 });
      } else {
        if (line1) {
          result.push({ type: 'removed', content: line1 });
        }
        if (line2) {
          result.push({ type: 'added', content: line2 });
        }
      }
    }
    
    return result;
  };

  const handleCompare = () => {
    if (!text1.trim() && !text2.trim()) {
      setShowDiff(false);
      return;
    }
    
    const diff = calculateDiff(text1, text2);
    setDiffResult(diff);
    setShowDiff(true);
  };

  const getStats = () => {
    const added = diffResult.filter(item => item.type === 'added').length;
    const removed = diffResult.filter(item => item.type === 'removed').length;
    const unchanged = diffResult.filter(item => item.type === 'unchanged').length;
    
    return { added, removed, unchanged };
  };

  const stats = showDiff ? getStats() : { added: 0, removed: 0, unchanged: 0 };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Text Diff Checker
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Compare two texts and see the differences side by side. Perfect for tracking changes, reviewing edits, and finding discrepancies.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Text 1 */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Text 1
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Original Text
                </label>
                <textarea
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  placeholder="Enter first text to compare..."
                  className="w-full h-40 sm:h-48 px-3 py-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base"
                />
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Characters: {text1.length} | Lines: {text1.split('\n').length}
              </div>
            </div>
          </Card>

          {/* Text 2 */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Text 2
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Modified Text
                </label>
                <textarea
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  placeholder="Enter second text to compare..."
                  className="w-full h-40 sm:h-48 px-3 py-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base"
                />
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Characters: {text2.length} | Lines: {text2.split('\n').length}
              </div>
            </div>
          </Card>
        </div>

        {/* Compare Button */}
        <div className="text-center mb-8">
          <Button
            onClick={handleCompare}
            className="px-8 py-3"
            disabled={!text1.trim() && !text2.trim()}
          >
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Compare Texts
          </Button>
        </div>

        {/* Results */}
        {showDiff && (
          <div className="space-y-6">
            {/* Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Comparison Statistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <XCircle className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.removed}</div>
                  <div className="text-sm text-red-600 dark:text-red-400">Lines Removed</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.added}</div>
                  <div className="text-sm text-green-600 dark:text-green-400">Lines Added</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <FileText className="w-8 h-8 text-gray-600 dark:text-gray-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{stats.unchanged}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Lines Unchanged</div>
                </div>
              </div>
            </Card>

            {/* Diff Display */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Differences
                </h3>
                <CopyButton text={diffResult.map(item => item.content).join('\n')} />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-96 overflow-y-auto">
                {diffResult.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No differences found. Both texts are identical.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {diffResult.map((item, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded text-sm font-mono ${
                          item.type === 'added'
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-l-4 border-green-500'
                            : item.type === 'removed'
                            ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-l-4 border-red-500'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="inline-block w-8 text-xs opacity-70">
                          {item.type === 'added' ? '+' : item.type === 'removed' ? '-' : '='}
                        </span>
                        {item.content || '(empty line)'}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Examples */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            How to Use
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Text 1 (Original):</h4>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
                Hello World!<br/>
                This is a sample text.<br/>
                It has multiple lines.
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Text 2 (Modified):</h4>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
                Hello World!<br/>
                This is a modified text.<br/>
                It has multiple lines.<br/>
                And a new line added.
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Result:</h4>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
              <div className="text-gray-700 dark:text-gray-300">= Hello World!</div>
              <div className="text-red-600 dark:text-red-400">- This is a sample text.</div>
              <div className="text-green-600 dark:text-green-400">+ This is a modified text.</div>
              <div className="text-gray-700 dark:text-gray-300">= It has multiple lines.</div>
              <div className="text-green-600 dark:text-green-400">+ And a new line added.</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
