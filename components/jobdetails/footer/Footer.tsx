import { Linking, Text, Pressable, View } from "react-native";
import styles from "./footer.style";
import LikeButton from "@/components/common/likebutton/LikeButton";

const Footer = ({ url, jobId }) => {
  return (
    <View style={styles.container}>
      <View style={styles.likeButtonContainer}>
        <LikeButton jobId={jobId} />
      </View>
      <Pressable style={styles.applyBtn} onPress={() => Linking.openURL(url)}>
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </Pressable>
    </View>
  );
};

export default Footer;
