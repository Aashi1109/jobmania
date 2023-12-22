import * as ImagePicker from "expo-image-picker";

import { Pressable, View } from "react-native";
import CircularAvatarWithProgress from "../../circularprogress/CircularAvatarWithProgress";
import { useState } from "react";

const ImageInputWithProgress = ({
  setData,
  stepProgress,
}: {
  setData: Function;
  stepProgress: number;
}) => {
  const [pickedFile, setPickedFile] = useState(null);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      const fileFound = result.assets[0];
      setPickedFile(fileFound.uri);
      setData({ data: { profilePic: fileFound } });
    } else {
      setPickedFile(null);
    }
  };

  return (
    <Pressable onPress={pickImageAsync}>
      <CircularAvatarWithProgress
        circleProgress={stepProgress}
        size={100}
        strokeWidth={stepProgress === 0 ? 0 : 10}
        selectedImage={pickedFile}
      />
    </Pressable>
  );
};

export default ImageInputWithProgress;
