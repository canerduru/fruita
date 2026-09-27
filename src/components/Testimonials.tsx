import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Star, Quote, Heart } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { t, language } = useLanguage();

  const reviews = [
    {
      text: t.testimonials.t1Text,
      author: t.testimonials.t1Author,
      role: t.testimonials.t1Role,
      city: 'Göteborg',
      stars: 5,
    },
    {
      text: t.testimonials.t2Text,
      author: t.testimonials.t2Author,
      role: t.testimonials.t2Role,
      city: 'Stockholm',
      stars: 5,
    },
    {
      text: t.testimonials.t3Text,
      author: t.testimonials.t3Author,
      role: t.testimonials.t3Role,
      city: 'Uppsala',
      stars: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#2D4033] bg-[#E8EFEA] px-3 py-1 rounded-full border border-[#CAD8CE]">
            <Heart className="w-3.5 h-3.5 text-[#C85D3D] fill-[#C85D3D]" />
            <span>{language === 'sv' ? 'Omtyckt av Föräldrar' : 'Loved by Nordic Families'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif-nordic font-normal text-[#1A261D] tracking-tight">
            {t.testimonials.title}
          </h2>

          <p className="text-sm sm:text-base text-[#4E5D52] font-light">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#F5EFE6] rounded-2xl p-6 sm:p-8 border border-[#E3DAD0] flex flex-col justify-between shadow-2xs hover:shadow-sm transition-all"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#C88A3B]">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#3E4E42] italic leading-relaxed">
                  {rev.text}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#E8DFD3] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-xs text-[#19271E]">
                    {rev.author}
                  </div>
                  <div className="text-[11px] text-[#617467]">
                    {rev.role}
                  </div>
                </div>
                <span className="text-[10px] font-medium text-[#2D4033] bg-[#E8EFEA] px-2 py-0.5 rounded-md">
                  {language === 'sv' ? 'Verifierat köp' : 'Verified purchase'}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
