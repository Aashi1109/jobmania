import { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useIdTokenAuthRequest as useGoogleIdTokenAuthRequest } from "expo-auth-session/providers/google";
import { FirebaseError } from "firebase/app";

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
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { usePopup } from "@/context/PopupContext";
import {
  expoClientId,
  androidClientId,
  iosClientId,
} from "@/firebase/firebaseConfig";
import { SafeAreaProvider } from "react-native-safe-area-context";

let inputData = {};
const AuthScreen = () => {
  const { dispatch } = usePopup();
  const { signIn, signUp, getSetUser, isUserInvalid } = useAuth();

  // use states
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

  // Hook that gives us the function to authenticate our Google OAuth provider
  // Maybe implemented in future releases
  // const [, googleResponse, promptAsyncGoogle] = useGoogleIdTokenAuthRequest({
  //   selectAccount: true,
  //   expoClientId,
  //   iosClientId,
  //   androidClientId,
  //   webClientId: "",
  // });
  // console.log("expoClientId -> ", expoClientId);

  // ref
  const bgHeadRef = useRef(null);

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
      } else if (
        userStage === AuthScreenStagesE.CHECK_EMAIL_EXISTS &&
        !prevUserData
      ) {
        setIsLoading(true);
        const isUserExists = await authHelpers.checkIfEmailExists(
          inputData["email"] ?? ""
        );
        setIsLoading(false);

        if (isUserExists) {
          // TODO show error popup to user
          // alert("Email already exists");
          setUserStage(AuthScreenStagesE.REGISTER);
          throw Error("@custom@Email already exists");
        } else {
          setUserStage(AuthScreenStagesE.REGISTER_STAGE_2);
          setAvatarProgress((prevState) => prevState + AvatarProgressE.Stage2);
        }
      } else if (userStage === AuthScreenStagesE.REGISTER_COMPLETE) {
        setIsLoading(true);
        let userId;
        if (prevUserData) {
          userId = prevUserData.userId;
        } else {
          userId = await signUp(userData.email, userData.password);
        }

        if (userId) {
          const userCreateResp = await processUserDataAndDoEntry(
            userId,
            userDBHelpers
          );
          console.log("userCreateResp -> ", userCreateResp);
          if (userCreateResp) {
            console.log("user created successfully");
            await getSetUser(userId);
          }
          if (isUserInvalid) {
            setUserStage(AuthScreenStagesE.REGISTER_STAGE_4);
          }
        }
      } else if (userStage === AuthScreenStagesE.GOOGLE_AUTH) {
        // throw Error("Pop check error");
        setIsLoading(true);
        // This code only works for web version
        const googleAuthResult = await authHelpers.googleAuth();
        // If user has signed in using google
        const { user, token } = googleAuthResult;
        if (user) {
          // Check if they are already a user
          const userData = await userDBHelpers.getUserById(user.uid);

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
            setPrevUserData(googleUserData);
            setAvatarProgress(AvatarProgressE.ImagePresent);
            setUserStage(AuthScreenStagesE.REGISTER);
          } else {
            router.replace("/(app)/(drawer)/home");
          }
        }

        // For all platforms
        // const googleAuthResult = await promptAsyncGoogle();
        // console.log(googleAuthResult);
      }
    } catch (error: FirebaseError | any) {
      setPrevUserData(null);
      const errorMessage = processAuthErrorMessage(error);
      console.error(errorMessage);

      dispatch({
        type: "CREATE_POPUP",
        payload: {
          message: errorMessage,
        },
      });
      // Reset previous states on errors
      if (userStage === AuthScreenStagesE.LOGIN) {
        setUserStage(AuthScreenStagesE.INTIAL);
      } else if (userStage === AuthScreenStagesE.CHECK_EMAIL_EXISTS) {
        setUserStage(AuthScreenStagesE.REGISTER);
      } else if (userStage === AuthScreenStagesE.REGISTER_COMPLETE) {
        setUserStage(AuthScreenStagesE.REGISTER_STAGE_4);
      } else if (userStage === AuthScreenStagesE.GOOGLE_AUTH) {
        setUserStage(AuthScreenStagesE.INTIAL);
      } else {
        setUserStage(AuthScreenStagesE.INTIAL);
      }

      console.error("Auth error -> ", error);
    } finally {
      setIsLoading(false);
    }
  };

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
    if (profilePic && !("isUrl" in profilePic) && !profilePic["isUrl"]) {
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
      profileImage: { profileUrl: profileDownloadUrl ?? "" },
      email: inputData["email"]?.trim() || "",
      location: {
        lat: null,
        long: null,
        address: inputData["location"]?.trim() || "",
      },
      description: inputData["description"]?.trim() || "",
      skills: inputData["skills"] || [],
      resume: {
        fileName: resumeFileName ?? "",
        resumeUrl: resumeDownloadUrl ?? "",
      },
      heading: inputData["profileHeading"]?.trim() || "",

      links: {
        linkedIn: inputData["linkedIn"] ?? "",
        portfolio: inputData["portfolio"] ?? "",
      },
      appliedJobs: [],
      savedJobs: [],
    });

    const userCreateResp = await userDBHelpers.addUserToCollection(
      newUser,
      userId
    );
    return userCreateResp;
  };

  const renderStageContent = () => {
    // console.log("Rendering stage content for:", userStage);
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

  useEffect(() => {
    handleProcessing();
  }, [userStage]);
  // console.log("userStage ->", userStage);

  useEffect(() => {
    const screenWidth = Dimensions.get("window").width;
    const calculatedFontSize =
      screenWidth * (Platform.OS === "web" ? 0.214 : 0.24); // Adjust the multiplier as needed
    setFontSize(calculatedFontSize);
  }, []);

  // useEffect(() => {
  //   if (googleResponse?.type === "success") {
  //     // ...Firebase login will come here
  //   }
  // }, [googleResponse]);

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.bgContainer}>
        <View style={styles.bgTop}>
          <Text style={[styles.bgText, { fontSize }]}>JobMania</Text>
        </View>
        <View style={styles.bgBottom} />
        <View
          ref={bgHeadRef}
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
      <ScrollView>
        <View style={[styles.content]}>
          {doStyleChange && (
            <BasicCard>
              <WelcomeContent />
            </BasicCard>
          )}
          <BasicCard>
            {userStage > AuthScreenStagesE.LOGIN && (
              <ImageInputWithProgress
                setData={handleSetData}
                stepProgress={avatarProgress}
                imageUri={prevUserData ? prevUserData?.photoUrl : null}
              />
            )}
            {renderStageContent()}
          </BasicCard>
        </View>
      </ScrollView>
    </View>
  );
};

export default AuthScreen;
