<<<<<<< HEAD
import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { YGroup, ListItem, Separator } from 'tamagui';
import {
  UserRoundCog,
  HardDrive,
  MessageSquareText,
  PhoneCall,
  Info,
  Power,
  ChevronRight,
} from '@tamagui/lucide-icons';
import * as ImagePicker from 'expo-image-picker';
import UploadModal from '../../components/uploadProfilePic/upload';
import ProfileAvatar from '../../components/profileAvatar/avatar';
import LogoutButton from '../../components/logoutButton';
import { router } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';
=======
// Import statements
import React, { useState } from "react"; // Importing React and useState hook from "react" for component creation and state management
import { View, Text, StyleSheet, useWindowDimensions } from "react-native"; // Importing View, Text, StyleSheet, and useWindowDimensions hook from "react-native" for UI rendering and dimension handling
import { YGroup, ListItem, Separator } from "tamagui"; // Importing YGroup, ListItem, and Separator components from "tamagui" for layout and list rendering
import { UserRoundCog, HardDrive, MessageSquareText, PhoneCall, Info, Power, ChevronRight } from "@tamagui/lucide-icons"; // Importing icons from "@tamagui/lucide-icons"
import * as ImagePicker from 'expo-image-picker'; // Importing ImagePicker from "expo-image-picker" for image selection
import UploadModal from "../../components/uploadProfilePic/upload"; // Importing UploadModal component for image uploading
import ProfileAvatar from "../../components/profileAvatar/avatar"; // Importing ProfileAvatar component for displaying profile avatar
import { router } from 'expo-router'; // Importing router from "expo-router" for navigation
>>>>>>> deac381d22502ad17895b9ffb8227032b5e0b181

/**
 * Profile screen component.
 */
export default function Profile() {
<<<<<<< HEAD
  const { user } = useAuth0();
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(user.image);
=======
  const [modalVisible, setModalVisible] = useState(false); // State variable for modal visibility
  const [image, setImage] = useState(null); // State variable for selected image URI
>>>>>>> deac381d22502ad17895b9ffb8227032b5e0b181

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
<<<<<<< HEAD
      alert('Error uploading image: ' + err.message);
      setModalVisible(false);
=======
      alert("Error uploading image: " + err.message); // Displaying error message if any
      setModalVisible(false); // Closing the modal
>>>>>>> deac381d22502ad17895b9ffb8227032b5e0b181
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
      <ProfileAvatar uri={user} onButtonPress={() => setModalVisible(true)} />
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
        />
      </YGroup.Item>
      {/* About item */}
      <YGroup.Item>
        <ListItem hoverTheme pressTheme title="About" subTitle="Version" icon={Info} iconAfter={ChevronRight} />
      </YGroup.Item>
      <LogoutButton />
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
