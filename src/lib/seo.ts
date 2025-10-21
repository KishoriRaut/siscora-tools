import { Metadata } from 'next';

export interface ToolPageMetadata {
  title: string;
  description: string;
  keywords: string[];
  category: string;
  toolName: string;
  features: string[];
}

export function generateToolMetadata({
  title,
  description,
  keywords,
  category,
  toolName,
  features
}: ToolPageMetadata): Metadata {
  return {
    title,
    description,
    keywords,
    authors: [{ name: "Siscora Tools Team" }],
    creator: "Siscora Tools",
    publisher: "Siscora Tools",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://tools.siscora.com'),
    alternates: {
      canonical: `/tools/${toolName}`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://tools.siscora.com/tools/${toolName}`,
      title,
      description,
      siteName: 'Siscora Tools',
      images: [
        {
          url: `/og-${toolName}.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/og-${toolName}.png`],
      creator: '@siscoratools',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: 'technology',
    classification: 'Developer Tools',
    other: {
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'theme-color': '#3b82f6',
    },
  };
}

export function generateToolStructuredData({
  toolName,
  title,
  description,
  features,
  category
}: {
  toolName: string;
  title: string;
  description: string;
  features: string[];
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": `https://tools.siscora.com/tools/${toolName}`,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Siscora Tools",
      "url": "https://tools.siscora.com"
    },
    "featureList": features,
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "license": "https://tools.siscora.com/terms-of-service",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://tools.siscora.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Tools",
          "item": "https://tools.siscora.com/#tools"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": title,
          "item": `https://tools.siscora.com/tools/${toolName}`
        }
      ]
    }
  };
}
