import { ListItem, XStack, YStack } from "tamagui";
import { View, StyleSheet } from "react-native";
import StatCard from "../../components/statsCard";
import ProductionCard from "../../components/productionCard";

export default function devices() {
  return (
    <View style={styles.container}>
      <YStack rowGap={10}>
        <ProductionCard />
        <XStack columnGap={10}> 
          <StatCard />
          <StatCard />
        </XStack>
      </YStack>
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
