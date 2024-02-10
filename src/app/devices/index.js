import { ListItem } from "tamagui";
import { View, StyleSheet } from "react-native";
import ProductionCard from "../../components/productionCard";

export default function devices() {
  return (
    <View style={styles.container}>
      <ProductionCard />
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