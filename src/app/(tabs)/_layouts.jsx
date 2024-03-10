import { Tabs } from "expo-router";

import { StyleSheet, Text, View } from "react-native";
import React from "react";

const _layouts = () => {
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
    <Tabs
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
        <Tabs.Screen
            name="Home"
            component={Home}
            options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => (
                <NavigatorButton {...props} item={item} />
                ),
            }}
        />
      {/* {tabConfig.map((item, index) => (
                <Tabs.Screen
                  key={index}
                  name={item.route}
                  component={item.component}
                  options={{
                    tabBarShowLabel: false,
                    tabBarButton: (props) => (
                      <NavigatorButton {...props} item={item} />
                    ),
                  }}
                />
              ))} */}
    </Tabs>
  );
};

export default _layouts;

const styles = StyleSheet.create({});
