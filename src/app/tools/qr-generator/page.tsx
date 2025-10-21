'use client';

import { useState } from 'react';
import { QrCode, ArrowLeft, Download, Copy, Wifi, Link as LinkIcon, FileText } from 'lucide-react';
import Link from 'next/link';

interface QRData {
  type: 'url' | 'text' | 'wifi' | 'email' | 'phone';
  content: string;
  size: number;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
}

interface WiFiData {
  ssid: string;
  password: string;
  security: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export default function QRGeneratorPage() {
  const [qrData, setQrData] = useState<QRData>({
    type: 'url',
    content: '',
    size: 200,
    errorCorrection: 'M'
  });

  const [wifiData, setWifiData] = useState<WiFiData>({
    ssid: '',
    password: '',
    security: 'WPA',
    hidden: false
  });

  const [copied, setCopied] = useState(false);

  const generateQRContent = () => {
    switch (qrData.type) {
      case 'wifi':
        const wifiString = `WIFI:T:${wifiData.security};S:${wifiData.ssid};P:${wifiData.password};H:${wifiData.hidden};`;
        return wifiString;
      case 'email':
        return `mailto:${qrData.content}`;
      case 'phone':
        return `tel:${qrData.content}`;
      default:
        return qrData.content;
    }
  };

  const generateQRCode = () => {
    const content = generateQRContent();
    if (!content) return null;

    // Using a simple QR code generation approach
    // In a real app, you'd use a library like qrcode.js
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrData.size}x${qrData.size}&data=${encodeURIComponent(content)}&ecc=${qrData.errorCorrection}`;
    return qrUrl;
  };

  const handleCopy = async () => {
    const qrUrl = generateQRCode();
    if (qrUrl) {
      try {
        await navigator.clipboard.writeText(qrUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  const handleDownload = () => {
    const qrUrl = generateQRCode();
    if (qrUrl) {
      const link = document.createElement('a');
      link.href = qrUrl;
      link.download = `qr-code-${qrData.type}.png`;
      link.click();
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
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <QrCode className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                QR Code Generator
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Generate QR codes for URLs, text, WiFi credentials, and more
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Configuration
            </h2>
            
            <div className="space-y-6">
              {/* QR Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  QR Code Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'url', label: 'URL', icon: LinkIcon },
                    { value: 'text', label: 'Text', icon: FileText },
                    { value: 'wifi', label: 'WiFi', icon: Wifi },
                    { value: 'email', label: 'Email', icon: QrCode },
                    { value: 'phone', label: 'Phone', icon: QrCode }
                  ].map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() => setQrData({ ...qrData, type: type.value as any })}
                        className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                          qrData.type === type.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {type.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content Input */}
              {qrData.type !== 'wifi' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {qrData.type === 'url' ? 'URL' : 
                     qrData.type === 'text' ? 'Text' :
                     qrData.type === 'email' ? 'Email Address' :
                     'Phone Number'}
                  </label>
                  <input
                    type={qrData.type === 'email' ? 'email' : qrData.type === 'phone' ? 'tel' : 'text'}
                    value={qrData.content}
                    onChange={(e) => setQrData({ ...qrData, content: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder={
                      qrData.type === 'url' ? 'https://example.com' :
                      qrData.type === 'text' ? 'Enter your text here' :
                      qrData.type === 'email' ? 'user@example.com' :
                      '+1234567890'
                    }
                  />
                </div>
              )}

              {/* WiFi Configuration */}
              {qrData.type === 'wifi' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Network Name (SSID)
                    </label>
                    <input
                      type="text"
                      value={wifiData.ssid}
                      onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="MyWiFiNetwork"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={wifiData.password}
                      onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter WiFi password"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Security Type
                      </label>
                      <select
                        value={wifiData.security}
                        onChange={(e) => setWifiData({ ...wifiData, security: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        aria-label="WiFi security type"
                      >
                        <option value="WPA">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">No Password</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hidden"
                        checked={wifiData.hidden}
                        onChange={(e) => setWifiData({ ...wifiData, hidden: e.target.checked })}
                        className="mr-2"
                      />
                      <label htmlFor="hidden" className="text-sm text-gray-700 dark:text-gray-300">
                        Hidden Network
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Size and Error Correction */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Size (px)
                  </label>
                  <input
                    type="number"
                    value={qrData.size}
                    onChange={(e) => setQrData({ ...qrData, size: parseInt(e.target.value) || 200 })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    min="100"
                    max="1000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Error Correction
                  </label>
                  <select
                    value={qrData.errorCorrection}
                    onChange={(e) => setQrData({ ...qrData, errorCorrection: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    aria-label="Error correction level"
                  >
                    <option value="L">Low (7%)</option>
                    <option value="M">Medium (15%)</option>
                    <option value="Q">Quartile (25%)</option>
                    <option value="H">High (30%)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Preview
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    copied
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy URL'}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 dark:bg-gray-700 rounded-lg">
              {generateQRCode() ? (
                <div className="text-center">
                  <img
                    src={generateQRCode()!}
                    alt="Generated QR Code"
                    className="mx-auto mb-4 border border-gray-300 dark:border-gray-600 rounded-lg"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Scan this QR code with your mobile device
                  </p>
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Enter content above to generate QR code</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
