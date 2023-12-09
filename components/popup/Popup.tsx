import { usePopup } from "@/context/PopupContext";
import React, { useRef, useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import styles from "./popup.styles";
import { CheckboxIcon, InfoIcon, WarningIcon } from "../common/iconcomponents";

const calImgSrc = (type: string, svgProperty: object): any => {
  if (type === "success") return <CheckboxIcon {...svgProperty} />;
  if (type === "error") return <WarningIcon {...svgProperty} />;
  if (type === "info") return <InfoIcon {...svgProperty} />;
  return null; // Adjust based on your actual image import in React Native
};

const Popup = () => {
  // const [mounted, setMounted] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateXAnim = useRef(new Animated.Value(0));
  const translateYAnim = useRef(new Animated.Value(-100));

  const popupState = usePopup();

  const {
    state: { showPopup, popups, count },
  } = popupState;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, showPopup]);

  return (
    <View>
      {showPopup &&
        popups
          .filter((filPop) => Date.now() - filPop.id! <= 5000)
          .map((popup, index) => (
            <Animated.View
              key={index}
              style={[
                styles.popup,

                { display: Date.now() - popup.id! > 5000 ? "none" : "flex" },
                { opacity: fadeAnim },
              ]}
            >
              <View style={[styles.popupStrip, styles[popup.type]]}></View>
              <View style={styles.popupIcon}>
                {/* <Image source={calImgSrc(popup.type)} alt="popup icon" /> */}
                {calImgSrc(popup.type, { height: 48, width: 48 })}
              </View>
              <View style={styles.popupContent}>
                <Text style={styles.popupHead}>{popup.popupHead}</Text>
                <Text style={styles.popupMessage}>{popup.message}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  /* Add your cancel logic here */
                }}
              >
                <Text style={styles.popupCancel}>&times;</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
    </View>
  );
};

export default Popup;
