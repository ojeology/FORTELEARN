#!/bin/bash
echo "🚀 Starting GitHub deployment..."

# Check files
if [ ! -f "data/bonus.txt" ]; then
    echo "⚠️  Fixing file name..."
    mv "data/BONUS.txt" "data/bonus.txt" 2>/dev/null
fi

# Git steps
git init
git add .
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')"
git remote add origin https://$1@github.com/ojeology/FORTEBETLEARN.git
git push -u origin main --force

echo "✅ Done! Site: https://ojeology.github.io/FORTEBETLEARN/"