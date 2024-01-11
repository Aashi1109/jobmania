import { ScrollView, Text, Pressable, View } from "react-native";
import { useState } from "react";

import styles from "./chiplist.style";
import { COLORS } from "@/constants";
import Chip from "../chip/Chip";
import { SkillItemI } from "@/definitions/interfaces";

const ChipList = ({
  chips,
  handleChipClick,
  isVerticalScroll = true,
  hideMoreIndicator = false,
}: {
  chips: SkillItemI[];
  handleChipClick: Function;
  isVerticalScroll?: boolean;
  hideMoreIndicator?: boolean;
}) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <ScrollView style={styles.scrollContainer} horizontal={!isVerticalScroll}>
      <View style={styles.container}>
        {chips.slice(0, showAll ? chips.length : 3).map((chip) => (
          <Chip key={chip.id} chipData={chip} handleClick={handleChipClick} />
        ))}
        {hideMoreIndicator && chips.length > 3 && (
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
