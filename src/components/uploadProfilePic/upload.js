import React from 'react';
import { Text, Modal, View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
            <TouchableOpacity style={styles.modalContainer} onPress={onBackPress}>
                {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
                {!isLoading && (
                    <View>
                        <Text style={{ marginBottom: 10 }}>Profile Photo</Text>
                        <View>
                            <TouchableOpacity style={styles.button} onPress={onCameraPress}>
                                <MaterialCommunityIcons name="camera-outline" size={30} color="black" />
                                <Text style={styles.buttonText}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={onGalleryPress}>
                                <MaterialCommunityIcons name="image-outline" size={30} color="black" />
                                <Text style={styles.buttonText}>Gallery</Text>
                            </TouchableOpacity>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        marginLeft: 10,
    },
});

export default UploadModal;
