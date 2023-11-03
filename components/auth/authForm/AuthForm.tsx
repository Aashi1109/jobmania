import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import styles from "./authform.style";
import { COLORS, icons } from "@/constants";
import { AuthScreenStagesE } from "@/definitions/enums";
import CustomInput from "@/components/common/inputs/customInput/CustomInput";
import VerticalDivider from "@/components/common/VerticalDivider";
import Button from "@/components/common/Button";
import authFormSchema from "@/utils/validations/authFormSchema";

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

  // form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authFormSchema),
  });

  const forgotPasswordHandler = () => {};
  const continueWithHandler = () => {
    if (authProvider == providerList[0]) {
      if (isLogin) {
      } else {
      }
    }
  };

  const handleButtonClick = async () => {
    let formData = null;
    const result = await handleSubmit((data) => {
      formData = data;
    })();
    if (isLogin) {
      setData({ data: formData });
    } else {
      setData({ stage: AuthScreenStagesE.REGISTER_STAGE_2 });
    }
  };
  return (
    <View style={styles.container}>
      {!isLogin && (
        <CustomInput
          control={control}
          label="username"
          placeholder="jobmania"
          errors={errors}
        />
      )}
      <CustomInput
        label="email"
        control={control}
        placeholder="jobmania@email.com"
        errors={errors}
      />
      <CustomInput
        label="password"
        control={control}
        placeholder="Password"
        errors={errors}
      />

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
