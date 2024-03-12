import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "tamagui";

const Notification = ({ navigation }) => {
  const goBacktoParent = () => {
    navigation.goBack();
  };
  return (
    <View>
      <Text>Notification</Text>
      <Button onPress={goBacktoParent} />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
