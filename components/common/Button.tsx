import { COLORS } from "@/constants";
import React from "react";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

const Button = ({
  padding = 8,
  label,
  backgroundColor = COLORS.primary,
  handleClick,
  isDisabled = false,
}: {
  padding?: number;
  backgroundColor?: string;
  label: string;
  isDisabled?: boolean;
  handleClick: (event: GestureResponderEvent) => void;
}) => {
  return (
    <TouchableOpacity onPress={handleClick} disabled={isDisabled}>
      <View style={[styles.container, { flex: 1, padding, backgroundColor }]}>
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    fontSize: 15,
    color: COLORS.white,
  },
});

export default Button;
