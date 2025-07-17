import { CapacitorConfig } from '@capacitor/cli';

const config = {
  appId: 'com.jsgames.snake',
  appName: 'Snake Game',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#2d5016',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
    },
  },
};

export default config;
