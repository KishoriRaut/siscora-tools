import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found - Siscora Tools',
  description: 'The page you are looking for could not be found. Return to our homepage to access our free online tools and utilities.',
}

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
        </p>
      </div>

      <div className="space-y-4">
        <Link 
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Homepage
        </Link>
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>Or try one of these popular tools:</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link 
              href="/tools/hash-generator" 
              className="text-blue-600 hover:underline"
            >
              Hash Generator
            </Link>
            <Link 
              href="/tools/base64-encoder" 
              className="text-blue-600 hover:underline"
            >
              Base64 Encoder
            </Link>
            <Link 
              href="/tools/calculator" 
              className="text-blue-600 hover:underline"
            >
              Calculator
            </Link>
            <Link 
              href="/tools/color-picker" 
              className="text-blue-600 hover:underline"
            >
              Color Picker
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
