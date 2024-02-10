import { StyleSheet, Text, View } from "react-native";
import { TamaguiProvider } from "tamagui";
import { Button, Progress, Input } from "tamagui";
import tamaguiConfig from "../tamagui.config";
import { ColorScheme } from "@tamagui/core";

export default function Page() {
  return (
      <TamaguiProvider config={tamaguiConfig}>
        <View style={styles.container}>
          <View style={styles.main}>
            <Text style={styles.title}>Hello, World!</Text>
            <Text style={styles.subtitle}>Welcome to Tamagui</Text>
            <Button onPress={() => console.log("Button pressed")}>Press me</Button>
          </View>
        </View>
      </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
