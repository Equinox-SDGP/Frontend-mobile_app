import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Animated,
} from "react-native";
import React, { useRef } from "react";

const index = () => {
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0).current);
  return (
    <View style={{ flexDirection: "row", height: 64 }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotwidth = scrollx.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolater: "clamp",
        });

        const opacity = scrollx.interpolate({
          inputRange,

          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return <View style={styles.dot} key={index.toString()} />;
      })}
      <Paginator data={slides}> </Paginator>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#493d8a",
    marginHorizontal: 8,
  },
});

const data = [1, 2, 3, 4, 5];
