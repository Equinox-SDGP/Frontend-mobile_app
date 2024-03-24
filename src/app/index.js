import { Redirect } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';
import { View } from 'react-native';

const Index = () => {
  const { user, error } = useAuth0();
  console.log(user);

  if (!user) {
    return (
      <View options={{ header: () => null }}>
    <Redirect href="/startPage" />
    </View>
    );
  }
  return( 
    <View options={{ header: () => null }}>
  <Redirect href="/home" />
  </View>
  );
};

export default Index;
