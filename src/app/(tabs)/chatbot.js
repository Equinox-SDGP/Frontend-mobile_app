import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button, ScrollView, Avatar, XStack } from 'tamagui';
import { SendHorizontal } from '@tamagui/lucide-icons';
import chatbotImg from '@/assets/icons/chat.png';
import { useAuth0 } from 'react-native-auth0'; // Importing useAuth0 hook from "react-native-auth0" for user authentication
import Blankprofile from '@/assets/images/blankProfile.png'; // Importing the blank profile image
import axios from 'axios';

// Component for displaying the chat messages
const ChatBox = ({ messages }) => {
  return (
    // ScrollView to display chat messages, scrolls to end automatically
    <ScrollView snapToEnd style={styles.chatBox}>
      {/* Mapping through messages to display each chat message */}
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </ScrollView>
  );
};

// Component for displaying each individual chat message
const ChatMessage = ({ message }) => {
  // Check if the message is sent by the user or the bot
  const isUser = message.sender === 'user';
  return (
    // Stack to align the message content and avatar
    <XStack style={[isUser ? styles.userMessage : styles.botMessage]}>
      {/* Container for the message content */}
      <View style={[styles.message, isUser ? styles.userInnerMessage : styles.botInnerMessage]}>
        {/* Display the message text */}
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
      {/* Display the avatar for the message sender */}
      <MessageAvatar src={message.avatarImage} />
    </XStack>
  );
};

// Component for displaying the avatar of the message sender
const MessageAvatar = ({ src }) => {
  return (
    // Avatar component with fallback image
    <Avatar style={{ borderRadius: 12 }} size="$3.5">
      <Avatar.Image accessibilityLabel="Nate Wienert" src={src} />
      <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
    </Avatar>
  );
};

// Component for user input to send messages
const UserInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  // Function to handle sending a message
  const handleSend = () => {
    if (!message) return;
    // Call the onSend callback with the message content
    onSend(message);
    // Clear the input after sending the message
    setMessage('');
  };

  return (
    // Container for user input
    <View style={styles.userInput}>
      {/* TextInput for typing the message */}
      <TextInput
        style={styles.textInput}
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message..."
      />
      {/* Button to send the message */}
      <Button size="$3" onPress={handleSend} backgroundColor="white">
        <SendHorizontal size={24} color="#868686" />
      </Button>
    </View>
  );
};

/** Main export function */
const App = () => {
  const startupMessage = {
    sender: 'bot',
    text: 'Hello! How can I help you today?',
    avatarImage: chatbotImg,
  };
  const [messages, setMessages] = useState([startupMessage]);
  const { user } = useAuth0(); // Getting user information from Auth0
  const [isLoadingBot, setIsLoadingBot] = useState(false);

  const fetchingBotResponse = async (userMessage) => {
    setIsLoadingBot(true);
    try {
      console.log(userMessage);
      const response = await axios.post('https://equinox-backend.azurewebsites.net/chatbot/user-message', {
        message: userMessage,
      });

      setIsLoadingBot(false);

      const botMessage = response.data.botResponse;

      return botMessage;
    } catch (error) {
      setIsLoadingBot(false);
      return 'Sorry, I did not understand that.';
    }
  };

  // Function to handle sending a message
  const handleSend = async (message) => {
    // Create a message object for the user message
    const userMessage = {
      sender: 'user',
      text: message,
      avatarImage: user.picture ? user.picture : Blankprofile,
    };

    setMessages((prevMessage) => [...prevMessage, userMessage]);
    const botResponse = await fetchingBotResponse(message); // Placeholder bot response

    // Create a message object for the bot response
    const botMessage = {
      sender: 'bot',
      text: botResponse,
      avatarImage: chatbotImg,
    };

    // Update the messages state with the user message and bot response
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  return (
    // Main container for the app
    <View style={styles.container}>
      {/* Component for displaying the chat messages */}
      <ChatBox messages={messages} />
      {/* Component for user input to send messages */}
      <UserInput onSend={handleSend} />
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginBottom: 70,
  },
  chatBox: {
    flex: 1,
  },
  message: {
    maxWidth: '80%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    gap: 10,
  },
  botMessage: {
    gap: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row-reverse',
  },
  userInnerMessage: {
    backgroundColor: '#FFA179',
    borderTopRightRadius: 2,
  },
  botInnerMessage: {
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 2,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  userInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  sendButton: {
    marginLeft: 10,
  },
});

export default App;
