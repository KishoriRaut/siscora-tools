'use client';

import { SignatureData } from '@/app/page';
import { useState } from 'react';
import { Upload, User, Mail, Phone, Globe, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

export function SignatureForm({ data, onChange }: SignatureFormProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleInputChange = (field: keyof SignatureData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
        onChange({ ...data, logo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClasses = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white";
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <User className="w-5 h-5" />
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Full Name *</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={inputClasses}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <label className={labelClasses}>Job Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={inputClasses}
              placeholder="Software Engineer"
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Company</label>
          <input
            type="text"
            value={data.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            className={inputClasses}
            placeholder="Acme Corporation"
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Contact Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Email *</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={inputClasses}
              placeholder="john@example.com"
              required
            />
          </div>
          
          <div>
            <label className={labelClasses}>Phone</label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={inputClasses}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Website</label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className={inputClasses}
            placeholder="https://www.example.com"
          />
        </div>

        <div>
          <label className={labelClasses}>Address</label>
          <textarea
            value={data.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className={inputClasses}
            placeholder="123 Main St, City, State 12345"
            rows={2}
          />
        </div>
      </div>

      {/* Social Media */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Linkedin className="w-5 h-5" />
          Social Media
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>LinkedIn</label>
            <input
              type="url"
              value={data.linkedin}
              onChange={(e) => handleInputChange('linkedin', e.target.value)}
              className={inputClasses}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          
          <div>
            <label className={labelClasses}>Twitter</label>
            <input
              type="url"
              value={data.twitter}
              onChange={(e) => handleInputChange('twitter', e.target.value)}
              className={inputClasses}
              placeholder="https://twitter.com/username"
            />
          </div>
          
          <div>
            <label className={labelClasses}>Facebook</label>
            <input
              type="url"
              value={data.facebook}
              onChange={(e) => handleInputChange('facebook', e.target.value)}
              className={inputClasses}
              placeholder="https://facebook.com/username"
            />
          </div>
          
          <div>
            <label className={labelClasses}>Instagram</label>
            <input
              type="url"
              value={data.instagram}
              onChange={(e) => handleInputChange('instagram', e.target.value)}
              className={inputClasses}
              placeholder="https://instagram.com/username"
            />
          </div>
        </div>
      </div>

      {/* Logo Upload */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Logo
        </h3>
        
          <div>
            <label className={labelClasses}>Company Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              aria-label="Upload company logo"
            />
            {logoPreview && (
              <div className="mt-2">
                <img src={logoPreview} alt="Logo preview" className="max-h-20 max-w-32 object-contain" />
              </div>
            )}
          </div>
      </div>

      {/* Styling Options */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Styling</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClasses}>Color</label>
            <input
              type="color"
              value={data.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
              className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer"
              aria-label="Choose signature color"
            />
          </div>
          
          <div>
            <label className={labelClasses}>Font</label>
            <select
              value={data.font}
              onChange={(e) => handleInputChange('font', e.target.value)}
              className={inputClasses}
              aria-label="Choose font family"
            >
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>
          
          <div>
            <label className={labelClasses}>Font Size</label>
            <select
              value={data.size}
              onChange={(e) => handleInputChange('size', e.target.value)}
              className={inputClasses}
              aria-label="Choose font size"
            >
              <option value="10px">10px</option>
              <option value="11px">11px</option>
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
