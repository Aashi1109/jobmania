import { Image, Text, Pressable, View } from "react-native";

import styles from "./verticaljobcard.style";
import { checkReturnImageUrl } from "../../../../utils";
import LikeButton from "../../likebutton/LikeButton";

const VerticalJobCard = ({ job, handleNavigate, showLikeButton }) => {
  const employerLogo = job.employer_logo;
  const employerName = job?.job_title ?? "N/A";
  const employmentType = job?.job_employment_type ?? "N/A";
  return (
    <Pressable style={styles.container} onPress={handleNavigate}>
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: checkReturnImageUrl(employerLogo),
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {employerName}
        </Text>

        <Text style={styles.jobType}>{employmentType}</Text>
      </View>
      {showLikeButton && (
        <View style={styles.likeButtonContainer}>
          <LikeButton
            jobId={job?.job_id ?? job?.jobId}
            job_employment_type={employmentType}
            employer_logo={employerLogo}
            job_title={employerName}
          />
        </View>
      )}
    </Pressable>
  );
};

export default VerticalJobCard;
