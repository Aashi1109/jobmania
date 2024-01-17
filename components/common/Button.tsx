import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { COLORS } from "@/constants";

const Button = ({
  padding = 8,
  label,
  backgroundColor = COLORS.primary,
  handleClick,
  isLoading,
  isDisabled = false,
}: {
  padding?: number;
  backgroundColor?: string;
  label: string;
  isDisabled?: boolean;
  isLoading: boolean;
  handleClick: (event: GestureResponderEvent) => void;
}) => {
  return (
    <Pressable onPress={handleClick} disabled={isDisabled}>
      <View style={[styles.container, { padding, backgroundColor }]}>
        {isLoading ? (
          <ActivityIndicator size={"small"} color={COLORS.lightWhite} />
        ) : (
          <Text style={styles.text}>{label}</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: "100%",
  },
  text: {
    fontSize: 15,
    color: COLORS.white,
  },
});

export default Button;
