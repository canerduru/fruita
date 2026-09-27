import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../data/products';

/* ─── Fruita color map per fruit ─── */
const FRUIT_COLORS: Record<string, { bg: string; accent: string; text: string; light: string }> = {
  'fruita-jordgubbe': { bg: '#E8344A', accent: '#FF6B7A', text: '#fff', light: '#FFF0F2' },
  'fruita-banan':     { bg: '#F5B731', accent: '#FFD166', text: '#fff', light: '#FFFAE0' },
  'fruita-apple':     { bg: '#6DBF4F', accent: '#9FD97F', text: '#fff', light: '#F0FAE8' },
  'fruita-hallon':    { bg: '#D4317A', accent: '#F069AA', text: '#fff', light: '#FFF0F8' },
  'fruita-bjornbar':  { bg: '#6A3CB5', accent: '#9B72D8', text: '#fff', light: '#F5F0FF' },
  'fruita-mango':     { bg: '#F07E1A', accent: '#FFA94D', text: '#fff', light: '#FFF8EE' },
  'fruita-skolbox':   { bg: '#2D7D46', accent: '#4CAF6A', text: '#fff', light: '#EAF5EC' },
  'fruita-bar-trio':  { bg: '#C2245C', accent: '#E85D8E', text: '#fff', light: '#FFE8F2' },
};

/* ─── Floating particle emoji per fruit ─── */
const FRUIT_EMOJIS: Record<string, string[]> = {
  'fruita-jordgubbe': ['🍓', '🍓', '✨', '🍓'],
  'fruita-banan':     ['🍌', '🍌', '⚡', '🍌'],
  'fruita-apple':     ['🍏', '🍎', '🌿', '🍏'],
  'fruita-hallon':    ['🫐', '🍓', '💫', '🫐'],
  'fruita-bjornbar':  ['🫐', '🟣', '✨', '🫐'],
  'fruita-mango':     ['🥭', '🌟', '☀️', '🥭'],
  'fruita-skolbox':   ['🎒', '🌈', '⭐', '🎒'],
  'fruita-bar-trio':  ['🍓', '🫐', '❤️', '🍓'],
};

const SINGLES = PRODUCTS.filter(p => !['fruita-skolbox', 'fruita-bar-trio'].includes(p.id));
const ALL_PRODUCTS = PRODUCTS;

/* ─── FloatingParticle ─── */
function FloatingParticle({ emoji, style }: { emoji: string; style: React.CSSProperties }) {
  return (
    <span
      className="absolute select-none pointer-events-none text-3xl md:text-4xl"
      style={{ ...style, animation: 'floatBounce 4s ease-in-out infinite' }}
    >
      {emoji}
    </span>
  );
}

