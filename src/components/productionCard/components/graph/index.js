import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarChart } from 'react-native-gifted-charts'; // Import BarChart component from react-native-gifted-charts
import moment from 'moment'; // Import moment library for date manipulation

import useFetch from '@/hook/useFetch'; // Import custom hook for fetching data
import graphConfig from './graphConfigurations'; // Import graph configuration
import ValueToolTip from '../valueToolTip'; // Import custom tooltip component

// Graph component definition
const Graph = ({ interval }) => {
  const [collectTime, setCollectTime] = useState(moment().valueOf()); // State for current time

  // Query parameters for fetching data
  const queryParams = {
    collectTime: String(collectTime),
    timeInterval: interval,
  };
  const spaceId = 'NE=51002841'; // Space ID for fetching data

  // Fetch data using custom hook
  const { data, isLoading, refetch } = useFetch(`/spaceUpdates/historical/graph/${spaceId}`, queryParams, 'GET');
  const graphData = data[interval]; // Extract graph data for specified interval

  const [barConfig, setBarConfig] = useState(graphConfig[interval]); // State for graph configuration
  const [selectedBarIndex, setSelectedBarIndex] = useState(null); // State for selected bar index

  // Effect to refetch data when interval changes
  useEffect(() => {
    refetch(); // Refetch data
    setBarConfig(graphConfig[interval]); // Update graph configuration
  }, [interval]);

  // Function to handle bar press event
  const handleBarPress = (index) => {
    setSelectedBarIndex(index); // Update selected bar index
  };

  return (
    <>
      {/* Display loading indicator while data is loading */}
      {isLoading && <ActivityIndicator />}
      {/* Render BarChart with empty data array when not loading */}
      {!isLoading && (
        <BarChart
          isAnimated
          style={styles.graphContainer}
          data={graphData ? graphData['data'] : []} // Render with empty data array if graphData is falsy
          maxValue={3} // Maximum value for y-axis
          scrollAnimation={true} // Enable scroll animation
          {...graphConfig.common} // Spread common graph configurations
          {...barConfig} // Spread specific graph configurations for current interval
          renderTooltip={(item) => {
            return <ValueToolTip value={item.value} />; // Render tooltip for each data point
          }}
        />
      )}
    </>
  );
};

export default Graph; // Export Graph component

// Styles for Graph component
const styles = StyleSheet.create({
  graphContainer: {
    width: '90%', // Set width to 90% of container
    height: 150, // Set height to 150
    position: 'absolute', // Position the graph absolutely
  },
  bar: {
    flex: 1, // Flex 1 for bar
    marginHorizontal: 2, // Horizontal margin of 2
  },
});
