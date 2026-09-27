import React, { useState } from 'react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { PouchVisual } from './PouchVisual';
import { ShoppingBag, Eye, Heart, Plus, Minus, Check, Repeat, Recycle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<'single' | 'subscription'>('single');
  const [isJustAdded, setIsJustAdded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, isHovered: false });

  const isFav = isFavorite(product.id);
  const currentPrice = purchaseType === 'subscription' ? product.subscriptionPrice : product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity, purchaseType === 'subscription');
    setIsJustAdded(true);
    setTimeout(() => setIsJustAdded(false), 1200);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -7;
    const tiltY = ((x - centerX) / centerX) * 7;
    setTilt({ x: tiltX, y: tiltY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, isHovered: false });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white rounded-3xl border border-[#E8DFD3] hover:border-[#1E3A27]/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col overflow-hidden perspective-1000"
    >
      
      {/* Top Pouch Visual Container with 3D Gyroscope Effect */}
      <div
        onClick={() => onOpenDetails(product)}
        className="relative pt-6 pb-2 px-6 flex items-center justify-center bg-gradient-to-b from-[#FAF7F2] via-[#F6F1E9] to-white cursor-pointer overflow-hidden transform-style-3d"
      >
        {/* Pouch with dynamic 3D tilt & smooth spring */}
        <div 
          style={{
            transform: tilt.isHovered 
              ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.05, 1.05, 1.05)`
              : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: tilt.isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
          }}
          className="w-48 sm:w-52 max-w-full relative"
        >
          <PouchVisual fruitKey={product.fruitKey} />
          
          {/* Subtle Dynamic Sheen Overlay */}
          {tilt.isHovered && (
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-40 mix-blend-overlay transition-opacity"
              style={{
                background: `radial-gradient(circle at ${50 + tilt.y * 5}% ${50 - tilt.x * 5}%, rgba(255,255,255,0.8) 0%, transparent 60%)`
              }}
            />
          )}
        </div>

        {/* Mascot & Pack Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1 items-start">
          {product.animalMascot && (
            <span className="text-[11px] font-bold text-[#1F3325] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-2xs border border-stone-200">
              🐾 {product.animalMascot.name[language]}
            </span>
          )}
          <span className="text-[10px] font-semibold text-stone-600 bg-[#F5EFE6] px-2 py-0.5 rounded-full border border-stone-200/50">
            {product.packSize[language]}
          </span>
        </div>

        {/* Wishlist Heart with Accessible Touch Target (min 44x44px) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label={language === 'sv' ? `Spara ${product.name.sv} till favoriter` : `Save ${product.name.en} to favorites`}
          className="absolute top-2 right-2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-xs text-stone-500 hover:text-rose-600 flex items-center justify-center transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isFav ? 'fill-rose-500 text-rose-500 scale-110' : 'text-stone-500'
            }`}
          />
        </button>

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(product);
          }}
          aria-label={language === 'sv' ? `Snabbgranska ${product.name.sv}` : `Quick view ${product.name.en}`}
          className="absolute inset-x-6 bottom-3 py-2.5 bg-white/95 backdrop-blur-xs text-[#1E3A27] text-xs font-bold rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-[#FAF7F2] cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          <span>{t.productCard.viewDetails}</span>
        </button>
      </div>

      {/* Card Body: Bold, Playful & Honest Copy (Oatly / Färsking Style) */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white border-t border-stone-100 space-y-4">
        
        <div className="space-y-2">
          {/* Honest Clean Label Statement */}
          <div className="text-xs font-black tracking-tight text-[#1F3325] bg-[#EAF2EC] border border-[#CAD8CE] px-2.5 py-1 rounded-lg inline-block">
            {product.cleanLabelClaim[language]}
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onOpenDetails(product)}
            className="text-lg font-black text-[#1A261D] group-hover:text-[#1E3A27] cursor-pointer transition-colors leading-tight"
          >
            {product.name[language]}
          </h3>

          {/* Honest, unpretentious description */}
          <p className="text-xs text-[#526357] line-clamp-2 leading-relaxed">
            {product.description[language]}
          </p>

          {/* Outline Iconography */}
          <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#314A38] font-medium border-t border-stone-100">
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3E6B4B]" />
              {language === 'sv' ? 'Inget tillsatt socker' : 'No added sugar'}
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3E6B4B]" />
              {language === 'sv' ? 'Gluten- & nötfritt' : 'Nut & gluten free'}
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3E6B4B]" />
              {language === 'sv' ? '1 ingrediens' : '1 ingredient'}
            </span>
          </div>
        </div>

        {/* Purchase Mode Toggle (Engångsköp vs. Månadsprenumerera) */}
        <div className="pt-3 border-t border-stone-100 space-y-2.5">
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F5EFE6] rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setPurchaseType('single')}
              className={`py-2 px-2 rounded-lg transition-all text-center cursor-pointer ${
                purchaseType === 'single'
                  ? 'bg-white text-[#1F3325] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <div>{language === 'sv' ? 'Engångsköp' : 'One-time'}</div>
              <div className="text-[11px] font-bold text-stone-900">{product.price} kr</div>
            </button>

            <button
              type="button"
              onClick={() => setPurchaseType('subscription')}
              className={`py-2 px-2 rounded-lg transition-all text-center relative cursor-pointer ${
                purchaseType === 'subscription'
                  ? 'bg-[#1E3A27] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <Repeat className="w-3 h-3" />
                <span>{language === 'sv' ? 'Prenumerera' : 'Subscribe'}</span>
              </div>
              <div className={`text-[11px] font-bold ${purchaseType === 'subscription' ? 'text-[#E4C590]' : 'text-emerald-700'}`}>
                {product.subscriptionPrice} kr <span className="text-[9px] font-normal">(-15%)</span>
              </div>
            </button>
          </div>

          {/* Subscription note */}
          {purchaseType === 'subscription' && (
            <p className="text-[10px] text-emerald-800 text-center font-medium leading-tight">
              {language === 'sv'
                ? 'Levereras varje månad · Ingen bindningstid · Pausa när som helst'
                : 'Delivered monthly · No commitment · Pause anytime'}
            </p>
          )}

          {/* Pricing Row, Quantity & One-Click Add */}
          <div className="flex items-center justify-between gap-2 pt-1">
            {/* Quantity Selector with 44px accessible touch areas */}
            <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-0.5">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-stone-600 hover:text-stone-950 rounded-lg hover:bg-white transition-colors cursor-pointer"
                aria-label={`Minska antal av ${product.name[language]}`}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center text-xs font-bold text-stone-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-stone-600 hover:text-stone-950 rounded-lg hover:bg-white transition-colors cursor-pointer"
                aria-label={`Öka antal av ${product.name[language]}`}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Direct Add Button with Micro-Interaction Feedback */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                isJustAdded
                  ? 'bg-emerald-600 text-white scale-[1.02]'
                  : 'bg-[#1E3A27] hover:bg-[#14281B] text-white hover:shadow-md active:scale-98'
              }`}
            >
              {isJustAdded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200 animate-bounce" />
                  <span>{language === 'sv' ? 'Tillagd i varukorg!' : 'Added to cart!'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#E4C590]" />
                  <span>
                    {language === 'sv'
                      ? `Köp (${currentPrice * quantity} kr)`
                      : `Add (${currentPrice * quantity} SEK)`}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Subtle Swedish Recycling Guidance (Sorteras som mjukplast) */}
          <div className="pt-2 text-[10px] text-stone-500 flex items-center justify-center gap-1">
            <Recycle className="w-3.5 h-3.5 text-stone-400" />
            <span>{product.recyclingGuide[language]}</span>
          </div>

        </div>

      </div>

    </div>
  );
};
