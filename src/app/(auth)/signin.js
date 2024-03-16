// Import necessary modules and components
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Image, Input, Button, H4 } from 'tamagui'
import EquinoxCover from "@/assets/images/solar1.png"; // Importing cover image
import { Eye, EyeOff } from "@tamagui/lucide-icons"; // Import Eye and EyeOff icons
import { router } from 'expo-router';
// import { useSession } from '../../hook/useSession'; // Import useSession hook from useSession file

const SignInPage = () => {
  // State variables for managing user info and password visibility
  const [userInfo, setUserInfo] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { signIn } = useSession();

  // Initialize Google sign-in
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1011648521385-7o9120cum1e5vdn1lcvfc5uk5v0ssamm.apps.googleusercontent.com",
    iosClientId:
      "1011648521385-ero96u6o1105fh8flf4p9j2ol9ode549.apps.googleusercontent.com",
    webClientId:"1011648521385-jf5c1egcr5njff9hidtv1iha88vfbf7u.apps.googleusercontent.com"
  });

  // Effect hook to handle Google sign-in response
  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  // Function to handle Google sign-in
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

  // Function to fetch user info from Google API
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
            {/* Display user information */}
          console.log(JSON.stringify(userInfo, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("@user");
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to handle login
  const handleLogin = () => {


// Function to handle login
const handleLogin = () => {
  // Get the navigation object using the useNavigation hook
  const navigation = useNavigation();
  
  // Navigate to the index.js file
  navigation.navigate('index');
};

  };

  // Function to handle forgot password
  const handleForgotPassword = () => {
    // Add your forgot password logic here
  };
  // JSX code for rendering the sign-in page
  return (
    <View style={{height:"100%"}} >
        {/* Display cover image */}
        <Image
          source={{
            uri: EquinoxCover,
            height: 300,
          }}
          style={styles.coverImage}
        />
        <View style={styles.container}>
        {/* Display sign-in heading */}
        <H4>Welcome to Equinox</H4> 
        {/* Display sign-in form*/}
        <View style={styles.inputContainer}>
          {/* Input field for email */}
          <Input
            size="$4"
            fieldName="Email"
            placeholder="Email"
            style={styles.inputField}
          />
          {/* Input field for password with dynamic secureTextEntry based on password visibility state */}
          <View style={styles.passwordContainer}>
            <Input
              size="$4"
              fieldName="Password"
              placeholder="Password"
              secureTextEntry={!passwordVisible} // Set secureTextEntry based on password visibility state
              style={styles.passwordInput}
            />
            {/* Button to toggle password visibility */}
            <Button size="$4" onPress={togglePasswordVisibility} backgroundColor="white" style={styles.eyeButton}>
              {/* Show Eye icon when password is hidden and EyeOff icon when password is visible */}
              {passwordVisible ? <EyeOff /> : <Eye />}
            </Button>
          </View>
          {/* Button to log in */}
          <Button style={styles.logInButton} 
        //   onPress={() => {
        //   signIn();
        //   // Navigate after signing in. You may want to tweak this to ensure sign-in is
        //   // successful before navigating.
        //   router.replace('/');
        // }}
        >Log In</Button>
          <Button style={styles.forgotPassword} onPress={handleForgotPassword}>Forgot Password?</Button>
        </View>

        {/* Google Sign-in button */}
        <Text>OR</Text>
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => promptAsync()}
        />
      </View>
      {/* Display app version and copyright */}
      <View style={styles.versionContainer}>
        <Text style={styles.version}>Version 1.0</Text>
        <Text style={styles.version}>© 2024 Equinox</Text>
        </View>
    </View>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  coverImage: {
    width: "100%",
    height: 300,
  },
  inputContainer: {
    paddingHorizontal: 25,
    paddingTop: 20,
    width:"100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    marginBottom: 15,
    borderRadius: 10,
    borderColor: "lightgrey",
    borderWidth: 1,
    backgroundColor: "#fff",
    width:"100%"
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "lightgrey",
    borderWidth: 1,
  },
  passwordInput: {
    flex: 1,
    borderColor: "transparent",
    backgroundColor: "transparent",
  },
  eyeButton: {
    marginLeft: 10,
  },
  googleButton: {
    marginTop: 10,
    width:"70%"
  },
  logInButton: {
    marginTop: 20,
    width: "50%",
    color: "white",
    backgroundColor: "#FF621F",
  },
  forgotPassword: {
    marginTop: 20,
    color: "grey",
    height: 30,
    backgroundColor: "transparent",
    marginBottom: 10,
  },
  versionContainer: {
    justifyContent: "center",
    alignItems: "center",
    bottom: -10, 
  },
  version: {
    color: "grey",
    fontSize: 12,
  },
});
