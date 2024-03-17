import React, { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { YGroup, ListItem, Separator } from "tamagui";
import { UserRoundCog, HardDrive, MessageSquareText, PhoneCall, Info, Power, ChevronRight } from "@tamagui/lucide-icons";
import * as ImagePicker from 'expo-image-picker';
import UploadModal from "../../components/uploadProfilePic/upload";
import ProfileAvatar from "../../components/profileAvatar/avatar";

export default function Profile() {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);

  const removeImage = async () => {
    try {
      setImage(null);
      setModalVisible(false);
    } catch (error) {
      alert(error.message);
    }
  };

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
        await saveImage(result.assets[0].uri);
      }
    } catch (err) {
      alert("Error uploading image: " + err.message);
      setModalVisible(false);
    }
  };

  const saveImage = async (image) => {
    try {
      setImage(image);
      setModalVisible(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <ProfileAvatar uri={image} onButtonPress={() => setModalVisible(true)} />
      <Text style={styles.userName}>Promodh Madusha</Text>
      <Text style={styles.email}>promodmadusha@gmail.com</Text>
      <Lists />
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

function Lists() {
  const screenWidth = useWindowDimensions().width;
  return (
    <YGroup
      alignSelf="center"
      bordered
      width={screenWidth - 60}
      size="$8"
      separator={<Separator />}
    >
      <YGroup.Item >
        <ListItem
          hoverTheme
          pressTheme
          title="Profile"
          subTitle="Edit Profile"
          icon={UserRoundCog}
          iconAfter={ChevronRight}
          onPress={() => console.log('Edit profile pressed')}
        />
      </YGroup.Item>

      <YGroup.Item >
        <ListItem
          hoverTheme
          pressTheme
          title="Device"
          subTitle="Device "
          icon={HardDrive}
          iconAfter={ChevronRight}
          onPress={() => console.log('Device pressed')}
        />
      </YGroup.Item>

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

      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="About"
          subTitle="Version"
          icon={Info}
          iconAfter={ChevronRight}
        />
      </YGroup.Item>

      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="Sign out"
          icon={Power}
        />
      </YGroup.Item>
    </YGroup>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    display: "flex",
    justifyContent: "center",
    paddingTop: 50,
    paddingHorizontal: 40,
    
  },
  userName: {
    marginTop:-20,
    fontSize: 25,
    fontWeight: "bold",
    paddingTop: 20,
  },
  email: {
    fontSize: 13,
    color: "#696969",
    marginBottom: 30,
  },
});
