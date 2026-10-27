import React, { useState } from 'react';
import { Product } from '../types';
import {
  buildAmazonAffiliateUrl,
  buildWhatsAppShareUrl,
  buildFacebookShareUrl,
  buildTwitterShareUrl,
  copyToClipboard
} from '../utils/affiliate';
import {
  X,
  Share2,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Facebook,
  Twitter,
  Send
} from 'lucide-react';

interface ShareModalProps {
  product: Product;
  affiliateTag: string;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ product, affiliateTag, onClose }) => {
  const [copied, setCopied] = useState(false);
  const affiliateUrl = buildAmazonAffiliateUrl(product.asin, affiliateTag);
  const whatsappUrl = buildWhatsAppShareUrl(product.title, product.price, affiliateUrl);
  const facebookUrl = buildFacebookShareUrl(affiliateUrl);
  const twitterUrl = buildTwitterShareUrl(product.title, affiliateUrl);
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(affiliateUrl)}&text=${encodeURIComponent(`Check out this deal: ${product.title} for $${product.price.toFixed(2)}`)}`;

  const handleCopy = async () => {
    const ok = await copyToClipboard(affiliateUrl);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-[#1a1f2c] border border-gray-200 dark:border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Share Deal</h3>
            <p className="text-xs text-gray-500">Includes active affiliate tag: <span className="font-mono font-bold text-amber-600">{affiliateTag}</span></p>
          </div>
        </div>

        {/* Product preview */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl mb-5 border border-gray-100 dark:border-gray-800">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-14 h-14 object-cover rounded-lg shrink-0 border border-gray-200 dark:border-gray-700"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-1">{product.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">${product.price.toFixed(2)}</span>
              <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300">-{product.discountPercent}% OFF</span>
            </div>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 font-medium text-xs transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            WhatsApp
          </a>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30 font-medium text-xs transition-colors cursor-pointer"
          >
            <Facebook className="w-4 h-4 fill-current" />
            Facebook
          </a>

          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] border border-[#1DA1F2]/30 font-medium text-xs transition-colors cursor-pointer"
          >
            <Twitter className="w-4 h-4 fill-current" />
            Twitter / X
          </a>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#0088cc]/10 hover:bg-[#0088cc]/20 text-[#0088cc] border border-[#0088cc]/30 font-medium text-xs transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Telegram
          </a>
        </div>

        {/* Copy Affiliate Link Bar */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Direct Affiliate Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={affiliateUrl}
              className="flex-1 text-xs px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-mono truncate select-all"
            />
            <button
              onClick={handleCopy}
              className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold text-xs transition-colors shadow-xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-gray-900" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy
                </>
              )}
            </button>
          </div>
          {copied && (
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1.5">
              ✓ Affiliate link copied with tag {affiliateTag}!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
