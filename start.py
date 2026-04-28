#!/usr/bin/env python3
"""
Start script for Render deployment
"""
import os
import uvicorn

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(
        "backend:app",
        host="0.0.0.0",
        port=port,
        reload=False
    )