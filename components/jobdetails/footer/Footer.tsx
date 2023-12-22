import React, { useEffect, useState } from "react";
import { Image, Linking, Text, Pressable, View } from "react-native";
import styles from "./footer.style";
import { icons } from "../../../constants";
import { useAuth } from "@/context/AuthContext";
import {
  arrayRemove,
  arrayUnion,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { usePopup } from "@/context/PopupContext";

const Footer = ({ url, jobId }) => {
  const { updateUserData, user, loading } = useAuth();

  const [isJobAlreadySaved, setIsJobAlreadySaved] = useState(false);
  const { dispatch } = usePopup();

  useEffect(() => {
    setIsJobAlreadySaved(!!user?.savedJobs?.find((job) => job.jobId == jobId));
  }, [loading]);

  const handleFavBtnClick = async () => {
    let updateData = {};
    let popupMessage;
    try {
      if (isJobAlreadySaved) {
        console.log("in delete job");
        updateData = {
          savedJobs: user?.savedJobs.filter((job) => job.jobId !== jobId),
        };
        popupMessage = "Job unsaved successfully";
      } else {
        console.log("in save job");
        updateData = {
          savedJobs: arrayUnion({ jobId, savedAt: Date.now() }),
        };
        popupMessage = "Job saved successfully";
      }
      await updateUserData(updateData);
      setIsJobAlreadySaved((prevState) => !prevState);
    } catch (error) {
      console.error("Error updating saved job -> ", error);
      popupMessage = "Unable to save job";
    }
    dispatch({ type: "CREATE_POPUP", payload: { message: popupMessage } });
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.likeBtn} onPress={handleFavBtnClick}>
        <Image
          source={isJobAlreadySaved ? icons.heart : icons.heartOutline}
          resizeMode={"contain"}
          style={styles.likeBtnImage}
        />
      </Pressable>

      <Pressable style={styles.applyBtn} onPress={() => Linking.openURL(url)}>
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </Pressable>
    </View>
  );
};

export default Footer;
