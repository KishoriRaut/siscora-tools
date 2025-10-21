'use client';

import { SignatureData } from '@/app/tools/email-signature/page';
import { Linkedin, Twitter, Facebook, Instagram, Mail, Phone, Globe, MapPin } from 'lucide-react';

interface SignaturePreviewProps {
  data: SignatureData;
}

export function SignaturePreview({ data }: SignaturePreviewProps) {
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

  const renderPreview = () => {
    if (!data.name && !data.email) {
      return (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          <div className="text-6xl mb-4">📧</div>
          <p>Fill in your details to see the signature preview</p>
        </div>
      );
    }

    return (
      <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
        <div 
          className="signature-preview"
          dangerouslySetInnerHTML={{ __html: generateHTMLSignature(data) }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        This is how your signature will appear in emails:
      </div>
      {renderPreview()}
    </div>
  );
}
