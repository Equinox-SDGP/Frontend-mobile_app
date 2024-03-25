import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Avatar, XStack, YStack, Button } from 'tamagui';
import Notification from '@/assets/icons/notification.png';
import { Link } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';
import Blankprofile from "@/assets/images/blankProfile.png"; // Importing the blank profile image

export default function ProfilePic() {
  const { user } = useAuth0();
  return (
    <XStack style={styles.mainContaner}>
      <XStack gap={10}>
        <Avatar circular size="$4">
          <Avatar.Image accessibilityLabel="Cam" src={user.picture ? user.picture : Blankprofile} />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        <YStack>
          <Text style={styles.Greeting}> Hello! </Text>
          <Text style={styles.UserName}> {user.name} </Text>
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
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
});
