import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function VariantNav() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const currentPath = location.pathname;

  const links = [
    { path: '/', label: '🌿 A (Nordic)', shortLabel: '🌿 A' },
    { path: '/bold', label: '⚡ B (Bold)', shortLabel: '⚡ B' },
    { path: '/bold2', label: '🦊 B2 (Gerçek)', shortLabel: '🦊 B2' },
    { path: '/pure', label: '🍏 C (Pure)', shortLabel: '🍏 C' },
    { path: '/kinetic', label: '✨ D (Kinetic)', shortLabel: '✨ D' },
    { path: '/showcase', label: '📋 Karşılaştır', shortLabel: '📋 Tümü' },
  ];

  return (
    <aside
      aria-label="Tasarım varyantları geçiş menüsü"
      className="variant-nav-container"
      style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        background: 'rgba(23, 35, 26, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: collapsed ? '6px 12px' : '5px 6px 5px 10px',
        borderRadius: 9999,
        boxShadow: '0 12px 36px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.15)',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 12,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        maxWidth: '96vw',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <style>{`
        .variant-nav-container::-webkit-scrollbar { display: none; }
        .vnav-label-full { display: inline; }
        .vnav-label-short { display: none; }
        .vnav-title-tag { display: inline-block; }

        @media (max-width: 640px) {
          .vnav-label-full { display: none; }
          .vnav-label-short { display: inline; }
          .vnav-title-tag { display: none; }
          .vnav-link-btn { padding: 5px 8px !important; font-size: 11px !important; }
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
        <img
          src={`${import.meta.env.BASE_URL}images/logo-white.png`}
          alt="Fruita"
          style={{ height: 16, width: 'auto', objectFit: 'contain', marginRight: 2 }}
        />
        {!collapsed && (
          <span
            className="vnav-title-tag"
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              fontSize: 10,
              marginRight: 2,
              whiteSpace: 'nowrap',
            }}
          >
            Tasarım:
          </span>
        )}
      </div>

      {!collapsed ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
          {links.map((link) => {
            const isActive = currentPath === link.path || (link.path === '/' && currentPath === '');
            return (
              <Link
                key={link.path}
                to={link.path}
                className="vnav-link-btn"
                style={{
                  padding: '5px 11px',
                  borderRadius: 9999,
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 12,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  background: isActive ? '#fff' : 'transparent',
                  color: isActive ? '#17231A' : 'rgba(255,255,255,0.8)',
                  boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.25)' : 'none',
                  flexShrink: 0,
                }}
              >
                <span className="vnav-label-full">{link.label}</span>
                <span className="vnav-label-short">{link.shortLabel}</span>
              </Link>
            );
          })}
        </div>
      ) : null}

      <button
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? 'Menüyü Genişlet' : 'Küçült'}
        style={{
          background: 'rgba(255,255,255,0.1)',
          border: 'none',
          color: 'rgba(255,255,255,0.85)',
          cursor: 'pointer',
          padding: '4px 7px',
          borderRadius: 9999,
          fontSize: 10,
          fontWeight: 600,
          marginLeft: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexShrink: 0,
        }}
      >
        {collapsed ? '🎨 Varyantlar' : '✕'}
      </button>
    </aside>
  );
}

