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
            height: 72,
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
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

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
          <Animatable.View ref={circleRef} style={styles.circle} backgroundColor={focused?"#FF621F":"white"}>
            <item.icon width={25} height={25}  fill={focused?"white":"black"} />
          </Animatable.View>
        </View>
        <Animatable.Text ref={textRef} style={styles.text} >
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const animate1 = {
  0: { scale: 0.5, translateY: 7 },
  0.92: { translateY: -34 },
  1: { scale: 1.1, translateY: -10 },
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
    backgroundColor: "white",
  },
});

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
