// External Library Imports
import { ScrollView, XStack, YStack } from 'tamagui'; // Importing layout components from tamagui library
import { View, StyleSheet, RefreshControl } from 'react-native'; // Importing necessary components from React Native
import { useEffect, useState } from 'react'; // Importing hooks from React

// Component Imports
import StatCard from '@/components/statsCard'; // Importing custom StatCard component
import ProductionCard from '@/components/productionCard'; // Importing custom ProductionCard component
import SpaceSwitcher from '@/components/spaceSwitcher'; // Importing custom SpaceSwitcher component
import HomeHeader from '@/components/header'; // Importing custom HomeHeader component
import moment from 'moment'; // Importing moment library for date manipulation

// Hooks Imports
import { ProductionContext } from '@/hook/useContext/productionContext'; // Importing ProductionContext from custom hook
import { SpaceContext } from '@/hook/useContext/spaceContext'; // Importing SpaceContext from custom hook
import useFetch from '@/hook/useFetch'; // Importing custom hook for data fetching

// Asset Imports
import walletIcon from '@/assets/icons/wallet.png'; // Importing wallet icon from assets
import leafIcon from '@/assets/icons/leaf.png'; // Importing leaf icon from assets

export default function Devices() {
  // Fetching space information using custom hook
  const spaceQuery = useFetch('space/info', {}, 'POST');

  // Defining start and end time for historical data
  const endTime = moment(1589598900); // Example end time
  const startTime = moment(endTime).subtract(1, 'week'); // Example start time

  // Options for historical data query
  const durationOptions = {
    startTime: startTime.valueOf(),
    endTime: endTime.valueOf(),
    timeInterval: 'day',
  };

  // State variables for historical data query and fetching
  const [query, setQuery] = useState({
    id: '1BY6WEcLGh8j5v7', // Example device ID
    queryBody: durationOptions,
  });

  // Fetching historical data using custom hook
  const fetch = useFetch(`deviceUpdates/historical/${query.id}`, query.queryBody, 'POST');

  // Function to handle refresh
  const onRefresh = () => {
    fetch.refetch(); // Refetch historical data
    spaceQuery.refetch(); // Refetch space information
  };

  // State variable for refreshing state
  const [refreshing, setRefreshing] = useState(false);

  return (
    <SpaceContext.Provider value={spaceQuery.data}>
      <View style={styles.container}>
        {/* ScrollView with RefreshControl for pull-to-refresh functionality */}
        <ScrollView style={{ padding: 24 }} refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing}/> }>
          {/* Vertical stack layout */}
          <YStack rowGap={10}>
            {/* Header component */}
            <HomeHeader />
            {/* Context provider for production data */}
            <ProductionContext.Provider value={{ fetch, query, setQuery }}>
              {/* Space switcher component */}
              <SpaceSwitcher />
              {/* Production card component */}
              <ProductionCard />
              {/* Horizontal stack layout for statistics cards */}
              <XStack columnGap={10}>
                {/* Statistic card for money */}
                <StatCard icon={walletIcon} {...moneyStats} />
                {/* Statistic card for CO2 reduction */}
                <StatCard icon={leafIcon} {...co2Stats} />
              </XStack>
            </ProductionContext.Provider>
          </YStack>
        </ScrollView>
      </View>
    </SpaceContext.Provider>
  );
}

// Data for money statistic
const moneyStats = {
  type: 'Money',
  label: 'Money Saved!',
  amount: 'Rs. 5000',
};

// Data for CO2 reduction statistic
const co2Stats = {
  type: 'CO2 Reduction',
  label: 'CO2 Reduction',
  amount: '-0.5kg',
};

// Stylesheet for component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
