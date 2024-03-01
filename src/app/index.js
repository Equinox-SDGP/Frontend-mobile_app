import { ScrollView, XStack, YStack } from "tamagui";
import { View, StyleSheet } from "react-native";
import StatCard from "@/components/statsCard";
import ProductionCard from "@/components/productionCard";
import SpaceCard from "@/components/spaces";
import ProfilePic from "@/components/profilePic";

export default function devices() {
  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 24 }}>
        <YStack rowGap={10}>
          <ProfilePic />
          <ScrollView
            horizontal={true}
            decelerationRate={0}
            snapToInterval={320}
            snapToAlignment="center"
            >
            <XStack>
              <SpaceCard />
              <SpaceCard />
              <SpaceCard />
            </XStack>
          </ScrollView>

          <ProductionCard />
          <XStack columnGap={10}>
            <StatCard />
            <StatCard />
          </XStack>
        </YStack>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "center",
  },
});
