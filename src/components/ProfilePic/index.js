import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, XStack, YStack } from "tamagui";

export default function ProfilePic() {
  return (
    <XStack alignItems="center" space="$6">
      <Avatar circular size="$6">
        <Avatar.Image
          accessibilityLabel="Cam"
          src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
        />
        <Avatar.Fallback backgroundColor="$blue10" />
      </Avatar>
      <YStack>
        <Text style={styles.Greeting}> Good Morning </Text>
        <Text style={styles.UserName}> Promodh Madusha </Text>
      </YStack>
    </XStack>
  );
}

const styles = StyleSheet.create({
  Greeting: {
    fontSize: 16,
  },
  UserName: { fontSize: 20 },
});
