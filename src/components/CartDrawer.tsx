import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS } from '../data/products';
import { PouchVisual } from './PouchVisual';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, Tag, ArrowRight, Truck, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    addToCart,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    amountUntilFreeShipping,
    freeShippingThreshold,
    isPromoApplied,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const { language, t } = useLanguage();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);

  // Lock body scroll and listen for Escape key when Cart is open
  useEffect(() => {
    if (!isOpen) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyPromoCode(promoInput);
    if (!success) {
      setPromoError(true);
      setTimeout(() => setPromoError(false), 2500);
    } else {
      setPromoInput('');
      setPromoError(false);
    }
  };

  const freeShippingProgress = Math.min(
    100,
    Math.round(((freeShippingThreshold - amountUntilFreeShipping) / freeShippingThreshold) * 100)
  );

  // Upsell suggestion: Find a bundle or flavor not in the cart
  const upsellCandidate = PRODUCTS.find((p) => p.id === 'prod-skolbox') || PRODUCTS[0];
  const isUpsellInCart = items.some((i) => i.product.id === upsellCandidate.id);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in"
      onClick={closeCart}
      role="dialog"
      aria-modal="true"
      aria-label={t.cart.title}
    >
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#E8DFD3] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8DFD3] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#EAF2EC] flex items-center justify-center text-[#1E3A27]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#18261C]">
                {t.cart.title}
              </h2>
              <span className="text-[11px] text-stone-500 font-medium">
                {language === 'sv' ? '100% ren frukt · Leverans inom Sverige' : '100% pure fruit · Fast Nordic delivery'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-[#E8EFEA] text-[#1E3A27] px-2.5 py-1 rounded-full">
              {items.reduce((s, i) => s + i.quantity, 0)} {language === 'sv' ? 'st' : 'items'}
            </span>

            <button
              onClick={closeCart}
              aria-label={t.modal.close}
              className="w-9 h-9 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Shipping Meter with Celebration State */}
        <div className={`p-4 border-b border-[#E8DFD3] text-xs transition-colors duration-300 ${
          amountUntilFreeShipping === 0 ? 'bg-emerald-50/80 border-emerald-200' : 'bg-[#F2ECE3]'
        }`}>
          <div className="flex items-center justify-between font-medium text-[#1E3A27] mb-2">
            <div className="flex items-center gap-2">
              <Truck className={`w-4 h-4 ${amountUntilFreeShipping === 0 ? 'text-emerald-700 animate-bounce' : 'text-[#2D4033]'}`} />
              <span className="font-bold">
                {amountUntilFreeShipping === 0 ? (
                  <span className="text-emerald-800 flex items-center gap-1">
                    🎉 {t.cart.freeShippingQualified}
                  </span>
                ) : (
                  `${t.cart.freeShippingAwayPre} ${amountUntilFreeShipping} ${t.cart.freeShippingAwayPost}`
                )}
              </span>
            </div>
            <span className="font-extrabold text-[#1E3A27]">{freeShippingProgress}%</span>
          </div>

          <div className="w-full bg-[#E5DDCF] h-2.5 rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                amountUntilFreeShipping === 0
                  ? 'bg-emerald-600 shadow-sm shadow-emerald-400'
                  : 'bg-[#1E3A27]'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-18 h-18 rounded-full bg-[#EFE9DF] text-stone-400 flex items-center justify-center">
                <ShoppingBag className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-bold text-stone-800">
                  {t.cart.empty}
                </p>
                <p className="text-xs text-stone-500 max-w-xs">
                  {t.cart.emptySub}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 inline-flex items-center gap-2 bg-[#1E3A27] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm hover:bg-[#14281B] transition-colors cursor-pointer"
              >
                <span>{language === 'sv' ? 'Börja handla krispig frukt' : 'Start Shopping'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              {items.map((item, idx) => {
                const unitPrice = item.isSubscription
                  ? item.product.subscriptionPrice
                  : item.product.price;

                return (
                  <div
                    key={`${item.product.id}-${item.isSubscription ? 'sub' : 'one'}-${idx}`}
                    className="bg-white p-3.5 rounded-2xl border border-stone-200/90 flex gap-3.5 shadow-2xs items-center"
                  >
                    <div className="w-12 h-18 shrink-0 flex items-center justify-center">
                      <PouchVisual fruitKey={item.product.fruitKey} />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-stone-900 leading-snug">
                            {item.product.name[language]}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[11px] text-stone-500 font-medium">
                              {item.product.packSize[language]}
                            </span>
                            {item.isSubscription && (
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                <span>{language === 'sv' ? '🔄 Månadsvis' : '🔄 Monthly'}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id, item.isSubscription)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1.5 rounded-lg hover:bg-stone-50 cursor-pointer"
                          aria-label={language === 'sv' ? `Ta bort ${item.product.name.sv} från varukorg` : `Remove ${item.product.name.en} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Selector with Accessible Touch Size */}
                        <div className="flex items-center border border-stone-200 rounded-xl p-0.5 bg-stone-50">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.isSubscription)}
                            className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-950 hover:bg-white rounded-lg transition-colors cursor-pointer"
                            aria-label={language === 'sv' ? 'Minska antal' : 'Decrease quantity'}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.isSubscription)}
                            className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-950 hover:bg-white rounded-lg transition-colors cursor-pointer"
                            aria-label={language === 'sv' ? 'Öka antal' : 'Increase quantity'}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-black text-stone-900">
                            {unitPrice * item.quantity} {language === 'sv' ? 'kr' : 'SEK'}
                          </span>
                          {item.isSubscription && (
                            <span className="text-[10px] text-emerald-700 block font-medium">
                              {language === 'sv' ? '(sparar 15%)' : '(save 15%)'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* One-Click Upsell Module (CRO Acceleration) */}
              {!isUpsellInCart && (
                <div className="p-3.5 bg-gradient-to-r from-[#F5EFE6] to-[#FAF7F2] rounded-2xl border border-[#E3DAD0] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-14 shrink-0">
                      <PouchVisual fruitKey={upsellCandidate.fruitKey} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#1E3A27]">
                        <Sparkles className="w-3 h-3 text-[#E4C590]" />
                        <span>{language === 'sv' ? 'Populärt komplement' : 'Popular Add-on'}</span>
                      </div>
                      <div className="text-xs font-black text-[#1A261D] leading-tight">
                        {upsellCandidate.name[language]}
                      </div>
                      <div className="text-[11px] text-stone-600 font-semibold">
                        {upsellCandidate.price} {language === 'sv' ? 'kr' : 'SEK'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(upsellCandidate, 1, false)}
                    className="inline-flex items-center gap-1 bg-white hover:bg-[#FAF7F2] text-[#1E3A27] border border-[#CAD8CE] px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs hover:scale-105 cursor-pointer shrink-0"
                    aria-label={language === 'sv' ? `Lägg till ${upsellCandidate.name.sv} som tillval` : `Add ${upsellCandidate.name.en} as add-on`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{language === 'sv' ? 'Lägg till' : 'Add'}</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom Checkout Actions & Pricing Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#E8DFD3] bg-white space-y-3.5">
            
            {/* Promo Code Accordion (Zero-Distraction CRO) */}
            <div className="border border-stone-200 rounded-xl overflow-hidden bg-stone-50/60">
              <button
                type="button"
                onClick={() => setIsPromoOpen(!isPromoOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#1E3A27]" />
                  <span>
                    {isPromoApplied
                      ? (language === 'sv' ? 'Rabattkod tillämpad (FIKA10)' : 'Promo code applied (FIKA10)')
                      : (language === 'sv' ? 'Har du en rabattkod?' : 'Have a promo code?')}
                  </span>
                </div>
                {isPromoOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {isPromoOpen && (
                <div className="p-3 pt-0 border-t border-stone-100 mt-2">
                  {isPromoApplied ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-[#1E3A27] px-3 py-2 rounded-lg text-xs">
                      <div className="flex items-center gap-1.5 font-bold">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>FIKA10 {language === 'sv' ? 'aktiv (-10%)' : 'active (-10%)'}</span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-stone-500 hover:text-rose-600 font-semibold text-[11px] cursor-pointer"
                      >
                        {language === 'sv' ? 'Ta bort' : 'Remove'}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder={language === 'sv' ? 't.ex. FIKA10' : 'e.g. FIKA10'}
                        className="flex-1 bg-white border border-stone-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#1E3A27]"
                      />
                      <button
                        type="submit"
                        className="bg-[#1E3A27] hover:bg-[#14281B] text-white font-bold px-3.5 py-2 rounded-lg text-xs transition-colors shrink-0 cursor-pointer"
                      >
                        {t.cart.applyPromo}
                      </button>
                    </form>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-rose-600 mt-1">
                      {language === 'sv' ? 'Ogiltig kod. Prova FIKA10 för 10% rabatt!' : 'Invalid code. Try FIKA10 for 10% off!'}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>{t.cart.subtotal}</span>
                <span className="font-semibold text-stone-900">{subtotal} {language === 'sv' ? 'kr' : 'SEK'}</span>
              </div>

              {isPromoApplied && (
                <div className="flex justify-between text-emerald-700">
                  <span>{t.cart.discount}</span>
                  <span className="font-semibold">-{discountAmount} {language === 'sv' ? 'kr' : 'SEK'}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{t.cart.shipping}</span>
                <span className="font-semibold text-stone-900">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold">{t.cart.free}</span>
                  ) : (
                    `${shippingFee} ${language === 'sv' ? 'kr' : 'SEK'}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-black text-stone-950 pt-2 border-t border-stone-100">
                <span>{t.cart.total}</span>
                <span className="text-lg text-[#18261C]">{total} {language === 'sv' ? 'kr' : 'SEK'}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                closeCart();
                onProceedToCheckout();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#1E3A27] hover:bg-[#14281B] text-white py-4 rounded-2xl font-black text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <span>{t.cart.checkoutBtn}</span>
              <ArrowRight className="w-4 h-4 text-[#E4C590]" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
