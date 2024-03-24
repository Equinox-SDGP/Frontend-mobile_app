import { Redirect } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';

const Index = () => {
  const { user, error } = useAuth0();
  console.log(user);

  if (!user) {
    return <Redirect href="/startPage" />;
  }
  return <Redirect href="/home" />;
};

export default Index;
