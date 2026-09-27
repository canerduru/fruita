import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { PouchVisual } from './PouchVisual';
import { Coffee, Backpack, Sunrise, Compass, Plus, Sparkles, Check } from 'lucide-react';

export const MellanmålGuide: React.FC = () => {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'porridge' | 'lunchbox' | 'fika' | 'outdoors'>('lunchbox');

  const guideItems = {
    lunchbox: {
      id: 'lunchbox',
      title: language === 'sv' ? 'Barnens Skola & Förskoleryggsäck' : 'School & Daycare Backpack',
      icon: Backpack,
      tagline: language === 'sv' ? 'Kladdfritt & 100% säkert för ryggsäcken' : 'Mess-free & school safe',
      desc: language === 'sv'
        ? 'När barnen har sprungit av sig på rasten behövs ren energi som inte ger sockerkrasch i klassrummet. Våra portionspåsar tål att ligga i botten av ryggsäcken, kladdar inte på böcker eller fingrar och smakar lika sött som godis — fast med ren fruktoxidant.'
        : 'After recess, children require steady energy that avoids sugar highs and lows. Our single-serve pouches are light, crush-resistant, and deliver satisfying sweetness without sticky fingers or mess.',
      pairing: PRODUCTS.find((p) => p.id === 'prod-jordgubb') || PRODUCTS[0],
      secondaryPairing: PRODUCTS.find((p) => p.id === 'prod-apple-kanel'),
      benefits: [
        language === 'sv' ? 'Helt nöt- och glutenfri (säker i nötfria skolor)' : 'Nut-free & allergen friendly for schools',
        language === 'sv' ? 'Kladdar inte på fingrar eller kläder' : 'Zero sticky mess on school clothes',
        language === 'sv' ? '300% av dagsbehovet av C-vitamin i en påse' : 'Abundant natural vitamin C per pouch',
      ],
      tip: language === 'sv' ? 'Lägg en påse tillsammans med fruktlådan varje måndag morgon.' : 'Pack a pouch alongside the lunchbox every morning.',
    },
    fika: {
      id: 'fika',
      title: language === 'sv' ? 'Det Nya Medvetna Svenska Fikat' : 'The Mindful Nordic Fika',
      icon: Coffee,
      tagline: language === 'sv' ? 'Naturlig sötma till bryggkaffet' : 'Natural pairing for dark roast coffee',
      desc: language === 'sv'
        ? 'Fika är hjärtat i svensk gemenskap. Men fikabröd med raffinerat socker och palmolja behöver inte vara vardagsnormen. Egeiska fikonbett och krispiga äpplen med ceylonkanel skapar samma trivsel vid fikabordet, men ger ren näring och ett ljuvligt knaster.'
        : 'Fika is the soulful heartbeat of Scandinavian culture. Replace heavy refined pastries with crisp Aegean fig bites and cinnamon apple slices paired with hot drip coffee.',
      pairing: PRODUCTS.find((p) => p.id === 'prod-fikon') || PRODUCTS[1],
      secondaryPairing: PRODUCTS.find((p) => p.id === 'prod-fika-lyx'),
      benefits: [
        language === 'sv' ? 'Underbar brytning till mörkrostat kaffe eller te' : 'Complementary crunch to specialty dark roast coffee',
        language === 'sv' ? 'Slipper eftermiddagens trötthetsdipp vid 15-tiden' : 'Prevents 3 PM workplace post-sugar fatigue',
        language === 'sv' ? 'Servera i en vacker keramikskål vid mötet' : 'Serve in ceramic Nordic bowls for guests',
      ],
      tip: language === 'sv' ? 'Testa att doppa fikonkrispen i lite tahini eller grekisk yoghurt.' : 'Try dipping fig bites into yogurt or nut-free seed butter.',
    },
    porridge: {
      id: 'porridge',
      title: language === 'sv' ? 'Morgongröt, Yoghurt & Filmjölk' : 'Morning Porridge & Filmjölk',
      icon: Sunrise,
      tagline: language === 'sv' ? 'Krispig topping utan blöta bär' : 'Crisp topping that stays crunchy',
      desc: language === 'sv'
        ? 'Att toppa havregrynsgröten eller den kalla filmjölken med frystorkad frukt ger en spännande kontrast mellan varmt/kallt och mjukt/krispigt. Frukten suger sakta åt sig av yoghurten och släpper ifrån sig en intensiv fruktsmak.'
        : 'Transform humble oat porridge or traditional filmjölk into a gourmet bowl. The crispy freeze-dried fruit slowly absorbs moisture while releasing deep natural fruit nectar.',
      pairing: PRODUCTS.find((p) => p.id === 'prod-korsbar') || PRODUCTS[4],
      secondaryPairing: PRODUCTS.find((p) => p.id === 'prod-aprikos'),
      benefits: [
        language === 'sv' ? 'Bevarar krispigheten längre än färska bär' : 'Retains crunch longer than fresh berries',
        language === 'sv' ? 'Ingen sockrad sylt behövs längre' : 'Completely replaces sugary store-bought jam',
        language === 'sv' ? 'Rikt på naturligt kalium och kostfiber' : 'High in dietary fiber and cellular potassium',
      ],
      tip: language === 'sv' ? 'Krossa påsen lätt innan du häller över skålen för perfekt strössel.' : 'Crush the pouch gently before pouring for an even fruit dust.',
    },
    outdoors: {
      id: 'outdoors',
      title: language === 'sv' ? 'Friluftsliv, Skogspromenad & Skidtur' : 'Nordic Outdoors & Hiking Trails',
      icon: Compass,
      tagline: language === 'sv' ? 'Fjällvandringens lättaste proviant' : 'Ultralight trail nutrition',
      desc: language === 'sv'
        ? 'I den nordiska naturen räknas varje gram i packningen. En 30-grams påse frystorkad frukt väger nästan ingenting men rymmer näringen från 300 gram färsk frukt. Perfekt för stormköket, skärgårdsbåten eller skogsutflykten med familjen.'
        : 'In Nordic wilderness, every gram counts. A 30g pouch weighs almost nothing yet provides the micronutrients of nearly 300g of fresh fruit. Ideal for backpacks and day hikes.',
      pairing: PRODUCTS.find((p) => p.id === 'prod-aprikos') || PRODUCTS[3],
      secondaryPairing: PRODUCTS.find((p) => p.id === 'prod-skolbox'),
      benefits: [
        language === 'sv' ? 'Ultralätt vikt (endast 25-30 gram per påse)' : 'Ultralight pack weight (25-30 grams)',
        language === 'sv' ? 'Fryser inte till is under kalla vinterdagar' : 'Does not freeze rock-hard in Nordic winter',
        language === 'sv' ? 'Lång hållbarhet i återförslutningsbar förpackning' : 'Extended shelf-life in airtight seal',
      ],
      tip: language === 'sv' ? 'Passar suveränt i jackfickan under skidbacken.' : 'Fits effortlessly into ski jacket pockets.',
    },
  };

  const current = guideItems[activeTab];

  return (
    <section id="mellanmal-guide" className="py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#2D4033] bg-[#E8EFEA] px-3 py-1 rounded-full border border-[#CAD8CE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'sv' ? 'Nordisk Vardagsinspiration' : 'Nordic Lifestyle Rituals'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif-nordic font-normal text-[#1A261D] tracking-tight">
            {t.mellanmalGuide.title}
          </h2>

          <p className="text-sm sm:text-base text-[#4E5D52] font-light">
            {t.mellanmalGuide.subtitle}
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {(['lunchbox', 'fika', 'porridge', 'outdoors'] as const).map((key) => {
            const item = guideItems[key];
            const Icon = item.icon;
            const isSelected = activeTab === key;

            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-[#2D4033] text-white shadow-sm'
                    : 'bg-[#F2ECE3] text-[#415346] hover:bg-[#EBE2D4]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#E4C590]' : 'text-[#63756A]'}`} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Guide Content Card */}
        <div className="mt-10 bg-[#F4EFEA] rounded-3xl p-6 sm:p-10 border border-[#E5DDD0] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Guide Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#5C6E61] font-semibold block">
                  {current.tagline}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-nordic font-semibold text-[#18261C] mt-1">
                  {current.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#4C5B50] leading-relaxed font-light">
                {current.desc}
              </p>

              {/* Benefits Checklist */}
              <div className="space-y-2.5 pt-2">
                {current.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#273B2D]">
                    <div className="w-5 h-5 rounded-full bg-[#E5ECE7] text-[#2D5A38] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Pro Tip Box */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E3DAD0] text-xs text-[#4C5C50] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#A97E38] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1C2C21] block">
                    {language === 'sv' ? 'Praktiskt Vardagstips:' : 'Everyday Tip:'}
                  </span>
                  <span>{current.tip}</span>
                </div>
              </div>
            </div>

            {/* Recommended Pairing Product Card */}
            <div className="lg:col-span-5 bg-[#FAF7F2] rounded-2xl p-5 border border-[#E8DFD3] shadow-xs space-y-4">
              <span className="text-[11px] uppercase tracking-wider text-[#5A6D60] font-bold block">
                {language === 'sv' ? 'Rekommenderat Val' : 'Recommended Pairing'}
              </span>

              <div className="flex gap-4 items-center">
                <div className="w-16 sm:w-20 shrink-0">
                  <PouchVisual fruitKey={current.pairing.fruitKey} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-serif-nordic font-semibold text-[#19271E] leading-snug">
                    {current.pairing.name[language]}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {current.pairing.packSize[language]}
                  </p>
                  <div className="text-sm font-bold text-[#1A261D]">
                    {current.pairing.price} {language === 'sv' ? 'kr' : 'SEK'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => addToCart(current.pairing, 1)}
                className="w-full flex items-center justify-center gap-2 bg-[#1E3A27] hover:bg-[#14281B] text-white py-3.5 rounded-2xl text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#E4C590]" />
                <span>
                  {language === 'sv'
                    ? `Lägg till ${current.pairing.name.sv} (${current.pairing.price} kr)`
                    : `Add ${current.pairing.name.en} (${current.pairing.price} SEK)`}
                </span>
              </button>

              {current.secondaryPairing && (
                <div className="pt-2 border-t border-[#E8DFD3] flex items-center justify-between text-xs">
                  <span className="text-stone-600 font-medium">
                    {language === 'sv' ? 'Passar även med:' : 'Also pairs well with:'}
                  </span>
                  <button
                    type="button"
                    onClick={() => addToCart(current.secondaryPairing!, 1)}
                    className="text-[#1E3A27] font-bold hover:underline flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-stone-200 hover:border-[#1E3A27] transition-all cursor-pointer"
                  >
                    <span>{current.secondaryPairing.name[language]}</span>
                    <span className="text-emerald-700">+</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
