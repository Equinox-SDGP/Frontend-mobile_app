// Import statements
import { Tabs } from "expo-router"; // Importing Tabs from "expo-router" for tab navigation
import { Keyboard } from "react-native"; // Importing Keyboard from "react-native" for keyboard event handling
import { useState, useEffect} from "react"; // Importing useState and useEffect from "react" for managing component state and lifecycle

import NavigatorButton from "@/components/tabNavigator/navigatorButton"; // Importing NavigatorButton component for rendering tab buttons

import { Home, MessageCircle, User2 } from "@tamagui/lucide-icons"; // Importing icons from "@tamagui/lucide-icons"

// Component definition
export default TabNavigator = () => {
  const [keyboardPresent, setKeyboardPresent] = useState(false); // State variable to track keyboard visibility

  useEffect(() => {
    // Effect hook to listen for keyboard events
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

  // Rendering tab navigator
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          bottom: keyboardPresent ? -15 : 10, // Adjusting tabBar position based on keyboard visibility
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
            tabBarButton: (props) => <NavigatorButton {...props} item={item} />, // Customizing tab button using NavigatorButton component
          }}
        />
      ))}
    </Tabs>
  );
};

// Configuration for tab items
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
