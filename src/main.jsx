import { registerRootComponent } from 'expo';
import * as SplashScreen from 'expo-splash-screen';
import App from './App.jsx';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => {
  // Catch error if preventAutoHideAsync fails
});

// Hide splash screen immediately
const hideSplash = async () => {
  try {
    await SplashScreen.hideAsync();
  } catch (e) {
    // Ignore errors
  }
};

hideSplash();

registerRootComponent(App);
