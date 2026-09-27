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
          <div className="flex items-center gap-2">
            <img
              src={`${base}images/logo-white.png`}
              alt="Fruita Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10 uppercase tracking-widest">
              Kinetic
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

          {/* Real Dried Fruit Preview Strip in Hero */}
          <div className="mt-14 pt-8 border-t border-white/10 max-w-xl mx-auto">
            <span className="text-[11px] uppercase tracking-widest text-white/50 font-bold block mb-4">
              Äkta Frystorkade Bär & Frukter · Klicka för att utforska
            </span>
            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              {FRUITS_KINETIC.map((fruit) => (
                <button
                  key={fruit.id}
                  onClick={() => switchFruit(fruit)}
                  className={`group flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                    activeFruit.id === fruit.id
                      ? 'bg-white text-black border-white shadow-lg scale-105'
                      : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <img
                    src={`${base}${fruit.image}`}
                    alt={fruit.nameShort}
                    className="w-6 h-6 rounded-full object-cover border border-white/30"
                  />
                  <span className="text-xs font-semibold">{fruit.nameShort}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 2: Interactive Sublimation Process (Gap-Free Scrollytelling Stage) ─── */}
      <section
        id="scrollytelling"
        ref={scrollyContainerRef}
        className="relative z-10 py-20 md:py-28 px-6 bg-gradient-to-b from-[#0C0F12] via-[#11161B] to-[#0C0F12] border-t border-white/[0.08]"
      >
        <div className="max-w-5xl mx-auto">
          {/* Header indicator inside canvas */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-white/10 pb-6 mb-12 gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8344A] animate-ping" />
              <span className="text-xs uppercase tracking-widest font-bold text-white/70">
                Frystorkningens 4 Steg · Klicka eller byt fas
              </span>
            </div>

            {/* Interactive phase pill buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {['1. Skörd', '2. -40°C Chockfrys', '3. Sublimering', '4. Supercrunch'].map((label, idx) => (
                <button
                  key={idx}
                  onClick={() => setScrollyPhase(idx)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
                    scrollyPhase === idx
                      ? 'bg-white text-black shadow-lg shadow-white/10 scale-105'
                      : 'text-white/60 bg-white/5 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Central Interactive Narrative Stage */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-14 backdrop-blur-xl relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
              {/* Visual Morph Stage */}
              <div className="flex flex-col items-center justify-center relative min-h-[280px]">
                {/* Outer pulsing ring */}
                <div
                  className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-white/15 flex items-center justify-center relative transition-all duration-500"
                  style={{
                    boxShadow: scrollyPhase === 1
                      ? '0 0 50px rgba(56, 189, 248, 0.3)'
                      : scrollyPhase === 2
                      ? '0 0 50px rgba(234, 179, 8, 0.25)'
                      : scrollyPhase === 3
                      ? '0 0 50px rgba(16, 185, 129, 0.3)'
                      : '0 0 40px rgba(232, 52, 74, 0.25)',
                  }}
                >
                  {/* Visual changing based on phase */}
                  {scrollyPhase === 0 && (
                    <div className="text-center animate-in fade-in zoom-in-75 duration-300">
                      <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-3 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                        <img
                          src={`${base}images/products/jordgubbe.jpg`}
                          alt="Solmogen frukt"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-bold text-[#E8344A] uppercase tracking-wider block">
                        Solmogen & Skördad i Säsong
                      </span>
                    </div>
                  )}

                  {scrollyPhase === 1 && (
                    <div className="text-center animate-in fade-in zoom-in-75 duration-300">
                      <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-3 rounded-2xl overflow-hidden shadow-2xl border-2 border-sky-400/40 relative">
                        <img
                          src={`${base}images/products/jordgubbe.jpg`}
                          alt="Djupfryst vid -40C"
                          className="w-full h-full object-cover brightness-90 contrast-125"
                        />
                        <div className="absolute inset-0 bg-sky-400/20 backdrop-blur-[1px]" />
                        <span className="absolute top-2 right-2 bg-sky-500 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                          -40°C
                        </span>
                      </div>
                      <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
                        Djupfryst & Låst Cellstruktur
                      </span>
                    </div>
                  )}

                  {scrollyPhase === 2 && (
                    <div className="text-center animate-in fade-in zoom-in-75 duration-300">
                      <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-3 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/40 relative">
                        <img
                          src={`${base}images/products/jordgubbe.png`}
                          alt="Vakuum Sublimering"
                          className="w-full h-full object-contain p-2"
                        />
                        <div className="absolute bottom-2 left-2 bg-amber-500/90 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                          98% Vatten Borta
                        </div>
                      </div>
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                        Vakuum Sublimering (Ånga)
                      </span>
                    </div>
                  )}

                  {scrollyPhase === 3 && (
                    <div className="text-center animate-in fade-in zoom-in-75 duration-300">
                      <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-3 rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-400/40 relative bg-white/5">
                        <img
                          src={`${base}images/products/jordgubbe.png`}
                          alt="15g Ren Supercrunch"
                          className="w-full h-full object-contain p-2"
                        />
                        <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          15g Portion
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                        15g Ren Frasig Supercrunch
                      </span>
                    </div>
                  )}
                </div>

                {/* Step indicator below circle */}
                <div className="mt-6 flex items-center gap-2">
                  {[0, 1, 2, 3].map((step) => (
                    <button
                      key={step}
                      onClick={() => setScrollyPhase(step)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        scrollyPhase === step ? 'w-8 bg-white' : 'w-2 bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Text description per phase */}
              <div className="space-y-6">
                {scrollyPhase === 0 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#E8344A] px-2.5 py-1 rounded bg-[#E8344A]/10 inline-block">
                      Fas 01 · Skörd i säsong
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Endast 100% solmogen frukt
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Frukten plockas när den är som sötast och fullproppad med naturliga vitaminer. Inga omogna frukter, inga artificiella mognadsgaser.
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-white/80 pt-2">
                      <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">Vattenhalt: ~90%</span>
                      <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">Temperatur: +24°C</span>
                    </div>
                  </div>
                )}

                {scrollyPhase === 1 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
                    <span className="text-xs font-bold uppercase tracking-widest text-sky-400 px-2.5 py-1 rounded bg-sky-500/10 inline-block">
                      Fas 02 · Chockfrysning
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Cellstrukturen låses fast vid -40°C
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Till skillnad från vanlig värmetorkning (ugn) förstör vi inte vitaminerna eller cellväggarna. Frukten fryses blixtsnabbt för att bevara sin ursprungliga form och näring.
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-white/80 pt-2">
                      <span className="px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300">Temperatur: -40°C</span>
                      <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">Cellstatus: 100% intakt</span>
                    </div>
                  </div>
                )}

                {scrollyPhase === 2 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400 px-2.5 py-1 rounded bg-amber-500/10 inline-block">
                      Fas 03 · Vakuumkammare
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Vattnet dunstar direkt från is till ånga
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Under extremt vakuum sker sublimering: iskristallerna förvandlas direkt till ånga utan att smälta till vätska. Resultatet? All färg, doft och 98% av vitaminerna är orörda.
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-white/80 pt-2">
                      <span className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300">Vatten avlägsnat: 98%</span>
                      <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">Tryck: 0.1 mbar</span>
                    </div>
                  </div>
                )}

                {scrollyPhase === 3 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 px-2.5 py-1 rounded bg-emerald-500/10 inline-block">
                      Fas 04 · Slutresultat
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      15g ren, frasig supercrunch
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      En 15-gramspåse innehåller näring och smak från ~150g färsk frukt. Helt kladdfri, väger ingenting i skolväskan och smälter magiskt i munnen.
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-white/80 pt-2">
                      <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">0% Tillsatt socker</span>
                      <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">100% Återvinningsbar</span>
                    </div>
                  </div>
                )}

                {/* Next / Previous step buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setScrollyPhase((prev) => (prev > 0 ? prev - 1 : 3))}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    ← Föregående
                  </button>
                  <button
                    onClick={() => setScrollyPhase((prev) => (prev < 3 ? prev + 1 : 0))}
                    className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-white/90 transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{scrollyPhase === 3 ? 'Börja om' : 'Nästa steg'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
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
            Klicka på den frystorkade frukten för att utlösa en Anime.js partikelsmäll och testa crunchens krispighet.
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

          {/* Real Freeze-Dried Fruit Interactive Button */}
          <div className="my-8 flex justify-center">
            <button
              onClick={triggerCrunchExplosion}
              className="group relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/15 transition-all duration-300 active:scale-95 focus:outline-none cursor-pointer shadow-2xl backdrop-blur-md"
              title="Klicka för att crunsha!"
            >
              <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 relative group-hover:scale-105 transition-transform duration-300 bg-black/40">
                <img
                  src={`${base}${activeFruit.image}`}
                  alt={activeFruit.name}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                  {activeFruit.name} · {activeFruit.crunches}
                </span>
              </div>
              <span className="mt-4 bg-[#E8344A] hover:bg-[#D02036] text-white text-xs font-bold px-5 py-2 rounded-full shadow-lg flex items-center gap-2 tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" /> KLICKA FÖR ATT CRUNSHA!
              </span>
            </button>
          </div>

          <div className="text-xs text-white/50 mt-4">
            Du har crunshat <strong className="text-white">{crunchCount}</strong> gånger!
          </div>

          {/* Fruit selector with real thumbnails */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8 pt-6 border-t border-white/10">
            {FRUITS_KINETIC.map((fruit) => (
              <button
                key={fruit.id}
                onClick={() => switchFruit(fruit)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeFruit.id === fruit.id
                    ? 'bg-white text-black shadow-lg scale-105'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <img
                  src={`${base}${fruit.image}`}
                  alt={fruit.nameShort}
                  className="w-5 h-5 rounded-full object-cover border border-white/20"
                />
                <span>{fruit.nameShort}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 4: Interactive Flavor Showcase (Real Photography) ─── */}
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
              className="fruit-stage-card bg-white/[0.04] border border-white/10 hover:border-white/20 rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Real Freeze-Dried Fruit Photograph Header */}
                <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 relative border border-white/10 group-hover:border-white/25 transition-all bg-black/40">
                  <img
                    src={`${base}${fruit.image}`}
                    alt={fruit.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] px-2.5 py-0.5 rounded-full">
                    {fruit.temp}
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 bg-[#E8344A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-md">
                    100% Frystorkad Frukt
                  </div>
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
                  className="bg-white/10 hover:bg-white text-white hover:text-black font-semibold text-xs px-4 py-2.5 rounded-full transition-all duration-200 active:scale-95 flex items-center gap-1.5 shadow-sm cursor-pointer"
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
                <div className="flex -space-x-2 overflow-hidden py-1">
                  {FRUITS_KINETIC.map((fruit) => (
                    <img
                      key={fruit.id}
                      src={`${base}${fruit.image}`}
                      alt={fruit.nameShort}
                      className="inline-block h-9 w-9 rounded-full ring-2 ring-[#11161B] object-cover"
                    />
                  ))}
                </div>
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
          <div className="flex items-center gap-2">
            <img
              src={`${base}images/logo-white.png`}
              alt="Fruita Logo"
              className="h-7 w-auto object-contain"
            />
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10 uppercase tracking-widest">
              Kinetic
            </span>
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
