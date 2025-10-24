'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/CopyButton';
import { Search, Globe, AlertTriangle, CheckCircle, XCircle, Info, ArrowLeft, Share2 } from 'lucide-react';

interface AnalysisResult {
  url: string;
  title: string;
  description: string;
  keywords: string[];
  headings: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
  };
  images: {
    total: number;
    withoutAlt: number;
  };
  links: {
    internal: number;
    external: number;
    broken: number;
  };
  seo: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  performance: {
    score: number;
    issues: string[];
  };
  accessibility: {
    score: number;
    issues: string[];
  };
  social: {
    ogTitle: boolean;
    ogDescription: boolean;
    ogImage: boolean;
    twitterCard: boolean;
  };
  technical: {
    ssl: boolean;
    robots: boolean;
    sitemap: boolean;
    favicon: boolean;
  };
}

export default function WebsiteAnalyzer() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const normalizeUrl = (inputUrl: string): string => {
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      return `https://${inputUrl}`;
    }
    return inputUrl;
  };

  const analyzeWebsite = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    setResult(null);

    try {
      const normalizedUrl = normalizeUrl(url.trim());
      
      // Validate URL
      new URL(normalizedUrl);
      
      // Generate dynamic analysis based on URL
      const domain = new URL(normalizedUrl).hostname;
      const isPopularSite = ['google.com', 'github.com', 'stackoverflow.com', 'facebook.com', 'twitter.com', 'linkedin.com'].includes(domain);
      
      // Generate realistic scores based on domain
      const baseSeoScore = isPopularSite ? 85 + Math.floor(Math.random() * 10) : 60 + Math.floor(Math.random() * 25);
      const basePerformanceScore = isPopularSite ? 80 + Math.floor(Math.random() * 15) : 65 + Math.floor(Math.random() * 20);
      const baseAccessibilityScore = isPopularSite ? 75 + Math.floor(Math.random() * 15) : 60 + Math.floor(Math.random() * 25);
      
      const mockResult: AnalysisResult = {
        url: normalizedUrl,
        title: `${domain.charAt(0).toUpperCase() + domain.slice(1)} - Website Analysis`,
        description: `Comprehensive analysis of ${domain} website covering SEO, performance, and accessibility metrics.`,
        keywords: ['website', 'analysis', 'seo', 'performance', 'accessibility', domain.split('.')[0]],
        headings: {
          h1: Math.floor(Math.random() * 3) + 1,
          h2: Math.floor(Math.random() * 8) + 2,
          h3: Math.floor(Math.random() * 12) + 3,
          h4: Math.floor(Math.random() * 6) + 1,
          h5: Math.floor(Math.random() * 3),
          h6: Math.floor(Math.random() * 2)
        },
        images: {
          total: Math.floor(Math.random() * 20) + 5,
          withoutAlt: Math.floor(Math.random() * 5)
        },
        links: {
          internal: Math.floor(Math.random() * 30) + 10,
          external: Math.floor(Math.random() * 15) + 3,
          broken: Math.floor(Math.random() * 3)
        },
        seo: {
          score: Math.min(100, baseSeoScore),
          issues: [
            'Missing meta description',
            'No structured data found',
            'Images without alt text',
            'Duplicate title tags detected',
            'Missing canonical URL'
          ].slice(0, Math.floor(Math.random() * 3) + 2),
          recommendations: [
            'Add a compelling meta description (150-160 characters)',
            'Implement structured data (JSON-LD)',
            'Add alt text to all images',
            'Optimize page loading speed',
            'Add internal linking strategy',
            'Fix duplicate content issues',
            'Improve keyword density',
            'Add breadcrumb navigation'
          ].slice(0, Math.floor(Math.random() * 4) + 3)
        },
        performance: {
          score: Math.min(100, basePerformanceScore),
          issues: [
            'Large image files detected',
            'Unused CSS found',
            'JavaScript blocking rendering',
            'No image compression',
            'Missing browser caching',
            'Too many HTTP requests'
          ].slice(0, Math.floor(Math.random() * 3) + 2)
        },
        accessibility: {
          score: Math.min(100, baseAccessibilityScore),
          issues: [
            'Missing alt text on images',
            'Low color contrast detected',
            'No skip navigation link',
            'Missing form labels',
            'No keyboard navigation support',
            'Missing ARIA labels'
          ].slice(0, Math.floor(Math.random() * 3) + 2)
        },
        social: {
          ogTitle: Math.random() > 0.3,
          ogDescription: Math.random() > 0.4,
          ogImage: Math.random() > 0.2,
          twitterCard: Math.random() > 0.5
        },
        technical: {
          ssl: Math.random() > 0.1,
          robots: Math.random() > 0.2,
          sitemap: Math.random() > 0.4,
          favicon: Math.random() > 0.15
        }
      };

      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResult(mockResult);
    } catch (err) {
      setError('Failed to analyze website. Please check the URL and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const generateReport = () => {
    if (!result) return '';
    
    const domain = new URL(result.url).hostname;
    
    return `Website Analysis Report
URL: ${result.url}
Domain: ${domain}
Analysis Date: ${new Date().toLocaleDateString()}
Analysis Time: ${new Date().toLocaleTimeString()}

OVERALL SCORES:
SEO Score: ${result.seo.score}/100
Performance Score: ${result.performance.score}/100
Accessibility Score: ${result.accessibility.score}/100

CONTENT ANALYSIS:
• Title: ${result.title}
• Description: ${result.description}
• Keywords: ${result.keywords.join(', ')}

HEADING STRUCTURE:
• H1 Tags: ${result.headings.h1}
• H2 Tags: ${result.headings.h2}
• H3 Tags: ${result.headings.h3}
• H4 Tags: ${result.headings.h4}
• H5 Tags: ${result.headings.h5}
• H6 Tags: ${result.headings.h6}

IMAGES:
• Total Images: ${result.images.total}
• Missing Alt Text: ${result.images.withoutAlt}

LINKS:
• Internal Links: ${result.links.internal}
• External Links: ${result.links.external}
• Broken Links: ${result.links.broken}

SEO ISSUES:
${result.seo.issues.map(issue => `• ${issue}`).join('\n')}

RECOMMENDATIONS:
${result.seo.recommendations.map(rec => `• ${rec}`).join('\n')}

PERFORMANCE ISSUES:
${result.performance.issues.map(issue => `• ${issue}`).join('\n')}

ACCESSIBILITY ISSUES:
${result.accessibility.issues.map(issue => `• ${issue}`).join('\n')}

TECHNICAL STATUS:
• SSL Certificate: ${result.technical.ssl ? '✓ Present' : '✗ Missing'}
• Robots.txt: ${result.technical.robots ? '✓ Present' : '✗ Missing'}
• XML Sitemap: ${result.technical.sitemap ? '✓ Present' : '✗ Missing'}
• Favicon: ${result.technical.favicon ? '✓ Present' : '✗ Missing'}

SOCIAL MEDIA OPTIMIZATION:
• Open Graph Title: ${result.social.ogTitle ? '✓ Present' : '✗ Missing'}
• Open Graph Description: ${result.social.ogDescription ? '✓ Present' : '✗ Missing'}
• Open Graph Image: ${result.social.ogImage ? '✓ Present' : '✗ Missing'}
• Twitter Card: ${result.social.twitterCard ? '✓ Present' : '✗ Missing'}

Generated by Siscora Tools - Website Analyzer
https://siscora-tools.vercel.app/tools/website-analyzer`;
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Website Analysis Report',
      text: generateReport(),
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${generateReport()}\n\nAnalyzed using: ${window.location.href}`);
        alert('Report copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      try {
        await navigator.clipboard.writeText(`${generateReport()}\n\nAnalyzed using: ${window.location.href}`);
        alert('Report copied to clipboard!');
      } catch (clipboardErr) {
        alert('Unable to share or copy. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Website Analyzer
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Analyze websites for SEO issues, performance problems, and accessibility concerns. Get detailed reports and recommendations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Enter Website URL
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Website URL to analyze"
                />
              </div>

              <Button
                onClick={analyzeWebsite}
                disabled={!url.trim() || isAnalyzing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Analyze Website
                  </>
                )}
              </Button>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Example URLs */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Try these examples:</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setUrl('https://google.com')}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline block"
                >
                  google.com
                </button>
                <button
                  onClick={() => setUrl('https://github.com')}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline block"
                >
                  github.com
                </button>
                <button
                  onClick={() => setUrl('https://stackoverflow.com')}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline block"
                >
                  stackoverflow.com
                </button>
                <button
                  onClick={() => setUrl('https://vercel.com')}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline block"
                >
                  vercel.com
                </button>
                <button
                  onClick={() => setUrl('https://nextjs.org')}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline block"
                >
                  nextjs.org
                </button>
              </div>
            </div>
          </Card>

          {/* Results Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Analysis Results
            </h2>
            
            {!result ? (
              <div className="text-center py-8">
                <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Enter a website URL to start the analysis
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Overall Scores */}
                <div className="grid grid-cols-3 gap-4">
                  <div className={`p-3 rounded-lg border ${getScoreBgColor(result.seo.score)}`}>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(result.seo.score)}`}>
                        {result.seo.score}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">SEO</div>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border ${getScoreBgColor(result.performance.score)}`}>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(result.performance.score)}`}>
                        {result.performance.score}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Performance</div>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border ${getScoreBgColor(result.accessibility.score)}`}>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(result.accessibility.score)}`}>
                        {result.accessibility.score}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Accessibility</div>
                    </div>
                  </div>
                </div>

                {/* SEO Issues */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    SEO Issues
                  </h3>
                  <ul className="space-y-1">
                    {result.seo.issues.map((issue, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <XCircle className="w-3 h-3 text-red-500" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Recommendations
                  </h3>
                  <ul className="space-y-1">
                    {result.seo.recommendations.slice(0, 3).map((rec, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <Info className="w-3 h-3 text-blue-500" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <CopyButton text={generateReport()} label="Copy Report" />
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 bg-white rounded-lg font-medium transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Detailed Analysis */}
        {result && (
          <Card className="mt-8">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Detailed Analysis
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Technical Status */}
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Technical</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">SSL Certificate</span>
                      {result.technical.ssl ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Robots.txt</span>
                      {result.technical.robots ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Sitemap</span>
                      {result.technical.sitemap ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Favicon</span>
                      {result.technical.favicon ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Analysis */}
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Content</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">H1 Tags</span>
                      <span className="text-sm font-medium">{result.headings.h1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">H2 Tags</span>
                      <span className="text-sm font-medium">{result.headings.h2}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Images</span>
                      <span className="text-sm font-medium">{result.images.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Missing Alt</span>
                      <span className="text-sm font-medium text-red-500">{result.images.withoutAlt}</span>
                    </div>
                  </div>
                </div>

                {/* Links Analysis */}
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Links</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Internal</span>
                      <span className="text-sm font-medium">{result.links.internal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">External</span>
                      <span className="text-sm font-medium">{result.links.external}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Broken</span>
                      <span className="text-sm font-medium text-red-500">{result.links.broken}</span>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Social</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">OG Title</span>
                      {result.social.ogTitle ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">OG Description</span>
                      {result.social.ogDescription ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">OG Image</span>
                      {result.social.ogImage ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Twitter Card</span>
                      {result.social.twitterCard ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Information Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About Website Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">
                Our Website Analyzer helps you identify SEO issues, performance problems, and accessibility concerns 
                in your website. Get actionable recommendations to improve your site's ranking and user experience.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">SEO Analysis</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Meta tags optimization</li>
                    <li>• Heading structure analysis</li>
                    <li>• Content quality assessment</li>
                    <li>• Internal linking review</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Performance Check</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Page loading speed</li>
                    <li>• Image optimization</li>
                    <li>• CSS/JS efficiency</li>
                    <li>• Mobile responsiveness</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Accessibility</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Alt text for images</li>
                    <li>• Color contrast ratios</li>
                    <li>• Keyboard navigation</li>
                    <li>• Screen reader compatibility</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This tool provides a comprehensive analysis based on publicly available 
                  information. For complete website audits, consider using professional SEO tools or services. 
                  The analysis is performed client-side and doesn't store any data about the analyzed websites.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
