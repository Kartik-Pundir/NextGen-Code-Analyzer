#!/bin/bash

echo "📸 Adding Screenshots to GitHub"
echo ""

# Check if screenshots folder exists
if [ ! -d "screenshots" ]; then
    echo "❌ Error: screenshots folder not found!"
    echo ""
    echo "Please:"
    echo "1. Create 'screenshots' folder"
    echo "2. Add your screenshots with these names:"
    echo "   - login.png"
    echo "   - dashboard.png"
    echo "   - analyzer.png"
    echo "   - results.png"
    echo "   - history.png"
    exit 1
fi

# Check if screenshots exist
SCREENSHOT_COUNT=$(ls screenshots/*.png 2>/dev/null | wc -l)

if [ $SCREENSHOT_COUNT -eq 0 ]; then
    echo "❌ No screenshots found in screenshots folder!"
    echo "Please add at least one screenshot"
    exit 1
fi

echo "✅ Found $SCREENSHOT_COUNT screenshot(s)"
echo ""

# Add to git
echo "📦 Adding screenshots to git..."
git add screenshots/
git add README.md

# Commit
echo "💾 Committing changes..."
git commit -m "Add project screenshots and update README"

# Push
echo "📤 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully added screenshots!"
    echo "🌐 View at: https://github.com/Kartik-Pundir/NextGen-Code-Analyzer"
else
    echo ""
    echo "❌ Push failed. Please check your connection."
fi
