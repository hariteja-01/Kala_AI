#!/bin/bash

echo "🏗️ Building Kala-AI for Production Deployment"
echo "=============================================="

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Build Next.js application
echo "🎭 Building Next.js application..."
npm run build

# Install backend dependencies
echo "🐍 Installing backend dependencies..."
cd backend
pip install -r requirements.txt
cd ..

echo "✅ Build complete! Ready for deployment."
echo "🚀 Use 'npm run start:production' to start the unified server"
