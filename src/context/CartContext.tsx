import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { useLanguage } from './LanguageContext';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number, isSubscription?: boolean) => void;
  removeFromCart: (productId: string, isSubscription?: boolean) => void;
  updateQuantity: (productId: string, quantity: number, isSubscription?: boolean) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  promoCode: string;
  isPromoApplied: boolean;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  discountAmount: number;
  shippingFee: number;
  freeShippingThreshold: number;
  amountUntilFreeShipping: number;
  total: number;
  toastMessage: string | null;
  clearToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 349;
const STANDARD_SHIPPING_FEE = 39;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('skorda_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('skorda_cart', JSON.stringify(items));
  }, [items]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const clearToast = () => setToastMessage(null);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product: Product, quantity = 1, isSubscription = false) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && !!item.isSubscription === !!isSubscription
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && !!item.isSubscription === !!isSubscription
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          isSubscription,
          frequency: isSubscription ? 'monthly' : undefined,
        },
      ];
    });

    const subscriptionText = isSubscription
      ? (language === 'sv' ? ' (Månadsprenumeration - 15% rabatt)' : ' (Monthly Subscription - 15% off)')
      : '';
    const productName = product.name[language] || product.name.sv;
    const addedText = language === 'sv' ? 'lades i varukorgen' : 'added to cart';
    showToast(`${productName}${subscriptionText} ${addedText}`);
  };

  const removeFromCart = (productId: string, isSubscription = false) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && !!item.isSubscription === !!isSubscription)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, isSubscription = false) => {
    if (quantity <= 0) {
      removeFromCart(productId, isSubscription);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && !!item.isSubscription === !!isSubscription
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromoCode = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'FIKA10' || trimmed === 'MELLANMAL' || trimmed === 'LOHAS' || trimmed === 'FRUITA10') {
      setPromoCode(trimmed);
      setIsPromoApplied(true);
      showToast(language === 'sv' ? 'Rabattkod tillämpad (10% extra rabatt)!' : 'Promo code applied (10% extra discount)!');
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setPromoCode('');
    setIsPromoApplied(false);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Subtotal with subscription unit price support
  const subtotal = items.reduce((sum, item) => {
    const unitPrice = item.isSubscription
      ? item.product.subscriptionPrice
      : item.product.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  const discountAmount = isPromoApplied ? Math.round(subtotal * 0.1) : 0;
  const afterDiscount = Math.max(0, subtotal - discountAmount);

  const shippingFee =
    items.length === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD
      ? 0
      : STANDARD_SHIPPING_FEE;

  const amountUntilFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - afterDiscount
  );

  const total = items.length === 0 ? 0 : afterDiscount + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        promoCode,
        isPromoApplied,
        applyPromoCode,
        removePromoCode,
        discountAmount,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountUntilFreeShipping,
        total,
        toastMessage,
        clearToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
