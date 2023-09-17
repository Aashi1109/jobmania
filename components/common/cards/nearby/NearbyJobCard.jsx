import { Image, Text, TouchableOpacity, View } from "react-native";

import styles from "./nearbyjobcard.style";
import { checkReturnImageUrl } from "../../../../utils";

const NearbyJobCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkReturnImageUrl(job.employer_logo),
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job?.job_title ?? "N/A"}
        </Text>

        <Text style={styles.jobType}>{job?.job_employment_type ?? "N/A"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
