/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Product, ProductCategory, BlogPost, AIReviewData } from './types';
import { INITIAL_PRODUCTS } from './data/mockProducts';
import { INITIAL_BLOG_POSTS } from './data/blogPosts';
import { Header } from './components/Header';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { DealHero } from './components/DealHero';
import { FiltersBar, FilterState } from './components/FiltersBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProductComparisonModal } from './components/ProductComparisonModal';
import { CompareTray } from './components/CompareTray';
import { ShareModal } from './components/ShareModal';
import { AdminPanel } from './components/AdminPanel';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { testFirestoreConnection } from './firebase';
import {
  Flame,
  Award,
  Video,
  Layers,
  Sparkles,
  TrendingDown,
  ShoppingBag,
  Home as HomeIcon,
  BookOpen,
  Settings,
  Search
} from 'lucide-react';

function AppContent() {
  // Products Catalog State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('abf_custom_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...parsed, ...INITIAL_PRODUCTS];
      } catch (e) {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Blog Posts State
  const [blogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);

  // Affiliate Tag State (Defaults to salman2008-20)
  const [affiliateTag, setAffiliateTag] = useState<string>(() => {
    return localStorage.getItem('abf_affiliate_tag') || 'salman2008-20';
  });

  // Dark Mode State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('abf_dark_mode') === 'true' || true;
  });

  // Navigation State: 'deals' | 'blog'
  const [currentView, setCurrentView] = useState<'deals' | 'blog'>('deals');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    priceRange: 'all',
    sortBy: 'discount',
    primeOnly: false,
    minDiscount: 0,
  });

  // Modals State
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);
  const [shareProduct, setShareProduct] = useState<Product | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  // Compared Products Array (Max 4)
  const [comparedProductIds, setComparedProductIds] = useState<string[]>([]);

  // Dark Mode side effect on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('abf_dark_mode', String(darkMode));
  }, [darkMode]);

  // Sync settings with backend & test Firestore on mount
  useEffect(() => {
    testFirestoreConnection();
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.affiliateTag) {
          setAffiliateTag(data.affiliateTag);
          localStorage.setItem('abf_affiliate_tag', data.affiliateTag);
        }
      })
      .catch(() => {});
  }, []);

  const handleUpdateAffiliateTag = (tag: string) => {
    setAffiliateTag(tag);
    localStorage.setItem('abf_affiliate_tag', tag);
  };

  const handleToggleCompare = (product: Product) => {
    setComparedProductIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      } else {
        if (prev.length >= 4) return prev;
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveCompare = (productId: string) => {
    setComparedProductIds((prev) => prev.filter((id) => id !== productId));
  };

  const handleClearCompare = () => {
    setComparedProductIds([]);
  };

  const handleAddCustomProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    const customList = JSON.parse(localStorage.getItem('abf_custom_products') || '[]');
    customList.unshift(newProd);
    localStorage.setItem('abf_custom_products', JSON.stringify(customList));
  };

  const handleUpdateAiReview = (productId: string, review: AIReviewData) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, aiReview: review } : p))
    );
    if (selectedProductDetails?.id === productId) {
      setSelectedProductDetails((prev) => (prev ? { ...prev, aiReview: review } : null));
    }
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchAsin = p.asin.toLowerCase().includes(q);
          const matchFeat = p.features.some((f) => f.toLowerCase().includes(q));
          if (!matchTitle && !matchBrand && !matchAsin && !matchFeat) return false;
        }

        // Category filter
        if (filters.category !== 'all') {
          if (filters.category === 'under-50' && p.price > 50) return false;
          if (filters.category === 'bestsellers' && !p.isBestSeller) return false;
          if (filters.category === 'viral-tiktok' && !p.isTikTokViral) return false;
          if (
            filters.category !== 'under-50' &&
            filters.category !== 'bestsellers' &&
            filters.category !== 'viral-tiktok' &&
            p.category !== filters.category
          ) {
            return false;
          }
        }

        // Price range
        if (filters.priceRange === 'under-25' && p.price >= 25) return false;
        if (filters.priceRange === '25-50' && (p.price < 25 || p.price > 50)) return false;
        if (filters.priceRange === '50-100' && (p.price < 50 || p.price > 100)) return false;
        if (filters.priceRange === 'over-100' && p.price < 100) return false;

        // Prime only
        if (filters.primeOnly && !p.isPrime) return false;

        // Min Discount
        if (filters.minDiscount > 0 && p.discountPercent < filters.minDiscount) return false;

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'discount') return b.discountPercent - a.discountPercent;
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        if (filters.sortBy === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [products, searchQuery, filters]);

  const comparedProducts = useMemo(() => {
    return comparedProductIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [comparedProductIds, products]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f1111] text-gray-900 dark:text-gray-100 flex flex-col font-sans selection:bg-amber-400 selection:text-gray-950 pb-16 md:pb-0">
      {/* 1. Mandatory FTC & Amazon Associates Compliance Notice */}
      <DisclaimerBanner />

      {/* 2. Main Navigation Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        affiliateTag={affiliateTag}
        compareCount={comparedProductIds.length}
        onOpenComparison={() => setComparisonOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
        onNavigateBlog={() => setCurrentView('blog')}
        isBlogActive={currentView === 'blog'}
        onNavigateHome={() => setCurrentView('deals')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Main Body */}
      <main className="flex-1">
        {currentView === 'blog' ? (
          <BlogSection
            posts={blogPosts}
            products={products}
            affiliateTag={affiliateTag}
            onOpenProductDetails={(prod) => setSelectedProductDetails(prod)}
            onBackToDeals={() => setCurrentView('deals')}
          />
        ) : (
          <>
            {/* 3. Best Deal Engine Hero Banner */}
            <DealHero
              products={products}
              affiliateTag={affiliateTag}
              onSelectCategory={(cat) => setFilters({ ...filters, category: cat })}
              activeCategory={filters.category}
              onOpenProductDetails={(prod) => setSelectedProductDetails(prod)}
            />

            {/* 4. Filters & Category Navigation Bar */}
            <FiltersBar
              filters={filters}
              onChange={setFilters}
              totalResults={filteredProducts.length}
            />

            {/* 5. Products Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 px-4 bg-white dark:bg-[#161b26] rounded-3xl border border-gray-200 dark:border-gray-800 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    No matching Amazon deals found
                  </h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Try adjusting your search query, price sliders, or reset filters to view all available deals.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({
                        category: 'all',
                        priceRange: 'all',
                        sortBy: 'discount',
                        primeOnly: false,
                        minDiscount: 0,
                      });
                    }}
                    className="mt-2 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      affiliateTag={affiliateTag}
                      onOpenDetails={(p) => setSelectedProductDetails(p)}
                      onOpenAiReview={(p) => setSelectedProductDetails(p)}
                      onOpenShare={(p) => setShareProduct(p)}
                      isCompared={comparedProductIds.includes(product.id)}
                      onToggleCompare={handleToggleCompare}
                      canCompareMore={comparedProductIds.length < 4}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Floating Bottom Compare Tray */}
      <CompareTray
        products={comparedProducts}
        onOpenComparison={() => setComparisonOpen(true)}
        onRemoveProduct={handleRemoveCompare}
        onClearAll={handleClearCompare}
      />

      {/* Mobile App Navigation Bar (PWA / Mobile responsive experience) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#131921] border-t border-gray-800 px-4 py-2 flex items-center justify-around text-[10px] text-gray-400">
        <button
          onClick={() => setCurrentView('deals')}
          className={`flex flex-col items-center gap-1 ${currentView === 'deals' ? 'text-amber-400 font-bold' : ''}`}
        >
          <HomeIcon className="w-4 h-4" />
          <span>Deals</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('deals');
            setFilters({ ...filters, category: 'under-50' });
          }}
          className="flex flex-col items-center gap-1"
        >
          <Flame className="w-4 h-4" />
          <span>Under $50</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('deals');
            setFilters({ ...filters, category: 'viral-tiktok' });
          }}
          className="flex flex-col items-center gap-1"
        >
          <Video className="w-4 h-4" />
          <span>Viral TikTok</span>
        </button>

        <button
          onClick={() => setComparisonOpen(true)}
          className="relative flex flex-col items-center gap-1"
        >
          <Layers className="w-4 h-4" />
          <span>Compare</span>
          {comparedProductIds.length > 0 && (
            <span className="absolute -top-1 right-2 w-4 h-4 rounded-full bg-amber-400 text-gray-950 font-bold text-[9px] flex items-center justify-center">
              {comparedProductIds.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminOpen(true)}
          className="flex flex-col items-center gap-1"
        >
          <Settings className="w-4 h-4" />
          <span>Admin</span>
        </button>
      </nav>

      {/* Product Details & CamelCamelCamel + Gemini Modal */}
      {selectedProductDetails && (
        <ProductDetailModal
          product={selectedProductDetails}
          affiliateTag={affiliateTag}
          onClose={() => setSelectedProductDetails(null)}
          onOpenShare={(p) => setShareProduct(p)}
          onUpdateAiReview={handleUpdateAiReview}
        />
      )}

      {/* 4-Product Comparison Modal */}
      {comparisonOpen && (
        <ProductComparisonModal
          products={comparedProducts}
          affiliateTag={affiliateTag}
          onClose={() => setComparisonOpen(false)}
          onRemoveProduct={handleRemoveCompare}
          onClearAll={handleClearCompare}
        />
      )}

      {/* Social & WhatsApp Share Modal */}
      {shareProduct && (
        <ShareModal
          product={shareProduct}
          affiliateTag={affiliateTag}
          onClose={() => setShareProduct(null)}
        />
      )}

      {/* Admin Panel Modal */}
      {adminOpen && (
        <AdminPanel
          affiliateTag={affiliateTag}
          onUpdateAffiliateTag={handleUpdateAffiliateTag}
          onClose={() => setAdminOpen(false)}
          onOpenAuth={() => setAuthOpen(true)}
          products={products}
          onAddCustomProduct={handleAddCustomProduct}
        />
      )}

      {/* Auth Modal (Sign In / Sign Up) */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />

      {/* Footer */}
      <Footer
        affiliateTag={affiliateTag}
        onSelectCategory={(cat) => {
          setCurrentView('deals');
          setFilters({ ...filters, category: cat });
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        onOpenAdmin={() => setAdminOpen(true)}
        onNavigateBlog={() => {
          setCurrentView('blog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
