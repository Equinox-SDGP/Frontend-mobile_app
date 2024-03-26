import React, { useState } from 'react'; // Importing React and useState hook from "react" for component creation and state management
import { View, Text, StyleSheet, useWindowDimensions, Linking } from 'react-native'; // Importing View, Text, StyleSheet, and useWindowDimensions hook from "react-native" for UI rendering and dimension handling
import { YGroup, ListItem, Separator, Avatar } from 'tamagui'; // Importing YGroup, ListItem, and Separator components from "tamagui" for layout and list rendering
import {
  UserRoundCog,
  HardDrive,
  MessageSquareText,
  PhoneCall,
  Info,
  Power,
  ChevronRight,
} from '@tamagui/lucide-icons'; // Importing icons from "@tamagui/lucide-icons"
import * as ImagePicker from 'expo-image-picker'; // Importing ImagePicker from "expo-image-picker" for image selection
import UploadModal from '../../components/uploadProfilePic/upload'; // Importing UploadModal component for image uploading
import { router } from 'expo-router'; // Importing router from "expo-router" for navigation
import { useAuth0 } from 'react-native-auth0'; // Importing useAuth0 hook from "react-native-auth0" for user authentication
import { LogoutButton } from '../../components/logoutButton'; // Importing LogoutButton component for user logout
import Blankprofile from '@/assets/images/blankProfile.png'; // Importing the blank profile image

/**
 * Profile screen component.
 */
export default function Profile() {
  const [modalVisible, setModalVisible] = useState(false); // State variable for modal visibility
  const [image, setImage] = useState(null); // State variable for selected image URI
  const { user } = useAuth0(); // Getting user information from Auth0
  /**
   * Function to remove the selected image.
   */
  const removeImage = async () => {
    try {
      setImage(null); // Clearing the image state
      setModalVisible(false); // Closing the modal
    } catch (error) {
      alert(error.message); // Displaying error message if any
    }
  };

  /**
   * Function to upload image from camera or gallery.
   * @param {string} mode - Specifies the source of the image: 'gallery' or 'camera'.
   */
  const uploadImage = async (mode) => {
    try {
      let result = {};

      if (mode === 'gallery') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Permission to access media library denied');
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Permission to access camera denied');
        }
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.cancelled) {
        await saveImage(result.assets[0].uri); // Saving the uploaded image
      }
    } catch (err) {
      alert('Error uploading image: ' + err.message); // Displaying error message if any
      setModalVisible(false); // Closing the modal
    }
  };

  /**
   * Function to save the uploaded image.
   * @param {string} image - URI of the uploaded image.
   */
  const saveImage = async (image) => {
    try {
      setImage(image); // Setting the image state
      setModalVisible(false); // Closing the modal
    } catch (error) {
      throw error; // Throwing error if any
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile avatar component */}
      <Avatar circular size="$12">
        <Avatar.Image accessibilityLabel="Cam" src={user.picture ? user.picture : Blankprofile} />
        <Avatar.Fallback backgroundColor="$blue10" />
      </Avatar>
      {/* <ProfileAvatar  onButtonPress={() => setModalVisible(true)} /> */}
      {/* User name */}
      <Text style={styles.userName}>{user.name}</Text>
      {/* Email */}
      <Text style={styles.email}>{user.email}</Text>
      {/* List of items */}
      <Lists />
      {/* Upload modal component */}
      <UploadModal
        modalVisible={modalVisible}
        onBackPress={() => setModalVisible(false)}
        onCameraPress={() => uploadImage()}
        onGalleryPress={() => uploadImage('gallery')}
        onRemovePress={removeImage}
      />
    </View>
  );
}

/**
 * List of items component.
 */
function Lists() {
  const screenWidth = useWindowDimensions().width; // Getting screen width
  return (
    <YGroup alignSelf="center" bordered width={screenWidth - 60} size="$8" separator={<Separator />}>
      {/* Profile item */}
      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="Profile"
          subTitle="Edit Profile"
          icon={UserRoundCog}
          iconAfter={ChevronRight}
          // onPress={() => router.push('/(auth)/startPage/startPage')}
        />
      </YGroup.Item>
      {/* Device item */}
      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="Device"
          subTitle="Device "
          icon={HardDrive}
          iconAfter={ChevronRight}
          onPress={() => router.push('devices')}
        />
      </YGroup.Item>
      {/* Feedback item */}
      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="Feedback"
          subTitle="Give Feedback :)"
          icon={MessageSquareText}
          iconAfter={ChevronRight}
          onPress={() => Linking.openURL('mailto: nimesh.20221000@iit.ac.lk')}
        />
      </YGroup.Item>
      {/* Contact us item */}
      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="Contact us"
          subTitle="+94 71 212 4273"
          icon={PhoneCall}
          iconAfter={ChevronRight}
          onPress={() => Linking.openURL('tel:+94712124273')}
        />
      </YGroup.Item>
      {/* About item */}
      <YGroup.Item>
        <ListItem hoverTheme pressTheme title="About" subTitle="Version 1.0" icon={Info} iconAfter={ChevronRight} />
      </YGroup.Item>
      {/* <LogoutButton /> */}
    </YGroup>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 50,
    paddingHorizontal: 40,
  },
  userName: {
    marginTop: -20,
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  email: {
    fontSize: 13,
    color: '#696969',
    marginBottom: 30,
  },
});
