import React, { useEffect, useState } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';
import { View, ActivityIndicator } from 'react-native';
import * as Notifications from 'expo-notifications';

const Index = () => {
  const { user, error } = useAuth0();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);

    // Send notification when the component mounts
    sendNotification();
  }, []);

  // Function to send a notification
  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Welcome!',
        body: 'Thank you for downloading Equinox.',
      },
      trigger: null, // Send immediately
    });
  };

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
