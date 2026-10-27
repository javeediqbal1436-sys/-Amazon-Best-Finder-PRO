import React, { useState, useEffect } from 'react';
import { Product, ClickLog } from '../types';
import { buildAmazonAffiliateUrl } from '../utils/affiliate';
import {
  X,
  Settings,
  Key,
  BarChart3,
  DollarSign,
  MousePointerClick,
  Plus,
  Check,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Download,
  AlertCircle,
  PackagePlus,
  Layers,
  Bell,
  Mail,
  Send,
  Crown,
  Lock
} from 'lucide-react';
import { fetchPriceAlerts, PriceAlertRecord } from '../services/priceAlertService';
import { useAuth } from '../context/AuthContext';

interface AdminPanelProps {
  affiliateTag: string;
  onUpdateAffiliateTag: (tag: string) => void;
  onClose: () => void;
  onOpenAuth: () => void;
  products: Product[];
  onAddCustomProduct: (product: Product) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  affiliateTag,
  onUpdateAffiliateTag,
  onClose,
  onOpenAuth,
  products,
  onAddCustomProduct,
}) => {
  const { user, isAdmin, adminEmail } = useAuth();
  const [activeTab, setActiveTab] = useState<'analytics' | 'tag' | 'paapi' | 'add-product' | 'price-alerts'>('analytics');
  const [tagInput, setTagInput] = useState(affiliateTag);
  const [tagSaved, setTagSaved] = useState(false);
  const [alertsList, setAlertsList] = useState<PriceAlertRecord[]>([]);
  const [loadingAlerts, setLoadingAlerts] = useState(false);
  const [simulatedEmail, setSimulatedEmail] = useState<string | null>(null);

  // PA-API Credentials State
  const [paapiAccessKey, setPaapiAccessKey] = useState('');
  const [paapiSecretKey, setPaapiSecretKey] = useState('');
  const [paapiRegion, setPaapiRegion] = useState('webservices.amazon.com');
  const [paapiSaved, setPaapiSaved] = useState(false);

  // Analytics Stats State
  const [stats, setStats] = useState<{
    totalClicks: number;
    totalVolume: number;
    estimatedCommission: number;
    recentClicks: ClickLog[];
    topProducts: Array<{ asin: string; title: string; clicks: number; price: number }>;
  }>({
    totalClicks: 0,
    totalVolume: 0,
    estimatedCommission: 0,
    recentClicks: [],
    topProducts: [],
  });
  const [loadingStats, setLoadingStats] = useState(false);

  // New Product Form
  const [newTitle, setNewTitle] = useState('');
  const [newAsin, setNewAsin] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newOrigPrice, setNewOrigPrice] = useState('');
  const [newCategory, setNewCategory] = useState<'under-50' | 'bestsellers' | 'viral-tiktok' | 'tech'>('under-50');
  const [newImage, setNewImage] = useState('');
  const [productAdded, setProductAdded] = useState(false);

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const res = await fetch('/api/analytics/stats');
      if (res.ok) {
        const data = await res.json();
        setStats({
          totalClicks: data.totalClicks || 0,
          totalVolume: data.totalVolume || 0,
          estimatedCommission: data.estimatedCommission || 0,
          recentClicks: data.recentClicks || [],
          topProducts: data.topProducts || [],
        });
      }
    } catch (e) {
      console.error('Stats error:', e);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchAlertsData = async () => {
    setLoadingAlerts(true);
    try {
      const records = await fetchPriceAlerts();
      setAlertsList(records);
    } catch (err) {
      console.error('Failed to load alerts:', err);
    } finally {
      setLoadingAlerts(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchAlertsData();
  }, []);

  const handleSaveTag = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = tagInput.trim();
    if (!clean) return;
    onUpdateAffiliateTag(clean);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ affiliateTag: clean }),
      });
      setTagSaved(true);
      setTimeout(() => setTagSaved(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSavePaapi = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paapiAccessKey,
          paapiSecretKey,
          amazonRegion: paapiRegion,
        }),
      });
      setPaapiSaved(true);
      setTimeout(() => setPaapiSaved(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAsin || !newPrice) return;

    const priceNum = parseFloat(newPrice);
    const origPriceNum = parseFloat(newOrigPrice) || priceNum;
    const discount = origPriceNum > priceNum ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100) : 0;

    const prod: Product = {
      id: `custom-${Date.now()}`,
      asin: newAsin.toUpperCase().trim(),
      title: newTitle.trim(),
      brand: newBrand.trim() || 'Amazon Brand',
      category: newCategory,
      price: priceNum,
      originalPrice: origPriceNum,
      discountPercent: discount,
      rating: 4.8,
      reviewCount: 1250,
      imageUrl: newImage.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      isPrime: true,
      availability: 'In Stock',
      features: ['Official Amazon Verified Listing', 'Fast Prime Delivery Available'],
      priceHistory: [
        { date: 'Aug 2026', amazonPrice: origPriceNum, thirdPartyPrice: origPriceNum },
        { date: 'Sep 2026', amazonPrice: priceNum * 1.1, thirdPartyPrice: priceNum * 1.1 },
        { date: 'Oct 2026', amazonPrice: priceNum, thirdPartyPrice: priceNum },
      ],
      lowestPriceEver: priceNum,
      highestPriceEver: origPriceNum,
      averagePrice: (priceNum + origPriceNum) / 2,
      aiReview: {
        summaryEn: 'High-rated verified Amazon product curated for top performance and value.',
        summaryUrdu: 'ایمیزون کی منتخب کردہ اعلیٰ ترین پراڈکٹ جو اپنی قیمت کے لحاظ سے شاندار کارکردگی دیتی ہے۔',
        prosEn: ['Top build quality and reliability', 'Great price-to-performance ratio'],
        prosUrdu: ['بہترین کوالٹی اور دیرپا بناوٹ', 'مناسب قیمت میں اعلیٰ معیار'],
        consEn: ['Limited time discount promotion'],
        consUrdu: ['محدود وقت کے لیے رعایتی قیمت'],
        verdictEn: 'Strong purchase recommendation at this promotional price point.',
        verdictUrdu: 'اس رعایت پر یہ پراڈکٹ خریدنا انتہائی مفید فیصلہ ہے۔',
        score: 9.2,
        whoShouldBuyEn: 'Shoppers looking for verified quality.',
        whoShouldBuyUrdu: 'اعلیٰ معیار پسند خریدار۔',
      },
    };

    onAddCustomProduct(prod);
    setProductAdded(true);
    setNewTitle('');
    setNewAsin('');
    setNewBrand('');
    setNewPrice('');
    setNewOrigPrice('');
    setTimeout(() => setProductAdded(false), 4000);
  };

  const handleExportCsv = () => {
    if (stats.recentClicks.length === 0) return;
    const headers = ['ID', 'Product Title', 'ASIN', 'Price', 'Affiliate Tag', 'Referrer', 'Timestamp'];
    const rows = stats.recentClicks.map((c) => [
      c.id,
      `"${c.productTitle.replace(/"/g, '""')}"`,
      c.asin,
      c.price,
      c.affiliateTag,
      `"${c.referrer}"`,
      c.timestamp,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `amazon_clicks_${affiliateTag}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-white dark:bg-[#131722] border border-gray-200 dark:border-gray-800 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-[#131722]/95 backdrop-blur-md px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-gray-950 flex items-center justify-center font-bold">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white">
                Amazon Affiliate Admin Panel
              </h2>
              <p className="text-xs text-gray-500">
                Manage Affiliate Tag, PA-API 5.0, Track Clicks & Top Products
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAdmin ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-sm">
              <Crown className="w-8 h-8" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">
                Store Owner Access Required / صرف ایڈمن کے لیے
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                As per system policy, only the primary store owner (<strong>{adminEmail}</strong>) can modify affiliate tags, manage Amazon PA-API keys, and review subscriber data.
              </p>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-xs">
                <span className="text-gray-400">Current Login Status: </span>
                <strong className="text-gray-800 dark:text-gray-200">{user ? user.email : 'Not signed in'}</strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold text-xs transition-colors shadow-sm cursor-pointer"
              >
                Sign In as Owner ({adminEmail})
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Tab Navigation */}
            <div className="px-6 pt-4 border-b border-gray-100 dark:border-gray-800 flex gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors border-b-2 ${
                  activeTab === 'analytics'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
            <BarChart3 className="w-4 h-4" />
            <span>Click Analytics & Top Products</span>
          </button>

          <button
            onClick={() => setActiveTab('tag')}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors border-b-2 ${
              activeTab === 'tag'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Affiliate Tag (?tag={affiliateTag})</span>
          </button>

          <button
            onClick={() => setActiveTab('paapi')}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors border-b-2 ${
              activeTab === 'paapi'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>PA-API 5.0 Credentials</span>
          </button>

          <button
            onClick={() => setActiveTab('add-product')}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors border-b-2 ${
              activeTab === 'add-product'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            <PackagePlus className="w-4 h-4" />
            <span>Add Custom Product</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('price-alerts');
              fetchAlertsData();
            }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors border-b-2 ${
              activeTab === 'price-alerts'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Price Alerts (Firestore)</span>
            {alertsList.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-gray-950 text-[10px] font-black">
                {alertsList.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6">
          {/* TAB 1: Analytics & Clicks */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40">
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-800 dark:text-amber-300">
                    <span>Total Outbound Clicks</span>
                    <MousePointerClick className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
                    {stats.totalClicks}
                  </div>
                  <p className="text-[11px] text-amber-700/70 dark:text-amber-400/60 mt-1">
                    Direct Amazon affiliate referral events
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    <span>Est. Commission</span>
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                    ${stats.estimatedCommission.toFixed(2)}
                  </div>
                  <p className="text-[11px] text-emerald-700/70 dark:text-emerald-400/60 mt-1">
                    Based on standard ~4% blended Amazon rate
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40">
                  <div className="flex items-center justify-between text-xs font-semibold text-blue-800 dark:text-blue-300">
                    <span>Referred Order Volume</span>
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
                    ${stats.totalVolume.toFixed(2)}
                  </div>
                  <p className="text-[11px] text-blue-700/70 dark:text-blue-400/60 mt-1">
                    Gross product basket value generated
                  </p>
                </div>
              </div>

              {/* Top Products Table */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Top Clicked Amazon ASINs
                  </h3>
                  <button
                    onClick={fetchStats}
                    className="text-xs text-amber-600 hover:text-amber-500 font-semibold flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingStats ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                </div>

                {stats.topProducts.length === 0 ? (
                  <p className="text-xs text-gray-400 py-3 text-center">No clicks recorded yet. Click any "Buy on Amazon" button to test.</p>
                ) : (
                  <div className="space-y-2">
                    {stats.topProducts.map((p, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-gray-800 text-xs border border-gray-100 dark:border-gray-700"
                      >
                        <div className="min-w-0 flex-1 pr-3">
                          <span className="font-bold text-gray-900 dark:text-white truncate block">
                            {idx + 1}. {p.title}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">ASIN: {p.asin}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-extrabold text-amber-500 text-sm">{p.clicks} clicks</span>
                          <span className="text-[10px] text-gray-400 block">${p.price.toFixed(2)} list</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Click Logs Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Live Referral Click Logs ({stats.recentClicks.length})
                  </h3>
                  {stats.recentClicks.length > 0 && (
                    <button
                      onClick={handleExportCsv}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  )}
                </div>

                <div className="max-h-56 overflow-y-auto border border-gray-100 dark:border-gray-800 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-400 uppercase text-[10px] sticky top-0">
                      <tr>
                        <th className="p-2.5">Time</th>
                        <th className="p-2.5">Product Title</th>
                        <th className="p-2.5">ASIN</th>
                        <th className="p-2.5">Price</th>
                        <th className="p-2.5">Tag</th>
                        <th className="p-2.5">Referrer</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {stats.recentClicks.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                          <td className="p-2.5 text-gray-400 whitespace-nowrap">
                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="p-2.5 font-medium text-gray-800 dark:text-gray-200 max-w-xs truncate">
                            {log.productTitle}
                          </td>
                          <td className="p-2.5 font-mono text-gray-500">{log.asin}</td>
                          <td className="p-2.5 font-bold text-gray-800 dark:text-gray-200">
                            ${log.price.toFixed(2)}
                          </td>
                          <td className="p-2.5 font-mono text-amber-500 font-bold">{log.affiliateTag}</td>
                          <td className="p-2.5 text-gray-400">{log.referrer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Affiliate Tag Configuration */}
          {activeTab === 'tag' && (
            <div className="max-w-xl space-y-6">
              <form onSubmit={handleSaveTag} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Amazon Associate Store ID / Tracking ID
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Every outbound link, share button, and buy CTA will instantly append this tag to qualify you for Amazon commissions.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="e.g. shorkot-20"
                      className="flex-1 px-3 py-2 text-sm font-mono font-bold rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                    <button
                      type="submit"
                      className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {tagSaved ? <Check className="w-4 h-4" /> : null}
                      <span>{tagSaved ? 'Saved!' : 'Update Tag'}</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Live Preview Test */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Live Affiliate URL Test
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Testing with sample AirPods Pro ASIN (<code className="font-mono">B0BSHF7WHW</code>):
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 font-mono text-xs text-amber-600 dark:text-amber-400 break-all select-all">
                  {buildAmazonAffiliateUrl('B0BSHF7WHW', tagInput || affiliateTag)}
                </div>
                <a
                  href={buildAmazonAffiliateUrl('B0BSHF7WHW', tagInput || affiliateTag)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-500 pt-1"
                >
                  <span>Test Link in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 3: PA-API 5.0 Settings */}
          {activeTab === 'paapi' && (
            <div className="max-w-xl space-y-6">
              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 text-xs text-blue-900 dark:text-blue-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                  Amazon Product Advertising API 5.0 (PA-API 5.0)
                </div>
                <p>
                  Amazon PA-API 5.0 uses AWS Signature Version 4 (SigV4) authentication. The server automatically signs requests using your AWS Key & Secret. If left blank, the app functions in instant High-Performance Curated Mode.
                </p>
              </div>

              <form onSubmit={handleSavePaapi} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Amazon Marketplace / Host
                  </label>
                  <select
                    value={paapiRegion}
                    onChange={(e) => setPaapiRegion(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="webservices.amazon.com">United States (webservices.amazon.com)</option>
                    <option value="webservices.amazon.co.uk">United Kingdom (webservices.amazon.co.uk)</option>
                    <option value="webservices.amazon.de">Germany (webservices.amazon.de)</option>
                    <option value="webservices.amazon.ca">Canada (webservices.amazon.ca)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    PA-API AWS Access Key ID
                  </label>
                  <input
                    type="password"
                    value={paapiAccessKey}
                    onChange={(e) => setPaapiAccessKey(e.target.value)}
                    placeholder="AKIAIOSFODNN7EXAMPLE"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    PA-API AWS Secret Access Key
                  </label>
                  <input
                    type="password"
                    value={paapiSecretKey}
                    onChange={(e) => setPaapiSecretKey(e.target.value)}
                    placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {paapiSaved ? <Check className="w-4 h-4" /> : null}
                  <span>{paapiSaved ? 'Credentials Saved!' : 'Save PA-API Configuration'}</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: Add Custom Affiliate Product */}
          {activeTab === 'add-product' && (
            <div className="max-w-xl space-y-4">
              <p className="text-xs text-gray-500">
                Instantly insert an Amazon product into the deal engine. The affiliate tag <code className="font-mono font-bold text-amber-500">{affiliateTag}</code> will be automatically embedded into its buy button.
              </p>

              {productAdded && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Product successfully added to catalog!</span>
                </div>
              )}

              <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Product Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Sony Wireless Extra Bass Earbuds"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Amazon ASIN</label>
                    <input
                      type="text"
                      value={newAsin}
                      onChange={(e) => setNewAsin(e.target.value)}
                      placeholder="e.g. B09V3HN1KC"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono uppercase"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Brand Name</label>
                    <input
                      type="text"
                      value={newBrand}
                      onChange={(e) => setNewBrand(e.target.value)}
                      placeholder="e.g. Sony"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Sale Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="29.99"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Original Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newOrigPrice}
                      onChange={(e) => setNewOrigPrice(e.target.value)}
                      placeholder="49.99"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="under-50">Best Under $50</option>
                      <option value="bestsellers">Best Sellers</option>
                      <option value="viral-tiktok">Viral TikTok</option>
                      <option value="tech">Tech</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Product to App</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: Price Alerts (Firestore) */}
          {activeTab === 'price-alerts' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/40">
                <div>
                  <h3 className="font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                    <Bell className="w-4 h-4 text-amber-500" />
                    <span>Registered Price Drop Alerts in Firestore</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-gray-950 text-[10px] font-black">
                      {alertsList.length} Active
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Whenever an Amazon product price drops to or below the shopper's target, an automated email dispatch is triggered.
                  </p>
                </div>

                <button
                  onClick={fetchAlertsData}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-700 text-xs font-bold hover:bg-amber-50 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingAlerts ? 'animate-spin' : ''}`} />
                  <span>Refresh Firestore</span>
                </button>
              </div>

              {simulatedEmail && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="flex items-center gap-1.5 font-bold">
                      <Send className="w-4 h-4 text-emerald-600" />
                      Email Notification Dispatched (Simulated Test)
                    </strong>
                    <button onClick={() => setSimulatedEmail(null)} className="text-xs underline text-emerald-700">Dismiss</button>
                  </div>
                  <p>{simulatedEmail}</p>
                </div>
              )}

              {alertsList.length === 0 ? (
                <div className="p-8 text-center bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2">
                  <Mail className="w-8 h-8 text-gray-400 mx-auto" />
                  <p className="text-xs text-gray-500">No price alerts registered in Firestore yet.</p>
                  <p className="text-[11px] text-gray-400">
                    Open any product from the catalog, enter a target price & email, and click "Set Price Alert".
                  </p>
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto border border-gray-100 dark:border-gray-800 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-400 uppercase text-[10px] sticky top-0">
                      <tr>
                        <th className="p-2.5">Date</th>
                        <th className="p-2.5">User Email</th>
                        <th className="p-2.5">Product / ASIN</th>
                        <th className="p-2.5">Target Price</th>
                        <th className="p-2.5">Current Price</th>
                        <th className="p-2.5">Status</th>
                        <th className="p-2.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {alertsList.map((alert) => (
                        <tr key={alert.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                          <td className="p-2.5 text-gray-400 whitespace-nowrap">
                            {new Date(alert.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </td>
                          <td className="p-2.5 font-bold text-gray-900 dark:text-white">
                            {alert.email}
                          </td>
                          <td className="p-2.5 max-w-xs truncate text-gray-700 dark:text-gray-300">
                            <div>{alert.productTitle}</div>
                            <span className="font-mono text-[10px] text-amber-500 font-bold">{alert.asin}</span>
                          </td>
                          <td className="p-2.5 font-extrabold text-emerald-600 dark:text-emerald-400">
                            ${alert.targetPrice.toFixed(2)}
                          </td>
                          <td className="p-2.5 text-gray-500">
                            ${alert.currentPrice.toFixed(2)}
                          </td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                              {alert.status}
                            </span>
                          </td>
                          <td className="p-2.5 text-right">
                            <button
                              onClick={() => {
                                setSimulatedEmail(`Simulated price drop alert email sent to ${alert.email} for "${alert.productTitle}"! Target: $${alert.targetPrice.toFixed(2)}.`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold text-[11px] cursor-pointer"
                            >
                              Test Alert
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </>
    )}
  </div>
</div>
  );
};
