import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import ValueIndicator from "../valueIndicator";
import graphInformation from "./graphInformation";
import graphConfig from "./graphConfigurations";
import useFetch from "@/hook/useFetch";

const Graph = ({ interval }) => {
  useEffect(() => {
    setBarData(graphInformation[interval].data);
    setBarConfig(graphConfig[interval]);
  }, [interval]);

  const [barData, setBarData] = useState(graphInformation[interval].data);
  const [barConfig, setBarConfig] = useState(graphConfig[interval]);

  const { data, isLoading, error, refetch } = useFetch(
    "deviceUpdates/realtime/2323",
    {timeInterval: interval},
    "GET"
  );

  console.log(data);

  function changeActiveData(index) {
    refetch();
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
    <BarChart
      style={styles.graphContainer}
      data={barData}
      scrollAnimation={true}
      {...graphConfig.common}
      {...barConfig}
      onPress={(value, index) => {
        changeActiveData(index);
      }}
      renderTooltip={(item, index) => {
        return item.active ? <ValueIndicator value={item.value} /> : null;
      }}
    />
  );
};
export default Graph;

const styles = StyleSheet.create({
  graphContainer: {
    width: "90%",
    height: 150,
    position: "relative",
  },
});
