import React, { useEffect, useState } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';
import { View, ActivityIndicator } from 'react-native';

const Index = () => {
  const { user, error } = useAuth0();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to false once user data is fetched
    if (user || error) {
      setLoading(false);
    }
  }, [user, error]);

  if (loading) {
    // Show loading indicator while waiting for user data
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Stack.Screen options={{ header: () => null }} />
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Once loading is complete, redirect based on user authentication status
  return (
    <View>
      <Stack.Screen options={{ header: () => null }} />
      {user ? <Redirect href="/home" /> : <Redirect href="/startPage" />}
    </View>
  );
};

export default Index;
