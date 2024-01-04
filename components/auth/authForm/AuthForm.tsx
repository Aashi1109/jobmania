import { useEffect, useState } from "react";
import { Image, Platform, Pressable, Text, View } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import styles from "./authform.style";
import { COLORS, icons } from "@/constants";
import { AuthProviderE, AuthScreenStagesE } from "@/definitions/enums";
import CustomInput from "@/components/common/inputs/customInput/CustomInput";
import VerticalDivider from "@/components/common/VerticalDivider";
import Button from "@/components/common/Button";
import authFormSchema from "@/utils/validations/authFormSchema";

const AuthForm = ({
  isLoginForm = true,
  setData,
  isLoading,
  prevData,
}: {
  isLoginForm?: boolean;
  setData: Function;
  isLoading: boolean;
  prevData?: { email: string | null };
}) => {
  const [isLogin, setIsLogin] = useState(isLoginForm);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });
  const isEmailEditable = isLogin ? true : !prevData;
  // console.log("isEmailEditable -> ", isEmailEditable);
  // console.log("prevData -> ", prevData);

  const forgotPasswordHandler = () => {};
  const continueWithGoogleHandler = (providerName: AuthProviderE) => {
    if (providerName == AuthProviderE.Google) {
      setData({ stage: AuthScreenStagesE.GOOGLE_AUTH });
    }
  };

  const onSubmit = (data) => {
    if (isLogin) {
      setData({ stage: AuthScreenStagesE.LOGIN, data });
    } else {
      setData({
        stage: prevData
          ? AuthScreenStagesE.REGISTER_STAGE_2
          : AuthScreenStagesE.CHECK_EMAIL_EXISTS,
        data,
      });
    }
  };
  const onError = (error) => console.log(error);

  useEffect(() => {
    setIsLogin(isLoginForm);
    setValue("username", isLogin ? "@invalid@" : "");
    setValue("password", prevData ? "dummyPassword" : "");
    setValue("email", prevData?.email ?? "");
    // setIsLogin(prevState => prevState && )
  }, [isLogin, isLoginForm]);

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
        editable={isEmailEditable}
        control={control}
        placeholder="jobmania@email.com"
        errors={errors}
      />
      {!prevData && (
        <CustomInput
          label="password"
          control={control}
          placeholder="Password"
          errors={errors}
          hideText={true}
        />
      )}

      {isLogin && !prevData && (
        <Pressable onPress={forgotPasswordHandler}>
          <Text style={styles.forgotPassword}>Forgot Password ?</Text>
        </Pressable>
      )}

      {/* Continue with section */}
      {Platform.OS === "web" && !prevData && (
        <View style={styles.continueWith}>
          <View style={styles.continueDivider}>
            <VerticalDivider backgroundColor={COLORS.gray2} />
            <Text>or continue with</Text>
            <VerticalDivider backgroundColor={COLORS.gray2} />
          </View>
          <Pressable
            onPress={() => continueWithGoogleHandler(AuthProviderE.Google)}
            style={{ flexDirection: "row", justifyContent: "center" }}
          >
            <View
              style={{
                width: 30,
                height: 30,
              }}
            >
              <Image
                style={{ width: "100%", height: "100%" }}
                source={icons.googleIcon}
                resizeMode="contain"
              />
            </View>
          </Pressable>
        </View>
      )}

      <Button
        label={isLogin ? "Login" : "Sign up"}
        isDisabled={isLoading}
        isLoading={isLoading}
        handleClick={handleSubmit(onSubmit, onError)}
      />

      {/* Create/Login ask */}
      <View style={styles.authAsk}>
        <Text style={styles.authAskText}>
          {isLogin ? "Create Account ? " : "Already have an account ? "}
        </Text>
        <Pressable
          onPress={() => {
            // console.log("on press called");
            reset();
            setData({
              stage: isLogin
                ? AuthScreenStagesE.REGISTER
                : AuthScreenStagesE.INTIAL,
            });
            setIsLogin((prevState) => !prevState);
          }}
        >
          <Text style={styles.authAskClickableText}>
            {isLogin ? "Sign up" : "Login"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AuthForm;
