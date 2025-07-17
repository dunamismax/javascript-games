#!/bin/bash

# Setup script for mobile development with Capacitor

set -e

echo "🚀 Setting up mobile development for js-games monorepo"

# Function to setup mobile for a specific game
setup_mobile_for_game() {
  local game_name=$1
  local app_dir="apps/$game_name"
  
  echo "📱 Setting up mobile for $game_name..."
  
  cd "$app_dir"
  
  # Install Capacitor dependencies
  echo "Installing Capacitor dependencies..."
  pnpm add @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
  
  # Build the web app first
  echo "Building web app..."
  pnpm build
  
  # Initialize Capacitor if not already done
  if [ ! -f "capacitor.config.js" ]; then
    echo "Initializing Capacitor..."
    npx cap init
  fi
  
  # Add platforms
  echo "Adding mobile platforms..."
  npx cap add android || echo "Android platform already exists"
  npx cap add ios || echo "iOS platform already exists"
  
  # Sync web assets
  echo "Syncing web assets..."
  npx cap sync
  
  cd ../..
  
  echo "✅ Mobile setup complete for $game_name"
  echo "   - To open Android: cd $app_dir && npx cap open android"
  echo "   - To open iOS: cd $app_dir && npx cap open ios"
  echo ""
}

# Check if a specific game is provided
if [ $# -eq 1 ]; then
  game_name=$1
  if [ -d "apps/$game_name" ]; then
    setup_mobile_for_game "$game_name"
  else
    echo "❌ Game '$game_name' not found in apps/ directory"
    exit 1
  fi
else
  # Setup all games
  echo "Setting up mobile for all games..."
  setup_mobile_for_game "pong"
  setup_mobile_for_game "space-invaders"
  setup_mobile_for_game "snake"
fi

echo "🎉 Mobile setup complete!"
echo ""
echo "Next steps:"
echo "1. Make sure you have Android Studio and/or Xcode installed"
echo "2. Run the build command for any game: cd apps/[game] && pnpm build"
echo "3. Sync and open in native IDE: npx cap sync && npx cap open [android|ios]"
echo ""
echo "For more information, visit: https://capacitorjs.com/docs"