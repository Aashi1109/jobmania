import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import styles from "./authscreen";
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
import CustomModal from "../common/modal/CustomModal";
import Popup from "../popup/Popup";
import { usePopup } from "@/context/PopupContext";

let inputData = {};
const AuthScreen = () => {
  const authHelpers = new AuthHelpers();
  const profileStorageService = new FirebaseStorageService("/profilePics");
  const resumeStorageService = new FirebaseStorageService("/resume");
  const userDBHelpers = new UserFirestoreService();
  const [userStage, setUserStage] = useState<AuthScreenStagesE>(
    AuthScreenStagesE.INTIAL
  );
  const [avatarProgress, setAvatarProgress] = useState(AvatarProgressE.Nothing);
  // const [inputData, setInputData] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const { dispatch: popupDispatch } = usePopup();

  const handleSetData = async (data: AuthScreenStagesI) => {
    console.log("dfdhfbdfdbsj");
    if (data?.data) {
      if (data.data && data.data["profilePic"]) {
        setAvatarProgress(AvatarProgressE.ImagePresent);
      }
      inputData = { ...inputData, ...data?.data };
    }
    if (data?.stage) {
      const newStage = data.stage;

      // if (newStage === AuthScreenStagesE.REGISTER_STAGE_2) {
      //   setAvatarProgress(prevState => prevState + AvatarProgressE.Stage2);
      // }
      if (newStage === AuthScreenStagesE.REGISTER_STAGE_3) {
        setAvatarProgress((prevState) => prevState + AvatarProgressE.Stage3);
      }
      if (newStage === AuthScreenStagesE.REGISTER_STAGE_4) {
        setAvatarProgress((prevState) => prevState + AvatarProgressE.Stage4);
      }
      if (newStage === AuthScreenStagesE.REGISTER_COMPLETE) {
        setAvatarProgress((prevState) => prevState + AvatarProgressE.Complete);
      }
      setUserStage(newStage);
    }
  };
  console.log("====================================");
  console.log("inputData -> ", inputData);
  console.log("====================================");

  const handleUserLogin = async (userData: {
    email: string;
    password: string;
  }) => {
    const loginResp = await authHelpers.signUp(
      userData["email"],
      userData["password"]
    );
    console.log("login done");

    return loginResp;
  };

  useEffect(() => {
    const handleProcessing = async () => {
      try {
        if (userStage === AuthScreenStagesE.LOGIN) {
          const userData = {
            email: inputData["email"],
            password: inputData["password"],
          };

          const loginResp = await handleUserLogin(userData);
          const isAuthenticated = await authHelpers.authObserver();

          if (isAuthenticated) {
            // TODO push to home page
          }
        }
        if (userStage === AuthScreenStagesE.CHECK_EMAIL_EXISTS) {
          const isUserExists = await authHelpers.checkIfEmailExists(
            inputData["email"] ?? ""
          );

          if (isUserExists) {
            // TODO show error popup to user
            alert("Email already exists");
          } else {
            setUserStage(AuthScreenStagesE.REGISTER_STAGE_2);
            setAvatarProgress(
              (prevState) => prevState + AvatarProgressE.Stage2
            );
          }
        }
        if (userStage === AuthScreenStagesE.REGISTER_COMPLETE) {
          const registerResp = await handleRegister(inputData);
          const isAuthenticated = await authHelpers.authObserver();

          if (isAuthenticated) {
            const profilePic = inputData["profilePic"];
            const resumeData = inputData["resume"];
            let profileDownloadUrl = "";
            let resumeDownloadUrl = "";
            let resumeFileName = "";
            if (profilePic) {
              profileDownloadUrl = await handleFileUpload(
                profilePic.uri,
                profileStorageService
              );
            }
            if (resumeData) {
              resumeFileName = resumeData["name"];
              resumeDownloadUrl = await handleFileUpload(
                resumeData.uri,
                resumeStorageService,
                resumeFileName
              );
            }

            const newUser = new User(
              inputData["fullName"] || "",
              inputData["username"] || "",
              { profileUrl: profileDownloadUrl },
              inputData["email"] || "",
              { lat: null, long: null, address: inputData["location"] },
              inputData["description"] || "",
              inputData["skills"] || [],
              [],
              { fileName: resumeFileName, resumeUrl: resumeDownloadUrl },
              inputData["heading"]
            );

            // const finalUserData = {
            //   email: inputData["email"] || "",
            //   fullName: inputData["fullName"] || "",
            //   userName: inputData["username"] || "",
            //   profileImage: { profileUrl: profileDownloadUrl },
            //   location: { lat: null, lang: null, address: inputData["location"] },
            //   resume: { fileName: resumeFileName, resumeUrl: resumeDownloadUrl },
            //   description: inputData["description"] || "",
            //   skills: inputData["skills"] || [],
            //   appliedJobs: [],
            // };
            const userCreateResp =
              await userDBHelpers.addUserToCollection(newUser);
            if (userCreateResp) {
              // Route user to homepage and save its authentication state
              console.log(userCreateResp);
            }
          }
        }
      } catch (error) {
        console.error("Auth error -> ", error);
        // <CustomModal modalVisible={true} toggleModal={() => {}}>
        //   <View>
        //     <Text>
        //       {error?.message?.split("/")[1]?.split("-").join(" ") || "error"}
        //     </Text>
        //   </View>
        // </CustomModal>;
        // Alert.alert(
        //   "Auth Error",
        //   error?.message?.split("/")[1]?.split("-").join(" ") ||
        //     "Something went wrong while doing authentication"
        // );
      }
    };

    handleProcessing();
  }, [userStage]);

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
  const handleRegister = async (userData: object) => {
    const registerResp = await authHelpers.signUp(
      userData["email"],
      userData["password"]
    );
    return registerResp;
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
        return <StageTwo setData={handleSetData} />;
      case AuthScreenStagesE.REGISTER_STAGE_3:
        return <StageThree setData={handleSetData} />;
      case AuthScreenStagesE.REGISTER_STAGE_4:
      case AuthScreenStagesE.REGISTER_COMPLETE:
        return <StageFour setData={handleSetData} />;
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
        <BasicCard>
          {userStage !== AuthScreenStagesE.LOGIN && (
            <ImageInputWithProgress
              setData={handleSetData}
              stepProgress={avatarProgress}
            />
          )}
          {renderStageContent()}

          {/* <TouchableOpacity
            onPress={() => {
              const statuses = ["success", "error", "info"];
              const randomStatus =
                statuses[Math.floor(Math.random() * statuses.length)];
              dispatch({
                type: "CREATE_POPUP",
                payload: {
                  message: "Just checking popup",
                  popupHead: "Demo",
                  type: randomStatus,
                },
              });
            }}
          >
            <Text>Generate Popup</Text>
          </TouchableOpacity> */}
        </BasicCard>
      </View>
    </View>
  );
};

export default AuthScreen;
