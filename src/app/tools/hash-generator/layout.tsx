import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hash Generator - MD5, SHA-1, SHA-256, SHA-512 | Siscora Tools',
  description: 'Generate secure hashes for text and files using MD5, SHA-1, SHA-256, and SHA-512 algorithms. Fast, free, and privacy-first hash generator tool.',
  keywords: [
    'hash generator',
    'md5 generator',
    'sha-1 generator',
    'sha-256 generator',
    'sha-512 generator',
    'file hash',
    'text hash',
    'cryptographic hash',
    'hash calculator',
    'online hash tool',
    'free hash generator',
    'secure hash'
  ],
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
    canonical: '/tools/hash-generator',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tools.siscora.com/tools/hash-generator',
    title: 'Hash Generator - MD5, SHA-1, SHA-256, SHA-512 | Siscora Tools',
    description: 'Generate secure hashes for text and files using MD5, SHA-1, SHA-256, and SHA-512 algorithms. Fast, free, and privacy-first hash generator tool.',
    siteName: 'Siscora Tools',
    images: [
      {
        url: '/og-hash-generator.png',
        width: 1200,
        height: 630,
        alt: 'Hash Generator - MD5, SHA-1, SHA-256, SHA-512 | Siscora Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hash Generator - MD5, SHA-1, SHA-256, SHA-512 | Siscora Tools',
    description: 'Generate secure hashes for text and files using MD5, SHA-1, SHA-256, and SHA-512 algorithms. Fast, free, and privacy-first hash generator tool.',
    images: ['/og-hash-generator.png'],
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
};

export default function HashGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
