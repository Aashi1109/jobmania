import { useState } from "react";
import { Text, View } from "react-native";

import styles from "./authscreen";
import HeadText from "@/components/common/headtext/HeadText";
import BasicCard from "@/components/common/cards/basic/BasicCard";
import WelcomeContent from "@/components/WelcomeContent";
import AuthForm from "./AuthForm";
import { AuthScreenStagesE } from "@/definitions/enums";
import { AuthScreenStagesI } from "@/definitions/interfaces";
import StageTwo from "./registerStages/stage2/StageTwo";
import StageThree from "./registerStages/stage3/StageThree";

const AuthScreen = () => {
  const [userStage, setUserStage] = useState<AuthScreenStagesE>(
    AuthScreenStagesE.LOGIN
  );

  const handleSetData = (data: AuthScreenStagesI) => {
    if (data?.stage) {
      console.log("data.stage", data.stage);
      setUserStage(data.stage);
    }
  };

  const renderStageContent = () => {
    switch (userStage) {
      case AuthScreenStagesE.LOGIN:
        return <AuthForm setData={handleSetData} />;
      case AuthScreenStagesE.REGISTER:
        return <AuthForm setData={handleSetData} isLoginForm={false} />;
      case AuthScreenStagesE.FORGOT_PASSWORD:
        return null;
      case AuthScreenStagesE.REGISTER_STAGE_2:
        return <StageTwo />;
      case AuthScreenStagesE.REGISTER_STAGE_3:
        return <StageThree />;
      default:
        return null;
    }
  };
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
            userStage === AuthScreenStagesE.LOGIN
              ? styles.bgHeadContainer
              : styles.bgHeadContainerShifted
          }
        >
          <HeadText
            fontSize={userStage === AuthScreenStagesE.LOGIN ? 82 : 35}
          />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {userStage === AuthScreenStagesE.LOGIN && (
          <BasicCard>
            <WelcomeContent />
          </BasicCard>
        )}
        <BasicCard>{renderStageContent()}</BasicCard>
      </View>
    </View>
  );
};

export default AuthScreen;
