import { registerRootComponent } from 'expo';
import * as SplashScreen from 'expo-splash-screen';
import App from './App.jsx';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Hide splash screen after app mounts
setTimeout(() => {
  SplashScreen.hideAsync();
}, 500);

registerRootComponent(App);
