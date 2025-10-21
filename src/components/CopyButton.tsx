'use client';

import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  onCopy: () => void;
  copied: boolean;
}

export function CopyButton({ onCopy, copied }: CopyButtonProps) {
  return (
    <button
      onClick={onCopy}
      disabled={copied}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        copied
          ? 'bg-green-500 text-white cursor-default focus:ring-green-500'
          : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg focus:ring-blue-500 active:bg-blue-700'
      }`}
      aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          Copy HTML
        </>
      )}
    </button>
  );
}
