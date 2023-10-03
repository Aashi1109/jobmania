import React from "react";
import { Text, View } from "react-native";
import styles from "./headtext.style";

const HeadText = ({ fontSize }: { fontSize: number }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: fontSize }]}>J</Text>
      <Text style={[styles.text, { fontSize: fontSize * 0.6 }]}>M.</Text>
    </View>
  );
};

export default HeadText;
