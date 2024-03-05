import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack, Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";

import { config } from "../../tamagui.config";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Image, Text, View , StyleSheet} from "react-native";

// Icons
import Home from "../assets/icons/home.jsx";
import Chat from "../assets/icons/chatbot.jsx";
import Devices from "../assets/icons/device.jsx";
import Profile from "../assets/icons/profile.jsx";

const tabs = [
  {icon: <Home />, name: "index", text: "Home"},
  {icon: <Chat />, name: "chatbot/index", text: "AI Assistant"},
  {icon: <Devices />, name: "devices/index", text: "Devices"},
  {icon: <Profile />, name: "profile/index", text: "Profile"},
]
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Tabs style={styles.container}>
          <Tabs.Screen 
            name="index" // This is the default route.
            options={{
              tabBarIcon:({focused}) => (
                <View style={styles.navIcon}>
                <Image
                className="icon"
                  source={require(Home)}
                  style={{ width: 23, height: 23, tintColor: focused ? "#e32f45" : "#748c94" }}
                />
                <Text style={{color:focused ? "#e32f45" : "#748c94", fontSize:11}}>HOME</Text>
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="chatbot/index"
            options={{
              tabBarIcon:({focused}) => (
                <View style={styles.navIcon}>
                <Image
                className="icon"
                  source={require(Chat)}
                  style={{ width: 23, height: 23, tintColor: focused ? "#e32f45" : "#748c94" }}
                />
                <Text style={{color:focused ? "#e32f45" : "#748c94", fontSize:11}}>AI ASSISTANT</Text>
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="devices/index"
            options={{
              tabBarIcon:({focused}) => (
                <View style={styles.navIcon}>
                <Image
                className="icon"
                  source={require(Devices)}
                  style={{ width: 23, height: 23, tintColor: focused ? "#e32f45" : "#748c94" }}
                />
                <Text style={{color:focused ? "#e32f45" : "#748c94", fontSize:11}}>DEVICES</Text>
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="profile/index"
            options={{
              tabBarIcon:({focused}) => (
                <View style={styles.navIcon}>
                <Image
                className="icon"
                  source={require(Profile)}
                  style={{ width: 23, height: 23, tintColor: focused ? "#e32f45" : "#748c94"}}
                />
                <Text style={{color:focused ? "#e32f45" : "#748c94", fontSize:11}}>PROFILE</Text>
                </View>
              ),
            }}
          />
        </Tabs>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  tabs: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 5,
  }, 
});
