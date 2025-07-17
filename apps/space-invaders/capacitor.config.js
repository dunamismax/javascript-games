import { CapacitorConfig } from '@capacitor/cli';

const config = {
  appId: 'com.jsgames.spaceinvaders',
  appName: 'Space Invaders',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#000011',
      showSpinner: false
    },
    StatusBar: {
      style: 'DARK'
    }
  }
};

export default config;