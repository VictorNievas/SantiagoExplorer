import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.SantiagoExplorer.app',
  appName: 'Santiago Explorer',
  webDir: 'build',
  server: {
    cleartext: true,
    androidScheme: "http"
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "large",
      spinnerColor: "#5E35B1", // Color morado para el spinner
      showSpinner: true,
      splashFullScreen: true,
      splashImmersive: false,
      layoutName: "launch_screen", // Para iOS
    }
  }
};

export default config;
