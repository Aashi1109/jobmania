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
  leftIconData?: any;
  rightIconData?: any;
  handleRightButtonClick: (event: GestureResponderEvent) => void;
  borderRadius?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  backgroundColor?: string;
}> = ({
  children,
  cardHeading,
  leftIconData,
  handleRightButtonClick,
  rightIconData,
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
          {leftIconData && (
            <Image
              style={styles.iconImage}
              source={leftIconData}
              resizeMode="contain"
            />
          )}
          <Text style={styles.headingText}>{cardHeading}</Text>
        </View>
        {handleRightButtonClick && (
          <Pressable onPress={handleRightButtonClick}>
            <Image
              source={rightIconData ?? icons.editIcon}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </Pressable>
        )}
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
    fontWeight: "bold",
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
