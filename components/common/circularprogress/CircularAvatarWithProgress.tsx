import React from "react";
import { View, Image } from "react-native";
import styles from "./circularavatarprogress.style";
import { COLORS, images } from "@/constants";

const CircularAvatarWithProgress = ({
  strokeWidth,
  size,
  circleProgress,
}: {
  size: number;
  strokeWidth: number;
  circleProgress: number;
}) => {
  const Radius = size / 2 - Math.round(strokeWidth / 2);
  const circleLength = Radius * 2 * Math.PI;

  return (
    <View style={styles.container}>
      <View style={styles.progress}>
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={Radius}
            stroke={COLORS.gray2}
            fill={"#fff"}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={Radius}
            stroke={COLORS.primary}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circleLength}
            strokeDashoffset={circleLength * (1 - circleProgress)}
            strokeLinecap="round"
          />
        </svg>
      </View>
      <View style={[styles.avatar, { width: size * 0.7, height: 0.7 * size }]}>
        <Image source={images.profile} style={styles.image} />
      </View>
    </View>
  );
};

export default CircularAvatarWithProgress;
