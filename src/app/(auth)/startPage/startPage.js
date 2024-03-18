// Import necessary modules and components
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image, Input, Button, H4 } from 'tamagui'
import EquinoxCover from "@/assets/images/solar1.png"; // Importing cover image
import GoogleSignIn from "@/components/googleSignIn/gSignin"; // Import GoogleSignIn component
import { router } from 'expo-router';

const StartPage = () => {
  // Function to handle login
  const handleLogin = () => {
    // Add your login logic here
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
          <Button style={styles.signUpButton} onPress={() => router.push('/(auth)/signUp/signUp')}>Sign Up</Button>
          <Button style={styles.logInButton} onPress={() => router.push('/logIn/logIn')}>Log In</Button>
        </View>

        {/* Google Sign-in button */}
        <Text>or</Text>

        <GoogleSignIn/>
      </View>

      {/* Display app version and copyright */}
      <View style={styles.versionContainer}>
        <Text style={styles.version}>Version 1.0</Text>
        <Text style={styles.version}>© 2024 Equinox</Text>
        </View>
    </View>
  );
};

export default StartPage;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  coverImage: {
    width: "100%",
    height: 350,
    marginBottom: 20,
  },
  inputContainer: {
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
  logInButton: {
    marginTop: 20,
    width: "95%",
    color: "black",
    fontWeight: "bold",
    backgroundColor: "white",
    borderRadius: 30,
    borderColor: "lightgrey",
    marginBottom: 10,
  },
  signUpButton:{
    marginTop: 20,
    width: "95%",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#FF621F",
    borderRadius: 30
  },
  versionContainer: {
    justifyContent: "center",
    alignItems: "center",
    bottom: -50, 
  },
  version: {
    color: "grey",
    fontSize: 12,
  },
});