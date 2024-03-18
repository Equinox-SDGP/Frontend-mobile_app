import React from 'react';
import { Text, Modal, View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * UploadModal is a reusable modal component for uploading profile photos.
 * @param {boolean} modalVisible - Indicates whether the modal is visible or not.
 * @param {function} onBackPress - Function to handle press events on the modal background to close the modal.
 * @param {function} onCameraPress - Function to handle press events on the camera option.
 * @param {function} onGalleryPress - Function to handle press events on the gallery option.
 * @param {function} onRemovePress - Function to handle press events on the remove option.
 * @param {boolean} isLoading - Indicates whether content is loading or not.
 * @returns {JSX.Element} - UploadModal JSX markup.
 */
const UploadModal = ({
    modalVisible,
    onBackPress,
    onCameraPress,
    onGalleryPress,
    onRemovePress,
    isLoading = false,
}) => {
    return (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
            {/* Modal container */}
            <TouchableOpacity style={styles.modalContainer} onPress={onBackPress}>
                {/* Loading indicator */}
                {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
                {/* Modal content */}
                {!isLoading && (
                    <View>
                        {/* Modal header */}
                        <Text style={{ marginBottom: 10 }}>Profile Photo</Text>
                        {/* Modal options */}
                        <View>
                            {/* Camera option */}
                            <TouchableOpacity style={styles.button} onPress={onCameraPress}>
                                <MaterialCommunityIcons name="camera-outline" size={30} color="black" />
                                <Text style={styles.buttonText}>Camera</Text>
                            </TouchableOpacity>
                            {/* Gallery option */}
                            <TouchableOpacity style={styles.button} onPress={onGalleryPress}>
                                <MaterialCommunityIcons name="image-outline" size={30} color="black" />
                                <Text style={styles.buttonText}>Gallery</Text>
                            </TouchableOpacity>
                            {/* Remove option */}
                            <TouchableOpacity style={styles.button} onPress={onRemovePress}>
                                <MaterialCommunityIcons name="delete-outline" size={30} color="black" />
                                <Text style={styles.buttonText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff', // White background for options
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        marginLeft: 10,
    },
});

export default UploadModal;
