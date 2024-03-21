// Import necessary modules and components
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Eye, EyeOff } from "@tamagui/lucide-icons"; // Import Eye and EyeOff icons
import { Image, Input, Button, H3 } from 'tamagui'
import { router, Stack } from 'expo-router';
import auth from '@react-native-firebase/auth';

const logInPage = () => {
  //Set username and password useStates
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State variables for managing password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to handle login
  const handleLogin = () => {
    if ( email && password) {
      try {
        const response = auth().signInWithEmailAndPassword(email, password);
        if (response.user){
          router.push('/home');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Function to handle forgot password
  const handleForgotPassword = () => {
    // Add your forgot password logic here
  };
  // JSX code for rendering the sign-in page
  return (
<View style={{height:"100%"}} >
        <View style={styles.info}>
        {/* Display sign-in heading */}
        <Stack.Screen options={{ header: () => null }} />
        <H3>Login</H3> 
        <Text style={styles.infoText}>Welcome back! {"\n"}Hope you are ready to save money and the environment</Text>
      
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
          <Button style={styles.forgotPassword} 
            onPress={handleForgotPassword}>Forgot Password?
            </Button>

          {/* Button to log in */}
          <Button style={styles.logInButton} onPress={handleLogin}>Login</Button>
          <View style={styles.already}>
            <Text>
              Don't have an account?{" "}
              <Pressable
                onPress={() => router.push('/signUp/signUp')}
              >
                <Text style={styles.signUpButtonText}>SignUp</Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </View>
  );
};

export default logInPage;

const styles = StyleSheet.create({
    info: {
        justifyContent: "left",
        alignItems: "left",
        paddingHorizontal: 20,
        marginTop: 20
      },
      infoText: {
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
      forgotPassword: {
        marginTop: 20,
        color: "grey",
        height: 30,
        backgroundColor: "transparent",

        marginBottom: 190,
      },
      already: {
        marginTop: 12,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
      },
      
      signUpButtonText: {
        flexDirection: "row",
        color: "#FF621F",
        textDecorationLine: "underline",
      },
      logInButton:{
        marginTop: 50,
        width: "95%",
        color: "white",
        fontWeight: "bold",
        backgroundColor: "#FF621F",
        borderRadius: 30,
        marginBottom: 13

      },
});