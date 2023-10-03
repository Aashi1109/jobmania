import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import styles from "./circularavatarprogress.style";

const CircularAvatarWithProgress = ({ imageSource, step }) => {
  // Calculate the progress percentage based on the current step
  const progressPercentage = step * 25;

  return (
    <View style={styles.container}>
      <View style={styles.progressRing}>
        <View
          style={[
            styles.progressIndicator,
            { transform: [{ rotate: `${progressPercentage}deg` }] },
          ]}
        ></View>
      </View>
      <TouchableOpacity style={styles.avatarContainer}>
        <Image source={imageSource} style={styles.avatar} />
      </TouchableOpacity>
    </View>
  );
};

export default CircularAvatarWithProgress;
