'use client';

import { useState } from 'react';
import { SignatureForm } from '@/components/SignatureForm';
import { SignaturePreview } from '@/components/SignaturePreview';
import { CopyButton } from '@/components/CopyButton';
import { ExportOptions } from '@/components/ExportOptions';
import { Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export interface SignatureData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
  logo?: string;
  color: string;
  font: string;
  size: string;
}

export default function EmailSignaturePage() {
  const [signatureData, setSignatureData] = useState<SignatureData>({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    linkedin: '',
    twitter: '',
    facebook: '',
    instagram: '',
    color: '#2563eb',
    font: 'Arial',
    size: '12px'
  });

  const generateSignatureText = () => {
    return generateHTMLSignature(signatureData);
  };

  const generateHTMLSignature = (data: SignatureData): string => {
    const socialLinks = [];
    if (data.linkedin) socialLinks.push(`<a href="${data.linkedin}" style="color: ${data.color}; text-decoration: none;">LinkedIn</a>`);
    if (data.twitter) socialLinks.push(`<a href="${data.twitter}" style="color: ${data.color}; text-decoration: none;">Twitter</a>`);
    if (data.facebook) socialLinks.push(`<a href="${data.facebook}" style="color: ${data.color}; text-decoration: none;">Facebook</a>`);
    if (data.instagram) socialLinks.push(`<a href="${data.instagram}" style="color: ${data.color}; text-decoration: none;">Instagram</a>`);

    return `
<table cellpadding="0" cellspacing="0" style="font-family: ${data.font}, sans-serif; font-size: ${data.size}; color: #333;">
  <tr>
    ${data.logo ? `<td style="padding-right: 15px;"><img src="${data.logo}" alt="${data.company}" style="max-height: 60px; max-width: 120px;"></td>` : ''}
    <td>
      <div style="line-height: 1.4;">
        <div style="font-weight: bold; color: ${data.color}; font-size: 16px;">${data.name}</div>
        ${data.title ? `<div style="color: #666; font-size: 14px;">${data.title}</div>` : ''}
        ${data.company ? `<div style="color: #666; font-size: 14px;">${data.company}</div>` : ''}
        <div style="margin-top: 8px;">
          ${data.email ? `<div>📧 <a href="mailto:${data.email}" style="color: ${data.color}; text-decoration: none;">${data.email}</a></div>` : ''}
          ${data.phone ? `<div>📞 <a href="tel:${data.phone}" style="color: ${data.color}; text-decoration: none;">${data.phone}</a></div>` : ''}
          ${data.website ? `<div>🌐 <a href="${data.website}" style="color: ${data.color}; text-decoration: none;">${data.website}</a></div>` : ''}
          ${data.address ? `<div>📍 ${data.address}</div>` : ''}
        </div>
        ${socialLinks.length > 0 ? `<div style="margin-top: 8px;">${socialLinks.join(' | ')}</div>` : ''}
      </div>
    </td>
  </tr>
</table>`.trim();
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Email Signature Generator
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Create professional email signatures with custom styling and social links
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Signature Details
            </h2>
            <SignatureForm 
              data={signatureData} 
              onChange={setSignatureData} 
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Preview
              </h2>
              <div className="flex gap-2">
                <CopyButton text={generateSignatureText()} label="Copy HTML" />
                <ExportOptions data={signatureData} />
              </div>
            </div>
            <SignaturePreview data={signatureData} />
          </div>
        </div>
      </div>
    </div>
  );
}
