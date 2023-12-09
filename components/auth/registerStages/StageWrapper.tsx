import React from "react";
import styles from "./stagewrapper.style";
import { View } from "react-native";
import Button from "@/components/common/Button";
import { COLORS } from "@/constants";

const StageWrapper = ({
  children,
  handleNextClick,
  handleSkipClick,
}: {
  children: React.ReactNode;
  handleNextClick: Function;
  handleSkipClick: Function;
}) => {
  return (
    <View style={styles.container}>
      {children}
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1 }}>
          <Button
            isLoading={false}
            label="Skip"
            handleClick={handleSkipClick}
            backgroundColor={COLORS.inputPlaceHolderColor}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            label="Next"
            handleClick={handleNextClick}
            isLoading={false}
          />
        </View>
      </View>
    </View>
  );
};

export default StageWrapper;
