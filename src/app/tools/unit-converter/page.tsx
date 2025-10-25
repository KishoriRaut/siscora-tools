'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/CopyButton';
import { ArrowRightLeft, Ruler, Weight, Thermometer, Clock, Volume, ArrowLeft } from 'lucide-react';

interface ConversionCategory {
  name: string;
  icon: React.ReactNode;
  units: {
    [key: string]: {
      name: string;
      factor: number;
      symbol: string;
    };
  };
}

const conversionCategories: { [key: string]: ConversionCategory } = {
  length: {
    name: 'Length',
    icon: <Ruler className="w-5 h-5" />,
    units: {
      'mm': { name: 'Millimeter', factor: 0.001, symbol: 'mm' },
      'cm': { name: 'Centimeter', factor: 0.01, symbol: 'cm' },
      'm': { name: 'Meter', factor: 1, symbol: 'm' },
      'km': { name: 'Kilometer', factor: 1000, symbol: 'km' },
      'in': { name: 'Inch', factor: 0.0254, symbol: 'in' },
      'ft': { name: 'Foot', factor: 0.3048, symbol: 'ft' },
      'yd': { name: 'Yard', factor: 0.9144, symbol: 'yd' },
      'mi': { name: 'Mile', factor: 1609.344, symbol: 'mi' }
    }
  },
  weight: {
    name: 'Weight',
    icon: <Weight className="w-5 h-5" />,
    units: {
      'mg': { name: 'Milligram', factor: 0.001, symbol: 'mg' },
      'g': { name: 'Gram', factor: 1, symbol: 'g' },
      'kg': { name: 'Kilogram', factor: 1000, symbol: 'kg' },
      'oz': { name: 'Ounce', factor: 28.3495, symbol: 'oz' },
      'lb': { name: 'Pound', factor: 453.592, symbol: 'lb' },
      'ton': { name: 'Metric Ton', factor: 1000000, symbol: 't' }
    }
  },
  temperature: {
    name: 'Temperature',
    icon: <Thermometer className="w-5 h-5" />,
    units: {
      'c': { name: 'Celsius', factor: 1, symbol: '°C' },
      'f': { name: 'Fahrenheit', factor: 1, symbol: '°F' },
      'k': { name: 'Kelvin', factor: 1, symbol: 'K' }
    }
  },
  time: {
    name: 'Time',
    icon: <Clock className="w-5 h-5" />,
    units: {
      'ms': { name: 'Millisecond', factor: 0.001, symbol: 'ms' },
      's': { name: 'Second', factor: 1, symbol: 's' },
      'min': { name: 'Minute', factor: 60, symbol: 'min' },
      'h': { name: 'Hour', factor: 3600, symbol: 'h' },
      'd': { name: 'Day', factor: 86400, symbol: 'd' },
      'wk': { name: 'Week', factor: 604800, symbol: 'wk' },
      'mo': { name: 'Month', factor: 2629746, symbol: 'mo' },
      'yr': { name: 'Year', factor: 31556952, symbol: 'yr' }
    }
  },
  volume: {
    name: 'Volume',
    icon: <Volume className="w-5 h-5" />,
    units: {
      'ml': { name: 'Milliliter', factor: 0.001, symbol: 'ml' },
      'l': { name: 'Liter', factor: 1, symbol: 'l' },
      'fl_oz': { name: 'Fluid Ounce', factor: 0.0295735, symbol: 'fl oz' },
      'cup': { name: 'Cup', factor: 0.236588, symbol: 'cup' },
      'pt': { name: 'Pint', factor: 0.473176, symbol: 'pt' },
      'qt': { name: 'Quart', factor: 0.946353, symbol: 'qt' },
      'gal': { name: 'Gallon', factor: 3.78541, symbol: 'gal' }
    }
  }
};

