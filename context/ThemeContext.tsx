'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isAnimating: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    
    // Apply theme immediately
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (isAnimating) return; // Prevent multiple clicks
    
    setIsAnimating(true);
    
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Create animated overlay
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    
    // Set animation direction based on theme
    if (newTheme === 'dark') {
      overlay.style.animation = 'slideDownDark 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    } else {
      overlay.style.animation = 'slideUpLight 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    }
    
    document.body.appendChild(overlay);

    // Change theme at midpoint of animation
    setTimeout(() => {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, 300);

    // Remove overlay after animation
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.remove();
      }
      setIsAnimating(false);
    }, 600);
  };

  // Prevent flash of unstyled content
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isAnimating }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
