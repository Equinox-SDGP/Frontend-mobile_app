import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "tamagui";

export default function index() {
  return (
    <View>
      <XStack space="$2">
        <Button themeInverse size="$3">
          Inverse
        </Button>
      </XStack>
    </View>
  );
}

const styles = StyleSheet.create({});
