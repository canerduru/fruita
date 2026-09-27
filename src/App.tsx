import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBadges } from './components/TrustBadges';
import { ProductsSection } from './components/ProductsSection';
import { EducationalSection } from './components/EducationalSection';
import { MellanmålGuide } from './components/MellanmålGuide';
import { TransparencyStory } from './components/TransparencyStory';
import { CertificationsSustainability } from './components/CertificationsSustainability';
import { Testimonials } from './components/Testimonials';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Toast } from './components/Toast';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-[#FAF8F5] bg-grain text-[#17231A] flex flex-col font-sans selection:bg-[#E2D8C6] selection:text-[#14281B] relative">
            {/* Header with Navigation, Language Switcher, Cart Counter & Supabase Auth Trigger */}
            <Header />

            {/* Main Page Flow */}
            <main className="flex-1">
              {/* Hero: Parent-Child imagery, Fika & Mellanmål cultural hooks */}
              <Hero />

              {/* Trust Badges: Clean Label, 0% Sugar, KRAV standard, 98% Vitamins */}
              <TrustBadges />

              {/* Product Showcase (B2C E-Commerce in SEK) */}
              <ProductsSection />

              {/* Educational Section (Why Freeze-Dried? 3 Steps + Comparison Table) */}
              <EducationalSection />

              {/* Swedish Mellanmål & Fika Inspiration Guide */}
              <MellanmålGuide />

              {/* Transparency & LOHAS Story (From Aegean/Anatolian Sun to Nordic Table) */}
              <TransparencyStory />

              {/* Certifications & Sustainability (KRAV, EU Organic & Mono-Material Packaging) */}
              <CertificationsSustainability />

              {/* Parent Testimonials from Swedish Families */}
              <Testimonials />

              {/* Newsletter & Promo Code Giveaway (FIKA10) */}
              <Newsletter />
            </main>

            {/* Footer with Nordic and Origin links */}
            <Footer />

            {/* Interactive Drawers & Modals */}
            <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />
            <CheckoutModal
              isOpen={isCheckoutOpen}
              onClose={() => setIsCheckoutOpen(false)}
            />
            <AuthModal />
            <Toast />
          </div>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
