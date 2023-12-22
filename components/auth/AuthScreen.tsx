import { useEffect, useState } from "react";
import { Text, View, Dimensions } from "react-native";

import styles from "./authscreen.style";
import HeadText from "@/components/common/headtext/HeadText";
import BasicCard from "@/components/common/cards/basic/BasicCard";
import WelcomeContent from "@/components/WelcomeContent";
import { AuthScreenStagesE, AvatarProgressE } from "@/definitions/enums";
import { AuthScreenStagesI } from "@/definitions/interfaces";
import AuthForm from "./authForm/AuthForm";
import ImageInputWithProgress from "../common/inputs/imageinputwithprogess/ImageInputWithProgress";
import AuthHelpers from "@/firebase/firebaseAuth";
import FirebaseStorageService from "@/firebase/firebaseStorage";
import { generateRandomFileName } from "@/utils/helpers/generalHelpers";
import StageTwo from "./registerStages/stage2/StageTwo";
import StageFour from "./registerStages/stage4/StageFour";
import StageThree from "./registerStages/stage3/StageThree";
import UserFirestoreService from "@/firebase/firebaseFirestore";
import User from "@/models/User";
import Popup from "../popup/Popup";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { usePopup } from "@/context/PopupContext";
import { FirebaseError } from "firebase/app";

