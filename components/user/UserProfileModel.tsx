import React, { useState } from "react";
import { Image, View, Text } from "react-native";
import styles from "./userprofilemodal.style";
import { icons } from "@/constants";
import VerticalDivider from "../common/VerticalDivider";

interface UserProfileModalProps {
  image: any;
  name: string;
  bio: string;
  iconImage: any;
  title: string;
  subInfos: { infoTitle: string; infoText: string }[];
}
const UserProfileModalData = (props: UserProfileModalProps) => {
  const { bio, image, name, subInfos, title } = props;
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.headerPicture} />
      <View style={styles.headerInfo}>
        <Text style={styles.headerTitle}>{name}</Text>
        <Text style={styles.lightText}>{title}</Text>
      </View>
      <Text style={styles.description}>{bio}</Text>
      <Text style={styles.lightText}>Joined 13 May, 2023</Text>

      <VerticalDivider />
      <View style={styles.footerLogos}>
        <Image source={icons.linkedIcon} style={styles.footerLogoItem} />
        <Image source={icons.googleIcon} style={styles.footerLogoItem} />
        <Image source={icons.twitterIcon} style={styles.footerLogoItem} />V
      </View>
    </View>
  );
};

export default UserProfileModalData;
