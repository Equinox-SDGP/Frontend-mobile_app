import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { Image, Input, Button, H3 } from 'tamagui'
import { router, Stack } from 'expo-router'; // Importing router and Stack from expo-router
import {auth} from '../../../../firebase'; // Importing authentication module from Firebase
import {db} from '../../../../firebase'; // Importing database module from Firebase

const SignUpPage = () => {
  // State variables for user input fields and password visibility
  const [email, setEmail] = useState(''); // State variable for email
  const [password, setPassword] = useState(''); // State variable for password
  const [confirmPassword, setConfirmPassword] = useState(''); // State variable for confirm password
  const [firstName, setFirstName] = useState(''); // State variable for first name
  const [lastName, setLastName] = useState(''); // State variable for last name
  const [passwordVisible, setPasswordVisible] = useState(false); // State variable to toggle password visibility

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to create user profile in the database
  const createProfile = async (response) => {
    // Set user's first name and last name in the database
    db.ref('users/' + response.user.uid).set({ firstName, lastName });
  }

 // Function to handle sign up
const handleSignUp = async () => {
  // Check if all required fields are filled and passwords match
  if (email && password && confirmPassword) {
    if (password === confirmPassword) {
      try {
        // Create user with email and password
        const response = await auth().createUserWithEmailAndPassword(email, password);
        if (response.user) {
          // Create user profile
          await createProfile(response);
          // Redirect user to home page
          router.push('/home');
        }
      } catch (error) {
        // Handle authentication errors
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      }
    } else {
      // Passwords do not match, send error message
      console.log('Password and confirm password do not match!');
    }
  } else {
    // Required fields are not filled, send error message
    console.log('Please fill in all required fields!');
  }
};

  return (
    <View style={{ height: "100%" }}>
      <Stack.Screen options={{ header: () => null }} />
      <View style={styles.info}>
        <H3>Create your account</H3>
        <Text style={styles.infoText}>Create an account to keep up with your solar energy system and invest for a better eco-friendly future.</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTopic}>Personal</Text>
          <Input size="$4" fieldName="First Name"
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.inputField}
          />
          <Input size="$4" fieldName="Last Name"
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.inputField}
          />
          <Text style={{ ...styles.inputTopic, marginTop: 20 }}>Credentials</Text>
          <Input
            size="$4"
            fieldName="Email"
            placeholder="Email"
            inputMode="email"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            style={styles.inputField}
          />
          {/* Password input with toggleable visibility */}
          <View style={styles.passwordContainer}>
            <Input
              size="$4"
              fieldName="Password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              style={styles.passwordInput}
            />
            {/* Button to toggle password visibility */}
            <Button size="$4" onPress={togglePasswordVisibility} backgroundColor="white" style={styles.eyeButton}>
              {passwordVisible ? <EyeOff /> : <Eye />}
            </Button>
          </View>
          {/* Confirm Password input with toggleable visibility */}
          <View style={styles.passwordContainer}>
            <Input
              size="$4"
              fieldName="Confirm Password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!passwordVisible}
              style={styles.passwordInput}
            />
            {/* Button to toggle password visibility */}
            <Button size="$4" onPress={togglePasswordVisibility} backgroundColor="white" style={styles.eyeButton}>
              {passwordVisible ? <EyeOff /> : <Eye />}
            </Button>
          </View>
          {/* Button to sign up */}
          <Button style={styles.signUpButton} onPress={handleSignUp}>Sign Up</Button>
          {/* Already have an account text with login link */}
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
    textAlign: "justify",
    color: "grey",
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
    width: "100%",
  },
  inputField: {
    marginBottom: 10,
    borderRadius: 10,
    borderColor: "lightgrey",
    borderWidth: 1,
    backgroundColor: "#fff",
    width: "100%"
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
    justifyContent: "center"
  },
  logInButtonText: {
    flexDirection: "row",
    color: "#FF621F",
    textDecorationLine: "underline",
  },
  signUpButton: {
    marginTop: 50,
    width: "95%",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#FF621F",
    borderRadius: 30
  },
});

