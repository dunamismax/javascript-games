import { CapacitorConfig } from '@capacitor/cli';

const config = {
  appId: 'com.jsgames.pong',
  appName: 'Pong Game',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#000000',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
    },
  },
};

export default config;
