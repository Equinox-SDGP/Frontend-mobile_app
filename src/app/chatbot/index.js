import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button, ScrollView, Avatar, XStack } from "tamagui";
import { SendHorizontal } from "@tamagui/lucide-icons";
import { handleTextInput } from "../_layout";

const ChatBox = ({ messages }) => {
  return (
    <ScrollView snapToEnd style={styles.chatBox}>
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </ScrollView>
  );
};

const ChatMessage = ({ message }) => {
  const isUser = message.sender === "user";
  return (
    <XStack style={[isUser ? styles.userMessage : styles.botMessage]}>
      <View
        style={[
          styles.message,
          isUser ? styles.userInnerMessage : styles.botInnerMessage,
        ]}
      >
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
      <MessageAvatar src={message.avatarImage} />
    </XStack>
  );
};

const MessageAvatar = ({ src }) => {
  return (
    <Avatar style={{ borderRadius: 12 }} size="$3.5">
      <Avatar.Image accessibilityLabel="Nate Wienert" src={src} />
      <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
    </Avatar>
  );
};

const UserInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message) return;
    onSend(message);
    setMessage(""); // Clear input after sending
    handleTextInput();
  };

  return (
    <View style={styles.userInput}>
      <TextInput
        style={styles.textInput}
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message..."
      />
      <Button size="$3" onPress={handleSend} backgroundColor="white">
        <SendHorizontal size={24} color="#868686" />
      </Button>
    </View>
  );
};

/** Main export function */
const App = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = (message) => {
    const userMessage = {
      sender: "user",
      text: message,
      avatarImage:
        "https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80",
    };
    // Replace with your chatbot logic to simulate bot response
    const botResponse = `Hello, I'm your friendly chatbot!`;
    const botMessage = {
      sender: "bot",
      text: botResponse,
      avatarImage:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fchatbot_6014401&psig=AOvVaw1w6bHyreZB2WHej4tVXP8n&ust=1708153936539000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNi5obinr4QDFQAAAAAdAAAAABAD",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
  };

  return (
    <View style={styles.container}>
      <ChatBox messages={messages} />
      <UserInput onSend={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginBottom: 70,
  },
  chatBox: {
    flex: 1,
    
  },
  message: {
    maxWidth: "80%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  userMessage: {
    alignSelf: "flex-end",
    gap: 10,
  },
  botMessage: {
    gap: 10,
    alignSelf: "flex-start",
    flexDirection: "row-reverse",
  },
  userInnerMessage: {
    backgroundColor: "#FFA179",
    borderTopRightRadius: 2,
  },
  botInnerMessage: {
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: 2,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  userInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  sendButton: {
    marginLeft: 10,
  },
});

export default App;
