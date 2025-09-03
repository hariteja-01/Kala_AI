"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/HeroSection';
import { UploadSection } from '@/components/UploadSection';
import { ResultsSection } from '@/components/ResultsSection';
import { LoadingSection } from '@/components/LoadingSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [currentSection, setCurrentSection] = useState<'hero' | 'upload' | 'loading' | 'results'>('hero');
  const [analysisData, setAnalysisData] = useState(null);

  const handleGetStarted = () => {
    setCurrentSection('upload');
  };

  const handleImageUpload = async (file: File) => {
    setCurrentSection('loading');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/analyze`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Analysis failed');
      }
      
      const result = await response.json();
      setAnalysisData(result.data);
      setCurrentSection('results');
    } catch (error) {
      console.error('Upload error:', error);
      setCurrentSection('upload');
    }
  };

  const handleReset = () => {
    setCurrentSection('hero');
    setAnalysisData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {currentSection === 'hero' && (
          <HeroSection onGetStarted={handleGetStarted} />
        )}
        
        {currentSection === 'upload' && (
          <UploadSection onImageUpload={handleImageUpload} onBack={() => setCurrentSection('hero')} />
        )}
        
        {currentSection === 'loading' && (
          <LoadingSection />
        )}
        
        {currentSection === 'results' && analysisData && (
          <ResultsSection data={analysisData} onReset={handleReset} />
        )}
        
        <Footer />
      </motion.div>
    </div>
  );
}