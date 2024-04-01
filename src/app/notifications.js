import { useState, useEffect, useRef } from "react";
import { Text, View, Button } from "react-native";
import * as Notifications from "expo-notifications";

// Define the notification handler settings
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  // State variables for storing the push token and notification
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);

  // Refs for storing notification listeners
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {

    // Add notification listener
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // Add notification response listener
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    // Remove notification listeners when component unmounts
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Function to send a scheduled notification
  const sendNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: { seconds: 2 },
    });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {/* Display the Expo push token */}
      <Text>Your expo push token: {expoPushToken}</Text>

      {/* Display notification details */}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data: {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>

      {/* Button to schedule a notification */}
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await sendNotification(
            "Test Notification",
            "This is a test notification"
          );
        }}
      />
    </View>
  );
}