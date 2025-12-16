#!/bin/bash

# Quotle - Quick Start Script

echo "🚀 Starting Quotle Setup..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js which includes npm."
    exit 1
fi

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI..."
    npm install -g expo-cli
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📥 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎉 To start the development server, run:"
echo "   npm start"
echo ""
echo "Then choose your platform:"
echo "   Press 'i' for iOS Simulator"
echo "   Press 'a' for Android Emulator"
echo "   Press 'w' for Web"
echo "   Scan QR code with Expo Go for physical device"
echo ""
