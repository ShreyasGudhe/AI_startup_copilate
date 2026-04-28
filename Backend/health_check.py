#!/usr/bin/env python3
"""
Health check script for AI Startup Backend
Run this to verify your deployment is working correctly.
"""

import requests
import sys
import time

def check_backend(url="http://localhost:8000"):
    """Check if backend is responding"""
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            print(f"✅ Backend is healthy at {url}")
            return True
        else:
            print(f"❌ Backend returned status {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Cannot connect to backend: {e}")
        return False

def test_ai_endpoint(url="http://localhost:8000"):
    """Test the AI generation endpoint"""
    try:
        test_query = "test startup idea"
        response = requests.get(f"{url}/generate", params={"query": test_query}, timeout=30)

        if response.status_code == 200:
            data = response.json()
            if "response" in data:
                print("✅ AI endpoint is working")
                print(f"Response preview: {data['response'][:100]}...")
                return True
            else:
                print("❌ AI endpoint returned unexpected format")
                return False
        else:
            print(f"❌ AI endpoint returned status {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Cannot test AI endpoint: {e}")
        return False

if __name__ == "__main__":
    url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000"

    print(f"🔍 Checking backend at {url}")
    print("-" * 50)

    # Check basic health
    if not check_backend(url):
        sys.exit(1)

    # Wait a moment
    time.sleep(2)

    # Test AI functionality
    if not test_ai_endpoint(url):
        sys.exit(1)

    print("-" * 50)
    print("🎉 All checks passed! Backend is ready for production.")