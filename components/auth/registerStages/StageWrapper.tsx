import React from "react";
import styles from "./stagewrapper.style";
import { View } from "react-native";
import Button from "@/components/common/Button";
import { COLORS } from "@/constants";

const StageWrapper = ({
  children,
  handleClick,
}: {
  children: React.ReactNode;
  handleClick: any;
}) => {
  return (
    <View style={styles.container}>
      {children}
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1 }}>
          <Button
            label="Skip"
            handleClick={handleClick}
            backgroundColor={COLORS.inputPlaceHolderColor}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button label="Next" handleClick={handleClick} />
        </View>
      </View>
    </View>
  );
};

export default StageWrapper;