let inputData = {};
const AuthScreen = () => {
  const [userStage, setUserStage] = useState<AuthScreenStagesE>(
    AuthScreenStagesE.INTIAL
  );
  const [avatarProgress, setAvatarProgress] = useState(AvatarProgressE.Nothing);
  const { dispatch } = usePopup();

  const [isLoading, setIsLoading] = useState(false);

  const [fontSize, setFontSize] = useState(81);
  const { signIn, signUp } = useAuth();

  const doStyleChange =
    userStage === AuthScreenStagesE.INTIAL ||
    userStage === AuthScreenStagesE.LOGIN;

  const handleSetData = ({ data, stage }: AuthScreenStagesI) => {
    console.log("dfdhfbdfdbsj");
    if (data) {
      if (data && data["profilePic"]) {
        setAvatarProgress(
          (prevState) => prevState + AvatarProgressE.ImagePresent
        );
      }
      // setInputData((prevData) => ({ ...inputData, ...data }));
      inputData = { ...inputData, ...data };
    }
    if (stage) {
      const newStage = stage;
      console.log("avatar progress -> ", avatarProgress);
      if (newStage === AuthScreenStagesE.REGISTER_STAGE_3) {
        setAvatarProgress(AvatarProgressE.Stage3);
      }
      if (newStage === AuthScreenStagesE.REGISTER_STAGE_4) {
        setAvatarProgress(AvatarProgressE.Stage4);
      }
      if (newStage === AuthScreenStagesE.REGISTER_COMPLETE) {
        setAvatarProgress(AvatarProgressE.Complete);
      }
      setUserStage(newStage);
    }
  };
  console.log("====================================");
  console.log("inputData -> ", inputData);
  console.log("====================================");

  useEffect(() => {
    const handleProcessing = async () => {
      const authHelpers = new AuthHelpers();
      const userData = {
        email: inputData["email"],
        password: inputData["password"],
      };
      try {
        if (userStage === AuthScreenStagesE.LOGIN) {
          setIsLoading(true);
          await signIn(userData.email, userData.password);
          if (await authHelpers.authObserver()) {
            setIsLoading(false);
            router.replace("/(app)/home");
          }
        }
        if (userStage === AuthScreenStagesE.CHECK_EMAIL_EXISTS) {
          setIsLoading(true);
          const isUserExists = await authHelpers.checkIfEmailExists(
            inputData["email"] ?? ""
          );
          setIsLoading(false);

          if (isUserExists) {
            // TODO show error popup to user
            alert("Email already exists");
            setUserStage(AuthScreenStagesE.REGISTER);
          } else {
            setUserStage(AuthScreenStagesE.REGISTER_STAGE_2);
            setAvatarProgress(
              (prevState) => prevState + AvatarProgressE.Stage2
            );
          }
        }
        if (userStage === AuthScreenStagesE.REGISTER_COMPLETE) {
          setIsLoading(true);
          await signUp(userData.email, userData.password);

          const userId = await authHelpers.authObserver();
          console.log("isAuthenticated -> ", userId);

          if (userId) {
            const profilePic = inputData["profilePic"];
            const resumeData = inputData["resume"];
            let profileDownloadUrl = "";
            let resumeDownloadUrl = "";
            let resumeFileName = "";
            if (profilePic) {
              const profileStorageService = new FirebaseStorageService(
                "/profilePics"
              );
              profileDownloadUrl = await handleFileUpload(
                profilePic.uri,
                profileStorageService
              );
            }
            if (resumeData) {
              const resumeStorageService = new FirebaseStorageService(
                "/resume"
              );
              resumeFileName = resumeData["name"];
              resumeDownloadUrl = await handleFileUpload(
                resumeData.uri,
                resumeStorageService,
                resumeFileName
              );
            }

            const newUser = new User({
              fullName: inputData["fullName"]?.trim() || "",
              userName: inputData["username"]?.trim() || "",
              profileImage: { profileUrl: profileDownloadUrl },
              email: inputData["email"]?.trim() || "",
              location: {
                lat: null,
                long: null,
                address: inputData["location"]?.trim() || "",
              },
              description: inputData["description"]?.trim() || "",
              skills: inputData["skills"] || [],

              resume: {
                fileName: resumeFileName,
                resumeUrl: resumeDownloadUrl,
              },
              heading: inputData["profileHeading"]?.trim() || "",

              links: {
                linkedIn: inputData["linkedIn"],
                portfolio: inputData["porfolio"],
              },
            });
            const userDBHelpers = new UserFirestoreService();
            const userCreateResp = await userDBHelpers.addUserToCollection(
              newUser,
              userId
            );
            if (userCreateResp) {
              // Route user to homepage and save its authentication state
              setIsLoading(false);
              router.replace("/(app)/home");
            }
          }
        }
      } catch (error: FirebaseError | any) {
        setIsLoading(false);

        dispatch({
          type: "CREATE_POPUP",
          payload: {
            message:
              (error.message?.includes("invalid-login-credentials") &&
                "Invalid credentials provided") ||
              "Something went wrong",
          },
        });
        // Reset previous states on errors
        if (userStage === AuthScreenStagesE.LOGIN) {
          setUserStage(AuthScreenStagesE.INTIAL);
        }
        if (userStage === AuthScreenStagesE.CHECK_EMAIL_EXISTS) {
          setUserStage(AuthScreenStagesE.REGISTER);
        }
        if (userStage === AuthScreenStagesE.REGISTER_COMPLETE) {
          setUserStage(AuthScreenStagesE.REGISTER_STAGE_4);
        }

        console.error("Auth error -> ", error);
      }
    };

    handleProcessing();
  }, [userStage]);

  // Set your initial font size here

  useEffect(() => {
    // Dynamically adjust font size based on screen width
    const screenWidth = Dimensions.get("window").width;
    const calculatedFontSize = screenWidth * 0.216; // Adjust the multiplier as needed
    setFontSize(calculatedFontSize);
  }, []);

  const handleFileUpload = async (
    uri: string,
    storageService,
    fileName: string = null
  ) => {
    const r = await fetch(uri);
    const b = await r.blob();
    const mimetype = b.type;
    const fileFormat = mimetype.split("/")[1] ?? "png";
    const downloadUrl = await storageService.uploadFile(
      b,
      generateRandomFileName("." + fileFormat, fileName)
    );

    return downloadUrl;
  };

  const renderStageContent = () => {
    switch (userStage) {
      case AuthScreenStagesE.INTIAL:
      case AuthScreenStagesE.LOGIN:
        return <AuthForm setData={handleSetData} isLoading={isLoading} />;
      case AuthScreenStagesE.CHECK_EMAIL_EXISTS:
      case AuthScreenStagesE.REGISTER:
        return (
          <AuthForm
            setData={handleSetData}
            isLoginForm={false}
            isLoading={isLoading}
          />
        );
      case AuthScreenStagesE.FORGOT_PASSWORD:
        return null;
      case AuthScreenStagesE.REGISTER_STAGE_2:
        return <StageTwo setData={handleSetData} isLoading={isLoading} />;
      case AuthScreenStagesE.REGISTER_STAGE_3:
        return <StageThree setData={handleSetData} isLoading={isLoading} />;
      case AuthScreenStagesE.REGISTER_STAGE_4:
      case AuthScreenStagesE.REGISTER_COMPLETE:
        return <StageFour setData={handleSetData} isLoading={isLoading} />;
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <Popup />
      {/* Background */}
      <View style={styles.bgContainer}>
        <View style={styles.bgTop}>
          <Text style={[styles.bgText, { fontSize }]}>JobMania</Text>
        </View>
        <View style={styles.bgBottom} />
        <View
          style={
            doStyleChange
              ? styles.bgHeadContainer
              : styles.bgHeadContainerShifted
          }
        >
          <HeadText fontSize={doStyleChange ? 82 : 45} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {doStyleChange && (
          <BasicCard>
            <WelcomeContent />
          </BasicCard>
        )}
        <BasicCard>
          {userStage !== AuthScreenStagesE.LOGIN && (
            <ImageInputWithProgress
              setData={handleSetData}
              stepProgress={avatarProgress}
            />
          )}
          {renderStageContent()}
        </BasicCard>
      </View>
    </View>
  );
};

export default AuthScreen;
