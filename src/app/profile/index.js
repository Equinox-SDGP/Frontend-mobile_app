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

export default function Profile() {
  return (
    <View style={styles.Contaner}>
      <XStack alignItems="center">
        <Avatar style={styles.avatar} circular size="$10">
          <Avatar.Image
            accessibilityLabel="Cam"
            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
          />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
      </XStack>
      <Text>index</Text>
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
      separator={<Separator />}
    >
      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="Profile"
          subTitle="Edit Profile"
          icon={UserRoundCog}
          iconAfter={ChevronRight}
        />
      </YGroup.Item>

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
          subTitle="Add Feedback:)"
          icon={MessageSquareText}
          iconAfter={ChevronRight}
        />
      </YGroup.Item>

      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="Contac us"
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
        />
      </YGroup.Item>
    </YGroup>
  );
}

const styles = StyleSheet.create({
  Contaner: {
    alignItems: "center",
    padding: 10,
    display: "flex",
    justifyContent: "center",
    paddingTop: 120,
  },
  avatar: {
    alignSelf: "center",
  },
});
