import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

export default function CodeEditor({ value, onChange, placeholder, language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={handleCopy}
          className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-all"
          title="Copy code"
        >
          {copied ? <FiCheck className="text-green-400" /> : <FiCopy className="text-gray-300" />}
        </button>
      </div>
      <textarea
        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-secondary font-mono text-sm text-gray-100 resize-none"
        rows="20"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck="false"
      />
      <div className="absolute bottom-2 right-2 text-xs text-gray-500">
        {value.split('\n').length} lines
      </div>
    </div>
  );
}
