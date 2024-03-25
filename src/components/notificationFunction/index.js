import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Function to register for push notifications
export const registerForPushNotificationsAsync = async () => {
  let token;

  // Set notification channel settings for Android
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // Check if the device is physical and request permissions
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status === 'granted') {
        finalStatus = status;
      } else {
        // Handle the case where the user denies permission
        console.log('User denied permission for push notifications');
        return null; // Return null token if permission denied
      }
    }

    if (finalStatus === 'granted') {
      // Get the Expo push token if permission granted
      token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
      console.log('Expo push token:', token);
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
};
