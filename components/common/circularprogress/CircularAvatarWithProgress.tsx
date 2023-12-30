import { View, Image } from "react-native";
import styles from "./circularavatarprogress.style";
import { COLORS, images } from "@/constants";
import { Circle, Svg } from "react-native-svg";

const CircularAvatarWithProgress = ({
  strokeWidth,
  size,
  selectedImage,
  circleProgress,
}: {
  size: number;
  strokeWidth: number;
  circleProgress: number;
  selectedImage?: string;
}) => {
  const Radius = size / 2 - Math.round(strokeWidth / 2);
  const circleLength = Radius * 2 * Math.PI;

  const imageUri =
    selectedImage?.startsWith("http") || selectedImage?.startsWith("file:///")
      ? { uri: selectedImage }
      : selectedImage;

  console.log(imageUri);
  return (
    <View style={styles.container}>
      <View style={styles.progress}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={Radius}
            stroke={COLORS.gray2}
            fill={"#fff"}
            strokeWidth={strokeWidth}
          />
          <Circle
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
        </Svg>
      </View>
      <View style={[styles.avatar, { width: size * 0.7, height: 0.7 * size }]}>
        <Image
          source={selectedImage ? imageUri : images.profile}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default CircularAvatarWithProgress;
