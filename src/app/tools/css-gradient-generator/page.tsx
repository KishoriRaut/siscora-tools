'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/CopyButton';
import { Palette, RefreshCw, Download, Eye } from 'lucide-react';

interface GradientStop {
  color: string;
  position: number;
}

interface GradientOptions {
  type: 'linear' | 'radial' | 'conic';
  direction: string;
  stops: GradientStop[];
  angle: number;
}

export default function CSSGradientGenerator() {
  const [options, setOptions] = useState<GradientOptions>({
    type: 'linear',
    direction: 'to right',
    stops: [
      { color: '#ff6b6b', position: 0 },
      { color: '#4ecdc4', position: 100 }
    ],
    angle: 90
  });
  const [cssCode, setCssCode] = useState('');
  const [showPreview, setShowPreview] = useState(true);

  const generateGradient = () => {
    const stops = options.stops
      .sort((a, b) => a.position - b.position)
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');

    let gradient = '';
    
    if (options.type === 'linear') {
      gradient = `linear-gradient(${options.direction}, ${stops})`;
    } else if (options.type === 'radial') {
      gradient = `radial-gradient(circle, ${stops})`;
    } else if (options.type === 'conic') {
      gradient = `conic-gradient(from ${options.angle}deg, ${stops})`;
    }

    const css = `background: ${gradient};`;
    setCssCode(css);
  };

  const addStop = () => {
    const newStop: GradientStop = {
      color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`,
      position: Math.floor(Math.random() * 100)
    };
    setOptions({
      ...options,
      stops: [...options.stops, newStop].sort((a, b) => a.position - b.position)
    });
  };

  const removeStop = (index: number) => {
    if (options.stops.length > 2) {
      const newStops = options.stops.filter((_, i) => i !== index);
      setOptions({ ...options, stops: newStops });
    }
  };

  const updateStop = (index: number, field: 'color' | 'position', value: string | number) => {
    const newStops = [...options.stops];
    newStops[index] = { ...newStops[index], [field]: value };
    setOptions({ ...options, stops: newStops });
  };

  const updateDirection = (direction: string) => {
    setOptions({ ...options, direction });
  };

  const downloadCSS = () => {
    const blob = new Blob([cssCode], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gradient.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadPreset = (preset: string) => {
    const presets: { [key: string]: GradientOptions } = {
      'sunset': {
        type: 'linear',
        direction: 'to right',
        stops: [
          { color: '#ff7e5f', position: 0 },
          { color: '#feb47b', position: 100 }
        ],
        angle: 90
      },
      'ocean': {
        type: 'linear',
        direction: 'to bottom',
        stops: [
          { color: '#667eea', position: 0 },
          { color: '#764ba2', position: 100 }
        ],
        angle: 90
      },
      'forest': {
        type: 'linear',
        direction: 'to right',
        stops: [
          { color: '#134e5e', position: 0 },
          { color: '#71b280', position: 100 }
        ],
        angle: 90
      },
      'rainbow': {
        type: 'conic',
        direction: 'to right',
        stops: [
          { color: '#ff0000', position: 0 },
          { color: '#ff8000', position: 16.66 },
          { color: '#ffff00', position: 33.33 },
          { color: '#00ff00', position: 50 },
          { color: '#0080ff', position: 66.66 },
          { color: '#8000ff', position: 83.33 },
          { color: '#ff0000', position: 100 }
        ],
        angle: 0
      }
    };

    if (presets[preset]) {
      setOptions(presets[preset]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Palette className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              CSS Gradient Generator
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Create beautiful CSS gradients with a visual editor. Generate linear, radial, and conic gradients with custom colors and stops.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Gradient Editor
            </h2>
            
            <div className="space-y-6">
              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Gradient Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setOptions({...options, type: 'linear'})}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      options.type === 'linear'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium">Linear</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Straight line</div>
                  </button>
                  <button
                    onClick={() => setOptions({...options, type: 'radial'})}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      options.type === 'radial'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium">Radial</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Circular</div>
                  </button>
                  <button
                    onClick={() => setOptions({...options, type: 'conic'})}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      options.type === 'conic'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium">Conic</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Rotating</div>
                  </button>
                </div>
              </div>

              {/* Direction (for linear) */}
              {options.type === 'linear' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Direction
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { dir: 'to top', label: '↑' },
                      { dir: 'to right', label: '→' },
                      { dir: 'to bottom', label: '↓' },
                      { dir: 'to left', label: '←' }
                    ].map(({ dir, label }) => (
                      <button
                        key={dir}
                        onClick={() => updateDirection(dir)}
                        className={`p-3 text-center rounded-lg border transition-colors ${
                          options.direction === dir
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Stops */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Color Stops
                  </label>
                  <Button
                    onClick={addStop}
                    variant="outline"
                    size="sm"
                  >
                    Add Stop
                  </Button>
                </div>
                <div className="space-y-2">
                  {options.stops.map((stop, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="color"
                        value={stop.color}
                        onChange={(e) => updateStop(index, 'color', e.target.value)}
                        className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded"
                      />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={stop.position}
                        onChange={(e) => updateStop(index, 'position', parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                        {stop.position}%
                      </span>
                      {options.stops.length > 2 && (
                        <Button
                          onClick={() => removeStop(index)}
                          variant="outline"
                          size="sm"
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Presets */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Presets
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => loadPreset('sunset')}
                    variant="outline"
                    className="text-sm"
                  >
                    Sunset
                  </Button>
                  <Button
                    onClick={() => loadPreset('ocean')}
                    variant="outline"
                    className="text-sm"
                  >
                    Ocean
                  </Button>
                  <Button
                    onClick={() => loadPreset('forest')}
                    variant="outline"
                    className="text-sm"
                  >
                    Forest
                  </Button>
                  <Button
                    onClick={() => loadPreset('rainbow')}
                    variant="outline"
                    className="text-sm"
                  >
                    Rainbow
                  </Button>
                </div>
              </div>

              <Button
                onClick={generateGradient}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate Gradient
              </Button>
            </div>
          </Card>

          {/* Preview and Code */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Preview & Code
              </h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowPreview(!showPreview)}
                  variant="outline"
                  size="sm"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  {showPreview ? 'Hide' : 'Show'} Preview
                </Button>
                {cssCode && (
                  <CopyButton text={cssCode} />
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Preview */}
              {showPreview && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preview
                  </label>
                  <div 
                    className="w-full h-32 rounded-lg border border-gray-300 dark:border-gray-600"
                    style={{
                      background: cssCode.replace('background: ', '').replace(';', '')
                    }}
                  />
                </div>
              )}

              {/* CSS Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CSS Code
                </label>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <pre className="text-sm text-gray-900 dark:text-white font-mono overflow-x-auto">
                    {cssCode || 'Click "Generate Gradient" to see the CSS code'}
                  </pre>
                </div>
              </div>

              {cssCode && (
                <div className="flex gap-2">
                  <Button
                    onClick={downloadCSS}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download CSS
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Gradient Examples */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Gradient Examples
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Linear Gradients</h4>
              <div className="space-y-2">
                <div className="h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
                <div className="h-8 bg-gradient-to-b from-green-400 to-blue-500 rounded"></div>
                <div className="h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded"></div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Radial Gradients</h4>
              <div className="space-y-2">
                <div className="h-8 bg-gradient-radial from-yellow-400 to-orange-500 rounded"></div>
                <div className="h-8 bg-gradient-radial from-blue-400 to-purple-600 rounded"></div>
                <div className="h-8 bg-gradient-radial from-green-400 to-teal-600 rounded"></div>
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
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Backgrounds</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create stunning background gradients for websites, apps, and presentations.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Buttons</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Design eye-catching buttons and interactive elements with gradient effects.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Cards</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add depth and visual interest to cards, panels, and content containers.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
