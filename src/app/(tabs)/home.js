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

const pricePerUnit = 30; // Price per unit of electricity in Rs.
const co2PerUnit = 0.71; // CO2 emission per unit of electricity in kg
import ErrorPopup from '../../components/errorPopUp';

export default function Devices() {
  // Fetching space information using custom hook
  const spaceQuery = useFetch('/space/info', {}, 'POST');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    spaceQuery.refetch();
    setRefreshing(spaceQuery.isLoading);
  };
  let totalPower = 0; // Total power generated
  if (spaceQuery.data.length > 0) {
    totalPower = Math.round(spaceQuery.data[0].dataItemMap.total_power);
  }

  return (
    <SpaceContext.Provider value={spaceQuery.data}>
      <View style={styles.container}>
        {/* Conditionally render the ErrorPopup component if there's an error */}
        {fetch.error && <ErrorPopup message={`Error fetching data: ${fetch.error.message}`} />}
        {/* ScrollView with RefreshControl for pull-to-refresh functionality */}
        <ScrollView style={{ padding: 24 }} refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing}/> }>
          {/* Vertical stack layout */}
          <YStack rowGap={10}>
            {/* Header component */}
            <HomeHeader />
            {/* Context provider for production data */}
            {/* Space switcher component */}
            <SpaceSwitcher />
            {/* Production card component */}
            {spaceQuery.data.length > 0 && (
              <>
                <ProductionCard />
                <XStack columnGap={10}>
                  {/* Statistic card for money */}
                  <StatCard icon={walletIcon} {...moneyStats} amount={`Rs. ${pricePerUnit * totalPower}`} />
                  {/* Statistic card for CO2 reduction */}
                  <StatCard icon={leafIcon} {...co2Stats} amount={`-${co2PerUnit * totalPower}kg`} />
                </XStack>
              </>
            )}
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
};

// Data for CO2 reduction statistic
const co2Stats = {
  type: 'CO2 Reduction',
  label: 'CO2 Reduction',
};

// Stylesheet for component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
