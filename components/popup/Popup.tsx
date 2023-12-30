import { usePopup } from "@/context/PopupContext";
import { useRef, useEffect } from "react";
import { View, Text, Animated, Platform } from "react-native";

import { CheckboxIcon, InfoIcon, WarningIcon } from "../common/iconcomponents";
import { SIZES } from "@/constants";
import styles from "./popup.styles";

const calImgSrc = (type: string, svgProperty: object): any => {
  if (type === "success") return <CheckboxIcon {...svgProperty} />;
  if (type === "error") return <WarningIcon {...svgProperty} />;
  if (type === "info") return <InfoIcon {...svgProperty} />;
  return null; // Adjust based on your actual image import in React Native
};

const OPACITY_ANIM_DURATION = 500;
const TRANSLATE_Y_ANIM_DURATION = 500;
const POPUP_TOTAL_SHOWN_TIME = 5000;

const Popup = () => {
  const translateYAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const popupState = usePopup();
  const {
    state: { showPopup, popups },
  } = popupState;

  useEffect(() => {
    if (showPopup) {
      // Initial fade in and slide up animation
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: OPACITY_ANIM_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: TRANSLATE_Y_ANIM_DURATION,
          useNativeDriver: true,
        }),
      ]).start();

      // After 5 seconds, fade out and slide up animation
      const timeout = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: OPACITY_ANIM_DURATION,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            toValue: -100,
            duration: TRANSLATE_Y_ANIM_DURATION,
            useNativeDriver: true,
          }),
        ]).start();
      }, POPUP_TOTAL_SHOWN_TIME);

      // Clear the timeout when the component unmounts or when showPopup changes
      return () => clearTimeout(timeout);
    }
  }, [opacityAnim, popups, translateYAnim]);

  return (
    <View
      style={[styles.container, { top: Platform.OS === "web" ? "5%" : "8%" }]}
    >
      <View style={styles.popupContent}>
        {showPopup &&
          popups
            .filter((filPop) => Date.now() - filPop.id! <= 5000)
            .map((popup, index) => (
              <Animated.View
                key={index}
                style={{
                  transform: [{ translateY: translateYAnim }],
                  opacity: opacityAnim,
                }}
              >
                <View style={styles.popup}>
                  <Text style={styles.popupText}>{popup.message}</Text>
                </View>
              </Animated.View>
            ))}
      </View>
    </View>
  );
};

export default Popup;
