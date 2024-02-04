import Home from "./src/screens/Home";
import tamaguiConfig from "./tamagui.config";
import { TamaguiProvider, View } from "tamagui";
import { StyleSheet, useColorScheme } from "react-native";
import { Button, Progress, Input } from "tamagui";

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme}>
      <View style={styles.container}>
        <Home />
        <Button onPress={() => console.log("Button pressed")}>Press me</Button>
        <Progress value={60}>
          <Progress.Indicator animation="bouncy" />
        </Progress>
        <Input size="$4" borderWidth={2} />
      </View>
    </TamaguiProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

