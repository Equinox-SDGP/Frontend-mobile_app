import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Avatar } from "tamagui";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import blankProfile from "@/assets/images/blankProfile.png";

/**
 * AvatarComponent is a reusable component that displays a user's avatar image.
 * @param {string} uri - The URI of the avatar image.
 * @param {object} imgStyle - Additional styles for the avatar image.
 * @param {function} onPress - Function to handle press events on the avatar image.
 * @param {function} onButtonPress - Function to handle press events on the camera icon.
 * @param {boolean} aviOnly - Indicates if the avatar image should be displayed only without the camera icon.
 * @param {object} props - Additional props to be passed to the component's container View.
 * @returns {JSX.Element} - AvatarComponent JSX markup.
 */
const AvatarComponent = ({
    uri,
    imgStyle,
    onPress,
    onButtonPress,
    aviOnly = false,
    ...props
}) => {

  return (
    <View style={[styles.container, {marginBottom: aviOnly ? 0 : 15}]} {...props}>
      <TouchableOpacity onPress={onPress}>
        {/* Avatar image */}
        <Avatar style={styles.avatar} circular size="$12">
            <Image
            accessibilityLabel="Cam"
              source={uri ? {uri} : blankProfile}
              style={[styles.image, aviOnly && {height:35, width:35, borderWidth:0}, imgStyle]}
            />
        </Avatar>
        {/* Camera icon to trigger image upload */}
        {!aviOnly && (
          <TouchableOpacity onPress={onButtonPress} style={styles.cameraIcon}>
              <MaterialCommunityIcons name="camera-outline" size={30} color="#FFF" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 140,
    height: 140,
    borderWidth: 3,
    borderRadius: 75,
    borderColor: "#FFF",
  },
  cameraIcon: {
    position: "absolute",
    backgroundColor: "grey",
    borderRadius: 20,
    padding: 5,
    bottom: 5,
    right: 10,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "#FFF",
  },
});

export default AvatarComponent;
