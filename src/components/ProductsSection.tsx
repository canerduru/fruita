import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Product, ProductTag } from '../types';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, PackageCheck } from 'lucide-react';

export const ProductsSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedTag, setSelectedTag] = useState<ProductTag>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const filterTabs: { id: ProductTag; label: string }[] = [
    { id: 'all', label: t.filter.all },
    { id: 'kids', label: t.filter.kids },
    { id: 'fika', label: t.filter.fika },
    { id: 'mellanmal', label: t.filter.mellanmal },
    { id: 'bundles', label: t.filter.bundles },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedTag === 'all') return true;
    return p.tag === selectedTag;
  });

  return (
    <section id="produkter" className="py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#35523D] bg-[#E8EFEA] px-3 py-1 rounded-full border border-[#CAD8CE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'sv' ? '100% Ren Natur' : '100% Pure Harvest'}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-serif-nordic font-normal text-[#1A261D] tracking-tight">
            {language === 'sv'
              ? 'Handplockat & Frystorkat för Nordiska Hem'
              : 'Hand-Harvested & Freeze-Dried for Nordic Homes'}
          </h2>
          
          <p className="text-sm sm:text-base text-[#4E5D52] font-light">
            {language === 'sv'
              ? 'Upptäck krispiga jordgubbar, solmogna fikon och gyllene aprikoser. Skapade för förskoleryggsäcken, eftermiddagsfikat och fredagsmyset.'
              : 'Discover crispy strawberries, wild figs, and sun apricots. Perfect for lunchboxes, afternoon fika, and mindful snacking.'}
          </p>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTag(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedTag === tab.id
                  ? 'bg-[#2D4033] text-white shadow-sm'
                  : 'bg-[#F0E9DF] text-[#415346] hover:bg-[#E7DFC0]/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={(p) => setActiveModalProduct(p)}
            />
          ))}
        </div>

        {/* Value Bundle Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#243B2B] to-[#2E4835] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="max-w-2xl relative z-10 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#E4C590] font-bold">
              {language === 'sv' ? 'Tips till Familjen' : 'Family Bundle Tip'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-nordic font-normal leading-snug">
              {language === 'sv'
                ? 'Spara 27 kr på Fruita Skolbox (6-pack)'
                : 'Save on our Fruita School 6-Pack'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light">
              {language === 'sv'
                ? 'Alla 6 djurkompisar och smaker samlade (Jordgubbe, Banan, Äpple, Hallon, Björnbär, Mango). 100% ren frukt och noll kladd i ryggsäcken!'
                : 'All 6 collectible animal mascot pouches gathered together. 100% pure fruit crunch and zero sticky mess in school backpacks!'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  const bundle = PRODUCTS.find((p) => p.id === 'fruita-skolbox');
                  if (bundle) setActiveModalProduct(bundle);
                }}
                className="inline-flex items-center gap-2 bg-[#FAF7F2] text-[#243B2B] hover:bg-white px-5 py-2.5 rounded-xl font-semibold text-xs transition-colors shadow-sm"
              >
                <PackageCheck className="w-4 h-4 text-[#243B2B]" />
                <span>{language === 'sv' ? 'Se Skolboxen (149 kr)' : 'View School Box (149 SEK)'}</span>
              </button>
            </div>
          </div>

          {/* Decorative Background Stamp */}
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <svg className="w-64 h-64 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 11C3 6.03 7.03 2 12 2z"/>
            </svg>
          </div>
        </div>

      </div>

      {/* Product Quick View Modal */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </section>
  );
};
