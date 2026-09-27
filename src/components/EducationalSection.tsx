import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sun, Snowflake, Wind, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

export const EducationalSection: React.FC = () => {
  const { t, language } = useLanguage();

  const steps = [
    {
      num: '01',
      icon: Sun,
      title: t.education.step1Title,
      desc: t.education.step1Desc,
      highlight: language === 'sv' ? 'Solmogen skörd' : 'Peak ripeness',
    },
    {
      num: '02',
      icon: Snowflake,
      title: t.education.step2Title,
      desc: t.education.step2Desc,
      highlight: language === 'sv' ? '-40°C Chockfrysning' : '-40°C Flash freeze',
    },
    {
      num: '03',
      icon: Wind,
      title: t.education.step3Title,
      desc: t.education.step3Desc,
      highlight: language === 'sv' ? 'Vakuum & Sublimering' : 'Vacuum sublimation',
    },
  ];

  return (
    <section id="varfor-frystorkat" className="py-16 sm:py-24 bg-[#F5EFE6] border-y border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Introduction */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#2D4033] bg-[#E8EFEA] px-3 py-1 rounded-full border border-[#CAD8CE]">
            <Sparkles className="w-3.5 h-3.5 text-[#375F43]" />
            <span>{language === 'sv' ? 'Vetenskapen bakom krispet' : 'The Science of the Crunch'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif-nordic font-normal text-[#1A261D] tracking-tight">
            {t.education.title}
          </h2>

          <p className="text-sm sm:text-base text-[#4E5D52] font-light leading-relaxed">
            {t.education.subtitle}
          </p>
        </div>

        {/* 3 Step Iconographic Journey */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E3DAD0] shadow-xs flex flex-col justify-between"
              >
                {/* Step Number Stamp */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-serif-nordic font-bold text-[#A89886]">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#2D4033] text-[#E4C590] flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#35523D]">
                    {step.highlight}
                  </div>
                  <h3 className="text-lg font-serif-nordic font-semibold text-[#18261C]">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526357] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Metric Comparison Cards (Infographic Style) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E3DAD0] shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A27]">
                {language === 'sv' ? 'Vitaminer & Näring' : 'Vitamins & Nutrition'}
              </span>
              <span className="text-xs font-black text-emerald-800 bg-[#E8EFEA] px-2.5 py-0.5 rounded-full">
                {language === 'sv' ? '5x Bättre' : '5x Better'}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold text-[#17231A] mb-1">
                  <span>{language === 'sv' ? 'Fruita Frystorkad' : 'Fruita Freeze-Dried'}</span>
                  <span className="text-emerald-700 font-black">{language === 'sv' ? '98% bevarat' : '98% retained'}</span>
                </div>
                <div className="w-full bg-[#E5DDCF] h-3 rounded-full overflow-hidden p-0.5">
                  <div className="bg-[#1E3A27] h-full rounded-full w-[98%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-stone-500 mb-1">
                  <span>{language === 'sv' ? 'Vanlig ugnstorkad frukt' : 'Conventional dried fruit'}</span>
                  <span>{language === 'sv' ? '~20% kvar' : '~20% remaining'}</span>
                </div>
                <div className="w-full bg-[#E5DDCF] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-stone-400 h-full rounded-full w-[20%]" />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              {language === 'sv' 
                ? 'Eftersom frukten aldrig hettas upp över 30°C bevaras värmekänsliga antioxidanter och C-vitamin.' 
                : 'Because fruit is never heated above 30°C, heat-sensitive vitamins and antioxidants remain intact.'}
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E3DAD0] shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A27]">
                {language === 'sv' ? 'Tillsatser & Socker' : 'Additives & Sugar'}
              </span>
              <span className="text-xs font-black text-emerald-800 bg-[#E8EFEA] px-2.5 py-0.5 rounded-full">
                {language === 'sv' ? '0% Trams' : '0% Nonsense'}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold text-[#17231A] mb-1">
                  <span>{language === 'sv' ? 'Fruita Tillsatser' : 'Fruita Additives'}</span>
                  <span className="text-emerald-700 font-black">{language === 'sv' ? '0% (1 ingrediens)' : '0% (1 ingredient)'}</span>
                </div>
                <div className="w-full bg-[#E5DDCF] h-3 rounded-full overflow-hidden p-0.5">
                  <div className="bg-emerald-600 h-full rounded-full w-[100%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-stone-500 mb-1">
                  <span>{language === 'sv' ? 'Godis & fruktsnacks' : 'Candy & fruit gummies'}</span>
                  <span>{language === 'sv' ? '40-60% socker/sulfit' : '40-60% sugar/sulfites'}</span>
                </div>
                <div className="w-full bg-[#E5DDCF] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-rose-400 h-full rounded-full w-[60%]" />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              {language === 'sv'
                ? 'Inga e-ämnen, sulfiter för färgbevaring eller tillsatt socker. Ren natur.'
                : 'Zero e-numbers, sulfites for color retention, or refined sugar. Pure nature.'}
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E3DAD0] shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A27]">
                {language === 'sv' ? 'Konsistens & Kladd' : 'Texture & Cleanliness'}
              </span>
              <span className="text-xs font-black text-[#1E3A27] bg-[#E8EFEA] px-2.5 py-0.5 rounded-full">
                {language === 'sv' ? '100% Krispig' : '100% Crunchy'}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#17231A]">
                <span className="text-base">✨</span>
                <span>{language === 'sv' ? 'Luftigt knaprig & smälter på tungan' : 'Airy crisp & melts on tongue'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <span className="text-base">🎒</span>
                <span>{language === 'sv' ? 'Kladdfri i skolbänken & jackfickan' : 'Mess-free in school desk & jacket'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <span className="text-base">🌿</span>
                <span>{language === 'sv' ? 'Koncentrerad naturlig sötma utan sirap' : 'Concentrated natural fruit sweetness'}</span>
              </div>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed pt-1">
              {language === 'sv'
                ? 'Perfekt för barn som tröttnat på mosiga bananer eller sega torkade frukter som fastnar i tänderna.'
                : 'Ideal for kids tired of bruised fruit or sticky snacks stuck between teeth.'}
            </p>
          </div>
        </div>

        {/* Detailed Comparison Table: Clean Label Freeze-Dried vs. Traditional Dried Fruit */}
        <div className="mt-12 bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border border-[#E5DDD0] shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-serif-nordic font-semibold text-[#1A261D]">
              {t.education.compareTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#5A6D60] mt-1">
              {language === 'sv'
                ? 'Varför frystorkning överträffar ugnstorkning och sockrade fruktsnacks.'
                : 'Why freeze-drying outperforms traditional oven-dried and candied snacks.'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E8DFD3] text-[#2D4033]">
                  <th className="py-3 px-4 font-semibold w-1/3">
                    {t.education.compareCol1}
                  </th>
                  <th className="py-3 px-4 font-bold bg-[#E8EFEA]/80 rounded-t-xl text-[#1E3A27] w-1/3">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2D5A38]" />
                      <span>{t.education.compareCol2}</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 font-medium text-stone-500 w-1/3">
                    <div className="flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-stone-400" />
                      <span>{t.education.compareCol3}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE7DC]">
                <tr>
                  <td className="py-3 px-4 font-medium text-stone-900">
                    {t.education.compareRow1Feature}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#1E3A27] bg-[#E8EFEA]/40">
                    {t.education.compareRow1Our}
                  </td>
                  <td className="py-3 px-4 text-stone-500">
                    {t.education.compareRow1Other}
                  </td>
                </tr>

                <tr>
                  <td className="py-3 px-4 font-medium text-stone-900">
                    {t.education.compareRow2Feature}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#1E3A27] bg-[#E8EFEA]/40">
                    {t.education.compareRow2Our}
                  </td>
                  <td className="py-3 px-4 text-stone-500">
                    {t.education.compareRow2Other}
                  </td>
                </tr>

                <tr>
                  <td className="py-3 px-4 font-medium text-stone-900">
                    {t.education.compareRow3Feature}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#1E3A27] bg-[#E8EFEA]/40">
                    {t.education.compareRow3Our}
                  </td>
                  <td className="py-3 px-4 text-stone-500">
                    {t.education.compareRow3Other}
                  </td>
                </tr>

                <tr>
                  <td className="py-3 px-4 font-medium text-stone-900">
                    {t.education.compareRow4Feature}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#1E3A27] bg-[#E8EFEA]/40">
                    {t.education.compareRow4Our}
                  </td>
                  <td className="py-3 px-4 text-stone-500">
                    {t.education.compareRow4Other}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
