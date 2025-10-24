'use client';

import { useState } from 'react';
import { Calendar, ArrowRightLeft, CalendarDays, Globe, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CopyButton } from '@/components/CopyButton';

interface NepaliDate {
  year: number;
  month: number;
  day: number;
}

interface EnglishDate {
  year: number;
  month: number;
  day: number;
}

// Nepali calendar months
const NEPALI_MONTHS = [
  'बैशाख', 'जेष्ठ', 'आषाढ', 'श्रावण', 'भाद्र', 'आश्विन',
  'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र'
];

const NEPALI_MONTHS_EN = [
  'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
  'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
];

// English calendar months
const ENGLISH_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function DateConverterPage() {
  const [nepaliDate, setNepaliDate] = useState<NepaliDate>({ year: 2081, month: 1, day: 1 });
  const [englishDate, setEnglishDate] = useState<EnglishDate>({ year: 2024, month: 4, day: 14 });
  const [conversionDirection, setConversionDirection] = useState<'nepali-to-english' | 'english-to-nepali'>('nepali-to-english');
  const [result, setResult] = useState<string>('');

  // More accurate conversion using known reference points
  const convertNepaliToEnglish = (nepali: NepaliDate): EnglishDate => {
    // Known reference points for accurate conversion
    // 1980-10-11 (Gregorian) = 2037-06-25 (Bikram Sambat)
    
    // Convert Nepali date to days since epoch
    const nepaliEpoch = { year: 2037, month: 6, day: 25 }; // Reference point
    const englishEpoch = { year: 1980, month: 10, day: 11 }; // Reference point
    
    // Calculate days from reference point
    const nepaliDaysFromEpoch = (nepali.year - nepaliEpoch.year) * 365 + 
                               (nepali.month - nepaliEpoch.month) * 30 + 
                               (nepali.day - nepaliEpoch.day);
    
    // Convert to English date
    const englishDate = new Date(englishEpoch.year, englishEpoch.month - 1, englishEpoch.day);
    englishDate.setDate(englishDate.getDate() + nepaliDaysFromEpoch);
    
    return {
      year: englishDate.getFullYear(),
      month: englishDate.getMonth() + 1,
      day: englishDate.getDate()
    };
  };

  const convertEnglishToNepali = (english: EnglishDate): NepaliDate => {
    // Known reference points for accurate conversion
    // 1980-10-11 (Gregorian) = 2037-06-25 (Bikram Sambat)
    
    const nepaliEpoch = { year: 2037, month: 6, day: 25 }; // Reference point
    const englishEpoch = { year: 1980, month: 10, day: 11 }; // Reference point
    
    // Calculate days difference from reference point
    const englishDate = new Date(english.year, english.month - 1, english.day);
    const epochDate = new Date(englishEpoch.year, englishEpoch.month - 1, englishEpoch.day);
    const daysDiff = Math.floor((englishDate.getTime() - epochDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Convert days to Nepali date
    const nepaliDaysFromEpoch = daysDiff;
    const nepaliYear = nepaliEpoch.year + Math.floor(nepaliDaysFromEpoch / 365);
    const remainingDays = nepaliDaysFromEpoch % 365;
    const nepaliMonth = nepaliEpoch.month + Math.floor(remainingDays / 30);
    const nepaliDay = nepaliEpoch.day + (remainingDays % 30);
    
    // Handle month overflow
    let finalMonth = nepaliMonth;
    let finalDay = nepaliDay;
    let finalYear = nepaliYear;
    
    if (finalDay > 30) {
      finalDay -= 30;
      finalMonth += 1;
    }
    if (finalMonth > 12) {
      finalMonth -= 12;
      finalYear += 1;
    }
    
    return {
      year: finalYear,
      month: Math.max(1, Math.min(12, finalMonth)),
      day: Math.max(1, Math.min(31, finalDay))
    };
  };

  // Remove auto-conversion to prevent infinite loops
  // Users will need to click the "Convert" button to see results

  const handleConvert = () => {
    try {
      if (conversionDirection === 'nepali-to-english') {
        const converted = convertNepaliToEnglish(nepaliDate);
        setEnglishDate(converted);
        setResult(`${nepaliDate.year}/${nepaliDate.month}/${nepaliDate.day} (Nepali) = ${converted.year}/${converted.month}/${converted.day} (English)`);
      } else {
        const converted = convertEnglishToNepali(englishDate);
        setNepaliDate(converted);
        setResult(`${englishDate.year}/${englishDate.month}/${englishDate.day} (English) = ${converted.year}/${converted.month}/${converted.day} (Nepali)`);
      }
    } catch {
      setResult('Error: Invalid date format');
    }
  };

  const handleSwap = () => {
    setConversionDirection(prev => prev === 'nepali-to-english' ? 'english-to-nepali' : 'nepali-to-english');
    setResult('');
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Date Converter Result',
      text: result,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${result}\n\nConverted using: ${window.location.href}`);
        alert('Result copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${result}\n\nConverted using: ${window.location.href}`);
        alert('Result copied to clipboard!');
      } catch (clipboardErr) {
        console.error('Error copying to clipboard:', clipboardErr);
        alert('Unable to share or copy. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Date Converter
                </h1>
                <p className="text-xl text-gray-600">
                  Convert between Nepali and English dates
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Direction Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 flex gap-2">
            <button
              onClick={() => setConversionDirection('nepali-to-english')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                conversionDirection === 'nepali-to-english'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Globe className="w-4 h-4" />
              Nepali to English
            </button>
            <button
              onClick={() => setConversionDirection('english-to-nepali')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                conversionDirection === 'english-to-nepali'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              English to Nepali
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {conversionDirection === 'nepali-to-english' ? 'Nepali Date' : 'English Date'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Input
                    label="Year"
                    type="number"
                    value={conversionDirection === 'nepali-to-english' ? nepaliDate.year : englishDate.year}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      if (conversionDirection === 'nepali-to-english') {
                        setNepaliDate(prev => ({ ...prev, year: value }));
                      } else {
                        setEnglishDate(prev => ({ ...prev, year: value }));
                      }
                    }}
                    placeholder="Year"
                  />
                </div>
                <div>
                  <Input
                    label="Month"
                    type="number"
                    min="1"
                    max="12"
                    value={conversionDirection === 'nepali-to-english' ? nepaliDate.month : englishDate.month}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      if (conversionDirection === 'nepali-to-english') {
                        setNepaliDate(prev => ({ ...prev, month: Math.max(1, Math.min(12, value)) }));
                      } else {
                        setEnglishDate(prev => ({ ...prev, month: Math.max(1, Math.min(12, value)) }));
                      }
                    }}
                    placeholder="Month"
                  />
                </div>
                <div>
                  <Input
                    label="Day"
                    type="number"
                    min="1"
                    max="31"
                    value={conversionDirection === 'nepali-to-english' ? nepaliDate.day : englishDate.day}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      if (conversionDirection === 'nepali-to-english') {
                        setNepaliDate(prev => ({ ...prev, day: Math.max(1, Math.min(31, value)) }));
                      } else {
                        setEnglishDate(prev => ({ ...prev, day: Math.max(1, Math.min(31, value)) }));
                      }
                    }}
                    placeholder="Day"
                  />
                </div>
              </div>

              {/* Month Names Display */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-2">Month Names:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {conversionDirection === 'nepali-to-english' ? (
                    <>
                      <div className="font-medium">Nepali:</div>
                      <div className="text-gray-600">{NEPALI_MONTHS[nepaliDate.month - 1]} ({NEPALI_MONTHS_EN[nepaliDate.month - 1]})</div>
                    </>
                  ) : (
                    <>
                      <div className="font-medium">English:</div>
                      <div className="text-gray-600">{ENGLISH_MONTHS[englishDate.month - 1]}</div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5" />
                {conversionDirection === 'nepali-to-english' ? 'English Date' : 'Nepali Date'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Input
                    label="Year"
                    type="number"
                    value={englishDate.year}
                    readOnly={conversionDirection === 'nepali-to-english'}
                    className={conversionDirection === 'nepali-to-english' ? 'bg-gray-50' : ''}
                    onChange={(e) => {
                      if (conversionDirection === 'english-to-nepali') {
                        const value = parseInt(e.target.value) || 0;
                        setEnglishDate(prev => ({ ...prev, year: value }));
                      }
                    }}
                  />
                </div>
                <div>
                  <Input
                    label="Month"
                    type="number"
                    min="1"
                    max="12"
                    value={englishDate.month}
                    readOnly={conversionDirection === 'nepali-to-english'}
                    className={conversionDirection === 'nepali-to-english' ? 'bg-gray-50' : ''}
                    onChange={(e) => {
                      if (conversionDirection === 'english-to-nepali') {
                        const value = parseInt(e.target.value) || 1;
                        setEnglishDate(prev => ({ ...prev, month: Math.max(1, Math.min(12, value)) }));
                      }
                    }}
                  />
                </div>
                <div>
                  <Input
                    label="Day"
                    type="number"
                    min="1"
                    max="31"
                    value={englishDate.day}
                    readOnly={conversionDirection === 'nepali-to-english'}
                    className={conversionDirection === 'nepali-to-english' ? 'bg-gray-50' : ''}
                    onChange={(e) => {
                      if (conversionDirection === 'english-to-nepali') {
                        const value = parseInt(e.target.value) || 1;
                        setEnglishDate(prev => ({ ...prev, day: Math.max(1, Math.min(31, value)) }));
                      }
                    }}
                  />
                </div>
              </div>

              {/* Month Names Display */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-2">Month Names:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {conversionDirection === 'nepali-to-english' ? (
                    <>
                      <div className="font-medium">English:</div>
                      <div className="text-gray-600">{ENGLISH_MONTHS[englishDate.month - 1]}</div>
                    </>
                  ) : (
                    <>
                      <div className="font-medium">Nepali:</div>
                      <div className="text-gray-600">{NEPALI_MONTHS[nepaliDate.month - 1]} ({NEPALI_MONTHS_EN[nepaliDate.month - 1]})</div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            onClick={handleConvert}
            className="bg-linear-to-r from-blue-600 to-violet-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
          >
            {conversionDirection === 'nepali-to-english' ? 'Convert to English' : 'Convert to Nepali'}
          </Button>
          <Button
            onClick={handleSwap}
            variant="outline"
            className="px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300"
          >
            Swap Direction
          </Button>
        </div>

        {/* Instructions */}
        {!result && (
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-lg">
              👆 Click the "Convert" button above to see the result with copy and share options
            </p>
          </div>
        )}

        {/* Result Display */}
        {result && (
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h4 className="font-semibold text-green-800">Conversion Result:</h4>
                  <div className="flex gap-2 shrink-0">
                    <CopyButton text={result} label="Copy Result" />
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-4 py-2 border border-green-300 text-green-700 hover:bg-green-100 bg-white rounded-lg font-medium transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
                <p className="text-green-700">{result}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Information Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About Date Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">
                This tool helps you convert dates between the Nepali calendar (Bikram Sambat) and the English calendar (Gregorian).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Nepali Calendar (Bikram Sambat)</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Starts from 57 BC (year 1 BS = 57 BC)</li>
                    <li>• 12 months with varying lengths</li>
                    <li>• Used in Nepal for official purposes</li>
                    <li>• Different month names and lengths</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">English Calendar (Gregorian)</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• International standard calendar</li>
                    <li>• 12 months with fixed lengths</li>
                    <li>• Used worldwide for business</li>
                    <li>• Leap years every 4 years</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Important Note:</strong> This conversion tool uses a simplified algorithm based on the 
                  reference point 1980-10-11 (Gregorian) = 2037-06-25 (Bikram Sambat). While this provides 
                  a reasonable approximation, the actual Nepali calendar has complex variations including 
                  different month lengths, leap years, and Adhik Maas (extra months). For official purposes, 
                  legal documents, or precise historical dates, please use official Nepali calendar resources 
                  or specialized conversion services that account for all calendar complexities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
