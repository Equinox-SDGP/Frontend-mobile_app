import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import ValueIndicator from "./valueIndicator";

const Graph = () => {
  const [barData, setBarData] = useState([
    { value: 250, label: "M" },
    { value: 500, label: "T" },
    { value: 745, label: "W" },
    { value: 320, label: "T" },
    { value: 600, label: "F" },
    { value: 256, label: "S" },
    { value: 300, label: "S" },
  ]);

  function changeActiveData(index) {
    setBarData((prev) => {
      return prev.map((item, i) => {
        if (i === index) {
          return { ...item, active: true, frontColor: "#FF621F" };
        }
        return { ...item, active: false, frontColor: "#E2E2E2" };
      });
    });
  }

  return (
    <View>
      <BarChart
        maxValue={1000}
        height={150}
        width={300}
        barWidth={20}
        noOfSections={4}
        barBorderRadius={4}
        frontColor="#E2E2E2"
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
        hideYAxisText
        onPress={(value, index) => {
          changeActiveData(index);
        }}
        renderTooltip={(item, index) => {
          return <ValueIndicator value={item.value} />;
        }}
      />
    </View>
  );
};

export default Graph;

const styles = StyleSheet.create({
  
});
