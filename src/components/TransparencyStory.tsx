import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, HeartHandshake, Droplets, MapPin, Sparkles } from 'lucide-react';

export const TransparencyStory: React.FC = () => {
  const { t, language } = useLanguage();

  const regions = [
    {
      name: 'Silifke & Torosbergen',
      fruit: language === 'sv' ? 'Solmogna Jordgubbar' : 'Sun Strawberries',
      details: language === 'sv' ? 'Familjejordbruk med droppbevattning i kalkrika dalar' : 'Family growers using drip irrigation in limestone valleys',
      soil: language === 'sv' ? 'Medelhavssol & svalt källvatten' : 'Mediterranean sun & cool mountain springs',
    },
    {
      name: 'Aydın & Büyük Menderes',
      fruit: language === 'sv' ? 'Egeiska Fikon (Sarılop)' : 'Aegean Wild Figs',
      details: language === 'sv' ? 'Världens mest ansedda fikonmikroklimat sedan antiken' : 'World-renowned fig microclimate with zero sulfur treatment',
      soil: language === 'sv' ? 'Helt naturlig mognad på trädet' : '100% natural tree-ripening',
    },
    {
      name: 'Malatya Högplatå',
      fruit: language === 'sv' ? 'Gyllene Solaprikoser' : 'Golden Sun Apricots',
      details: language === 'sv' ? '1200 meters höjd över havet ger exceptionell mineralsötma' : '1,200m altitude imparting intense natural sugars',
      soil: language === 'sv' ? '100% SO₂-fri (Svavelfri ren etikett)' : '100% sulfur-free clean label',
    },
  ];

  return (
    <section id="var-berattelse" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#2D4033] bg-[#E8EFEA] px-3 py-1 rounded-full border border-[#CAD8CE]">
            <Sparkles className="w-3.5 h-3.5 text-[#375F43]" />
            <span>{language === 'sv' ? 'LOHAS & Vårt Ansvar' : 'LOHAS & Ethical Trade'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif-nordic font-normal text-[#1A261D] tracking-tight">
            {t.transparency.title}
          </h2>

          <p className="text-sm sm:text-base text-[#4E5D52] font-light leading-relaxed">
            {t.transparency.subtitle}
          </p>
        </div>

        {/* Narrative & Philosophy Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-[#47574B] leading-relaxed font-light">
            <p className="border-l-2 border-[#2D4033] pl-4 italic text-[#1F2E24] font-medium">
              {language === 'sv'
                ? 'Över 30% av svenska konsumenter tillhör LOHAS-segmentet — människor som värdesätter personlig hälsa, miljömässig hållbarhet och genuin transparens.'
                : 'Over 30% of Nordic consumers identify as LOHAS — individuals championing personal well-being, ecological sustainability, and radical transparency.'}
            </p>

            <p>{t.transparency.heritageP1}</p>
            <p>{t.transparency.heritageP2}</p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E8DFD3]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EAE2D5] text-[#2D4033] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#2D4033]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#18261C]">
                    {language === 'sv' ? '500+ Tester' : '500+ Tests'}
                  </h4>
                  <p className="text-[11px] text-[#556658]">
                    {language === 'sv' ? 'Noll spår av syntetiska bekämpningsmedel' : 'Zero traces of synthetic pesticide residues'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EAE2D5] text-[#2D4033] flex items-center justify-center shrink-0">
                  <Droplets className="w-4 h-4 text-[#2D4033]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#18261C]">
                    {language === 'sv' ? 'Vattenbesparing' : 'Water Conservation'}
                  </h4>
                  <p className="text-[11px] text-[#556658]">
                    {language === 'sv' ? 'Droppbevattning minskar vattenåtgång med 45%' : 'Drip irrigation cuts water consumption by 45%'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Harvest Interactive Cards */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-[#F4EFEA] rounded-2xl p-6 border border-[#E5DDD0]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#35523D] mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#A97E38]" />
                <span>{language === 'sv' ? 'Våra Utvalda Odlingsregioner' : 'Selected Growing Regions'}</span>
              </h3>

              <div className="space-y-3">
                {regions.map((reg, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs hover:border-[#2D4033]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-stone-900">{reg.name}</span>
                      <span className="text-xs font-semibold text-[#2D4033] bg-[#E8EFEA] px-2 py-0.5 rounded-md">
                        {reg.fruit}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">{reg.details}</p>
                    <div className="mt-2 text-[11px] text-stone-500 font-medium">
                      ✓ {reg.soil}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 4 Stats Grid */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DFD3] shadow-xs">
            <div className="text-3xl sm:text-4xl font-serif-nordic font-bold text-[#2D4033]">
              {t.transparency.stat1Number}
            </div>
            <div className="text-xs sm:text-sm text-[#4E5D52] mt-1 font-medium">
              {t.transparency.stat1Label}
            </div>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DFD3] shadow-xs">
            <div className="text-3xl sm:text-4xl font-serif-nordic font-bold text-[#2D4033]">
              {t.transparency.stat2Number}
            </div>
            <div className="text-xs sm:text-sm text-[#4E5D52] mt-1 font-medium">
              {t.transparency.stat2Label}
            </div>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DFD3] shadow-xs">
            <div className="text-3xl sm:text-4xl font-serif-nordic font-bold text-[#2D4033]">
              {t.transparency.stat3Number}
            </div>
            <div className="text-xs sm:text-sm text-[#4E5D52] mt-1 font-medium">
              {t.transparency.stat3Label}
            </div>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DFD3] shadow-xs">
            <div className="text-3xl sm:text-4xl font-serif-nordic font-bold text-[#2D4033]">
              {t.transparency.stat4Number}
            </div>
            <div className="text-xs sm:text-sm text-[#4E5D52] mt-1 font-medium">
              {t.transparency.stat4Label}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
