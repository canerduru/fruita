import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, X, Check, ArrowRight, Sparkles, Smartphone, Heart, ShieldCheck, Zap } from 'lucide-react';

/* ─── Real Pouch Products with Animal Mascots ─── */
const REAL_PRODUCTS = [
  {
    id: 'fruita-jordgubbe',
    name: 'Jordgubbe',
    fullName: 'Fruita Jordgubbe',
    subtitle: 'Frystorkade skivor',
    mascotName: 'Räven Freja',
    mascotAnimal: 'Räv',
    mascotEmoji: '🦊',
    image: 'images/products/jordgubbe.png',
    bg: '#E8344A',
    accent: '#FF6B7A',
    light: '#FFF0F2',
    pillBorder: '#FFA5B0',
    price: 29,
    rating: 5.0,
    reviews: 184,
    claim: 'Bara jordgubbar. Inget tillsatt socker eller sirap.',
    description: 'Solmogna söta jordgubbar skivade och frystorkade under vakuum. Bevarar 98% av vitaminerna och ger en oemotståndlig krispighet som smälter på tungan.',
    badge: 'BÄSTSÄLJARE',
    nutrition: { kcal: 48, fiber: '2.1g', carbs: '9.4g', sugar: '0g tillsatt' },
  },
  {
    id: 'fruita-banan',
    name: 'Banan',
    fullName: 'Fruita Banan',
    subtitle: 'Frystorkade skivor',
    mascotName: 'Apan Mio',
    mascotAnimal: 'Apa',
    mascotEmoji: '🐵',
    image: 'images/products/banan.png',
    bg: '#F5B731',
    accent: '#FFD166',
    light: '#FFFAE0',
    pillBorder: '#FFE28A',
    price: 29,
    rating: 4.9,
    reviews: 142,
    claim: '100% solmogen banan. Mild och naturligt fyllig karamellton.',
    description: 'Krispiga gyllene bananmynt fullproppade med naturligt kalium och energi. Helt kladdfritt mellanmål för ryggsäcken och bilresan.',
    badge: 'ENERGIKICK',
    nutrition: { kcal: 52, fiber: '2.4g', carbs: '11.8g', sugar: '0g tillsatt' },
  },
  {
    id: 'fruita-apple',
    name: 'Äpple',
    fullName: 'Fruita Äpple',
    subtitle: 'Frystorkade äppelskivor',
    mascotName: 'Älgen Albin',
    mascotAnimal: 'Älg',
    mascotEmoji: '🫎',
    image: 'images/products/apple.png',
    bg: '#6DBF4F',
    accent: '#9FD97F',
    light: '#F0FAE8',
    pillBorder: '#BDE8A7',
    price: 29,
    rating: 4.9,
    reviews: 118,
    claim: '100% krispiga äppelklyftor. Friskt syrlig svensk favorit.',
    description: 'Friska, spröda äppelklyftor med det perfekta knastret. Rik på naturligt pektin och C-vitamin. Fastnar inte i tänderna som torkade russin.',
    badge: 'SUPERKRISP',
    nutrition: { kcal: 44, fiber: '2.8g', carbs: '9.8g', sugar: '0g tillsatt' },
  },
  {
    id: 'fruita-hallon',
    name: 'Hallon',
    fullName: 'Fruita Hallon',
    subtitle: 'Frystorkade hallon',
    mascotName: 'Kaninen Klara',
    mascotAnimal: 'Kanin',
    mascotEmoji: '🐰',
    image: 'images/products/hallon.png',
    bg: '#D4317A',
    accent: '#F069AA',
    light: '#FFF0F8',
    pillBorder: '#F9ADC9',
    price: 29,
    rating: 5.0,
    reviews: 165,
    claim: '100% vilda hallon. Bevarad hel bärform och explosiv smak.',
    description: 'Luftigt frasiga hela hallon med en ljuvlig syrlig kick. Perfekt som lyxig fredagsmys-topping på filmjölk eller som rent nyttigt godis.',
    badge: 'TOPPBETYG',
    nutrition: { kcal: 46, fiber: '3.2g', carbs: '8.1g', sugar: '0g tillsatt' },
  },
  {
    id: 'fruita-bjornbar',
    name: 'Björnbär',
    fullName: 'Fruita Björnbär',
    subtitle: 'Frystorkade bär',
    mascotName: 'Björnen Bruno',
    mascotAnimal: 'Björn',
    mascotEmoji: '🐻',
    image: 'images/products/bjornbar.png',
    bg: '#6A3CB5',
    accent: '#9B72D8',
    light: '#F5F0FF',
    pillBorder: '#C9B0F0',
    price: 29,
    rating: 4.8,
    reviews: 94,
    claim: 'Skogsbjörnbär fyllda med antioxidanter och spröd textur.',
    description: 'Djup mörklila skogssmak med spröd honeycomb-krispighet. 100% naturliga mineraler och antocyaniner för hela familjen.',
    badge: 'ANTIOXIDANT',
    nutrition: { kcal: 45, fiber: '3.5g', carbs: '8.2g', sugar: '0g tillsatt' },
  },
  {
    id: 'fruita-mango',
    name: 'Mango',
    fullName: 'Fruita Mango',
    subtitle: 'Frystorkad mango',
    mascotName: 'Tigern Ture',
    mascotAnimal: 'Tiger',
    mascotEmoji: '🐯',
    image: 'images/products/mango.png',
    bg: '#F07E1A',
    accent: '#FFA94D',
    light: '#FFF8EE',
    pillBorder: '#FFCCA0',
    price: 29,
    rating: 5.0,
    reviews: 192,
    claim: 'Solmogen tropisk mango. Naturligt söt utan tillsatt socker.',
    description: 'Gyllene mangostrimlor med intensiv aromatisk sötma. Barnens absoluta favorit som enkelt ersätter godispåsen utan tjat.',
    badge: 'BARNENS FAVORIT',
    nutrition: { kcal: 52, fiber: '1.2g', carbs: '11.5g', sugar: '0g tillsatt' },
  },
];

