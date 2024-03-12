import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar, XStack, YStack, Button } from "tamagui";
import Notification from "@/assets/icons/notification.png";
import { Link } from "expo-router";

export default function ProfilePic() {
  return (
    <XStack style={styles.mainContaner}>
      <XStack gap={10}>
        <Avatar circular size="$4">
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
      {/* <Button alignSelf="center" icon={Airplay} size="$6"/> */}

      <TouchableOpacity>
      <Link href="/notifications">
        <Image style={styles.notification} source={Notification}></Image>
      </Link>
      </TouchableOpacity>
    </XStack>
  );
}

const styles = StyleSheet.create({
  Greeting: {
    fontSize: 13,
  },
  UserName: { fontSize: 18 },
  notification: {
    width: 33,
    height: 33,
  },
  mainContaner: {
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    padding: 10,
  },
});
