import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PouchVisual } from './PouchVisual';
import { ArrowRight, Sparkles, Heart, Repeat, Check, ShieldCheck, Flame } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeFruit, setActiveFruit] = useState<'jordgubbe' | 'banan' | 'apple' | 'hallon' | 'bjornbar' | 'mango'>('jordgubbe');

  const flavors = [
    { key: 'jordgubbe', name: language === 'sv' ? 'Jordgubbe' : 'Strawberry', mascot: language === 'sv' ? '🦊 Räven Felix' : '🦊 Felix the Fox', color: 'from-rose-500/20 to-pink-500/10' },
    { key: 'banan', name: language === 'sv' ? 'Banan' : 'Banana', mascot: language === 'sv' ? '🐵 Apan Mio' : '🐵 Mio the Monkey', color: 'from-amber-400/20 to-yellow-500/10' },
    { key: 'apple', name: language === 'sv' ? 'Äpple' : 'Apple', mascot: language === 'sv' ? '🦌 Älgen Algot' : '🦌 Algot the Moose', color: 'from-emerald-500/20 to-lime-500/10' },
    { key: 'hallon', name: language === 'sv' ? 'Hallon' : 'Raspberry', mascot: language === 'sv' ? '🐰 Kaninen Klara' : '🐰 Klara the Bunny', color: 'from-pink-500/20 to-rose-500/10' },
    { key: 'bjornbar', name: language === 'sv' ? 'Björnbär' : 'Blackberry', mascot: language === 'sv' ? '🐻 Björnen Bruno' : '🐻 Bruno the Bear', color: 'from-purple-500/20 to-indigo-500/10' },
    { key: 'mango', name: language === 'sv' ? 'Mango' : 'Mango', mascot: language === 'sv' ? '🐯 Tigern Ture' : '🐯 Ture the Tiger', color: 'from-orange-500/20 to-amber-500/10' },
  ] as const;

  const scrollToProducts = () => {
    const el = document.getElementById('produkter');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentFlavor = flavors.find((f) => f.key === activeFruit) || flavors[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F6F0E6] to-[#FAF8F5] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E8DFD3]">
      {/* Background Nordic Ambient Light - Dynamic based on active flavor */}
      <div className={`absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br ${currentFlavor.color} rounded-full blur-3xl pointer-events-none -z-10 transition-colors duration-700`} />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#E7EFEA]/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Bold, Playful & Honest Copy (Oatly / Färsking Style) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            
            {/* Direct Honest Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF2EC] border border-[#CAD8CE] text-[#1E3A27] text-xs font-black uppercase tracking-wider shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A27] animate-pulse" />
              <span>
                {language === 'sv'
                  ? 'FRUITA · 100% REN FRUKT · 1 INGREDRIENS · NOLL TRAMS'
                  : 'FRUITA · 100% PURE FRUIT · 1 INGREDIENT · ZERO NONSENSE'}
              </span>
            </div>

            {/* Bold, Characterful Grotesk Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#17231A] leading-[1.08] tracking-tight">
              {language === 'sv' ? (
                <>
                  Riktig frukt till barnen.{' '}
                  <span className="text-[#1E3A27] underline decoration-[#E8A238] decoration-wavy underline-offset-8">
                    Inget trams.
                  </span>
                </>
              ) : (
                <>
                  Real fruit for kids.{' '}
                  <span className="text-[#1E3A27] underline decoration-[#E8A238] decoration-wavy underline-offset-8">
                    Zero nonsense.
                  </span>
                </>
              )}
            </h1>

            {/* Honest, unpretentious description */}
            <p className="text-base sm:text-lg text-[#3E5244] max-w-2xl leading-relaxed font-medium">
              {language === 'sv'
                ? 'Inga tillsatta sockerarter, inga konserveringsmedel och noll kladd i skolryggsäcken. Bara 100% frukt som varsamt frystorkats så att barnen får den krispighet de älskar och 98% av vitaminerna intakta.'
                : 'Zero added sugars, no preservatives, and zero sticky mess in school backpacks. Just 100% fruit gently freeze-dried to deliver the airy crunch kids love and 98% of vitamins intact.'}
            </p>

            {/* Interactive Hero Flavor Switcher */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#1E3A27] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#E8A238]" />
                <span>{language === 'sv' ? 'Klicka för att byta smak i förhandsvisningen:' : 'Click to preview flavor:'}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {flavors.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setActiveFruit(f.key as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeFruit === f.key
                        ? 'bg-[#1E3A27] text-white shadow-md scale-105 ring-2 ring-[#E8A238]/60'
                        : 'bg-white/90 text-stone-700 hover:bg-[#F5EFE6] border border-stone-200'
                    }`}
                  >
                    <span>{f.mascot.split(' ')[0]}</span>
                    <span>{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Core Minimalist Outline Claims */}
            <div className="grid grid-cols-3 gap-3 max-w-lg py-2">
              <div className="bg-white/95 p-3.5 rounded-2xl border border-stone-200/90 text-center shadow-xs">
                <span className="text-xl block mb-1">🍃</span>
                <span className="text-xs font-black text-[#1F3325] block">
                  {language === 'sv' ? 'Bara Frukt' : 'Pure Fruit'}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  {language === 'sv' ? '1 ingrediens' : '1 ingredient'}
                </span>
              </div>
              <div className="bg-white/95 p-3.5 rounded-2xl border border-stone-200/90 text-center shadow-xs">
                <span className="text-xl block mb-1">🚫</span>
                <span className="text-xs font-black text-[#1F3325] block">
                  {language === 'sv' ? 'Utan Socker' : 'No Sugar'}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  {language === 'sv' ? '0% tillsatser' : '0% additives'}
                </span>
              </div>
              <div className="bg-white/95 p-3.5 rounded-2xl border border-stone-200/90 text-center shadow-xs">
                <span className="text-xl block mb-1">🎒</span>
                <span className="text-xs font-black text-[#1F3325] block">
                  {language === 'sv' ? 'Kladdfritt' : 'Mess-Free'}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  {language === 'sv' ? 'Förskola & skola' : 'School friendly'}
                </span>
              </div>
            </div>

            {/* Action Buttons: Fast Buy & Monthly Subscription Option */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                onClick={scrollToProducts}
                className="inline-flex items-center justify-center gap-3 bg-[#1E3A27] hover:bg-[#122418] text-[#FAF7F2] px-8 py-4 rounded-2xl font-black text-sm sm:text-base shadow-xl shadow-[#1E3A27]/25 hover:shadow-2xl hover:shadow-[#1E3A27]/35 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer"
              >
                <span>{language === 'sv' ? 'Utforska Alla 6 Smaker' : 'Explore All 6 Flavors'}</span>
                <ArrowRight className="w-4 h-4 text-[#E4C590]" />
              </button>

              <button
                onClick={scrollToProducts}
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-[#F7F3EB] text-[#1E3A27] px-6 py-4 rounded-2xl font-black text-sm border-2 border-[#D8CABE] hover:border-[#1E3A27] transition-all shadow-xs cursor-pointer group"
              >
                <Repeat className="w-4 h-4 text-[#1E3A27] group-hover:rotate-180 transition-transform duration-500" />
                <span>{language === 'sv' ? 'Månadsprenumerera (-15%)' : 'Subscribe & Save 15%'}</span>
              </button>
            </div>

            {/* Honest parent quote with 5-star rating */}
            <div className="pt-4 border-t border-[#E8DFD3] flex items-start gap-3 text-xs sm:text-sm text-[#4E5B52]">
              <span className="text-2xl select-none">🦊</span>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i} className="text-amber-500 font-bold">{star}</span>
                  ))}
                  <span className="text-[11px] font-black text-[#1E3A27] ml-1.5 bg-[#EAF2EC] px-2.5 py-0.5 rounded-full border border-[#CAD8CE]">
                    5.0 / 5.0 · {language === 'sv' ? 'Verifierat föräldraköp' : 'Verified parent purchase'}
                  </span>
                </div>
                <p className="italic text-[#38483D] font-medium">
                  {language === 'sv'
                    ? '”Det enda mellanmålet som inte kommer hem mosat i botten av ryggsäcken. Barnen älskar krispet.”'
                    : '“The only snack that doesn’t come home crushed at the bottom of the backpack. The kids love the crunch.”'}
                </p>
                <p className="font-bold text-[#1F3325] text-xs">
                  {language === 'sv'
                    ? '— Malin & familjen (Mamma till 2 barn i Nacka, Stockholm)'
                    : '— Malin & family (Mom of 2 in Nacka, Stockholm)'}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Display of the Stand-up Pouch with Live Flavor Swapping */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none flex items-center justify-center py-6">
              
              {/* Main Featured Pouch: Active Selected Flavor */}
              <div className="relative z-20 w-64 sm:w-72 transform hover:scale-105 transition-all duration-300 drop-shadow-2xl">
                <PouchVisual fruitKey={activeFruit} />
              </div>

              {/* Background Secondary Decorative Glow */}
              <div className="absolute -left-4 sm:-left-8 top-10 z-10 w-48 sm:w-56 opacity-60 transform -rotate-12 blur-[1px]">
                <PouchVisual fruitKey={activeFruit === 'banan' ? 'jordgubbe' : 'banan'} />
              </div>

              <div className="absolute -right-4 sm:-right-8 top-14 z-10 w-48 sm:w-56 opacity-60 transform rotate-12 blur-[1px]">
                <PouchVisual fruitKey={activeFruit === 'apple' ? 'hallon' : 'apple'} />
              </div>

              {/* Mascot Live Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-30 bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-3 animate-in fade-in">
                <div className="w-10 h-10 rounded-xl bg-[#EAF2EC] flex items-center justify-center text-xl">
                  {currentFlavor.mascot.split(' ')[0]}
                </div>
                <div className="text-left text-xs">
                  <span className="font-black text-[#17231A] block leading-tight text-sm">
                    {currentFlavor.name} · {currentFlavor.mascot}
                  </span>
                  <span className="text-[11px] text-stone-500 font-bold">
                    {language === 'sv' ? '100% ren frukt · 15g portionspåse' : '100% pure fruit · 15g pouch'}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
