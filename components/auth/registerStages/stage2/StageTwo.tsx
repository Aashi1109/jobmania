import { View } from "react-native";
import React from "react";

import DropdownSearchableInput from "@/components/common/inputs/dropdown/DropdownSearchableInput";
import FileUpload from "@/components/common/inputs/fileupload/FileUpload";
import styles from "./stagetwo.style";

const StageTwo = ({ setPickedFile }: { setPickedFile: Function }) => {
  return (
    <View style={styles.inputContainer}>
      <DropdownSearchableInput />
      <FileUpload setPickedFile={setPickedFile} />
    </View>
  );
};

export default StageTwo;
