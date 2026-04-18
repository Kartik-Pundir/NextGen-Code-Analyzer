# Quick Start Guide

## Prerequisites Check

Before running the app, ensure you have:
- ✅ Node.js installed (v16 or higher)
- ✅ MongoDB installed and running
- ⚠️ OpenAI API key (optional - app will use fallback suggestions)

## Setup Complete! ✨

Dependencies are installed. Follow these steps:

### 1. Start MongoDB

```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Or run directly
mongod
```

### 2. Configure API Key (Optional)

Edit `.env` file and add your OpenAI API key:
```
AI_API_KEY=sk-your-actual-openai-api-key
```

**Note:** The app will work without an API key using fallback suggestions.

### 3. Start the Application

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend app on http://localhost:3000

### 4. Access the App

Open your browser and go to:
**http://localhost:3000**

### 5. Create an Account

1. Click "Sign up" on the login page
2. Enter your name, email, and password
3. Start analyzing code!

## Features to Try

1. **Dashboard** - View your analysis statistics
2. **Analyze Code** - Paste JavaScript/React code and get instant feedback
3. **History** - Track all your past analyses

## Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB
mongod --dbpath /usr/local/var/mongodb
```

### Port Already in Use
Edit `.env` and change the PORT value to something else (e.g., 5001)

### AI Suggestions Not Working
The app uses fallback suggestions if the API key is missing or invalid. This is normal!

## Sample Code to Test

Try analyzing this code:

```javascript
function calc(a,b,c,d,e,f) {
  if(a>b) {
    if(c>d) {
      if(e>f) {
        return a+c+e;
      }
    }
  }
  return 0;
}
```

The analyzer will detect:
- Too many parameters
- High complexity
- Nested conditions

Enjoy coding! 🚀
