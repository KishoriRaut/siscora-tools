import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";

export const metadata: Metadata = {
  title: {
    default: "Siscora Tools – Free Online Tools for Everyone",
    template: "%s | Siscora Tools"
  },
  description: "Siscora Tools offers free online utilities for developers and everyday users — hash generator, password generator, color picker, and more. Fast, privacy-first, and browser-based.",
  keywords: [
    "free online tools",
    "hash generator",
    "password generator", 
    "color picker",
    "base64 encoder",
    "qr code generator",
    "image converter",
    "calculator",
    "text counter",
    "email signature generator",
    "productivity tools",
    "developer tools",
    "online utilities",
    "privacy-first tools",
    "browser-based tools"
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
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tools.siscora.com',
    title: 'Siscora Tools – Free Online Tools for Everyone',
    description: 'Siscora Tools offers free online utilities for developers and everyday users — hash generator, password generator, color picker, and more. Fast, privacy-first, and browser-based.',
    siteName: 'Siscora Tools',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Siscora Tools – Free Online Tools for Everyone',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siscora Tools – Free Online Tools for Everyone',
    description: 'Siscora Tools offers free online utilities for developers and everyday users — hash generator, password generator, color picker, and more. Fast, privacy-first, and browser-based.',
    images: ['/og-image.png'],
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
  verification: {
    google: 'GWxCu5obRdDCgCLi-XYQv3XvxhGvCE2RHo-aMCYtmHM',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  category: 'technology',
  classification: 'Developer Tools',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'theme-color': '#3b82f6',
    'application-name': 'Siscora Tools',
    'msapplication-TileColor': '#3b82f6',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Siscora Tools" />
        <link rel="apple-touch-icon" href="/icon-192x192.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body
        className="antialiased font-sans"
      >
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
          <PWAInstallPrompt />
        </div>
      </body>
    </html>
  );
}