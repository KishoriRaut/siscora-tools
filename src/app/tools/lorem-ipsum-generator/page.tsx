'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CopyButton } from '@/components/CopyButton';
import { FileText, RefreshCw, Hash, Type } from 'lucide-react';

const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'sed', 'ut', 'perspiciatis',
  'unde', 'omnis', 'iste', 'natus', 'error', 'sit', 'voluptatem', 'accusantium',
  'doloremque', 'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae',
  'ab', 'illo', 'inventore', 'veritatis', 'et', 'quasi', 'architecto', 'beatae',
  'vitae', 'dicta', 'sunt', 'explicabo', 'nemo', 'enim', 'ipsam', 'voluptatem',
  'quia', 'voluptas', 'aspernatur', 'aut', 'odit', 'aut', 'fugit', 'sed', 'quia',
  'consequuntur', 'magni', 'dolores', 'eos', 'qui', 'ratione', 'voluptatem',
  'sequi', 'nesciunt', 'neque', 'porro', 'quisquam', 'est', 'qui', 'dolorem',
  'ipsum', 'quia', 'dolor', 'sit', 'amet', 'consectetur', 'adipisci', 'velit',
  'sed', 'quia', 'non', 'numquam', 'eius', 'modi', 'tempora', 'incidunt', 'ut',
  'labore', 'et', 'dolore', 'magnam', 'aliquam', 'quaerat', 'voluptatem', 'ut',
  'enim', 'ad', 'minima', 'veniam', 'quis', 'nostrum', 'exercitationem', 'ullam',
  'corporis', 'suscipit', 'laboriosam', 'nisi', 'ut', 'aliquid', 'ex', 'ea',
  'commodi', 'consequatur', 'quis', 'autem', 'vel', 'eum', 'iure', 'reprehenderit',
  'qui', 'in', 'ea', 'voluptate', 'velit', 'esse', 'quam', 'nihil', 'molestiae',
  'consequatur', 'vel', 'illum', 'qui', 'dolorem', 'eum', 'fugiat', 'quo',
  'voluptas', 'nulla', 'pariatur'
];

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [words, setWords] = useState(50);
  const [sentences, setSentences] = useState(5);
  const [output, setOutput] = useState('');
  const [outputType, setOutputType] = useState<'paragraphs' | 'words' | 'sentences'>('paragraphs');

  const generateLoremIpsum = () => {
    let result = '';
    
    if (outputType === 'paragraphs') {
      for (let p = 0; p < paragraphs; p++) {
        const paragraphWords = Math.max(20, Math.floor(Math.random() * 30) + 20);
        const paragraph = generateParagraph(paragraphWords);
        result += paragraph + '\n\n';
      }
    } else if (outputType === 'words') {
      result = generateWords(words);
    } else if (outputType === 'sentences') {
      result = generateSentences(sentences);
    }
    
    setOutput(result.trim());
  };

  const generateParagraph = (wordCount: number) => {
    let paragraph = '';
    for (let i = 0; i < wordCount; i++) {
      const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)];
      paragraph += (i === 0 ? randomWord.charAt(0).toUpperCase() + randomWord.slice(1) : randomWord);
      if (i < wordCount - 1) paragraph += ' ';
    }
    return paragraph + '.';
  };

  const generateWords = (count: number) => {
    let result = '';
    for (let i = 0; i < count; i++) {
      const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)];
      result += (i === 0 ? randomWord.charAt(0).toUpperCase() + randomWord.slice(1) : randomWord);
      if (i < count - 1) result += ' ';
    }
    return result + '.';
  };

  const generateSentences = (count: number) => {
    let result = '';
    for (let i = 0; i < count; i++) {
      const sentenceLength = Math.floor(Math.random() * 15) + 8;
      const sentence = generateParagraph(sentenceLength);
      result += sentence;
      if (i < count - 1) result += ' ';
    }
    return result;
  };

  const handleGenerate = () => {
    generateLoremIpsum();
  };

  const handleTypeChange = (type: 'paragraphs' | 'words' | 'sentences') => {
    setOutputType(type);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Lorem Ipsum Generator
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Generate placeholder text for your designs, mockups, and prototypes. Choose between paragraphs, words, or sentences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Generator Options
            </h2>
            
            <div className="space-y-6">
              {/* Output Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Output Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleTypeChange('paragraphs')}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      outputType === 'paragraphs'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Type className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs">Paragraphs</div>
                  </button>
                  <button
                    onClick={() => handleTypeChange('words')}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      outputType === 'words'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Hash className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs">Words</div>
                  </button>
                  <button
                    onClick={() => handleTypeChange('sentences')}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      outputType === 'sentences'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <FileText className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs">Sentences</div>
                  </button>
                </div>
              </div>

              {/* Quantity Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {outputType === 'paragraphs' && 'Number of Paragraphs'}
                  {outputType === 'words' && 'Number of Words'}
                  {outputType === 'sentences' && 'Number of Sentences'}
                </label>
                <Input
                  type="number"
                  min="1"
                  max={outputType === 'paragraphs' ? '20' : outputType === 'words' ? '1000' : '50'}
                  value={outputType === 'paragraphs' ? paragraphs : outputType === 'words' ? words : sentences}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    if (outputType === 'paragraphs') setParagraphs(value);
                    else if (outputType === 'words') setWords(value);
                    else setSentences(value);
                  }}
                  className="w-full"
                />
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate Lorem Ipsum
              </Button>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (outputType === 'paragraphs') setParagraphs(1);
                    else if (outputType === 'words') setWords(10);
                    else setSentences(1);
                  }}
                  className="text-sm"
                >
                  Quick: 1
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (outputType === 'paragraphs') setParagraphs(5);
                    else if (outputType === 'words') setWords(100);
                    else setSentences(5);
                  }}
                  className="text-sm"
                >
                  Quick: 5/100
                </Button>
              </div>
            </div>
          </Card>

          {/* Output */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Generated Text
              </h2>
              {output && (
                <CopyButton text={output} />
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Lorem Ipsum Text
                </label>
                <textarea
                  value={output}
                  readOnly
                  placeholder="Generated text will appear here..."
                  className="w-full h-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none resize-none"
                />
              </div>

              {output && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Characters: {output.length}</span>
                    <span>Words: {output.trim() ? output.trim().split(/\s+/).length : 0}</span>
                    <span>Lines: {output.split('\n').length}</span>
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
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Web Design</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use 3-5 paragraphs for website mockups and wireframes to see how text flows in your design.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Print Design</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generate 1-2 paragraphs for brochures, flyers, and other print materials.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Development</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use 10-50 words for testing text truncation, overflow, and responsive design.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
