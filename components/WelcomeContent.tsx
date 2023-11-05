import { images } from "@/constants";
import { Image, StyleSheet, Text, View } from "react-native";

const WelcomeContent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome Seeker </Text>
        <View style={{ width: 36, height: 30 }}>
          <Image
            source={images.hands}
            style={{
              width: "100%",
              height: "100%",
              // transform: [{ rotate: "90deg" }],
            }}
            resizeMode="contain"
          />
        </View>
      </View>
      <Text>JobMania is trending platform for finding job easily.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  titleContainer: {
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
  },
});
export default WelcomeContent;
