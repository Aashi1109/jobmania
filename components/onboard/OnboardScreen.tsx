import { useState } from "react";
import { Text, View } from "react-native";

import styles from "./onboardscreen.style";
import HeadText from "@/components/common/headtext/HeadText";
import BasicCard from "@/components/common/cards/basic/BasicCard";
import WelcomeContent from "@/components/WelcomeContent";
import AuthForm from "../auth/AuthForm";
import CircularAvatarImagePicker from "../circularprogress/CircularAvatarImagePicker";
import { images } from "@/constants";

const OnboardScreen = () => {
  const [userStage, setUserStage] = useState(1);
  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.bgContainer}>
        <View style={styles.bgTop}>
          <Text style={styles.bgText}>JobMania</Text>
        </View>
        <View style={styles.bgBottom} />
        <View
          style={
            userStage === 1
              ? styles.bgHeadContainer
              : styles.bgHeadContainerShifted
          }
        >
          <HeadText fontSize={userStage === 1 ? 82 : 35} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {userStage === 1 && (
          <>
            <BasicCard>
              <WelcomeContent />
            </BasicCard>

            <BasicCard>
              <CircularAvatarImagePicker
                size={100}
                circleProgress={0.0005}
                strokeWidth={10}
              />
              <AuthForm setData={null} />
            </BasicCard>
          </>
        )}
      </View>
    </View>
  );
};

export default OnboardScreen;
