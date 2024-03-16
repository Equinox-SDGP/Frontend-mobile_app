import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import {
  Avatar,
  XStack,
  YStack,
  Button,
  ListItem,
  Separator,
  YGroup,
} from "tamagui";
import {
  Star,
  ChevronRight,
  Moon,
  HardDrive,
  UserRoundCog,
  Power,
  Info,
  PhoneCall,
  MessageSquareText,
} from "@tamagui/lucide-icons";
import { Link } from "expo-router";
// import { useSession } from '../../hook/useSession'; // Import useSession hook from useSession file

export default function Profile() {
  // const { signOut } = useSession();
  return (
    <View style={styles.Contaner}>
      <YStack
        alignItems="center"
        justifyContent="center"
        columnGap={5}
        marginBottom={30}
        paddingBottom={20}>
        <Avatar style={styles.avatar} circular size="$11">
          <Avatar.Image
            accessibilityLabel="Cam"
            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
          />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        <Text style={styles.UserName}> Promodh Madusha </Text>
        <Text style={styles.email}> promodmadusha@gmail.com </Text>
      </YStack>
      <Lists />
    </View>
  );
}
function Lists() {
  const screenWidth = useWindowDimensions().width;
  return (
    <YGroup
      alignSelf="center"
      bordered
      width={screenWidth - 60}
      size="$8"
      separator={<Separator />}>
      <Link href="(auth)/signin">
        <YGroup.Item>
          <ListItem
            hoverTheme
            pressTheme
            title="Profile"
            subTitle="Edit Profile"
            icon={UserRoundCog}
            iconAfter={ChevronRight}
            Link="signin"
          />
        </YGroup.Item>
      </Link>

      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="Device"
          subTitle="Device "
          icon={HardDrive}
          iconAfter={ChevronRight}
        />
      </YGroup.Item>
      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="Feedback"
          subTitle="Give Feedback :)"
          icon={MessageSquareText}
          iconAfter={ChevronRight}
        />
      </YGroup.Item>

      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="Contact us"
          subTitle="+94 71 212 4273"
          icon={PhoneCall}
          iconAfter={ChevronRight}
        />
      </YGroup.Item>

      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="About"
          subTitle="Version"
          icon={Info}
          iconAfter={ChevronRight}
        />
      </YGroup.Item>

      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="Sign out"
          //subTitle="Edit Profile"
          icon={Power}
          //iconAfter={ChevronRight}
          // onPress={() => {
          //   // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          //   signOut();
          // }}
        />
      </YGroup.Item>
    </YGroup>
  );
}

const styles = StyleSheet.create({
  Contaner: {
    alignItems: "Left",
    padding: 10,
    display: "flex",
    justifyContent: "center",
    paddingTop: 50,
    paddingHorizontal: 40,
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: "blue",
  },
  UserName: {
    fontSize: 25,
    fontWeight: "bold",
    paddingTop: 20,
  },
  email: {
    fontSize: 13,
    //fontStyle: "italic",
    color: "#696969",
  },
});
