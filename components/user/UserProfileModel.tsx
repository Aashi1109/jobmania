import {
  Image,
  View,
  Text,
  ActivityIndicator,
  Pressable,
  Linking,
} from "react-native";
import styles from "./userprofilemodal.style";
import { icons, images } from "@/constants";
import VerticalDivider from "../common/VerticalDivider";
import User from "@/models/User";
import { formatDate } from "@/utils/helpers/generalHelpers";

const UserProfileModalData = ({ userData }: { userData: User | null }) => {
  const profileUrl = userData.profileImage.profileUrl;
  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <Image
            source={profileUrl ? { uri: profileUrl } : images.profile}
            style={styles.headerPicture}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>{userData.fullName}</Text>
            <Text style={styles.lightText}>{userData.heading}</Text>
          </View>
          {userData.description && (
            <Text style={styles.description}>{userData.description}</Text>
          )}
          {userData.createdAt && (
            <Text style={styles.lightText}>
              {"Joined on " + formatDate(userData.createdAt?.toDate())}
            </Text>
          )}

          <VerticalDivider width={"100%"} />
          <View style={styles.footerLogos}>
            {userData.links &&
              Object.entries(userData.links).map(([key, value]) => {
                let children;
                if (key === "linkedIn") {
                  children = (
                    <Image
                      source={icons.linkedIcon}
                      style={styles.footerLogoItem}
                    />
                  );
                } else if (key === "portfolio") {
                  children = (
                    <Image
                      source={icons.googleIcon}
                      style={styles.footerLogoItem}
                    />
                  );
                } else if (key === "twitter") {
                  children = (
                    <Image
                      source={icons.twitterIcon}
                      style={styles.footerLogoItem}
                    />
                  );
                }

                return value ? (
                  <Pressable
                    key={key}
                    onPress={() => {
                      Linking.openURL(value);
                    }}
                  >
                    {children}
                  </Pressable>
                ) : null;
              })}
            <Pressable
              onPress={() => {
                const mailtoUrl = `mailto:${userData.email}`;
                Linking.openURL(mailtoUrl);
              }}
            >
              <Image source={icons.email} style={styles.footerLogoItem} />
            </Pressable>
          </View>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default UserProfileModalData;
