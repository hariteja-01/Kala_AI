#!/usr/bin/env node

/**
 * Kala-AI Unified Production Server
 * Serves both Next.js frontend and FastAPI backend
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🎨 Starting Kala-AI Unified Server...');
console.log('=====================================');

// Get port from environment (Render sets PORT automatically)
const PORT = process.env.PORT || 3000;
const BACKEND_PORT = 8000; // Internal backend port

// Start backend Python server on internal port
console.log(`🐍 Starting Python backend on internal port ${BACKEND_PORT}...`);
const backend = spawn('python', ['main.py'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: BACKEND_PORT
  }
});

// Wait a moment for backend to start
setTimeout(() => {
  // Start Next.js frontend on main port
  console.log(`🎭 Starting Next.js frontend on port ${PORT}...`);
  const frontend = spawn('npm', ['start'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: PORT,
      BACKEND_URL: `http://localhost:${BACKEND_PORT}`
    }
  });

  // Handle process termination
  process.on('SIGTERM', () => {
    console.log('🛑 Shutting down servers...');
    backend.kill();
    frontend.kill();
    process.exit(0);
  });

  process.on('SIGINT', () => {
    console.log('🛑 Shutting down servers...');
    backend.kill();
    frontend.kill();
    process.exit(0);
  });

}, 3000);

backend.on('error', (err) => {
  console.error('❌ Backend error:', err);
  process.exit(1);
});

console.log('✅ Kala-AI servers starting...');
console.log(`🌐 Frontend will be available on port ${PORT}`);
console.log(`🔗 Backend API available internally on port ${BACKEND_PORT}`);
