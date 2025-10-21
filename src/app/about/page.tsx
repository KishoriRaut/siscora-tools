import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us - Siscora Tools',
  description: 'Learn about our mission to provide free online tools and utilities for everyone.',
  keywords: 'about us, siscora tools, free online tools, productivity tools, online utilities',
}

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4">
            At Siscora Tools, we believe that everyone deserves access to powerful, easy-to-use tools 
            that make their daily tasks simpler and more efficient. Our mission is to provide free, 
            high-quality online utilities that help individuals, professionals, and businesses 
            accomplish their goals without barriers.
          </p>
          <p className="mb-4">
            We understand that productivity tools should be accessible to everyone, regardless of 
            technical expertise or budget constraints. That&apos;s why we&apos;ve made all our tools 
            completely free and designed them to be intuitive and user-friendly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <p className="mb-4">Our comprehensive suite of tools includes:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Hash Generator:</strong> Generate secure hashes for passwords and data verification</li>
            <li><strong>Calculator:</strong> Advanced calculator for quick computations and math problems</li>
            <li><strong>Base64 Encoder:</strong> Encode and decode data for various applications</li>
            <li><strong>Color Picker:</strong> Find the perfect colors for your designs and projects</li>
            <li><strong>Image Converter:</strong> Convert images between different formats seamlessly</li>
            <li><strong>QR Code Generator:</strong> Create QR codes for URLs, text, and contact information</li>
            <li><strong>Password Generator:</strong> Generate secure, random passwords for your accounts</li>
            <li><strong>Text Counter:</strong> Count words, characters, and analyze text content</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">🆓 Free to Use</h3>
              <p>All our tools are completely free with no hidden fees or subscription requirements.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">🔒 Privacy First</h3>
              <p>Your data stays in your browser. We don&apos;t store your personal information or generated content.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">⚡ Fast & Reliable</h3>
              <p>Our tools are optimized for speed and reliability, ensuring you get results quickly.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">📱 Mobile Friendly</h3>
              <p>All our tools work seamlessly on desktop, tablet, and mobile devices.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-4">
            Siscora Tools was born out of a simple need: making powerful productivity tools accessible 
            to everyone. We noticed that many people struggled with finding reliable, free tools for 
            their daily tasks, often having to pay for simple utilities or use complex software.
          </p>
          <p className="mb-4">
            What started as a collection of essential tools has evolved into a comprehensive utility 
            suite, helping thousands of users accomplish their tasks more efficiently and 
            productively without any barriers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Simplicity</h3>
              <p className="text-sm">We believe powerful tools should be easy to use and understand.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="text-lg font-semibold mb-2">Trust</h3>
              <p className="text-sm">We prioritize user privacy and data security in everything we do.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-sm">We continuously improve our tools based on user feedback and needs.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="mb-4">
            Ready to try our free tools? Our utilities are designed to be intuitive 
            and user-friendly, so you can get started right away.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/tools/hash-generator" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Hash Generator
            </Link>
            <Link 
              href="/#tools" 
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Browse All Tools
            </Link>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            Have questions, suggestions, or need help? We&apos;d love to hear from you! 
            <Link href="/contact" className="text-blue-600 hover:underline ml-1">
              Get in touch with our team
            </Link>.
          </p>
        </section>
      </div>
    </div>
  )
}
