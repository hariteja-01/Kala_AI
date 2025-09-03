"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Users } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-orange-500 mr-3" />
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Kala-AI
            </h1>
            <Sparkles className="h-8 w-8 text-orange-500 ml-3" />
          </div>
          
          <motion.p
            className="text-xl md:text-2xl text-slate-700 mb-4 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            भारतीय कारीगरों की शक्ति: एक फोटो से डिजिटल दुकान तक
          </motion.p>
          
          <motion.p
            className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Transform your craft into a market-ready digital storefront with AI-powered cultural storytelling, 
            authentic product descriptions, and compelling marketing content
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Begin Your Journey
            </Button>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-lg">
              <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Cultural Heritage</h3>
              <p className="text-slate-600">AI-powered storytelling that honors your craft's rich cultural heritage and traditional significance</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-lg">
              <Sparkles className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Smart Analysis</h3>
              <p className="text-slate-600">Advanced AI identifies your art form, materials, and regional style with deep cultural understanding</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-lg">
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Market Ready</h3>
              <p className="text-slate-600">Generate compelling product descriptions, pricing strategies, and marketing content instantly</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}