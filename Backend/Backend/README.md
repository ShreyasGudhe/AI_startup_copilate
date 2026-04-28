# AI Startup Backend - Deployment Guide

This FastAPI backend provides AI-powered business consulting services using Groq API.

## 🚀 Quick Deploy Options

### 1. **Railway** (Recommended - Easiest)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up

# Set environment variables
railway variables set GROQ_API_KEY=your_api_key_here
```

### 2. **Render** (Free tier available)
```bash
# Connect GitHub repo to Render
# Or use render.yaml configuration
```

### 3. **Heroku**
```bash
# Install Heroku CLI
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set GROQ_API_KEY=your_api_key_here

# Deploy
git push heroku main
```

### 4. **Docker** (Any cloud provider)
```bash
# Build and run locally
docker-compose up --build

# Or deploy to any container service (AWS ECS, Google Cloud Run, etc.)
```

### 5. **Vercel** (For serverless)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 🔧 Environment Variables Required

Create a `.env` file with:
```
GROQ_API_KEY=your_groq_api_key_here
```

## 📡 API Endpoints

- `GET /` - Health check
- `GET /generate?query=<your_query>` - Generate AI business analysis

## 🔍 Testing Locally

```bash
# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn backend:app --reload

# Test the API
curl "http://localhost:8000/generate?query=startup idea analysis"
```

## 🌐 Production URLs

After deployment, update your frontend's API calls to point to your backend URL.