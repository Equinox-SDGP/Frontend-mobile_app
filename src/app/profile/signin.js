import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import TextField from "@/components/textField";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1011648521385-7o9120cum1e5vdn1lcvfc5uk5v0ssamm.apps.googleusercontent.com",
    iosClientId:
      "1011648521385-ero96u6o1105fh8flf4p9j2ol9ode549.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  const handleSignInWithGoogle = async () => {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  };

  const getUserInfo = async (token) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("@user");
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextField size="$4" fieldName="Email" label="  Email" />
      <TextField size="$4" fieldName="Password" label=" Your Password" />
      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => promptAsync()}
      />
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
