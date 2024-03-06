import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity, Image, View, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

import { config } from "../../tamagui.config";

import { useFonts } from "expo-font";

import home from "../assets/icons/home.png";
import chatbot from "../assets/icons/chatbot.png";
import device from "../assets/icons/device.png";
import profile from "../assets/icons/profile.png";

import Chatbot from "./chatbot";
import Devices from "./devices";
import Home from "./index";
import Profile from "./profile";

const tabs = [
  { route: "Home", icon: home, label: "Home", component: Home },
  {
    route: "Chatbot",
    icon: chatbot,
    label: "AI Assistant",
    component: Chatbot,
  },
  { route: "Devices", icon: device, label: "Devices", component: Devices },
  { route: "Profile", icon: profile, label: "Profile", component: Profile },
];

export { ErrorBoundary } from "expo-router";

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

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;

  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={1}>
      <Animatable.View ref={viewRef} duration={500} style={styles.container}>
        <View
          style={[
            styles.btn,
            {
              borderColor: focused ? "white" : "transparent",
            },
          ]}>
          <Animatable.View ref={circleRef} style={styles.circle}>
            <Image
              resizeMode="contain"
              source={item.icon}
              style={{ height: 30, width: 30, tintColor: "white" }}
            />
          </Animatable.View>
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const Tab = createBottomTabNavigator();

  const [navBarVisible, setNavBarVisible] = useState(true);

  const handleTextInput = () => {
    setNavBarVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0)" }}>
      <TamaguiProvider config={config} defaultTheme={colorScheme}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <NavigationContainer independent={true}>
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarStyle: {
                  position: "absolute",
                  height: 72,
                  bottom: 10,
                  left: 10,
                  right: 10,
                  borderRadius: 25,
                  backgroundColor: "#FFF",
                },
              }}>
              {tabs.map((item, index) => (
                <Tab.Screen
                  key={index}
                  name={item.route}
                  component={item.component}
                  options={{
                    tabBarShowLabel: false,
                    tabBarButton: (props) => (
                      <TabButton {...props} item={item} />
                    ),
                  }}
                />
              ))}
            </Tab.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </TamaguiProvider>
    </SafeAreaView>
  );
}

const animate1 = {
  0: { scale: 0.5, translateY: 7 },
  0.92: { translateY: -34 },
  1: { scale: 1.2, translateY: -10 },
};
const animate2 = {
  0: { scale: 1.2, translateY: -10 },
  1: { scale: 1, translateY: 7 },
};
const circle1 = {
  0: { scale: 0 },
  0.3: { scale: 0.9 },
  0.5: { scale: 0.2 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  btn: {
    width: 50,
    height: 50,
    borderWidth: 4,
    borderRadius: 25,
    justifyContent: "center",
    backgroundColor: "transparent",
    alignItems: "center",
    borderColor: "white",
  },
  text: {
    fontSize: 10,
    textAlign: "center",
    color: "black",
    marginTop: 2,
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#FF4F1F",
  },
});
