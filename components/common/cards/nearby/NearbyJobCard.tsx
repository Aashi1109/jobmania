import { Image, Text, Pressable, View } from "react-native";

import styles from "./nearbyjobcard.style";
import { checkReturnImageUrl } from "../../../../utils";

const NearbyJobCard = ({ job, handleNavigate }) => {
  return (
    <Pressable style={styles.container} onPress={handleNavigate}>
      <Pressable style={styles.logoContainer}>
        <Image
          source={{
            uri: checkReturnImageUrl(job.employer_logo),
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </Pressable>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job?.job_title ?? "N/A"}
        </Text>

        <Text style={styles.jobType}>{job?.job_employment_type ?? "N/A"}</Text>
      </View>
    </Pressable>
  );
};

export default NearbyJobCard;
