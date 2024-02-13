import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Card, H2, Image, Paragraph, XStack} from "tamagui";
import WeatherIcon from "./../../assets/icons/weatherIcon/day.svg"

export default function SpaceCard() {
  return (
    <DemoCard
      animation="bouncy"
      size="$4"
      width={350}
      height={200}
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
    />
  );
}
export function DemoCard(props) {
  return (
    <Card elevate size="$4" bordered {...props}>
      <Card.Header padded>
        <H2>Home</H2>
        {/* <WeatherIcon width={30} height={30} /> */}

        <Paragraph theme="alt2">Now available</Paragraph>
      </Card.Header>

      <Card.Footer padded>
        <XStack flex={1} />

        <Button borderRadius="$10">Purchase</Button>
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
    </Card>
  );
}

const styles = StyleSheet.create({});
