'use client';

import { useEffect, useState } from 'react';
import Navbar from './Navbar';

export default function ClientNavbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200/50 h-20">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl"></div>
            <span className="text-2xl font-bold">AI Recorder</span>
          </div>
        </div>
      </nav>
    );
  }

  return <Navbar />;
}
