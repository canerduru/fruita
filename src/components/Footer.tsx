import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Heart, Leaf, MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A281E] text-[#FAF7F2] pt-16 pb-12 border-t border-[#2D4434]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2D4434]">
          
          {/* Brand Info & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#274130] text-[#A0D468] flex items-center justify-center border border-[#3E5C46]">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white block leading-none">
                  Fruita SWE
                </span>
                <span className="text-[10px] text-[#A0D468] font-bold tracking-wider uppercase">
                  {language === 'sv' ? 'Något annorlunda · 100% Frukt' : 'Something Different · 100% Fruit'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 max-w-sm leading-relaxed font-light">
              {t.footer.desc}
            </p>

            {/* Official Swedish Company Location Box */}
            <div className="bg-[#132017] p-3.5 rounded-2xl border border-[#2B4031] text-xs text-stone-300 space-y-2 max-w-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A0D468] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Fruita SWE</span>
                  <span className="text-stone-300">Jordgubbsvägen 20b</span>
                  <span className="block text-stone-300">{language === 'sv' ? '724 87 Västerås, Sverige' : '724 87 Västerås, Sweden'}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-1.5 border-t border-[#233829]">
                <Phone className="w-3.5 h-3.5 text-[#A0D468] shrink-0" />
                <a
                  href="tel:+46730406932"
                  className="font-bold text-[#FAF7F2] hover:text-[#A0D468] transition-colors"
                >
                  +46 73-040 69 32
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E4C590] mb-4">
              {t.footer.linksTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => scrollTo('produkter')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.products}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('mellanmal-guide')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.mellanmalGuide}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('varfor-frystorkat')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.whyFreezeDried}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('var-berattelse')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.ourStory}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('krav-hallbarhet')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.sustainability}
                </button>
              </li>
            </ul>
          </div>

          {/* Certifications & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E4C590] mb-4">
              {t.footer.legalTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#87B393]" />
                <span>{t.footer.kravBadge}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#87B393]" />
                <span>{t.footer.cleanLabelBadge}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#87B393]" />
                <span>{t.footer.isoBadge}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#87B393]" />
                <span>{language === 'sv' ? 'Fossilfri frakt (Budbee / PostNord)' : 'Fossil-free shipping (Budbee / PostNord)'}</span>
              </li>
            </ul>
          </div>

          {/* Customer Service & Official Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E4C590] mb-4">
              {language === 'sv' ? 'Kundservice & Kontakt' : 'Contact & Support'}
            </h4>
            
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#A0D468] shrink-0" />
                <a
                  href="tel:+46730406932"
                  className="hover:text-white font-bold transition-colors"
                >
                  +46 73-040 69 32
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#A0D468] shrink-0" />
                <a
                  href="mailto:kontakt@fruitaswe.se"
                  className="hover:text-white transition-colors"
                >
                  kontakt@fruitaswe.se
                </a>
              </div>

              <div className="flex items-center gap-2 text-stone-400">
                <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>{language === 'sv' ? 'Vardagar 09:00 – 16:00' : 'Mon–Fri 09:00 – 16:00'}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#2D4434] text-[11px] text-stone-400">
              {language === 'sv'
                ? 'Säkra betalningar med Swish, Klarna och Visa/Mastercard.'
                : 'Secure checkout via Swish, Klarna and major credit cards.'}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Registered Address */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-4 text-xs text-stone-400">
            <span className="hover:text-stone-200 cursor-pointer">{language === 'sv' ? 'Integritetspolicy' : 'Privacy Policy'}</span>
            <span>·</span>
            <span className="hover:text-stone-200 cursor-pointer">{language === 'sv' ? 'Köpvillkor' : 'Terms of Service'}</span>
            <span>·</span>
            <span className="hover:text-stone-200 cursor-pointer">Cookies</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
