import { ScrollView, XStack, YStack } from "tamagui";
import { View, StyleSheet } from "react-native";
import StatCard from "@/components/statsCard";
import ProductionCard from "@/components/productionCard";
import SpaceCard from "@/components/spaces";
import ProfilePic from "@/components/profilePic";

import walletIcon from "@/assets/icons/wallet.png";
import leafIcon from "@/assets/icons/leaf.png";

export default function Devices() {
  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 24 }}>
        <YStack rowGap={10}>
          <ProfilePic />
          <ScrollView
            horizontal={true}
            decelerationRate={0}
            snapToInterval={320}
            snapToAlignment="center">
            <XStack>
              <SpaceCard />
              <SpaceCard />
              <SpaceCard />
            </XStack>
          </ScrollView>

          <ProductionCard />
          <XStack columnGap={10}>
            <StatCard icon={walletIcon} {...co2Stats} />
            <StatCard icon={leafIcon} {...moneyStats} />
          </XStack>
        </YStack>
      </ScrollView>
    </View>
  );
}

const moneyStats = {
  type: "Money",
  label: "Money Saved!",
  amount: 5000,
};
const co2Stats = {
  type: "CO2 Reduction",
  label: "CO2 Reduction",
  amount: "-0.5kg",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
  },
});
