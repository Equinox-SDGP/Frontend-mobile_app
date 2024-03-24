import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarChart } from 'react-native-gifted-charts';
import moment from 'moment';

import useFetch from '@/hook/useFetch';
import graphConfig from './graphConfigurations';
import ValueToolTip from '../valueToolTip';

const Graph = ({ interval }) => {
  const [collectTime, setCollectTime] = useState(moment().valueOf());

  const queryParams = {
    collectTime: String(collectTime),
    timeInterval: interval,
  };
  const spaceId = 'NE=51002841';

  const { data, isLoading, error, refetch } = useFetch(`/spaceUpdates/historical/graph/${spaceId}`, queryParams, 'GET');
  const graphData = data[interval];

  const [barConfig, setBarConfig] = useState(graphConfig[interval]);
  const [selectedBarIndex, setSelectedBarIndex] = useState(null);

  useEffect(() => {
    refetch();
    setBarConfig(graphConfig[interval]);
  }, [interval]);

  const handleBarPress = (index) => {
    setSelectedBarIndex(index);
  };

  return (
    <>
      {isLoading && <ActivityIndicator />}
      {data[interval] && (
        <BarChart
          isAnimated
          style={styles.graphContainer}
          data={graphData['data']}
          maxValue={3}
          scrollAnimation={true}
          {...graphConfig.common}
          {...barConfig}
          renderTooltip={(item) => {
            return <ValueToolTip value={item.value} />;
          }}
        />
      )}
    </>
  );
};

export default Graph;

const styles = StyleSheet.create({
  graphContainer: {
    width: '90%',
    height: 150,
    position: 'absolute',
  },
  bar: {
    flex: 1,
    marginHorizontal: 2,
  },
});
