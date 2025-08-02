#!/bin/bash

echo "🔧 Setting up Vercel environment variables..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

# Set the Anthropic API key from .env.local
API_KEY=$(grep "ANTHROPIC_API_KEY=" .env.local | cut -d '=' -f2)

if [ -z "$API_KEY" ]; then
    echo "❌ ANTHROPIC_API_KEY not found in .env.local"
    exit 1
fi

echo "✅ Found API key (length: ${#API_KEY})"

# Add environment variable to Vercel
echo "🚀 Adding ANTHROPIC_API_KEY to Vercel..."
vercel env add ANTHROPIC_API_KEY production <<< "$API_KEY"

echo "✅ Environment variable added!"
echo "🔄 Triggering redeploy..."
vercel --prod

echo "🎉 Setup complete! Your app should now work at https://copybr.vercel.app/dashboard/app-builder"