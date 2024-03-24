import { useAuth0 } from 'react-native-auth0';
import { Button } from 'tamagui';
import * as WebBrowser from 'expo-web-browser';
import { router } from 'expo-router';

const LogoutButton = () => {
  // https://goferworkondemand.eu.auth0.com/v2/logout
  const { clearSession, user } = useAuth0();
  const onPress = async () => {
    try {
      clearSession();
      router.replace('/');
    } catch (e) {
      console.log(e);
    }
  };
  return <Button onPress={onPress}>Logout</Button>;
};

export default LogoutButton;
