'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/CopyButton';
import { Link, ExternalLink, Trash2, BarChart3, Clock } from 'lucide-react';

interface ShortenedURL {
  id: string;
  original: string;
  short: string;
  createdAt: Date;
  clicks: number;
}

export default function URLShortener() {
  const [originalURL, setOriginalURL] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');
  const [shortenedURLs, setShortenedURLs] = useState<ShortenedURL[]>([]);
  const [customSlug, setCustomSlug] = useState('');
  const [useCustomSlug, setUseCustomSlug] = useState(false);

  // Load saved URLs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('shortened-urls');
    if (saved) {
      try {
        const parsed = JSON.parse(saved).map((url: any) => ({
          ...url,
          createdAt: new Date(url.createdAt)
        }));
        setShortenedURLs(parsed);
      } catch (error) {
        console.error('Error loading saved URLs:', error);
      }
    }
  }, []);

  // Save URLs to localStorage
  const saveURLs = (urls: ShortenedURL[]) => {
    localStorage.setItem('shortened-urls', JSON.stringify(urls));
    setShortenedURLs(urls);
  };

  const generateSlug = (length: number = 6): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const isValidURL = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const normalizeURL = (url: string): string => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  const shortenURL = () => {
    if (!originalURL.trim()) return;

    const normalizedURL = normalizeURL(originalURL.trim());
    
    if (!isValidURL(normalizedURL)) {
      alert('Please enter a valid URL');
      return;
    }

    const slug = useCustomSlug && customSlug.trim() 
      ? customSlug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')
      : generateSlug();

    // Check if slug already exists
    const existingURL = shortenedURLs.find(url => url.short.includes(slug));
    if (existingURL) {
      alert('This short URL already exists. Please try a different one.');
      return;
    }

    const shortURL = `${window.location.origin}/s/${slug}`;
    const newShortenedURL: ShortenedURL = {
      id: Date.now().toString(),
      original: normalizedURL,
      short: shortURL,
      createdAt: new Date(),
      clicks: 0
    };

    const updatedURLs = [...shortenedURLs, newShortenedURL];
    saveURLs(updatedURLs);
    setShortenedURL(shortURL);
  };

  const deleteURL = (id: string) => {
    const updatedURLs = shortenedURLs.filter(url => url.id !== id);
    saveURLs(updatedURLs);
  };

  const incrementClicks = (id: string) => {
    const updatedURLs = shortenedURLs.map(url => 
      url.id === id ? { ...url, clicks: url.clicks + 1 } : url
    );
    saveURLs(updatedURLs);
  };

  const clearAll = () => {
    if (confirm('Are you sure you want to delete all shortened URLs?')) {
      saveURLs([]);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Link className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              URL Shortener
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Create short, memorable URLs for your links. All URLs are stored locally in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Shorten URL
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter URL to shorten
                </label>
                <input
                  type="url"
                  value={originalURL}
                  onChange={(e) => setOriginalURL(e.target.value)}
                  placeholder="https://example.com/very-long-url"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={useCustomSlug}
                    onChange={(e) => setUseCustomSlug(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Use custom short code
                  </span>
                </label>
                {useCustomSlug && (
                  <input
                    type="text"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value)}
                    placeholder="my-custom-link"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>

              <Button
                onClick={shortenURL}
                className="w-full"
                disabled={!originalURL.trim()}
              >
                <Link className="w-4 h-4 mr-2" />
                Shorten URL
              </Button>

              {shortenedURL && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">
                        Shortened URL:
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-400 break-all">
                        {shortenedURL}
                      </div>
                    </div>
                    <CopyButton text={shortenedURL} />
                  </div>
                </div>
              )}

              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p className="mb-2"><strong>Note:</strong> URLs are stored locally in your browser.</p>
                <p>They will be lost if you clear your browser data.</p>
              </div>
            </div>
          </Card>

          {/* Results Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Your Shortened URLs
              </h2>
              {shortenedURLs.length > 0 && (
                <Button
                  onClick={clearAll}
                  variant="outline"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>
            
            <div className="space-y-4">
              {shortenedURLs.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {shortenedURLs.map((url) => (
                    <div key={url.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 dark:text-white break-all">
                            {url.short}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {url.original}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <CopyButton text={url.short} />
                          <Button
                            onClick={() => {
                              incrementClicks(url.id);
                              window.open(url.original, '_blank');
                            }}
                            variant="outline"
                            size="sm"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                          <Button
                            onClick={() => deleteURL(url.id)}
                            variant="outline"
                            size="sm"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <BarChart3 className="w-3 h-3" />
                          {url.clicks} clicks
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(url.createdAt)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No shortened URLs yet. Create your first one!
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Features */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Local Storage</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All URLs are stored locally in your browser. No external services required.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Click Tracking</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track how many times each shortened URL has been clicked.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Custom Slugs</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create memorable short codes for your URLs with custom slugs.
              </p>
            </div>
          </div>
        </Card>

        {/* Limitations */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Important Notes
          </h3>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 shrink-0" />
              <p>This is a local URL shortener. URLs are only accessible from this browser.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 shrink-0" />
              <p>URLs will be lost if you clear your browser data or use a different browser.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 shrink-0" />
              <p>For production use, consider using services like bit.ly, tinyurl.com, or your own server.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
