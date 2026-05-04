#!/bin/bash
# Test script to verify frontend-backend connection

BACKEND_URL="https://ai-startup-copilate-backend.onrender.com"
FRONTEND_URL="https://your-frontend-url.vercel.app"  # Replace with your actual frontend URL

echo "🔍 Testing Backend Connection..."
echo "================================="

# Test backend health
echo "Testing backend health check..."
curl -s "$BACKEND_URL/" | head -5

echo -e "\n\nTesting AI endpoint..."
curl -s "$BACKEND_URL/generate?query=test%20startup%20idea" | head -10

echo -e "\n\n✅ Connection test complete!"
echo "If you see JSON responses above, the backend is working correctly."
echo "Update FRONTEND_URL in this script with your deployed frontend URL."