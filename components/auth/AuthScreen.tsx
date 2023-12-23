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
import {
  generateRandomFileName,
  processAuthErrorMessage,
} from "@/utils/helpers/generalHelpers";
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
  const { dispatch } = usePopup();
  const { signIn, signUp } = useAuth();

  const [userStage, setUserStage] = useState<AuthScreenStagesE>(
    AuthScreenStagesE.INTIAL
  );
  const [avatarProgress, setAvatarProgress] = useState(AvatarProgressE.Nothing);
  const [isLoading, setIsLoading] = useState(false);
  const [fontSize, setFontSize] = useState(81);
  const [prevUserData, setPrevUserData] = useState<{
    fullName: string;
    userId: string;
    email: string;
    photoUrl: string;
  }>(null);

  const doStyleChange =
    userStage === AuthScreenStagesE.INTIAL ||
    userStage === AuthScreenStagesE.LOGIN ||
    userStage === AuthScreenStagesE.GOOGLE_AUTH;

  const handleSetData = ({ data, stage }: AuthScreenStagesI) => {
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
  const handleProcessing = async () => {
    console.log("handleProcessing called");

    const authHelpers = new AuthHelpers();
    const userDBHelpers = new UserFirestoreService();
    const userData = {
      email: inputData["email"],
      password: inputData["password"],
    };
    try {
      if (userStage === AuthScreenStagesE.LOGIN) {
        setIsLoading(true);
        setPrevUserData(null);

        await signIn(userData.email, userData.password);
        if (await authHelpers.authObserver()) {
          setIsLoading(false);
          router.replace("/(app)/home");
        }
      }

      if (userStage === AuthScreenStagesE.CHECK_EMAIL_EXISTS && !prevUserData) {
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
          setAvatarProgress((prevState) => prevState + AvatarProgressE.Stage2);
        }
      }

      if (userStage === AuthScreenStagesE.REGISTER_COMPLETE) {
        setIsLoading(true);
        let userId;
        if (prevUserData) {
          userId = prevUserData.userId;
        } else {
          await signUp(userData.email, userData.password);
          userId = await authHelpers.authObserver();
        }

        if (userId) {
          const userCreateResp = await processUserDataAndDoEntry(
            userId,
            userDBHelpers
          );
          if (userCreateResp) {
            // Route user to homepage and save its authentication state
            router.replace("/(app)/home");
          }
        }
      }

      if (userStage === AuthScreenStagesE.GOOGLE_AUTH) {
        setIsLoading(true);
        const googleAuthResult = await authHelpers.googleAuth();
        // If user has signed in using google
        const { user, token } = googleAuthResult;
        if (user) {
          // Check if they are already a user
          const userData = await userDBHelpers.getUserById(user.uid);
          console.log("userData -> ", userData);

          if (!userData) {
            // If new user make them go through the signup process
            const googleUserData = {
              fullName: user.displayName ?? "",
              email: user.email ?? "",
              photoUrl: user.photoURL ?? "",
              userId: user.uid ?? "",
            };
            inputData["profilePic"] = {
              isUrl: true,
              url: user.photoURL ?? "",
            };
            setAvatarProgress(AvatarProgressE.ImagePresent);
            setPrevUserData(googleUserData);
            setUserStage(AuthScreenStagesE.REGISTER);
          }
        }
      }

      setIsLoading(false);
    } catch (error: FirebaseError | any) {
      setIsLoading(false);
      setPrevUserData(null);

      dispatch({
        type: "CREATE_POPUP",
        payload: {
          message: processAuthErrorMessage(error),
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

  useEffect(() => {
    console.log("ufe called");

    handleProcessing();
  }, [userStage]);

  console.log("userStage -> ", userStage);

  useEffect(() => {
    // Dynamically adjust font size based on screen width
    const screenWidth = Dimensions.get("window").width;
    const calculatedFontSize = screenWidth * 0.21; // Adjust the multiplier as needed
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

  const processUserDataAndDoEntry = async (
    userId: string,
    userDBHelpers: any
  ) => {
    const profilePic = inputData["profilePic"];
    const resumeData = inputData["resume"];
    let profileDownloadUrl = "";
    let resumeDownloadUrl = "";
    let resumeFileName = "";
    if (profilePic && "isUrl" in profilePic && profilePic["isUrl"]) {
      const profileStorageService = new FirebaseStorageService("/profilePics");
      profileDownloadUrl = await handleFileUpload(
        profilePic.uri,
        profileStorageService
      );
    }
    if (resumeData) {
      const resumeStorageService = new FirebaseStorageService("/resume");
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
        portfolio: inputData["portfolio"],
      },
      appliedJobs: [],
    });

    const userCreateResp = await userDBHelpers.addUserToCollection(
      newUser,
      userId
    );
    return userCreateResp;
  };

  const renderStageContent = () => {
    console.log("Rendering stage content for:", userStage);
    switch (userStage) {
      case AuthScreenStagesE.INTIAL:
      case AuthScreenStagesE.LOGIN:
      case AuthScreenStagesE.GOOGLE_AUTH:
        return <AuthForm setData={handleSetData} isLoading={isLoading} />;
      case AuthScreenStagesE.CHECK_EMAIL_EXISTS:
      case AuthScreenStagesE.REGISTER:
        return (
          <AuthForm
            setData={handleSetData}
            isLoginForm={false}
            isLoading={isLoading}
            prevData={prevUserData ? { email: prevUserData.email } : null}
          />
        );

      case AuthScreenStagesE.FORGOT_PASSWORD:
        return null;
      case AuthScreenStagesE.REGISTER_STAGE_2:
        console.log("render stage 2 called");
        return (
          <StageTwo
            setData={handleSetData}
            isLoading={isLoading}
            prevData={prevUserData ? { fullName: prevUserData.fullName } : null}
          />
        );
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
              imageUri={prevUserData ? prevUserData?.photoUrl : null}
            />
          )}
          {renderStageContent()}
        </BasicCard>
      </View>
    </View>
  );
};

export default AuthScreen;
