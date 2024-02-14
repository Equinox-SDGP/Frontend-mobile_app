import { StyleSheet, Text, View } from "react-native";
import React from "react";

const valueIndicator = ({ value }) => {
  return (
    <View style={styles.indicator}>
      <Text style={styles.text}>{value}kWh</Text>
    </View>
  );
};

export default valueIndicator;

const styles = StyleSheet.create({
  indicator: {
    marginBottom: 20,
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
