import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function VariantNav() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const currentPath = location.pathname;

  const links = [
    { path: '/', label: '🌿 Varyant A (Nordic)', shortLabel: 'A: Nordic' },
    { path: '/bold', label: '⚡ Varyant B (Bold)', shortLabel: 'B: Bold' },
    { path: '/pure', label: '🍏 Varyant C (Pure / Apple)', shortLabel: 'C: Pure' },
    { path: '/showcase', label: '📋 Karşılaştır', shortLabel: 'Showcase' },
  ];

  return (
    <aside
      aria-label="Tasarım varyantları geçiş menüsü"
      style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: 'rgba(23, 35, 26, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: collapsed ? '6px 12px' : '6px 8px 6px 14px',
        borderRadius: 9999,
        boxShadow: '0 10px 30px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.12)',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 13,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        maxWidth: '92vw',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{
          display: 'inline-block',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#48BB78',
          boxShadow: '0 0 8px #48BB78',
        }} />
        {!collapsed && (
          <span style={{
            color: 'rgba(255,255,255,0.6)',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontSize: 11,
            marginRight: 4,
            whiteSpace: 'nowrap',
          }}>
            Tasarım:
          </span>
        )}
      </div>

      {!collapsed ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {links.map((link) => {
            const isActive = currentPath === link.path || (link.path === '/' && currentPath === '');
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: '6px 12px',
                  borderRadius: 9999,
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 12,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  background: isActive ? '#fff' : 'transparent',
                  color: isActive ? '#17231A' : 'rgba(255,255,255,0.75)',
                  boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      ) : null}

      <button
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? 'Menüyü Genişlet' : 'Küçült'}
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: 'none',
          color: 'rgba(255,255,255,0.7)',
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: 9999,
          fontSize: 11,
          fontWeight: 600,
          marginLeft: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {collapsed ? '🎨 Tasarımlar' : '✕'}
      </button>
    </aside>
  );
}
