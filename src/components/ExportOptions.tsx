'use client';

import { SignatureData } from '@/app/tools/email-signature/page';
import { Download, FileText, Code } from 'lucide-react';
import { useState } from 'react';

interface ExportOptionsProps {
  data: SignatureData;
}

export function ExportOptions({ data }: ExportOptionsProps) {
  const [showDropdown, setShowDropdown] = useState(false);

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

  const generatePlainTextSignature = (data: SignatureData): string => {
    let signature = '';
    
    if (data.name) signature += data.name + '\n';
    if (data.title) signature += data.title + '\n';
    if (data.company) signature += data.company + '\n';
    
    signature += '\n';
    
    if (data.email) signature += `Email: ${data.email}\n`;
    if (data.phone) signature += `Phone: ${data.phone}\n`;
    if (data.website) signature += `Website: ${data.website}\n`;
    if (data.address) signature += `Address: ${data.address}\n`;
    
    const socialLinks = [];
    if (data.linkedin) socialLinks.push(`LinkedIn: ${data.linkedin}`);
    if (data.twitter) socialLinks.push(`Twitter: ${data.twitter}`);
    if (data.facebook) socialLinks.push(`Facebook: ${data.facebook}`);
    if (data.instagram) socialLinks.push(`Instagram: ${data.instagram}`);
    
    if (socialLinks.length > 0) {
      signature += '\n' + socialLinks.join(' | ');
    }
    
    return signature.trim();
  };

  const downloadHTML = () => {
    const htmlContent = generateHTMLSignature(data);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-signature.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPlainText = () => {
    const textContent = generatePlainTextSignature(data);
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-signature.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyHTML = async () => {
    try {
      await navigator.clipboard.writeText(generateHTMLSignature(data));
    } catch (err) {
      console.error('Failed to copy HTML: ', err);
    }
  };

  const copyPlainText = async () => {
    try {
      await navigator.clipboard.writeText(generatePlainTextSignature(data));
    } catch (err) {
      console.error('Failed to copy plain text: ', err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-medium transition-colors"
      >
        <Download className="w-4 h-4" />
        Export
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 z-10">
          <div className="py-1">
            <button
              onClick={() => {
                downloadHTML();
                setShowDropdown(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <Code className="w-4 h-4" />
              Download HTML
            </button>
            <button
              onClick={() => {
                downloadPlainText();
                setShowDropdown(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <FileText className="w-4 h-4" />
              Download Plain Text
            </button>
            <button
              onClick={() => {
                copyHTML();
                setShowDropdown(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <Code className="w-4 h-4" />
              Copy HTML
            </button>
            <button
              onClick={() => {
                copyPlainText();
                setShowDropdown(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <FileText className="w-4 h-4" />
              Copy Plain Text
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
