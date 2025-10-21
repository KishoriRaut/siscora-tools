import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Siscora Tools',
  description: 'Read our terms of service and conditions for using our free online tools and utilities.',
  keywords: 'terms of service, usage terms, siscora tools, legal terms, free online tools',
}

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-sm text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using our Siscora Tools website, you accept and agree to be 
            bound by the terms and provision of this agreement. If you do not agree to abide by the 
            above, please do not use this service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
          <p className="mb-4">
            Our Siscora Tools platform provides free online utilities that help users accomplish 
            various tasks efficiently. The service includes:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Hash generation and verification tools</li>
            <li>Advanced calculator and math utilities</li>
            <li>Data encoding and conversion tools</li>
            <li>Color picking and design utilities</li>
            <li>Image conversion and processing tools</li>
            <li>QR code generation and scanning</li>
            <li>Password generation and security tools</li>
            <li>Text analysis and counting utilities</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
          <p className="mb-4">As a user of our service, you agree to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use the service only for lawful purposes</li>
            <li>Not attempt to gain unauthorized access to our systems</li>
            <li>Not use the service to transmit harmful or malicious content</li>
            <li>Respect intellectual property rights</li>
            <li>Not use the service for spam or unsolicited communications</li>
            <li>Provide accurate information when using our tools</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Prohibited Uses</h2>
          <p className="mb-4">You may not use our service:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>To submit false or misleading information</li>
            <li>To upload or transmit viruses or any other type of malicious code</li>
            <li>To collect or track the personal information of others</li>
            <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property Rights</h2>
          <p className="mb-4">
            The service and its original content, features, and functionality are and will remain the 
            exclusive property of our company and its licensors. The service is protected by copyright, 
            trademark, and other laws.
          </p>
          <p className="mb-4">
            You retain ownership of any content you create using our tools, including email signatures. 
            We do not claim ownership of your generated content.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
          <p className="mb-4">
            We strive to maintain the availability of our service, but we do not guarantee uninterrupted 
            access. The service may be temporarily unavailable due to maintenance, updates, or technical 
            issues.
          </p>
          <p className="mb-4">
            We reserve the right to modify, suspend, or discontinue the service at any time without notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Disclaimer of Warranties</h2>
          <p className="mb-4">
            The information on this website is provided on an "as is" basis. To the fullest extent 
            permitted by law, this Company:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Excludes all representations and warranties relating to this website and its contents</li>
            <li>Does not warrant that the website will be constantly available or available at all</li>
            <li>Does not warrant that the information on this website is complete, true, accurate, or non-misleading</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p className="mb-4">
            In no event shall our company, nor its directors, employees, partners, agents, suppliers, 
            or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
            damages, including without limitation, loss of profits, data, use, goodwill, or other 
            intangible losses, resulting from your use of the service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Indemnification</h2>
          <p className="mb-4">
            You agree to defend, indemnify, and hold harmless our company and its licensee and licensors, 
            and their employees, contractors, agents, officers and directors, from and against any and 
            all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including 
            but not limited to attorney's fees).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
          <p className="mb-4">
            These Terms shall be interpreted and governed by the laws of [Your Jurisdiction], without 
            regard to its conflict of law provisions. Our failure to enforce any right or provision of 
            these Terms will not be considered a waiver of those rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
            If a revision is material, we will try to provide at least 30 days notice prior to any new 
            terms taking effect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-4">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p className="mb-4">
            Email: legal@tools.siscora.com<br />
            Address: [Your Business Address]
          </p>
        </section>
      </div>
    </div>
  )
}
