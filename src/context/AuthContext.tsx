import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (email: string, name?: string) => Promise<void>;
  register: (email: string, name: string) => Promise<void>;
  guestLogin: () => void;
  logout: () => void;
  savedFavorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('skorda_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [savedFavorites, setSavedFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('skorda_favorites');
      return saved ? JSON.parse(saved) : ['prod-jordgubb'];
    } catch {
      return ['prod-jordgubb'];
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('skorda_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('skorda_auth_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('skorda_favorites', JSON.stringify(savedFavorites));
  }, [savedFavorites]);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const login = async (email: string, name?: string) => {
    // Simulated Supabase Auth response
    const mockUser: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      email,
      name: name || email.split('@')[0],
      isLoggedIn: true,
      points: 150,
    };
    setUser(mockUser);
    setIsAuthModalOpen(false);
  };

  const register = async (email: string, name: string) => {
    const mockUser: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      email,
      name,
      isLoggedIn: true,
      points: 200,
    };
    setUser(mockUser);
    setIsAuthModalOpen(false);
  };

  const guestLogin = () => {
    const mockUser: User = {
      id: 'guest_' + Math.random().toString(36).substring(2, 7),
      email: 'gast@skordanatur.se',
      name: 'Gäst',
      isLoggedIn: true,
      points: 0,
    };
    setUser(mockUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFavorite = (productId: string) => {
    setSavedFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isFavorite = (productId: string) => savedFavorites.includes(productId);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        guestLogin,
        logout,
        savedFavorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
