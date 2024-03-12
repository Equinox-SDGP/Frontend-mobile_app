import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const NotificationLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="Notifications"
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
  );
};

export default NotificationLayout;

const styles = StyleSheet.create({});
