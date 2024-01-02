import { Text, Pressable, View } from "react-native";

import styles from "./chip.style";
import { SkillItemI } from "@/definitions/interfaces";

const Chip = ({
  chipData,
  handleClick,
}: {
  chipData: SkillItemI;
  handleClick: Function;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{chipData.title}</Text>
      <Pressable onPress={() => handleClick(chipData)}>
        <Text style={styles.clear}>&times;</Text>
      </Pressable>
    </View>
  );
};

export default Chip;
