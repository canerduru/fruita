import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import VariantB from './variants/VariantB.tsx';
import Showcase from './pages/Showcase.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Showcase: compare all variants */}
        <Route path="/showcase" element={<Showcase />} />
        {/* Variant A: original Nordic Minimal */}
        <Route path="/*" element={<App />} />
        {/* Variant B: Bold & Playful (Farsking-inspired) */}
        <Route path="/bold" element={<VariantB />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
