import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ButtonProps } from "./Button";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";

export interface IconButtonProps extends ButtonProps {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
}

export default function IconButton({ icon, label, onPress }: IconButtonProps) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#fff" />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});
