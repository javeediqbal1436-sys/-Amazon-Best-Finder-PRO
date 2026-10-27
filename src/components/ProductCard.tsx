import React from 'react';
import { Product } from '../types';
import { buildAmazonAffiliateUrl, trackProductClick } from '../utils/affiliate';
import {
  Star,
  Sparkles,
  Share2,
  Check,
  TrendingDown,
  ShoppingBag,
  ExternalLink,
  Flame,
  Plus
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  affiliateTag: string;
  onOpenDetails: (product: Product) => void;
  onOpenAiReview: (product: Product) => void;
  onOpenShare: (product: Product) => void;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
  canCompareMore: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  affiliateTag,
  onOpenDetails,
  onOpenAiReview,
  onOpenShare,
  isCompared,
  onToggleCompare,
  canCompareMore,
}) => {
  const affiliateUrl = buildAmazonAffiliateUrl(product.asin, affiliateTag);
  const isAllTimeLow = product.price <= product.lowestPriceEver * 1.02;

  const handleBuyClick = (e: React.MouseEvent) => {
    // Non-blocking track
    trackProductClick(
      product.id,
      product.title,
      product.asin,
      product.price,
      'ProductCard Buy Button',
      product.category
    );
  };

  return (
    <div className="group relative bg-white dark:bg-[#161b26] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-amber-400 dark:hover:border-amber-500/50">
      {/* Top Badges Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1">
          {product.discountPercent > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-red-600 text-white shadow-xs">
              <Flame className="w-3 h-3 mr-0.5" />
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-gray-950 shadow-xs">
              #1 Best Seller
            </span>
          )}
          {product.isTikTokViral && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-600 text-white shadow-xs">
              Viral TikTok
            </span>
          )}
        </div>

        {/* Share Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenShare(product);
          }}
          title="Share Deal"
          className="pointer-events-auto p-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:text-amber-500 shadow-sm backdrop-blur-xs transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image */}
      <div
        onClick={() => onOpenDetails(product)}
        className="relative w-full h-52 bg-white dark:bg-gray-900/40 p-6 flex items-center justify-center overflow-hidden cursor-pointer"
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Prime Badge overlay */}
        {product.isPrime && (
          <div className="absolute bottom-2 left-3 bg-[#002f36]/90 text-cyan-300 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border border-cyan-500/30">
            prime
          </div>
        )}

        {/* CamelCamelCamel Low Alert Tag */}
        {isAllTimeLow && (
          <div className="absolute bottom-2 right-3 bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-xs">
            <TrendingDown className="w-3 h-3" /> Lowest Price
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium mb-1">
            <span className="uppercase tracking-wider">{product.brand}</span>
            <span className="font-mono text-[10px] text-gray-500">{product.asin}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenDetails(product)}
            className="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-2 hover:text-amber-500 transition-colors cursor-pointer leading-snug mb-2"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : i < product.rating
                      ? 'fill-amber-400/50 text-amber-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-gray-400">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>

          {/* Price & Savings */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-extrabold text-gray-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 ml-auto">
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800/80">
          {/* Quick Buttons: AI Review & Compare */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenAiReview(product)}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              AI Review
            </button>

            <button
              onClick={() => onToggleCompare(product)}
              disabled={!isCompared && !canCompareMore}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-700'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              } ${!isCompared && !canCompareMore ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isCompared ? (
                <>
                  <Check className="w-3.5 h-3.5 text-amber-600" /> Compared
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" /> Compare
                </>
              )}
            </button>
          </div>

          {/* Primary Amazon Affiliate Buy CTA */}
          <a
            href={affiliateUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={handleBuyClick}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-gray-950" />
            <span>Buy on Amazon</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  );
};
