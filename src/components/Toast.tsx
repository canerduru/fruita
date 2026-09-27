import React from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, clearToast } = useCart();
  const { language } = useLanguage();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="bg-[#1F2E24] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#3E5645] flex items-center gap-3 text-xs max-w-sm">
        <CheckCircle2 className="w-4 h-4 text-[#87B393] shrink-0" />
        <span className="font-medium flex-1">{toastMessage}</span>
        <button
          onClick={clearToast}
          className="text-stone-400 hover:text-white transition-colors"
          aria-label={language === 'sv' ? 'Stäng notis' : 'Dismiss notification'}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
