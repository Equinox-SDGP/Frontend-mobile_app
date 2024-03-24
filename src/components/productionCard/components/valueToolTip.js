import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ValueToolTip = ({ value }) => {
  return (
    <View style={styles.indicator}>
      <Text style={styles.text}>{value}kWh</Text>
    </View>
  );
};

export default ValueToolTip;

const styles = StyleSheet.create({
  indicator: {
    position: "relative",
    marginBottom: 10,
    marginLeft: -20,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#FF621F",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
