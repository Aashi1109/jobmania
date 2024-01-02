import { Image, Text, Pressable, View } from "react-native";

import styles from "./verticaljobcard.style";
import { checkReturnImageUrl } from "../../../../utils";
import LikeButton from "../../likebutton/LikeButton";

const VerticalJobCard = ({ job, handleNavigate, showLikeButton }) => {
  return (
    <Pressable style={styles.container} onPress={handleNavigate}>
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: checkReturnImageUrl(job.employer_logo),
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job?.job_title ?? "N/A"}
        </Text>

        <Text style={styles.jobType}>{job?.job_employment_type ?? "N/A"}</Text>
      </View>
      {showLikeButton && (
        <View style={styles.likeButtonContainer}>
          <LikeButton jobId={job?.job_id} />
        </View>
      )}
    </Pressable>
  );
};

export default VerticalJobCard;
