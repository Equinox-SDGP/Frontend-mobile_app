import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, Stack } from 'expo-router';

const Index = () => {
  return (
    <View>
      <Stack.Screen options={{
        title: 'Devices',
        headerShown: true,
      }} />
      <Text>Devices</Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
