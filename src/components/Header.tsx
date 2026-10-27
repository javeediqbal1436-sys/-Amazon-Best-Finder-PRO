import React, { useState } from 'react';
import {
  Search,
  Sliders,
  ShieldCheck,
  Moon,
  Sun,
  Layers,
  Settings,
  BookOpen,
  Share2,
  Menu,
  X,
  Flame,
  CheckCircle2,
  ChevronRight,
  User,
  Crown,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  affiliateTag: string;
  compareCount: number;
  onOpenComparison: () => void;
  onOpenAdmin: () => void;
  onOpenAuth: () => void;
  onNavigateBlog: () => void;
  isBlogActive: boolean;
  onNavigateHome: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  affiliateTag,
  compareCount,
  onOpenComparison,
  onOpenAdmin,
  onOpenAuth,
  onNavigateBlog,
  isBlogActive,
  onNavigateHome,
  darkMode,
  onToggleDarkMode,
}) => {
  const { user, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#131921] text-white shadow-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={onNavigateHome}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-gray-950 font-black shadow-md">
              <span className="text-xl">a</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white hover:text-amber-400 transition-colors">
                  Amazon Best Finder
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-amber-400 text-gray-950 uppercase tracking-wider">
                  PRO
                </span>
              </div>
              <div className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>Prime Deals & Price History Engine</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-auto hidden md:block">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search deals, AirPods, Ninja, Anker, TikTok viral..."
                className="w-full bg-white text-gray-900 placeholder-gray-500 text-xs sm:text-sm pl-10 pr-20 py-2.5 rounded-xl border-2 border-transparent focus:border-amber-400 focus:outline-none transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-12 text-gray-400 hover:text-gray-600 text-xs p-1"
                >
                  ✕
                </button>
              )}
              <div className="absolute right-2 px-2 py-1 rounded-md bg-amber-400 text-gray-950 font-extrabold text-[11px] pointer-events-none">
                PA-API 5
              </div>
            </div>
          </div>

          {/* Actions / Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Active Tag pill */}
            <div
              onClick={onOpenAdmin}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-800/80 hover:bg-gray-800 border border-gray-700 text-gray-300 text-xs font-mono cursor-pointer transition-colors"
              title="Click to manage Affiliate Tag in Admin Panel"
            >
              <span className="text-[10px] text-gray-400 uppercase">Tag:</span>
              <span className="text-amber-400 font-bold">{affiliateTag}</span>
            </div>

            {/* Comparison button */}
            <button
              onClick={onOpenComparison}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                compareCount > 0
                  ? 'bg-amber-400 text-gray-950 shadow-sm'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Compare</span>
              {compareCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-gray-950 text-amber-300 text-[10px] font-black">
                  {compareCount}/4
                </span>
              )}
            </button>

            {/* Blog Button */}
            <button
              onClick={onNavigateBlog}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                isBlogActive
                  ? 'bg-amber-400 text-gray-950'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Guides & Blog</span>
            </button>

            {/* Admin Panel button - strictly highlighted or restricted */}
            <button
              onClick={onOpenAdmin}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isAdmin
                  ? 'bg-amber-400 text-gray-950 shadow-md ring-2 ring-amber-300'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
              }`}
              title={isAdmin ? 'Store Owner Admin Panel' : 'Admin Panel (javeediqbal1436@gmail.com only)'}
            >
              {isAdmin ? <Crown className="w-4 h-4 text-gray-950" /> : <Settings className="w-4 h-4 text-amber-400" />}
              <span className="hidden lg:inline">{isAdmin ? 'Admin Portal' : 'Admin'}</span>
            </button>

            {/* Auth / Profile Button */}
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold transition-colors cursor-pointer border border-gray-700"
            >
              {user ? (
                <>
                  <div className="w-5 h-5 rounded-full bg-amber-400 text-gray-950 flex items-center justify-center font-bold text-[10px]">
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline max-w-[90px] truncate">
                    {user.displayName?.split(' ')[0] || 'Account'}
                  </span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Sign In / لاگ ان</span>
                </>
              )}
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-blue-300" />}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-gray-800 text-gray-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="pb-3 md:hidden">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Amazon deals, ASIN, or product..."
              className="w-full bg-white text-gray-900 placeholder-gray-500 text-xs pl-9 pr-16 py-2 rounded-xl border border-gray-300 focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3" />
            <div className="absolute right-2 px-1.5 py-0.5 rounded bg-amber-400 text-gray-950 font-bold text-[10px]">
              PA-API
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-800 space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 bg-gray-800/60 rounded-lg">
              <span className="text-gray-400">Active Affiliate Tag:</span>
              <span className="font-mono font-bold text-amber-400">{affiliateTag}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onNavigateHome();
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 rounded-lg bg-gray-800 text-white font-semibold text-center"
              >
                Deals Home
              </button>
              <button
                onClick={() => {
                  onNavigateBlog();
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 rounded-lg bg-gray-800 text-white font-semibold text-center"
              >
                Guides & Blog
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
