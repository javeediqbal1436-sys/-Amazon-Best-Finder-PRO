import React from 'react';
import { Product } from '../types';
import { buildAmazonAffiliateUrl, trackProductClick } from '../utils/affiliate';
import {
  X,
  Star,
  CheckCircle2,
  XCircle,
  ShoppingBag,
  ExternalLink,
  Trash2,
  Sparkles,
  Award,
  TrendingDown
} from 'lucide-react';

interface ProductComparisonModalProps {
  products: Product[];
  affiliateTag: string;
  onClose: () => void;
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
}

export const ProductComparisonModal: React.FC<ProductComparisonModalProps> = ({
  products,
  affiliateTag,
  onClose,
  onRemoveProduct,
  onClearAll,
}) => {
  // Find product with highest AI score or best value
  const bestScoreProduct = React.useMemo(() => {
    if (products.length === 0) return null;
    return [...products].sort((a, b) => (b.aiReview?.score || 0) - (a.aiReview?.score || 0))[0];
  }, [products]);

  const handleBuy = (p: Product) => {
    trackProductClick(
      p.id,
      p.title,
      p.asin,
      p.price,
      'Comparison Modal',
      p.category
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-white dark:bg-[#131722] border border-gray-200 dark:border-gray-800 rounded-3xl max-w-6xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-[#131722]/95 backdrop-blur-md px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              Product Comparison Matrix
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                {products.length} / 4 Products Selected
              </span>
            </h2>
            <p className="text-xs text-gray-500">
              Side-by-side specifications, prices, camelcamelcamel lows, and Gemini AI ratings
            </p>
          </div>

          <div className="flex items-center gap-3">
            {products.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        {products.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-gray-500 text-sm">No products selected for comparison yet.</p>
            <p className="text-xs text-gray-400">
              Click the "Compare" button on any product card to add up to 4 items here.
            </p>
          </div>
        ) : (
          <div className="p-6 overflow-x-auto">
            <div className="min-w-[650px] grid" style={{ gridTemplateColumns: `200px repeat(${products.length}, minmax(180px, 1fr))` }}>
              {/* Row 1: Product Header */}
              <div className="p-3 font-bold text-xs uppercase tracking-wider text-gray-400 flex items-end">
                Product
              </div>
              {products.map((p) => {
                const isWinner = bestScoreProduct?.id === p.id && products.length > 1;
                return (
                  <div key={p.id} className="p-3 border-l border-gray-100 dark:border-gray-800 relative space-y-2">
                    {isWinner && (
                      <div className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-400 text-gray-950">
                        <Award className="w-3 h-3" /> AI Top Pick
                      </div>
                    )}
                    <button
                      onClick={() => onRemoveProduct(p.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
                      title="Remove from comparison"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="w-full h-32 bg-gray-50 dark:bg-gray-800/40 rounded-xl p-2 flex items-center justify-center">
                      <img src={p.imageUrl} alt={p.title} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="font-bold text-xs text-gray-900 dark:text-white line-clamp-2" title={p.title}>
                      {p.title}
                    </div>
                    <div className="text-[11px] text-gray-400">{p.brand} • <span className="font-mono">{p.asin}</span></div>
                  </div>
                );
              })}

              {/* Row 2: Price & Discount */}
              <div className="p-3 font-semibold text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                Current Price
              </div>
              {products.map((p) => (
                <div key={p.id} className="p-3 border-t border-l border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                  <div className="text-base font-extrabold text-gray-900 dark:text-white">
                    ${p.price.toFixed(2)}
                  </div>
                  {p.discountPercent > 0 && (
                    <div className="text-[11px] text-red-600 dark:text-red-400 font-bold">
                      -{p.discountPercent}% OFF (Was ${p.originalPrice.toFixed(2)})
                    </div>
                  )}
                </div>
              ))}

              {/* Row 3: CamelCamelCamel Lowest Ever */}
              <div className="p-3 font-semibold text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
                Lowest Historical Price
              </div>
              {products.map((p) => (
                <div key={p.id} className="p-3 border-t border-l border-gray-100 dark:border-gray-800">
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    ${p.lowestPriceEver.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-gray-400">
                    {p.price <= p.lowestPriceEver * 1.02 ? 'At historical low!' : `Diff: +$${(p.price - p.lowestPriceEver).toFixed(2)}`}
                  </span>
                </div>
              ))}

              {/* Row 4: Customer Rating */}
              <div className="p-3 font-semibold text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                Customer Rating
              </div>
              {products.map((p) => (
                <div key={p.id} className="p-3 border-t border-l border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{p.rating.toFixed(1)} / 5</span>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {p.reviewCount.toLocaleString()} reviews
                  </div>
                </div>
              ))}

              {/* Row 5: Prime & Availability */}
              <div className="p-3 font-semibold text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
                Prime Shipping & Stock
              </div>
              {products.map((p) => (
                <div key={p.id} className="p-3 border-t border-l border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                    {p.isPrime ? '✓ Prime 1-Day' : 'Standard Delivery'}
                  </span>
                  <div className="text-[10px] text-emerald-600 font-medium mt-0.5">{p.availability}</div>
                </div>
              ))}

              {/* Row 6: Gemini AI Value Score */}
              <div className="p-3 font-semibold text-xs text-indigo-600 dark:text-indigo-400 border-t border-gray-100 dark:border-gray-800 bg-indigo-50/30 dark:bg-indigo-950/20">
                Gemini AI Value Score
              </div>
              {products.map((p) => (
                <div key={p.id} className="p-3 border-t border-l border-gray-100 dark:border-gray-800 bg-indigo-50/30 dark:bg-indigo-950/20">
                  <div className="text-base font-extrabold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    <span>{p.aiReview?.score.toFixed(1) || '9.0'} / 10</span>
                  </div>
                </div>
              ))}

              {/* Row 7: AI Verdict Summary */}
              <div className="p-3 font-semibold text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
                AI Verdict
              </div>
              {products.map((p) => (
                <div key={p.id} className="p-3 border-t border-l border-gray-100 dark:border-gray-800 text-xs text-gray-700 dark:text-gray-300">
                  <p className="line-clamp-3 text-[11px] leading-relaxed">
                    {p.aiReview?.verdictEn || 'Outstanding quality and value.'}
                  </p>
                </div>
              ))}

              {/* Row 8: Buy CTA Buttons */}
              <div className="p-3 font-semibold text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40">
                Amazon Action
              </div>
              {products.map((p) => {
                const url = buildAmazonAffiliateUrl(p.asin, affiliateTag);
                return (
                  <div key={p.id} className="p-3 border-t border-l border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40">
                    <a
                      href={url}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      onClick={() => handleBuy(p)}
                      className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Buy on Amazon</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
