import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Sparkles, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { total, items, clearCart, shippingFee, subtotal, discountAmount } = useCart();
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [deliveryMethod, setDeliveryMethod] = useState<'postnord' | 'budbee' | 'instabox'>('postnord');
  const [paymentMethod, setPaymentMethod] = useState<'swish' | 'klarna' | 'card'>('swish');
  
  const [name, setName] = useState(user?.name || 'Sofia Lindqvist');
  const [email, setEmail] = useState(user?.email || 'sofia.lindqvist@example.se');
  const [address, setAddress] = useState('Linnégatan 42');
  const [postalCode, setPostalCode] = useState('413 08');
  const [city, setCity] = useState('Göteborg');
  const [phone, setPhone] = useState('070-123 45 67');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Lock body scroll and listen for Escape key when Checkout is open
  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderNumber('SN-' + Math.floor(100000 + Math.random() * 900000));
      setIsSuccess(true);
      clearCart();
    }, 800);
  };

  const handleFinish = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.checkout.title}
    >
      <div
        className="relative bg-[#FAF7F2] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8DFD3] my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={t.modal.close}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Order Complete Confirmation View */
          <div className="text-center py-6 space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#2D5A38] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif-nordic font-bold text-[#18261C]">
              {t.checkout.successTitle}
            </h3>

            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              {t.checkout.successMsg}
            </p>

            <div className="p-4 bg-white rounded-2xl border border-stone-200 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">{language === 'sv' ? 'Ordernummer:' : 'Order Number:'}</span>
                <span className="font-bold text-stone-900">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{language === 'sv' ? 'Levereras till:' : 'Shipping to:'}</span>
                <span className="font-medium text-stone-900">{address}, {city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{language === 'sv' ? 'Speditör:' : 'Carrier:'}</span>
                <span className="font-medium text-stone-900">
                  {deliveryMethod === 'postnord' ? 'PostNord' : deliveryMethod === 'budbee' ? (language === 'sv' ? 'Budbee Fossilfritt' : 'Budbee Fossil-Free') : 'Instabox'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-100 font-bold">
                <span>{language === 'sv' ? 'Betalt belopp:' : 'Amount Paid:'}</span>
                <span className="text-emerald-700">{total} {language === 'sv' ? 'kr' : 'SEK'}</span>
              </div>
              <div className="pt-2 border-t border-stone-100 text-[10px] text-stone-500">
                <span>{language === 'sv' ? 'Avsändare:' : 'Sender:'} <strong>Fruita SWE</strong> · Jordgubbsvägen 20b, 724 87 Västerås · Tel: +46 73-040 69 32</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="bg-[#2D4033] hover:bg-[#1E2E23] text-white px-8 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all"
            >
              {language === 'sv' ? 'Tillbaka till butiken' : 'Back to Store'}
            </button>
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#2D4033] mb-1">
                <ShieldCheck className="w-4 h-4 text-[#375F43]" />
                <span>{language === 'sv' ? 'KRAV-certifierad B2C-kassa i SEK' : 'KRAV-certified checkout in SEK'}</span>
              </div>
              <h2 className="text-2xl font-serif-nordic font-bold text-[#18261C]">
                {t.checkout.title}
              </h2>
            </div>

            {/* Delivery Methods in Sweden */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                {t.checkout.shippingMethod}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'postnord', name: language === 'sv' ? 'PostNord Ombud' : 'PostNord Pickup', time: language === 'sv' ? '1-2 dgr' : '1-2 days' },
                  { id: 'budbee', name: language === 'sv' ? 'Budbee Fossilfri' : 'Budbee Fossil-Free', time: language === 'sv' ? 'Hemleverans' : 'Home Delivery' },
                  { id: 'instabox', name: language === 'sv' ? 'Instabox Skåp' : 'Instabox Locker', time: language === 'sv' ? 'Samma/nästa dag' : 'Same/next day' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setDeliveryMethod(s.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      deliveryMethod === s.id
                        ? 'border-[#2D4033] bg-[#E8EFEA] text-[#1E3A27] font-semibold'
                        : 'border-stone-200 bg-white text-stone-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{s.name}</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">{s.time}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                {language === 'sv' ? 'Leveransuppgifter' : 'Shipping Address'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.checkout.name}
                    className="w-full bg-white border border-stone-200 px-3 py-2 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.auth.emailLabel}
                    className="w-full bg-white border border-stone-200 px-3 py-2 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t.checkout.address}
                    className="w-full bg-white border border-stone-200 px-3 py-2 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder={t.checkout.postalCode}
                    className="w-full bg-white border border-stone-200 px-3 py-2 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={t.checkout.city}
                    className="w-full bg-white border border-stone-200 px-3 py-2 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.checkout.phone}
                    className="w-full bg-white border border-stone-200 px-3 py-2 rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options in Sweden */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                {t.checkout.paymentMethod}
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'swish', label: 'Swish', note: language === 'sv' ? 'Direkt i appen' : 'In-app payment' },
                  { id: 'klarna', label: 'Klarna', note: language === 'sv' ? 'Få först, betala sen' : 'Pay later / slices' },
                  { id: 'card', label: language === 'sv' ? 'Kort' : 'Card', note: 'Visa / Mastercard' },
                ].map((pay) => (
                  <button
                    key={pay.id}
                    type="button"
                    onClick={() => setPaymentMethod(pay.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === pay.id
                        ? 'border-[#2D4033] bg-[#E8EFEA] text-[#1E3A27] font-semibold'
                        : 'border-stone-200 bg-white text-stone-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{pay.label}</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">{pay.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Summary & Submit */}
            <div className="pt-4 border-t border-[#E8DFD3] space-y-3">
              <div className="flex justify-between text-sm font-bold text-stone-900">
                <span>{language === 'sv' ? 'Totalbelopp att betala:' : 'Total Amount to Pay:'}</span>
                <span className="text-lg text-[#18261C]">{total} {language === 'sv' ? 'kr' : 'SEK'}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2D4033] hover:bg-[#1E2E23] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>
                  {isSubmitting
                    ? (language === 'sv' ? 'Bearbetar beställning...' : 'Processing order...')
                    : `${t.checkout.placeOrder} (${total} ${language === 'sv' ? 'kr' : 'SEK'})`}
                </span>
                <ArrowRight className="w-4 h-4 text-[#E4C590]" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
