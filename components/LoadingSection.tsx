"use client";

import { motion } from 'framer-motion';
import { Sparkles, Palette, Globe, Heart } from 'lucide-react';

const loadingSteps = [
  { icon: Sparkles, text: "Analyzing your beautiful craft...", delay: 0 },
  { icon: Palette, text: "Discovering cultural heritage...", delay: 1 },
  { icon: Globe, text: "Identifying regional artistry...", delay: 2 },
  { icon: Heart, text: "Crafting your story...", delay: 3 },
];

export function LoadingSection() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative mb-8">
            <motion.div
              className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-16 w-16 text-white" />
            </motion.div>
            
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-orange-200"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            AI Cultural Analysis
          </h2>
          <p className="text-slate-600 mb-8">
            Discovering the heritage and beauty of your craft
          </p>
          
          <div className="space-y-6">
            {loadingSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: step.delay * 0.8 }}
                className="flex items-center text-left bg-white/40 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center mr-4">
                  <step.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-slate-700 font-medium">{step.text}</span>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="mt-8 flex justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-orange-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}