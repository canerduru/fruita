import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Sparkles, Mail, CheckCircle2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { t, language } = useLanguage();
  const { applyPromoCode } = useCart();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    applyPromoCode('FIKA10');
  };

  return (
    <section className="bg-[#2D4033] text-[#FAF7F2] py-14 sm:py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E4C590] bg-[#1E2E23] px-3.5 py-1 rounded-full border border-[#3E5645]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'sv' ? 'Välkomsterbjudande' : 'Welcome Gift'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif-nordic font-normal tracking-tight text-white">
          {t.newsletter.title}
        </h2>

        <p className="text-sm sm:text-base text-emerald-100/80 max-w-xl mx-auto font-light leading-relaxed">
          {t.newsletter.subtitle}
        </p>

        {submitted ? (
          <div className="p-4 bg-[#1E2E23] border border-[#3E5645] rounded-2xl max-w-md mx-auto text-sm text-[#E4C590] flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{t.newsletter.success}</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter.placeholder}
                className="w-full bg-white text-stone-900 placeholder-stone-400 pl-10 pr-4 py-3.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E4C590]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#E4C590] hover:bg-[#D8B478] text-[#1E2E23] font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-md shrink-0"
            >
              {t.newsletter.button}
            </button>
          </form>
        )}

        <p className="text-[11px] text-emerald-200/60 font-light">
          {language === 'sv'
            ? 'Ingen spam. Du kan avregistrera dig när som helst med ett klick.'
            : 'No spam. You can unsubscribe anytime with a single click.'}
        </p>

      </div>
    </section>
  );
};
