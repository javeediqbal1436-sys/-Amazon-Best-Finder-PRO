import React from 'react';
import { Product } from '../types';
import { Sparkles, X, ArrowRight, Layers } from 'lucide-react';

interface CompareTrayProps {
  products: Product[];
  onOpenComparison: () => void;
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
}

export const CompareTray: React.FC<CompareTrayProps> = ({
  products,
  onOpenComparison,
  onRemoveProduct,
  onClearAll,
}) => {
  if (products.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl bg-gray-900/95 dark:bg-[#131722]/95 backdrop-blur-md text-white border border-gray-700 dark:border-gray-800 rounded-2xl p-3 shadow-2xl animate-in slide-in-from-bottom-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 overflow-x-auto py-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 shrink-0">
            <Layers className="w-4 h-4" />
            <span>Compare ({products.length}/4)</span>
          </div>

          <div className="flex items-center gap-2">
            {products.map((p) => (
              <div
                key={p.id}
                className="relative group w-12 h-12 bg-white rounded-xl p-1 border border-gray-300 dark:border-gray-700 shrink-0 flex items-center justify-center"
              >
                <img src={p.imageUrl} alt={p.title} className="max-h-full max-w-full object-contain" />
                <button
                  onClick={() => onRemoveProduct(p.id)}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] hover:bg-red-700 shadow-sm"
                  title="Remove"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            {Array.from({ length: 4 - products.length }).map((_, idx) => (
              <div
                key={idx}
                className="w-12 h-12 rounded-xl border border-dashed border-gray-600 flex items-center justify-center text-[10px] text-gray-500 shrink-0"
              >
                +Slot
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClearAll}
            className="text-xs text-gray-400 hover:text-white px-2 py-1"
          >
            Clear
          </button>

          <button
            onClick={onOpenComparison}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold text-xs transition-colors shadow-sm cursor-pointer"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
