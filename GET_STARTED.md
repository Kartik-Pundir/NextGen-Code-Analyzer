# 🚀 Get Started with NextGen Code Analyzer

Welcome! This guide will get you up and running in 5 minutes.

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- [ ] Node.js (v16 or higher) - [Download](https://nodejs.org/)
- [ ] MongoDB installed - [Download](https://www.mongodb.com/try/download/community)
- [ ] A code editor (VS Code recommended)
- [ ] Terminal/Command line access

## 🎯 Quick Start (3 Steps)

### Step 1: Start MongoDB

Open a terminal and run:

```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Or run directly
mongod

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

Keep this terminal open!

### Step 2: Configure Environment

The `.env` file is already created with default values. You can use it as-is for development!

**Optional**: Add your OpenAI API key for real AI suggestions:
```bash
# Open .env file and update:
AI_API_KEY=sk-your-actual-openai-api-key-here
```

**Note**: The app works fine without an API key using fallback suggestions!

### Step 3: Start the Application

Open a new terminal in the project folder and run:

```bash
./start.sh
```

Or manually:
```bash
npm run dev
```

That's it! 🎉

## 🌐 Access the Application

Open your browser and go to:

**http://localhost:3000**

You should see the login page with a beautiful purple gradient!

## 👤 Create Your First Account

1. Click "Sign up" on the login page
2. Enter:
   - Name: Your Name
   - Email: your@email.com
   - Password: password123 (or any password)
3. Click "Create Account"
4. You'll be redirected to the dashboard!

## 🔍 Try Your First Analysis

1. Click "Analyze Code" from the dashboard
2. Click "Load Sample" to load example code
3. Click "Analyze Code" button
4. See the results:
   - Code metrics (complexity, maintainability)
   - Issues found
   - AI suggestions

## 📊 Explore Features

### Dashboard
- View your analysis statistics
- See recent analyses
- Quick navigation to features

### Code Analyzer
- Paste any JavaScript/React/TypeScript code
- Get instant analysis
- See detailed metrics and suggestions

### History
- View all past analyses
- Filter by status (All/Issues/Clean)
- Export your data

## 🎨 What You'll See

### Login Page
Beautiful gradient background with purple/indigo colors and a clean login form.

### Dashboard
Modern cards showing:
- Total analyses count
- Issues found
- Clean code files
- Average complexity

### Analyzer
Split view with:
- Code editor on the left
- Results panel on the right
- Real-time metrics

## 🧪 Test with Sample Code

Try analyzing this code:

```javascript
function calculateTotal(items, tax, discount, shipping, coupon, membership) {
  let total = 0;
  
  if (items && items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].price) {
        if (items[i].quantity) {
          total += items[i].price * items[i].quantity;
        }
      }
    }
  }
  
  if (tax) {
    total = total + (total * tax);
  }
  
  return total;
}
```

The analyzer will detect:
- Too many parameters (6 parameters)
- High complexity (nested conditions)
- Short variable names
- Optimization opportunities

## 🎯 Common Tasks

### View Analysis History
1. Click "History" in the navigation
2. See all your past analyses
3. Filter by status
4. Export to JSON

### Logout
Click the "Logout" button in the navigation bar

### Analyze Different Languages
1. Go to Analyzer
2. Select language from dropdown:
   - JavaScript
   - React JSX
   - TypeScript

## 🐛 Troubleshooting

### MongoDB Connection Error

**Problem**: "MongoDB connection error"

**Solution**:
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB
mongod
```

### Port Already in Use

**Problem**: "Port 3000 or 5000 already in use"

**Solution**:
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill
lsof -ti:5000 | xargs kill

# Or change port in .env
PORT=5001
```

### Dependencies Error

**Problem**: "Module not found"

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules client/node_modules server/node_modules
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..
```

### Can't Access Application

**Problem**: Browser shows "Can't connect"

**Solution**:
1. Check if both servers are running
2. Look for errors in terminal
3. Try http://localhost:3000 (not https)
4. Clear browser cache

## 📚 Next Steps

Now that you're up and running:

1. ✅ Read [FEATURES.md](FEATURES.md) for complete feature list
2. ✅ Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
3. ✅ See [TEST_GUIDE.md](TEST_GUIDE.md) for testing
4. ✅ Review [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment

## 💡 Tips

- Use "Load Sample" to quickly test the analyzer
- Try analyzing your own code
- Check the history to track improvements
- Export your analysis data
- Filter history by status

## 🎉 You're All Set!

You now have a fully functional AI-powered code analyzer running locally!

### What's Working:
✅ User authentication
✅ Code analysis
✅ AI suggestions
✅ Metrics tracking
✅ History management
✅ Beautiful UI

### Need Help?

- 📖 Check the documentation files
- 🐛 Report issues on GitHub
- 💬 Ask questions in discussions
- 📧 Email: support@nextgenanalyzer.com

## 🚀 Quick Commands Reference

```bash
# Start everything
npm run dev

# Or use the startup script
./start.sh

# Start only backend
npm run server

# Start only frontend
npm run client

# Build for production
cd client && npm run build

# Start MongoDB
mongod
```

## 🎨 Enjoy the Experience!

The app features:
- 🎨 Modern gradient design
- ⚡ Fast performance
- 🔒 Secure authentication
- 📊 Real-time analysis
- 🤖 AI-powered suggestions
- 📱 Responsive design

Happy coding! 🚀

---

**Need more help?** Check out [QUICKSTART.md](QUICKSTART.md) or [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
