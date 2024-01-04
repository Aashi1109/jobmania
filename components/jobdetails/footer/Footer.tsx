import { Linking, Text, Pressable, View } from "react-native";
import styles from "./footer.style";
import LikeButton from "@/components/common/likebutton/LikeButton";

const Footer = ({ url, jobId, job }) => {
  const employerLogo = job?.employer_logo;
  const employerName = job?.job_title ?? "N/A";
  const employmentType = job?.job_employment_type ?? "N/A";
  return (
    <View style={styles.container}>
      <View style={styles.likeButtonContainer}>
        <LikeButton
          jobId={jobId}
          job_employment_type={employmentType}
          employer_logo={employerLogo}
          job_title={employerName}
        />
      </View>
      <Pressable style={styles.applyBtn} onPress={() => Linking.openURL(url)}>
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </Pressable>
    </View>
  );
};

export default Footer;
