import * as ImagePicker from "expo-image-picker";

import { Pressable, View } from "react-native";
import CircularAvatarWithProgress from "../../circularprogress/CircularAvatarWithProgress";
import { useEffect, useState } from "react";

const ImageInputWithProgress = ({
  setData,
  stepProgress,
  imageUri,
}: {
  setData: Function;
  stepProgress: number;
  imageUri?: string;
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
      console.log(fileFound);
      setPickedFile(fileFound.uri);
      setData({ data: { profilePic: fileFound } });
    } else {
      setPickedFile(null);
    }
  };

  useEffect(() => {
    if (imageUri) {
      setPickedFile(imageUri);
    }
  }, [imageUri]);

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
