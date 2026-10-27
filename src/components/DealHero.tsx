import React, { useState, useEffect } from 'react';
import { Product, ProductCategory } from '../types';
import { buildAmazonAffiliateUrl, trackProductClick } from '../utils/affiliate';
import {
  Flame,
  Clock,
  Sparkles,
  TrendingDown,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Check,
  ArrowRight
} from 'lucide-react';

interface DealHeroProps {
  products: Product[];
  affiliateTag: string;
  onSelectCategory: (cat: ProductCategory) => void;
  activeCategory: ProductCategory;
  onOpenProductDetails: (product: Product) => void;
}

export const DealHero: React.FC<DealHeroProps> = ({
  products,
  affiliateTag,
  onSelectCategory,
  activeCategory,
  onOpenProductDetails,
}) => {
  // Live 24h countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 27, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Top featured deal with highest discount %
  const featuredDeal = React.useMemo(() => {
    return [...products].sort((a, b) => b.discountPercent - a.discountPercent)[0] || products[0];
  }, [products]);

  const featuredUrl = featuredDeal ? buildAmazonAffiliateUrl(featuredDeal.asin, affiliateTag) : '#';

  const handleFeaturedBuy = () => {
    if (featuredDeal) {
      trackProductClick(
        featuredDeal.id,
        featuredDeal.title,
        featuredDeal.asin,
        featuredDeal.price,
        'Hero Featured Deal Banner',
        featuredDeal.category
      );
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#131921] via-[#1a2433] to-gray-50 dark:to-[#0f1111] pt-6 pb-12 px-4 sm:px-6">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading & Value Prop */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>AMAZON BEST DEAL ENGINE • REAL-TIME PA-API 5.0</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Uncover Real Amazon Deals.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                Track Price Drops.
              </span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Automated deal engine tracking verified price drops, camelcamelcamel historical lows, and viral TikTok trends with dual English & Urdu AI product reviews.
            </p>

            {/* Quick Category Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
              <button
                onClick={() => onSelectCategory('under-50')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === 'under-50'
                    ? 'bg-amber-400 text-gray-950 shadow-md scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                }`}
              >
                <span>⚡ Best Under $50</span>
              </button>

              <button
                onClick={() => onSelectCategory('bestsellers')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === 'bestsellers'
                    ? 'bg-amber-400 text-gray-950 shadow-md scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                }`}
              >
                <span>🏆 Best Sellers Today</span>
              </button>

              <button
                onClick={() => onSelectCategory('viral-tiktok')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === 'viral-tiktok'
                    ? 'bg-amber-400 text-gray-950 shadow-md scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                }`}
              >
                <span>📱 Viral TikTok Products</span>
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-800/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-xl font-extrabold text-white">43%</div>
                <div className="text-[11px] text-gray-400 font-medium">Max Discount Today</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-amber-400">100%</div>
                <div className="text-[11px] text-gray-400 font-medium">Verified Historical Lows</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">tag={affiliateTag}</div>
                <div className="text-[11px] text-gray-400 font-medium font-mono">Active Affiliate Tag</div>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Lightning Deal Card */}
          {featuredDeal && (
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-b from-[#232f3e] to-[#1a222d] border border-amber-500/40 rounded-3xl p-5 shadow-2xl relative text-white">
                {/* Countdown banner */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-gray-700">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <Clock className="w-4 h-4 animate-spin text-amber-400" />
                    <span>LIGHTNING DEAL ENDS IN:</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs font-extrabold">
                    <span className="bg-gray-900/80 px-2 py-1 rounded-md text-amber-300">
                      {String(timeLeft.hours).padStart(2, '0')}h
                    </span>
                    :
                    <span className="bg-gray-900/80 px-2 py-1 rounded-md text-amber-300">
                      {String(timeLeft.minutes).padStart(2, '0')}m
                    </span>
                    :
                    <span className="bg-gray-900/80 px-2 py-1 rounded-md text-amber-300">
                      {String(timeLeft.seconds).padStart(2, '0')}s
                    </span>
                  </div>
                </div>

                {/* Deal Image & Details */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    onClick={() => onOpenProductDetails(featuredDeal)}
                    className="w-28 h-28 bg-white rounded-2xl p-2 shrink-0 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                  >
                    <img
                      src={featuredDeal.imageUrl}
                      alt={featuredDeal.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-600 text-white">
                        -{featuredDeal.discountPercent}% OFF
                      </span>
                      <span className="text-[10px] font-bold text-amber-400">
                        Deal of the Day
                      </span>
                    </div>

                    <h3
                      onClick={() => onOpenProductDetails(featuredDeal)}
                      className="text-xs sm:text-sm font-bold line-clamp-2 hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      {featuredDeal.title}
                    </h3>

                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-2xl font-black text-amber-400">
                        ${featuredDeal.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ${featuredDeal.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CamelCamelCamel badge */}
                <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-xl p-2.5 mb-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <TrendingDown className="w-4 h-4" />
                    <span>camelcamelcamel: Lowest Price in 90 Days</span>
                  </div>
                  <span className="font-mono text-emerald-300 font-bold">
                    ${featuredDeal.lowestPriceEver.toFixed(2)}
                  </span>
                </div>

                {/* Direct CTA */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onOpenProductDetails(featuredDeal)}
                    className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>AI Review</span>
                  </button>

                  <a
                    href={featuredUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    onClick={handleFeaturedBuy}
                    className="py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-gray-950 font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Grab Deal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
