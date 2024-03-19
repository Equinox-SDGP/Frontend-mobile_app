// Import necessary modules and components
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Eye, EyeOff } from "@tamagui/lucide-icons"; // Import Eye and EyeOff icons
import { Image, Input, Button, H3 } from 'tamagui'
import { router, Stack } from 'expo-router';


const SignUpPage = () => {
  // State variables for managing password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to handle login
  const handleLogin = () => {
    // Add your login logic here
  };

  // Function to handle forgot password
  const handleForgotPassword = () => {
    // Add your forgot password logic here
  };
  // JSX code for rendering the sign-in page
  return (
    <View style={{height:"100%"}} >
      <Stack.Screen options={{ header: () => null }} />
        <View style={styles.info}>
        {/* Display sign-in heading */}
        <H3>Create your account</H3> 
        <Text style={styles.infoText}>Create an account to keep up with your solar energy system and invest for a better eco-friendly future.</Text>
        {/* Display sign-in form*/}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTopic}>Personal</Text>
          <Input size="$4" fieldName="First Name" placeholder="First Name" style={styles.inputField}/>
          <Input size="$4" fieldName="Last Name" placeholder="Last Name" style={styles.inputField}/>
          {/* Input field for email */}
          <Text style={{ ...styles.inputTopic, marginTop: 20 }}>Credentials</Text>
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
          <View style={styles.passwordContainer}>
            <Input
              size="$4"
              fieldName="ConfirmPassword"
              placeholder="Confirm Password"
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
          <Button style={styles.signUpButton} onPress={handleLogin}>Sign Up</Button>
          <View style={styles.already}>
            <Text>
              Already have an account?{" "}
              <Pressable
                onPress={() => router.push('/logIn/logIn')}
              >
                <Text style={styles.logInButtonText}>Login</Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  info: {
    justifyContent: "left",
    alignItems: "left",
    paddingHorizontal: 20,
    marginTop: 30

  },
  infoText: {
    textAlign:"justify",
    color:"grey",
    marginBottom: 20
  },
  inputTopic: {
    textAlign: "left",
    fontWeight: "500",
    marginBottom: 10,
    fontSize: 16
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    paddingTop: 10,
    width:"100%",
  },
  inputField: {
    marginBottom: 10,
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
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    borderColor: "transparent",
    backgroundColor: "transparent",
  },
  eyeButton: {
    marginLeft: 10,
  },
  already: {
    marginTop: 12,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  
  logInButtonText: {
    flexDirection: "row",
    color: "#FF621F",
    textDecorationLine: "underline",
  },
  signUpButton:{
    marginTop: 50,
    width: "95%",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#FF621F",
    borderRadius: 30
  },
});