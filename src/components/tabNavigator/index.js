import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Animatable from "react-native-animatable";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Keyboard,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";

import NavigatorButton from "./navigatorButton";

import HomeIcon from "@/assets/icons/tabIcons/home.svg";
import ChatbotIcon from "@/assets/icons/tabIcons/chatbot.svg";

import Home from "@/app";
import Chatbot from "@/app/chatbot";
import Profile from "@/app/profile";

export default TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const [keyboardPresent, setKeyboardPresent] = useState(false);

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
    <NavigationContainer independent={true}>
      <Tab.Navigator
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
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <NavigatorButton {...props} item={item} />,
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const tabConfig = [
  { route: "Home", icon: HomeIcon, label: "Home", component: Home },
  {
    route: "Chatbot",
    icon: ChatbotIcon,
    label: "AI Assistant",
    component: Chatbot,
  },
  {
    route: "Profile",
    icon: ChatbotIcon,
    label: "Profile",
    component: Profile,
  },
];
