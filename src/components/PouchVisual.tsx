import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface PouchVisualProps {
  fruitKey: 'banan' | 'jordgubbe' | 'bjornbar' | 'apple' | 'hallon' | 'mango' | 'bundle_all' | 'bundle_berries';
  className?: string;
  showShadow?: boolean;
}

export const PouchVisual: React.FC<PouchVisualProps> = ({
  fruitKey,
  className = 'w-full h-auto',
  showShadow = true,
}) => {
  const { language } = useLanguage();

  // Pouch styling configurations matching the user's uploaded images
  const configs = {
    banan: {
      title: language === 'sv' ? 'Banan' : 'Banana',
      subtitle: language === 'sv' ? 'Frystorkade skivor' : 'Freeze-dried slices',
      titleColor: '#17472A',
      pouchBg: '#FFF3A8',
      pouchBgEnd: '#FFE87A',
      waveBg: '#FFDE59',
      animal: 'monkey',
      accentColor: '#E6A700',
    },
    jordgubbe: {
      title: language === 'sv' ? 'Jordgubbe' : 'Strawberry',
      subtitle: language === 'sv' ? 'Frystorkade skivor' : 'Freeze-dried slices',
      titleColor: '#931B2A',
      pouchBg: '#FFD3D9',
      pouchBgEnd: '#FCB5C0',
      waveBg: '#FA92A4',
      animal: 'fox',
      accentColor: '#E03E52',
    },
    bjornbar: {
      title: language === 'sv' ? 'Björnbär' : 'Blackberry',
      subtitle: language === 'sv' ? 'Frystorkade bär' : 'Freeze-dried berries',
      titleColor: '#43195E',
      pouchBg: '#E9D3F8',
      pouchBgEnd: '#D8B8F0',
      waveBg: '#C494E5',
      animal: 'bear',
      accentColor: '#8C3DBB',
    },
    apple: {
      title: language === 'sv' ? 'Äpple' : 'Apple',
      subtitle: language === 'sv' ? 'Frystorkade äppelskivor' : 'Freeze-dried apple slices',
      titleColor: '#A61A22',
      pouchBg: '#DBF2B5',
      pouchBgEnd: '#C7E898',
      waveBg: '#ACDB6D',
      animal: 'moose',
      accentColor: '#5E9B23',
    },
    hallon: {
      title: language === 'sv' ? 'Hallon' : 'Raspberry',
      subtitle: language === 'sv' ? 'Frystorkade hallon' : 'Freeze-dried raspberries',
      titleColor: '#9C1138',
      pouchBg: '#FFCADB',
      pouchBgEnd: '#FCA4BE',
      waveBg: '#F87EA2',
      animal: 'bunny',
      accentColor: '#D8235E',
    },
    mango: {
      title: 'Mango',
      subtitle: language === 'sv' ? 'Frystorkad mango' : 'Freeze-dried mango',
      titleColor: '#D84900',
      pouchBg: '#FFE3A8',
      pouchBgEnd: '#FFCD73',
      waveBg: '#FFB338',
      animal: 'tiger',
      accentColor: '#F27A1A',
    },
    bundle_all: {
      title: language === 'sv' ? 'Skolbox 6-Pack' : 'School 6-Pack',
      subtitle: language === 'sv' ? 'Alla djurkompisar' : 'All animal mascots',
      titleColor: '#1C3E28',
      pouchBg: '#E6EFE8',
      pouchBgEnd: '#CCE0D1',
      waveBg: '#B3D1BB',
      animal: 'all',
      accentColor: '#2D5A38',
    },
    bundle_berries: {
      title: language === 'sv' ? 'Bär-Trio' : 'Berry Trio',
      subtitle: language === 'sv' ? 'Jordgubbe · Hallon · Björnbär' : 'Strawberry · Raspberry · Blackberry',
      titleColor: '#5C1D38',
      pouchBg: '#F9D8E6',
      pouchBgEnd: '#E8B9D6',
      waveBg: '#D998C4',
      animal: 'berries',
      accentColor: '#A83B73',
    },
  };

  const config = configs[fruitKey] || configs.jordgubbe;

  const base = import.meta.env.BASE_URL;
  const realImages: Record<string, string> = {
    jordgubbe: `${base}images/products/jordgubbe.png`,
    banan: `${base}images/products/banan.png`,
    apple: `${base}images/products/apple.png`,
    hallon: `${base}images/products/hallon.png`,
    bjornbar: `${base}images/products/bjornbar.png`,
    mango: `${base}images/products/mango.png`,
  };

  const realImageSrc = realImages[fruitKey];

  if (realImageSrc) {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        <img
          src={realImageSrc}
          alt={`Fruita ${config.title} ${language === 'sv' ? 'frystorkad frukt' : 'freeze-dried fruit'}`}
          className="w-full h-auto max-h-[500px] object-contain drop-shadow-xl hover:scale-[1.03] transition-transform duration-300"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 400 600"
        className="w-full h-full drop-shadow-md select-none transition-transform duration-300 hover:scale-[1.02]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id={`pouchGrad-${fruitKey}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={config.pouchBg} />
            <stop offset="100%" stopColor={config.pouchBgEnd} />
          </linearGradient>

          <linearGradient id="pouchHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="25%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="bottomPanelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FAF7F0" />
            <stop offset="100%" stopColor="#F3EFE4" />
          </linearGradient>

          <filter id="pouchShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="#1F2820" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Pouch Silhouette with Rounded Corners, Top Seal and Stand-up Bottom */}
        <g filter={showShadow ? 'url(#pouchShadow)' : undefined}>
          
          {/* Main Pouch Body */}
          <path
            d="M 40,65 
               Q 40,45 65,45 
               L 335,45 
               Q 360,45 360,65 
               L 355,510 
               Q 355,540 330,545 
               C 270,555 130,555 70,545 
               Q 45,540 45,510 
               Z"
            fill={`url(#pouchGrad-${fruitKey})`}
          />

          {/* Background Decorative Soft Wave Organic Blob */}
          <path
            d="M 40,110 
               C 90,80 200,140 360,95 
               L 355,460 
               C 280,480 120,440 45,460 
               Z"
            fill={config.waveBg}
            opacity="0.55"
          />

          {/* Top Zipper Line & Tear Notches */}
          {/* Top Seal Texture */}
          <rect x="52" y="47" width="296" height="42" rx="3" fill="#ffffff" fillOpacity="0.08" />
          <line x1="40" y1="90" x2="360" y2="90" stroke="#000000" strokeWidth="0.8" strokeOpacity="0.15" />
          
          {/* Left Tear Notch */}
          <path d="M 40,78 L 47,82 L 40,86 Z" fill="#E8DFD0" />
          {/* Right Tear Notch */}
          <path d="M 360,78 L 353,82 L 360,86 Z" fill="#E8DFD0" />

          {/* Top Slogan: "Något annorlunda" */}
          <text
            x="200"
            y="76"
            textAnchor="middle"
            fill="#2D3B31"
            fontSize="11"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="600"
            letterSpacing="0.04em"
          >
            {language === 'sv' ? 'Något annorlunda' : 'Something Different'}
          </text>

          {/* Brand Logo: "Fruita" with Leaves */}
          <g transform="translate(142, 122)">
            {/* The two fresh green leaves above 'i' */}
            <path
              d="M 68,0 C 74,-8 82,-7 86,-3 C 86,2 78,5 68,0 Z"
              fill="#529940"
            />
            <path
              d="M 68,0 C 65,-9 57,-10 54,-4 C 54,2 62,4 68,0 Z"
              fill="#3E7D2E"
            />
            {/* "Fruita" Wordmark */}
            <text
              x="58"
              y="22"
              textAnchor="middle"
              fill="#134725"
              fontSize="38"
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              fontWeight="900"
              letterSpacing="-0.03em"
            >
              Fruita
            </text>
          </g>

          {/* Fruit Title & Subtitle */}
          <g transform="translate(200, 195)">
            <text
              x="0"
              y="0"
              textAnchor="middle"
              fill={config.titleColor}
              fontSize="36"
              fontFamily="'Playfair Display', Georgia, serif"
              fontWeight="800"
              letterSpacing="-0.02em"
            >
              {config.title}
            </text>
            <text
              x="0"
              y="23"
              textAnchor="middle"
              fill={config.titleColor}
              fontSize="14"
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              fontWeight="600"
              opacity="0.9"
            >
              {config.subtitle}
            </text>
          </g>

          {/* Dynamic Illustrated Fruit on the Left & Mascot Animal on the Right */}
          {fruitKey === 'jordgubbe' && (
            <g transform="translate(0, 0)">
              {/* Fresh & Sliced Strawberries */}
              {/* Big Fresh Strawberry with Leaves */}
              <g transform="translate(70, 260)">
                <path
                  d="M 45,15 C 75,18 90,48 85,85 C 80,110 50,135 45,140 C 40,135 10,110 5,85 C 0,48 15,18 45,15 Z"
                  fill="#D42034"
                />
                {/* Seeds */}
                {[
                  [25, 45], [45, 40], [65, 48],
                  [20, 70], [40, 68], [60, 72], [75, 75],
                  [30, 95], [50, 95], [65, 100],
                  [45, 118]
                ].map(([x, y], i) => (
                  <ellipse key={i} cx={x} cy={y} rx="2" ry="3.5" fill="#FFE27A" opacity="0.85" />
                ))}
                {/* Green Leaves */}
                <path d="M 45,18 C 30,-5 10,8 15,18 Z" fill="#2E7D32" />
                <path d="M 45,18 C 45,-10 65,-8 60,18 Z" fill="#388E3C" />
                <path d="M 45,18 C 75,5 85,25 70,22 Z" fill="#4CAF50" />
              </g>

              {/* Sliced Strawberry Half */}
              <g transform="translate(125, 290)">
                <path
                  d="M 35,12 C 60,15 70,40 68,70 C 65,90 40,110 35,115 C 30,110 5,90 2,70 C 0,40 10,15 35,12 Z"
                  fill="#E5394B"
                />
                {/* Strawberry sliced heart */}
                <path
                  d="M 35,22 C 50,25 56,42 54,65 C 50,80 38,95 35,100 C 32,95 20,80 16,65 C 14,42 20,25 35,22 Z"
                  fill="#FFDBE0"
                />
                <circle cx="35" cy="55" r="10" fill="#FFF2F4" />
              </g>

              {/* Freeze-dried crunchy slices */}
              <ellipse cx="100" cy="410" rx="32" ry="20" fill="#E84858" stroke="#FFCFD5" strokeWidth="2.5" />
              <ellipse cx="150" cy="425" rx="34" ry="21" fill="#E84858" stroke="#FFCFD5" strokeWidth="2.5" transform="rotate(-15, 150, 425)" />
              <ellipse cx="200" cy="420" rx="32" ry="20" fill="#E84858" stroke="#FFCFD5" strokeWidth="2.5" transform="rotate(10, 200, 420)" />

              {/* Fox Mascot (Räven) */}
              <g transform="translate(210, 255)">
                {/* Fox Bushy Tail */}
                <path
                  d="M 85,120 C 130,110 145,50 115,35 C 95,25 90,65 75,95 Z"
                  fill="#DE5D26"
                />
                <path
                  d="M 120,40 C 125,48 118,65 110,68 C 105,62 108,45 120,40 Z"
                  fill="#FFF7ED"
                />
                {/* Fox Body */}
                <ellipse cx="65" cy="115" rx="36" ry="42" fill="#DE5D26" />
                <ellipse cx="65" cy="118" rx="22" ry="28" fill="#FFF7ED" />
                {/* Paws */}
                <ellipse cx="45" cy="155" rx="14" ry="10" fill="#452317" />
                <ellipse cx="85" cy="155" rx="14" ry="10" fill="#452317" />
                {/* Fox Head */}
                <circle cx="65" cy="62" r="38" fill="#DE5D26" />
                {/* Ears */}
                <path d="M 35,42 L 20,-2 L 52,28 Z" fill="#DE5D26" />
                <path d="M 33,36 L 24,7 L 46,26 Z" fill="#FFF7ED" />
                <path d="M 78,28 L 110,-2 L 95,42 Z" fill="#DE5D26" />
                <path d="M 84,26 L 106,7 L 97,36 Z" fill="#FFF7ED" />
                {/* White Cheek Tufts */}
                <path d="M 32,70 C 20,80 30,95 45,85 Z" fill="#FFF7ED" />
                <path d="M 98,70 C 110,80 100,95 85,85 Z" fill="#FFF7ED" />
                <ellipse cx="65" cy="74" rx="18" ry="12" fill="#FFF7ED" />
                {/* Eyes */}
                <ellipse cx="50" cy="58" rx="7" ry="9" fill="#1C1816" />
                <circle cx="48" cy="55" r="2.5" fill="#FFFFFF" />
                <ellipse cx="80" cy="58" rx="7" ry="9" fill="#1C1816" />
                <circle cx="78" cy="55" r="2.5" fill="#FFFFFF" />
                {/* Nose & Smile */}
                <ellipse cx="65" cy="71" rx="4" ry="3" fill="#1A1412" />
                <path d="M 58,78 Q 65,86 72,78" fill="none" stroke="#682918" strokeWidth="2.5" strokeLinecap="round" />
                {/* Fox Hand holding strawberry slice */}
                <ellipse cx="40" cy="98" rx="8" ry="8" fill="#452317" />
                <ellipse cx="38" cy="90" rx="16" ry="11" fill="#E84858" stroke="#FFF" strokeWidth="1.5" transform="rotate(-25, 38, 90)" />
              </g>
            </g>
          )}

          {fruitKey === 'banan' && (
            <g transform="translate(0, 0)">
              {/* Whole Banana */}
              <g transform="translate(60, 290)">
                <path
                  d="M 15,20 C 60,60 140,75 190,45 C 160,85 70,80 15,20 Z"
                  fill="#FCD32B"
                />
                <path d="M 12,18 L 18,24 L 10,26 Z" fill="#5A7D2C" />
              </g>
              {/* Sliced Banana Discs with star center */}
              {[
                { cx: 85, cy: 405, r: 28 },
                { cx: 140, cy: 418, r: 30 },
                { cx: 195, cy: 415, r: 28 },
                { cx: 245, cy: 422, r: 24 }
              ].map((b, i) => (
                <g key={i}>
                  <circle cx={b.cx} cy={b.cy} r={b.r} fill="#FFF6D1" stroke="#F0CA4D" strokeWidth="3" />
                  <circle cx={b.cx} cy={b.cy} r={b.r * 0.4} fill="#FFFBE8" />
                  <path
                    d={`M ${b.cx},${b.cy - 6} L ${b.cx},${b.cy + 6} M ${b.cx - 6},${b.cy} L ${b.cx + 6},${b.cy}`}
                    stroke="#B89B48"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </g>
              ))}

              {/* Monkey Mascot (Apan) */}
              <g transform="translate(225, 255)">
                {/* Monkey Body */}
                <ellipse cx="65" cy="115" rx="34" ry="38" fill="#8B512E" />
                <ellipse cx="65" cy="118" rx="22" ry="26" fill="#FCE3C8" />
                {/* Tail */}
                <path d="M 95,120 Q 125,120 120,95 Q 115,75 125,70" fill="none" stroke="#8B512E" strokeWidth="8" strokeLinecap="round" />
                {/* Paws */}
                <circle cx="48" cy="152" r="11" fill="#8B512E" />
                <circle cx="82" cy="152" r="11" fill="#8B512E" />
                {/* Head */}
                <circle cx="65" cy="62" r="36" fill="#8B512E" />
                {/* Big Ears */}
                <circle cx="28" cy="62" r="15" fill="#8B512E" />
                <circle cx="28" cy="62" r="9" fill="#FCE3C8" />
                <circle cx="102" cy="62" r="15" fill="#8B512E" />
                <circle cx="102" cy="62" r="9" fill="#FCE3C8" />
                {/* Peach Face Mask */}
                <path d="M 45,55 C 45,45 55,42 65,48 C 75,42 85,45 85,55 C 85,75 75,85 65,85 C 55,85 45,75 45,55 Z" fill="#FCE3C8" />
                {/* Big Eyes */}
                <ellipse cx="56" cy="55" rx="6" ry="8" fill="#1C1816" />
                <circle cx="54" cy="52" r="2.2" fill="#FFFFFF" />
                <ellipse cx="74" cy="55" rx="6" ry="8" fill="#1C1816" />
                <circle cx="72" cy="52" r="2.2" fill="#FFFFFF" />
                {/* Nose & Big Smile */}
                <circle cx="63" cy="64" r="1.5" fill="#522C17" />
                <circle cx="67" cy="64" r="1.5" fill="#522C17" />
                <path d="M 56,68 Q 65,79 74,68 Z" fill="#A83232" />
                {/* Holding banana disc */}
                <circle cx="36" cy="78" r="14" fill="#FFF6D1" stroke="#F0CA4D" strokeWidth="2" />
              </g>
            </g>
          )}

          {fruitKey === 'bjornbar' && (
            <g transform="translate(0, 0)">
              {/* Glossy Blackberries Cluster */}
              <g transform="translate(65, 275)">
                {/* Leaves */}
                <path d="M 40,40 C 20,10 50,0 60,30 Z" fill="#2E7D32" />
                <path d="M 60,30 C 80,0 110,15 90,45 Z" fill="#388E3C" />
                {/* Blackberry Drupelets */}
                {[
                  [45, 55], [60, 50], [75, 55],
                  [35, 70], [50, 68], [68, 68], [85, 70],
                  [40, 85], [58, 85], [78, 85],
                  [50, 100], [68, 100],
                  [58, 115]
                ].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="10" fill="#2B153D" />
                    <circle cx={x - 3} cy={y - 3} r="3" fill="#8E5BB3" opacity="0.6" />
                  </g>
                ))}
              </g>
              {/* Freeze-dried Halved Blackberries */}
              <ellipse cx="120" cy="420" rx="25" ry="18" fill="#75225B" stroke="#D183B7" strokeWidth="2" />
              <ellipse cx="180" cy="425" rx="25" ry="18" fill="#75225B" stroke="#D183B7" strokeWidth="2" />

              {/* Bear Mascot (Björnen) */}
              <g transform="translate(220, 260)">
                {/* Bear Body */}
                <ellipse cx="65" cy="115" rx="38" ry="42" fill="#7D4829" />
                <ellipse cx="65" cy="120" rx="24" ry="26" fill="#A86A45" />
                {/* Round Ears */}
                <circle cx="34" cy="35" r="14" fill="#7D4829" />
                <circle cx="34" cy="35" r="8" fill="#C4916E" />
                <circle cx="96" cy="35" r="14" fill="#7D4829" />
                <circle cx="96" cy="35" r="8" fill="#C4916E" />
                {/* Head */}
                <circle cx="65" cy="65" r="37" fill="#7D4829" />
                {/* Snout */}
                <ellipse cx="65" cy="74" rx="17" ry="13" fill="#C4916E" />
                <ellipse cx="65" cy="68" rx="6" ry="4" fill="#241208" />
                <path d="M 60,75 Q 65,81 70,75" fill="none" stroke="#241208" strokeWidth="2" strokeLinecap="round" />
                {/* Big Bear Eyes */}
                <ellipse cx="50" cy="56" rx="6" ry="8" fill="#1C1816" />
                <circle cx="48" cy="53" r="2.2" fill="#FFFFFF" />
                <ellipse cx="80" cy="56" rx="6" ry="8" fill="#1C1816" />
                <circle cx="78" cy="53" r="2.2" fill="#FFFFFF" />
                {/* Paws */}
                <ellipse cx="42" cy="155" rx="14" ry="10" fill="#5C331B" />
                <ellipse cx="88" cy="155" rx="14" ry="10" fill="#5C331B" />
                {/* Paw Holding Blackberry */}
                <circle cx="45" cy="95" r="15" fill="#2B153D" />
                <circle cx="43" cy="92" r="4" fill="#8E5BB3" opacity="0.6" />
              </g>
            </g>
          )}

          {fruitKey === 'apple' && (
            <g transform="translate(0, 0)">
              {/* Fresh Red Apple with Leaf */}
              <g transform="translate(65, 275)">
                <path
                  d="M 45,25 C 20,25 5,45 5,75 C 5,115 35,135 45,135 C 55,135 85,115 85,75 C 85,45 70,25 45,25 Z"
                  fill="#D32F2F"
                />
                <path d="M 45,25 C 43,10 52,2 52,2" stroke="#5D4037" strokeWidth="4" strokeLinecap="round" />
                <path d="M 50,12 C 65,8 75,18 70,25 C 60,28 52,20 50,12 Z" fill="#4CAF50" />
              </g>
              {/* Sliced Apple Half with Core & Seeds */}
              <g transform="translate(130, 305)">
                <path
                  d="M 38,18 C 18,18 6,35 6,60 C 6,90 28,105 38,105 C 48,105 70,90 70,60 C 70,35 58,18 38,18 Z"
                  fill="#FFF7E0"
                  stroke="#D32F2F"
                  strokeWidth="5"
                />
                <ellipse cx="34" cy="62" rx="2.5" ry="5" fill="#3E2723" transform="rotate(-15, 34, 62)" />
                <ellipse cx="42" cy="62" rx="2.5" ry="5" fill="#3E2723" transform="rotate(15, 42, 62)" />
              </g>
              {/* Sliced Apple Crisps */}
              {[
                { cx: 90, cy: 420, r: 24, rot: -15 },
                { cx: 140, cy: 425, r: 26, rot: 5 },
                { cx: 190, cy: 420, r: 25, rot: 25 }
              ].map((c, i) => (
                <path
                  key={i}
                  d={`M ${c.cx - 24},${c.cy} Q ${c.cx},${c.cy - 18} ${c.cx + 24},${c.cy} Q ${c.cx},${c.cy + 14} ${c.cx - 24},${c.cy}`}
                  fill="#FFF9E6"
                  stroke="#E53935"
                  strokeWidth="3.5"
                  transform={`rotate(${c.rot}, ${c.cx}, ${c.cy})`}
                />
              ))}

              {/* Moose / Reindeer Mascot (Älgen) */}
              <g transform="translate(220, 255)">
                {/* Antlers */}
                <path d="M 40,30 C 25,10 15,22 28,32 C 15,28 15,40 32,40" stroke="#7A4D32" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M 90,30 C 105,10 115,22 102,32 C 115,28 115,40 98,40" stroke="#7A4D32" strokeWidth="5" strokeLinecap="round" fill="none" />
                {/* Body */}
                <ellipse cx="65" cy="115" rx="36" ry="40" fill="#996342" />
                <ellipse cx="65" cy="120" rx="22" ry="24" fill="#C99775" />
                {/* Head */}
                <circle cx="65" cy="65" r="35" fill="#996342" />
                {/* Ears */}
                <ellipse cx="32" cy="52" rx="10" ry="7" fill="#996342" transform="rotate(-20, 32, 52)" />
                <ellipse cx="98" cy="52" rx="10" ry="7" fill="#996342" transform="rotate(20, 98, 52)" />
                {/* Muzzle */}
                <ellipse cx="65" cy="74" rx="19" ry="14" fill="#C99775" />
                <ellipse cx="60" cy="70" rx="2.5" ry="3" fill="#422514" />
                <ellipse cx="70" cy="70" rx="2.5" ry="3" fill="#422514" />
                <path d="M 58,78 Q 65,84 72,78" fill="none" stroke="#422514" strokeWidth="2.5" strokeLinecap="round" />
                {/* Big Eyes */}
                <ellipse cx="50" cy="56" rx="6" ry="8" fill="#1C1816" />
                <circle cx="48" cy="53" r="2.2" fill="#FFFFFF" />
                <ellipse cx="80" cy="56" rx="6" ry="8" fill="#1C1816" />
                <circle cx="78" cy="53" r="2.2" fill="#FFFFFF" />
                {/* Hooves holding apple piece */}
                <path d="M 38,90 Q 48,80 58,90 Z" fill="#FFF7E0" stroke="#D32F2F" strokeWidth="2" />
              </g>
            </g>
          )}

          {fruitKey === 'hallon' && (
            <g transform="translate(0, 0)">
              {/* Raspberries Plump Cluster */}
              <g transform="translate(70, 280)">
                {/* Green leaves */}
                <path d="M 35,30 C 15,10 45,5 55,25 Z" fill="#388E3C" />
                <path d="M 55,25 C 75,5 105,15 85,35 Z" fill="#4CAF50" />
                {/* Raspberry Drupelets */}
                {[
                  [45, 50], [60, 46], [75, 50],
                  [35, 65], [50, 62], [68, 62], [85, 65],
                  [40, 80], [58, 80], [78, 80],
                  [50, 95], [68, 95]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="9.5" fill="#E91E63" stroke="#C2185B" strokeWidth="1" />
                ))}
              </g>
              {/* Freeze-dried crunchy raspberry discs */}
              <circle cx="130" cy="425" r="20" fill="#D81B60" stroke="#FF80AB" strokeWidth="2" />
              <circle cx="180" cy="430" r="22" fill="#D81B60" stroke="#FF80AB" strokeWidth="2" />

              {/* Bunny Mascot (Kaninen) */}
              <g transform="translate(220, 250)">
                {/* Long Bunny Ears */}
                <ellipse cx="46" cy="18" rx="9" ry="32" fill="#FFFBF5" stroke="#F5E5DF" strokeWidth="1" transform="rotate(-10, 46, 18)" />
                <ellipse cx="46" cy="20" rx="5" ry="24" fill="#FFAEC5" transform="rotate(-10, 46, 20)" />
                <ellipse cx="84" cy="18" rx="9" ry="32" fill="#FFFBF5" stroke="#F5E5DF" strokeWidth="1" transform="rotate(10, 84, 18)" />
                <ellipse cx="84" cy="20" rx="5" ry="24" fill="#FFAEC5" transform="rotate(10, 84, 20)" />
                {/* Bunny Body */}
                <ellipse cx="65" cy="120" rx="36" ry="40" fill="#FFFBF5" stroke="#F0E4DE" strokeWidth="1" />
                {/* Head */}
                <circle cx="65" cy="65" r="36" fill="#FFFBF5" stroke="#F0E4DE" strokeWidth="1" />
                {/* Big Soft Eyes */}
                <ellipse cx="50" cy="56" rx="7" ry="9" fill="#2E1B1E" />
                <circle cx="48" cy="53" r="2.5" fill="#FFFFFF" />
                <ellipse cx="80" cy="56" rx="7" ry="9" fill="#2E1B1E" />
                <circle cx="78" cy="53" r="2.5" fill="#FFFFFF" />
                {/* Bunny Nose & Mouth */}
                <polygon points="65,68 62,64 68,64" fill="#FF80AB" />
                <path d="M 60,72 Q 65,77 70,72" fill="none" stroke="#663A45" strokeWidth="2" strokeLinecap="round" />
                {/* Paws */}
                <ellipse cx="45" cy="155" rx="14" ry="10" fill="#FFFBF5" stroke="#F0E4DE" strokeWidth="1" />
                <ellipse cx="85" cy="155" rx="14" ry="10" fill="#FFFBF5" stroke="#F0E4DE" strokeWidth="1" />
                {/* Paws holding raspberry */}
                <circle cx="46" cy="92" r="14" fill="#E91E63" stroke="#FF80AB" strokeWidth="2" />
              </g>
            </g>
          )}

          {fruitKey === 'mango' && (
            <g transform="translate(0, 0)">
              {/* Fresh Mango Fruit */}
              <g transform="translate(65, 275)">
                <path
                  d="M 45,20 C 15,25 0,55 5,85 C 10,120 40,140 60,135 C 85,130 95,95 85,60 C 75,30 65,18 45,20 Z"
                  fill="#FF8F00"
                />
                {/* Mango green-red blush */}
                <path d="M 45,20 C 25,25 15,45 15,65 C 35,55 55,45 65,30 Z" fill="#689F38" opacity="0.8" />
              </g>
              {/* Diced Mango Hedgehog grid */}
              <g transform="translate(115, 305)">
                <ellipse cx="45" cy="45" rx="38" ry="32" fill="#FFB300" />
                {/* Grid Lines */}
                <line x1="20" y1="20" x2="20" y2="70" stroke="#FF6F00" strokeWidth="2" />
                <line x1="37" y1="15" x2="37" y2="75" stroke="#FF6F00" strokeWidth="2" />
                <line x1="55" y1="18" x2="55" y2="72" stroke="#FF6F00" strokeWidth="2" />
                <line x1="10" y1="35" x2="80" y2="35" stroke="#FF6F00" strokeWidth="2" />
                <line x1="12" y1="52" x2="78" y2="52" stroke="#FF6F00" strokeWidth="2" />
              </g>
              {/* Crispy Mango Spears */}
              <path d="M 85,420 Q 130,410 160,425 Q 120,440 85,420 Z" fill="#FFA000" stroke="#FFE082" strokeWidth="2" />
              <path d="M 140,430 Q 190,415 220,430 Q 180,450 140,430 Z" fill="#FFA000" stroke="#FFE082" strokeWidth="2" />

              {/* Tiger Cub Mascot (Tigern) */}
              <g transform="translate(220, 255)">
                {/* Tiger Body */}
                <ellipse cx="65" cy="115" rx="36" ry="40" fill="#FF8F00" />
                <ellipse cx="65" cy="120" rx="22" ry="25" fill="#FFF3E0" />
                {/* Stripes on body */}
                <path d="M 32,105 L 44,108 M 32,118 L 46,120" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
                <path d="M 98,105 L 86,108 M 98,118 L 84,120" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
                {/* Tiger Ears */}
                <circle cx="34" cy="38" r="14" fill="#FF8F00" />
                <circle cx="34" cy="38" r="8" fill="#FFF3E0" />
                <circle cx="96" cy="38" r="14" fill="#FF8F00" />
                <circle cx="96" cy="38" r="8" fill="#FFF3E0" />
                {/* Tiger Head */}
                <circle cx="65" cy="65" r="36" fill="#FF8F00" />
                {/* Stripes on forehead */}
                <path d="M 65,36 L 65,48 M 56,42 L 62,45 M 74,42 L 68,45" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
                {/* White Cheeks */}
                <ellipse cx="48" cy="74" rx="14" ry="10" fill="#FFF3E0" />
                <ellipse cx="82" cy="74" rx="14" ry="10" fill="#FFF3E0" />
                {/* Eyes */}
                <ellipse cx="50" cy="56" rx="6" ry="8" fill="#1C1816" />
                <circle cx="48" cy="53" r="2.2" fill="#FFFFFF" />
                <ellipse cx="80" cy="56" rx="6" ry="8" fill="#1C1816" />
                <circle cx="78" cy="53" r="2.2" fill="#FFFFFF" />
                {/* Nose & Smile */}
                <polygon points="65,70 61,65 69,65" fill="#D84315" />
                <path d="M 58,76 Q 65,82 72,76" fill="none" stroke="#3E2723" strokeWidth="2.5" strokeLinecap="round" />
                {/* Paws */}
                <ellipse cx="42" cy="155" rx="14" ry="10" fill="#FF8F00" />
                <ellipse cx="88" cy="155" rx="14" ry="10" fill="#FF8F00" />
                {/* Tiger Paw holding mango slice */}
                <path d="M 38,90 Q 55,80 70,95 Q 55,105 38,90 Z" fill="#FFA000" stroke="#FFE082" strokeWidth="2" />
              </g>
            </g>
          )}

          {(fruitKey === 'bundle_all' || fruitKey === 'bundle_berries') && (
            <g transform="translate(60, 260)">
              {/* Multi-Fruit Medley Array */}
              <circle cx="70" cy="80" r="35" fill="#D42034" opacity="0.9" />
              <circle cx="150" cy="70" r="38" fill="#FF8F00" opacity="0.9" />
              <circle cx="210" cy="100" r="32" fill="#2B153D" opacity="0.9" />
              <circle cx="100" cy="130" r="32" fill="#FCD32B" opacity="0.9" />
              <circle cx="170" cy="140" r="34" fill="#E91E63" opacity="0.9" />
              <text x="140" y="105" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="bold">
                6-MIX
              </text>
            </g>
          )}

          {/* Bottom Cream Trust Bar Panel (Off-white / Cream `#FAF7F0`) */}
          <g transform="translate(42, 455)">
            <path
              d="M 5,0 L 311,0 L 311,55 Q 311,85 288,90 C 230,100 90,100 30,90 Q 5,85 5,55 Z"
              fill="url(#bottomPanelGrad)"
            />
            {/* Top border line */}
            <line x1="5" y1="0" x2="311" y2="0" stroke="#E5DEC9" strokeWidth="1" />

            {/* Trust Icon 1: 100% FRUKT / 1 INGREDIENS */}
            <g transform="translate(38, 28)">
              <circle cx="0" cy="0" r="13" fill="none" stroke="#134725" strokeWidth="1.8" />
              {/* Leaf in circle */}
              <path d="M -4,4 C -6,-4 0,-7 5,-6 C 6,0 2,5 -4,4 Z" fill="#134725" />
              <text x="0" y="19" textAnchor="middle" fill="#134725" fontSize="8" fontWeight="800" letterSpacing="0.04em">100%</text>
              <text x="0" y="27" textAnchor="middle" fill="#134725" fontSize="7.5" fontWeight="700">{language === 'sv' ? 'FRUKT' : 'FRUIT'}</text>
              <text x="0" y="36" textAnchor="middle" fill="#586E5D" fontSize="6.5" fontWeight="600">{language === 'sv' ? '1 INGREDIENS' : '1 INGREDIENT'}</text>
            </g>

            {/* Divider 1 */}
            <line x1="88" y1="12" x2="88" y2="68" stroke="#E2DAC6" strokeWidth="1" />

            {/* Trust Icon 2: UTAN TILLSATSER */}
            <g transform="translate(138, 28)">
              {/* Sprout Icon */}
              <path d="M 0,7 L 0,-2 M 0,-2 C -6,-6 -6,-1 0,-2 M 0,-2 C 6,-6 6,-1 0,-2" stroke="#134725" strokeWidth="1.8" strokeLinecap="round" fill="#134725" />
              <text x="0" y="20" textAnchor="middle" fill="#134725" fontSize="7.5" fontWeight="800">{language === 'sv' ? 'UTAN' : 'ZERO'}</text>
              <text x="0" y="29" textAnchor="middle" fill="#134725" fontSize="7" fontWeight="700">{language === 'sv' ? 'TILLSATSER' : 'ADDITIVES'}</text>
            </g>

            {/* Divider 2 */}
            <line x1="188" y1="12" x2="188" y2="68" stroke="#E2DAC6" strokeWidth="1" />

            {/* Trust Icon 3: NATURLIGT GOTT */}
            <g transform="translate(236, 28)">
              {/* Heart Icon */}
              <path d="M 0,4 C -6,-2 -7,-9 -1,-8 C 0,-6 0,-6 0,-6 C 0,-6 0,-6 1,-8 C 7,-9 6,-2 0,4 Z" fill="none" stroke="#134725" strokeWidth="1.8" strokeLinejoin="round" />
              <text x="0" y="19" textAnchor="middle" fill="#134725" fontSize="7.5" fontWeight="800">{language === 'sv' ? 'NATURLIGT' : 'NATURALLY'}</text>
              <text x="0" y="28" textAnchor="middle" fill="#134725" fontSize="7.5" fontWeight="700">{language === 'sv' ? 'GOTT' : 'GOOD'}</text>
            </g>

            {/* Divider 3 */}
            <line x1="272" y1="12" x2="272" y2="68" stroke="#E2DAC6" strokeWidth="1" />

            {/* Weight: 15 g e */}
            <g transform="translate(292, 42)">
              <text x="0" y="0" textAnchor="middle" fill="#134725" fontSize="13" fontWeight="700">
                15 g<tspan fontSize="11" fontWeight="400"> e</tspan>
              </text>
            </g>
          </g>

          {/* Realistic Specular Gloss Overlay */}
          <path
            d="M 40,65 Q 40,45 65,45 L 335,45 Q 360,45 360,65 L 355,510 Q 355,540 330,545 C 270,555 130,555 70,545 Q 45,540 45,510 Z"
            fill="url(#pouchHighlight)"
            pointerEvents="none"
          />

        </g>
      </svg>
    </div>
  );
};
