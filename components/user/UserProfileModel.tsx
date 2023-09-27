import React, { useState } from "react";
import { Image, Modal, StyleSheet, View, Text } from "react-native";
import { Link } from "expo-router";
import styles from "./userprofilemodal.style";
import { TouchableOpacity } from "react-native-gesture-handler";

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
      <View style={styles.editIconContainer}>
        <TouchableOpacity onPress={null}>
          <Image source={iconImage} style={styles.editIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Image source={image} style={styles.headerPicture} />
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{name}</Text>
          <Text>{bio}</Text>
        </View>
      </View>

      {subInfos.map((subInfo, index) => (
        <View style={styles.subInfo} key={index}>
          <Text style={{ fontWeight: "700", fontSize: 14 }}>
            {subInfo.infoTitle}
          </Text>
          <Text>{subInfo.infoText}</Text>
        </View>
      ))}
      <View style={styles.horizontalRule} />
      <Link href={"/profile"} style={styles.moreInfoLink}>
        More Info
      </Link>
    </View>
  );
};

export default UserProfileModalData;
