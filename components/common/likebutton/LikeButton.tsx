import { icons } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { usePopup } from "@/context/PopupContext";
import { arrayUnion } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, Pressable } from "react-native";
import styles from "./likebutton.styles";

interface LikeButtonProps {
  jobId: string;
  employer_logo: string;
  job_title: string;
  job_employment_type: string;
}

const LikeButton = ({
  jobId,
  employer_logo,
  job_employment_type,
  job_title,
}: LikeButtonProps) => {
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
        // console.log("in delete job");
        updateData = {
          savedJobs: user?.savedJobs.filter((job) => job.jobId !== jobId),
        };
        popupMessage = "Job unsaved successfully";
      } else {
        updateData = {
          savedJobs: arrayUnion({
            jobId,
            employer_logo,
            job_employment_type,
            job_title,
            savedAt: Date.now(),
          }),
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
    <Pressable style={styles.likeBtn} onPress={handleFavBtnClick}>
      <Image
        source={isJobAlreadySaved ? icons.heart : icons.heartOutline}
        resizeMode={"contain"}
        style={styles.likeBtnImage}
      />
    </Pressable>
  );
};

export default LikeButton;
