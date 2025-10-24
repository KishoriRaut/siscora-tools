'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/CopyButton';
import { Calculator, Percent, TrendingUp, TrendingDown, DollarSign, ArrowLeft } from 'lucide-react';

interface CalculationResult {
  original: number;
  percentage: number;
  result: number;
  type: string;
}

export default function PercentageCalculator() {
  const [calculationType, setCalculationType] = useState<'percentage-of' | 'percentage-change' | 'percentage-increase' | 'percentage-decrease' | 'tip-calculator' | 'discount-calculator'>('percentage-of');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculatePercentage = () => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (isNaN(num1) || isNaN(num2)) {
      setResult(null);
      return;
    }

    let calculation: CalculationResult;

    switch (calculationType) {
      case 'percentage-of':
        calculation = {
          original: num1,
          percentage: num2,
          result: (num1 * num2) / 100,
          type: 'Percentage of'
        };
        break;
      case 'percentage-change':
        calculation = {
          original: num1,
          percentage: ((num2 - num1) / num1) * 100,
          result: num2,
          type: 'Percentage Change'
        };
        break;
      case 'percentage-increase':
        calculation = {
          original: num1,
          percentage: num2,
          result: num1 + (num1 * num2 / 100),
          type: 'Percentage Increase'
        };
        break;
      case 'percentage-decrease':
        calculation = {
          original: num1,
          percentage: num2,
          result: num1 - (num1 * num2 / 100),
          type: 'Percentage Decrease'
        };
        break;
      case 'tip-calculator':
        const tipAmount = (num1 * num2) / 100;
        calculation = {
          original: num1,
          percentage: num2,
          result: num1 + tipAmount,
          type: 'Total with Tip'
        };
        break;
      case 'discount-calculator':
        const discountAmount = (num1 * num2) / 100;
        calculation = {
          original: num1,
          percentage: num2,
          result: num1 - discountAmount,
          type: 'Price after Discount'
        };
        break;
      default:
        setResult(null);
        return;
    }

    setResult(calculation);
  };

  const getCalculationDescription = () => {
    switch (calculationType) {
      case 'percentage-of':
        return 'Calculate what percentage one number is of another';
      case 'percentage-change':
        return 'Calculate the percentage change between two values';
      case 'percentage-increase':
        return 'Calculate the result after increasing a number by a percentage';
      case 'percentage-decrease':
        return 'Calculate the result after decreasing a number by a percentage';
      case 'tip-calculator':
        return 'Calculate the total amount including tip';
      case 'discount-calculator':
        return 'Calculate the final price after applying a discount';
      default:
        return '';
    }
  };

  const getInputLabels = () => {
    switch (calculationType) {
      case 'percentage-of':
        return { label1: 'Number', label2: 'Percentage' };
      case 'percentage-change':
        return { label1: 'Original Value', label2: 'New Value' };
      case 'percentage-increase':
        return { label1: 'Original Number', label2: 'Increase Percentage' };
      case 'percentage-decrease':
        return { label1: 'Original Number', label2: 'Decrease Percentage' };
      case 'tip-calculator':
        return { label1: 'Bill Amount', label2: 'Tip Percentage' };
      case 'discount-calculator':
        return { label1: 'Original Price', label2: 'Discount Percentage' };
      default:
        return { label1: 'Value 1', label2: 'Value 2' };
    }
  };

  const getResultText = () => {
    if (!result) return '';
    
    switch (calculationType) {
      case 'percentage-of':
        return `${result.percentage}% of ${result.original} = ${result.result.toFixed(2)}`;
      case 'percentage-change':
        return `Change from ${result.original} to ${result.result} = ${result.percentage.toFixed(2)}%`;
      case 'percentage-increase':
        return `${result.original} increased by ${result.percentage}% = ${result.result.toFixed(2)}`;
      case 'percentage-decrease':
        return `${result.original} decreased by ${result.percentage}% = ${result.result.toFixed(2)}`;
      case 'tip-calculator':
        return `Bill: $${result.original}, Tip: ${result.percentage}%, Total: $${result.result.toFixed(2)}`;
      case 'discount-calculator':
        return `Original: $${result.original}, Discount: ${result.percentage}%, Final: $${result.result.toFixed(2)}`;
      default:
        return '';
    }
  };

  const clearInputs = () => {
    setValue1('');
    setValue2('');
    setResult(null);
  };

  const getIcon = () => {
    switch (calculationType) {
      case 'tip-calculator':
        return <DollarSign className="w-5 h-5" />;
      case 'discount-calculator':
        return <TrendingDown className="w-5 h-5" />;
      case 'percentage-increase':
        return <TrendingUp className="w-5 h-5" />;
      case 'percentage-decrease':
        return <TrendingDown className="w-5 h-5" />;
      default:
        return <Percent className="w-5 h-5" />;
    }
  };

  const labels = getInputLabels();

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
                <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Percentage Calculator
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Calculate percentages, tips, discounts, and percentage changes. Perfect for financial calculations and everyday math.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Calculator
            </h2>
            
            <div className="space-y-6">
              {/* Calculation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Calculation Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCalculationType('percentage-of')}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      calculationType === 'percentage-of'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Percent className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs">% of</div>
                  </button>
                  <button
                    onClick={() => setCalculationType('percentage-change')}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      calculationType === 'percentage-change'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs">% Change</div>
                  </button>
                  <button
                    onClick={() => setCalculationType('percentage-increase')}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      calculationType === 'percentage-increase'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs">% Increase</div>
                  </button>
                  <button
                    onClick={() => setCalculationType('percentage-decrease')}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      calculationType === 'percentage-decrease'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <TrendingDown className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs">% Decrease</div>
                  </button>
                  <button
                    onClick={() => setCalculationType('tip-calculator')}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      calculationType === 'tip-calculator'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <DollarSign className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs">Tip</div>
                  </button>
                  <button
                    onClick={() => setCalculationType('discount-calculator')}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      calculationType === 'discount-calculator'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <TrendingDown className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs">Discount</div>
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {getCalculationDescription()}
                </p>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {labels.label1}
                  </label>
                  <input
                    type="number"
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                    placeholder="Enter first value"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {labels.label2}
                  </label>
                  <input
                    type="number"
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                    placeholder="Enter second value"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={calculatePercentage}
                  className="flex-1"
                  disabled={!value1 || !value2}
                >
                  {getIcon()}
                  <span className="ml-2">Calculate</span>
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
                Result
              </h2>
              {result && (
                <CopyButton text={getResultText()} />
              )}
            </div>
            
            <div className="space-y-4">
              {result ? (
                <div className="space-y-4">
                  {/* Main Result */}
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="font-medium text-green-700 dark:text-green-300">
                        {result.type}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {result.result.toFixed(2)}
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                      Calculation Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Original Value:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {result.original.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Percentage:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {result.percentage.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                        <span className="text-gray-600 dark:text-gray-400">Result:</span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {result.result.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Formula */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                      Formula
                    </h4>
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-mono">
                      {calculationType === 'percentage-of' && `${result.original} × ${result.percentage}% = ${result.result.toFixed(2)}`}
                      {calculationType === 'percentage-change' && `((${result.result} - ${result.original}) / ${result.original}) × 100 = ${result.percentage.toFixed(2)}%`}
                      {calculationType === 'percentage-increase' && `${result.original} + (${result.original} × ${result.percentage}%) = ${result.result.toFixed(2)}`}
                      {calculationType === 'percentage-decrease' && `${result.original} - (${result.original} × ${result.percentage}%) = ${result.result.toFixed(2)}`}
                      {calculationType === 'tip-calculator' && `$${result.original} + ($${result.original} × ${result.percentage}%) = $${result.result.toFixed(2)}`}
                      {calculationType === 'discount-calculator' && `$${result.original} - ($${result.original} × ${result.percentage}%) = $${result.result.toFixed(2)}`}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Enter values and click "Calculate" to see the result
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Examples */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Common Examples
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Percentage Calculations</h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div>• 25% of 200 = 50</div>
                <div>• 15% tip on $50 bill = $57.50 total</div>
                <div>• 20% discount on $100 = $80 final price</div>
                <div>• 10% increase of 100 = 110</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Real-world Applications</h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div>• Sales tax calculations</div>
                <div>• Investment returns</div>
                <div>• Salary increases</div>
                <div>• Price comparisons</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
