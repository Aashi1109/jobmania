import { Image, Text, Pressable, View } from "react-native";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";

import { icons } from "@/constants";
import styles from "./fileupload.style";
import Chip from "../../chips/chip/Chip";

const FileUpload = ({ setPickedFile }: { setPickedFile: Function }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>();
  const handleFilePick = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "application/msword"],
    });
    if (file && !file.canceled) {
      setPickedFile({ data: { resume: file.assets[0] } });
      setSelectedFile(file.assets[0].name);
    }
  };

  const removeSelectedFile = (item) => {
    setSelectedFile(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Upload Resume</Text>
      {!selectedFile ? (
        <Pressable onPress={handleFilePick}>
          <View style={styles.fileUploadContainer}>
            <View style={styles.fileUploadImageContainer}>
              <Image source={icons.fileUpload} style={styles.fileUploadImage} />
            </View>
            <Text style={styles.fileUploadText}>Select a document</Text>
          </View>
        </Pressable>
      ) : (
        <Chip
          chipData={{ id: 0, title: selectedFile }}
          handleClick={removeSelectedFile}
        />
      )}
    </View>
  );
};

export default FileUpload;
