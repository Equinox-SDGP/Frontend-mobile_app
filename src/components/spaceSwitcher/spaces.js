import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import { Card, H2, Image, Paragraph, XStack, YStack } from 'tamagui';

export default function SpaceCard({ data }) {
  const windowWidth = useWindowDimensions().width;

  // Check if data is available, otherwise use default values or placeholders
  const plantName = data?.plantName || 'Plant Name';
  const dayPower = data?.dataItemMap?.day_power || null;

  return (
    <Card
      elevate
      size="$4"
      marginHorizontal={15}
      animation="bouncy"
      width={windowWidth - 80}
      height={170}
      scale={0.9}
      pressStyle={{ scale: 0.985 }}
    >
      <Card.Header>
        <YStack rowGap={-5}>
          <XStack alignItems="center" maxHeight="$3" columnGap={-5}>
            <H2 style={styles.spaceTitle} marginBottom={0}>
              {plantName}
            </H2>
            <Image style={{ width: 120, height: 120 }} source={{ uri: `http://openweathermap.org/img/w/25.png` }} />
          </XStack>
          <Paragraph theme="alt2">Western Province</Paragraph>
        </YStack>
      </Card.Header>

      <Card.Footer padded>
        <YStack>
          <Text style={styles.productionText}>{dayPower} kW</Text>
          <Text style={styles.productionTitle}>Daily Production </Text>
        </YStack>
      </Card.Footer>
      <Indicator status={data.healthStatus || 'Healthy'} />
    </Card>
  );
}

function Indicator({ status }) {
  return (
    <View style={styles.solarStatus}>
      <View style={status === 'Healthy' ? styles.healthyIndicator : styles.faultyIndicator}></View>
      <Text>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  spaceTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#2E2E2E',
  },
  productionText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FF621F',
  },
  productionTitle: {
    fontSize: 14,
    fontWeight: '300',
    color: '#2E2E2E',
  },
  solarStatus: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  healthyIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00A958',
  },
  faultyIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
});
