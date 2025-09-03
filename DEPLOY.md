# 🚀 Kala-AI Render Deployment Guide

## ✅ Pre-Deployment Checklist

Run these commands before deploying:

```powershell
# 1. Security check
.\security-check.bat

# 2. Test production build locally
.\test-production.bat

# 3. Verify everything works
# Visit http://localhost:3000 and test image upload
```

## 🌐 Deploy to Render

### Option 1: Automatic Deployment (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Render deployment"
   git push
   ```

2. **Connect to Render:**
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Render auto-detects `render.yaml` configuration

3. **Add Environment Variable:**
   - In Render dashboard, add:
     - **Key:** `GEMINI_API_KEY`
     - **Value:** Your actual Gemini API key

4. **Deploy!**
   - Click "Create Web Service"
   - Render automatically runs:
     - Build: `npm run build:production`
     - Start: `npm run start:production`

### Option 2: Manual Setup

If automatic doesn't work, set up manually:

1. **Create Web Service** on Render
2. **Repository:** Connect your GitHub repo
3. **Environment:** Node.js
4. **Build Command:** `npm run build:production`
5. **Start Command:** `npm run start:production`
6. **Environment Variables:**
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   NODE_ENV=production
   BACKEND_PORT=8000
   ```

## 🎯 What Happens During Deployment

1. **Build Phase:**
   - Installs frontend dependencies (`npm install`)
   - Builds Next.js app (`npm run build`)
   - Installs backend dependencies (`pip install`)

2. **Start Phase:**
   - Starts unified server (`node server.js`)
   - Launches Python backend on port 8000
   - Serves Next.js frontend on Render's assigned port
   - Both services run in one unified process

## 🔧 Troubleshooting

### Build Fails
```bash
# Check dependencies locally
npm run build:production
```

### Backend Not Starting
- Verify `GEMINI_API_KEY` is set in Render dashboard
- Check Render logs for Python errors

### Frontend Not Connecting to Backend
- Ensure `BACKEND_PORT=8000` is set
- Check that both services start in `server.js`

## ✅ Deployment Success

Your app will be available at:
- **Frontend:** `https://kala-ai-fullstack.onrender.com`
- **Backend API:** `https://kala-ai-fullstack.onrender.com:8000`

The unified server handles routing between frontend and backend automatically!

## 🎭 Test Your Deployed App

1. Visit your Render URL
2. Upload an Indian craft image
3. Verify AI analysis works
4. Check that all features function properly

🎉 **Congratulations! Your Kala-AI platform is live!**
