#!/bin/bash

echo "🚀 NextGen Code Analyzer - GitHub Push Script"
echo ""

# Check if repository URL is provided
if [ -z "$1" ]; then
    echo "❌ Error: GitHub repository URL not provided"
    echo ""
    echo "Usage: ./push-to-github.sh <github-repo-url>"
    echo "Example: ./push-to-github.sh https://github.com/yourusername/nextgen-code-analyzer.git"
    echo ""
    echo "Steps:"
    echo "1. Go to https://github.com/new"
    echo "2. Create a new repository named 'nextgen-code-analyzer'"
    echo "3. Copy the repository URL"
    echo "4. Run: ./push-to-github.sh <your-repo-url>"
    exit 1
fi

REPO_URL=$1

echo "📦 Repository URL: $REPO_URL"
echo ""

# Check if remote already exists
if git remote | grep -q "origin"; then
    echo "⚠️  Remote 'origin' already exists. Removing..."
    git remote remove origin
fi

# Add remote
echo "🔗 Adding remote origin..."
git remote add origin $REPO_URL

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 View your repository at: ${REPO_URL%.git}"
    echo ""
    echo "Next steps:"
    echo "1. Add topics/tags on GitHub: code-analysis, react, nodejs, ai, mongodb"
    echo "2. Add a nice repository image"
    echo "3. Star your own repo! ⭐"
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "1. Repository exists on GitHub"
    echo "2. You have access to the repository"
    echo "3. You're logged in to GitHub (git credential helper)"
fi
