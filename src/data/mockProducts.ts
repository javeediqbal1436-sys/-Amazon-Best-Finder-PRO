import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    asin: 'B0BSHF7WHW',
    title: 'Apple AirPods Pro (2nd Generation) Wireless Earbuds with USB-C Charging',
    brand: 'Apple',
    category: 'bestsellers',
    price: 189.99,
    originalPrice: 249.00,
    discountPercent: 24,
    rating: 4.8,
    reviewCount: 42150,
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
    ],
    isPrime: true,
    isBestSeller: true,
    isLightningDeal: true,
    availability: 'In Stock',
    features: [
      'Up to 2x more Active Noise Cancelling with H2 chip',
      'Adaptive Audio seamlessly blends ANC and Transparency',
      'Personalized Spatial Audio with dynamic head tracking',
      'MagSafe Charging Case (USB-C) with speaker and lanyard loop',
      'Up to 6 hours listening time with ANC on'
    ],
    priceHistory: [
      { date: 'May 2026', amazonPrice: 249.00, thirdPartyPrice: 245.00 },
      { date: 'Jun 2026', amazonPrice: 239.00, thirdPartyPrice: 235.00 },
      { date: 'Jul 2026', amazonPrice: 199.99, thirdPartyPrice: 209.00 },
      { date: 'Aug 2026', amazonPrice: 219.00, thirdPartyPrice: 215.00 },
      { date: 'Sep 2026', amazonPrice: 199.00, thirdPartyPrice: 199.00 },
      { date: 'Oct 2026', amazonPrice: 189.99, thirdPartyPrice: 194.50 }
    ],
    lowestPriceEver: 189.99,
    highestPriceEver: 249.00,
    averagePrice: 215.30,
    aiReview: {
      summaryEn: 'Industry-leading Active Noise Cancellation with seamless Apple ecosystem integration and refined acoustic performance.',
      summaryUrdu: 'بہترین شور منسوخی (Active Noise Cancellation) اور ایپل کے ماحولیاتی نظام کے ساتھ بہترین ہم آہنگی۔ آواز کا معیار انتہائی شاندار ہے۔',
      prosEn: [
        'Top-tier Active Noise Cancellation and Transparency mode',
        'USB-C MagSafe case with Precision Finding speaker',
        'Immersive Spatial Audio with dynamic head tracking',
        'Sweat and water resistant (IP54)'
      ],
      prosUrdu: [
        'کلاس میں سب سے اعلیٰ شور منسوخی اور شفافیت کا موڈ',
        'اسپیکر کے ساتھ USB-C میگ سیف کیس جسے تلاش کرنا آسان ہے',
        'حیرت انگیز تھری ڈی آڈیو کوالٹی',
        'پسینے اور پانی سے محفوظ (IP54 سرٹیفائیڈ)'
      ],
      consEn: [
        'Best features locked exclusively to Apple ecosystem',
        'Battery life average compared to bulkier over-ear headphones'
      ],
      consUrdu: [
        'بہترین فیچرز صرف آئی فون اور ایپل ڈیوائسز پر کام کرتے ہیں',
        'بڑے اوور ایئر ہیڈ فونز کے مقابلے میں بیٹری درمیانی ہے'
      ],
      verdictEn: 'At $189.99, this is the lowest price ever recorded on camelcamelcamel. If you use an iPhone, this is an absolute must-buy deal.',
      verdictUrdu: '189.99 ڈالر کی قیمت میں یہ کیمل کیمل کیمل پر اب تک کی سب سے کم ترین قیمت ہے۔ اگر آپ آئی فون استعمال کرتے ہیں تو یہ ڈیل ہرگز مت چھوڑیں۔',
      score: 9.6,
      whoShouldBuyEn: 'Apple users, frequent commuters, gym-goers, and audiophiles needing pocketable high-grade noise cancellation.',
      whoShouldBuyUrdu: 'ایپل صارفین، سفر کرنے والے، اور روزانہ ورزش کرنے والے جنہیں پرسکون اور اعلیٰ آواز درکار ہے۔'
    }
  },
  {
    id: 'prod-2',
    asin: 'B09B8V1LZ3',
    title: 'Anker Soundcore P20i True Wireless Earbuds, 10mm Drivers with Big Bass',
    brand: 'Anker',
    category: 'under-50',
    price: 24.99,
    originalPrice: 39.99,
    discountPercent: 38,
    rating: 4.6,
    reviewCount: 31200,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    isPrime: true,
    isBestSeller: true,
    isLightningDeal: false,
    availability: 'In Stock',
    features: [
      'Powerful 10mm drivers with BassBoost technology',
      '30-hour extended playtime with compact pocket case',
      'Custom EQ with 22 presets via Soundcore App',
      'AI-enhanced dual mics for crystal-clear calls',
      'IPX5 water-resistant protection'
    ],
    priceHistory: [
      { date: 'May 2026', amazonPrice: 39.99, thirdPartyPrice: 38.00 },
      { date: 'Jun 2026', amazonPrice: 34.99, thirdPartyPrice: 33.50 },
      { date: 'Jul 2026', amazonPrice: 29.99, thirdPartyPrice: 29.00 },
      { date: 'Aug 2026', amazonPrice: 27.99, thirdPartyPrice: 28.00 },
      { date: 'Sep 2026', amazonPrice: 24.99, thirdPartyPrice: 26.50 },
      { date: 'Oct 2026', amazonPrice: 24.99, thirdPartyPrice: 25.00 }
    ],
    lowestPriceEver: 21.99,
    highestPriceEver: 39.99,
    averagePrice: 30.50,
    aiReview: {
      summaryEn: 'The undisputed budget wireless earbuds king under $30 with remarkable companion app customization and punchy bass.',
      summaryUrdu: '30 ڈالر سے کم قیمت میں بے تاج بادشاہ ایئربڈز۔ بہترین باس اور موبائل ایپ کے ذریعے حسب ضرورت سیٹنگز۔',
      prosEn: [
        'Incredible value for under $25',
        'Companion mobile app with 22 EQ presets',
        'Long 30-hour battery life with quick charging',
        'Lanyard included on case for portability'
      ],
      prosUrdu: [
        '25 ڈالر سے کم میں ناقابل یقین ویلیو',
        '22 ساؤنڈ پری سیٹس والی اینکر موبائل ایپ',
        '30 گھنٹے کی طویل بیٹری لائف اور فوری چارجنگ',
        'کیس پر لانیارڈ کی سہولت'
      ],
      consEn: [
        'No Active Noise Cancellation (passive isolation only)',
        'Plastic case feels lightweight'
      ],
      consUrdu: [
        'ایکٹو نوائز کینسلیشن (ANC) موجود نہیں ہے',
        'کیس کا میٹریل پلاسٹک پر مبنی ہے'
      ],
      verdictEn: 'The best audio value on Amazon right now. Perfect backup earbuds or everyday beater pair.',
      verdictUrdu: 'ایمیزون پر اس وقت کم قیمت میں سب سے بہترین ساؤنڈ آپشن۔ روزمرہ استعمال اور سفر کے لیے شاندار انتخاب۔',
      score: 9.1,
      whoShouldBuyEn: 'Students, budget-conscious shoppers, and runners needing dependable water-resistant audio.',
      whoShouldBuyUrdu: 'طلباء، بچت پسند صارفین اور کھلاڑی جو مناسب قیمت میں اچھے ایئربڈز چاہتے ہیں۔'
    }
  },
  {
    id: 'prod-3',
    asin: 'B00BAGT4A8',
    title: 'ChomChom Roller Pet Hair Remover and Lint Cleaner for Furniture & Carpets',
    brand: 'ChomChom',
    category: 'viral-tiktok',
    price: 19.99,
    originalPrice: 31.99,
    discountPercent: 38,
    rating: 4.7,
    reviewCount: 148900,
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    isPrime: true,
    isBestSeller: true,
    isTikTokViral: true,
    availability: 'In Stock',
    features: [
      '100% reusable roller without sticky tape or batteries',
      'Patented electrostatic charge traps cat and dog hair instantly',
      'Built-in waste chamber empties with single button press',
      'Over 500 million views across TikTok #AmazonFinds'
    ],
    priceHistory: [
      { date: 'May 2026', amazonPrice: 29.99, thirdPartyPrice: 28.00 },
      { date: 'Jun 2026', amazonPrice: 27.99, thirdPartyPrice: 26.50 },
      { date: 'Jul 2026', amazonPrice: 24.99, thirdPartyPrice: 25.00 },
      { date: 'Aug 2026', amazonPrice: 22.99, thirdPartyPrice: 24.00 },
      { date: 'Sep 2026', amazonPrice: 21.99, thirdPartyPrice: 22.00 },
      { date: 'Oct 2026', amazonPrice: 19.99, thirdPartyPrice: 21.00 }
    ],
    lowestPriceEver: 18.50,
    highestPriceEver: 31.99,
    averagePrice: 24.50,
    aiReview: {
      summaryEn: 'A viral TikTok sensation with over 140,000 positive reviews that genuinely works better than traditional adhesive lint rollers.',
      summaryUrdu: 'ٹک ٹاک پر وائرل ہونے والی مصنوعات جس پر ایک لاکھ چالیس ہزار سے زائد بہترین تبصرے ہیں اور یہ بالوں کو مکمل صاف کرتا ہے۔',
      prosEn: [
        'Zero waste - no sticky sheets or batteries needed ever',
        'Works magically on couches, velvet, blankets, and car seats',
        'One-click trap door for effortless disposal'
      ],
      prosUrdu: [
        'کوئی سٹکی پیپر یا بیٹریاں درکار نہیں، بار بار استعمال کریں',
        'صوفوں، قالینوں اور گاڑی کی سیٹوں سے بال فوری کھینچ لیتا ہے',
        'ایک بٹن دبا کر سارا کچرا آسانی سے نکالیں'
      ],
      consEn: [
        'Does not work on slick hard floor surfaces',
        'Requires forward-backward rolling motion'
      ],
      consUrdu: [
        'سخت ہموار فرش یا ٹائلز پر کام نہیں کرتا',
        'آگے پیچھے رول کرنے کا مخصوص طریقہ اپنانا پڑتا ہے'
      ],
      verdictEn: 'Saves hundreds of dollars over disposable lint tape. A certified viral must-have for all pet parents.',
      verdictUrdu: 'ڈسپوزیبل رولرز کے مقابلے میں سالانہ سینکڑوں ڈالر بچاتا ہے۔ پالتو جانور رکھنے والوں کے لیے لازمی تحفہ۔',
      score: 9.4,
      whoShouldBuyEn: 'Dog & cat owners, velvet couch collectors, and vehicle interior enthusiasts.',
      whoShouldBuyUrdu: 'بلی یا کتے پالنے والے اور گھر کی صفائی کے شوقین افراد۔'
    }
  },
  {
    id: 'prod-4',
    asin: 'B08N5WRWNW',
    title: 'Ninja AF101 Air Fryer that Crisps, Roasts, Reheats & Dehydrates, 4-Quart',
    brand: 'Ninja',
    category: 'home',
    price: 89.99,
    originalPrice: 129.99,
    discountPercent: 31,
    rating: 4.8,
    reviewCount: 88400,
    imageUrl: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80',
    isPrime: true,
    isBestSeller: true,
    availability: 'In Stock',
    features: [
      '4-Quart ceramic-coated nonstick basket fits 2 lbs of french fries',
      'Wide temperature range from 105°F to 400°F',
      'Dehydrate function for homemade beef jerky and dried fruits',
      'Up to 75% less fat than traditional deep-frying methods',
      'Dishwasher-safe parts for rapid cleanup'
    ],
    priceHistory: [
      { date: 'May 2026', amazonPrice: 129.99, thirdPartyPrice: 125.00 },
      { date: 'Jun 2026', amazonPrice: 119.99, thirdPartyPrice: 115.00 },
      { date: 'Jul 2026', amazonPrice: 99.99, thirdPartyPrice: 105.00 },
      { date: 'Aug 2026', amazonPrice: 99.99, thirdPartyPrice: 98.00 },
      { date: 'Sep 2026', amazonPrice: 94.99, thirdPartyPrice: 92.00 },
      { date: 'Oct 2026', amazonPrice: 89.99, thirdPartyPrice: 91.00 }
    ],
    lowestPriceEver: 79.99,
    highestPriceEver: 129.99,
    averagePrice: 104.50,
    aiReview: {
      summaryEn: 'The benchmark compact air fryer offering consistent crisping, rapid preheating, and unmatched ceramic nonstick durability.',
      summaryUrdu: 'کمپیکٹ ایئر فرائیر کا گولڈ اسٹینڈرڈ۔ کھانا انتہائی خستہ بناتا ہے اور اس کی سیرامک کوٹنگ دھوتے وقت آسانی دیتی ہے۔',
      prosEn: [
        'High heat circulation crisps without sogginess',
        'Ceramic nonstick basket is PTFE & PFOA free',
        'Includes dedicated dehydrate mode'
      ],
      prosUrdu: [
        'تیز گرم ہوا سے بغیر چکنائی کے کرسپی کھانا تیار ہوتا ہے',
        'سیرامک نان اسٹک باسکٹ صحت کے لیے محفوظ اور دیرپا ہے',
        'پھل اور گوشت خشک کرنے کا خاص ڈی ہائیڈریٹ موڈ'
      ],
      consEn: [
        '4-quart capacity is best for 1-3 people, not large families',
        'Audible fan noise while cooking at max temperature'
      ],
      consUrdu: [
        '4 کوارٹ کا سائز 2 سے 3 افراد کے لیے موزوں ہے، بڑے خاندان کے لیے چھوٹا ہے',
        'زیادہ درجہ حرارت پر پنکھے کی ہلکی آواز آتی ہے'
      ],
      verdictEn: 'One of Ninja’s highest rated kitchen machines ever. Solid discount makes it an effortless recommendation.',
      verdictUrdu: 'نینجا کی کچن مشینوں میں سب سے زیادہ پسند کی جانے والی پراڈکٹ۔ 31 فیصد رعایت کے ساتھ زبردست خریداری۔',
      score: 9.3,
      whoShouldBuyEn: 'Apartment dwellers, healthy meal preppers, and busy individuals wanting 15-minute dinners.',
      whoShouldBuyUrdu: 'کم وقت میں صحت بخش اور لذیذ کھانا تیار کرنے کے خواہشمند حضرات۔'
    }
  },
  {
    id: 'prod-5',
    asin: 'B08T177F8S',
    title: 'Stanley IceFlow Stainless Steel Tumbler with Straw (30 oz, Citron)',
    brand: 'Stanley',
    category: 'under-50',
    price: 35.00,
    originalPrice: 45.00,
    discountPercent: 22,
    rating: 4.8,
    reviewCount: 38900,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    isPrime: true,
    isTikTokViral: true,
    availability: 'In Stock',
    features: [
      'Double-wall vacuum insulation keeps drinks ice-cold for 48 hours',
      'Leak-resistant flip straw lid with ergonomic folding handle',
      'Fits standard car cup holders securely',
      '18/8 Pro-grade recycled stainless steel, BPA-free'
    ],
    priceHistory: [
      { date: 'May 2026', amazonPrice: 45.00, thirdPartyPrice: 44.00 },
      { date: 'Jun 2026', amazonPrice: 40.00, thirdPartyPrice: 42.00 },
      { date: 'Jul 2026', amazonPrice: 38.00, thirdPartyPrice: 38.50 },
      { date: 'Aug 2026', amazonPrice: 35.00, thirdPartyPrice: 37.00 },
      { date: 'Sep 2026', amazonPrice: 35.00, thirdPartyPrice: 35.00 },
      { date: 'Oct 2026', amazonPrice: 35.00, thirdPartyPrice: 35.00 }
    ],
    lowestPriceEver: 32.00,
    highestPriceEver: 45.00,
    averagePrice: 38.20,
    aiReview: {
      summaryEn: 'The spill-proof travel favorite that fixes the common leaks of the Quencher with a tight folding spout.',
      summaryUrdu: 'اسٹینلے کا بہترین واٹر ٹمبلر جس کا اسڑا لیک نہیں ہوتا اور پانی 48 گھنٹے تک برف جیسا ٹھنڈا رہتا ہے۔',
      prosEn: [
        'Truly leak-resistant flip straw mechanism',
        'Rugged handle folds flush for backpack carry',
        'Maintains coldness remarkably well even in summer heat'
      ],
      prosUrdu: [
        'لیک پروف فلپ اسڑا جس سے پانی کبھی نہیں گرتا',
        'مضبوط ہینڈل جسے آسانی سے بند کیا جا سکتا ہے',
        'گرمیوں میں بھی 48 گھنٹے تک پانی ٹھنڈا رہتا ہے'
      ],
      consEn: [
        'Straw requires periodic cleaning with thin brush',
        'Somewhat hefty when filled to 30 oz capacity'
      ],
      consUrdu: [
        'اسٹرا کو باریک برش سے باقاعدگی سے دھونا پڑتا ہے',
        'پانی سے بھرنے پر وزن قدرے بھاری ہو جاتا ہے'
      ],
      verdictEn: 'Better and more practical for the gym and commuting than the oversized 40oz Quencher.',
      verdictUrdu: 'جم، سفر اور روزمرہ کے لیے روایتی بڑے ٹمبلرز سے کہیں زیادہ محفوظ اور کارآمد۔',
      score: 9.2,
      whoShouldBuyEn: 'Hydration trackers, fitness buffs, road trippers, and university students.',
      whoShouldBuyUrdu: 'روزانہ پانی کا ہدف پورا کرنے والے اور ورزش کے شوقین افراد۔'
    }
  },
  {
    id: 'prod-6',
    asin: 'B07984JN3L',
    title: 'COSRX Snail Mucin 96% Power Repairing Essence Serum (3.38 fl.oz)',
    brand: 'COSRX',
    category: 'viral-tiktok',
    price: 14.59,
    originalPrice: 25.00,
    discountPercent: 42,
    rating: 4.6,
    reviewCount: 95400,
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    isPrime: true,
    isBestSeller: true,
    isTikTokViral: true,
    availability: 'In Stock',
    features: [
      'Contains 96.3% Snail Secretion Filtrate for deep cellular repair',
      'Intense lightweight hydration that calms redness and irritation',
      'Improves skin radiance, fine lines, and acne scar recovery',
      'Cruelty-free & dermatologist tested formula'
    ],
    priceHistory: [
      { date: 'May 2026', amazonPrice: 25.00, thirdPartyPrice: 23.00 },
      { date: 'Jun 2026', amazonPrice: 21.99, thirdPartyPrice: 20.00 },
      { date: 'Jul 2026', amazonPrice: 18.00, thirdPartyPrice: 18.50 },
      { date: 'Aug 2026', amazonPrice: 16.50, thirdPartyPrice: 17.00 },
      { date: 'Sep 2026', amazonPrice: 15.00, thirdPartyPrice: 15.50 },
      { date: 'Oct 2026', amazonPrice: 14.59, thirdPartyPrice: 15.00 }
    ],
    lowestPriceEver: 13.99,
    highestPriceEver: 25.00,
    averagePrice: 18.50,
    aiReview: {
      summaryEn: 'The #1 skincare phenomenon on TikTok and Amazon that delivers glass skin glow at under $15.',
      summaryUrdu: 'ٹک ٹاک اور ایمیزون کا نمبر 1 سکن کیئر سیرم جو چہرے کو قدرتی چمک اور نمی بخشتا ہے۔',
      prosEn: [
        'Absorbs quickly without greasy or heavy residue',
        'Visible plumping effect within 7 days of routine use',
        'Huge value at 42% off retail list price'
      ],
      prosUrdu: [
        'جلد میں فوری جذب ہو جاتا ہے اور چکنائی نہیں چھوڑتا',
        '7 دنوں کے اندر جلد کو نرم اور چمکدار بناتا ہے',
        '42 فیصد رعایت پر انتہائی سستی اور معیاری پراڈکٹ'
      ],
      consEn: [
        'Unique slimy texture takes 2-3 uses to get accustomed to',
        'Perform patch test first if you have dust mite allergies'
      ],
      consUrdu: [
        'اس کی خاص ساخت شروع میں تھوڑی مختلف لگ سکتی ہے',
        'اگر جلد حساس ہو تو پہلے بازو پر ٹیسٹ کریں'
      ],
      verdictEn: 'Rarely drops below $15. Stock up while this lightning discount is live.',
      verdictUrdu: 'قیمت شاذ و نادر ہی 15 ڈالر سے نیچے آتی ہے۔ زبردست سیل کی پیشکش۔',
      score: 9.5,
      whoShouldBuyEn: 'Anyone seeking hydrated, glassy skin and soothing relief from dry climates.',
      whoShouldBuyUrdu: 'خشک جلد والے اور چہرے پر قدرتی نکھار چاہنے والے مرد و خواتین۔'
    }
  },
  {
    id: 'prod-7',
    asin: 'B09V3HN1KC',
    title: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones',
    brand: 'Sony',
    category: 'tech',
    price: 328.00,
    originalPrice: 399.99,
    discountPercent: 18,
    rating: 4.7,
    reviewCount: 19800,
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    isPrime: true,
    isBestSeller: true,
    availability: 'In Stock',
    features: [
      'Two processors and 8 microphones for supreme noise cancellation',
      'Ultra-comfortable lightweight design with soft fit leather',
      'Up to 30-hour battery life with 3-minute quick charge for 3 hours',
      'Crystal-clear hands-free calling with 4 beamforming microphones',
      'Multipoint connection allows switching between two devices instantly'
    ],
    priceHistory: [
      { date: 'May 2026', amazonPrice: 399.99, thirdPartyPrice: 389.00 },
      { date: 'Jun 2026', amazonPrice: 378.00, thirdPartyPrice: 370.00 },
      { date: 'Jul 2026', amazonPrice: 348.00, thirdPartyPrice: 350.00 },
      { date: 'Aug 2026', amazonPrice: 348.00, thirdPartyPrice: 345.00 },
      { date: 'Sep 2026', amazonPrice: 328.00, thirdPartyPrice: 330.00 },
      { date: 'Oct 2026', amazonPrice: 328.00, thirdPartyPrice: 328.00 }
    ],
    lowestPriceEver: 328.00,
    highestPriceEver: 399.99,
    averagePrice: 360.50,
    aiReview: {
      summaryEn: 'The definitive over-ear active noise canceling king with plush comfort and class-leading microphone fidelity.',
      summaryUrdu: 'سونی کے مایہ ناز ہیڈ فونز جن کا شور منسوخ کرنے کا نظام دنیا میں سب سے اعلیٰ سمجھا جاتا ہے۔',
      prosEn: [
        'Supreme ANC eliminates airplane drone and busy cafe chatter',
        'Stellar 30-hour battery life with ultra-fast charging',
        'Crystal clear calls even in windy outdoor settings'
      ],
      prosUrdu: [
        'جہاز اور ہجوم کا شور مکمل ختم کر دینے والا نظام',
        '30 گھنٹے کی طویل بیٹری اور فوری 3 منٹ فاسٹ چارجنگ',
        'ہوا اور بیرونی شور کے باوجود شفاف کالنگ'
      ],
      consEn: [
        'Earcups fold flat but headband does not collapse inwards',
        'Premium price tag'
      ],
      consUrdu: [
        'پرانے ماڈل کی طرح اندر کی طرف فولڈ نہیں ہوتے',
        'قیمت کچھ صارفین کے لیے زیادہ ہو سکتی ہے'
      ],
      verdictEn: 'Current price of $328 is the all-time lowest Amazon price recorded on camelcamelcamel.',
      verdictUrdu: '328 ڈالر کی موجودہ قیمت تاریخی اعتبار سے سونی کے اس ماڈل کی سب سے کم قیمت ہے۔',
      score: 9.7,
      whoShouldBuyEn: 'Frequent flyers, remote knowledge workers, audio professionals, and gamers.',
      whoShouldBuyUrdu: 'فضائی سفر کرنے والے، دفاتر میں کام کرنے والے اور بہترین میوزک کے شیدائی۔'
    }
  },
  {
    id: 'prod-8',
    asin: 'B08KJN3333',
    title: 'ThermoPro TP03B Digital Instant Read Meat Thermometer with Backlight',
    brand: 'ThermoPro',
    category: 'under-50',
    price: 13.99,
    originalPrice: 22.99,
    discountPercent: 39,
    rating: 4.7,
    reviewCount: 112000,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    isPrime: true,
    isBestSeller: true,
    availability: 'In Stock',
    features: [
      'Lightning-fast 3-5 second response time with ±0.9°F accuracy',
      '3.9-inch food-grade stainless steel folding probe keeps hands safe',
      'Bright LCD backlight screen for evening backyard grilling',
      'Magnetic back and large hang hole for instant fridge storage'
    ],
    priceHistory: [
      { date: 'May 2026', amazonPrice: 22.99, thirdPartyPrice: 21.00 },
      { date: 'Jun 2026', amazonPrice: 19.99, thirdPartyPrice: 19.00 },
      { date: 'Jul 2026', amazonPrice: 16.99, thirdPartyPrice: 17.50 },
      { date: 'Aug 2026', amazonPrice: 15.99, thirdPartyPrice: 16.00 },
      { date: 'Sep 2026', amazonPrice: 14.99, thirdPartyPrice: 15.00 },
      { date: 'Oct 2026', amazonPrice: 13.99, thirdPartyPrice: 14.50 }
    ],
    lowestPriceEver: 11.99,
    highestPriceEver: 22.99,
    averagePrice: 17.80,
    aiReview: {
      summaryEn: 'Over 110,000 home chefs swear by this instant thermometer to guarantee juicy steaks and perfectly cooked chicken every single time.',
      summaryUrdu: 'گوشت، باربی کیو اور بیکنگ کے لیے انتہائی تیز اور درست ڈیجیٹل تھرمامیٹر۔ ہر کچن کے لیے ضروری آلہ۔',
      prosEn: [
        'Instant reading in under 4 seconds',
        'Magnetic back sticks directly onto oven or refrigerator',
        'Backlit screen is easily readable in dim lighting'
      ],
      prosUrdu: [
        'صرف 3 سے 4 سیکنڈ میں درست درجہ حرارت بتاتا ہے',
        'فریج یا اوون کے ساتھ مقناطیس کی مدد سے چپک جاتا ہے',
        'رات کے باربی کیو میں لائٹ والی اسکرین باآسانی نظر آتی ہے'
      ],
      consEn: [
        'Not water-submersible (wipe clean only)',
        'AAA battery powered rather than USB-rechargeable'
      ],
      consUrdu: [
        'مکمل پانی میں نہیں ڈبویا جا سکتا، گیلے کپڑے سے صاف کریں',
        'سیل سے چلتا ہے، ریچارج ایبل نہیں ہے'
      ],
      verdictEn: 'At less than $14, it pays for itself by preventing a single burnt prime steak or dried turkey.',
      verdictUrdu: '14 ڈالر سے بھی کم میں کچن کا سب سے مفید ٹول جو کھانے کو خراب ہونے سے بچاتا ہے۔',
      score: 9.3,
      whoShouldBuyEn: 'BBQ masters, home cooks, holiday turkey bakers, and meal-prep chefs.',
      whoShouldBuyUrdu: 'کھانا پکانے والے، باربی کیو بنانے والے اور گھریلو شیفس۔'
    }
  },
  {
    id: 'prod-9',
    asin: 'B07FZ8S74R',
    title: 'Echo Pop | Compact smart speaker with Full sound and Alexa (Charcoal)',
    brand: 'Amazon',
    category: 'under-50',
    price: 22.99,
    originalPrice: 39.99,
    discountPercent: 43,
    rating: 4.7,
    reviewCount: 68300,
    imageUrl: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80',
    isPrime: true,
    isBestSeller: true,
    availability: 'In Stock',
    features: [
      'Compact front-firing smart speaker with rich vibrant audio',
      'Voice control music from Amazon Music, Spotify, Apple Music',
      'Smart home hub for lights, plugs, thermostats, and locks',
      'Built-in privacy controls including a dedicated microphone off button'
    ],
    priceHistory: [
      { date: 'May 2026', amazonPrice: 39.99, thirdPartyPrice: 39.00 },
      { date: 'Jun 2026', amazonPrice: 34.99, thirdPartyPrice: 35.00 },
      { date: 'Jul 2026', amazonPrice: 24.99, thirdPartyPrice: 26.00 },
      { date: 'Aug 2026', amazonPrice: 24.99, thirdPartyPrice: 25.00 },
      { date: 'Sep 2026', amazonPrice: 22.99, thirdPartyPrice: 23.50 },
      { date: 'Oct 2026', amazonPrice: 22.99, thirdPartyPrice: 23.00 }
    ],
    lowestPriceEver: 17.99,
    highestPriceEver: 39.99,
    averagePrice: 28.50,
    aiReview: {
      summaryEn: 'Amazon’s newest aesthetic hemisphere speaker designed specifically for bedrooms and home desks with surprising audio output.',
      summaryUrdu: 'ایمیزون کا خوبصورت اور اسمارٹ اسپیکر جو بیڈ روم اور ورک ڈیسک کے لیے پرفیکٹ ہے۔ الیکسا کی آواز سے کنٹرول ہوتا ہے۔',
      prosEn: [
        'Compact stylish design fits tiny nightstands',
        'Front-firing speaker delivers clear vocals and podcasts',
        'Full Alexa voice ecosystem for $23'
      ],
      prosUrdu: [
        'انتہائی خوبصورت ڈیزائن جو کم جگہ گھیرتا ہے',
        'واضح آواز اور پوڈ کاسٹ کے لیے بہترین فرنٹ اسپیکر',
        'صرف 23 ڈالر میں مکمل سمارٹ ہوم کنٹرول'
      ],
      consEn: [
        'Bass is modest compared to the larger Echo Studio',
        'No 3.5mm auxiliary audio output jack'
      ],
      consUrdu: [
        'بڑے اسپیکرز کے مقابلے میں باس درمیانی ہے',
        'ہیڈفون کی 3.5mm پورٹ موجود نہیں ہے'
      ],
      verdictEn: 'The easiest and most affordable way to add Alexa smart control to every bedroom in the house.',
      verdictUrdu: 'گھر کے ہر کمرے میں سمارٹ لائٹس اور الیکسا شامل کرنے کا سب سے سستا اور آسان حل۔',
      score: 9.0,
      whoShouldBuyEn: 'Dorm students, smart home beginners, and audiobook lovers.',
      whoShouldBuyUrdu: 'سٹوڈنٹس، اسمارٹ ہوم بنانے کے خواہشمند اور موسیقی پسند افراد۔'
    }
  },
  {
    id: 'prod-10',
    asin: 'B0C7W5R179',
    title: 'Sunset Lamp Projection Ambient Night Light with App and Remote Control',
    brand: 'Solux',
    category: 'viral-tiktok',
    price: 16.99,
    originalPrice: 29.99,
    discountPercent: 43,
    rating: 4.5,
    reviewCount: 22100,
    imageUrl: 'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?auto=format&fit=crop&w=800&q=80',
    isPrime: true,
    isTikTokViral: true,
    availability: 'In Stock',
    features: [
      '16 multi-color gradient options including Golden Hour Sunset and Rainbow',
      '360-degree rotatable aluminum alloy head for endless projection angles',
      'Smart mobile app syncs lighting to background music beats',
      'HD thickened crystal lens produces vibrant, glare-free optical halos'
    ],
    priceHistory: [
      { date: 'May 2026', amazonPrice: 29.99, thirdPartyPrice: 28.00 },
      { date: 'Jun 2026', amazonPrice: 24.99, thirdPartyPrice: 25.00 },
      { date: 'Jul 2026', amazonPrice: 19.99, thirdPartyPrice: 20.00 },
      { date: 'Aug 2026', amazonPrice: 18.99, thirdPartyPrice: 19.00 },
      { date: 'Sep 2026', amazonPrice: 16.99, thirdPartyPrice: 17.50 },
      { date: 'Oct 2026', amazonPrice: 16.99, thirdPartyPrice: 17.00 }
    ],
    lowestPriceEver: 14.99,
    highestPriceEver: 29.99,
    averagePrice: 21.20,
    aiReview: {
      summaryEn: 'The background lighting piece that defined TikTok aesthetic videos, transforming any plain wall into an ambient sunset.',
      summaryUrdu: 'ٹک ٹاک اور انسٹاگرام ویڈیوز کا سب سے مشہور ایمبینٹ لیمپ، جو دیوار پر خوبصورت غروبِ آفتاب کا نظارہ تخلیق کرتا ہے۔',
      prosEn: [
        'Creates mesmerizing photography backgrounds instantly',
        'Heavy metal base prevents tipping over',
        'Includes both wireless remote and phone app'
      ],
      prosUrdu: [
        'فوٹوگرافی اور ریلز کے لیے لاجواب سنہری بیک گراؤنڈ',
        'وزنی بنیاد کی وجہ سے گرنے سے محفوظ رہتا ہے',
        'ریموٹ اور موبائل ایپ دونوں سے رنگ تبدیل ہوتے ہیں'
      ],
      consEn: [
        'USB power brick not included in box (cable included)',
        'Projection grows dimmer across very vast open spaces'
      ],
      consUrdu: [
        'باکس میں USB اڈاپٹر نہیں، کیبل موجود ہے',
        'بہت بڑے ہال میں روشنی کی شدت قدرے کم ہوتی ہے'
      ],
      verdictEn: 'An absolute bargain under $17 for content creators and cozy bedroom vibes.',
      verdictUrdu: '17 ڈالر سے کم میں بہترین تحفہ اور کمرے کی سجاوٹ کا زبردست سامان۔',
      score: 8.9,
      whoShouldBuyEn: 'TikTok & Instagram creators, photographers, teenagers, and cozy room decorators.',
      whoShouldBuyUrdu: 'ویڈیو اور فوٹو بنانے والے، نوجوان اور کمرے کو خوبصورت بنانے کے شوقین۔'
    }
  },
  {
    id: 'prod-11',
    asin: 'B08F9V7W53',
    title: 'Scrub Daddy Sponge Set with FlexTexture - Scratch-Free Odor-Resistant (4 Pack)',
    brand: 'Scrub Daddy',
    category: 'viral-tiktok',
    price: 13.98,
    originalPrice: 19.99,
    discountPercent: 30,
    rating: 4.9,
    reviewCount: 84200,
    imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=80',
    isPrime: true,
    isBestSeller: true,
    isTikTokViral: true,
    availability: 'In Stock',
    features: [
      'FlexTexture changes with water temperature: firm in cold, soft in warm',
      'Scratch-free on non-stick pans, stainless steel, glass, and car paint',
      'Laboratory tested to remain odor-free for up to 8 continuous weeks',
      'Eye and smile holes provide 360-degree utensil and cup cleaning'
    ],
    priceHistory: [
      { date: 'May 2026', amazonPrice: 19.99, thirdPartyPrice: 19.00 },
      { date: 'Jun 2026', amazonPrice: 17.99, thirdPartyPrice: 17.50 },
      { date: 'Jul 2026', amazonPrice: 15.99, thirdPartyPrice: 16.00 },
      { date: 'Aug 2026', amazonPrice: 14.99, thirdPartyPrice: 15.00 },
      { date: 'Sep 2026', amazonPrice: 13.98, thirdPartyPrice: 14.50 },
      { date: 'Oct 2026', amazonPrice: 13.98, thirdPartyPrice: 14.00 }
    ],
    lowestPriceEver: 12.50,
    highestPriceEver: 19.99,
    averagePrice: 16.20,
    aiReview: {
      summaryEn: 'Shark Tank’s most successful product of all time and a permanent viral TikTok favorite with unmatched 4.9 star satisfaction.',
      summaryUrdu: 'شارک ٹینک اور ٹک ٹاک کی تاریخ کا سب سے کامیاب اسفنج، جو گرم پانی میں نرم اور ٹھنڈے پانی میں سخت ہو جاتا ہے۔ بدبو سے پاک۔',
      prosEn: [
        'Does not scratch delicate nonstick pans or glassware',
        'Rinses completely clean without retaining odors or food debris',
        'Ergonomic smiley face cleans spoons and mugs effortlessly'
      ],
      prosUrdu: [
        'نان اسٹک برتنوں اور شیشے پر کبھی کوئی خراش نہیں ڈالتا',
        '8 ہفتوں تک بغیر کسی ناگوار بدبو کے بالکل صاف رہتا ہے',
        'چمچوں اور کپوں کو صاف کرنے کا زبردست اسمائلی ڈیزائن'
      ],
      consEn: [
        'Will wear down after 2-3 months of heavy burnt-pan scrubbing',
        'Higher initial cost than standard cheap yellow sponge bricks'
      ],
      consUrdu: [
        'شدید جلے ہوئے برتنوں پر زیادہ رگڑنے سے 2 سے 3 ماہ بعد گھس جاتا ہے',
        'عام سستے اسفنج سے قیمت تھوڑی زیادہ ہے'
      ],
      verdictEn: 'Once you use Scrub Daddy, you will never buy a generic green-and-yellow kitchen sponge again.',
      verdictUrdu: 'ایک بار استعمال کرنے کے بعد آپ عام روایتی اسفنج بھول جائیں گے۔ 4.9 ریٹنگ اس کی گواہ ہے۔',
      score: 9.8,
      whoShouldBuyEn: 'Anyone who washes dishes, cookware enthusiasts, and cleaning perfectionists.',
      whoShouldBuyUrdu: 'برتن دھونے والے اور کچن کی مکمل صفائی کے خواہشمند افراد۔'
    }
  },
  {
    id: 'prod-12',
    asin: 'B07W9541CL',
    title: 'Kindle Paperwhite (16 GB) – Now with 6.8" display and adjustable warm light',
    brand: 'Amazon',
    category: 'bestsellers',
    price: 129.99,
    originalPrice: 169.99,
    discountPercent: 24,
    rating: 4.8,
    reviewCount: 52400,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    isPrime: true,
    isBestSeller: true,
    availability: 'In Stock',
    features: [
      '6.8-inch glare-free 300 ppi Paperwhite display reads like real paper',
      'Adjustable warm amber light to protect sleep cycles at night',
      'Up to 10 weeks of battery life on a single USB-C charge',
      'IPX8 waterproof rating withstands accidental submersion in bath or pool',
      'Instant access to millions of titles with Kindle Unlimited integration'
    ],
    priceHistory: [
      { date: 'May 2026', amazonPrice: 169.99, thirdPartyPrice: 165.00 },
      { date: 'Jun 2026', amazonPrice: 159.99, thirdPartyPrice: 155.00 },
      { date: 'Jul 2026', amazonPrice: 139.99, thirdPartyPrice: 145.00 },
      { date: 'Aug 2026', amazonPrice: 139.99, thirdPartyPrice: 138.00 },
      { date: 'Sep 2026', amazonPrice: 129.99, thirdPartyPrice: 132.00 },
      { date: 'Oct 2026', amazonPrice: 129.99, thirdPartyPrice: 130.00 }
    ],
    lowestPriceEver: 119.99,
    highestPriceEver: 169.99,
    averagePrice: 147.50,
    aiReview: {
      summaryEn: 'The supreme e-reader for book lovers, offering weeks of distraction-free reading with soothing warm amber lighting.',
      summaryUrdu: 'کتابیں پڑھنے کے شیدائیوں کے لیے دنیا کا سب سے بہترین ای ریڈر۔ اصلی کاغذ جیسا سکرین تجربہ اور 10 ہفتے کی بیٹری۔',
      prosEn: [
        'Zero glare even under direct bright sunlight',
        'Incredible 10-week battery life between charges',
        'Waterproof design allows reading in tub or beachside'
      ],
      prosUrdu: [
        'تیز دھوپ میں بھی سکرین پر کوئی چمک نہیں پڑتی',
        'ایک چارج پر پورے 10 ہفتے تک چلتا ہے',
        'واٹر پروف ہونے کے باعث غسل یا پول کے کنارے بھی محفوظ ہے'
      ],
      consEn: [
        'Monochrome E-Ink display is strictly for reading, not web video',
        'Lock screen ad-supported version costs $10 less than ad-free'
      ],
      consUrdu: [
        'بلیک اینڈ وائٹ سکرین صرف پڑھائی کے لیے ہے، ویڈیوز کے لیے نہیں',
        'اشتہارات کے بغیر والا ورژن دس ڈالر مہنگا ہوتا ہے'
      ],
      verdictEn: 'The best investment you can make for your mind and reading habits. Superb discount.',
      verdictUrdu: 'مطالعہ کے شوقین افراد کے لیے بہترین سرمایہ کاری۔ زبردست رعایتی قیمت۔',
      score: 9.6,
      whoShouldBuyEn: 'Bookworms, students, vacation travelers, and anyone wanting to reduce phone screen time.',
      whoShouldBuyUrdu: 'مطالعہ کرنے والے، طلباء اور موبائل سکرین سے دور رہنے کے خواہشمند افراد۔'
    }
  }
];
