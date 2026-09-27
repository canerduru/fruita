import React, { useState } from 'react';
import {
  Leaf,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Check,
  RotateCcw,
  Info,
  Heart,
  Package,
  Award,
  ChevronRight,
  Smartphone,
  Truck,
  Sun,
  Wind,
  Plus,
  Minus,
  X
} from 'lucide-react';
import { PRODUCTS } from '../data/products';

// ─── Fruit data for Variant C ───
const PURE_FRUITS = [
  {
    id: 'fruita-jordgubbe',
    name: 'Fruita Jordgubbe',
    nameEn: 'Strawberry',
    color: '#D9534F',
    bgSoft: '#FDF2F0',
    tag: '100% Ekologiska Jordgubbar',
    freshWeight: '150g',
    fiber: '2.1g',
    kcal: '48 kcal',
    vitamins: '98% C-vitamin bevarat',
    desc: 'Handplockade solmogna jordgubbar, skonsamt frystorkade inom 4 timmar efter skörd.',
    image: 'images/products/jordgubbe.jpg',
    pouchImage: 'images/products/jordgubbe.png',
    toddlerBenefit: 'Perfekt frasig bitstorlek — tränar pincettgreppet utan röda fläckar.',
  },
  {
    id: 'fruita-banan',
    name: 'Fruita Banan',
    nameEn: 'Banana',
    color: '#D4A017',
    bgSoft: '#FEF9E7',
    tag: '100% Solmogen Banan',
    freshWeight: '160g',
    fiber: '2.4g',
    kcal: '52 kcal',
    vitamins: 'Rik på kalium & B6',
    desc: 'Naturligt söta bananmynt med mild karamellig ton. Inget kladd, ingen brun frukt.',
    image: 'images/products/banan.jpg',
    pouchImage: 'images/products/banan.png',
    toddlerBenefit: 'Smälter lent på tungan — perfekt som första självständiga mellanmål.',
  },
  {
    id: 'fruita-apple',
    name: 'Fruita Grönt Äpple',
    nameEn: 'Green Apple',
    color: '#6B8E23',
    bgSoft: '#F4F7EB',
    tag: '100% Krispiga Äppelklyftor',
    freshWeight: '140g',
    fiber: '2.8g',
    kcal: '44 kcal',
    vitamins: 'Hög pektinhalt & C-vitamin',
    desc: 'Friskt syrligt äpple med ett oemotståndligt knaster. Perfekt fika-topping.',
    image: 'images/products/apple.png',
    pouchImage: 'images/products/apple.png',
    toddlerBenefit: 'Superkrispig textur som inte fastnar i tänderna som torkade russin.',
  },
  {
    id: 'fruita-hallon',
    name: 'Fruita Vilda Hallon',
    nameEn: 'Raspberry',
    color: '#C71585',
    bgSoft: '#FDF0F6',
    tag: '100% Vilda Hallon',
    freshWeight: '155g',
    fiber: '3.2g',
    kcal: '46 kcal',
    vitamins: 'Maximal antioxidantprofil',
    desc: 'Luftiga bär med en uppiggande syrlig ton. En favorit i frukostskålen.',
    image: 'images/products/hallon.jpg',
    pouchImage: 'images/products/hallon.png',
    toddlerBenefit: '100% bärform bevarad — lär barn känna igen riktiga frukter.',
  },
  {
    id: 'fruita-bjornbar',
    name: 'Fruita Skogsbjörnbär',
    nameEn: 'Blackberry',
    color: '#5E3A8C',
    bgSoft: '#F4EFF9',
    tag: '100% Skogsbjörnbär',
    freshWeight: '145g',
    fiber: '3.5g',
    kcal: '45 kcal',
    vitamins: 'Rik på antocyaniner',
    desc: 'Djup skogssmak med knaprig krispighet och rik naturlig fruktsötma.',
    image: 'images/products/bjornbar.png',
    pouchImage: 'images/products/bjornbar.png',
    toddlerBenefit: 'Inget spill i bilbarnstolen eller barnvagnen — helt torr konsistens.',
  },
  {
    id: 'fruita-mango',
    name: 'Fruita Solmogen Mango',
    nameEn: 'Mango',
    color: '#D84900',
    bgSoft: '#FFF7EB',
    tag: '100% Tropisk Mango',
    freshWeight: '160g',
    fiber: '1.2g',
    kcal: '52 kcal',
    vitamins: 'Rik på A- & C-vitamin',
    desc: 'Gyllene mangoskivor från Medelhavet, naturligt söta och krispiga utan tillsatt socker.',
    image: 'images/products/mango.png',
    pouchImage: 'images/products/mango.png',
    toddlerBenefit: 'Tropisk sötma som ersätter lördagsgodis — älskad av både små och stora.',
  },
];

