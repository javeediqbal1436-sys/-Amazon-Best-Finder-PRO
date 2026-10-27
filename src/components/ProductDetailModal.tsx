import React, { useState } from 'react';
import { Product, AIReviewData } from '../types';
import { PriceHistoryChart } from './PriceHistoryChart';
import { buildAmazonAffiliateUrl, trackProductClick } from '../utils/affiliate';
import {
  X,
  Star,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Share2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw,
  Globe,
  Award,
  ShieldCheck,
  Flame,
  Truck,
  Bell,
  Mail,
  Check,
  Loader2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { createPriceAlert } from '../services/priceAlertService';

interface ProductDetailModalProps {
  product: Product;
  affiliateTag: string;
  onClose: () => void;
  onOpenShare: (product: Product) => void;
  onUpdateAiReview?: (productId: string, review: AIReviewData) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  affiliateTag,
  onClose,
  onOpenShare,
  onUpdateAiReview,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.imageUrl);
  const [languageMode, setLanguageMode] = useState<'both' | 'en' | 'ur'>('both');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiData, setAiData] = useState<AIReviewData | undefined>(product.aiReview);

  // Price Drop Alert State
  const defaultTarget = (product.price * 0.9).toFixed(2);
  const [alertTargetPrice, setAlertTargetPrice] = useState<string>(defaultTarget);
  const [alertEmail, setAlertEmail] = useState<string>('');
  const [alertStatus, setAlertStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [alertErrorMsg, setAlertErrorMsg] = useState<string | null>(null);
  const [showEmailPreview, setShowEmailPreview] = useState<boolean>(false);

  const affiliateUrl = buildAmazonAffiliateUrl(product.asin, affiliateTag);
  const allImages = [product.imageUrl, ...(product.additionalImages || [])];

  const handleBuyClick = () => {
    trackProductClick(
      product.id,
      product.title,
      product.asin,
      product.price,
      'Product Detail Modal',
      product.category
    );
  };

  const handleGenerateAiReview = async () => {
    setIsGeneratingAi(true);
    setAiError(null);
    try {
      const res = await fetch('/api/gemini/analyze-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: product.title,
          brand: product.brand,
          price: product.price,
          features: product.features,
        }),
      });
      const data = await res.json();
      if (data.success && data.aiReview) {
        setAiData(data.aiReview);
        if (onUpdateAiReview) {
          onUpdateAiReview(product.id, data.aiReview);
        }
      } else {
        setAiError(data.error || 'Failed to generate review');
      }
    } catch (err: any) {
      setAiError(err.message || 'Network error');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleSavePriceAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail || !alertTargetPrice) return;
    const target = parseFloat(alertTargetPrice);
    if (isNaN(target) || target <= 0) {
      setAlertStatus('error');
      setAlertErrorMsg('Please enter a valid target price greater than $0');
      return;
    }

    setAlertStatus('saving');
    setAlertErrorMsg(null);
    try {
      const res = await createPriceAlert({
        email: alertEmail,
        targetPrice: target,
        currentPrice: product.price,
        productId: product.id,
        productTitle: product.title,
        asin: product.asin,
      });

      if (res.success) {
        setAlertStatus('saved');
      } else {
        setAlertStatus('error');
        setAlertErrorMsg(res.error || 'Could not save alert to Firestore');
      }
    } catch (err: any) {
      setAlertStatus('error');
      setAlertErrorMsg(err.message || 'Error communicating with Firestore');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-white dark:bg-[#131722] border border-gray-200 dark:border-gray-800 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col">
        {/* Sticky Top Header */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-[#131722]/95 backdrop-blur-md px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {product.brand}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-xs font-mono text-gray-500">ASIN: {product.asin}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenShare(product)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-8">
          {/* Main Top Section: Gallery & Buying Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="w-full h-80 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 flex items-center justify-center border border-gray-100 dark:border-gray-800 overflow-hidden relative">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
                {product.discountPercent > 0 && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    {product.discountPercent}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl border-2 overflow-hidden shrink-0 bg-white dark:bg-gray-800 p-1 cursor-pointer transition-all ${
                        selectedImage === img
                          ? 'border-amber-500 ring-2 ring-amber-500/30'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Buying & Key Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
                {product.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-sm text-gray-800 dark:text-gray-200">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-500">
                  ({product.reviewCount.toLocaleString()} Amazon verified reviews)
                </span>
              </div>

              {/* Price Block */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-base text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 pt-1">
                  {product.isPrime && (
                    <span className="font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> FREE One-Day Prime Delivery
                    </span>
                  )}
                  <span>Status: <strong className="text-emerald-600 dark:text-emerald-400">{product.availability}</strong></span>
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Top Highlights
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Affiliate Buy CTA */}
              <div className="pt-2">
                <a
                  href={affiliateUrl}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  onClick={handleBuyClick}
                  className="w-full py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-500 text-gray-950 font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5 text-gray-950" />
                  <span>Check Current Deal on Amazon</span>
                  <ExternalLink className="w-4 h-4 opacity-80" />
                </a>
                <p className="text-[11px] text-center text-gray-500 dark:text-gray-400 mt-2">
                  🔒 Affiliate Link tagged with <span className="font-mono font-bold text-amber-600">{affiliateTag}</span> • Safe Amazon Checkout
                </p>
              </div>
            </div>
          </div>

          {/* SET PRICE ALERT CARD (Firestore Integrated) */}
          <div className="bg-gradient-to-br from-amber-50/90 via-white to-amber-50/40 dark:from-[#211d17] dark:via-[#191922] dark:to-[#1a1715] border-2 border-amber-400/60 dark:border-amber-500/40 rounded-2xl p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-gray-950 flex items-center justify-center font-bold shadow-xs">
                  <Bell className="w-5 h-5 text-gray-950 animate-bounce" />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-base flex items-center gap-2">
                    Set Price Drop Alert
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300">
                      Firestore Database
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Never overpay. Enter your email and target price — we'll save your alert in Firestore and notify you via email the moment the price drops!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Free Notification</span>
              </div>
            </div>

            {/* Quick Price Preset Buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
              <span className="text-gray-500 dark:text-gray-400 font-medium">Quick Target:</span>
              <button
                type="button"
                onClick={() => setAlertTargetPrice((product.price * 0.9).toFixed(2))}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-amber-400 text-gray-700 dark:text-gray-300 font-semibold text-xs transition-colors cursor-pointer"
              >
                10% Drop (${(product.price * 0.9).toFixed(2)})
              </button>
              <button
                type="button"
                onClick={() => setAlertTargetPrice((product.price * 0.8).toFixed(2))}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-amber-400 text-gray-700 dark:text-gray-300 font-semibold text-xs transition-colors cursor-pointer"
              >
                20% Drop (${(product.price * 0.8).toFixed(2)})
              </button>
              <button
                type="button"
                onClick={() => setAlertTargetPrice(product.lowestPriceEver.toFixed(2))}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 font-bold text-xs transition-colors cursor-pointer"
              >
                Lowest Ever (${product.lowestPriceEver.toFixed(2)})
              </button>
            </div>

            {/* Alert Submission Form */}
            <form onSubmit={handleSavePriceAlert} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                {/* Target Price Input */}
                <div className="sm:col-span-4 relative">
                  <span className="absolute left-3 top-2.5 text-xs text-gray-400 font-bold">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    value={alertTargetPrice}
                    onChange={(e) => setAlertTargetPrice(e.target.value)}
                    placeholder="Target Price"
                    className="w-full pl-7 pr-3 py-2 text-xs font-bold rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] text-gray-400 uppercase">Target</span>
                </div>

                {/* Email Input */}
                <div className="sm:col-span-5 relative">
                  <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    placeholder="Enter email for price drop alert"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    disabled={alertStatus === 'saving'}
                    className="w-full h-full py-2 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-gray-950 font-extrabold text-xs shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    {alertStatus === 'saving' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-gray-950" />
                        <span>Saving...</span>
                      </>
                    ) : alertStatus === 'saved' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-900" />
                        <span>Alert Active!</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-3.5 h-3.5 text-gray-950" />
                        <span>Set Price Alert</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {alertStatus === 'error' && alertErrorMsg && (
                <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>{alertErrorMsg}</span>
                </div>
              )}

              {/* Success Banner */}
              {alertStatus === 'saved' && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Price Alert successfully saved to Firestore!
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowEmailPreview(!showEmailPreview)}
                      className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 underline hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{showEmailPreview ? 'Hide Email Preview' : 'Preview Alert Email'}</span>
                      {showEmailPreview ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                    We will track Amazon prices daily. When <strong>{product.title}</strong> drops to <strong>${parseFloat(alertTargetPrice).toFixed(2)}</strong> or lower, an automated email will be dispatched to <strong>{alertEmail}</strong>.
                  </p>

                  {/* Simulated Email Preview Modal/Accordion */}
                  {showEmailPreview && (
                    <div className="mt-2 p-3 bg-white dark:bg-gray-900 rounded-xl border border-emerald-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-xs space-y-2 font-sans shadow-sm">
                      <div className="border-b border-gray-100 dark:border-gray-800 pb-2">
                        <div className="text-[10px] text-gray-400">EMAIL PREVIEW (Triggered when price drops):</div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          Subject: 🚨 Amazon Price Drop: {product.title.slice(0, 45)}... dropped to ${alertTargetPrice}!
                        </div>
                        <div className="text-[11px] text-gray-500">To: {alertEmail} • From: alerts@amazonbestfinderpro.com</div>
                      </div>
                      <div className="flex gap-3 items-center py-1">
                        <img src={product.imageUrl} alt="preview" className="w-12 h-12 object-contain rounded bg-gray-50 dark:bg-gray-800 p-1" />
                        <div>
                          <div className="font-semibold text-xs">{product.title}</div>
                          <div className="text-emerald-600 font-extrabold text-sm mt-0.5">
                            New Amazon Price: ${alertTargetPrice} <span className="text-xs text-gray-400 line-through">${product.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      <a
                        href={affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block py-1.5 px-3 rounded-lg bg-amber-400 text-gray-950 font-bold text-xs"
                      >
                        Claim Deal on Amazon (tag={affiliateTag}) →
                      </a>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Price History Section */}
          <div>
            <PriceHistoryChart
              priceHistory={product.priceHistory}
              currentPrice={product.price}
              lowestPriceEver={product.lowestPriceEver}
              highestPriceEver={product.highestPriceEver}
              averagePrice={product.averagePrice}
              asin={product.asin}
              productId={product.id}
              productTitle={product.title}
            />
          </div>

          {/* Gemini AI Breakdown: English & Urdu */}
          <div className="bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/50 dark:from-[#1b1c30] dark:via-[#151728] dark:to-[#1b182d] border border-indigo-200/60 dark:border-indigo-900/40 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-indigo-100 dark:border-indigo-900/40">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-base flex items-center gap-2">
                    Gemini AI Product Intelligence
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                      English & اردو
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Objective Pros, Cons & Verdict generated with Gemini AI
                  </p>
                </div>
              </div>

              {/* Controls: Language toggle + Live Regenerate */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-0.5 text-xs font-semibold shadow-2xs">
                  <button
                    onClick={() => setLanguageMode('both')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      languageMode === 'both'
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    Both
                  </button>
                  <button
                    onClick={() => setLanguageMode('en')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      languageMode === 'en'
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguageMode('ur')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      languageMode === 'ur'
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    اردو
                  </button>
                </div>

                <button
                  onClick={handleGenerateAiReview}
                  disabled={isGeneratingAi}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 border border-indigo-300 dark:border-indigo-800 hover:bg-indigo-50 text-indigo-700 dark:text-indigo-300 font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
                  title="Ask Gemini to re-analyze"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingAi ? 'animate-spin' : ''}`} />
                  {isGeneratingAi ? 'Analyzing...' : 'Re-Analyze'}
                </button>
              </div>
            </div>

            {aiError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs">
                {aiError}
              </div>
            )}

            {aiData ? (
              <div className="space-y-6">
                {/* Score & Summary Banner */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white/80 dark:bg-gray-800/60 border border-indigo-100 dark:border-indigo-900/30">
                  <div className="flex-1 min-w-[240px]">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                      AI Executive Summary
                    </div>
                    {(languageMode === 'both' || languageMode === 'en') && (
                      <p className="text-xs text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                        {aiData.summaryEn}
                      </p>
                    )}
                    {(languageMode === 'both' || languageMode === 'ur') && (
                      <p className="text-xs font-urdu text-gray-800 dark:text-gray-200 mt-2 leading-relaxed">
                        {aiData.summaryUrdu}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 flex items-center gap-3 bg-indigo-50 dark:bg-indigo-950/60 px-4 py-2.5 rounded-xl border border-indigo-200/50 dark:border-indigo-800/40">
                    <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-indigo-500">Value Score</div>
                      <div className="text-xl font-black text-indigo-700 dark:text-indigo-300">
                        {aiData.score.toFixed(1)} <span className="text-xs font-normal text-gray-400">/ 10</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pros and Cons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pros */}
                  <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm">
                        Key Advantages / خوبیاں
                      </h4>
                    </div>

                    {(languageMode === 'both' || languageMode === 'en') && (
                      <ul className="space-y-2 mb-3">
                        {aiData.prosEn.map((pro, i) => (
                          <li key={i} className="text-xs text-emerald-950 dark:text-emerald-200 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {(languageMode === 'both' || languageMode === 'ur') && (
                      <ul className="space-y-1.5 pt-2 border-t border-emerald-200/50 dark:border-emerald-800/30">
                        {aiData.prosUrdu.map((proUrdu, i) => (
                          <li key={i} className="text-xs font-urdu text-emerald-900 dark:text-emerald-200 flex items-start gap-2 justify-end">
                            <span>{proUrdu}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Cons */}
                  <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-5 h-5 text-amber-600" />
                      <h4 className="font-bold text-amber-900 dark:text-amber-300 text-sm">
                        Considerations / خامیاں
                      </h4>
                    </div>

                    {(languageMode === 'both' || languageMode === 'en') && (
                      <ul className="space-y-2 mb-3">
                        {aiData.consEn.map((con, i) => (
                          <li key={i} className="text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {(languageMode === 'both' || languageMode === 'ur') && (
                      <ul className="space-y-1.5 pt-2 border-t border-amber-200/50 dark:border-amber-800/30">
                        {aiData.consUrdu.map((conUrdu, i) => (
                          <li key={i} className="text-xs font-urdu text-amber-900 dark:text-amber-200 flex items-start gap-2 justify-end">
                            <span>{conUrdu}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Verdict Section */}
                <div className="p-4 rounded-xl bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
                    Gemini Verdict & Recommendation / حتمی فیصلہ
                  </div>
                  {(languageMode === 'both' || languageMode === 'en') && (
                    <p className="text-xs text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                      {aiData.verdictEn}
                    </p>
                  )}
                  {(languageMode === 'both' || languageMode === 'ur') && (
                    <p className="text-xs font-urdu text-gray-800 dark:text-gray-200 mt-2 leading-relaxed">
                      {aiData.verdictUrdu}
                    </p>
                  )}

                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Who Should Buy: </span>
                    <span className="text-gray-600 dark:text-gray-400">{aiData.whoShouldBuyEn}</span>
                    {languageMode !== 'en' && (
                      <div className="text-xs font-urdu text-gray-600 dark:text-gray-400 mt-1 text-right">
                        {aiData.whoShouldBuyUrdu}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-xs text-gray-500 mb-3">No AI review precomputed yet.</p>
                <button
                  onClick={handleGenerateAiReview}
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold text-xs rounded-xl"
                >
                  Generate with Gemini AI
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
