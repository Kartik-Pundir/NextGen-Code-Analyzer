# Vercel Deployment Guide

## Current Issue
The login/register is failing on Vercel because the backend API is not deployed.

## Solution: Deploy Backend and Frontend Separately

### Option 1: Deploy Backend on Render/Railway (Recommended)

1. **Deploy Backend on Render.com:**
   - Go to https://render.com
   - Create a new Web Service
   - Connect your GitHub repo
   - Set Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node index.js`
   - Add Environment Variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Your JWT secret
     - `AI_API_KEY`: Your OpenAI API key (optional)
     - `PORT`: 10000 (Render default)

2. **Update Frontend Environment Variable:**
   - In Vercel dashboard, go to your project settings
   - Add Environment Variable:
     - `VITE_API_URL`: https://your-backend-url.onrender.com

3. **Redeploy Frontend on Vercel**

### Option 2: Deploy Both on Vercel (Separate Projects)

1. **Deploy Backend:**
   - Create a new Vercel project for backend only
   - Set Root Directory: `server`
   - Add Environment Variables in Vercel dashboard

2. **Deploy Frontend:**
   - Keep current Vercel project for frontend
   - Add `VITE_API_URL` environment variable pointing to backend URL

### Option 3: Use MongoDB Atlas + Vercel Serverless Functions

This requires restructuring the backend to use Vercel serverless functions.

## Quick Fix for Testing

For now, you can test locally:
- Frontend: http://localhost:3000
- Backend: http://localhost:5555

The local version works perfectly!

## Recommended Stack for Production

- **Frontend**: Vercel (current)
- **Backend**: Render.com or Railway.app (free tier available)
- **Database**: MongoDB Atlas (free tier available)
