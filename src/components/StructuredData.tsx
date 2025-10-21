export function StructuredData() {
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Siscora Tools",
    "description": "Siscora Tools offers free online utilities for developers and everyday users — hash generator, password generator, color picker, and more. Fast, privacy-first, and browser-based.",
    "url": "https://tools.siscora.com",
    "publisher": {
      "@type": "Organization",
      "name": "Siscora Tools",
      "url": "https://tools.siscora.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tools.siscora.com/logo.png"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://tools.siscora.com/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Siscora Tools Collection",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Email Signature Generator",
          "url": "https://tools.siscora.com/tools/email-signature"
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "name": "Hash Generator",
          "url": "https://tools.siscora.com/tools/hash-generator"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Password Generator", 
          "url": "https://tools.siscora.com/tools/password-generator"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Color Picker",
          "url": "https://tools.siscora.com/tools/color-picker"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Base64 Encoder",
          "url": "https://tools.siscora.com/tools/base64-encoder"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "QR Code Generator",
          "url": "https://tools.siscora.com/tools/qr-generator"
        },
        {
          "@type": "ListItem",
          "position": 7,
          "name": "Image Converter",
          "url": "https://tools.siscora.com/tools/image-converter"
        },
        {
          "@type": "ListItem",
          "position": 8,
          "name": "Calculator",
          "url": "https://tools.siscora.com/tools/calculator"
        },
        {
          "@type": "ListItem",
          "position": 9,
          "name": "Text Counter",
          "url": "https://tools.siscora.com/tools/text-counter"
        }
      ]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://tools.siscora.com"
        }
      ]
    },
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };

  const webApplicationData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Siscora Tools",
    "description": "Free online utilities for developers and everyday users",
    "url": "https://tools.siscora.com",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Siscora Tools Team",
      "url": "https://tools.siscora.com"
    },
    "featureList": [
      "Email Signature Generator",
      "Hash Generator", 
      "Password Generator",
      "Color Picker",
      "Base64 Encoder/Decoder",
      "QR Code Generator",
      "Image Converter",
      "Calculator",
      "Text Counter"
    ],
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "license": "https://tools.siscora.com/terms-of-service"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationData) }}
      />
    </>
  );
}
