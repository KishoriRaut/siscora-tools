'use client';

import { useState, useCallback } from 'react';
import { Palette, ArrowLeft, Copy, RefreshCw, Download } from 'lucide-react';
import Link from 'next/link';

interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  name?: string;
}

interface ColorPalette {
  primary: Color;
  secondary: Color[];
  analogous: Color[];
  complementary: Color[];
  triadic: Color[];
}

export default function ColorPickerPage() {
  const [selectedColor, setSelectedColor] = useState<Color>({
    hex: '#3B82F6',
    rgb: { r: 59, g: 130, b: 246 },
    hsl: { h: 217, s: 91, l: 60 }
  });
  const [palette, setPalette] = useState<ColorPalette | null>(null);
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<'hex' | 'rgb' | 'hsl'>('hex');

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const generatePalette = useCallback((color: Color) => {
    const { h, s, l } = color.hsl;
    
    // Generate analogous colors (30 degrees apart)
    const analogous = [
      { h: (h - 30 + 360) % 360, s, l },
      { h: (h + 30) % 360, s, l }
    ].map(hsl => hslToHex(hsl.h, hsl.s, hsl.l));

    // Generate complementary color (180 degrees apart)
    const complementary = hslToHex((h + 180) % 360, s, l);

    // Generate triadic colors (120 degrees apart)
    const triadic = [
      { h: (h + 120) % 360, s, l },
      { h: (h + 240) % 360, s, l }
    ].map(hsl => hslToHex(hsl.h, hsl.s, hsl.l));

    // Generate secondary colors (variations of lightness)
    const secondary = [
      { h, s, l: Math.max(0, l - 20) },
      { h, s, l: Math.min(100, l + 20) },
      { h, s: Math.max(0, s - 20), l },
      { h, s: Math.min(100, s + 20), l }
    ].map(hsl => hslToHex(hsl.h, hsl.s, hsl.l));

    setPalette({
      primary: color,
      secondary: secondary.map(hex => ({
        hex,
        rgb: hexToRgb(hex)!,
        hsl: rgbToHsl(hexToRgb(hex)!.r, hexToRgb(hex)!.g, hexToRgb(hex)!.b)
      })),
      analogous: analogous.map(hex => ({
        hex,
        rgb: hexToRgb(hex)!,
        hsl: rgbToHsl(hexToRgb(hex)!.r, hexToRgb(hex)!.g, hexToRgb(hex)!.b)
      })),
      complementary: [{
        hex: complementary,
        rgb: hexToRgb(complementary)!,
        hsl: rgbToHsl(hexToRgb(complementary)!.r, hexToRgb(complementary)!.g, hexToRgb(complementary)!.b)
      }],
      triadic: triadic.map(hex => ({
        hex,
        rgb: hexToRgb(hex)!,
        hsl: rgbToHsl(hexToRgb(hex)!.r, hexToRgb(hex)!.g, hexToRgb(hex)!.b)
      }))
    });
  }, []);

  const hslToHex = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (0 <= h && h < 1/6) { r = c; g = x; b = 0; }
    else if (1/6 <= h && h < 2/6) { r = x; g = c; b = 0; }
    else if (2/6 <= h && h < 3/6) { r = 0; g = c; b = x; }
    else if (3/6 <= h && h < 4/6) { r = 0; g = x; b = c; }
    else if (4/6 <= h && h < 5/6) { r = x; g = 0; b = c; }
    else if (5/6 <= h && h < 1) { r = c; g = 0; b = x; }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const handleColorChange = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      const newColor = { hex, rgb, hsl };
      setSelectedColor(newColor);
      generatePalette(newColor);
    }
  };

  const getColorValue = (color: Color) => {
    switch (format) {
      case 'hex': return color.hex;
      case 'rgb': return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
      case 'hsl': return `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
      default: return color.hex;
    }
  };

  const handleCopy = async (color: Color) => {
    try {
      await navigator.clipboard.writeText(getColorValue(color));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

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
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Palette className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Color Picker
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Pick colors and generate beautiful color palettes
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Color Picker */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Color Picker
            </h2>
            
            <div className="space-y-6">
              {/* Color Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Color
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={selectedColor.hex}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-16 h-16 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                    aria-label="Color picker"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={selectedColor.hex}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>

              {/* Format Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Output Format
                </label>
                <div className="flex gap-2">
                  {['hex', 'rgb', 'hsl'].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setFormat(fmt as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        format === fmt
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {fmt.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Values */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Color Values
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">HEX:</span>
                    <span className="font-mono text-sm">{selectedColor.hex}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">RGB:</span>
                    <span className="font-mono text-sm">
                      {selectedColor.rgb.r}, {selectedColor.rgb.g}, {selectedColor.rgb.b}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">HSL:</span>
                    <span className="font-mono text-sm">
                      {selectedColor.hsl.h}°, {selectedColor.hsl.s}%, {selectedColor.hsl.l}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Copy Button */}
              <button
                onClick={() => handleCopy(selectedColor)}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  copied
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/30'
                }`}
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : `Copy ${format.toUpperCase()}`}
              </button>
            </div>
          </div>

          {/* Color Palette */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Color Palette
            </h2>
            
            {palette && (
              <div className="space-y-6">
                {/* Primary Color */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Primary Color
                  </h3>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div 
                      className="w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-600"
                      style={{ backgroundColor: palette.primary.hex }}
                    />
                    <div className="flex-1">
                      <div className="font-mono text-sm">{palette.primary.hex}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        RGB({palette.primary.rgb.r}, {palette.primary.rgb.g}, {palette.primary.rgb.b})
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(palette.primary)}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      aria-label="Copy primary color"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Secondary Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Variations
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {palette.secondary.map((color, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div 
                          className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-xs truncate">{color.hex}</div>
                        </div>
                        <button
                          onClick={() => handleCopy(color)}
                          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Analogous Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Analogous Colors
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {palette.analogous.map((color, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div 
                          className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-xs truncate">{color.hex}</div>
                        </div>
                        <button
                          onClick={() => handleCopy(color)}
                          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Complementary Color */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Complementary Color
                  </h3>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div 
                      className="w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-600"
                      style={{ backgroundColor: palette.complementary[0].hex }}
                    />
                    <div className="flex-1">
                      <div className="font-mono text-sm">{palette.complementary[0].hex}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        RGB({palette.complementary[0].rgb.r}, {palette.complementary[0].rgb.g}, {palette.complementary[0].rgb.b})
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(palette.complementary[0])}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      aria-label="Copy complementary color"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
