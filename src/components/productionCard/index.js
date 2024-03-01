import { StyleSheet } from "react-native";
import React, { lazy, useMemo, useState } from "react";
import { Button, Card, Text, ToggleGroup, XStack, YStack } from "tamagui";
import Graph from "./components/graph";
import SelectDuration from "./components/selectDuration";

const ProductionCard = () => {
  const [interval, setInterval] = useState("daily"); // ["hourly", "daily", "weekly", "monthly", "yearly"
  const handleIntervalChange = (value) => {
    setInterval(value);
  };
  return (
    <Card width="100%" borderRadius={15}>
      <Card.Header>
        <XStack style={styles.cardHeader}>
          <Text fontSize={16} fontWeight={"700"}>
            Energy Production
          </Text>
          <SelectDuration handleIntervalChange={handleIntervalChange} />
        </XStack>
      </Card.Header>
      <Card.Footer justifyContent="center" style={styles.cardFooter}>
        <YStack minWidth={"100%"} rowGap={25} overflow="hidden">
          <Graph interval={interval} />
        </YStack>
      </Card.Footer>
    </Card>
  );
};

export default ProductionCard;

const styles = StyleSheet.create({
  cardHeader: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  cardFooter: {
    position: "relative",
    padding: 20,
  },
  toggleGroup: {
    display: "flex",
    borderRadius: 30,
    height: 40,
  },
  toggleItem: {
    paddingHorizontal: 10,
    borderRadius: 30,
    color: "#333",
    fontWeight: "800",
  },
  toggleText: {
    color: "#333",
    fontWeight: "800",
    paddingHorizontal: 10,
    fontSize: 12,
  },
});
