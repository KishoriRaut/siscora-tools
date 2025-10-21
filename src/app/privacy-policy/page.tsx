import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Siscora Tools',
  description: 'Learn how we collect, use, and protect your personal information when using our free online tools and utilities.',
  keywords: 'privacy policy, data protection, siscora tools, user privacy, free online tools',
}

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            Welcome to Siscora Tools. This Privacy Policy explains how we collect, 
            use, and protect your information when you use our website and services.
          </p>
          <p className="mb-4">
            We are committed to protecting your privacy and ensuring the security of your personal 
            information. By using our website, you agree to the collection and use of information 
            in accordance with this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <h3 className="text-xl font-medium mb-3">Personal Information</h3>
          <p className="mb-4">
            We may collect personal information that you voluntarily provide to us, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Name and contact information (when you contact us)</li>
            <li>Email address (if you choose to subscribe to our newsletter)</li>
            <li>Any information you provide in our contact forms</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-3">Usage Information</h3>
          <p className="mb-4">
            We automatically collect certain information about your use of our website:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>IP address and browser information</li>
            <li>Pages visited and time spent on our site</li>
            <li>Referring website information</li>
            <li>Device and operating system information</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-4">We use the collected information for the following purposes:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>To provide and improve our email signature generation services</li>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To analyze website usage and improve user experience</li>
            <li>To send you updates about our services (only if you've subscribed)</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Storage and Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction. However, no method of 
            transmission over the internet is 100% secure.
          </p>
          <p className="mb-4">
            Your email signature data is processed locally in your browser and is not stored on 
            our servers unless you explicitly choose to save it.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies to enhance your experience on our website. 
            These may include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Essential cookies for website functionality</li>
            <li>Analytics cookies to understand usage patterns</li>
            <li>Preference cookies to remember your settings</li>
          </ul>
          <p className="mb-4">
            You can control cookie settings through your browser preferences.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
          <p className="mb-4">
            We may use third-party services for analytics and advertising. These services have their 
            own privacy policies, and we encourage you to review them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
          <p className="mb-4">
            Our services are not directed to children under 13. We do not knowingly collect 
            personal information from children under 13.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes 
            by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mb-4">
            Email: privacy@tools.siscora.com<br />
            Address: [Your Business Address]
          </p>
        </section>
      </div>
    </div>
  )
}
