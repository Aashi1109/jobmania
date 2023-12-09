import { View } from "react-native";
import React from "react";

import DropdownSearchableInput from "@/components/common/inputs/dropdown/DropdownSearchableInput";
import FileUpload from "@/components/common/inputs/fileupload/FileUpload";
import styles from "./stagethree.style";
import StageWrapper from "../StageWrapper";
import { AuthScreenStagesE } from "@/definitions/enums";

const StageThree = ({ setData }: { setData: Function }) => {
  const handleBtnClick = () =>
    setData({ stage: AuthScreenStagesE.REGISTER_STAGE_4 });
  return (
    <StageWrapper
      handleNextClick={handleBtnClick}
      handleSkipClick={handleBtnClick}
    >
      <View style={styles.inputContainer}>
        <DropdownSearchableInput setData={setData} />
        <FileUpload setPickedFile={setData} />
      </View>
    </StageWrapper>
  );
};

export default StageThree;
