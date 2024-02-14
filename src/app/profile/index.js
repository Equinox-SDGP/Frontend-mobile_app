import { StyleSheet, View } from "react-native";
import React from "react";
import TextField from "@/components/textField";

const Profile = () => {
  return (
    <View>
      <TextField size="$4" fieldName="firstname" label="First Name"/>
      <TextField size="$4" fieldName="lastname" label="Last Name"/>
      <TextField size="$4" fieldName="Email" label="  Email"/>
      <TextField size="$4" fieldName="Password" label=" Your Pasword"/>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
