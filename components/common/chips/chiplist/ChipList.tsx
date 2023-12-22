import { ScrollView, Text, Pressable, View } from "react-native";
import { useState } from "react";

import styles from "./chiplist.style";
import { COLORS } from "@/constants";
import Chip from "../chip/Chip";
import { SkillItemI } from "@/definitions/interfaces";

const ChipList = ({
  chips,
  handleChipClick,
}: {
  chips: SkillItemI[];
  handleChipClick: Function;
}) => {
  const [showAll, setShowAll] = useState(false);
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {chips.slice(0, showAll ? chips.length : 3).map((chip) => (
          <Chip key={chip.id} chipData={chip} handleClick={handleChipClick} />
        ))}
        {chips.length > 3 && (
          <Pressable
            style={{ alignSelf: "center" }}
            onPress={() => setShowAll(!showAll)}
          >
            <Text style={{ color: COLORS.primary }}>
              {showAll ? "Close" : `+${chips.length - 3} more`}
            </Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
};

export default ChipList;
