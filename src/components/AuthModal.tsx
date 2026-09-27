import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Lock, Mail, User, Sparkles, ShieldCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, register, guestLogin } = useAuth();
  const { t, language } = useLanguage();
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const [email, setEmail] = useState('elin.svensson@example.se');
  const [name, setName] = useState('Elin Svensson');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(async () => {
      if (isRegisterMode) {
        await register(email, name);
      } else {
        await login(email, name);
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div
        className="relative bg-[#FAF7F2] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DFD3]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#2D4033] bg-[#E8EFEA] px-2.5 py-1 rounded-full border border-[#CAD8CE]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#375F43]" />
            <span>Supabase Auth Integrated</span>
          </div>

          <h3 className="text-2xl font-serif-nordic font-bold text-[#18261C]">
            {isRegisterMode ? t.auth.signUpBtn : t.auth.signInBtn}
          </h3>

          <p className="text-xs text-[#56685B] leading-relaxed">
            {t.auth.subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegisterMode && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {language === 'sv' ? 'Namn' : 'Name'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'sv' ? 'Elin Svensson' : 'Emma Wilson'}
                  className="w-full bg-white border border-stone-200 pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#2D4033]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {t.auth.emailLabel}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'sv' ? 'namn@epost.se' : 'name@example.com'}
                className="w-full bg-white border border-stone-200 pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#2D4033]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {t.auth.passwordLabel}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={language === 'sv' ? 'Minst 8 tecken' : 'At least 8 characters'}
                className="w-full bg-white border border-stone-200 pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#2D4033]"
              />
            </div>
          </div>

          {/* Member reward perk */}
          <div className="p-3 bg-[#E8EFEA] rounded-xl text-xs text-[#24422E] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#A97E38] shrink-0" />
            <span>{t.auth.welcomeBonus}</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2D4033] hover:bg-[#1E2E23] text-white py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm"
          >
            {isLoading
              ? (language === 'sv' ? 'Ansluter till Supabase...' : 'Connecting to Supabase...')
              : isRegisterMode
              ? t.auth.signUpBtn
              : t.auth.signInBtn}
          </button>
        </form>

        {/* Toggle Mode & Guest Login */}
        <div className="mt-5 pt-4 border-t border-[#E8DFD3] text-center space-y-2 text-xs">
          <button
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-[#2D4033] font-semibold hover:underline block mx-auto"
          >
            {isRegisterMode ? t.auth.alreadyHaveAccount : t.auth.noAccount}
          </button>

          <button
            onClick={guestLogin}
            className="text-stone-500 hover:text-stone-800 font-medium transition-colors"
          >
            {t.auth.guestBtn}
          </button>
        </div>

      </div>
    </div>
  );
};
