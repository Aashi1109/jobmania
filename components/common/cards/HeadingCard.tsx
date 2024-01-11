import React from "react";
import BasicCard from "./basic/BasicCard";
import { COLORS, SIZES, icons } from "@/constants";
import {
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const HeadingCard: React.FC<{
  children: React.ReactNode;
  cardHeading: string;
  iconData: any;
  handleEditPress: (event: GestureResponderEvent) => void;
  borderRadius?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  backgroundColor?: string;
}> = ({
  children,
  cardHeading,
  iconData,
  handleEditPress,
  borderRadius = 10,
  paddingVertical = SIZES.large,
  paddingHorizontal = SIZES.large,
  backgroundColor,
}) => {
  return (
    <BasicCard
      borderRadius={borderRadius}
      paddingVertical={paddingVertical}
      paddingHorizontal={paddingHorizontal}
      backgroundColor={backgroundColor}
      width={"100%"}
    >
      <View style={styles.headContainer}>
        <View style={styles.headLeftContainer}>
          <Image
            style={styles.iconImage}
            source={iconData}
            resizeMode="contain"
          />
          <Text style={styles.headingText}>{cardHeading}</Text>
        </View>
        <Pressable onPress={handleEditPress}>
          <Image
            source={icons.editIcon}
            style={styles.iconImage}
            resizeMode="contain"
          />
        </Pressable>
      </View>
      <View style={styles.children}>{children}</View>
    </BasicCard>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
  },
  headingText: {
    fontSize: SIZES.small,
    textAlign: "auto",
    alignSelf: "center",
  },
  headLeftContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    gap: SIZES.xSmall,
  },
  iconImage: {
    height: SIZES.medium,
    width: SIZES.medium,
    tintColor: COLORS.primary,
  },
  children: { paddingHorizontal: 8, marginTop: SIZES.small },
});

export default HeadingCard;
