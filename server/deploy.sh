#!/bin/bash

APP_DIR=~/stock_image_management/server

echo "📦 Switching to app directory: $APP_DIR"
cd $APP_DIR || { echo "❌ Directory not found"; exit 1; }

echo "🧹 Stopping old containers..."
docker-compose down

echo "🧽 Cleaning up unused Docker resources..."
docker system prune -af --volumes

echo "🐳 Pulling latest Docker images..."
docker-compose pull

echo "🚀 Restarting Docker containers..."
docker-compose up -d

echo "✅ Deployment complete."