import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Check,
  RotateCcw,
  Zap,
  Volume2,
  Thermometer,
  Wind,
  Layers,
  Heart,
  ChevronDown,
  X,
  Smartphone
} from 'lucide-react';
import { PRODUCTS } from '../data/products';

// Interactive fruit list
const FRUITS_KINETIC = [
  {
    id: 'fruita-jordgubbe',
    name: 'Fruita Jordgubbe',
    nameShort: 'Jordgubbe',
    emoji: '🍓',
    color: '#E8344A',
    bgGradient: 'from-rose-500/10 via-amber-500/5 to-transparent',
    accentColor: '#FF4D6D',
    temp: '-42°C',
    crunchDb: '48 dB',
    crunches: '100% frasigt knaster',
    description: 'Solmogna svenska & egeiska jordgubbar. Frystorkade till absolut krispig perfektion.',
    image: 'images/products/jordgubbe.jpg',
  },
  {
    id: 'fruita-banan',
    name: 'Fruita Banan',
    nameShort: 'Banan',
    emoji: '🍌',
    color: '#EAB308',
    bgGradient: 'from-amber-500/10 via-yellow-500/5 to-transparent',
    accentColor: '#FACC15',
    temp: '-38°C',
    crunchDb: '42 dB',
    crunches: 'Mjuk krispighet',
    description: 'Gyllene bananmynt med intensiv naturlig kolaton utan tillsatt socker.',
    image: 'images/products/banan.jpg',
  },
  {
    id: 'fruita-apple',
    name: 'Fruita Grönt Äpple',
    nameShort: 'Grönt Äpple',
    emoji: '🍏',
    color: '#84CC16',
    bgGradient: 'from-lime-500/10 via-emerald-500/5 to-transparent',
    accentColor: '#A3E635',
    temp: '-40°C',
    crunchDb: '52 dB',
    crunches: 'Maximalt knastrigt',
    description: 'Frisk, syrlig äppelkrisp som väcker smaklökarna. Perfekt i frukostskålen.',
    image: 'images/products/apple.png',
  },
  {
    id: 'fruita-hallon',
    name: 'Fruita Vilda Hallon',
    nameShort: 'Hallon',
    emoji: '🫐',
    color: '#DB2777',
    bgGradient: 'from-pink-500/10 via-rose-500/5 to-transparent',
    accentColor: '#F472B6',
    temp: '-44°C',
    crunchDb: '46 dB',
    crunches: 'Luftigt frasig',
    description: 'Vilda hallon med bevarad hel bärform och explosiv naturlig hallonsmak.',
    image: 'images/products/hallon.jpg',
  },
  {
    id: 'fruita-bjornbar',
    name: 'Fruita Björnbär',
    nameShort: 'Björnbär',
    emoji: '🟣',
    color: '#7C3AED',
    bgGradient: 'from-purple-500/10 via-indigo-500/5 to-transparent',
    accentColor: '#A78BFA',
    temp: '-41°C',
    crunchDb: '45 dB',
    crunches: 'Djup bärkrisp',
    description: 'Mörklila skogsbär fyllda med antioxidanter och spröd textur.',
    image: 'images/products/bjornbar.jpg',
  },
];

