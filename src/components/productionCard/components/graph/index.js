import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import ValueIndicator from "../valueIndicator";

import graphInformation from "./graphInformation";
import graphConfig from "./graphConfigurations";

import { useProductionContext } from "@/hook/useContext/productionContext";

const Graph = ({ interval }) => {
  const { fetch } = useProductionContext();
  const { data, refetch } = fetch;

  const [barData, setBarData] = useState(graphInformation[interval].data);
  const [barConfig, setBarConfig] = useState(graphConfig[interval]);

  useEffect(() => {
    refetch();
    setBarData(graphInformation[interval].data);
    setBarConfig(graphConfig[interval]);
  }, [interval]);

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
