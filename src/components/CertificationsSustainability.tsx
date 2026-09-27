import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Recycle, CheckCircle, Leaf, Sparkles, Box, Trash2 } from 'lucide-react';

export const CertificationsSustainability: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="krav-hallbarhet" className="py-16 sm:py-24 bg-[#F8F5EE] border-y border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1F3325] bg-[#EAF2EC] px-3 py-1 rounded-full border border-[#CAD8CE]">
            <Recycle className="w-3.5 h-3.5 text-[#375F43]" />
            <span>{language === 'sv' ? 'Hållbarhet & Återvinning' : 'Sustainability & Recycling'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#1A261D] tracking-tight">
            {language === 'sv' ? 'Gjord för naturen. Lätt att återvinna.' : 'Made for nature. Easy to recycle.'}
          </h2>

          <p className="text-sm sm:text-base text-[#4E5D52] font-normal leading-relaxed">
            {language === 'sv'
              ? 'Vi kompromissar varken med råvaran eller ambalaget. Här är exakt hur du sorterar dina påsar efter mellanmålet.'
              : 'Zero compromises on ingredients or packaging. Here is how to responsibly recycle your empty pouches.'}
          </p>
        </div>

        {/* 3 Step Swedish Recycling Guide */}
        <div className="mt-12 max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                {language === 'sv' ? 'Så återvinner du Fruita i Sverige' : 'How to recycle Fruita in Sweden'}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {language === 'sv'
                  ? 'Våra påsar är tillverkade av Mono-PE (polyeten) och sorteras enkelt på alla återvinningsstationer.'
                  : 'Fabricated from pure Mono-PE for circular recycling stream compatibility.'}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#EAF2EC] text-[#1F3325] flex items-center justify-center font-bold text-sm shrink-0">
              ♻️
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="text-2xl font-black text-[#1F3325]">01</div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                {language === 'sv' ? 'Töm påsen helt' : 'Empty completely'}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'sv'
                  ? 'Se till att de sista fruktsmulorna har ätits upp av barnen.'
                  : 'Enjoy the final crispy crumbs so the bag is clear of residue.'}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="text-2xl font-black text-[#1F3325]">02</div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                {language === 'sv' ? 'Platta till' : 'Flatten pouch'}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'sv'
                  ? 'Platta till påsen och stäng zip-låset så tar den minimal plats i soppåsen.'
                  : 'Flatten down and seal zipper to minimize space in household bin.'}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="text-2xl font-black text-[#1F3325]">03</div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                {language === 'sv' ? 'Sortera som Mjukplast' : 'Sort as Soft Plastic'}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'sv'
                  ? 'Kasta i kärlet för plastförpackningar på återvinningsstationen (FTI).'
                  : 'Deposit in the plastic packaging bin at your Swedish recycling depot.'}
              </p>
            </div>
          </div>
        </div>

        {/* Understated Nordic Trust Badges (Gösterişsiz, Zarif Rozetler) */}
        <div className="mt-10 max-w-4xl mx-auto flex flex-wrap items-center justify-around gap-6 text-center text-xs font-bold text-[#35523D] bg-white p-5 rounded-2xl border border-stone-200">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#EAF2EC] flex items-center justify-center text-xs">🌱</span>
            <span>{language === 'sv' ? 'KRAV- och EU Ekologisk standard' : 'KRAV & EU Organic Certified'}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#EAF2EC] flex items-center justify-center text-xs">🍃</span>
            <span>{language === 'sv' ? 'Clean Label · 0% Kemikalier' : 'Clean Label · 0% Additives'}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#EAF2EC] flex items-center justify-center text-xs">♻️</span>
            <span>{language === 'sv' ? '100% Återvinningsbar Mono-PE' : '100% Recyclable Mono-PE'}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#EAF2EC] flex items-center justify-center text-xs">🚚</span>
            <span>{language === 'sv' ? 'Fossilfri leverans med Budbee/PostNord' : 'Fossil-free shipping via Budbee/PostNord'}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
