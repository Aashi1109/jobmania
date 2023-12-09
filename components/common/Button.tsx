import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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
    <TouchableOpacity onPress={handleClick} disabled={isDisabled}>
      <View style={[styles.container, { flex: 1, padding, backgroundColor }]}>
        {isLoading ? (
          <ActivityIndicator size={"small"} color={COLORS.lightWhite} />
        ) : (
          <Text style={styles.text}>{label}</Text>
        )}
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
