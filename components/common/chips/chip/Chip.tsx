import { Text, TouchableOpacity, View } from "react-native";

import styles from "./chip.style";

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
      <TouchableOpacity onPress={() => handleClick(chipData)}>
        <Text style={styles.clear}>&times;</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Chip;
