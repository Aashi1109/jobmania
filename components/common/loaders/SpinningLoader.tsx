import { View, Animated, Easing } from "react-native";
import styles from "./spinningloader.style";
import { COLORS } from "@/constants";

const SpinningLoader = () => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1200,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={{ backgroundColor: COLORS.primary }}>
      <View style={styles.ldsRing}>
        {[0, 1, 2, 3].map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.ldsRingItem,
              { transform: [{ rotate: `${index * 90}deg` }, { rotate: spin }] },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default SpinningLoader;
