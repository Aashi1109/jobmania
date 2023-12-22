import React from "react";
import { Image, Text, Pressable, View } from "react-native";

import styles from "./screenheader.style";
import { SIZES } from "@/constants";

const ScreenHeaderBtn = ({
  iconUrl,
  dimension,
  handlePress,
  isUri = false,
}) => {
  return (
    <View style={{ margin: SIZES.medium }}>
      <Pressable style={styles.btnContainer} onPress={handlePress}>
        <Image
          source={isUri ? { uri: iconUrl } : iconUrl}
          resizeMode="cover"
          style={styles.btnImg(dimension)}
        />
      </Pressable>
    </View>
  );
};

export default ScreenHeaderBtn;
