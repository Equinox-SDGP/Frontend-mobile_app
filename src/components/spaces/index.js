import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, H2, Image, Paragraph, XStack, YStack } from "tamagui";
import DayWeather from "@/assets/icons/weatherIcons/cloudy.svg";

export default function SpaceCard(props) {
  return (
    <Card
      elevate
      size="$4"
      bordered
      animation="bouncy"
      width={320}
      height={170}
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}>
      <Card.Header>
        <YStack>
          <XStack alignItems="center" maxHeight="$3" columnGap={-10}>
            <H2 marginBottom={0}>Home</H2>
            <View>
              <DayWeather marginBottom={-5} width={75} height={75} />
            </View>
          </XStack>
          <Paragraph theme="alt2">Colombo,sri lanka</Paragraph>
        </YStack>
      </Card.Header>

      <Card.Footer padded>
        <YStack>
          <Text style={styles.productionText}>24kWh</Text>
          <Text style={styles.productionTitle}>Daily Production </Text>
        </YStack>
      </Card.Footer>

      <Card.Background>
        <Image
          resizeMode="contain"
          alignSelf="center"
          source={{
            width: 200,
            height: 200,
          }}
        />
      </Card.Background>
      <Indicator status="Healthy" />
    </Card>
  );
}

function Indicator({ status }) {
  return (
    <View style={styles.solarStatus}>
      <View
        style={
          status === "Healthy"
            ? styles.healthyIndicator
            : styles.faultyIndicator
        }></View>
      <Text>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  productionText: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FF621F",
  },
  productionTitle: {
    fontSize: 14,
    fontWeight: "300",
    color: "#2E2E2E",
  },
  solarStatus: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  healthyIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
  },
  faultyIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
  },
});
