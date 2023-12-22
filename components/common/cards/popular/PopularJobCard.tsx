import { Image, Text, Pressable, View } from "react-native";

import styles from "./popularjobcard.style";
import { checkReturnImageUrl } from "../../../../utils";

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  return (
    <Pressable
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <Pressable style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{
            uri: checkReturnImageUrl(item?.employer_logo),
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </Pressable>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name ?? "N/A"}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.job_title ?? "N/A"}
        </Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.publisher(selectedJob, item)}>
            {item?.job_publisher ?? "N/A"} -
          </Text>
          <Text style={styles.location}> {item.job_country ?? "N/A"}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default PopularJobCard;
