// Import necessary modules and components
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Image, Button } from 'tamagui';

import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useSession } from '../../hook/useSession';

WebBrowser.maybeCompleteAuthSession();

const SignInPage = () => {
  // State variables for managing user info and password visibility
  const [userInfo, setUserInfo] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Initialize Google sign-in
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '1011648521385-7o9120cum1e5vdn1lcvfc5uk5v0ssamm.apps.googleusercontent.com',
    iosClientId: '1011648521385-ero96u6o1105fh8flf4p9j2ol9ode549.apps.googleusercontent.com',
    webClientId: '1011648521385-jf5c1egcr5njff9hidtv1iha88vfbf7u.apps.googleusercontent.com',
  });

  // Effect hook to handle Google sign-in response
  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  // Function to handle Google sign-in
  const handleSignInWithGoogle = async () => {
    const user = await AsyncStorage.getItem('@user');
    if (!user) {
      if (response?.type === 'success') {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  };

  // Function to fetch user info from Google API
  const getUserInfo = async (token) => {
    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await response.json();
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        console.log('Something went wrong', error);
      }
    }
  };
  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('@user');
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };

  // JSX code for rendering the sign-in page
  return (
    <View style={styles.container1}>
      {/* Google Sign-in button */}
      <Button style={styles.googleButton} onPress={() => promptAsync()}>
        {/* Use the Image component from react-native to render the Google icon image */}
        <Image source={require('@/assets/images/google.png')} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </Button>

      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
    </View>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  container1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    marginTop: 10,
    width: '130%',
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderRadius: 30,
    borderColor: 'lightgrey',
  },
  googleIcon: {
    height: 20,
    width: 20,
    right: 70,
  },
  googleButtonText: {
    color: 'black',
    fontWeight: 'bold',
    right: 70,
  },
});
