import React, { useState } from 'react';
import { PricePoint } from '../types';
import { TrendingDown, TrendingUp, AlertCircle, Bell, Check, ShieldCheck, Loader2 } from 'lucide-react';
import { createPriceAlert } from '../services/priceAlertService';

interface PriceHistoryChartProps {
  priceHistory: PricePoint[];
  currentPrice: number;
  lowestPriceEver: number;
  highestPriceEver: number;
  averagePrice: number;
  currencySymbol?: string;
  asin: string;
  productId?: string;
  productTitle?: string;
}

export const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({
  priceHistory,
  currentPrice,
  lowestPriceEver,
  highestPriceEver,
  averagePrice,
  currencySymbol = '$',
  asin,
  productId = 'prod-default',
  productTitle = 'Amazon Product',
}) => {
  const [selectedPoint, setSelectedPoint] = useState<PricePoint | null>(null);
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | 'all'>('all');
  const [alertTargetPrice, setAlertTargetPrice] = useState<string>(
    (lowestPriceEver * 0.95).toFixed(2)
  );
  const [alertEmail, setAlertEmail] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertLoading, setAlertLoading] = useState(false);
  const [alertError, setAlertError] = useState<string | null>(null);

  // Filter history based on range
  const displayHistory = React.useMemo(() => {
    if (timeRange === '30d') return priceHistory.slice(-2);
    if (timeRange === '90d') return priceHistory.slice(-4);
    return priceHistory;
  }, [priceHistory, timeRange]);

  // SVG Chart Dimensions
  const width = 580;
  const height = 180;
  const paddingX = 45;
  const paddingY = 25;

  const minVal = Math.min(...priceHistory.map((p) => Math.min(p.amazonPrice, p.thirdPartyPrice))) * 0.85;
  const maxVal = Math.max(...priceHistory.map((p) => Math.max(p.amazonPrice, p.thirdPartyPrice))) * 1.1;

  const getX = (index: number, total: number) => {
    if (total <= 1) return paddingX + (width - paddingX * 2) / 2;
    return paddingX + (index / (total - 1)) * (width - paddingX * 2);
  };

  const getY = (val: number) => {
    if (maxVal === minVal) return height / 2;
    return height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - paddingY * 2);
  };

  // Build SVG path strings
  const amazonPoints = displayHistory.map((p, i) => `${getX(i, displayHistory.length)},${getY(p.amazonPrice)}`);
  const amazonPath = `M ${amazonPoints.join(' L ')}`;

  const thirdPartyPoints = displayHistory.map((p, i) => `${getX(i, displayHistory.length)},${getY(p.thirdPartyPrice)}`);
  const thirdPartyPath = `M ${thirdPartyPoints.join(' L ')}`;

  const isAtAllTimeLow = currentPrice <= lowestPriceEver * 1.02;

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail || !alertTargetPrice) return;
    setAlertLoading(true);
    setAlertError(null);
    try {
      const res = await createPriceAlert({
        email: alertEmail,
        targetPrice: parseFloat(alertTargetPrice),
        currentPrice,
        productId,
        productTitle,
        asin,
      });
      if (res.success) {
        setAlertSuccess(true);
        setTimeout(() => setAlertSuccess(false), 6000);
      } else {
        setAlertError(res.error || 'Failed to save alert');
      }
    } catch (err: any) {
      setAlertError(err.message || 'Error connecting to Firestore');
    } finally {
      setAlertLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a1f2c] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 dark:text-white text-base">
              Price History (camelcamelcamel style)
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              <ShieldCheck className="w-3 h-3 mr-1" /> Verified Data
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            ASIN: <code className="font-mono text-gray-700 dark:text-gray-300">{asin}</code> • Real historical Amazon pricing
          </p>
        </div>

        {/* Range Buttons */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg text-xs font-medium">
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              timeRange === '30d'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => setTimeRange('90d')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              timeRange === '90d'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            90 Days
          </button>
          <button
            onClick={() => setTimeRange('all')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              timeRange === 'all'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 rounded-lg p-2.5">
          <div className="text-[11px] font-medium text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
            <span>Lowest Ever</span>
            <TrendingDown className="w-3.5 h-3.5" />
          </div>
          <div className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 mt-0.5">
            {currencySymbol}{lowestPriceEver.toFixed(2)}
          </div>
          {isAtAllTimeLow && (
            <span className="inline-block text-[10px] font-bold text-emerald-600 dark:text-emerald-300 animate-pulse">
              🔥 Best Time to Buy!
            </span>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/60 rounded-lg p-2.5">
          <div className="text-[11px] font-medium text-gray-500 dark:text-gray-400 flex items-center justify-between">
            <span>Current Price</span>
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          </div>
          <div className="text-base font-extrabold text-gray-900 dark:text-white mt-0.5">
            {currencySymbol}{currentPrice.toFixed(2)}
          </div>
          <span className="text-[10px] text-gray-500">Live Amazon Deal</span>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/60 rounded-lg p-2.5">
          <div className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Average Price</div>
          <div className="text-base font-extrabold text-gray-700 dark:text-gray-300 mt-0.5">
            {currencySymbol}{averagePrice.toFixed(2)}
          </div>
          <span className="text-[10px] text-gray-500">Historical Avg</span>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 rounded-lg p-2.5">
          <div className="text-[11px] font-medium text-red-700 dark:text-red-400 flex items-center justify-between">
            <span>Highest Ever</span>
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <div className="text-base font-extrabold text-red-600 dark:text-red-400 mt-0.5">
            {currencySymbol}{highestPriceEver.toFixed(2)}
          </div>
          <span className="text-[10px] text-red-500">Peak List Price</span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-hidden bg-gray-50/70 dark:bg-[#131722] rounded-lg border border-gray-100 dark:border-gray-800 p-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44">
          <defs>
            <linearGradient id="amazonGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0.2, 0.4, 0.6, 0.8].map((pct, idx) => {
            const y = paddingY + pct * (height - paddingY * 2);
            const val = maxVal - pct * (maxVal - minVal);
            return (
              <g key={idx}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#9ca3af"
                  strokeOpacity="0.2"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 6}
                  y={y + 3}
                  textAnchor="end"
                  fill="#9ca3af"
                  fontSize="9"
                  fontFamily="sans-serif"
                >
                  {currencySymbol}{val.toFixed(0)}
                </text>
              </g>
            );
          })}

          {/* Amazon area fill */}
          <path
            d={`${amazonPath} L ${getX(displayHistory.length - 1, displayHistory.length)},${height - paddingY} L ${getX(0, displayHistory.length)},${height - paddingY} Z`}
            fill="url(#amazonGradient)"
          />

          {/* Third party line (dashed blue) */}
          <path
            d={thirdPartyPath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="4 3"
          />

          {/* Amazon line (solid green) */}
          <path
            d={amazonPath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
          />

          {/* Data points */}
          {displayHistory.map((p, i) => {
            const x = getX(i, displayHistory.length);
            const y = getY(p.amazonPrice);
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#10b981"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="cursor-pointer hover:r-6 transition-all"
                  onMouseEnter={() => setSelectedPoint(p)}
                />
                <text
                  x={x}
                  y={height - 6}
                  textAnchor="middle"
                  fill="#9ca3af"
                  fontSize="9"
                  fontFamily="sans-serif"
                >
                  {p.date}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 mt-2 px-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-emerald-500"></span>
              <span className="font-medium text-gray-700 dark:text-gray-300">Amazon Direct</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-t border-dashed border-blue-500"></span>
              <span>3rd Party New</span>
            </div>
          </div>
          {selectedPoint ? (
            <div className="text-emerald-600 dark:text-emerald-400 font-semibold">
              {selectedPoint.date}: {currencySymbol}{selectedPoint.amazonPrice.toFixed(2)} (3rd Party: {currencySymbol}{selectedPoint.thirdPartyPrice.toFixed(2)})
            </div>
          ) : (
            <div className="text-gray-400">Hover dot to view exact date price</div>
          )}
        </div>
      </div>

      {/* Price Drop Alert Form */}
      <form onSubmit={handleCreateAlert} className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-900 dark:text-white">
            <Bell className="w-3.5 h-3.5 text-amber-500" />
            <span>Set Price Drop Alert (Saved to Firestore)</span>
          </div>
          <span className="text-[10px] text-gray-400 font-mono">Firestore Database Active</span>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-2">
          <div className="relative w-full sm:w-1/3">
            <span className="absolute left-2.5 top-2 text-xs text-gray-400 font-semibold">{currencySymbol}</span>
            <input
              type="number"
              step="0.01"
              value={alertTargetPrice}
              onChange={(e) => setAlertTargetPrice(e.target.value)}
              placeholder="Target Price"
              className="w-full pl-6 pr-3 py-1.5 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>
          <input
            type="email"
            value={alertEmail}
            onChange={(e) => setAlertEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:w-1/2 px-3 py-1.5 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            required
          />
          <button
            type="submit"
            disabled={alertLoading}
            className="w-full sm:w-auto shrink-0 px-4 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 text-gray-950 transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            {alertLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
              </>
            ) : alertSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-800" /> Alert Saved!
              </>
            ) : (
              'Set Alert'
            )}
          </button>
        </div>
        {alertSuccess && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1.5 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            <span>Target alert saved to Firestore! You will receive an automated email notification when the price reaches {currencySymbol}{alertTargetPrice}.</span>
          </p>
        )}
        {alertError && (
          <p className="text-xs text-red-500 mt-1.5">
            {alertError}
          </p>
        )}
      </form>
    </div>
  );
};