export default function UnitConverter() {
  const [selectedCategory, setSelectedCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const convertTemperature = (value: number, from: string, to: string): number => {
    // Convert to Celsius first
    let celsius: number;
    if (from === 'c') celsius = value;
    else if (from === 'f') celsius = (value - 32) * 5 / 9;
    else if (from === 'k') celsius = value - 273.15;
    else celsius = value;

    // Convert from Celsius to target
    if (to === 'c') return celsius;
    else if (to === 'f') return celsius * 9 / 5 + 32;
    else if (to === 'k') return celsius + 273.15;
    else return celsius;
  };

  const convert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult(null);
      return;
    }

    const category = conversionCategories[selectedCategory];
    const fromUnitData = category.units[fromUnit];
    const toUnitData = category.units[toUnit];

    if (!fromUnitData || !toUnitData) {
      setResult(null);
      return;
    }

    let convertedValue: number;

    if (selectedCategory === 'temperature') {
      convertedValue = convertTemperature(value, fromUnit, toUnit);
    } else {
      // Convert to base unit first, then to target unit
      const baseValue = value * fromUnitData.factor;
      convertedValue = baseValue / toUnitData.factor;
    }

    setResult(convertedValue);
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const getResultText = () => {
    if (result === null) return '';
    const category = conversionCategories[selectedCategory];
    const toUnitData = category.units[toUnit];
    return `${inputValue} ${category.units[fromUnit].symbol} = ${result.toFixed(6)} ${toUnitData.symbol}`;
  };

  const loadExample = () => {
    const examples: { [key: string]: { value: string; from: string; to: string } } = {
      length: { value: '100', from: 'm', to: 'ft' },
      weight: { value: '70', from: 'kg', to: 'lb' },
      temperature: { value: '25', from: 'c', to: 'f' },
      time: { value: '1', from: 'h', to: 'min' },
      volume: { value: '1', from: 'l', to: 'gal' }
    };

    const example = examples[selectedCategory];
    if (example) {
      setInputValue(example.value);
      setFromUnit(example.from);
      setToUnit(example.to);
    }
  };

  const category = conversionCategories[selectedCategory];

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
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <ArrowRightLeft className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Unit Converter
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Convert between different units of measurement. Support for length, weight, temperature, time, and volume conversions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Section */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Converter
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {Object.entries(conversionCategories).map(([key, cat]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`p-3 sm:p-4 text-center rounded-lg border transition-colors touch-target ${
                        selectedCategory === key
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                        <span className="text-lg sm:text-xl">{cat.icon}</span>
                        <span className="text-xs sm:text-sm font-medium">{cat.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Value to Convert
                </label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Unit Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    From
                  </label>
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label="From unit"
                  >
                    {Object.entries(category.units).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name} ({unit.symbol})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    To
                  </label>
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label="To unit"
                  >
                    {Object.entries(category.units).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name} ({unit.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={convert}
                  className="flex-1"
                  disabled={!inputValue}
                >
                  <ArrowRightLeft className="w-4 h-4 mr-2" />
                  Convert
                </Button>
                <Button
                  onClick={swapUnits}
                  variant="outline"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={loadExample}
                  variant="outline"
                >
                  Example
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
              {result !== null && (
                <CopyButton text={getResultText()} />
              )}
            </div>
            
            <div className="space-y-4">
              {result !== null ? (
                <div className="space-y-4">
                  {/* Main Result */}
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {result.toFixed(6)}
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      {category.units[toUnit].name} ({category.units[toUnit].symbol})
                    </div>
                  </div>

                  {/* Conversion Details */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                      Conversion Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">From:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {inputValue} {category.units[fromUnit].symbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">To:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {result.toFixed(6)} {category.units[toUnit].symbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Category:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {category.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Formula Info */}
                  {selectedCategory !== 'temperature' && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                        Conversion Factor
                      </h4>
                      <div className="text-sm text-blue-600 dark:text-blue-400">
                        1 {category.units[fromUnit].symbol} = {(category.units[fromUnit].factor / category.units[toUnit].factor).toFixed(6)} {category.units[toUnit].symbol}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Enter a value and click "Convert" to see the result
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Conversion Examples */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Common Conversions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Length</h4>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <div>• 1 meter = 3.28 feet</div>
                <div>• 1 kilometer = 0.62 miles</div>
                <div>• 1 inch = 2.54 centimeters</div>
                <div>• 1 yard = 0.91 meters</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Weight</h4>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <div>• 1 kilogram = 2.20 pounds</div>
                <div>• 1 pound = 0.45 kilograms</div>
                <div>• 1 ounce = 28.35 grams</div>
                <div>• 1 ton = 1000 kilograms</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Temperature</h4>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <div>• 0°C = 32°F (freezing point)</div>
                <div>• 100°C = 212°F (boiling point)</div>
                <div>• 20°C = 68°F (room temperature)</div>
                <div>• 37°C = 98.6°F (body temperature)</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Volume</h4>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <div>• 1 liter = 0.26 gallons</div>
                <div>• 1 gallon = 3.79 liters</div>
                <div>• 1 cup = 0.24 liters</div>
                <div>• 1 fluid ounce = 29.57 milliliters</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
