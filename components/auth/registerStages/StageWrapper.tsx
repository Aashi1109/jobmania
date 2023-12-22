import React from "react";
import styles from "./stagewrapper.style";
import { View } from "react-native";
import Button from "@/components/common/Button";
import { COLORS } from "@/constants";
import { GestureResponderEvent } from "react-native";

const StageWrapper = ({
  children,
  handleNextClick,
  handleSkipClick,
  isLoading,
}: {
  children: React.ReactNode;
  handleNextClick: (event: GestureResponderEvent) => void;
  handleSkipClick: (event: GestureResponderEvent) => void;

  isLoading: boolean;
}) => {
  return (
    <View style={styles.container}>
      {children}
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1 }}>
          <Button
            isLoading={isLoading}
            label="Skip"
            handleClick={handleSkipClick}
            backgroundColor={COLORS.inputPlaceHolderColor}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            label="Next"
            handleClick={handleNextClick}
            isLoading={isLoading}
          />
        </View>
      </View>
    </View>
  );
};

export default StageWrapper;
