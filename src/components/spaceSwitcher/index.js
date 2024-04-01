import { StyleSheet, Text, FlatList, View, useWindowDimensions, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import SpaceCard from './spaces';
import Paginator from './paginator';
import { useSpaceContext } from '@/hook/useContext/spaceContext';

const SpaceSwitcher = () => {
  const spaceData = useSpaceContext();
  const windowWidth = useWindowDimensions().width;

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const sliderRef = useRef(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={spaceData}
        marginBottom={10}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={windowWidth - 50}
        bounces={false}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        keyExtractor={(item) => item.stationCode}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        scrollEventThrottle={32}
        viewAbilityConfig={viewConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({ item, index }) => {
          return <SpaceCard key={index} data={item} />;
        }}
        ref={sliderRef}
      ></FlatList>
      <Paginator data={spaceData} scrollX={scrollX} />
    </View>
  );
};


export default SpaceSwitcher;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});