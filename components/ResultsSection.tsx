"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy, ArrowLeft, MapPin, Palette, Clock, Star } from 'lucide-react';
import { useState } from 'react';

interface ResultsSectionProps {
  data: any;
  onReset: () => void;
}

export function ResultsSection({ data, onReset }: ResultsSectionProps) {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set([...Array.from(prev), label]));
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set([...Array.from(prev)]);
          newSet.delete(label);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={onReset}
              className="text-slate-600 hover:text-slate-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Analyze Another Craft
            </Button>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-800">
                Your Craft's <span className="text-orange-500">Digital Story</span>
              </h1>
            </div>
            
            <div className="w-24" /> {/* Spacer for center alignment */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Analysis Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6 bg-white/70 backdrop-blur-md border border-orange-100">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                  <Palette className="mr-2 h-5 w-5 text-orange-500" />
                  Craft Analysis
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Art Form</label>
                    <p className="text-lg font-semibold text-slate-800">{data.analysis.art_form}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-slate-600 flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      Region
                    </label>
                    <p className="text-slate-800">{data.analysis.region}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-slate-600">Materials</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {data.analysis.materials.map((material: string, index: number) => (
                        <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-slate-600 flex items-center">
                      <Star className="mr-1 h-3 w-3" />
                      Skill Level
                    </label>
                    <p className="text-slate-800">{data.analysis.skill_level}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-slate-600 flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      Creation Time
                    </label>
                    <p className="text-slate-800">{data.analysis.estimated_time}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-slate-600">Color Palette</label>
                    <div className="flex gap-2 mt-1">
                      {data.analysis.color_palette.map((color: string, index: number) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Content Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Origin Story */}
              <Card className="p-6 bg-white/70 backdrop-blur-md border border-amber-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-800">Cultural Origin Story</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(data.storytelling.origin_story, 'origin')}
                    className="border-orange-200 hover:bg-orange-50"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    {copiedItems.has('origin') ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <p className="text-slate-700 leading-relaxed">{data.storytelling.origin_story}</p>
              </Card>
              
              {/* Product Description */}
              <Card className="p-6 bg-white/70 backdrop-blur-md border border-green-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-800">Product Description</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(data.product_details.description, 'description')}
                    className="border-green-200 hover:bg-green-50"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    {copiedItems.has('description') ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <h4 className="text-lg font-semibold text-slate-800 mb-2">{data.product_details.title}</h4>
                <p className="text-slate-700 leading-relaxed mb-4">{data.product_details.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Key Features</label>
                    <ul className="mt-1 space-y-1">
                      {data.product_details.key_features.map((feature: string, index: number) => (
                        <li key={index} className="text-sm text-slate-700 flex items-center">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-slate-600">Care Instructions</label>
                    <p className="text-sm text-slate-700 mt-1">{data.product_details.care_instructions}</p>
                  </div>
                </div>
              </Card>
              
              {/* Marketing Content */}
              <Card className="p-6 bg-white/70 backdrop-blur-md border border-indigo-100">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Marketing Content</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <label className="text-sm font-medium text-slate-600">Suggested Price Range</label>
                      <div className="mt-2 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-700">
                          ₹{data.marketing.price_range.min.toLocaleString()} - ₹{data.marketing.price_range.max.toLocaleString()}
                        </div>
                        <p className="text-sm text-green-600 mt-1">{data.marketing.price_range.rationale}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-slate-600">Hashtags</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {data.marketing.hashtags.map((tag: string, index: number) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-indigo-50 text-indigo-700 border-indigo-200 cursor-pointer hover:bg-indigo-100 transition-colors"
                            onClick={() => copyToClipboard(tag, `hashtag-${index}`)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-slate-600">Instagram Captions</label>
                    <div className="space-y-3 mt-2">
                      {data.marketing.instagram_captions.map((caption: any, index: number) => (
                        <div key={index} className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700">
                              {caption.style}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(caption.caption, `caption-${index}`)}
                              className="h-6 px-2"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-sm text-slate-700">{caption.caption}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}