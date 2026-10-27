import React, { useState } from 'react';
import { BlogPost, Product } from '../types';
import { buildAmazonAffiliateUrl, trackProductClick } from '../utils/affiliate';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ShoppingBag,
  ExternalLink,
  Star,
  Share2,
  TrendingDown,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
  products: Product[];
  affiliateTag: string;
  onOpenProductDetails: (product: Product) => void;
  onBackToDeals: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  posts,
  products,
  affiliateTag,
  onOpenProductDetails,
  onBackToDeals,
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Helper to find embedded product objects
  const getEmbeddedProducts = (productIds: string[]) => {
    return productIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  };

  const handleProductBuy = (product: Product) => {
    trackProductClick(
      product.id,
      product.title,
      product.asin,
      product.price,
      `Blog Post: ${selectedPost?.title || 'SEO Article'}`,
      product.category
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {selectedPost ? (
        /* SINGLE ARTICLE VIEW */
        <article className="space-y-6 animate-in fade-in">
          {/* Back button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-amber-500 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Buying Guides</span>
          </button>

          {/* Article Header */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {selectedPost.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {selectedPost.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-4">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> {selectedPost.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {selectedPost.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {selectedPost.readTime}
              </span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden shadow-md">
            <img
              src={selectedPost.coverImage}
              alt={selectedPost.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Lead Content */}
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed space-y-4">
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
              {selectedPost.excerpt}
            </p>
            <div className="whitespace-pre-line text-sm sm:text-base">
              {selectedPost.content}
            </div>
          </div>

          {/* Auto Embedded Products Section */}
          <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span>Featured Products in this Guide</span>
                  <span className="text-xs font-normal text-gray-400">
                    (Auto-synced with live Amazon pricing & tag: <code className="font-mono text-amber-500 font-bold">{affiliateTag}</code>)
                  </span>
                </h3>
                <p className="text-xs text-gray-500">
                  Click any item to inspect its camelcamelcamel price history chart or buy directly on Amazon.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {getEmbeddedProducts(selectedPost.featuredProductIds).map((product) => {
                const affiliateUrl = buildAmazonAffiliateUrl(product.asin, affiliateTag);
                return (
                  <div
                    key={product.id}
                    className="p-4 rounded-2xl bg-white dark:bg-[#1a1f2c] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div className="flex gap-3 mb-3">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        onClick={() => onOpenProductDetails(product)}
                        className="w-20 h-20 object-contain rounded-xl p-1 bg-gray-50 dark:bg-gray-800 shrink-0 cursor-pointer hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400">{product.brand}</span>
                        <h4
                          onClick={() => onOpenProductDetails(product)}
                          className="text-xs font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-amber-500 transition-colors cursor-pointer"
                        >
                          {product.title}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-base font-extrabold text-gray-900 dark:text-white">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.discountPercent > 0 && (
                            <span className="text-[10px] font-bold text-red-600 bg-red-50 dark:bg-red-950/40 px-1.5 py-0.2 rounded">
                              -{product.discountPercent}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                      <button
                        onClick={() => onOpenProductDetails(product)}
                        className="flex-1 py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-semibold text-center cursor-pointer"
                      >
                        Price Chart & AI
                      </button>

                      <a
                        href={affiliateUrl}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        onClick={() => handleProductBuy(product)}
                        className="flex-1 py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-gray-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Amazon</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </article>
      ) : (
        /* ARTICLES INDEX VIEW */
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>SEO BUYING GUIDES & PRODUCT COMPARISONS</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                Expert Amazon Buying Guides
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                In-depth testing, historical price tracking tips, and curated deals that pass our quality standards.
              </p>
            </div>

            <button
              onClick={onBackToDeals}
              className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-bold transition-colors cursor-pointer"
            >
              Back to Deals
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group bg-white dark:bg-[#161b26] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:border-amber-400"
              >
                <div>
                  <div className="w-full h-44 overflow-hidden relative">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 left-2 flex gap-1">
                      {post.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="bg-gray-950/80 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-gray-400">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Guide & View Products →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
