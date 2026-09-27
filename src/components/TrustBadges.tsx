import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Ban, Award, Zap } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const { t, language } = useLanguage();

  const badges = [
    {
      icon: Sparkles,
      title: t.trustBadges.cleanLabel,
      desc: t.trustBadges.cleanLabelSub,
      tag: language === 'sv' ? '0% Kemi' : '0% Additives',
    },
    {
      icon: Ban,
      title: t.trustBadges.noSugar,
      desc: t.trustBadges.noSugarSub,
      tag: language === 'sv' ? '0% Socker' : '0% Added Sugar',
    },
    {
      icon: Award,
      title: t.trustBadges.kravStandards,
      desc: t.trustBadges.kravStandardsSub,
      tag: language === 'sv' ? 'Labbtestad' : 'Lab Tested',
    },
    {
      icon: Zap,
      title: t.trustBadges.nutrientRetention,
      desc: t.trustBadges.nutrientRetentionSub,
      tag: language === 'sv' ? '98% C-vitamin' : '98% Vitamin C',
    },
  ];

  return (
    <section className="bg-white/60 backdrop-blur-md border-y border-[#E8DFD3] py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E8DFD3] hover:border-[#1E3A27]/40 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E3A27] to-[#14281B] text-[#E4C590] flex items-center justify-center shrink-0 shadow-md shadow-[#1E3A27]/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-[#E4C590]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-sm font-black text-[#17231A] leading-snug">
                      {item.title}
                    </h2>
                    <span className="text-[10px] font-extrabold text-[#1E3A27] bg-[#EAF2EC] px-2 py-0.5 rounded-md border border-[#CAD8CE]">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[#526658] font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
