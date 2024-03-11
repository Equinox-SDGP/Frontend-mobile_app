import { StyleSheet, View, Animated, useWindowDimensions } from "react-native";
import React from "react";

// ref: https://youtu.be/Efy48Uoa4RM?feature=shared
const paginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={{ flexDirection: "row", height: 15 }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [5, 12, 5],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={i.toString()}
            style={[
              styles.dot,
              { width: dotWidth },
              { opacity },
            ]}></Animated.View>
        );
      })}
    </View>
  );
};

export default paginator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dot: {
    height: 5,
    backgroundColor: "#595959",
    marginHorizontal: 4,
    borderRadius: 5,
  },
});
