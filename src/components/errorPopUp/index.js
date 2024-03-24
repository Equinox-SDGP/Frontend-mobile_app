import React, { useState, useEffect } from 'react';
import { View, Modal, Text, StyleSheet } from 'react-native';

const ErrorPopup = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      // Automatically hide after 10 seconds
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "1%"
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    position: 'absolute',
    top: 0, // Position the modal at the top
    zIndex: 1, // Ensure the modal is above other elements
    margin: 5,
    padding: 8,
    backgroundColor: '#e3bd27',
    opacity: 0.8,
    borderColor:'#f7c603',
    borderWidth: 2,
    borderRadius: 10,
    width: "80%",
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
});

export default ErrorPopup;
