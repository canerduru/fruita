export type Language = 'sv' | 'en';

export type ProductTag = 'all' | 'mellanmal' | 'fika' | 'kids' | 'bundles';

export interface NutritionalInfo {
  energyKcal: number;
  energyKj: number;
  fat: string;
  ofWhichSaturates: string;
  carbohydrates: string;
  ofWhichSugars: string; // naturally occurring fructose
  fiber: string;
  protein: string;
  salt: string;
  vitaminC?: string;
  potassium?: string;
}

export interface Product {
  id: string;
  slug: string;
  fruitKey: 'banan' | 'jordgubbe' | 'bjornbar' | 'apple' | 'hallon' | 'mango' | 'bundle_all' | 'bundle_berries';
  animalMascot?: {
    name: {
      sv: string;
      en: string;
    };
    animal: {
      sv: string;
      en: string;
    };
    trait: {
      sv: string;
      en: string;
    };
  };
  name: {
    sv: string;
    en: string;
  };
  subtitle: {
    sv: string;
    en: string;
  };
  cleanLabelClaim: {
    sv: string;
    en: string;
  };
  description: {
    sv: string;
    en: string;
  };
  price: number; // in SEK (one-time)
  originalPrice?: number;
  subscriptionPrice: number; // in SEK (save 15%)
  weightGrams: number;
  packSize: {
    sv: string;
    en: string;
  };
  tag: ProductTag;
  badge?: {
    sv: string;
    en: string;
  };
  origin: {
    region: string;
    country: string;
    farmerPartner: string;
    harvestSeason: string;
  };
  ingredients: {
    sv: string;
    en: string;
  };
  nutrition: NutritionalInfo;
  recyclingGuide: {
    bin: string;
    sv: string;
    en: string;
  };
  colorTheme: {
    bg: string;
    accent: string;
    border: string;
    pouchHex: string;
    waveHex: string;
    textHex: string;
  };
  image: string;
  crunchProfile: {
    sv: string;
    en: string;
  };
  pairingTip: {
    sv: string;
    en: string;
  };
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isSubscription?: boolean;
  frequency?: 'monthly' | 'biweekly';
}

export interface User {
  id: string;
  email: string;
  name: string;
  isLoggedIn: boolean;
  points?: number;
}
