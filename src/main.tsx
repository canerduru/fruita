import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import VariantB from './variants/VariantB.tsx';
import Showcase from './pages/Showcase.tsx';
import { VariantNav } from './components/VariantNav.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <VariantNav />
      <Routes>
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/bold" element={<VariantB />} />
        <Route path="/" element={<App />} />
        <Route path="*" element={<App />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);

