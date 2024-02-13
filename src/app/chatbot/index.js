import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button, XGroup, XStack, YStack } from "tamagui";
import {SendHorizontal} from "@tamagui/lucide-icons";

const ChatBox = ({ messages }) => {
  return (
    <View style={styles.chatBox}>
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </View>
  );
};

const ChatMessage = ({ message }) => {
  const isUser = message.sender === "user";
  return (
    <View
      style={[styles.message, isUser ? styles.userMessage : styles.botMessage]}>
      <Text style={styles.messageText}>{message.text}</Text>
    </View>
  );
};

const UserInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    onSend(message);
    setMessage(""); // Clear input after sending
  };

  return (
    <View style={styles.userInput}>
      <TextInput
        style={styles.textInput}
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message..."
      />
      <Button size="$3" onPress={handleSend} backgroundColor="white" >
        <SendHorizontal size={24} color="#868686"/>
      </Button>
    </View>
  );
};

const App = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = (message) => {
    const userMessage = { sender: "user", text: message };
    setMessages([...messages, userMessage]);
    // Replace with your chatbot logic to simulate bot response
    const botResponse = `Hello, I'm your friendly chatbot!`;
    const botMessage = { sender: "bot", text: botResponse };
    setMessages([...messages, botMessage]);
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
  },
  chatBox: {
    flex: 1,
    marginBottom: 20,
  },
  message: {
    maxWidth: "80%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  userMessage: {
    backgroundColor: "#0084ff",
    alignSelf: "flex-end",
    borderTopRightRadius: 2,
  },
  botMessage: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
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
