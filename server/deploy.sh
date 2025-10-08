#!/bin/bash

APP_DIR=~/stock_image_management/server
PROJECT_NAME=stock_image_management

echo "📦 Switching to app directory: $APP_DIR"
cd $APP_DIR || { echo "❌ Directory not found"; exit 1; }

echo "🧹 Stopping old containers for project: $PROJECT_NAME..."
docker compose -p $PROJECT_NAME down

echo "🧽 Cleaning up unused Docker resources (not affecting other projects)..."
docker system prune -af --volumes

echo "🐳 Pulling latest Docker images for project: $PROJECT_NAME..."
docker compose -p $PROJECT_NAME pull

echo "🚀 Restarting Docker containers for project: $PROJECT_NAME..."
docker compose -p $PROJECT_NAME up -d

echo "✅ Deployment complete."
