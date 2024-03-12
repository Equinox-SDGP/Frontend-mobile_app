// External Library Imports
import { ScrollView, XStack, YStack } from "tamagui";
import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

// Component Imports
import StatCard from "@/components/statsCard";
import ProductionCard from "@/components/productionCard";
import SpaceSwitcher from "@/components/spaceSwitcher";
import HomeHeader from "@/components/header";
import moment from "moment";

// Hooks Imports
import { ProductionContext } from "@/hook/useContext/productionContext";
import useFetch from "@/hook/useFetch";

// Asset Imports
import walletIcon from "@/assets/icons/wallet.png";
import leafIcon from "@/assets/icons/leaf.png";

export default function Devices() {
  const endTime = moment(1589598900);
  const startTime = moment(endTime).subtract(1, "week");

  const durationOptions = {
    startTime: startTime.valueOf(),
    endTime: endTime.valueOf(),
    timeInterval: "day",
  };

  const [query, setQuery] = useState({
    id: "1BY6WEcLGh8j5v7",
    queryBody: durationOptions,
  });
  const fetch = useFetch(
    `deviceUpdates/historical/${query.id}`,
    query.queryBody,
    "POST"
  );

  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 24 }}>
        <YStack rowGap={10}>
          <HomeHeader />
          <ProductionContext.Provider value={{ fetch, query, setQuery }}>
            <SpaceSwitcher />
            <ProductionCard />
            <XStack columnGap={10}>
              <StatCard icon={walletIcon} {...co2Stats} />
              <StatCard icon={leafIcon} {...moneyStats} />
            </XStack>
          </ProductionContext.Provider>
        </YStack>
      </ScrollView>
    </View>
  );
}

const moneyStats = {
  type: "Money",
  label: "Money Saved!",
  amount: "Rs. 5000",
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