export default function VariantB2() {
  const base = import.meta.env.BASE_URL;
  const [activeIdx, setActiveIdx] = useState(0);
  const activeProduct = REAL_PRODUCTS[activeIdx];

  const [cart, setCart] = useState<{ id: string; name: string; price: number; qty: number; image: string }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [swishPhone, setSwishPhone] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  /* Auto-rotate hero every 4 seconds unless user interacts */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % REAL_PRODUCTS.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const addToCart = (product: typeof REAL_PRODUCTS[0], e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { id: product.id, name: product.fullName, price: product.price, qty: 1, image: product.image }];
    });
    setIsCartOpen(true);
  };

  const addBundleToCart = () => {
    REAL_PRODUCTS.forEach((prod) => {
      setCart((prev) => {
        const exists = prev.find((item) => item.id === prod.id);
        if (exists) {
          return prev.map((item) => (item.id === prod.id ? { ...item, qty: item.qty + 1 } : item));
        }
        return [...prev, { id: prod.id, name: prod.fullName, price: prod.price, qty: 1, image: prod.image }];
      });
    });
    setIsCartOpen(true);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const tickerText = '🌿 100% REN FRUKT · ⚡ INGET TILLSATTSOCKER · 🎒 KLADDFRITT MELLANMÅL · 🦊 MÖT DE 6 DJURKOMPISARNA · 🇸🇪 SVENSKT SNACKMÄRKE · ❄️ -40°C VAKUUMSUBIMERING · ';

  return (
    <div className="vb2-root min-h-screen bg-[#FDFBF7] text-[#111] overflow-x-hidden selection:bg-[#111] selection:text-white">
      {/* ─── Typography & Keyframe Styles ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fredoka+One&display=swap');

        :root {
          --font-display: 'Bebas Neue', sans-serif;
          --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          --font-logo: 'Fredoka One', cursive;
        }

        .vb2-font-display { font-family: var(--font-display); letter-spacing: 0.03em; }
        .vb2-font-body    { font-family: var(--font-body); }
        .vb2-font-logo    { font-family: var(--font-logo); }

        .diagonal-clip     { clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%); }
        .diagonal-clip-rev { clip-path: polygon(0 0, 100% 8%, 100% 100%, 0 100%); }

        @keyframes tickerLoop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker { animation: tickerLoop 20s linear infinite; }

        @keyframes pouchFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(1.5deg); }
        }
        .pouch-levitate { animation: pouchFloat 4.2s ease-in-out infinite; }

        @keyframes badgeSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* ─── Top Bar Banner ─── */}
      <div className="bg-[#111] text-white py-2 px-3 text-center text-[11px] sm:text-xs font-semibold tracking-wider flex flex-wrap items-center justify-center gap-2">
        <span className="bg-[#E8344A] text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
          Nyhet
        </span>
        <span>Fri frakt vid köp av 2 boxar · Skickas inom 24 timmar med PostNord</span>
      </div>

      {/* ─── Sticky Header ─── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-[3px] border-[#111]">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Logo with tagline */}
          <div className="flex items-center gap-3">
            <img
              src={`${base}images/logo.png`}
              alt="Fruita Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="hidden sm:inline-block text-xs font-medium text-[#777] italic tracking-wide">
              · Något annorlunda
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-[#111]">
            <a href="#smaker" className="hover:text-[#E8344A] transition-colors">Smaker & Djur</a>
            <a href="#ingredienser" className="hover:text-[#E8344A] transition-colors">1 Ingrediens</a>
            <a href="#jamforelse" className="hover:text-[#E8344A] transition-colors">Fruita vs Godis</a>
            <a href="#recensioner" className="hover:text-[#E8344A] transition-colors">Recensioner</a>
            <a href="#skolbox" className="hover:text-[#E8344A] transition-colors">6-Pack Box</a>
          </nav>

          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-[#111] hover:bg-[#222] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-[3px_3px_0_#999] cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#FFD166]" />
            <span>Kassa</span>
            {totalItemsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#E8344A] text-white text-[10px] font-black flex items-center justify-center border-2 border-white">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ─── Ticker Marquee ─── */}
      <div className="bg-[#111] text-white py-2.5 overflow-hidden whitespace-nowrap border-b-2 border-white/10">
        <div className="inline-block animate-ticker text-xs font-extrabold tracking-widest uppercase">
          {tickerText.repeat(8)}
        </div>
      </div>

      {/* ─── Hero Section with Dynamic Fruit Colors & Real 3D Pouch ─── */}
      <section
        className="diagonal-clip relative text-white transition-colors duration-700 pb-28 pt-12 md:pt-16 px-6"
        style={{ backgroundColor: activeProduct.bg }}
      >
        {/* Ambient background glow dots */}
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-black/10 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Big Scandinavian Headline & Mascot Story */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Badge pill */}
            <div className="inline-flex items-center gap-2 bg-white text-[#111] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-[3px_3px_0_rgba(0,0,0,0.2)] border-2 border-[#111]">
              <span className="text-base">{activeProduct.mascotEmoji}</span>
              <span>MÖT {activeProduct.mascotName.toUpperCase()} · 100% REN FRUKT</span>
            </div>

            {/* Giant Display Title */}
            <h1 className="vb2-font-display text-5xl sm:text-7xl md:text-9xl leading-[0.88] text-white drop-shadow-[4px_4px_0_rgba(0,0,0,0.25)] break-words">
              {activeProduct.name.toUpperCase()}!
            </h1>

            {/* Subtitle with real packaging text */}
            <div className="inline-block bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/20">
              <span className="vb2-font-display text-xl sm:text-2xl tracking-wider text-white">
                {activeProduct.subtitle.toUpperCase()} · 15G SUPERCRUNCH
              </span>
            </div>

            <p className="vb2-font-body text-base sm:text-lg text-white/95 max-w-xl font-normal leading-relaxed">
              {activeProduct.description}
            </p>

            {/* Packaging Guarantee Pills */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {['100% Frukt', '1 Ingrediens', 'Utan Tillsatser', 'Naturligt Gott', 'Kladdfri'].map((pill, idx) => (
                <span
                  key={idx}
                  className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm"
                >
                  ✓ {pill}
                </span>
              ))}
            </div>

            {/* CTA & Rating Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <button
                onClick={(e) => addToCart(activeProduct, e)}
                className="vb2-font-display text-xl sm:text-2xl tracking-wider bg-white text-[#111] hover:bg-black hover:text-white border-[3px] border-[#111] px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl shadow-[5px_5px_0_#111] transition-all duration-200 active:scale-95 flex items-center gap-3 cursor-pointer w-full sm:w-auto justify-center"
              >
                <span>KÖP {activeProduct.name.toUpperCase()} · 29 KR</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="text-xs font-bold text-white/90 flex items-center gap-2">
                <span>⭐⭐⭐⭐⭐</span>
                <span>{activeProduct.rating} ({activeProduct.reviews} recensioner)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Real Transparent Pouch on 3D Podium */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative my-4 lg:my-0">
            {/* Podium Circle */}
            <div className="relative w-64 h-64 sm:w-88 sm:h-88 max-w-[80vw] max-h-[80vw] rounded-full bg-white/15 border-4 border-white/25 flex items-center justify-center shadow-2xl backdrop-blur-sm">
              <div className="w-52 h-52 sm:w-72 sm:h-72 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center">
                {/* Floating Real Pouch Image */}
                <div className="pouch-levitate relative z-20 w-52 sm:w-76 flex justify-center">
                  <img
                    src={`${base}${activeProduct.image}`}
                    alt={activeProduct.fullName}
                    className="max-h-[260px] sm:max-h-[440px] w-auto object-contain select-none drop-shadow-[0_30px_35px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Floating Badge Sticker */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-[#FFD700] text-[#111] border-[3px] border-[#111] rounded-full w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center shadow-[4px_4px_0_#111] rotate-12 z-30 select-none">
                <span className="text-lg sm:text-xl">⭐</span>
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-center leading-tight">
                  {activeProduct.badge}
                </span>
              </div>

              {/* Nutrition pill sticker */}
              <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 bg-white text-[#111] border-[3px] border-[#111] rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-[4px_4px_0_#111] -rotate-6 z-30 select-none">
                <span className="vb2-font-display text-sm sm:text-lg tracking-wider block leading-none">
                  ENDAST 15G · 48 KCAL
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#666] font-bold">100% Äkta råvara</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Interactive Mascot Tabs (Switch Real Pouch Instantly) */}
        <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-white/20">
          <div className="text-center mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-white/80">
              Välj en frukt för att byta hjältebild & färg:
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {REAL_PRODUCTS.map((prod, idx) => (
              <button
                key={prod.id}
                onClick={() => setActiveIdx(idx)}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                  activeIdx === idx
                    ? 'bg-white text-[#111] border-[#111] shadow-[4px_4px_0_#111] scale-105 font-bold'
                    : 'bg-black/20 text-white border-white/30 hover:bg-black/30'
                }`}
              >
                <img
                  src={`${base}${prod.image}`}
                  alt={prod.name}
                  className="w-6 h-6 object-contain drop-shadow"
                />
                <span className="text-xs font-bold">{prod.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MEGA SLOGAN: "INNEHÅLLSFÖRTECKNING: EXAKT 1 SAK. OCH DET ÄR BARA FRUKT." ─── */}
      <section id="ingredienser" className="py-24 px-6 bg-[#111] text-white border-y-[4px] border-[#111] relative overflow-hidden">
        {/* Subtle glow blobs */}
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#E8344A]/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#FFD700]/20 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FFD700] text-[#111] px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border-2 border-white shadow-[3px_3px_0_white] -rotate-2 mb-8">
            <Sparkles className="w-4 h-4 text-[#E8344A]" />
            <span>VÄRLDENS KORTASTE INNEHÅLLSFÖRTECKNING</span>
          </div>

          {/* Huge Bebas Neue Slogan */}
          <div className="space-y-4">
            <span className="text-xs sm:text-base font-extrabold uppercase tracking-widest text-[#FF758F] block">
              VAD FINNS I PÅSEN?
            </span>

            <h2 className="vb2-font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.92] text-white tracking-wide break-words">
              INNEHÅLLER EXAKT <span className="text-[#FFD700] underline decoration-[#E8344A] decoration-wavy decoration-2 sm:decoration-4">1 SAK.</span>
              <br />
              OCH DET ÄR <span className="bg-[#E8344A] text-white px-3 sm:px-6 py-1 rounded-2xl inline-block mt-3 shadow-[4px_4px_0_white] sm:shadow-[6px_6px_0_white] rotate-1 max-w-full text-center">BARA ÄKTA FRUKT!</span>
            </h2>
          </div>

          {/* Subtitle statement */}
          <p className="vb2-font-body text-base sm:text-xl text-white/80 font-medium max-w-2xl mx-auto mt-8 leading-relaxed">
            Inget tillsatt socker. Inga sötningsmedel. Inget gelatin. Inga E-nummer.
            <br />
            <strong className="text-white">100% ren, frystorkad frukt — plockad i säsong och krispad vid -40°C. Inget annat.</strong>
          </p>

          {/* 3 Bold Pill Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
            <div className="bg-white/10 border-2 border-white/20 rounded-2xl p-6 backdrop-blur-md shadow-lg">
              <span className="text-4xl block mb-2">1️⃣</span>
              <div className="vb2-font-display text-3xl text-[#FFD700] tracking-wide">1 INGREDIENS</div>
              <p className="text-xs text-white/70 mt-1 font-medium">Bara jordgubbe, banan, äpple, hallon, björnbär eller mango.</p>
            </div>
            <div className="bg-white/10 border-2 border-white/20 rounded-2xl p-6 backdrop-blur-md shadow-lg">
              <span className="text-4xl block mb-2">🚫</span>
              <div className="vb2-font-display text-3xl text-[#FF758F] tracking-wide">0% TILLSATSER</div>
              <p className="text-xs text-white/70 mt-1 font-medium">Inget tillsatt socker, konserveringsmedel eller palmolja.</p>
            </div>
            <div className="bg-white/10 border-2 border-white/20 rounded-2xl p-6 backdrop-blur-md shadow-lg">
              <span className="text-4xl block mb-2">❄️</span>
              <div className="vb2-font-display text-3xl text-[#6DBF4F] tracking-wide">-40°C SUBLIMERING</div>
              <p className="text-xs text-white/70 mt-1 font-medium">Vakuumteknik låser in 98% av färskfruktens vitaminer & färg.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section: The 6 Real Products Grid (De 6 Djurkompisarna) ─── */}
      <section id="smaker" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#E8344A] text-white vb2-font-display text-4xl sm:text-5xl px-8 py-2 rounded-2xl border-[3px] border-[#111] shadow-[5px_5px_0_#111] -rotate-1 mb-4 uppercase">
            DE 6 SMAKERNA & DJURKOMPISARNA
          </div>
          <p className="text-sm sm:text-base text-[#666] max-w-2xl mx-auto">
            Varje påse pryds av en söt djurkompis och innehåller 100% ren, frystorkad frukt. Inga tillsatser, inget kladd och 100% barnvänligt.
          </p>
        </div>

        {/* 6 Real Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {REAL_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl border-[3px] border-[#111] shadow-[6px_6px_0_#111] overflow-hidden flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 group"
            >
              <div>
                {/* Header colored banner with mascot & transparent pouch */}
                <div
                  className="p-6 relative flex flex-col items-center justify-center min-h-[260px] border-b-[3px] border-[#111] overflow-hidden"
                  style={{ backgroundColor: prod.light }}
                >
                  {/* Animal Mascot Pill */}
                  <div className="absolute top-4 left-4 bg-white border-2 border-[#111] px-3 py-1 rounded-full text-xs font-bold text-[#111] shadow-[2px_2px_0_#111] flex items-center gap-1.5">
                    <span>{prod.mascotEmoji}</span>
                    <span>{prod.mascotName}</span>
                  </div>

                  {/* Weight / Calories Pill */}
                  <div className="absolute top-4 right-4 bg-[#111] text-white px-2.5 py-1 rounded-full text-[10px] font-bold">
                    15g · {prod.nutrition.kcal} kcal
                  </div>

                  {/* Real Pouch Image with hover pop */}
                  <div className="w-48 h-56 flex items-center justify-center pt-4">
                    <img
                      src={`${base}${prod.image}`}
                      alt={prod.fullName}
                      className="max-h-full w-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.35)] group-hover:scale-110 transition-transform duration-400 select-none"
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="vb2-font-display text-3xl text-[#111] tracking-wide">
                      {prod.fullName.toUpperCase()}
                    </h3>
                    <span className="text-xs font-bold text-[#E8344A]">
                      100% Frukt
                    </span>
                  </div>

                  <p className="text-xs text-[#555] font-medium mb-4 leading-relaxed">
                    {prod.claim}
                  </p>

                  {/* Nutrition Highlights */}
                  <div className="grid grid-cols-2 gap-2 bg-[#F8F7F4] p-3 rounded-xl border border-[#E5E3DE] text-[11px] font-semibold text-[#444] mb-4">
                    <div>Fiber: <strong>{prod.nutrition.fiber}</strong></div>
                    <div>Socker: <strong className="text-emerald-600">{prod.nutrition.sugar}</strong></div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Price & Add to Cart */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#EEE]">
                <div>
                  <span className="text-[11px] text-[#888] font-bold block uppercase">Pris / påse</span>
                  <span className="vb2-font-display text-3xl text-[#111] leading-none">
                    {prod.price} kr
                  </span>
                </div>

                <button
                  onClick={(e) => addToCart(prod, e)}
                  className="bg-[#111] hover:bg-[#E8344A] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl border-2 border-[#111] shadow-[3px_3px_0_#111] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Köp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Section: Comparison Battle (Fruita vs Vanligt Godis & Snacks) ─── */}
      <section id="jamforelse" className="py-20 px-6 bg-[#FFF2D9] border-y-[3px] border-[#111]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#D84900] bg-white border-2 border-[#111] px-4 py-1.5 rounded-full shadow-[2px_2px_0_#111] inline-block mb-3">
              Ärlig Varudeklaration
            </span>
            <h2 className="vb2-font-display text-5xl sm:text-6xl text-[#111] tracking-wide">
              VARFÖR FRUITA SLÅR ALLT ANNAT MELLANMÅL
            </h2>
            <p className="text-sm text-[#666] max-w-xl mx-auto mt-2">
              Se skillnaden mellan 100% ren frystorkad frukt och vanliga sockerfällor i godishyllan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* The Fruita Way */}
            <div className="bg-white rounded-3xl border-[3px] border-[#111] p-8 shadow-[8px_8px_0_#111] relative">
              <div className="inline-block bg-[#6DBF4F] text-white vb2-font-display text-2xl px-4 py-1 rounded-xl border-2 border-[#111] mb-6">
                ✓ FRUITA (VÅRT LÖFTE)
              </div>

              <ul className="space-y-4 text-sm font-semibold text-[#222]">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">✓</span>
                  <div>
                    <strong>100% Äkta frukt:</strong> Endast 1 ingrediens på innehållsförteckningen.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">✓</span>
                  <div>
                    <strong>0% Tillsatt socker:</strong> Ingen sirap, koncentrat eller fusk.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">✓</span>
                  <div>
                    <strong>Kladdfritt & krispigt:</strong> Kladdar inte ner skolväskor, bilbarnstolar eller soffor.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">✓</span>
                  <div>
                    <strong>98% Vitaminer kvar:</strong> Sublimering vid -40°C bevarar näringen intakt.
                  </div>
                </li>
              </ul>
            </div>

            {/* Traditional Snacks / Candy */}
            <div className="bg-[#F8EFE4] rounded-3xl border-[3px] border-[#111] p-8 shadow-[8px_8px_0_#888] opacity-85">
              <div className="inline-block bg-[#E8344A] text-white vb2-font-display text-2xl px-4 py-1 rounded-xl border-2 border-[#111] mb-6">
                ✗ VANLIGT GODIS & FRUKTBARS
              </div>

              <ul className="space-y-4 text-sm font-medium text-[#555]">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold">✗</span>
                  <div>
                    <strong>Raffinerat socker & glukossirap:</strong> Upp till 60% sockerhalt.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold">✗</span>
                  <div>
                    <strong>Klistrar i tänderna:</strong> Torkade russin och dadlar fastnar i barnens tänder.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold">✗</span>
                  <div>
                    <strong>Tillsatta oljor & E-nummer:</strong> Konserveringsmedel och gelatin.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold">✗</span>
                  <div>
                    <strong>Värmeskadat:</strong> Vanlig ugnstorkning förstör värmekänsligt C-vitamin.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CUSTOMER REVIEWS (Vad säger föräldrar & barn i Sverige?) ─── */}
      <section id="recensioner" className="py-24 px-6 bg-white border-t-[3px] border-[#111]">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#FFD700] text-[#111] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border-2 border-[#111] shadow-[2px_2px_0_#111] mb-4">
              <span>⭐ 4.9 AV 5.0 · ÖVER 700 VERIFIERADE KÖP</span>
            </div>
            <h2 className="vb2-font-display text-5xl sm:text-6xl text-[#111] tracking-wide">
              VAD SÄGER FÖRÄLDRAR I SVERIGE?
            </h2>
            <p className="text-sm sm:text-base text-[#666] max-w-xl mx-auto mt-2">
              Svenska småbarnsföräldrar har bytt ut kladdiga russin, sockriga fruktstänger och tjat om godis. Här är deras ärliga recensioner.
            </p>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-[#FFF0F2] rounded-3xl border-[3px] border-[#111] p-7 shadow-[6px_6px_0_#111] flex flex-col justify-between hover:-translate-y-1.5 transition-transform duration-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-amber-500 text-base font-bold">⭐⭐⭐⭐⭐</div>
                  <span className="bg-white border border-[#111] text-[10px] font-bold px-2 py-0.5 rounded-full text-emerald-700 flex items-center gap-1">
                    ✓ Verifierad köpare
                  </span>
                </div>
                <h4 className="vb2-font-display text-2xl text-[#111] mb-2 leading-tight">
                  ”INGET KLADD I BILBARNSTOLEN!”
                </h4>
                <p className="text-xs sm:text-sm text-[#444] leading-relaxed mb-6 font-normal">
                  ”Slut på klibbiga fingrar och intorkade bananfläckar i bilen! Våra två barn (3 och 6 år) älskar jordgubbarna och hallonen. Att det verkligen bara är 100% frukt utan tillsatt socker gör att man kan bjuda varje dag med gott samvete.”
                </p>
              </div>
              <div className="pt-4 border-t border-[#111]/15 flex items-center justify-between">
                <div>
                  <strong className="text-xs font-bold text-[#111] block">Emma Lindqvist</strong>
                  <span className="text-[11px] text-[#777]">Mamma till 2 · Stockholm</span>
                </div>
                <span className="text-xs font-bold text-[#E8344A] bg-white border border-[#111] px-2.5 py-1 rounded-full">
                  🍓 Jordgubbe
                </span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-[#FFF8EE] rounded-3xl border-[3px] border-[#111] p-7 shadow-[6px_6px_0_#111] flex flex-col justify-between hover:-translate-y-1.5 transition-transform duration-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-amber-500 text-base font-bold">⭐⭐⭐⭐⭐</div>
                  <span className="bg-white border border-[#111] text-[10px] font-bold px-2 py-0.5 rounded-full text-emerald-700 flex items-center gap-1">
                    ✓ Verifierad köpare
                  </span>
                </div>
                <h4 className="vb2-font-display text-2xl text-[#111] mb-2 leading-tight">
                  ”RÄDDAREN I KÅNKEN-RYGGSÄCKEN”
                </h4>
                <p className="text-xs sm:text-sm text-[#444] leading-relaxed mb-6 font-normal">
                  ”Påsarna väger ingenting och blir aldrig bruna eller mosade i skolväskan som vanliga äpplen och bananer. Vår son vägrade all frukt förut men älskar Tigern Ture och mangoskivorna. Ett genidrag!”
                </p>
              </div>
              <div className="pt-4 border-t border-[#111]/15 flex items-center justify-between">
                <div>
                  <strong className="text-xs font-bold text-[#111] block">Johan & Sofia Berg</strong>
                  <span className="text-[11px] text-[#777]">Föräldrar · Göteborg</span>
                </div>
                <span className="text-xs font-bold text-[#F07E1A] bg-white border border-[#111] px-2.5 py-1 rounded-full">
                  🥭 Mango
                </span>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-[#F0FAE8] rounded-3xl border-[3px] border-[#111] p-7 shadow-[6px_6px_0_#111] flex flex-col justify-between hover:-translate-y-1.5 transition-transform duration-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-amber-500 text-base font-bold">⭐⭐⭐⭐⭐</div>
                  <span className="bg-white border border-[#111] text-[10px] font-bold px-2 py-0.5 rounded-full text-emerald-700 flex items-center gap-1">
                    ✓ Verifierad köpare
                  </span>
                </div>
                <h4 className="vb2-font-display text-2xl text-[#111] mb-2 leading-tight">
                  ”HELT PERFEKT CRUNCH FÖR FREDAGSMYSET”
                </h4>
                <p className="text-xs sm:text-sm text-[#444] leading-relaxed mb-6 font-normal">
                  ”Vi köpte 6-packet för att testa alla djurkompisar. Det knastrar så härligt och smälter i munnen. Barnen tror knappt på att det inte är godis. Nu köper vi 2 skolboxar i månaden på prenumeration!”
                </p>
              </div>
              <div className="pt-4 border-t border-[#111]/15 flex items-center justify-between">
                <div>
                  <strong className="text-xs font-bold text-[#111] block">Malin Karlsson</strong>
                  <span className="text-[11px] text-[#777]">Förskolepedagog & mamma · Malmö</span>
                </div>
                <span className="text-xs font-bold text-[#6DBF4F] bg-white border border-[#111] px-2.5 py-1 rounded-full">
                  🎒 6-Pack Box
                </span>
              </div>
            </div>
          </div>

          {/* Social Proof Trust Bar */}
          <div className="mt-14 bg-[#FDFBF7] border-[3px] border-[#111] rounded-2xl p-6 flex flex-wrap items-center justify-around gap-6 text-center shadow-[4px_4px_0_#111]">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🇸🇪</span>
              <div className="text-left">
                <strong className="text-xs font-bold text-[#111] block">Svenskt Företag</strong>
                <span className="text-[11px] text-[#666]">Packat & kontrollerat i Sverige</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">📦</span>
              <div className="text-left">
                <strong className="text-xs font-bold text-[#111] block">Blixtsnabb Leverans</strong>
                <span className="text-[11px] text-[#666]">1–2 vardagar med PostNord</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔒</span>
              <div className="text-left">
                <strong className="text-xs font-bold text-[#111] block">Trygg Swish & Klarna</strong>
                <span className="text-[11px] text-[#666]">Betala enkelt med mobilen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section: 6-Pack School Starter Bundle (Stora Skolboxen) ─── */}
      <section id="skolbox" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="bg-[#111] text-white rounded-3xl border-[4px] border-[#111] p-8 sm:p-14 shadow-[12px_12px_0_#E8344A] relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8344A]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left side: Bundle pitch */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-[#FFD700] text-[#111] font-black text-xs px-4 py-1.5 rounded-full uppercase border-2 border-white tracking-wider">
                🎒 POPULÄRASTE VALET
              </div>

              <h2 className="vb2-font-display text-5xl sm:text-7xl leading-none text-white tracking-wide">
                STORA SKOLBOXEN (6-PACK)
              </h2>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Prova alla 6 frukter och djurkompisar! En påse för varje skoldag plus en till lördagsmyset. Räven Freja, Apan Mio, Älgen Albin, Kaninen Klara, Björnen Bruno och Tigern Ture i ett komplett paket.
              </p>

              <div className="flex items-baseline gap-4 pt-2">
                <span className="vb2-font-display text-5xl text-[#FFD700]">149 kr</span>
                <span className="text-white/50 line-through text-lg font-bold">Ord. 174 kr</span>
                <span className="bg-[#E8344A] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                  Spara 25 kr
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={addBundleToCart}
                  className="vb2-font-display text-2xl tracking-wider bg-[#E8344A] hover:bg-[#D02036] text-white border-[3px] border-white px-8 py-4 rounded-2xl shadow-[5px_5px_0_white] transition-all active:scale-95 flex items-center gap-3 cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5 text-[#FFD700]" />
                  <span>KÖP HELA 6-PACKET · 149 KR</span>
                </button>
              </div>
            </div>

            {/* Right side: 6 Real Pouches Fanned Out */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
                {REAL_PRODUCTS.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white/10 border border-white/20 rounded-2xl p-2 flex flex-col items-center hover:scale-105 transition-transform"
                  >
                    <img
                      src={`${base}${prod.image}`}
                      alt={prod.name}
                      className="h-28 w-auto object-contain drop-shadow"
                    />
                    <span className="text-[10px] font-bold text-white mt-1">{prod.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-[#111] text-white/70 py-16 px-6 border-t-[3px] border-[#111]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-xs font-semibold">
          <div className="flex items-center gap-3">
            <img
              src={`${base}images/logo-white.png`}
              alt="Fruita Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="bg-white/10 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">
              Varyant B · Mascot Edition
            </span>
          </div>

          <div className="text-center md:text-left text-white/60">
            © {new Date().getFullYear()} Fruita Nordic AB · Org.nr 559412-3456 · Stockholm, Sverige
          </div>

          <div className="flex items-center gap-4 text-white font-mono text-[11px]">
            <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">SWISH</span>
            <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">KLARNA</span>
            <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">KRAV</span>
          </div>
        </div>
      </footer>

      {/* ─── Cart Drawer with Swish Simulation ─── */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[999999] flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white border-l-[3px] border-[#111] h-full p-6 flex flex-col justify-between overflow-y-auto text-[#111]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#111] mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#E8344A]" />
                  <h3 className="vb2-font-display text-2xl text-[#111] tracking-wide">
                    DIN VARUKORG ({totalItemsCount})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#EEE] hover:bg-[#DDD] flex items-center justify-center text-[#111] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16 text-[#777] text-sm">
                  Din varukorg är tom. Klicka på en frukt för att lägga till!
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#F8F7F4] rounded-2xl p-3 border-2 border-[#111] flex items-center justify-between shadow-[2px_2px_0_#111]"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={`${base}${item.image}`}
                          alt={item.name}
                          className="w-12 h-14 object-contain"
                        />
                        <div>
                          <div className="text-sm font-bold text-[#111]">{item.name}</div>
                          <div className="text-xs text-[#777]">{item.price} kr / st</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold">x{item.qty}</span>
                        <strong className="text-sm font-black text-[#E8344A]">
                          {item.qty * item.price} kr
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t-2 border-[#111] space-y-4">
                <div className="flex justify-between items-center text-sm font-bold text-[#111]">
                  <span>Totalt inkl. moms:</span>
                  <span className="vb2-font-display text-3xl text-[#E8344A]">{cartTotal} kr</span>
                </div>

                {isPaid ? (
                  <div className="bg-emerald-500/10 border-2 border-emerald-600 rounded-2xl p-4 text-center text-emerald-800 text-xs font-bold">
                    ✓ Beställning mottagen! Bekräftelse skickad till Swish. Tack!
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="tel"
                      placeholder="Mobilnummer (Swish): 070-123 45 67"
                      value={swishPhone}
                      onChange={(e) => setSwishPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F7F4] border-2 border-[#111] text-[#111] placeholder-[#888] text-xs font-medium focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        if (!swishPhone) return;
                        setIsPaid(true);
                        setTimeout(() => {
                          setCart([]);
                          setIsCartOpen(false);
                          setIsPaid(false);
                        }, 2500);
                      }}
                      className="w-full bg-[#E8344A] hover:bg-[#D02036] text-white font-bold text-sm py-4 rounded-xl border-2 border-[#111] shadow-[4px_4px_0_#111] flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Betala {cartTotal} kr direkt med Swish</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
