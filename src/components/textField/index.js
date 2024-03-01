import { StyleSheet } from "react-native";
import React from "react";
//import type { SizeTokens } from 'tamagui'
import { Input, Label, YStack } from "tamagui";

export default function TextField(props) {
  return (
    <YStack>
      <Label htmlFor={props.fieldName}>{props.label}</Label>
      <Input
        id={props.fieldName}
        size="$4"
        borderWidth={2}
        placeholder={"Enter " + props.label}
        padding="$2"
        margin="$2"
      />
    </YStack>
  );
}

const styles = StyleSheet.create({});