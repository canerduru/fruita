import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, User as UserIcon, Globe, Sparkles, Menu, X, Check } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { openCart, itemCount, subtotal } = useCart();
  const { user, openAuthModal, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 transition-all duration-300 px-3 sm:px-6 pt-2">
      {/* Top Banner with Scandinavian Shipping Guarantee */}
      <div className="bg-[#172A1D] text-[#FAF8F5] text-[11px] sm:text-xs py-1.5 px-4 text-center font-bold tracking-wide rounded-full max-w-5xl mx-auto mb-2 shadow-sm flex items-center justify-center gap-2 border border-emerald-900/40">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
        <span>{t.meta.shippingNotice}</span>
      </div>

      {/* Main Floating Glass Pill Navigation Bar */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/85 backdrop-blur-xl border border-stone-200/90 shadow-xl shadow-stone-900/5 rounded-3xl px-4 sm:px-6 py-3 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1E3A27] to-[#122418] text-[#FAF7F2] flex items-center justify-center shadow-md shadow-[#1E3A27]/20 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-[#A0D468]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 11C3 6.03 7.03 2 12 2z"/>
                  <path d="M12 6c-2 2-3 4-3 6a3 3 0 0 0 6 0c0-2-1-4-3-6z" fill="#A0D468" fillOpacity="0.5"/>
                  <path d="M12 2v4"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black tracking-tight text-[#17231A] block leading-none">
                    Fruita
                  </span>
                  <span className="text-[10px] bg-[#EAF2EC] text-[#1E3A27] font-black px-1.5 py-0.5 rounded-md border border-[#CAD8CE]">
                    {language === 'sv' ? '100% REN' : '100% PURE'}
                  </span>
                </div>
                <span className="text-[10px] tracking-wider text-[#526658] font-bold block mt-0.5">
                  {language === 'sv' ? 'Något annorlunda · Frystorkad Frukt' : 'Something Different · Freeze-Dried Fruit'}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-bold text-[#3A4A3E]">
            <button
              onClick={() => scrollTo('produkter')}
              className="hover:text-[#17231A] transition-colors py-1 hover:border-b-2 hover:border-[#1E3A27] cursor-pointer"
            >
              {t.nav.products}
            </button>
            <button
              onClick={() => scrollTo('mellanmal-guide')}
              className="hover:text-[#17231A] transition-colors py-1 hover:border-b-2 hover:border-[#1E3A27] cursor-pointer"
            >
              {t.nav.mellanmalGuide}
            </button>
            <button
              onClick={() => scrollTo('varfor-frystorkat')}
              className="hover:text-[#17231A] transition-colors py-1 hover:border-b-2 hover:border-[#1E3A27] cursor-pointer"
            >
              {t.nav.whyFreezeDried}
            </button>
            <button
              onClick={() => scrollTo('var-berattelse')}
              className="hover:text-[#17231A] transition-colors py-1 hover:border-b-2 hover:border-[#1E3A27] cursor-pointer"
            >
              {t.nav.ourStory}
            </button>
            <button
              onClick={() => scrollTo('krav-hallbarhet')}
              className="hover:text-[#17231A] transition-colors py-1 hover:border-b-2 hover:border-[#1E3A27] cursor-pointer"
            >
              {t.nav.sustainability}
            </button>
          </nav>

          {/* Right Action Icons: Language, Supabase Auth, Cart Drawer */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#EFE9DF] rounded-full p-0.5 text-xs font-semibold border border-[#DFD6C8]">
              <button
                onClick={() => setLanguage('sv')}
                className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 ${
                  language === 'sv'
                    ? 'bg-[#2D4033] text-white shadow-xs'
                    : 'text-[#56685B] hover:text-[#233529]'
                }`}
                title="Svenska"
              >
                <span>SV</span>
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 ${
                  language === 'en'
                    ? 'bg-[#2D4033] text-white shadow-xs'
                    : 'text-[#56685B] hover:text-[#233529]'
                }`}
                title="English"
              >
                <span>EN</span>
              </button>
            </div>

            {/* Supabase User Auth Trigger */}
            <div className="relative">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 text-xs font-medium text-[#2D4033] bg-[#EFE9DF] hover:bg-[#E5DDCF] px-3 py-1.5 rounded-full transition-colors border border-[#DFD6C8]"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#2D4033] text-white flex items-center justify-center text-[10px] font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline max-w-[80px] truncate">{user.name}</span>
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-[#E8DFD3] p-3 z-50 text-xs animate-in fade-in">
                      <div className="border-b border-stone-100 pb-2 mb-2">
                        <p className="font-semibold text-stone-900">{user.name}</p>
                        <p className="text-stone-500 truncate">{user.email}</p>
                        <div className="mt-1 flex items-center gap-1 text-[#2D4033] font-medium">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>{user.points || 0} {language === 'sv' ? 'Skördepoäng' : 'Harvest Points'}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left text-red-600 hover:text-red-700 py-1 font-medium transition-colors"
                      >
                        {t.auth.logout}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="flex items-center gap-1.5 text-xs font-medium text-[#2D4033] hover:text-[#18261C] px-3 py-1.5 rounded-full hover:bg-[#EFE9DF] transition-colors border border-transparent hover:border-[#DFD6C8]"
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.nav.signIn}</span>
                </button>
              )}
            </div>

            {/* Cart Trigger Button */}
            <button
              onClick={openCart}
              aria-label={t.nav.cart}
              className="flex items-center gap-2 bg-[#2D4033] hover:bg-[#1E2E23] text-[#FAF7F2] px-3.5 py-2 rounded-full font-medium text-xs shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#F3EFE8]" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C85D3D] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-semibold">
                {subtotal > 0 ? `${subtotal} ${language === 'sv' ? 'kr' : 'SEK'}` : t.nav.cart}
              </span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#2D4033] hover:text-[#18261C]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#E8DFD3] space-y-3 text-sm font-medium text-[#2D4033] animate-in fade-in slide-in-from-top-2">
            <button
              onClick={() => scrollTo('produkter')}
              className="block w-full text-left py-2 px-3 rounded-lg hover:bg-[#EFE9DF]"
            >
              {t.nav.products}
            </button>
            <button
              onClick={() => scrollTo('mellanmal-guide')}
              className="block w-full text-left py-2 px-3 rounded-lg hover:bg-[#EFE9DF]"
            >
              {t.nav.mellanmalGuide}
            </button>
            <button
              onClick={() => scrollTo('varfor-frystorkat')}
              className="block w-full text-left py-2 px-3 rounded-lg hover:bg-[#EFE9DF]"
            >
              {t.nav.whyFreezeDried}
            </button>
            <button
              onClick={() => scrollTo('var-berattelse')}
              className="block w-full text-left py-2 px-3 rounded-lg hover:bg-[#EFE9DF]"
            >
              {t.nav.ourStory}
            </button>
            <button
              onClick={() => scrollTo('krav-hallbarhet')}
              className="block w-full text-left py-2 px-3 rounded-lg hover:bg-[#EFE9DF]"
            >
              {t.nav.sustainability}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
