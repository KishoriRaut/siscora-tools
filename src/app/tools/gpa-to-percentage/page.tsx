'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/CopyButton';
import { Calculator, GraduationCap, Percent, BookOpen, Award, ArrowLeft } from 'lucide-react';

interface ConversionResult {
  gpa: number;
  percentage: number;
  scale: string;
  grade: string;
}

export default function GPAToPercentage() {
  const [gpa, setGpa] = useState('');
  const [scale, setScale] = useState<'4.0' | '5.0' | '10.0'>('4.0');
  const [result, setResult] = useState<ConversionResult | null>(null);

  const convertGPAToPercentage = () => {
    const gpaValue = parseFloat(gpa);

    if (isNaN(gpaValue) || gpaValue < 0) {
      setResult(null);
      return;
    }

    let percentage: number;
    let grade: string;

    switch (scale) {
      case '4.0':
        percentage = (gpaValue / 4.0) * 100;
        if (gpaValue >= 3.7) grade = 'A';
        else if (gpaValue >= 3.3) grade = 'A-';
        else if (gpaValue >= 3.0) grade = 'B+';
        else if (gpaValue >= 2.7) grade = 'B';
        else if (gpaValue >= 2.3) grade = 'B-';
        else if (gpaValue >= 2.0) grade = 'C+';
        else if (gpaValue >= 1.7) grade = 'C';
        else if (gpaValue >= 1.3) grade = 'C-';
        else if (gpaValue >= 1.0) grade = 'D+';
        else if (gpaValue >= 0.7) grade = 'D';
        else grade = 'F';
        break;
      case '5.0':
        percentage = (gpaValue / 5.0) * 100;
        if (gpaValue >= 4.5) grade = 'A+';
        else if (gpaValue >= 4.0) grade = 'A';
        else if (gpaValue >= 3.5) grade = 'A-';
        else if (gpaValue >= 3.0) grade = 'B+';
        else if (gpaValue >= 2.5) grade = 'B';
        else if (gpaValue >= 2.0) grade = 'B-';
        else if (gpaValue >= 1.5) grade = 'C+';
        else if (gpaValue >= 1.0) grade = 'C';
        else if (gpaValue >= 0.5) grade = 'C-';
        else grade = 'F';
        break;
      case '10.0':
        percentage = gpaValue * 10;
        if (gpaValue >= 9.0) grade = 'A+';
        else if (gpaValue >= 8.0) grade = 'A';
        else if (gpaValue >= 7.0) grade = 'B+';
        else if (gpaValue >= 6.0) grade = 'B';
        else if (gpaValue >= 5.0) grade = 'C+';
        else if (gpaValue >= 4.0) grade = 'C';
        else if (gpaValue >= 3.0) grade = 'D';
        else grade = 'F';
        break;
      default:
        setResult(null);
        return;
    }

    setResult({
      gpa: gpaValue,
      percentage: Math.min(percentage, 100),
      scale,
      grade
    });
  };

  const clearInputs = () => {
    setGpa('');
    setResult(null);
  };

  const getScaleDescription = () => {
    switch (scale) {
      case '4.0':
        return 'Standard 4.0 scale (most common in US universities)';
      case '5.0':
        return '5.0 scale (used in some schools with weighted grades)';
      case '10.0':
        return '10.0 scale (common in some international systems)';
      default:
        return '';
    }
  };

  const getGradeDescription = (grade: string) => {
    const descriptions: { [key: string]: string } = {
      'A+': 'Excellent (90-100%)',
      'A': 'Excellent (90-100%)',
      'A-': 'Excellent (90-100%)',
      'B+': 'Good (80-89%)',
      'B': 'Good (80-89%)',
      'B-': 'Good (80-89%)',
      'C+': 'Satisfactory (70-79%)',
      'C': 'Satisfactory (70-79%)',
      'C-': 'Satisfactory (70-79%)',
      'D+': 'Passing (60-69%)',
      'D': 'Passing (60-69%)',
      'F': 'Failing (Below 60%)'
    };
    return descriptions[grade] || '';
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
                <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                GPA to Percentage Converter
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Convert your GPA to percentage based on different grading scales. Perfect for students and academic applications.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              GPA Converter
            </h2>
            
            <div className="space-y-6">
              {/* GPA Scale Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  GPA Scale
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setScale('4.0')}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      scale === '4.0'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Calculator className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs">4.0 Scale</div>
                  </button>
                  <button
                    onClick={() => setScale('5.0')}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      scale === '5.0'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Award className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs">5.0 Scale</div>
                  </button>
                  <button
                    onClick={() => setScale('10.0')}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      scale === '10.0'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs">10.0 Scale</div>
                  </button>
                </div>
              </div>

              {/* Scale Description */}
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {getScaleDescription()}
                </p>
              </div>

              {/* GPA Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  GPA Value
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max={scale === '4.0' ? '4.0' : scale === '5.0' ? '5.0' : '10.0'}
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                  placeholder={`Enter GPA (0-${scale})`}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={convertGPAToPercentage}
                  className="flex-1"
                  disabled={!gpa}
                >
                  <Calculator className="w-4 h-4" />
                  <span className="ml-2">Convert</span>
                </Button>
                <Button
                  onClick={clearInputs}
                  variant="outline"
                >
                  Clear
                </Button>
              </div>
            </div>
          </Card>

          {/* Results Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Conversion Result
              </h2>
              {result && (
                <CopyButton text={`GPA ${result.gpa} (${result.scale} scale) = ${result.percentage.toFixed(1)}% (${result.grade})`} />
              )}
            </div>
            
            <div className="space-y-4">
              {result ? (
                <div className="space-y-4">
                  {/* Main Result */}
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="font-medium text-green-700 dark:text-green-300">
                        Percentage Equivalent
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {result.percentage.toFixed(1)}%
                    </div>
                  </div>

                  {/* Grade Result */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-blue-700 dark:text-blue-300">
                        Letter Grade
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {result.grade}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      {getGradeDescription(result.grade)}
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                      Conversion Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">GPA:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {result.gpa.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Scale:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {result.scale}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Percentage:</span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {result.percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Letter Grade:</span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {result.grade}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Formula */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                      Conversion Formula
                    </h4>
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-mono">
                      {scale === '4.0' && `Percentage = (GPA / 4.0) × 100`}
                      {scale === '5.0' && `Percentage = (GPA / 5.0) × 100`}
                      {scale === '10.0' && `Percentage = GPA × 10`}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-mono mt-1">
                      {scale === '4.0' && `= (${result.gpa} / 4.0) × 100 = ${result.percentage.toFixed(1)}%`}
                      {scale === '5.0' && `= (${result.gpa} / 5.0) × 100 = ${result.percentage.toFixed(1)}%`}
                      {scale === '10.0' && `= ${result.gpa} × 10 = ${result.percentage.toFixed(1)}%`}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Enter your GPA and click "Convert" to see the percentage equivalent
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Examples */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Common GPA Conversions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">4.0 Scale</h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div>• 4.0 GPA = 100% (A+)</div>
                <div>• 3.5 GPA = 87.5% (B+)</div>
                <div>• 3.0 GPA = 75% (B)</div>
                <div>• 2.5 GPA = 62.5% (C+)</div>
                <div>• 2.0 GPA = 50% (C)</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">5.0 Scale</h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div>• 5.0 GPA = 100% (A+)</div>
                <div>• 4.0 GPA = 80% (A)</div>
                <div>• 3.5 GPA = 70% (B+)</div>
                <div>• 3.0 GPA = 60% (B)</div>
                <div>• 2.5 GPA = 50% (C+)</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">10.0 Scale</h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div>• 10.0 GPA = 100% (A+)</div>
                <div>• 8.5 GPA = 85% (A)</div>
                <div>• 7.5 GPA = 75% (B+)</div>
                <div>• 6.5 GPA = 65% (B)</div>
                <div>• 5.5 GPA = 55% (C+)</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
