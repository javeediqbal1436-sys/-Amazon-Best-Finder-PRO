export type ProductCategory = 
  | 'all'
  | 'under-50'
  | 'bestsellers'
  | 'viral-tiktok'
  | 'tech'
  | 'home'
  | 'fitness'
  | 'fashion';

export interface PricePoint {
  date: string;
  amazonPrice: number;
  thirdPartyPrice: number;
}

export interface AIReviewData {
  summaryEn: string;
  summaryUrdu: string;
  prosEn: string[];
  prosUrdu: string[];
  consEn: string[];
  consUrdu: string[];
  verdictEn: string;
  verdictUrdu: string;
  score: number;
  whoShouldBuyEn: string;
  whoShouldBuyUrdu: string;
  generatedAt?: string;
}

export interface Product {
  id: string;
  asin: string;
  title: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  additionalImages?: string[];
  isPrime: boolean;
  isBestSeller?: boolean;
  isLightningDeal?: boolean;
  isTikTokViral?: boolean;
  availability: 'In Stock' | 'Only 2 Left' | 'In Stock Soon';
  features: string[];
  priceHistory: PricePoint[];
  lowestPriceEver: number;
  highestPriceEver: number;
  averagePrice: number;
  aiReview?: AIReviewData;
  amazonUrl?: string;
}

export interface AffiliateSettings {
  affiliateTag: string; // e.g. "shorkot-20"
  amazonRegion: string; // e.g. "com" | "co.uk" | "de" | "ca"
  currencySymbol: string; // e.g. "$"
  paapiAccessKey: string;
  paapiSecretKey: string;
  paapiStatus: 'configured' | 'demo_mode' | 'active';
  autoEmbedInBlog: boolean;
  siteName: string;
}

export interface ClickLog {
  id: string;
  productId: string;
  productTitle: string;
  asin: string;
  price: number;
  timestamp: string;
  referrer: string;
  affiliateTag: string;
  category: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  readTime: string;
  date: string;
  author: string;
  featuredProductIds: string[];
  tags: string[];
}
