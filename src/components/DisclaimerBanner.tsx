import React, { useState } from 'react';
import { ShieldCheck, Info, X } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-[#131921] text-gray-300 text-xs py-2 px-4 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-400 text-gray-900 font-bold text-[10px]">
            i
          </span>
          <span className="font-medium text-gray-200">
            <strong>Affiliate Disclosure:</strong> As an Amazon Associate I earn from qualifying purchases.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer"
          >
            {showDetails ? 'Hide details' : 'How this works'}
          </button>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <span className="text-gray-400 hidden sm:inline flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" /> 100% Free for buyers
          </span>
        </div>
      </div>

      {showDetails && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-gray-800 text-[11px] text-gray-400 flex items-start justify-between">
          <p className="leading-relaxed pr-4">
            Amazon Best Finder Pro is an independent comparison and deal discovery engine. Product prices and availability are accurate as of the date/time indicated and are subject to change. Any price and availability information displayed on Amazon at the time of purchase will apply to the purchase of this product. When you click our links and make a purchase, we may receive a small commission at zero extra cost to you.
          </p>
          <button
            onClick={() => setShowDetails(false)}
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
