import React from 'react';
import { ProductCategory } from '../types';
import { ShieldCheck, Heart, Sparkles, ExternalLink } from 'lucide-react';

interface FooterProps {
  affiliateTag: string;
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenAdmin: () => void;
  onNavigateBlog: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  affiliateTag,
  onSelectCategory,
  onOpenAdmin,
  onNavigateBlog,
}) => {
  return (
    <footer className="bg-[#131921] text-gray-400 text-xs border-t border-gray-800 pt-12 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-extrabold text-sm">
              <span className="w-6 h-6 rounded-lg bg-amber-400 text-gray-950 flex items-center justify-center font-black text-sm">
                a
              </span>
              <span>Amazon Best Finder Pro</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-xs">
              The premier AI-powered deal intelligence and price history search engine. Featuring automated camelcamelcamel pricing charts, viral TikTok finds, and bilingual English & Urdu Gemini analyses.
            </p>
            <div className="pt-1">
              <span className="font-mono text-[11px] text-amber-400 bg-gray-800 px-2 py-1 rounded-md">
                Active Partner Tag: {affiliateTag}
              </span>
            </div>
          </div>

          {/* Col 2: Deal Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Top Deal Engines</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('under-50')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  ⚡ Best Under $50
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('bestsellers')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  🏆 Best Sellers Today
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('viral-tiktok')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  📱 Viral TikTok Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('tech')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  🎧 Tech & Noise-Cancelling Audio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('home')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  🍳 Kitchen & Home Essentials
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tools & Resources */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Smart Shopping Tools</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onNavigateBlog} className="hover:text-amber-400 transition-colors text-left">
                  📖 SEO Buying Guides & Product Reviews
                </button>
              </li>
              <li>
                <span className="text-gray-400">
                  🐪 CamelCamelCamel Historical Low Engine
                </span>
              </li>
              <li>
                <span className="text-gray-400">
                  ✨ Gemini Dual English & Urdu AI Breakdown
                </span>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-amber-400 transition-colors text-left">
                  ⚙️ Admin Portal & PA-API 5.0 Settings
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Compliance & Trust */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Amazon Associates & Trust</h4>
            <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 text-[11px] leading-relaxed text-gray-300">
              <strong className="text-amber-400">FTC Disclosure:</strong> As an Amazon Associate, this site earns from qualifying purchases. Prices, promotions, and availability are subject to change.
            </div>
            <div className="flex items-center gap-3 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Amazon Associates Certified</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-wrap items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            © {new Date().getFullYear()} Amazon Best Finder Pro. Amazon, Prime, Echo, Kindle and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenAdmin} className="hover:text-gray-300">Admin Dashboard</button>
            <span>•</span>
            <button onClick={onNavigateBlog} className="hover:text-gray-300">Guides</button>
            <span>•</span>
            <span>Tag: {affiliateTag}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
