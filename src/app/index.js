import React, { useEffect, useState } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';
import { View, ActivityIndicator } from 'react-native';
import { registerForPushNotificationsAsync } from '../components/notificationFunction'; // Note the correct import

const Index = () => {
  const { user, error } = useAuth0();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to handle the asynchronous operation
    const fetchData = async () => {

      // Set loading to false after 3 seconds
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      // Register for push notifications
      await registerForPushNotificationsAsync();

      // Clear the timer on component unmount
      return () => clearTimeout(timer);
    };

    // Call the fetchData function
    fetchData();
  }, []);

  if (loading) {
    // Show loading indicator while waiting for user data
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Stack.Screen options={{ header: () => null }} />
        <ActivityIndicator size="large" color="#FF621F" />
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
