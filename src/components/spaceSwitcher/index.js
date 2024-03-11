import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import { XStack, ScrollView } from "tamagui";
import SpaceCard from "./spaces";
import Paginator from "./paginator";

const SpaceSwitcher = () => {
  windowWidth = useWindowDimensions().width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const sliderRef = useRef(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <ScrollView
        overflow="shown"
        marginBottom={10}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={windowWidth - 50}
        bounces={false}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        viewAbilityConfig={viewConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        ref={sliderRef}>
        {data.map((item, index) => {
          return <SpaceCard key={index} data={item} />;
        })}
      </ScrollView>
      <Paginator data={data} scrollX={scrollX} />
    </View>
  );
};

export default SpaceSwitcher;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

const data = [
  {
    id: "1",
    title: "Home",
  },
  {
    id: "2",
    title: "Office",
  },
  {
    id: "3",
    title: "Factory",
  },
];