export default function VariantD() {
  const base = import.meta.env.BASE_URL;
  const [activeFruit, setActiveFruit] = useState(FRUITS_KINETIC[0]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollyPhase, setScrollyPhase] = useState(0); // 0, 1, 2, 3
  const [crunchCount, setCrunchCount] = useState(0);
  const [cart, setCart] = useState<{ id: string; name: string; qty: number; price: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [swishPhone, setSwishPhone] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  // References for anime.js
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroPillsRef = useRef<HTMLDivElement>(null);
  const scrollyContainerRef = useRef<HTMLDivElement>(null);
  const crunchBoxRef = useRef<HTMLDivElement>(null);

  // ─── Anime.js Hero Entrance Timeline ───
  useEffect(() => {
    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1200,
    });

    tl.add({
      targets: heroBadgeRef.current,
      translateY: [-30, 0],
      opacity: [0, 1],
      duration: 600,
    })
      .add(
        {
          targets: '.kinetic-hero-word',
          translateY: [60, 0],
          opacity: [0, 1],
          delay: anime.stagger(120),
          duration: 900,
          easing: 'spring(1, 80, 10, 0)',
        },
        '-=400'
      )
      .add(
        {
          targets: heroPillsRef.current?.children ? Array.from(heroPillsRef.current.children) : [],
          scale: [0.85, 1],
          opacity: [0, 1],
          delay: anime.stagger(80),
          duration: 700,
          easing: 'easeOutElastic(1, .6)',
        },
        '-=500'
      )
      .add(
        {
          targets: '.floating-orb',
          translateY: () => anime.random(-15, 15),
          translateX: () => anime.random(-10, 10),
          direction: 'alternate',
          loop: true,
          easing: 'easeInOutSine',
          duration: 3500,
          delay: anime.stagger(200),
        },
        '-=600'
      );
  }, []);

  // ─── Scroll Progress & Scrollytelling Phase Tracker ───
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);

      // Check scrollytelling container progress
      if (scrollyContainerRef.current) {
        const rect = scrollyContainerRef.current.getBoundingClientRect();
        const containerHeight = scrollyContainerRef.current.offsetHeight - window.innerHeight;
        const offsetTop = -rect.top;
        if (containerHeight > 0) {
          const ratio = Math.min(Math.max(offsetTop / containerHeight, 0), 1);
          if (ratio < 0.25) setScrollyPhase(0);
          else if (ratio < 0.55) setScrollyPhase(1);
          else if (ratio < 0.82) setScrollyPhase(2);
          else setScrollyPhase(3);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── Anime.js "Click to Crunch" Particle Explosion ───
  const triggerCrunchExplosion = (e: React.MouseEvent) => {
    setCrunchCount((prev) => prev + 1);

    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    // Create 16 particle shards
    const container = crunchBoxRef.current;
    if (!container) return;

    for (let i = 0; i < 14; i++) {
      const crumb = document.createElement('div');
      crumb.className = 'crumb-particle pointer-events-none absolute';
      crumb.style.left = `${e.clientX - rect.left}px`;
      crumb.style.top = `${e.clientY - rect.top}px`;
      crumb.style.width = `${anime.random(6, 14)}px`;
      crumb.style.height = `${anime.random(6, 14)}px`;
      crumb.style.borderRadius = `${anime.random(2, 6)}px`;
      crumb.style.backgroundColor = activeFruit.accentColor;
      crumb.style.zIndex = '999';
      container.appendChild(crumb);

      anime({
        targets: crumb,
        translateX: anime.random(-140, 140),
        translateY: anime.random(-140, 140),
        scale: [1, 0],
        rotate: anime.random(-360, 360),
        opacity: [1, 0],
        easing: 'easeOutExpo',
        duration: anime.random(600, 1100),
        complete: () => {
          crumb.remove();
        },
      });
    }

    // Little haptic-like button bounce
    anime({
      targets: target,
      scale: [0.94, 1.04, 1],
      duration: 350,
      easing: 'spring(1, 80, 10, 0)',
    });
  };

  // Switch fruit with Anime.js morph
  const switchFruit = (fruit: typeof FRUITS_KINETIC[0]) => {
    setActiveFruit(fruit);
    anime({
      targets: '.fruit-stage-card',
      opacity: [0.3, 1],
      scale: [0.96, 1],
      duration: 500,
      easing: 'easeOutQuad',
    });
  };

  // Cart operations
  const addToCart = (fruit: typeof FRUITS_KINETIC[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === fruit.id);
      if (existing) {
        return prev.map((item) => (item.id === fruit.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { id: fruit.id, name: fruit.name, qty: 1, price: 29 }];
    });
    setIsCartOpen(true);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="bg-[#0C0F12] text-[#F3F4F6] min-h-screen overflow-x-hidden selection:bg-[#E8344A] selection:text-white font-sans">
      {/* ─── Top Scroll Progress Bar ─── */}
      <div
        className="fixed top-0 left-0 h-1 z-[9999] bg-gradient-to-r from-[#E8344A] via-[#EAB308] to-[#84CC16] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ─── Ambient Glow Background Blobs ─── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="floating-orb absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[140px] opacity-25 transition-all duration-700"
          style={{ backgroundColor: activeFruit.color }}
        />
        <div className="floating-orb absolute top-1/2 -right-40 w-96 h-96 rounded-full blur-[160px] opacity-20 bg-amber-500" />
      </div>

      {/* ─── Sticky Glass Header ─── */}
      <header className="sticky top-0 z-50 bg-[#0C0F12]/80 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E8344A] to-[#FF758F] flex items-center justify-center font-bold text-white shadow-lg shadow-rose-900/30">
              F
            </span>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
              fruita
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10 uppercase tracking-widest">
                Kinetic
              </span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-white/60">
            <a href="#hero" className="hover:text-white transition-colors">Intro</a>
            <a href="#scrollytelling" className="hover:text-white transition-colors">Scrollytelling</a>
            <a href="#crunch-lab" className="hover:text-white transition-colors">Crunch Lab</a>
            <a href="#flavors" className="hover:text-white transition-colors">Smaker</a>
          </nav>

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/15 px-4 py-2 rounded-full text-xs font-semibold text-white transition-all active:scale-95 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Kassa</span>
            {cart.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#E8344A] text-white text-[10px] font-bold flex items-center justify-center">
                {cart.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ─── Section 1: Kinetic Hero with Stagger Reveal ─── */}
      <section id="hero" className="relative z-10 pt-16 pb-24 md:pt-24 md:pb-36 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div ref={heroBadgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-medium mb-8 opacity-0">
            <Zap className="w-3.5 h-3.5 text-[#EAB308]" />
            <span>Scroll & Anime.js Driven E-Commerce Experience</span>
          </div>

          {/* Staggered Heading Words */}
          <h1
            ref={heroTitleRef}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-8 text-white"
          >
            <span className="kinetic-hero-word inline-block mr-3">Känn</span>
            <span className="kinetic-hero-word inline-block mr-3 bg-gradient-to-r from-[#FF758F] via-[#FFD166] to-[#06D6A0] bg-clip-text text-transparent">
              Crunchen.
            </span>
            <br />
            <span className="kinetic-hero-word inline-block mr-3">100%</span>
            <span className="kinetic-hero-word inline-block mr-3">Ren</span>
            <span className="kinetic-hero-word inline-block">Frukt.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Skrolla neråt för att resa genom -40°C vakuumsublimering. Se hur 150 gram färsk frukt förvandlas till ett frasigt, fjäderlätt mellanmål.
          </p>

          {/* Hero CTAs */}
          <div ref={heroPillsRef} className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <a
              href="#scrollytelling"
              className="bg-[#E8344A] hover:bg-[#D02036] text-white px-7 py-4 rounded-full flex items-center gap-2.5 transition-all shadow-lg shadow-rose-900/40 active:scale-95"
            >
              <span>Börja Resan (Skrolla Ner)</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>
            <button
              onClick={() => addToCart(activeFruit)}
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-4 rounded-full flex items-center gap-2 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-[#06D6A0]" />
              <span>Köp Provpaket · 29 kr</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── Section 2: Scrollytelling Pinned Stage (Scroll Experience) ─── */}
      <section
        id="scrollytelling"
        ref={scrollyContainerRef}
        className="relative z-10 h-[360vh] bg-gradient-to-b from-[#0C0F12] via-[#11161B] to-[#0C0F12] border-t border-white/[0.08]"
      >
        {/* Sticky viewport frame */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-6 md:p-12 overflow-hidden">
          {/* Header indicator inside sticky canvas */}
          <div className="flex items-center justify-between max-w-5xl mx-auto w-full border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8344A] animate-ping" />
              <span className="text-xs uppercase tracking-widest font-bold text-white/50">
                Processresan: Fas {scrollyPhase + 1} av 4
              </span>
            </div>

            {/* Micro phase pill indicator */}
            <div className="flex items-center gap-2">
              {['1. Skörd', '2. -40°C Frys', '3. Sublimering', '4. Supercrunch'].map((label, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] px-2.5 py-1 rounded-full font-semibold transition-all duration-300 ${
                    scrollyPhase === idx
                      ? 'bg-white text-black shadow-md'
                      : 'text-white/40 bg-white/5'
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Central Interactive Narrative Stage */}
          <div className="max-w-4xl mx-auto w-full my-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Visual Morph Stage */}
            <div className="flex items-center justify-center relative">
              {/* Outer pulsing ring */}
              <div
                className="w-72 h-72 md:w-84 md:h-84 rounded-full border border-white/10 flex items-center justify-center relative transition-all duration-700"
                style={{
                  transform: `scale(${1 + scrollyPhase * 0.05}) rotate(${scrollyPhase * 30}deg)`,
                  boxShadow: scrollyPhase === 1 ? '0 0 60px rgba(56, 189, 248, 0.25)' : 'none',
                }}
              >
                {/* Visual changing based on phase */}
                {scrollyPhase === 0 && (
                  <div className="text-center animate-in fade-in zoom-in-75 duration-500">
                    <div className="text-7xl md:text-8xl mb-2 drop-shadow-[0_10px_20px_rgba(232,52,74,0.3)]">
                      🍓
                    </div>
                    <span className="text-xs font-bold text-[#E8344A] uppercase tracking-wider">
                      Solmogen & Saftig
                    </span>
                  </div>
                )}

                {scrollyPhase === 1 && (
                  <div className="text-center animate-in fade-in zoom-in-75 duration-500">
                    <div className="text-7xl md:text-8xl mb-2 drop-shadow-[0_10px_20px_rgba(56,189,248,0.4)]">
                      ❄️🍓
                    </div>
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                      Djupfryst vid -40°C
                    </span>
                  </div>
                )}

                {scrollyPhase === 2 && (
                  <div className="text-center animate-in fade-in zoom-in-75 duration-500">
                    <div className="text-7xl md:text-8xl mb-2 drop-shadow-[0_10px_20px_rgba(234,179,8,0.3)]">
                      💨✨
                    </div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Vattnet avdunstar (Sublimering)
                    </span>
                  </div>
                )}

                {scrollyPhase === 3 && (
                  <div className="text-center animate-in fade-in zoom-in-75 duration-500">
                    <div className="text-7xl md:text-8xl mb-2 drop-shadow-[0_10px_25px_rgba(16,185,129,0.4)]">
                      🎒✨
                    </div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      15g Ren Supercrunch
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Text description per phase */}
            <div className="space-y-6">
              {scrollyPhase === 0 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#E8344A]">
                    Fas 01 · Skörd i säsong
                  </span>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white">
                    Endast 100% solmogen frukt
                  </h3>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    Frukten plockas när den är som sötast och fullproppad med naturliga vitaminer. Inga omogna frukter, inga artificiella mognadsgaser.
                  </p>
                  <div className="flex items-center gap-3 text-xs font-semibold text-white/80 pt-2">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Vattenhalt: ~90%</span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Temperatur: +24°C</span>
                  </div>
                </div>
              )}

              {scrollyPhase === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                    Fas 02 · Chockfrysning
                  </span>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white">
                    Cellstrukturen låses fast vid -40°C
                  </h3>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    Till skillnad från vanlig värmetorkning (ugn) förstör vi inte vitaminerna eller cellväggarna. Frukten fryses blixtsnabbt för att bevara sin ursprungliga form och näring.
                  </p>
                  <div className="flex items-center gap-3 text-xs font-semibold text-white/80 pt-2">
                    <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300">Temperatur: -40°C</span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Cellstatus: 100% intakt</span>
                  </div>
                </div>
              )}

              {scrollyPhase === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    Fas 03 · Vakuumkammare
                  </span>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white">
                    Vattnet dunstar direkt från is till ånga
                  </h3>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    Under extremt vakuum sker sublimering: iskristallerna förvandlas direkt till ånga utan att smälta till vätska. Resultatet? All färg, doft och 98% av vitaminerna är orörda.
                  </p>
                  <div className="flex items-center gap-3 text-xs font-semibold text-white/80 pt-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300">Vatten avlägsnat: 98%</span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Tryck: 0.1 mbar</span>
                  </div>
                </div>
              )}

              {scrollyPhase === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                    Fas 04 · Slutresultat
                  </span>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white">
                    15g ren, frasig supercrunch
                  </h3>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    En 15-gramspåse innehåller näring och smak från ~150g färsk frukt. Helt kladdfri, väger ingenting i skolväskan och smälter magiskt i munnen.
                  </p>
                  <div className="flex items-center gap-3 text-xs font-semibold text-white/80 pt-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">0% Tillsatt socker</span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">100% Återvinningsbar</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom helper prompt */}
          <div className="text-center text-xs text-white/40">
            {scrollyPhase < 3 ? 'Fortsätt skrolla för nästa steg ↓' : 'Perfekt! Upptäck Crunch Lab nedan ↓'}
          </div>
        </div>
      </section>

      {/* ─── Section 3: Crunch Lab (Anime.js Particle Burst Playground) ─── */}
      <section id="crunch-lab" className="py-24 px-6 relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E8344A]">
            Interaktiv Ljud & Partikel-Demo
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">
            The Crunch Lab
          </h2>
          <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto mt-3">
            Klicka på frukten för att utlösa en Anime.js partikelsmäll och testa crunchens decibel.
          </p>
        </div>

        <div
          ref={crunchBoxRef}
          className="relative bg-white/[0.04] border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden text-center backdrop-blur-md"
        >
          {/* Sound decibel meter */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80 mb-8">
            <Volume2 className="w-4 h-4 text-[#EAB308]" />
            <span>CRUNCH METER: <strong>{activeFruit.crunchDb}</strong></span>
            <span className="text-white/40">|</span>
            <span className="text-[#06D6A0]">{activeFruit.crunches}</span>
          </div>

          {/* Giant Clickable Fruit with Anime.js Elasticity */}
          <div className="my-6">
            <button
              onClick={triggerCrunchExplosion}
              className="group relative inline-flex items-center justify-center p-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 transition-all duration-300 active:scale-90 focus:outline-none cursor-pointer"
              title="Klicka för att crunsha!"
            >
              <span className="text-8xl md:text-9xl transition-transform duration-300 group-hover:scale-110 select-none">
                {activeFruit.emoji}
              </span>
              <span className="absolute -bottom-2 bg-[#E8344A] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg">
                KLICKA HÄR!
              </span>
            </button>
          </div>

          <div className="text-xs text-white/50 mt-4">
            Du har crunshat <strong className="text-white">{crunchCount}</strong> gånger!
          </div>

          {/* Fruit selector inside lab */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 pt-6 border-t border-white/10">
            {FRUITS_KINETIC.map((fruit) => (
              <button
                key={fruit.id}
                onClick={() => switchFruit(fruit)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeFruit.id === fruit.id
                    ? 'bg-white text-black shadow-md'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {fruit.emoji} {fruit.nameShort}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 4: Interactive Flavor Showcase (Anime.js Driven) ─── */}
      <section id="flavors" className="py-20 px-6 max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#06D6A0]">
              Fem Rika Smaker
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Välj din favoritcrunch
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-white/50 max-w-sm mt-3 md:mt-0">
            Alla smaker innehåller 100% ren frukt och 0% tillsatser. 15g påse = 29 kr.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FRUITS_KINETIC.map((fruit) => (
            <div
              key={fruit.id}
              className="fruit-stage-card bg-white/[0.04] border border-white/10 hover:border-white/20 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{fruit.emoji}</span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 text-white/70 border border-white/10">
                    {fruit.temp}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#FF758F] transition-colors">
                  {fruit.name}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed mb-6">
                  {fruit.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-white/40 block">Pris / 15g</span>
                  <span className="text-lg font-extrabold text-white">29 kr</span>
                </div>
                <button
                  onClick={() => addToCart(fruit)}
                  className="bg-white/10 hover:bg-white text-white hover:text-black font-semibold text-xs px-4 py-2.5 rounded-full transition-all duration-200 active:scale-95 flex items-center gap-1.5 shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Lägg till</span>
                </button>
              </div>
            </div>
          ))}

          {/* Bundle Card */}
          <div className="bg-gradient-to-br from-[#E8344A]/20 via-white/[0.05] to-transparent border border-[#E8344A]/30 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">🎒</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#E8344A] text-white">
                  POPULÄR
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">
                Skolstartspaketet (5-pack)
              </h3>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                En påse för varje skoldag! Innehåller alla 5 frukter så att barnen kan prova och hitta sin personliga favorit.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-white/40 block line-through">145 kr</span>
                <span className="text-lg font-extrabold text-white">125 kr</span>
              </div>
              <button
                onClick={() => {
                  FRUITS_KINETIC.forEach((f) => addToCart(f));
                }}
                className="bg-[#E8344A] hover:bg-[#D02036] text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95 flex items-center gap-1.5 shadow-lg shadow-rose-900/40"
              >
                <span>Köp Paketet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-12 px-6 border-t border-white/10 bg-[#080A0D] text-white/50 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-white font-bold text-sm">
            <span className="w-6 h-6 rounded-lg bg-[#E8344A] flex items-center justify-center text-xs">F</span>
            <span>fruita kinetic</span>
          </div>
          <div>© {new Date().getFullYear()} Fruita Nordic AB · Drivs med Anime.js & Scroll Experience</div>
          <div className="flex items-center gap-4 text-white/80 font-mono text-[11px]">
            <span>SWISH</span>
            <span>KLARNA</span>
            <span>KRAV</span>
          </div>
        </div>
      </footer>

      {/* ─── Interactive Checkout Drawer ─── */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[999999] flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#11161B] border-l border-white/10 h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#E8344A]" />
                  <h3 className="text-lg font-bold text-white">Din Varukorg</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-white/50 text-sm">
                  Din varukorg är tom. Klicka på en smak för att lägga till!
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/5 rounded-2xl p-3.5 border border-white/5 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">{item.name}</div>
                        <div className="text-xs text-white/50">{item.price} kr / st</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/80 font-mono">Antal: {item.qty}</span>
                        <strong className="text-sm text-white font-bold">{item.qty * item.price} kr</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center text-sm font-bold text-white">
                  <span>Totalt:</span>
                  <span className="text-xl text-[#06D6A0]">{cartTotal} kr</span>
                </div>

                {isPaid ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center text-emerald-300 text-xs">
                    ✓ Beställning slutförd med Swish! Tack!
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="tel"
                      placeholder="Mobilnummer (Swish): 070-XXX XX XX"
                      value={swishPhone}
                      onChange={(e) => setSwishPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#E8344A]"
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
                      className="w-full bg-[#E8344A] hover:bg-[#D02036] text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 active:scale-98"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Betala direkt med Swish</span>
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
