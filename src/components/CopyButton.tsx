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
      className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
        copied
          ? 'bg-green-500 text-white'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      }`}
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
