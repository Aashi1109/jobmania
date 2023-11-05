import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";

import styles from "./authform.style";
import VerticalDivider from "../common/VerticalDivider";
import Button from "../common/Button";
import { COLORS, icons } from "@/constants";
import { AuthScreenStagesE } from "@/definitions/enums";

const providerList = ["google"];
const AuthForm = ({
  isLoginForm = true,
  setData,
}: {
  isLoginForm?: boolean;
  setData: Function;
}) => {
  const [authProvider, setAuthProvider] = useState(providerList[0]);
  const [isLogin, setIsLogin] = useState(isLoginForm);
  const forgotPasswordHandler = () => {};
  const continueWithHandler = () => {
    if (authProvider == providerList[0]) {
      if (isLogin) {
      } else {
      }
    }
  };

  const handleButtonClick = () => {
    if (isLogin) {
    } else {
      setData({ data: {}, stage: AuthScreenStagesE.REGISTER_STAGE_2 });
    }
  };
  return (
    <View style={styles.container}>
      {!isLogin && (
        <View>
          <Text style={styles.label}>Username</Text>
          <TextInput style={styles.input} placeholder="jobmania" />
        </View>
      )}
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="jobmania@mail.com" />
      </View>
      <View>
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="password" />
      </View>

      {isLogin && (
        <TouchableOpacity onPress={forgotPasswordHandler}>
          <Text style={styles.forgotPassword}>Forgot Password ?</Text>
        </TouchableOpacity>
      )}

      {/* Continue with section */}
      <View style={styles.continueWith}>
        <View style={styles.continueDivider}>
          <VerticalDivider backgroundColor={COLORS.gray2} />
          <Text>or continue with</Text>
          <VerticalDivider backgroundColor={COLORS.gray2} />
        </View>
        <TouchableOpacity onPress={continueWithHandler}>
          <View style={{ width: 30, height: 30, marginHorizontal: "auto" }}>
            <Image
              style={{ width: "100%", height: "100%" }}
              source={icons.googleIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>

      <Button
        label={isLogin ? "Login" : "Sign up"}
        handleClick={handleButtonClick}
      />

      {/* Create/Login ask */}
      <View style={styles.authAsk}>
        <Text style={styles.authAskText}>
          {isLogin ? "Create Account ? " : "Already have an account ? "}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setData({
              stage: isLogin
                ? AuthScreenStagesE.REGISTER
                : AuthScreenStagesE.LOGIN,
            });
            setIsLogin((prevState) => !prevState);
          }}
        >
          <Text style={styles.authAskClickableText}>
            {isLogin ? "Sign up" : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthForm;
