# 🚀 Complete Render Deployment Guide for Kala-AI

## 📋 Prerequisites

### ✅ Before You Start
- ✅ GitHub repository: `https://github.com/hariteja-01/Kala_AI` (Done!)
- ✅ Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))
- ✅ Render account ([Sign up here](https://render.com))

### 🔑 Get Your Gemini API Key (If You Don't Have It)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIzaSy...`)
5. Keep it safe - you'll need it for Render!

---

## 🌐 Step-by-Step Render Deployment

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Click "Sign Up" 
3. Choose "Sign up with GitHub" (recommended)
4. Authorize Render to access your GitHub account

### Step 2: Connect Your Repository
1. **In Render Dashboard:**
   - Click "New +" button (top right)
   - Select "Web Service"

2. **Connect Repository:**
   - Click "Connect account" if GitHub isn't connected
   - Find and select: `hariteja-01/Kala_AI`
   - Click "Connect"

### Step 3: Configure Your Service
Render will auto-detect your configuration, but verify these settings:

#### 🏷️ **Basic Settings**
- **Name:** `kala-ai-fullstack` (or choose your own)
- **Region:** Oregon (or closest to you)
- **Branch:** `main`
- **Runtime:** `Node`

#### ⚙️ **Build & Deploy Settings**
- **Build Command:** `npm run build:production`
- **Start Command:** `npm run start:production`

*These should auto-populate from your `render.yaml` file!*

#### 💰 **Plan**
- **Instance Type:** `Starter` (Free tier - perfect for testing!)
- You can upgrade later if needed

### Step 4: Add Environment Variables
This is **CRITICAL** - your app won't work without these!

1. **Scroll down to "Environment Variables" section**
2. **Click "Add Environment Variable"**
3. **Add the following variables:**

| Key | Value | Description |
|-----|-------|-------------|
| `GEMINI_API_KEY` | `AIzaSy...` | Your actual Google Gemini API key |
| `NODE_ENV` | `production` | Sets production mode |
| `BACKEND_PORT` | `8000` | Backend server port |

#### 🔑 **Adding Your Gemini API Key:**
- **Key:** `GEMINI_API_KEY`
- **Value:** Paste your actual API key (e.g., `AIzaSyDgdGLEyegoiJtj9uKDgyA2sb-I4qf_u2k`)
- **IMPORTANT:** Use your real API key, not the placeholder!

### Step 5: Deploy!
1. **Review all settings**
2. **Click "Create Web Service"**
3. **Wait for deployment** (usually 5-10 minutes)

---

## 📊 Deployment Process

### What Happens During Deployment:
1. **🔄 Render clones your repository**
2. **📦 Installs dependencies:** `npm install`
3. **🏗️ Builds frontend:** `npm run build`
4. **🐍 Installs Python backend:** `pip install -r backend/requirements.txt`
5. **🚀 Starts unified server:** `node server.js`
6. **✅ Your app goes live!**

### Deployment Timeline:
- **Total Time:** ~5-10 minutes
- **Build Phase:** ~3-5 minutes
- **Start Phase:** ~1-2 minutes
- **Health Check:** ~30 seconds

---

## 🎯 After Deployment

### ✅ Your Live App URLs:
- **Main App:** `https://kala-ai-fullstack.onrender.com`
- **API Health:** `https://kala-ai-fullstack.onrender.com/health`
- **API Docs:** `https://kala-ai-fullstack.onrender.com/docs`

### 🧪 Testing Your Deployed App:
1. **Visit your Render URL**
2. **Test the upload functionality:**
   - Upload an Indian craft image
   - Verify AI analysis works
   - Check that cultural stories generate
3. **Test API directly:**
   - Visit `/health` endpoint
   - Should return: `{"status": "healthy", "service": "Kala-AI Backend"}`

---

## 🔧 Troubleshooting Common Issues

### ❌ Build Fails
**Problem:** Dependencies not installing
**Solution:**
```bash
# Check your local build works:
npm run build:production
```

### ❌ App Starts But Doesn't Work
**Problem:** Missing environment variables
**Solution:**
- Verify `GEMINI_API_KEY` is set in Render dashboard
- Check Environment Variables tab in Render
- Redeploy if variables were added after initial deployment

### ❌ "API Key Not Found" Error
**Problem:** Environment variable not set correctly
**Solution:**
1. Go to Render dashboard
2. Click on your service
3. Go to "Environment" tab
4. Verify `GEMINI_API_KEY` exists and has your real key
5. Click "Manual Deploy" to restart

### ❌ Backend Not Responding
**Problem:** Python dependencies or port issues
**Solution:**
- Check logs in Render dashboard
- Verify `BACKEND_PORT=8000` is set
- Check that `requirements.txt` has all dependencies

---

## 📱 Managing Your Deployment

### 🔄 Updating Your App:
```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push

# Render automatically redeploys!
```

### 📊 Monitoring:
- **Render Dashboard:** Monitor logs, metrics, and deployments
- **Logs:** View real-time application logs
- **Metrics:** See traffic, response times, and errors

### 💰 Scaling:
- **Free Tier:** 750 hours/month (enough for most projects)
- **Upgrade:** If you need more resources, upgrade your plan

---

## 🎭 Complete Environment Variables Reference

Here's every environment variable your app uses:

### 🔥 **Required (Must Set in Render):**
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### ⚙️ **Automatic (Render Sets These):**
```env
NODE_ENV=production
BACKEND_PORT=8000
PORT=10000                    # Render auto-assigns this
```

### 🌐 **Internal (App Auto-Configures):**
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

---

## 🎉 Success Checklist

After deployment, verify these work:

- ✅ **Main app loads:** Your Render URL shows the beautiful Kala-AI interface
- ✅ **Image upload works:** Can drag and drop Indian craft images
- ✅ **AI analysis works:** Gemini generates cultural stories and analysis
- ✅ **All features work:** Pricing, marketing content, Instagram captions
- ✅ **API responds:** `/health` endpoint returns healthy status
- ✅ **No console errors:** Browser developer tools show no critical errors

---

## 🆘 Getting Help

### 📖 **Documentation:**
- **Render Docs:** [docs.render.com](https://docs.render.com)
- **Your Repository:** [github.com/hariteja-01/Kala_AI](https://github.com/hariteja-01/Kala_AI)

### 🐛 **If Something Goes Wrong:**
1. **Check Render logs** in the dashboard
2. **Verify environment variables** are set correctly
3. **Test locally** with `npm run start:production`
4. **Check GitHub repository** has latest code

### 💬 **Support:**
- **Render Support:** Available in dashboard
- **GitHub Issues:** Create issue in your repository

---

## 🎯 Quick Deployment Checklist

Use this checklist when deploying:

### Pre-Deployment:
- [ ] Repository pushed to GitHub
- [ ] Gemini API key ready
- [ ] Render account created

### Deployment:
- [ ] Connected GitHub repository to Render
- [ ] Service name set (e.g., `kala-ai-fullstack`)
- [ ] Build command: `npm run build:production`
- [ ] Start command: `npm run start:production`
- [ ] Environment variable `GEMINI_API_KEY` added
- [ ] Clicked "Create Web Service"

### Post-Deployment:
- [ ] App loads at Render URL
- [ ] Image upload and analysis works
- [ ] API health check passes
- [ ] All features tested

---

## 🎨 Your Deployed Kala-AI Platform

Once deployed, your platform will:

🎭 **Empower Indian artisans** with AI-powered cultural storytelling
💰 **Generate market-ready content** from a single craft photo
📱 **Create Instagram-ready marketing** with authentic cultural context
🌍 **Reach global audiences** while preserving traditional heritage

**🚀 Ready to deploy? Follow the steps above and bring Kala-AI to the world! 🇮🇳✨**
