import { StyleSheet } from "react-native";
import React from "react";
import { Button, Card, Text, View, XStack, YStack } from "tamagui";
import Graph from "./components/Graph";

const ProductionCard = () => {
  return (
    <Card width={380} rowGap={15}>
      <Card.Header>
        <YStack rowGap={10}>
          <Text fontSize={16} fontWeight={"bold"}>
            Production Card
          </Text>
          <XStack justifyContent="left">
            <Button size="$2" theme="active">
              Daily
            </Button>
            <Button size="$2" variant="outlined">
              Weekly
            </Button>
            <Button size="$2" variant="outlined">
              Monthly
            </Button>
            <Button size="$2" variant="outlined">
              Yearly
            </Button>
          </XStack>
        </YStack>
      </Card.Header>
      <Card.Footer justifyContent="center">
        <YStack rowGap={25}>
          <Graph />
          <YStack alignContent="center">
            <Text textAlign="center" fontSize={16}>
              Total Production
            </Text>
            <Text textAlign="center" fontSize={16}>
              1,500 kWh
            </Text>
          </YStack>
        </YStack>
      </Card.Footer>
    </Card>
  );
};

export default ProductionCard;

const styles = StyleSheet.create({});
