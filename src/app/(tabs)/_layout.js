import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity, View, StyleSheet, Keyboard } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from "expo-splash-screen"; // Import SplashScreen module from expo-splash-screen
// import { useSession } from '../../hook/useSession'; // Import useSession hook from useSession file

import NavigatorButton from "@/components/tabNavigator/navigatorButton";

import { Home, MessageCircle, User2 } from "@tamagui/lucide-icons";

export default TabNavigator = () => {
  const [keyboardPresent, setKeyboardPresent] = useState(false);
  // const { session, SplashScreen } = useSession();
  // if(SplashScreen) {
  //   SplashScreen.preventAutoHideAsync();
  // }
  // if (!session) {
  //   return <Redirect href="./(auth)/signin" />;
  // }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardPresent(true);
        // Perform actions when the keyboard is shown
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardPresent(false);
        // Perform actions when the keyboard is hidden
      }
    );

    // Clean up listeners when the component is unmounted
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          bottom: keyboardPresent ? -15 : 10,
          position: "absolute",
          height: 60,
          left: 10,
          right: 10,
          borderRadius: 25,
          backgroundColor: "#FFF",
        },
      }}>
      {tabConfig.map((item, index) => (
        <Tabs.Screen
          key={index}
          name={item.name}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => <NavigatorButton {...props} item={item} />,
          }}
        />
      ))}
    </Tabs>
  );
};

const tabConfig = [
  { name: "home", icon: Home, label: "Home" },
  {
    name: "chatbot",
    icon: MessageCircle,
    label: "AI Assistant",
  },
  {
    name: "profile",
    icon: User2,
    label: "Profile",
  },
];
