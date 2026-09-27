import React from 'react';
import { Link } from 'react-router-dom';

const VARIANTS = [
  {
    id: 'variant-a',
    path: '/',
    label: 'Variant A',
    style: 'Nordic Minimal',
    description: 'Clean Scandinavian aesthetic — forest greens, warm beige, elegant typography.',
    palette: ['#2D4033', '#FAF8F5', '#E2D8C6', '#8B6E4A'],
    emoji: '🌿',
    badge: 'Current Design',
    badgeColor: '#2D4033',
  },
  {
    id: 'variant-b',
    path: '/bold',
    label: 'Variant B',
    style: 'Bold & Playful',
    description: 'High-energy design — big typography, floating fruits, diagonal sections, vibrant colors.',
    palette: ['#E8344A', '#FFD700', '#6DBF4F', '#6A3CB5'],
    emoji: '🚀',
    badge: 'Farsking Inspired',
    badgeColor: '#E8344A',
  },
  {
    id: 'variant-c',
    path: '/pure',
    label: 'Variant C',
    style: 'Nordic Pure (Apple HIG)',
    description: 'Bright-but-soft "Sage Sauna" palette, 10:1 ratio slider, school backpack builder & Swish checkout.',
    palette: ['#3D6647', '#FAF8F5', '#BA6A46', '#1F2A37'],
    emoji: '🍏',
    badge: 'Apple & Spells',
    badgeColor: '#3D6647',
  },
  {
    id: 'variant-d',
    path: '/kinetic',
    label: 'Variant D',
    style: 'Kinetic & Scrollytelling',
    description: 'Anime.js staggered choreography, scroll-driven -40°C sublimation narrative, and Crunch Lab.',
    palette: ['#0C0F12', '#E8344A', '#EAB308', '#06D6A0'],
    emoji: '⚡',
    badge: 'Anime.js + Scroll',
    badgeColor: '#E8344A',
  },
];

export default function Showcase() {
  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .variant-card { transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1); }
        .variant-card:hover { transform: translateY(-12px) scale(1.02); }
        .view-btn { transition: all 0.2s ease; }
        .view-btn:hover { transform: scale(1.05); }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{ fontSize: 48, marginBottom: 16, animation: 'float 3s ease-in-out infinite' }}>🍓</div>
        <h1 style={{
          color: '#fff', fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900,
          margin: '0 0 12px', letterSpacing: -1
        }}>Fruita — Design Variants</h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 600, fontSize: 16, margin: 0 }}>
          Compare all four designs and choose the direction for your brand
        </p>
      </div>

      {/* Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 28, maxWidth: 1120, width: '100%',
      }}>
        {VARIANTS.map(v => (
          <div key={v.id} className="variant-card" style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 24, overflow: 'hidden',
          }}>
            {/* Preview swatch */}
            <div style={{
              height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `linear-gradient(135deg, ${v.palette[0]}, ${v.palette[1]})`,
              position: 'relative'
            }}>
              {/* Color dots */}
              <div style={{ display: 'flex', gap: 10 }}>
                {v.palette.map((c, i) => (
                  <div key={i} style={{
                    width: 36, height: 36, borderRadius: '50%', background: c,
                    border: '3px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }} />
                ))}
              </div>
              {/* Badge */}
              <div style={{
                position: 'absolute', top: 14, right: 14,
                background: v.badgeColor, color: '#fff',
                borderRadius: 50, padding: '5px 12px',
                fontSize: 11, fontWeight: 800, letterSpacing: 0.5
              }}>{v.badge}</div>
              <div style={{ position: 'absolute', top: 14, left: 14, fontSize: 32 }}>{v.emoji}</div>
            </div>

            {/* Info */}
            <div style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>{v.label}</span>
                <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 22, margin: 0 }}>{v.style}</h2>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6, fontWeight: 600, margin: '0 0 24px' }}>
                {v.description}
              </p>
              <Link to={v.path} style={{ textDecoration: 'none' }}>
                <button className="view-btn" style={{
                  width: '100%', background: '#fff', color: '#111',
                  border: 'none', borderRadius: 14, padding: '14px 0',
                  fontWeight: 900, fontSize: 15, cursor: 'pointer', letterSpacing: 0.5
                }}>
                  View Design →
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, fontWeight: 600, marginTop: 48, textAlign: 'center' }}>
        Fruita · Design Preview · Share this link with your team
      </p>
    </div>
  );
}
