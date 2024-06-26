/** Imports */
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React, { useEffect, useCallback } from 'react'; // Import necessary modules from React
import { useColorScheme } from 'react-native'; // Import useColorScheme hook from react-native
import * as SplashScreen from 'expo-splash-screen'; // Import SplashScreen module from expo-splash-screen
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView component from react-native-safe-area-context
import { TamaguiProvider } from 'tamagui'; // Import TamaguiProvider component from tamagui package
import { config } from '../../tamagui.config'; // Import configuration from tamagui.config file
import { useFonts } from 'expo-font'; // Import useFonts hook from expo-font
import { Stack, Slot } from 'expo-router'; // Import Stack component from expo-router
import { Auth0Provider } from 'react-native-auth0'; // Import Auth0Provider component from react-native-auth0

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });
  /**
   * Callback function to hide splash screen when necessary resources are loaded
   */
  const onLayoutRootView = useCallback(async () => {
    if (interLoaded || interError) {
      await SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  // Call onLayoutRootView when the component mounts
  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  // If necessary resources are not loaded, return null
  if (!interLoaded && !interError) {
    return null;
  }

  // Render RootLayoutNav component
  return <RootLayoutNav />;
}

const RootLayoutNav = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)' }}>
      <TamaguiProvider config={config} defaultTheme={colorScheme}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Auth0Provider domain={'dev-lupmiwit5z3hexny.us.auth0.com'} clientId={'WtljS5wT1Zn5Bld2ElTU0eZ9SGsNdsXk'}>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                  tabBarHideOnKeyboard: true,
                  tabBarStyle: {
                    bottom: 10,
                    position: 'absolute',
                    height: 60,
                    left: 10,
                    right: 10,
                    borderRadius: 25,
                    backgroundColor: '#FFF',
                  },
                }}
              />
              <Slot />
            </Stack>
          </Auth0Provider>
        </ThemeProvider>
      </TamaguiProvider>
    </SafeAreaView>
  );
};

export { ErrorBoundary } from 'expo-router';
