/** Imports */
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

import { config } from "../../tamagui.config";
import { useFonts } from "expo-font";

import { Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return <RootLayoutNav />;
}

const RootLayoutNav = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0)" }}>
      <TamaguiProvider config={config} defaultTheme={colorScheme}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                  bottom: 10,
                  position: "absolute",
                  height: 60,
                  left: 10,
                  right: 10,
                  borderRadius: 25,
                  backgroundColor: "#FFF",
                },
              }}
            />
          </Stack>
        </ThemeProvider>
      </TamaguiProvider>
    </SafeAreaView>
  );
};

export { ErrorBoundary } from "expo-router";
