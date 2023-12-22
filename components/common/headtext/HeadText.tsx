import { Text, View } from "react-native";
import styles from "./headtext.style";
import { COLORS } from "@/constants";

const HeadText = ({
  fontSize,
  color,
}: {
  fontSize: number;
  color?: string;
}) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          { fontSize: fontSize, color: color ?? COLORS.white },
        ]}
      >
        J
      </Text>
      <Text
        style={[
          styles.text,
          { fontSize: fontSize * 0.6, color: color ?? COLORS.white },
        ]}
      >
        M.
      </Text>
    </View>
  );
};

export default HeadText;
