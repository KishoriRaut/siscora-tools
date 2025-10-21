'use client';

import { useState, useCallback } from 'react';
import { Image, ArrowLeft, Download, Upload, RotateCcw } from 'lucide-react';
import Link from 'next/link';

interface ImageFile {
  file: File;
  preview: string;
  converted?: string;
}

export default function ImageConverterPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [targetFormat, setTargetFormat] = useState<'jpeg' | 'png' | 'webp' | 'bmp'>('jpeg');
  const [quality, setQuality] = useState(90);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: ImageFile[] = [];
      
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const preview = URL.createObjectURL(file);
          newImages.push({ file, preview });
        }
      });
      
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const convertImage = useCallback(async (imageFile: ImageFile): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          
          const mimeType = `image/${targetFormat}`;
          const converted = canvas.toDataURL(mimeType, quality / 100);
          resolve(converted);
        } else {
          reject(new Error('Could not get canvas context'));
        }
      };
      
      img.onerror = () => reject(new Error('Could not load image'));
      img.src = imageFile.preview;
    });
  }, [targetFormat, quality]);

  const handleConvert = async () => {
    if (images.length === 0) return;
    
    setIsConverting(true);
    
    try {
      const convertedImages = await Promise.all(
        images.map(async (imageFile) => {
          const converted = await convertImage(imageFile);
          return { ...imageFile, converted };
        })
      );
      
      setImages(convertedImages);
    } catch (error) {
      console.error('Conversion error:', error);
    }
    
    setIsConverting(false);
  };

  const downloadImage = (imageFile: ImageFile, index: number) => {
    if (imageFile.converted) {
      const link = document.createElement('a');
      link.href = imageFile.converted;
      link.download = `converted-${index + 1}.${targetFormat}`;
      link.click();
    }
  };

  const downloadAll = () => {
    images.forEach((imageFile, index) => {
      if (imageFile.converted) {
        setTimeout(() => {
          downloadImage(imageFile, index);
        }, index * 100); // Stagger downloads
      }
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setImages([]);
  };

  const formatOptions = [
    { value: 'jpeg', label: 'JPEG', description: 'Good for photos, smaller file size' },
    { value: 'png', label: 'PNG', description: 'Lossless, good for graphics with transparency' },
    { value: 'webp', label: 'WebP', description: 'Modern format, excellent compression' },
    { value: 'bmp', label: 'BMP', description: 'Uncompressed bitmap format' }
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
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Image className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Image Converter
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Convert images between different formats with quality control
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Upload Images
            </h2>
            
            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Images
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="image-upload"
                    accept="image/*"
                    multiple
                    aria-label="Upload images"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      Supports JPG, PNG, WebP, BMP, GIF
                    </span>
                  </label>
                </div>
              </div>

              {/* Conversion Settings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Output Format
                </label>
                <select
                  value={targetFormat}
                  onChange={(e) => setTargetFormat(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  aria-label="Output format"
                >
                  {formatOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label} - {option.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quality Setting */}
              {targetFormat === 'jpeg' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quality: {quality}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Low (10%)</span>
                    <span>High (100%)</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleConvert}
                  disabled={images.length === 0 || isConverting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isConverting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Image className="w-4 h-4" />
                      Convert Images
                    </>
                  )}
                </button>
                
                <button
                  onClick={clearAll}
                  disabled={images.length === 0}
                  className="w-full px-4 py-3 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RotateCcw className="w-4 h-4 inline mr-2" />
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Images ({images.length})
              </h2>
              {images.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={downloadAll}
                    disabled={!images.some(img => img.converted)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4" />
                    Download All
                  </button>
                </div>
              )}
            </div>
            
            {images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((imageFile, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      {/* Original Image */}
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                          Original
                        </h3>
                        <img
                          src={imageFile.preview}
                          alt={`Original ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                        />
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          {imageFile.file.name} ({(imageFile.file.size / 1024).toFixed(1)} KB)
                        </div>
                      </div>

                      {/* Converted Image */}
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                          Converted
                        </h3>
                        {imageFile.converted ? (
                          <>
                            <img
                              src={imageFile.converted}
                              alt={`Converted ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                            />
                            <div className="mt-2 flex items-center justify-between">
                              <button
                                onClick={() => downloadImage(imageFile, index)}
                                className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                              >
                                <Download className="w-3 h-3" />
                                Download
                              </button>
                              <button
                                onClick={() => removeImage(index)}
                                className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300 rounded text-xs hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Not converted yet
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                <Image className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Upload images to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Supported Formats
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {formatOptions.map((format) => (
              <div key={format.value} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {format.label}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {format.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
