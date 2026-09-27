import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { PouchVisual } from './PouchVisual';
import { X, ShoppingBag, Sun, Sparkles, MapPin, Plus, Minus, Repeat, Recycle, Check } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<'single' | 'subscription'>('single');

  // ESC key listener & body scroll lock
  useEffect(() => {
    if (!product) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const currentPrice = purchaseType === 'subscription' ? product.subscriptionPrice : product.price;

  const handleAdd = () => {
    addToCart(product, quantity, purchaseType === 'subscription');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name[language]}
    >
      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E8DFD3] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label={t.modal.close}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-950 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Pouch Visual & Animal Mascot Info */}
          <div className="md:col-span-5 bg-gradient-to-b from-[#FAF7F2] to-[#F2ECE3] relative p-6 flex flex-col items-center justify-between min-h-[320px] border-b md:border-b-0 md:border-r border-[#E8DFD3]">
            
            {/* Top Mascot Tag */}
            {product.animalMascot && (
              <div className="w-full flex items-center justify-between text-xs">
                <span className="font-bold text-[#1F3325] bg-white px-3 py-1 rounded-full shadow-2xs border border-stone-200">
                  🐾 {product.animalMascot.name[language]}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  {product.packSize[language]}
                </span>
              </div>
            )}

            {/* Exact Pouch Rendering */}
            <div className="w-48 sm:w-56 max-w-full my-auto py-2">
              <PouchVisual fruitKey={product.fruitKey} />
            </div>

            {/* Clean Label Guarantee Badge */}
            <div className="w-full bg-white/95 backdrop-blur-xs p-3 rounded-2xl border border-stone-200 text-center text-xs text-[#1F3325] font-black tracking-tight">
              {product.cleanLabelClaim[language]}
            </div>
          </div>

          {/* Right Column: Nutrition, Details, Recycling & Cart */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-5 max-h-[85vh] overflow-y-auto bg-white">
            
            <div>
              <div className="inline-block text-[11px] uppercase tracking-wider text-[#35523D] font-bold bg-[#EAF2EC] px-2.5 py-0.5 rounded-full mb-1">
                {language === 'sv' ? 'Fruita · Något annorlunda' : 'Fruita · Something Different'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#19271E] mt-1">
                {product.name[language]}
              </h2>
              <p className="text-sm text-[#4E5E53] mt-2 leading-relaxed">
                {product.description[language]}
              </p>
            </div>

            {/* Animal Mascot Box */}
            {product.animalMascot && (
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200 text-xs text-[#1F3325] flex items-center gap-2.5">
                <span className="text-xl">🐾</span>
                <div>
                  <span className="font-bold">{product.animalMascot.name[language]} ({product.animalMascot.animal[language]}):</span>{' '}
                  <span className="text-stone-600">{product.animalMascot.trait[language]}</span>
                </div>
              </div>
            )}

            {/* Clean Ingredients Statement */}
            <div className="bg-[#F8F5EE] p-3.5 rounded-xl border border-[#E8DFD3] space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {t.modal.ingredients}
              </h3>
              <p className="text-xs sm:text-sm text-stone-900 font-bold">
                {product.ingredients[language]}
              </p>
            </div>

            {/* Nutritional Facts Table per 15g pouch */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  {language === 'sv' ? `Näringsvärde per påse (${product.weightGrams}g)` : `Nutrition Facts per pouch (${product.weightGrams}g)`}
                </h3>
                <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  {language === 'sv' ? '0g tillsatt socker' : '0g added sugar'}
                </span>
              </div>

              <div className="bg-stone-50 rounded-xl border border-stone-200 divide-y divide-stone-100 text-xs">
                <div className="flex justify-between px-3 py-1.5">
                  <span className="text-stone-500">{t.modal.energy}</span>
                  <span className="font-semibold text-stone-900">
                    {product.nutrition.energyKj} kJ / {product.nutrition.energyKcal} kcal
                  </span>
                </div>
                <div className="flex justify-between px-3 py-1.5">
                  <span className="text-stone-500">{t.modal.carbs}</span>
                  <span className="font-semibold text-stone-900">{product.nutrition.carbohydrates}</span>
                </div>
                <div className="flex justify-between px-3 py-1.5 pl-6 bg-white">
                  <span className="text-stone-500">{t.modal.sugars}</span>
                  <span className="font-bold text-[#1F3325]">
                    {product.nutrition.ofWhichSugars} {language === 'sv' ? '(100% naturlig fruktos)' : '(100% naturally occurring)'}
                  </span>
                </div>
                <div className="flex justify-between px-3 py-1.5">
                  <span className="text-stone-500">{t.modal.fiber}</span>
                  <span className="font-semibold text-stone-900">{product.nutrition.fiber}</span>
                </div>
                <div className="flex justify-between px-3 py-1.5">
                  <span className="text-stone-500">{t.modal.protein}</span>
                  <span className="font-semibold text-stone-900">{product.nutrition.protein}</span>
                </div>
                {product.nutrition.vitaminC && (
                  <div className="flex justify-between px-3 py-1.5 bg-emerald-50/70 text-[#1F3325]">
                    <span className="font-semibold">Vitamin C</span>
                    <span className="font-bold">{product.nutrition.vitaminC}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Swedish Recycling Guide (Återvinningsguide) */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 flex items-start gap-2.5">
              <Recycle className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-stone-900">
                  {language === 'sv' ? 'Återvinningsguide (Sverige)' : 'Recycling Guide'}:
                </span>
                <span className="text-[11px] text-stone-600">
                  {product.recyclingGuide[language]}
                </span>
              </div>
            </div>

            {/* Purchase Mode Toggle (Engångsköp vs. Månadsprenumeration) */}
            <div className="pt-2 border-t border-stone-100 space-y-3">
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#F5EFE6] rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setPurchaseType('single')}
                  className={`py-2 px-3 rounded-lg transition-all text-center ${
                    purchaseType === 'single'
                      ? 'bg-white text-[#1F3325] shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <div>{language === 'sv' ? 'Engångsköp' : 'One-time'}</div>
                  <div className="text-xs font-bold">{product.price} {language === 'sv' ? 'kr / st' : 'SEK / each'}</div>
                </button>

                <button
                  onClick={() => setPurchaseType('subscription')}
                  className={`py-2 px-3 rounded-lg transition-all text-center ${
                    purchaseType === 'subscription'
                      ? 'bg-[#274130] text-white shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <Repeat className="w-3 h-3" />
                    <span>{language === 'sv' ? 'Månadsprenumerera' : 'Monthly'}</span>
                  </div>
                  <div className={`text-xs font-bold ${purchaseType === 'subscription' ? 'text-[#E4C590]' : 'text-emerald-700'}`}>
                    {product.subscriptionPrice} {language === 'sv' ? 'kr / st (-15%)' : 'SEK / each (-15%)'}
                  </div>
                </button>
              </div>

              {purchaseType === 'subscription' && (
                <div className="text-[11px] text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    {language === 'sv'
                      ? 'Levereras automatiskt varje månad. Ingen bindningstid, avsluta när du vill.'
                      : 'Delivered automatically every month. No commitment, pause or cancel anytime.'}
                  </span>
                </div>
              )}

              {/* Price, Quantity & Add To Cart */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <div>
                  <div className="text-2xl font-black text-[#18261C]">
                    {currentPrice * quantity} {language === 'sv' ? 'kr' : 'SEK'}
                  </div>
                  <span className="text-[11px] text-stone-500">
                    {quantity > 1
                      ? (language === 'sv' ? `${currentPrice} kr / st` : `${currentPrice} SEK / each`)
                      : (language === 'sv' ? 'Inkl. moms' : 'Incl. VAT')}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-lg hover:bg-white"
                      aria-label={language === 'sv' ? 'Minska antal' : 'Decrease quantity'}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-stone-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-lg hover:bg-white"
                      aria-label={language === 'sv' ? 'Öka antal' : 'Increase quantity'}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-[#274130] hover:bg-[#1A2E22] text-white px-5 py-3 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#E4C590]" />
                    <span>{t.productCard.addToCart}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
