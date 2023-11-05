import React, { useState } from "react";
import { Text, View } from "react-native";

import styles from "./authscreen";
import AuthForm from "./AuthForm";
import StageTwo from "./registerStages/stage2/StageTwo";
import StageThree from "./registerStages/stage3/StageThree";
import { AuthScreenStagesE } from "../../definitions/enums";
import { AuthScreenStagesI } from "../../definitions/interfaces";
import HeadText from "../common/headtext/HeadText";
import BasicCard from "../common/cards/basic/BasicCard";
import WelcomeContent from "../WelcomeContent";
import CircularAvatarWithProgress from "../common/circularprogress/CircularAvatarWithProgress";

const AuthScreen = () => {
  const [userStage, setUserStage] = useState<AuthScreenStagesE>(
    AuthScreenStagesE.LOGIN
  );

  const handleSetData = (data: AuthScreenStagesI) => {
    if (data?.stage) {
      setUserStage(data.stage);
    }
    if (data?.data) {
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
        return <StageTwo setData={handleSetData} />;
      case AuthScreenStagesE.REGISTER_STAGE_3:
        return <StageThree setData={handleSetData} />;
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
        <BasicCard
          height={userStage === AuthScreenStagesE.LOGIN ? "auto" : 521}
        >
          {userStage !== AuthScreenStagesE.LOGIN && (
            <CircularAvatarWithProgress
              size={100}
              circleProgress={0}
              strokeWidth={10}
            />
          )}
          {renderStageContent()}
        </BasicCard>
      </View>
    </View>
  );
};

export default AuthScreen;
