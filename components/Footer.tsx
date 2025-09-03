"use client";

import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <span className="text-lg">Built with</span>
          <Heart className="h-5 w-5 text-red-500 mx-2" />
          <span className="text-lg">for Indian Artisans by</span>
          <span className="font-bold text-orange-400 ml-2">BharatCoders</span>
        </div>
        
        <div className="text-sm text-slate-400 space-y-2">
          <p>Empowering traditional craftsmanship through modern technology</p>
          <p>Celebrating भारत की कलाकारी • Preserving Heritage • Creating Future</p>
        </div>
        
        <div className="mt-6 pt-4 border-t border-slate-700">
          <p className="text-xs text-slate-500">
            © 2025 Kala-AI. Honoring Indian artisan traditions with AI innovation.
          </p>
        </div>
      </div>
    </footer>
  );
}