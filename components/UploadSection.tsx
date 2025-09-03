"use client";

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, ArrowLeft, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface UploadSectionProps {
  onImageUpload: (file: File) => void;
  onBack: () => void;
}

export function UploadSection({ onImageUpload, onBack }: UploadSectionProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setIsUploading(true);
      
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive, isDragAccept } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    disabled: isUploading
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-8 text-slate-600 hover:text-slate-800"
            disabled={isUploading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Share Your <span className="text-orange-500">Masterpiece</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-md mx-auto">
              Upload a photo of your beautiful craft and let AI tell its cultural story
            </p>
          </div>

          <Card className="p-8 bg-white/60 backdrop-blur-md border-2 border-dashed border-orange-200 hover:border-orange-300 transition-all duration-300">
            <div
              {...getRootProps()}
              className={`cursor-pointer rounded-xl p-12 text-center transition-all duration-300 ${
                isDragActive 
                  ? 'bg-orange-50 border-orange-400' 
                  : 'hover:bg-orange-25'
              } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
            >
              <input {...getInputProps()} />
              
              {!isUploading ? (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mx-auto w-24 h-24 mb-6">
                    {isDragActive ? (
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center animate-bounce">
                        <Upload className="h-10 w-10 text-white" />
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center border-2 border-orange-200">
                        <ImageIcon className="h-10 w-10 text-orange-500" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-slate-800 mb-3">
                    {isDragActive ? 'Release to Upload' : 'Upload Your Craft'}
                  </h3>
                  
                  <p className="text-slate-600 mb-6">
                    Drag and drop your craft photo here, or click to browse
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-slate-500 max-w-sm mx-auto">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      JPEG, PNG, WebP
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Max 10MB
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-white animate-pulse" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    Analyzing Your Craft...
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Our AI is discovering the cultural heritage of your beautiful creation
                  </p>
                  <div className="max-w-xs mx-auto">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-sm text-slate-500 mt-2">{uploadProgress}% complete</p>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
          
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="font-semibold text-slate-800">Upload</h4>
              <p className="text-sm text-slate-600">Share your craft photo</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="font-semibold text-slate-800">Analyze</h4>
              <p className="text-sm text-slate-600">AI discovers cultural heritage</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="font-semibold text-slate-800">Transform</h4>
              <p className="text-sm text-slate-600">Get market-ready content</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}