'use client';

import { useState, useCallback, useEffect } from 'react';
import { Calculator, ArrowLeft, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useKeyboardNavigation } from '@/lib/useKeyboardNavigation';

type Operation = '+' | '-' | '*' | '/' | '=' | 'C' | 'CE' | '±' | '%' | '.';

export default function CalculatorPage() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const inputNumber = useCallback((num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  }, [display, waitingForOperand]);

  const inputOperation = useCallback((nextOperation: Operation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation]);

  const calculate = (firstValue: number, secondValue: number, operation: Operation): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const performCalculation = useCallback(() => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      const calculation = `${previousValue} ${operation} ${inputValue} = ${newValue}`;
      
      setHistory(prev => [...prev, calculation]);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  }, [display, previousValue, operation]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const clearEntry = useCallback(() => {
    setDisplay('0');
  }, []);

  const toggleSign = useCallback(() => {
    setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
  }, [display]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const inputPercentage = useCallback(() => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  }, [display]);

  const backspace = useCallback(() => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  }, [display]);

  const handleKeyPress = useCallback((key: string) => {
    if (key >= '0' && key <= '9') {
      inputNumber(key);
    } else if (key === '.') {
      inputDecimal();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
      inputOperation(key as Operation);
    } else if (key === '=' || key === 'Enter') {
      performCalculation();
    } else if (key === 'Escape' || key === 'c') {
      clear();
    } else if (key === 'Backspace') {
      backspace();
    }
  }, [inputNumber, inputDecimal, inputOperation, performCalculation, clear, backspace]);

  // Enhanced keyboard navigation
  useKeyboardNavigation({
    onEnter: () => performCalculation(),
    onEscape: () => clear(),
    onArrowUp: () => {
      // Navigate to previous history item
      if (history.length > 0) {
        const lastHistory = history[history.length - 1];
        setDisplay(lastHistory);
      }
    },
    onArrowDown: () => {
      // Clear display
      setDisplay('0');
    }
  });

  const buttons = [
    { label: 'C', onClick: clear, className: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700' },
    { label: 'CE', onClick: clearEntry, className: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700' },
    { label: '⌫', onClick: backspace, className: 'bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700' },
    { label: '/', onClick: () => inputOperation('/'), className: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700' },
    
    { label: '7', onClick: () => inputNumber('7'), className: 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500' },
    { label: '8', onClick: () => inputNumber('8'), className: 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500' },
    { label: '9', onClick: () => inputNumber('9'), className: 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500' },
    { label: '*', onClick: () => inputOperation('*'), className: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700' },
    
    { label: '4', onClick: () => inputNumber('4'), className: 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500' },
    { label: '5', onClick: () => inputNumber('5'), className: 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500' },
    { label: '6', onClick: () => inputNumber('6'), className: 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500' },
    { label: '-', onClick: () => inputOperation('-'), className: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700' },
    
    { label: '1', onClick: () => inputNumber('1'), className: 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500' },
    { label: '2', onClick: () => inputNumber('2'), className: 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500' },
    { label: '3', onClick: () => inputNumber('3'), className: 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500' },
    { label: '+', onClick: () => inputOperation('+'), className: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700' },
    
    { label: '±', onClick: toggleSign, className: 'bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700' },
    { label: '0', onClick: () => inputNumber('0'), className: 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500' },
    { label: '.', onClick: inputDecimal, className: 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500' },
    { label: '=', onClick: performCalculation, className: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700' },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
              <Calculator className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Calculator
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced calculator with history and keyboard support
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Calculator */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Calculator
            </h2>
            
            <div className="space-y-3 sm:space-y-4">
              {/* Display */}
              <div 
                className="bg-gray-900 text-white p-3 sm:p-4 rounded-lg text-right"
                role="region"
                aria-label="Calculator display"
              >
                <div 
                  className="text-2xl sm:text-3xl font-mono min-h-[1.5rem] sm:min-h-[2rem] flex items-center justify-end break-all"
                  aria-live="polite"
                  aria-label={`Current value: ${display}`}
                >
                  {display}
                </div>
                {operation && previousValue !== null && (
                  <div className="text-xs sm:text-sm text-gray-400 mt-1" aria-label={`Previous: ${previousValue} ${operation}`}>
                    {previousValue} {operation}
                  </div>
                )}
              </div>

              {/* Buttons Grid */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {buttons.map((button, index) => (
                  <button
                    key={index}
                    onClick={button.onClick}
                    className={`p-3 sm:p-4 rounded-lg font-medium transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 touch-target ${button.className}`}
                    aria-label={`Calculator button: ${button.label}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        button.onClick();
                      }
                    }}
                  >
                    <span className="text-sm sm:text-base">{button.label}</span>
                  </button>
                ))}
              </div>

              {/* Keyboard Shortcuts */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Keyboard Shortcuts
                </h3>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <div>Numbers: 0-9</div>
                  <div>Operations: +, -, *, /</div>
                  <div>Enter or =: Calculate</div>
                  <div>Escape or C: Clear</div>
                  <div>Backspace: Delete last digit</div>
                </div>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                History
              </h2>
              {history.length > 0 && (
                <button
                  onClick={() => setHistory([])}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
            
            {history.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {history.slice().reverse().map((entry, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg font-mono text-sm"
                  >
                    {entry}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No calculations yet</p>
                <p className="text-sm">Start calculating to see history</p>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Calculator Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Basic Operations
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Addition, subtraction, multiplication, and division with decimal support
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Keyboard Support
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full keyboard support for fast calculations and number entry
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Calculation History
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Keep track of all your calculations with a scrollable history
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Error Handling
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Graceful handling of division by zero and invalid operations
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Clear Functions
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clear all (C) and clear entry (CE) for different reset options
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Sign Toggle
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Easy positive/negative number switching with the ± button
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
