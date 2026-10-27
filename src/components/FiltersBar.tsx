import React from 'react';
import { ProductCategory } from '../types';
import {
  SlidersHorizontal,
  Flame,
  Award,
  Video,
  Smartphone,
  Home,
  Check,
  Truck,
  RotateCcw
} from 'lucide-react';

export interface FilterState {
  category: ProductCategory;
  priceRange: 'all' | 'under-25' | '25-50' | '50-100' | 'over-100';
  sortBy: 'discount' | 'rating' | 'bestseller' | 'price-asc' | 'price-desc';
  primeOnly: boolean;
  minDiscount: number;
}

interface FiltersBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalResults: number;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  filters,
  onChange,
  totalResults,
}) => {
  const categories: { id: ProductCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Deals', icon: null },
    { id: 'under-50', label: 'Best Under $50', icon: <Flame className="w-3.5 h-3.5 text-amber-500" /> },
    { id: 'bestsellers', label: 'Best Sellers Today', icon: <Award className="w-3.5 h-3.5 text-amber-500" /> },
    { id: 'viral-tiktok', label: 'Viral TikTok Products', icon: <Video className="w-3.5 h-3.5 text-purple-500" /> },
    { id: 'tech', label: 'Tech & Audio', icon: <Smartphone className="w-3.5 h-3.5 text-cyan-500" /> },
    { id: 'home', label: 'Home & Kitchen', icon: <Home className="w-3.5 h-3.5 text-emerald-500" /> },
  ];

  const handleReset = () => {
    onChange({
      category: 'all',
      priceRange: 'all',
      sortBy: 'discount',
      primeOnly: false,
      minDiscount: 0,
    });
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.priceRange !== 'all' ||
    filters.primeOnly ||
    filters.minDiscount > 0;

  return (
    <div className="bg-white dark:bg-[#131722] border-y border-gray-200 dark:border-gray-800 py-3 px-4 sm:px-6 shadow-2xs">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onChange({ ...filters, category: cat.id })}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#131921] text-white dark:bg-amber-400 dark:text-gray-950 shadow-xs'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Price Filter */}
            <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1">
              <span className="text-gray-400 font-medium">Price:</span>
              <select
                value={filters.priceRange}
                onChange={(e) => onChange({ ...filters, priceRange: e.target.value as any })}
                className="bg-transparent text-gray-800 dark:text-gray-200 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="all" className="dark:bg-gray-900">Any Price</option>
                <option value="under-25" className="dark:bg-gray-900">Under $25</option>
                <option value="25-50" className="dark:bg-gray-900">$25 to $50</option>
                <option value="50-100" className="dark:bg-gray-900">$50 to $100</option>
                <option value="over-100" className="dark:bg-gray-900">$100 & Above</option>
              </select>
            </div>

            {/* Discount Filter */}
            <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1">
              <span className="text-gray-400 font-medium">Min Discount:</span>
              <select
                value={filters.minDiscount}
                onChange={(e) => onChange({ ...filters, minDiscount: Number(e.target.value) })}
                className="bg-transparent text-gray-800 dark:text-gray-200 font-semibold focus:outline-none cursor-pointer"
              >
                <option value={0} className="dark:bg-gray-900">All Deals</option>
                <option value={20} className="dark:bg-gray-900">20% Off or More</option>
                <option value={30} className="dark:bg-gray-900">30% Off or More</option>
                <option value={40} className="dark:bg-gray-900">40% Off or More</option>
              </select>
            </div>

            {/* Prime Only Toggle */}
            <button
              onClick={() => onChange({ ...filters, primeOnly: !filters.primeOnly })}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-bold text-xs transition-colors cursor-pointer ${
                filters.primeOnly
                  ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border-cyan-400'
                  : 'bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:text-gray-900'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-cyan-500" />
              <span>Prime Only</span>
              {filters.primeOnly && <Check className="w-3 h-3 text-cyan-600 ml-0.5" />}
            </button>

            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-gray-400 hover:text-red-500 font-medium transition-colors cursor-pointer px-1"
                title="Reset filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Right Side: Sort & Result Count */}
          <div className="flex items-center gap-3">
            <span className="text-gray-400 font-medium hidden sm:inline">
              Showing <strong className="text-gray-800 dark:text-gray-200">{totalResults}</strong> deals
            </span>

            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1">
              <span className="text-gray-400 font-medium">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
                className="bg-transparent text-gray-800 dark:text-gray-200 font-bold focus:outline-none cursor-pointer"
              >
                <option value="discount" className="dark:bg-gray-900">Highest Discount %</option>
                <option value="bestseller" className="dark:bg-gray-900">Best Sellers First</option>
                <option value="rating" className="dark:bg-gray-900">Highest Customer Rating</option>
                <option value="price-asc" className="dark:bg-gray-900">Price: Low to High</option>
                <option value="price-desc" className="dark:bg-gray-900">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