export default function VariantC() {
  const base = import.meta.env.BASE_URL;
  const [selectedFruit, setSelectedFruit] = useState(PURE_FRUITS[0]);
  const [ratioSlider, setRatioSlider] = useState(15); // 15g freeze dried vs 150g fresh
  const [cart, setCart] = useState<{ id: string; name: string; qty: number; price: number }[]>([]);
  const [isSwishModalOpen, setIsSwishModalOpen] = useState(false);
  const [swishPhone, setSwishPhone] = useState('');
  const [swishSuccess, setSwishSuccess] = useState(false);
  const [backpackItems, setBackpackItems] = useState<string[]>(['fruita-jordgubbe', 'fruita-banan']);
  const [activeTab, setActiveTab] = useState<'details' | 'nutrition' | 'allergen'>('details');

  const cartTotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (product: typeof PURE_FRUITS[0], qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { id: product.id, name: product.name, qty, price: 29 }];
    });
  };

  const toggleBackpackItem = (id: string) => {
    if (backpackItems.includes(id)) {
      setBackpackItems(backpackItems.filter((i) => i !== id));
    } else {
      if (backpackItems.length < 5) {
        setBackpackItems([...backpackItems, id]);
      }
    }
  };

  const addBackpackBundle = () => {
    backpackItems.forEach((id) => {
      const fruit = PURE_FRUITS.find((f) => f.id === id);
      if (fruit) addToCart(fruit, 1);
    });
  };

  const handleSwishPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!swishPhone) return;
    setSwishSuccess(true);
    setTimeout(() => {
      setCart([]);
      setIsSwishModalOpen(false);
      setSwishSuccess(false);
    }, 2500);
  };

  return (
    <div
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', Roboto, sans-serif",
        backgroundColor: '#FAF8F5',
        color: '#1F2A37',
        minHeight: '100vh',
        overflowX: 'hidden',
        letterSpacing: '-0.011em',
      }}
    >
      {/* Subtle organic linen/paper grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]"
        style={{
          backgroundImage:
            'radial-gradient(#1F2A37 0.75px, transparent 0.75px), radial-gradient(#1F2A37 0.75px, #FAF8F5 0.75px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
        }}
      />

      {/* ─── Apple-style Frosted Navbar ─── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(250, 248, 245, 0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={`${base}images/logo.png`}
              alt="Fruita Logo"
              className="h-9 w-auto object-contain"
            />
            <span className="text-[#3D6647] font-semibold text-xs px-2 py-0.5 rounded-full bg-[#3D6647]/10">pure</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#4B5563]">
            <a href="#hero" className="hover:text-[#1F2A37] transition-colors">Filosofi</a>
            <a href="#ratio" className="hover:text-[#1F2A37] transition-colors">10:1 Balansen</a>
            <a href="#products" className="hover:text-[#1F2A37] transition-colors">Sortiment</a>
            <a href="#backpack" className="hover:text-[#1F2A37] transition-colors">Skolväskan</a>
            <a href="#comparison" className="hover:text-[#1F2A37] transition-colors">Jämförelse</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSwishModalOpen(true)}
              className="relative flex items-center gap-2 bg-[#1F2A37] text-white hover:bg-[#2D3F52] text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-200 active:scale-95 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Varukorg</span>
              {cartItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#3D6647] text-white text-[11px] flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ─── Hero Section: Apple Keynote Style ─── */}
      <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Top Badge: "Bright but soft" aesthetic */}
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3D6647]/10 border border-[#3D6647]/20 text-[#3D6647] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Svensk standard för ren barnmat & mellanmål</span>
            </div>
          </div>

          {/* Headline & Subhead */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1F2A37] tracking-tight leading-[1.08] mb-6">
              Bara en ingrediens.
              <br />
              <span className="text-[#3D6647] italic font-serif font-normal">Inget annat.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#4B5563] leading-relaxed font-normal max-w-2xl mx-auto">
              100% ren solmogen frukt i en fjäderlätt 15g-påse. Skonsamt frystorkad för att bevara 98% av vitaminerna,
              den frasiga crunchen och naturens egna sötma.
            </p>

            {/* Quick value signals */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs md:text-sm font-semibold text-[#3D6647]">
              <span className="flex items-center gap-1.5 bg-[#FAF3EC] px-3 py-1 rounded-full text-[#9C5A37]">
                <Check className="w-3.5 h-3.5" /> 0% Tillsatt socker
              </span>
              <span className="flex items-center gap-1.5 bg-[#EEF4EF] px-3 py-1 rounded-full text-[#2D5A38]">
                <Check className="w-3.5 h-3.5" /> KRAV/EKO Standard
              </span>
              <span className="flex items-center gap-1.5 bg-[#F0F4F8] px-3 py-1 rounded-full text-[#2B4C6F]">
                <Check className="w-3.5 h-3.5" /> 100% Nötfri & Glutenfri
              </span>
            </div>
          </div>

          {/* Hero Visual Card: Floating Apple-Style Product Stage */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-xl border border-black/[0.06] rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left: Interactive Pouch Preview */}
                <div className="flex flex-col items-center justify-center relative">
                  <div
                    className="w-64 h-64 rounded-full flex items-center justify-center transition-all duration-700 relative"
                    style={{ backgroundColor: selectedFruit.bgSoft }}
                  >
                    {/* Concentric subtle rings */}
                    <div className="absolute inset-4 rounded-full border border-black/[0.04]" />
                    <div className="absolute inset-10 rounded-full border border-black/[0.04]" />

                    {/* Fruit image */}
                    <img
                      src={`${base}${selectedFruit.image}`}
                      alt={selectedFruit.name}
                      className="w-48 h-48 object-cover rounded-2xl shadow-lg transform transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  {/* 15g single portion indicator */}
                  <div className="mt-4 inline-flex items-center gap-2 bg-[#FAF8F5] border border-black/[0.08] px-3 py-1 rounded-full text-xs font-medium text-[#4B5563]">
                    <span className="w-2 h-2 rounded-full bg-[#3D6647]" />
                    <span>Nettovikt: 15 gram (1 handflata)</span>
                  </div>
                </div>

                {/* Right: Clean Label Specification */}
                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#3D6647] mb-1">
                      {selectedFruit.tag}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1F2A37]">
                      {selectedFruit.name}
                    </h2>
                    <p className="text-sm text-[#4B5563] mt-2 leading-relaxed">
                      {selectedFruit.desc}
                    </p>
                  </div>

                  {/* Clean ingredient inspector */}
                  <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-black/[0.05]">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] mb-2 flex items-center justify-between">
                      <span>Innehållsförteckning</span>
                      <span className="text-[#3D6647] font-semibold">100% Ren</span>
                    </div>
                    <p className="text-sm font-semibold text-[#1F2A37]">
                      Ingredienser: {selectedFruit.nameEn === 'Strawberry' ? 'Jordgubbar (100%)' : selectedFruit.nameEn === 'Banana' ? 'Banan (100%)' : selectedFruit.nameEn === 'Green Apple' ? 'Grönt Äpple (100%)' : selectedFruit.nameEn === 'Raspberry' ? 'Hallon (100%)' : 'Björnbär (100%)'}.
                    </p>
                    <div className="text-xs text-[#6B7280] mt-1">
                      Inga konserveringsmedel. Ingen tillsatt socker. Inga färgämnen.
                    </div>
                  </div>

                  {/* Toddler/School benefit */}
                  <div className="flex items-start gap-3 text-xs text-[#4B5563]">
                    <span className="p-1 rounded bg-[#3D6647]/10 text-[#3D6647] mt-0.5">
                      <Heart className="w-3.5 h-3.5" />
                    </span>
                    <span>
                      <strong className="text-[#1F2A37]">Föräldrafördel:</strong> {selectedFruit.toddlerBenefit}
                    </span>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => addToCart(selectedFruit)}
                      className="flex-1 bg-[#3D6647] hover:bg-[#2F5238] text-white text-sm font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 active:scale-98"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Lägg i varukorg · 29 kr</span>
                    </button>
                    <button
                      onClick={() => {
                        const nextIdx = (PURE_FRUITS.findIndex((f) => f.id === selectedFruit.id) + 1) % PURE_FRUITS.length;
                        setSelectedFruit(PURE_FRUITS[nextIdx]);
                      }}
                      className="px-4 py-3.5 rounded-xl border border-black/[0.08] hover:bg-white text-xs font-semibold text-[#4B5563] transition-colors"
                      title="Nästa smak"
                    >
                      Nästa smak →
                    </button>
                  </div>
                </div>
              </div>

              {/* Flavor Selector Dots (Design Spell) */}
              <div className="mt-8 pt-6 border-t border-black/[0.05] flex items-center justify-center gap-3">
                <span className="text-xs text-[#6B7280] font-medium mr-2 hidden sm:inline">Välj frukt:</span>
                {PURE_FRUITS.map((fruit) => {
                  const isSelected = fruit.id === selectedFruit.id;
                  return (
                    <button
                      key={fruit.id}
                      onClick={() => setSelectedFruit(fruit)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#1F2A37] text-white shadow-sm'
                          : 'bg-white/80 hover:bg-white text-[#4B5563] border border-black/[0.06]'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: fruit.color }}
                      />
                      <span>{fruit.name.replace('Fruita ', '')}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Design Spell: 10:1 Balansen (Interactive Ratio Balance) ─── */}
      <section id="ratio" className="py-16 md:py-24 px-6 bg-[#F3EFEA] border-y border-black/[0.05]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9C5A37]">
              Koncentrerad Naturkraft
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F2A37] mt-1">
              15 gram frystorkad = 150 gram färsk frukt
            </h2>
            <p className="text-sm md:text-base text-[#4B5563] max-w-xl mx-auto mt-3">
              Vi tar bara bort vattnet — all fruktsötma, alla fibrer och 98% av vitaminerna stannar kvar i varje frasig bit.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-black/[0.06]">
            {/* Visual Balance Scale */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Fresh Side */}
              <div className="bg-[#FAF8F5] rounded-2xl p-6 text-center border border-black/[0.04]">
                <div className="text-5xl mb-3">🍓🍓🍓🍓🍓</div>
                <div className="text-xl font-bold text-[#1F2A37] mb-1">
                  150 gram färska jordgubbar
                </div>
                <div className="text-xs text-[#6B7280] space-y-1 mt-3 text-left">
                  <div className="flex justify-between border-b border-black/[0.05] pb-1">
                    <span>Vatteninnehåll:</span>
                    <strong className="text-[#1F2A37]">~90% vatten</strong>
                  </div>
                  <div className="flex justify-between border-b border-black/[0.05] pb-1">
                    <span>Hållbarhet:</span>
                    <strong className="text-[#9C5A37]">3–5 dagar</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>I skolväskan:</span>
                    <strong className="text-[#9C5A37]">Risk för mos & saft</strong>
                  </div>
                </div>
              </div>

              {/* Fruita Side */}
              <div className="bg-[#EEF4EF] rounded-2xl p-6 text-center border border-[#3D6647]/20 relative overflow-hidden">
                <div className="absolute top-3 right-3 bg-[#3D6647] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Fruita 15g
                </div>
                <div className="text-5xl mb-3">✨🍓</div>
                <div className="text-xl font-bold text-[#24402A] mb-1">
                  15 gram Fruita påse
                </div>
                <div className="text-xs text-[#3D6647] space-y-1 mt-3 text-left">
                  <div className="flex justify-between border-b border-[#3D6647]/15 pb-1">
                    <span>Vatteninnehåll:</span>
                    <strong className="text-[#1F2A37]">&lt; 2% vatten</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#3D6647]/15 pb-1">
                    <span>Hållbarhet:</span>
                    <strong className="text-[#1F2A37]">12+ månader i skafferiet</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>I skolväskan:</span>
                    <strong className="text-[#3D6647]">100% kladdfri & alltid krispig</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Slider Interaction */}
            <div className="mt-8 pt-6 border-t border-black/[0.06]">
              <div className="flex items-center justify-between text-xs font-semibold text-[#4B5563] mb-2">
                <span>Dra reglaget: Se hur mycket färsk frukt som ryms i din påse</span>
                <span className="text-[#3D6647] font-bold">{ratioSlider * 10}g Färsk = {ratioSlider}g Fruita</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={ratioSlider}
                onChange={(e) => setRatioSlider(Number(e.target.value))}
                className="w-full h-2 bg-[#E5E0D8] rounded-lg appearance-none cursor-pointer accent-[#3D6647]"
              />
              <div className="flex justify-between text-[11px] text-[#9CA3AF] mt-1.5">
                <span>Litet mellanmål (50g färsk)</span>
                <span>Normal portion (150g färsk)</span>
                <span>Familjedelning (300g färsk)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Apple Bento Grid: 4 Svenska Trygghetsgarantier ─── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3D6647]">
            Svensk Konsumenttrygghet
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F2A37] mt-1">
            Skapad för medvetna föräldrar
          </h2>
          <p className="text-sm md:text-base text-[#4B5563] mt-2">
            Inga dolda tillsatser, inga kompromisser med säkerheten.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1: 1 Ingredient Guarantee */}
          <div className="bg-white rounded-3xl p-8 border border-black/[0.06] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#EEF4EF] text-[#3D6647] flex items-center justify-center mb-5">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#1F2A37] mb-2">
                Endast 1 Ingrediens
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Ingen maltodextrin, inga konserveringsmedel, inget tillsatt socker. Etiketten kan läsas och förstås på två sekunder.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/[0.05] text-xs font-semibold text-[#3D6647]">
              ✓ KRAV & EKO Standard
            </div>
          </div>

          {/* Bento Card 2: Pincettgrepp & Motorik */}
          <div className="bg-white rounded-3xl p-8 border border-black/[0.06] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#FAF3EC] text-[#9C5A37] flex items-center justify-center mb-5">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#1F2A37] mb-2">
                Pincettgrepp-Vänlig
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Perfekt formad för små händer från 12 månaders ålder. Tränar barnets finmotorik och självständiga ätande helt utan klibbiga fingrar.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/[0.05] text-xs font-semibold text-[#9C5A37]">
              ✓ Kladdfritt i bil & vagn
            </div>
          </div>

          {/* Bento Card 3: Pantamera & Monomaterial */}
          <div className="bg-white rounded-3xl p-8 border border-black/[0.06] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#F0F4F8] text-[#2B4C6F] flex items-center justify-center mb-5">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#1F2A37] mb-2">
                100% Återvinningsbar
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Monomaterial som källsorteras direkt som plast i svenska återvinningsstationer. Kompatibel med Pantamera-kraven för cirkulär förpackning.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/[0.05] text-xs font-semibold text-[#2B4C6F]">
              ✓ Cirkulär plaståtervinning
            </div>
          </div>
        </div>
      </section>

      {/* ─── Interactive Section: "Fyll Skolväskan" (Pack the Backpack) ─── */}
      <section id="backpack" className="py-16 md:py-24 px-6 bg-[#F3EFEA] border-t border-black/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3D6647]">
              Mellanmåls-Kitet
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F2A37] mt-1">
              Packa veckans skolväska
            </h2>
            <p className="text-sm text-[#4B5563] mt-2">
              Välj 5 påsar för skolvecka (Måndag–Fredag). Alltid redo i ryggsäcken för energi efter skolan.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-black/[0.06]">
            {/* Backpack Visual Drawer */}
            <div className="mb-8 p-6 rounded-2xl bg-[#FAF8F5] border border-black/[0.05]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#3D6647]" />
                  <span className="font-bold text-[#1F2A37] text-sm md:text-base">
                    🎒 Barnets Ryggsäck ({backpackItems.length}/5 påsar valda)
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#3D6647]">
                  Paketpris: 135 kr <span className="line-through text-[#9CA3AF] ml-1">145 kr</span>
                </span>
              </div>

              {/* Selected Pouches Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {backpackItems.map((id, index) => {
                  const fruit = PURE_FRUITS.find((f) => f.id === id);
                  if (!fruit) return null;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-3 border border-black/[0.08] flex flex-col items-center text-center relative group"
                    >
                      <button
                        onClick={() => toggleBackpackItem(id)}
                        className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#FAF8F5] hover:bg-[#FEE2E2] text-[#9CA3AF] hover:text-[#DC2626] flex items-center justify-center text-xs transition-colors"
                        title="Ta bort"
                      >
                        ✕
                      </button>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg mb-1" style={{ backgroundColor: fruit.bgSoft }}>
                        {fruit.nameEn === 'Strawberry' ? '🍓' : fruit.nameEn === 'Banana' ? '🍌' : fruit.nameEn === 'Green Apple' ? '🍏' : fruit.nameEn === 'Raspberry' ? '🫐' : '🟣'}
                      </div>
                      <span className="text-[11px] font-semibold text-[#1F2A37] truncate w-full">
                        {fruit.name.replace('Fruita ', '')}
                      </span>
                      <span className="text-[10px] text-[#6B7280]">Dag {index + 1}</span>
                    </div>
                  );
                })}

                {/* Empty placeholder slots */}
                {Array.from({ length: 5 - backpackItems.length }).map((_, idx) => (
                  <div
                    key={'empty-' + idx}
                    className="border-2 border-dashed border-black/[0.1] rounded-xl p-3 flex flex-col items-center justify-center text-center min-h-[90px]"
                  >
                    <Plus className="w-4 h-4 text-[#9CA3AF] mb-1" />
                    <span className="text-[10px] text-[#9CA3AF] font-medium">Välj smak nedan</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick click selector */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-[#6B7280]">
                Klicka på smakerna för att fylla skolväskan:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {PURE_FRUITS.map((fruit) => {
                  const isAdded = backpackItems.includes(fruit.id);
                  return (
                    <button
                      key={fruit.id}
                      onClick={() => toggleBackpackItem(fruit.id)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all duration-200 ${
                        isAdded
                          ? 'border-[#3D6647] bg-[#EEF4EF] text-[#24402A]'
                          : 'border-black/[0.08] hover:border-black/[0.2] bg-white text-[#4B5563]'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: fruit.color }} />
                      <div className="truncate">
                        <div className="text-xs font-bold truncate">{fruit.name.replace('Fruita ', '')}</div>
                        <div className="text-[10px] opacity-75">{isAdded ? '✓ Tillagd' : '+ Lägg till'}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#6B7280]">
                🚀 Fri frakt med PostNord vid beställning av skolpaketet.
              </div>
              <button
                onClick={addBackpackBundle}
                disabled={backpackItems.length === 0}
                className="w-full sm:w-auto bg-[#3D6647] hover:bg-[#2F5238] disabled:opacity-50 text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Lägg hela skolpaketet i varukorgen ({backpackItems.length * 27} kr)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Apple Spec Table: Jämförelse med andra mellanmål ─── */}
      <section id="comparison" className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3D6647]">
            Fakta & Ärlighet
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F2A37] mt-1">
            Varför frystorkat vinner
          </h2>
          <p className="text-sm text-[#4B5563] mt-2">
            En objektiv jämförelse med vanliga alternativ i svenska butikshyllor.
          </p>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden border border-black/[0.06] shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/[0.06] bg-[#FAF8F5]">
                  <th className="p-4 md:p-5 font-semibold text-[#6B7280] text-xs">Egenskap</th>
                  <th className="p-4 md:p-5 font-bold text-[#3D6647] text-sm bg-[#EEF4EF]/60">
                    🍓 Fruita (Frystorkad)
                  </th>
                  <th className="p-4 md:p-5 font-semibold text-[#4B5563] text-xs">Russin / Torkad frukt</th>
                  <th className="p-4 md:p-5 font-semibold text-[#4B5563] text-xs">Klämpåsar (Smoothie)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                <tr>
                  <td className="p-4 md:p-5 font-medium text-[#1F2A37]">Ingredienser</td>
                  <td className="p-4 md:p-5 font-bold text-[#3D6647] bg-[#EEF4EF]/30">
                    100% ren frukt (1 ingrediens)
                  </td>
                  <td className="p-4 md:p-5 text-[#6B7280]">Ofta solrosolja & konservering</td>
                  <td className="p-4 md:p-5 text-[#6B7280]">Koncentrat, puré & syrareglerare</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-medium text-[#1F2A37]">Tillsatt socker</td>
                  <td className="p-4 md:p-5 font-bold text-[#3D6647] bg-[#EEF4EF]/30">0 gram</td>
                  <td className="p-4 md:p-5 text-[#6B7280]">0-15g (koncentrerat klibbigt)</td>
                  <td className="p-4 md:p-5 text-[#6B7280]">Hög fruktsockerhalt i vätska</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-medium text-[#1F2A37]">Vitaminer bevarade</td>
                  <td className="p-4 md:p-5 font-bold text-[#3D6647] bg-[#EEF4EF]/30">
                    98% (Kall process vid -40°C)
                  </td>
                  <td className="p-4 md:p-5 text-[#6B7280]">~30-40% (Värmetorkat)</td>
                  <td className="p-4 md:p-5 text-[#6B7280]">~40-50% (Pastöriserat)</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-medium text-[#1F2A37]">Kladd & Spill</td>
                  <td className="p-4 md:p-5 font-bold text-[#3D6647] bg-[#EEF4EF]/30">
                    0% kladd — torra frasiga bitar
                  </td>
                  <td className="p-4 md:p-5 text-[#6B7280]">Klibbar i tänder och fickor</td>
                  <td className="p-4 md:p-5 text-[#6B7280]">Risk för sprut på kläder</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-medium text-[#1F2A37]">Tandhälsa</td>
                  <td className="p-4 md:p-5 font-bold text-[#3D6647] bg-[#EEF4EF]/30">
                    Smälter rent i saliven
                  </td>
                  <td className="p-4 md:p-5 text-[#6B7280]">Fastnar länge i emaljgropar</td>
                  <td className="p-4 md:p-5 text-[#6B7280]">Sura pH-värden badar tänderna</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Swedish Trust Bar with Swish Integration ─── */}
      <section className="py-12 px-6 bg-[#FAF8F5] border-t border-black/[0.06]">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-around gap-6 text-[#4B5563] text-xs font-medium">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#3D6647]" />
            <span>Betala blixtsnabbt med <strong>Swish</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#3D6647]" />
            <span>Snabb leverans med <strong>PostNord / Budbee</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3D6647]" />
            <span>30 dagars <strong>Smakgaranti</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#3D6647]" />
            <span>KRAV & EKO Standard</span>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-12 px-6 bg-[#1F2A37] text-white/70 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img
              src={`${base}images/logo-white.png`}
              alt="Fruita Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-[#3D6647] font-semibold text-xs px-2 py-0.5 rounded-full bg-[#3D6647]/20 text-white">pure</span>
          </div>
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} Fruita Nordic AB</span>
            <span>Organisationsnr: 559412-8891</span>
            <span>Stockholm, Sverige</span>
          </div>
          <div className="flex items-center gap-4 text-white">
            <span className="px-2.5 py-1 rounded bg-white/10 font-mono text-[11px]">Swish</span>
            <span className="px-2.5 py-1 rounded bg-white/10 font-mono text-[11px]">Klarna</span>
            <span className="px-2.5 py-1 rounded bg-white/10 font-mono text-[11px]">KRAV</span>
          </div>
        </div>
      </footer>

      {/* ─── Interactive Swish Checkout Modal (Design Spell) ─── */}
      {isSwishModalOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-black/[0.08] relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsSwishModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#EBF7EE] text-[#3D6647] flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1F2A37]">Snabbkassa med Swish</h3>
                <p className="text-xs text-[#6B7280]">Officiell svensk betalning</p>
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-[#6B7280] mb-4">Varukorgen är tom.</p>
                <button
                  onClick={() => {
                    addToCart(PURE_FRUITS[0], 2);
                    addToCart(PURE_FRUITS[1], 1);
                  }}
                  className="text-xs font-semibold text-[#3D6647] underline"
                >
                  Lägg till provpaket (3 påsar)
                </button>
              </div>
            ) : swishSuccess ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-[#3D6647] text-white flex items-center justify-center mx-auto mb-3 text-2xl">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-[#1F2A37]">Tack för din beställning!</h4>
                <p className="text-xs text-[#6B7280] mt-1">
                  Kvitto och spårningslänk skickas via SMS. Leverans inom 1–2 vardagar.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSwishPay} className="space-y-4">
                {/* Order Summary */}
                <div className="bg-[#FAF8F5] rounded-2xl p-3.5 text-xs space-y-2 border border-black/[0.04]">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-[#4B5563]">
                      <span>{item.name} × {item.qty}</span>
                      <strong className="text-[#1F2A37]">{item.qty * item.price} kr</strong>
                    </div>
                  ))}
                  <div className="border-t border-black/[0.05] pt-2 flex justify-between items-center font-bold text-sm text-[#1F2A37]">
                    <span>Totalt (inkl. moms):</span>
                    <span className="text-[#3D6647]">{cartTotal} kr</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4B5563] mb-1.5">
                    Mobilnummer kopplat till Swish:
                  </label>
                  <input
                    type="tel"
                    placeholder="070 123 45 67"
                    required
                    value={swishPhone}
                    onChange={(e) => setSwishPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.1] text-sm focus:outline-none focus:ring-2 focus:ring-[#3D6647]/20 focus:border-[#3D6647]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#3D6647] hover:bg-[#2F5238] text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 active:scale-98"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Öppna Swish & Betala {cartTotal} kr</span>
                </button>

                <p className="text-[11px] text-center text-[#9CA3AF]">
                  Krypterad och säker anslutning via Swish Företag & BankID.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