/* ─── Main Component ─── */
export default function VariantB() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [heroProduct, setHeroProduct] = useState(SINGLES[0]);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<{ id: string; name: string; price: number; qty: number }[]>([]);
  const [showCart, setShowCart] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  /* Auto-rotate hero */
  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx(prev => {
        const next = (prev + 1) % SINGLES.length;
        setHeroProduct(SINGLES[next]);
        return next;
      });
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCartCount(c => c + 1);
    setCartItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, name: product.name.en, price: product.price, qty: 1 }];
    });
  };

  const colors = FRUIT_COLORS[heroProduct.id] || FRUIT_COLORS['fruita-jordgubbe'];
  const emojis = FRUIT_EMOJIS[heroProduct.id] || ['🍓', '🍓', '✨', '🍓'];

  /* ─── Ticker text ─── */
  const tickerText = '🌿 100% PURE FRUIT · ⚡ ZERO ADDED SUGAR · 🎒 PERFECT SCHOOL SNACK · 🔥 FREEZE-DRIED TO PERFECTION · ✅ 1 INGREDIENT ONLY · ';

  return (
    <div className="vb-root" style={{ fontFamily: "var(--font-body)", background: '#FDF8F4', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ─── CSS Keyframes ─── */}
      <style>{`
        /* ── Font Stack ────────────────────────────────────────────────────
         * Display  → Bebas Neue   : condensed, bold, zero-noise headlines
         * Body     → DM Sans      : geometric, neutral, excellent legibility
         * Logo     → Fredoka One  : rounded badge only — strictly limited
         * ──────────────────────────────────────────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400;1,9..40,700&family=Fredoka+One&display=swap');

        /* ── Type Scale (rem) ───────────────────────────────────────────────
         * --ts-2xs : 0.625rem  /  10px
         * --ts-xs  : 0.75rem   /  12px
         * --ts-sm  : 0.875rem  /  14px
         * --ts-base: 1rem      /  16px
         * --ts-lg  : 1.125rem  /  18px
         * --ts-xl  : 1.25rem   /  20px
         * --ts-2xl : 1.5rem    /  24px
         * --ts-d1  : clamp(2.5rem,5vw,4rem)   display headings (Bebas)
         * --ts-d2  : clamp(3.5rem,7vw,6rem)   hero titles    (Bebas)
         * ──────────────────────────────────────────────────────────────── */
        :root {
          --font-display: 'Bebas Neue', 'Impact', sans-serif;
          --font-body:    'DM Sans', system-ui, sans-serif;
          --font-logo:    'Fredoka One', 'DM Sans', sans-serif;

          --lh-display: 0.95;    /* tight — display sizes optically correct */
          --lh-heading: 1.15;
          --lh-body:    1.65;    /* comfortable for DM Sans at small sizes   */
          --lh-ui:      1.2;     /* labels, badges, nav                      */

          --ls-display: 0.02em;  /* slight tracking for Bebas Neue           */
          --ls-ui:      0.06em;  /* uppercase labels                         */
          --ls-body:    0;       /* DM Sans needs zero tracking              */
        }

        @keyframes floatBounce {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50%       { transform: translateY(-18px) rotate(5deg); }
        }
        @keyframes floatBounce2 {
          0%, 100% { transform: translateY(0px) rotate(8deg); }
          50%       { transform: translateY(-22px) rotate(-4deg); }
        }
        @keyframes floatBounce3 {
          0%, 100% { transform: translateY(-5px) rotate(0deg); }
          50%       { transform: translateY(10px) rotate(10deg); }
        }
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes heroFade {
          0%   { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInLeft {
          0%   { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.7); }
          70%  { transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* ── Utility classes ──────────────────────────────────────────────── */
        .diagonal-clip     { clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%); }
        .diagonal-clip-rev { clip-path: polygon(0 0, 100% 8%, 100% 100%, 0 100%); }

        .product-card { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .product-card:hover { transform: translateY(-8px) scale(1.02); }

        .hero-text        { animation: slideInLeft 0.6s ease both; }
        .hero-product-img { animation: heroFade    0.5s ease both; }

        .add-btn { transition: all 0.2s ease; }
        .add-btn:hover { transform: scale(1.05); }

        .ticker-track { animation: tickerScroll 22s linear infinite; white-space: nowrap; }

        /* ── Global resets for this variant ──────────────────────────────── */
        .vb-root * { box-sizing: border-box; }
        .vb-root { font-family: var(--font-body); }
        .vb-display { font-family: var(--font-display); letter-spacing: var(--ls-display); line-height: var(--lh-display); }
        .vb-label   { font-family: var(--font-body); letter-spacing: var(--ls-ui); text-transform: uppercase; font-weight: 700; }
      `}</style>

      {/* ─── HEADER ─── */}
      <header style={{ background: '#fff', borderBottom: '3px solid #111', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src={`${import.meta.env.BASE_URL}images/logo.png`}
              alt="Fruita Logo"
              style={{ height: 40, width: 'auto', objectFit: 'contain' }}
            />
            <span style={{
              fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500,
              color: '#666', letterSpacing: '0.01em', fontStyle: 'italic'
            }}>· Något annorlunda</span>
          </div>

          {/* Nav */}
          {/* Nav: DM Sans, uppercase label style — NOT display font */}
          <nav style={{
            display: 'flex', gap: 28,
            fontFamily: "var(--font-body)", fontWeight: 600,
            fontSize: 13, letterSpacing: '0.07em', textTransform: 'uppercase'
          }}>
            {['Products', 'About', 'Stores', 'FAQ'].map(item => (
              <a key={item} href="#" style={{ color: '#111', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E8344A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#111')}>
                {item}
              </a>
            ))}
          </nav>

          {/* Cart */}
          <button onClick={() => setShowCart(!showCart)} style={{
            background: '#111', color: '#fff', border: 'none', borderRadius: 50,
            width: 44, height: 44, cursor: 'pointer', fontWeight: 900, fontSize: 15,
            position: 'relative', transition: 'background 0.2s'
          }}>
            🛒
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -6,
                background: '#E8344A', color: '#fff', borderRadius: 50,
                width: 20, height: 20, fontSize: 11, fontWeight: 900,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #fff'
              }}>{cartCount}</span>
            )}
          </button>
        </div>

        {/* Mini cart dropdown */}
        {showCart && (
          <div style={{
            position: 'absolute', top: 67, right: 20, background: '#fff',
            border: '3px solid #111', borderRadius: 16, padding: 20, width: 320,
            boxShadow: '6px 6px 0 #111', zIndex: 200
          }}>
            <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 15, marginBottom: 14, letterSpacing: '-0.01em' }}>🛒 Cart ({cartCount})</div>
            {cartItems.length === 0 ? <p style={{ color: '#888', fontSize: 13 }}>Your cart is empty!</p> : (
              <>
                {cartItems.map(i => (
                  <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee', fontSize: 13 }}>
                    <span style={{ fontWeight: 700 }}>{i.name} x{i.qty}</span>
                    <span style={{ fontWeight: 800, color: '#E8344A' }}>{i.price * i.qty} kr</span>
                  </div>
                ))}
                <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: 15 }}>
                  <span>Total</span>
                  <span style={{ color: '#E8344A' }}>{cartItems.reduce((s, i) => s + i.price * i.qty, 0)} kr</span>
                </div>
                <button style={{
                  marginTop: 14, width: '100%', background: '#111', color: '#fff',
                  border: 'none', borderRadius: 12, padding: '12px 0', fontWeight: 900,
                  fontSize: 14, cursor: 'pointer', letterSpacing: 1
                }}>CHECKOUT →</button>
              </>
            )}
          </div>
        )}
      </header>

      {/* ─── TICKER ─── */}
      <div style={{ background: '#111', color: '#fff', padding: '10px 0', overflow: 'hidden' }}>
        <div className="ticker-track" style={{
          display: 'inline-block', fontFamily: "var(--font-body)",
          fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase'
        }}>
          {tickerText.repeat(6)}
        </div>
      </div>

      {/* ─── HERO ─── */}
      <section style={{
        background: colors.bg,
        minHeight: '88vh',
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: 100,
        transition: 'background 0.6s ease'
      }} className="diagonal-clip">

        {/* Background circles */}
        <div style={{
          position: 'absolute', top: '10%', right: '5%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          animation: 'floatBounce2 6s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', left: '3%',
          width: 250, height: 250, borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          animation: 'floatBounce3 5s ease-in-out infinite'
        }} />

        {/* Floating emojis */}
        <FloatingParticle emoji={emojis[0]} style={{ top: '15%', left: '8%', animationDelay: '0s', fontSize: 48 }} />
        <FloatingParticle emoji={emojis[1]} style={{ top: '60%', left: '5%', animationDelay: '0.8s', fontSize: 36 }} />
        <FloatingParticle emoji={emojis[2]} style={{ top: '20%', right: '8%', animationDelay: '0.4s', fontSize: 42, animation: 'floatBounce2 3.5s ease-in-out infinite' }} />
        <FloatingParticle emoji={emojis[3]} style={{ bottom: '25%', right: '12%', animationDelay: '1.2s', fontSize: 54 }} />
        <FloatingParticle emoji={emojis[0]} style={{ top: '45%', right: '22%', animationDelay: '2s', fontSize: 28, animation: 'floatBounce3 4.5s ease-in-out infinite' }} />

        {/* Content */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 20px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', position: 'relative', zIndex: 10 }}>

          {/* Left: Text */}
          <div className="hero-text" key={heroProduct.id + '-text'}>
            <div style={{
              display: 'inline-block', background: '#fff', color: colors.bg,
              fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 11,
              padding: '6px 16px', borderRadius: 50, letterSpacing: '0.08em',
              textTransform: 'uppercase', marginBottom: 20,
              border: '2px solid rgba(0,0,0,0.15)', boxShadow: '3px 3px 0 rgba(0,0,0,0.15)'
            }}>
              ⭐ NEW ARRIVAL
            </div>

            {/* Hero H1: Bebas Neue — max impact, zero weight noise */}
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(64px, 9vw, 108px)',
              color: '#fff', lineHeight: 0.92,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              textShadow: '4px 4px 0 rgba(0,0,0,0.18)',
              margin: '0 0 10px'
            }}>
              {heroProduct.name.en.replace('Fruita ', '')}!
            </h1>

            {/* Subtitle tag: Bebas Neue at smaller size — still in display family */}
            <div style={{
              background: 'rgba(0,0,0,0.18)', borderRadius: 10,
              display: 'inline-block', padding: '6px 16px', marginBottom: 22
            }}>
              <span style={{
                fontFamily: "var(--font-display)", color: '#fff',
                fontSize: 20, letterSpacing: '0.06em'
              }}>
                FREEZE-DRIED SNACK
              </span>
            </div>

            {/* Body copy: DM Sans 400 — no bold, no caps, max legibility */}
            <p style={{
              fontFamily: "var(--font-body)", color: 'rgba(255,255,255,0.88)',
              fontSize: 15, lineHeight: 1.7, fontWeight: 400, maxWidth: 420, marginBottom: 32
            }}>
              {heroProduct.description.en}
            </p>

            {/* Claims */}
            {/* Claim pills: DM Sans 600 uppercase label */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
              {['No added sugar', '1 ingredient', 'KRAV certified', '100% pure fruit'].map(c => (
                <span key={c} style={{
                  fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 11,
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                  background: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.95)',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  borderRadius: 50, padding: '5px 13px',
                  backdropFilter: 'blur(4px)'
                }}>✓ {c}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <button
                className="add-btn"
                onClick={() => addToCart(heroProduct)}
                style={{
                  fontFamily: "var(--font-display)", letterSpacing: '0.06em',
                  background: '#fff', color: colors.bg, border: '3px solid rgba(0,0,0,0.15)',
                  borderRadius: 16, padding: '16px 36px', fontSize: 20,
                  cursor: 'pointer', textTransform: 'uppercase',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.2)'
                }}>
                ADD TO CART – {heroProduct.price} kr
              </button>
              <div style={{ fontFamily: "var(--font-body)", color: '#fff', fontWeight: 500, fontSize: 13, opacity: 0.8 }}>
                ⭐ {heroProduct.rating} <span style={{ opacity: 0.65 }}>({heroProduct.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Right: Product visual */}
          <div className="hero-product-img" key={heroProduct.id + '-img'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            {/* Circle podium */}
            <div style={{
              width: 340, height: 340, borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', border: '3px solid rgba(255,255,255,0.25)'
            }}>
              <div style={{
                width: 280, height: 280, borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column'
              }}>
                {/* Real pouch product visual */}
                <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={heroProduct.image}
                    alt={heroProduct.name.en}
                    style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))' }}
                  />
                </div>
                <div style={{
                  background: '#fff', color: colors.bg, fontFamily: "'Fredoka One', sans-serif",
                  fontWeight: 900, fontSize: 15, padding: '6px 18px', borderRadius: 50,
                  marginTop: 8, border: '2px solid rgba(0,0,0,0.1)',
                  boxShadow: '3px 3px 0 rgba(0,0,0,0.1)'
                }}>{heroProduct.price} kr · 15g</div>
              </div>
            </div>

            {/* Badge */}
            <div style={{
              position: 'absolute', top: -10, right: 30,
              background: '#FFD700', color: '#111',
              borderRadius: '50%', width: 80, height: 80,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', fontWeight: 900, fontSize: 10,
              border: '3px solid #111', boxShadow: '3px 3px 0 #111',
              textAlign: 'center', lineHeight: 1.2, letterSpacing: 0.5,
              animation: 'popIn 0.5s ease both'
            }}>
              <span style={{ fontSize: 20 }}>⭐</span>
              <span style={{ textTransform: 'uppercase', fontSize: 9 }}>{heroProduct.badge.en}</span>
            </div>
          </div>
        </div>

        {/* Flavor selector dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)' }}>
          {SINGLES.map((p, i) => (
            <button key={p.id} onClick={() => { setActiveIdx(i); setHeroProduct(p); }}
              style={{
                width: i === activeIdx ? 32 : 12, height: 12,
                borderRadius: 6, background: i === activeIdx ? '#fff' : 'rgba(255,255,255,0.4)',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0
              }} />
          ))}
        </div>
      </section>

      {/* ─── PRODUCTS SECTION ─── */}
      <section style={{ background: colors.bg, paddingBottom: 0, transition: 'background 0.6s' }} className="diagonal-clip-rev">
        <div style={{ background: '#FDF8F4', paddingTop: 80 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px 80px' }}>

            {/* Section header */}
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              {/* Section header: Bebas Neue — same display family as hero */}
              <div style={{
                display: 'inline-block', background: '#E8344A', color: '#fff',
                fontFamily: "var(--font-display)",
                fontSize: 'clamp(40px, 6vw, 68px)', letterSpacing: '0.04em',
                padding: '10px 40px',
                borderRadius: 20, border: '3px solid #111', boxShadow: '6px 6px 0 #111',
                textTransform: 'uppercase', transform: 'rotate(-1deg)'
              }}>
                PRODUCTS
              </div>
              <p style={{ fontFamily: "var(--font-body)", color: '#777', fontWeight: 400, fontSize: 15, marginTop: 18, lineHeight: 1.6 }}>
                100% pure freeze-dried fruit · Zero additives · Kids love them
              </p>
            </div>

            {/* Product grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {ALL_PRODUCTS.map(product => {
                const pc = FRUIT_COLORS[product.id] || FRUIT_COLORS['fruita-jordgubbe'];
                const pe = FRUIT_EMOJIS[product.id] || ['🍓'];
                return (
                  <div key={product.id} className="product-card" style={{
                    background: pc.light, borderRadius: 24, overflow: 'hidden',
                    border: '3px solid #111', boxShadow: '6px 6px 0 #111', cursor: 'pointer'
                  }}>
                    <div style={{ background: pc.bg, padding: '32px 20px 20px', position: 'relative', textAlign: 'center', minHeight: 180 }}>
                      {product.badge && (
                        <div style={{
                          position: 'absolute', top: 12, left: 12,
                          background: '#FFD700', color: '#111', borderRadius: 50,
                          padding: '4px 10px',
                          fontFamily: "var(--font-body)", fontSize: 9, fontWeight: 700,
                          letterSpacing: '0.06em', textTransform: 'uppercase',
                          border: '2px solid #111'
                        }}>{product.badge.en}</div>
                      )}
                      {product.originalPrice && (
                        <div style={{
                          position: 'absolute', top: 12, right: 12,
                          background: '#E8344A', color: '#fff', borderRadius: 50,
                          padding: '4px 10px',
                          fontFamily: "var(--font-body)", fontSize: 9, fontWeight: 700,
                          letterSpacing: '0.06em', textTransform: 'uppercase',
                          border: '2px solid #111'
                        }}>SALE</div>
                      )}
                      <div style={{ height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                          src={product.image}
                          alt={product.name.en}
                          style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }}
                        />
                      </div>
                    </div>

                    <div style={{ padding: 20 }}>
                      {/* Card title: Bebas Neue — visual rhythm matches hero */}
                      <h3 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 26, letterSpacing: '0.03em', color: '#111',
                        margin: '0 0 4px', textTransform: 'uppercase', lineHeight: 1
                      }}>{product.name.en}</h3>
                      <p style={{
                        fontFamily: "var(--font-body)", color: '#666',
                        fontSize: 13, fontWeight: 400, margin: '0 0 14px', lineHeight: 1.55
                      }}>
                        {product.cleanLabelClaim.en}
                      </p>

                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                        {['0% sugar', '1 ingredient'].map(tag => (
                          <span key={tag} style={{
                            fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 10,
                            letterSpacing: '0.05em', textTransform: 'uppercase',
                            background: '#111', color: '#fff', borderRadius: 50, padding: '3px 10px'
                          }}>{tag}</span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          {/* Price: Bebas Neue — numerics look best in display */}
                          <span style={{ fontFamily: "var(--font-display)", fontSize: 28, color: '#111', letterSpacing: '0.02em' }}>
                            {product.price} kr
                          </span>
                          {product.originalPrice && (
                            <span style={{
                              fontFamily: "var(--font-body)", fontSize: 12,
                              color: '#aaa', textDecoration: 'line-through', marginLeft: 6
                            }}>
                              {product.originalPrice} kr
                            </span>
                          )}
                        </div>
                        <button
                          className="add-btn"
                          onClick={() => addToCart(product)}
                          style={{
                            fontFamily: "var(--font-body)", fontWeight: 700,
                            fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase',
                            background: pc.bg, color: '#fff', border: '2px solid #111',
                            borderRadius: 12, padding: '10px 16px', cursor: 'pointer',
                            boxShadow: '3px 3px 0 #111'
                          }}>
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── INGREDIENTS SECTION (Farsking "Innehåller" style) ─── */}
      <section style={{ background: '#FFF5E8', padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* Left: Checklist */}
          <div>
            <div style={{ marginBottom: 28 }}>
              {/* Logo inline: Fredoka One permitted here as brand element */}
              <div style={{
                display: 'inline-block', background: '#fff', border: '3px solid #111',
                boxShadow: '4px 4px 0 #111', padding: '5px 18px', borderRadius: 10,
                fontFamily: "var(--font-logo)", fontSize: 18,
                color: '#E8344A', marginBottom: 6
              }}>FRUITA</div>
              {/* Section heading: Bebas Neue */}
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: 'clamp(40px, 5vw, 62px)', letterSpacing: '0.03em', color: '#111',
                textTransform: 'uppercase', lineHeight: 0.95, margin: 0
              }}>CONTAINS</h2>
            </div>

            {[
              { icon: '✅', text: 'Zero added sugar', sub: 'Only the fruit\'s natural sweetness' },
              { icon: '✅', text: '1 single ingredient', sub: '100% pure fruit — nothing else' },
              { icon: '✅', text: 'High in fiber', sub: 'Natural dietary fiber from real fruit' },
              { icon: '✅', text: 'KRAV certified organic', sub: 'Sourced directly from eco-farms' },
              { icon: '✅', text: 'Vitamins preserved', sub: '98% of vitamin C retained after freeze-drying' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                padding: '14px 0', borderBottom: i < 4 ? '2px solid #F0E0D0' : 'none'
              }}>
                <span style={{ fontSize: 22, marginTop: 2 }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16, color: '#111', lineHeight: 1.3 }}>{item.text}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: '#888', fontWeight: 400, marginTop: 3, lineHeight: 1.5 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Big visual */}
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{
              width: 320, height: 320, borderRadius: '50%',
              background: '#E8344A', border: '4px solid #111',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto', boxShadow: '8px 8px 0 #111', position: 'relative'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 100 }}>🍓</div>
                {/* Big stat: Bebas Neue */}
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 52, color: '#fff', lineHeight: 0.9,
                  letterSpacing: '0.02em',
                  textShadow: '3px 3px 0 rgba(0,0,0,0.25)'
                }}>100%</div>
                <div style={{
                  fontFamily: "var(--font-body)", color: 'rgba(255,255,255,0.88)',
                  fontWeight: 600, fontSize: 13, letterSpacing: '0.1em', marginTop: 4,
                  textTransform: 'uppercase'
                }}>PURE FRUIT</div>
              </div>
            </div>
            {/* Floating labels */}
            <div style={{
              position: 'absolute', top: 20, right: -20, background: '#FFD700',
              border: '3px solid #111', borderRadius: 12, padding: '8px 14px',
              fontFamily: "var(--font-display)", fontSize: 16, letterSpacing: '0.04em',
              boxShadow: '3px 3px 0 #111', transform: 'rotate(8deg)'
            }}>NO ADDITIVES</div>
            <div style={{
              position: 'absolute', bottom: 30, left: -20, background: '#6DBF4F',
              color: '#fff', border: '3px solid #111', borderRadius: 12, padding: '8px 14px',
              fontFamily: "var(--font-display)", fontSize: 16, letterSpacing: '0.04em',
              boxShadow: '3px 3px 0 #111', transform: 'rotate(-6deg)'
            }}>ORGANIC ✓</div>
          </div>
        </div>
      </section>

      {/* ─── FLAVORS CAROUSEL ─── */}
      <section style={{ background: '#E8344A', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: 48, position: 'relative', zIndex: 2 }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: 'clamp(44px, 6vw, 76px)', letterSpacing: '0.04em', color: '#fff',
            textTransform: 'uppercase', textShadow: '4px 4px 0 rgba(0,0,0,0.25)',
            lineHeight: 0.95, margin: 0
          }}>PICK YOUR FLAVOR!</h2>
        </div>

        <div ref={carouselRef} style={{
          display: 'flex', gap: 24, padding: '0 40px',
          overflowX: 'auto', scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none', paddingBottom: 20
        }}>
          {SINGLES.map((product, i) => {
            const pc = FRUIT_COLORS[product.id] || FRUIT_COLORS['fruita-jordgubbe'];
            const pe = FRUIT_EMOJIS[product.id] || ['🍓'];
            return (
              <div key={product.id} className="product-card" style={{
                flex: '0 0 260px', scrollSnapAlign: 'start',
                background: pc.light, borderRadius: 24, overflow: 'hidden',
                border: '3px solid rgba(0,0,0,0.2)', boxShadow: '6px 6px 0 rgba(0,0,0,0.2)'
              }}>
                <div style={{ background: pc.bg, padding: '28px 20px', textAlign: 'center', position: 'relative' }}>
                  <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                    <img
                      src={product.image}
                      alt={product.name.en}
                      style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }}
                    />
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    color: '#fff', fontSize: 24, letterSpacing: '0.03em',
                    textTransform: 'uppercase', lineHeight: 1,
                    margin: 0, textShadow: '2px 2px 0 rgba(0,0,0,0.2)'
                  }}>{product.name.en.replace('Fruita ', '')}</h3>
                </div>
                <div style={{ padding: 18 }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 400, color: '#777', margin: '0 0 14px', lineHeight: 1.5 }}>{product.cleanLabelClaim.en}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: '0.02em', color: '#111' }}>{product.price} kr</span>
                    <button onClick={() => addToCart(product)} style={{
                      fontFamily: "var(--font-body)", fontWeight: 700,
                      fontSize: 10, letterSpacing: '0.07em', textTransform: 'uppercase',
                      background: pc.bg, color: '#fff', border: '2px solid rgba(0,0,0,0.2)',
                      borderRadius: 10, padding: '8px 14px', cursor: 'pointer'
                    }}>+ Cart</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── WHY FREEZE-DRIED ─── */}
      <section style={{ background: '#1A2C22', padding: '90px 20px', color: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '0.04em',
              textTransform: 'uppercase', lineHeight: 0.95,
              margin: '0 0 16px'
            }}>WHY FREEZE-DRIED?</h2>
            <p style={{ fontFamily: "var(--font-body)", color: 'rgba(255,255,255,0.6)', fontWeight: 400, fontSize: 15, lineHeight: 1.6 }}>
              The science behind the crunch
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {[
              { emoji: '🌡️', title: '−50°C Flash Freeze', text: 'Fruit is frozen instantly at extreme cold to lock in all nutrients and flavor.' },
              { emoji: '💨', title: 'Vacuum Sublimation', text: 'Ice turns directly to vapor under vacuum — zero heat damage, zero liquid.' },
              { emoji: '⚡', title: '98% Vitamins Kept', text: 'Unlike dehydration, freeze-drying preserves vitamin C, minerals, and color.' },
              { emoji: '🔒', title: '2-Year Shelf Life', text: 'No preservatives needed — the process itself removes all moisture bacteria need.' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.06)', borderRadius: 20,
                padding: 28, border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{item.emoji}</div>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: '0.03em',
                  margin: '0 0 8px', color: '#6DBF4F', lineHeight: 1
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: "var(--font-body)", color: 'rgba(255,255,255,0.65)',
                  fontSize: 13, lineHeight: 1.65, fontWeight: 400, margin: 0
                }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ background: '#FFF5E8', padding: '80px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: '0.03em',
              textTransform: 'uppercase', lineHeight: 0.95, color: '#111', margin: 0
            }}>FAMILIES LOVE IT</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              { name: 'Anna K.', city: 'Stockholm', rating: 5, text: '"My kids refuse to eat regular fruit but go crazy for Fruita! Strawberry is the absolute favourite."', emoji: '🦊' },
              { name: 'Mikael L.', city: 'Gothenburg', rating: 5, text: '"Finally a school snack I can feel good about. No junk, no sugar — just real fruit."', emoji: '🐻' },
              { name: 'Sofia B.', city: 'Malmö', rating: 5, text: '"The banana one tastes like banana chips but without the oil. We order two boxes a month!"', emoji: '🐵' },
            ].map((t, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 20, padding: 28,
                border: '3px solid #111', boxShadow: '5px 5px 0 #111'
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{t.emoji}</div>
                <div style={{ color: '#E8344A', fontSize: 16, letterSpacing: '0.05em', marginBottom: 10 }}>{'★'.repeat(t.rating)}</div>
                <p style={{ fontFamily: "var(--font-body)", color: '#444', fontSize: 14, lineHeight: 1.7, fontWeight: 400, fontStyle: 'italic', margin: '0 0 16px' }}>{t.text}</p>
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13, color: '#111' }}>{t.name}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: '#999', fontWeight: 400 }}>{t.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section style={{ background: '#FFD700', padding: '80px 20px', textAlign: 'center', border: '0', borderTop: '4px solid #111' }}>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: 'clamp(40px, 6vw, 78px)', letterSpacing: '0.03em',
          textTransform: 'uppercase', lineHeight: 0.92, color: '#111',
          textShadow: '3px 3px 0 rgba(0,0,0,0.08)',
          margin: '0 0 16px'
        }}>READY TO SNACK SMARTER?</h2>
        <p style={{
          fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 17,
          color: '#444', margin: '0 0 36px', lineHeight: 1.6
        }}>
          Join 2,400+ Swedish families who've switched to real fruit snacks
        </p>
        <button style={{
          fontFamily: "var(--font-display)", letterSpacing: '0.06em',
          background: '#111', color: '#FFD700', border: '3px solid #111',
          borderRadius: 18, padding: '18px 52px', fontSize: 24,
          cursor: 'pointer', textTransform: 'uppercase',
          boxShadow: '6px 6px 0 rgba(0,0,0,0.2)', transition: 'all 0.2s ease'
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          SHOP NOW →
        </button>
        <p style={{ fontFamily: "var(--font-body)", marginTop: 20, fontSize: 13, fontWeight: 400, color: '#666', letterSpacing: '0.01em' }}>
          🚚 Free shipping over 299 kr · 🔒 Secure checkout · ↩️ 30-day returns
        </p>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: '#111', color: '#fff', padding: '48px 20px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 40 }}>
            <div>
              <img
                src={`${import.meta.env.BASE_URL}images/logo-white.png`}
                alt="Fruita Logo"
                style={{ height: 38, width: 'auto', objectFit: 'contain', marginBottom: 14 }}
              />
              <p style={{ fontFamily: "var(--font-body)", color: '#666', fontSize: 13, fontWeight: 400, lineHeight: 1.75 }}>
                Something Different.<br />100% real fruit,<br />freeze-dried to perfection.
              </p>
            </div>
            {[
              { title: 'Products', links: ['Strawberry', 'Banana', 'Apple', 'Raspberry', 'Blackberry', 'Mango'] },
              { title: 'Company', links: ['About Us', 'Sustainability', 'KRAV Certified', 'Our Farms'] },
              { title: 'Support', links: ['FAQ', 'Shipping', 'Returns', 'Contact'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 11, letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: 16, color: '#aaa' }}>
                  {col.title}
                </h4>
                {col.links.map(link => (
                  <div key={link} style={{ marginBottom: 8 }}>
                    <a href="#" style={{ color: '#888', fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#E8344A'}
                      onMouseLeave={e => e.currentTarget.style.color = '#888'}>
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: '#555', fontWeight: 400 }}>© 2025 Fruita AB · Something Different</span>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Privacy Policy', 'Terms', 'Cookie Settings'].map(l => (
                <a key={l} href="#" style={{ fontFamily: "var(--font-body)", color: '#555', fontSize: 12, fontWeight: 400, textDecoration: 'none' }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
