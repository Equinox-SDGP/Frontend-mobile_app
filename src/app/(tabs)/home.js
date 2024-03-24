// External Library Imports
import { ScrollView, XStack, YStack, Text, Toast } from 'tamagui';

import { View, StyleSheet, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';

// Component Imports
import StatCard from '@/components/statsCard';
import ProductionCard from '@/components/productionCard';
import SpaceSwitcher from '@/components/spaceSwitcher';
import HomeHeader from '@/components/header';
import moment from 'moment';

// Hooks Imports
import { SpaceContext } from '@/hook/useContext/spaceContext';
import useFetch from '@/hook/useFetch';

// Asset Imports
import walletIcon from '@/assets/icons/wallet.png';
import leafIcon from '@/assets/icons/leaf.png';

export default function Devices() {
  const spaceQuery = useFetch('/space/info', null, 'POST');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    spaceQuery.refetch();
    setRefreshing(spaceQuery.isLoading);
  };

  return (
    <SpaceContext.Provider value={spaceQuery.data}>
      <View style={styles.container}>
        <ScrollView
          style={{ padding: 24 }}
          refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
        >
          <YStack rowGap={10}>
            <HomeHeader />
            <SpaceSwitcher />
            <ProductionCard />
            <XStack columnGap={10}>
              <StatCard icon={walletIcon} {...moneyStats} />
              <StatCard icon={leafIcon} {...co2Stats} />
            </XStack>
          </YStack>
        </ScrollView>
      </View>
    </SpaceContext.Provider>
  );
}

const moneyStats = {
  type: 'Money',
  label: 'Money Saved!',
  amount: 'Rs. 5000',
};
const co2Stats = {
  type: 'CO2 Reduction',
  label: 'CO2 Reduction',
  amount: '-0.5kg',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
