'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/CopyButton';
import { Palette, RefreshCw, Download, Settings } from 'lucide-react';

interface Color {
  hex: string;
  rgb: string;
  hsl: string;
  name: string;
}

interface PaletteOptions {
  type: 'monochromatic' | 'complementary' | 'triadic' | 'analogous' | 'random';
  count: number;
  saturation: number;
  lightness: number;
}

export default function ColorPaletteGenerator() {
  const [options, setOptions] = useState<PaletteOptions>({
    type: 'complementary',
    count: 5,
    saturation: 70,
    lightness: 50
  });
  const [palette, setPalette] = useState<Color[]>([]);

  const generateRandomColor = (): Color => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = options.saturation;
    const lightness = options.lightness;
    
    const hsl = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    const hex = hslToHex(hue, saturation, lightness);
    const rgb = hexToRgb(hex);
    
    return {
      hex,
      rgb,
      hsl,
      name: getColorName(hex)
    };
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const hexToRgb = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const getColorName = (hex: string): string => {
    const colorNames: { [key: string]: string } = {
      '#FF0000': 'Red',
      '#00FF00': 'Green',
      '#0000FF': 'Blue',
      '#FFFF00': 'Yellow',
      '#FF00FF': 'Magenta',
      '#00FFFF': 'Cyan',
      '#000000': 'Black',
      '#FFFFFF': 'White',
      '#808080': 'Gray',
      '#FFA500': 'Orange',
      '#800080': 'Purple',
      '#008000': 'Lime',
      '#FFC0CB': 'Pink',
      '#A52A2A': 'Brown'
    };
    
    return colorNames[hex.toUpperCase()] || 'Custom';
  };

  const generateMonochromatic = (baseHue: number): Color[] => {
    const colors: Color[] = [];
    for (let i = 0; i < options.count; i++) {
      const lightness = 20 + (i * 60) / (options.count - 1);
      const hsl = `hsl(${baseHue}, ${options.saturation}%, ${lightness}%)`;
      const hex = hslToHex(baseHue, options.saturation, lightness);
      const rgb = hexToRgb(hex);
      
      colors.push({
        hex,
        rgb,
        hsl,
        name: getColorName(hex)
      });
    }
    return colors;
  };

  const generateComplementary = (baseHue: number): Color[] => {
    const colors: Color[] = [];
    const complementaryHue = (baseHue + 180) % 360;
    
    for (let i = 0; i < options.count; i++) {
      const hue = i % 2 === 0 ? baseHue : complementaryHue;
      const lightness = 30 + (Math.floor(i / 2) * 40) / Math.floor(options.count / 2);
      const hsl = `hsl(${hue}, ${options.saturation}%, ${lightness}%)`;
      const hex = hslToHex(hue, options.saturation, lightness);
      const rgb = hexToRgb(hex);
      
      colors.push({
        hex,
        rgb,
        hsl,
        name: getColorName(hex)
      });
    }
    return colors;
  };

  const generateTriadic = (baseHue: number): Color[] => {
    const colors: Color[] = [];
    const hues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360];
    
    for (let i = 0; i < options.count; i++) {
      const hue = hues[i % hues.length];
      const lightness = 30 + (Math.floor(i / hues.length) * 40) / Math.floor(options.count / hues.length);
      const hsl = `hsl(${hue}, ${options.saturation}%, ${lightness}%)`;
      const hex = hslToHex(hue, options.saturation, lightness);
      const rgb = hexToRgb(hex);
      
      colors.push({
        hex,
        rgb,
        hsl,
        name: getColorName(hex)
      });
    }
    return colors;
  };

  const generateAnalogous = (baseHue: number): Color[] => {
    const colors: Color[] = [];
    const step = 30;
    
    for (let i = 0; i < options.count; i++) {
      const hue = (baseHue + i * step) % 360;
      const lightness = 40 + (i * 20) / (options.count - 1);
      const hsl = `hsl(${hue}, ${options.saturation}%, ${lightness}%)`;
      const hex = hslToHex(hue, options.saturation, lightness);
      const rgb = hexToRgb(hex);
      
      colors.push({
        hex,
        rgb,
        hsl,
        name: getColorName(hex)
      });
    }
    return colors;
  };

  const generateRandom = (): Color[] => {
    const colors: Color[] = [];
    for (let i = 0; i < options.count; i++) {
      colors.push(generateRandomColor());
    }
    return colors;
  };

  const generatePalette = () => {
    const baseHue = Math.floor(Math.random() * 360);
    let colors: Color[] = [];
    
    switch (options.type) {
      case 'monochromatic':
        colors = generateMonochromatic(baseHue);
        break;
      case 'complementary':
        colors = generateComplementary(baseHue);
        break;
      case 'triadic':
        colors = generateTriadic(baseHue);
        break;
      case 'analogous':
        colors = generateAnalogous(baseHue);
        break;
      case 'random':
        colors = generateRandom();
        break;
    }
    
    setPalette(colors);
  };

  const downloadPalette = () => {
    const css = palette.map(color => 
      `/* ${color.name} */\n.${color.name.toLowerCase().replace(/\s+/g, '-')} {\n  color: ${color.hex};\n  background-color: ${color.hex};\n}`
    ).join('\n\n');
    
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-palette.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getPaletteInfo = () => {
    return palette.map(color => 
      `${color.name}: ${color.hex} (${color.rgb})`
    ).join('\n');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center">
              <Palette className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Color Palette Generator
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Generate beautiful color palettes for your designs. Choose from different color harmony types and customize the results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Options */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Palette Options
            </h2>
            
            <div className="space-y-6">
              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Color Harmony Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOptions({...options, type: 'monochromatic'})}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      options.type === 'monochromatic'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium">Monochromatic</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Same hue</div>
                  </button>
                  <button
                    onClick={() => setOptions({...options, type: 'complementary'})}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      options.type === 'complementary'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium">Complementary</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Opposite hues</div>
                  </button>
                  <button
                    onClick={() => setOptions({...options, type: 'triadic'})}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      options.type === 'triadic'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium">Triadic</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">120° apart</div>
                  </button>
                  <button
                    onClick={() => setOptions({...options, type: 'analogous'})}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      options.type === 'analogous'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium">Analogous</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Adjacent hues</div>
                  </button>
                </div>
              </div>

              {/* Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number of Colors
                </label>
                <input
                  type="number"
                  min="3"
                  max="10"
                  value={options.count}
                  onChange={(e) => setOptions({...options, count: parseInt(e.target.value) || 5})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Saturation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Saturation: {options.saturation}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={options.saturation}
                  onChange={(e) => setOptions({...options, saturation: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>

              {/* Lightness */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Lightness: {options.lightness}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={options.lightness}
                  onChange={(e) => setOptions({...options, lightness: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>

              <Button
                onClick={generatePalette}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate Palette
              </Button>
            </div>
          </Card>

          {/* Results */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Generated Palette
              </h2>
              {palette.length > 0 && (
                <div className="flex gap-2">
                  <CopyButton text={getPaletteInfo()} />
                  <Button
                    onClick={downloadPalette}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {palette.length > 0 ? (
                <div className="space-y-3">
                  {palette.map((color, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {color.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                            {color.hex}
                          </div>
                        </div>
                        <CopyButton text={color.hex} />
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <div>
                          <span className="font-medium">HEX:</span> {color.hex}
                        </div>
                        <div>
                          <span className="font-medium">RGB:</span> {color.rgb}
                        </div>
                        <div>
                          <span className="font-medium">HSL:</span> {color.hsl}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Click "Generate Palette" to create a color palette
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Color Theory */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Color Harmony Types
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Monochromatic</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Uses variations of a single hue. Creates a cohesive, harmonious look.
              </p>
              <div className="flex gap-1">
                <div className="w-6 h-6 bg-red-300 rounded"></div>
                <div className="w-6 h-6 bg-red-500 rounded"></div>
                <div className="w-6 h-6 bg-red-700 rounded"></div>
                <div className="w-6 h-6 bg-red-900 rounded"></div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Complementary</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Uses colors opposite each other on the color wheel. Creates high contrast.
              </p>
              <div className="flex gap-1">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
                <div className="w-6 h-6 bg-orange-500 rounded"></div>
                <div className="w-6 h-6 bg-green-500 rounded"></div>
                <div className="w-6 h-6 bg-red-500 rounded"></div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Triadic</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Uses three colors evenly spaced around the color wheel. Balanced and vibrant.
              </p>
              <div className="flex gap-1">
                <div className="w-6 h-6 bg-red-500 rounded"></div>
                <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
                <div className="w-6 h-6 bg-green-500 rounded"></div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Analogous</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Uses colors next to each other on the color wheel. Creates a soothing effect.
              </p>
              <div className="flex gap-1">
                <div className="w-6 h-6 bg-red-400 rounded"></div>
                <div className="w-6 h-6 bg-orange-400 rounded"></div>
                <div className="w-6 h-6 bg-yellow-400 rounded"></div>
                <div className="w-6 h-6 bg-green-400 rounded"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
