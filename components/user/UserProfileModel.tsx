import React, { useState } from "react";
import {Image, Modal, StyleSheet, View, Text, Linking} from "react-native";
import { Link } from "expo-router";
import styles from "./userprofilemodal.style";
import {icons} from "@/constants";

interface UserProfileModalProps {
  image: any;
  name: string;
  bio: string;
  iconImage: any;
  subInfos: { infoTitle: string; infoText: string }[];
}
const UserProfileModalData = (props: UserProfileModalProps) => {
  const { bio, image, name, subInfos, iconImage } = props;
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.headerPicture} />
      <View style={styles.headerInfo}>
        <Text style={styles.headerTitle}>{name}</Text>
        <Text style={styles.lightText}>{"Software Developer"}</Text>
      </View>
      <Text style={styles.description}>
          {bio}
      </Text>
      <Text style={styles.lightText}>Joined 13 May, 2023</Text>

      <View style={styles.horizontalRule} />
      <View style={styles.footerLogos}>
        <Image source={icons.linkedIcon} style={styles.footerLogoItem}/>
        <Image source={icons.googleIcon} style={styles.footerLogoItem}/>
        <Image source={icons.twitterIcon} style={styles.footerLogoItem}/>
      </View>
    </View>
  );
};

export default UserProfileModalData;
