import { GestureResponderEvent, Text, View } from "react-native";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import HeadingCard from "../cards/HeadingCard";
import {
  PROFILE_STORAGE_PARENT_PATH,
  RESUME_STORAGE_PARENT_PATH,
  SIZES,
  icons,
} from "@/constants";
import CustomInput from "../inputs/customInput/CustomInput";
import { ProfileEditE, UserFormFieldKeysE } from "@/definitions/enums";
import Button from "../Button";
import FileUpload from "../inputs/fileupload/FileUpload";
import DropdownSearchableInput from "../inputs/dropdown/DropdownSearchableInput";
import { useAuth } from "@/context/AuthContext";
import FirebaseStorageService from "@/firebase/firebaseStorage";
import { usePopup } from "@/context/PopupContext";
import { handleFileUpload } from "@/utils/helpers/generalHelpers";
import { serverTimestamp } from "firebase/firestore";

let inputData = { resume: null };

const EditDataModal = ({
  currentEditingField,
  prevData,
  toogleModal,
}: {
  currentEditingField: ProfileEditE;
  toogleModal: (event: GestureResponderEvent) => void;
  prevData: object;
}) => {
  // class
  const resumeStorageService = new FirebaseStorageService(
    RESUME_STORAGE_PARENT_PATH
  );
  const profileStorageService = new FirebaseStorageService(
    PROFILE_STORAGE_PARENT_PATH
  );

  // states
  const [isLoading, setIsLoading] = useState(false);

  // contexts
  const { updateUserData } = useAuth();
  const { dispatch } = usePopup();

  // functions
  const createResolver = () => {
    return Yup.object().shape({
      ...(currentEditingField === ProfileEditE.PROFILE && {
        [UserFormFieldKeysE.FNKey]: Yup.string()
          .min(2, "Full Name must be valid")
          .required(),
        [UserFormFieldKeysE.HeadingKey]: Yup.string().optional(),
      }),
      ...(currentEditingField === ProfileEditE.DESCRIPTION && {
        [UserFormFieldKeysE.DescriptionKey]: Yup.string()
          .min(20, "Minimum required 20 characters")
          .required(),
      }),
      ...(currentEditingField === ProfileEditE.EDUCATION && {}),
      ...(currentEditingField === ProfileEditE.EMAIL && {
        [UserFormFieldKeysE.EmailKey]: Yup.string()
          .email()
          .required("Email is required"),
      }),
      ...(currentEditingField === ProfileEditE.LOCATION && {
        [UserFormFieldKeysE.LocationKey]: Yup.string().min(3).required(),
      }),
      ...(currentEditingField === ProfileEditE.USERNAME && {
        [UserFormFieldKeysE.UNKey]: Yup.string()
          .min(5, "Username should be minimum of 5 characters.")
          .required(),
      }),
    });
  };

  const createDefaultValues = () => {
    switch (currentEditingField) {
      case ProfileEditE.DESCRIPTION:
        return {
          [UserFormFieldKeysE.DescriptionKey]:
            prevData[UserFormFieldKeysE.DescriptionKey] || "",
        };
      case ProfileEditE.EMAIL:
        return { email: prevData[UserFormFieldKeysE.EmailKey] } || "";
      case ProfileEditE.PROFILE:
        return {
          [UserFormFieldKeysE.FNKey]: prevData[UserFormFieldKeysE.FNKey] || "",
          [UserFormFieldKeysE.HeadingKey]:
            prevData[UserFormFieldKeysE.HeadingKey] || "",
        };
      case ProfileEditE.LOCATION:
        return {
          [UserFormFieldKeysE.LocationKey]:
            prevData[UserFormFieldKeysE.LocationKey]?.address || "",
        };
      case ProfileEditE.USERNAME:
        return {
          [UserFormFieldKeysE.UNKey]: prevData[UserFormFieldKeysE.UNKey] || "",
        };
      case ProfileEditE.EDUCATION:
        return {};
      default:
        return {};
    }
  };
  const handleButtonClick = async () => {
    let doUpdate = false;
    let popupMessage;
    let updateData;

    await handleSubmit(
      (data) => {
        updateData = data;
        doUpdate = true;
      },
      (invalidData) => {
        console.warn("Invalid edit fields -> ", invalidData);
        doUpdate = false;
      }
    )();
    if (currentEditingField === ProfileEditE.RESUME) {
      // TODO handle upload and update
      console.log("inputData -> ", inputData);
      setIsLoading(true);
      const resumeData = inputData["resume"];
      if (resumeData) {
        const resumeStorageService = new FirebaseStorageService(
          RESUME_STORAGE_PARENT_PATH
        );
        const resumeFileName = resumeData["name"];
        const resumeDownloadUrl = await handleFileUpload(
          resumeData.uri,
          resumeStorageService,
          resumeFileName
        );
        updateData = {
          [UserFormFieldKeysE.ResumeKey]: {
            fileName: resumeFileName,
            resumeUrl: resumeDownloadUrl,
            createdAt: serverTimestamp(),
          },
        };
        doUpdate = true;
        delete inputData?.resume;
      }
    } else if (currentEditingField === ProfileEditE.SKILLS) {
      updateData = { [UserFormFieldKeysE.SkillsKey]: inputData["skills"] };
    } else if (currentEditingField === ProfileEditE.LOCATION) {
      updateData = {
        "location.address": updateData[UserFormFieldKeysE.LocationKey],
      };
    }

    if (doUpdate) {
      console.log("updateData ->", updateData);
      setIsLoading(true);
      try {
        const updateResult = await updateUserData(updateData);
        popupMessage = "Data updated successfully";
        toogleModal((prevState) => !prevState);
      } catch (error) {
        console.error("Error updating data -> ", error);
        popupMessage = "Error updating data";
      } finally {
        dispatch({
          payload: { message: popupMessage },
          type: "CREATE_POPUP",
        });
        setIsLoading(false);
      }
    }
  };

  const setData = (data) => {
    inputData = { ...inputData, ...data?.data };
  };

  const renderField = () => {
    switch (currentEditingField) {
      case ProfileEditE.PROFILE:
        return (
          <>
            <CustomInput
              control={control}
              errors={errors}
              label={UserFormFieldKeysE.FNKey}
              labelText="Full name"
              placeholder={""}
            />
            <CustomInput
              control={control}
              errors={errors}
              label={UserFormFieldKeysE.HeadingKey}
              labelText="Heading"
              placeholder={""}
            />
          </>
        );
      case ProfileEditE.DESCRIPTION:
        return (
          <CustomInput
            control={control}
            errors={errors}
            label={UserFormFieldKeysE.DescriptionKey}
            labelText="Description"
            placeholder={""}
          />
        );
      case ProfileEditE.USERNAME:
        return (
          <CustomInput
            control={control}
            errors={errors}
            label={UserFormFieldKeysE.UNKey}
            labelText="Username"
            placeholder={""}
          />
        );
      case ProfileEditE.EDUCATION:
        // TODO implement education add
        return;
      case ProfileEditE.EMAIL:
        return (
          <CustomInput
            control={control}
            errors={errors}
            label={UserFormFieldKeysE.EmailKey}
            labelText="Email"
            placeholder={""}
          />
        );
      case ProfileEditE.LOCATION:
        return (
          <CustomInput
            control={control}
            errors={errors}
            label={UserFormFieldKeysE.LocationKey}
            labelText="Location"
            placeholder={""}
          />
        );
      case ProfileEditE.RESUME:
        return (
          <>
            <FileUpload setPickedFile={setData} />
            <Text style={{ fontSize: SIZES.small }}>
              Note:{" "}
              <Text style={{ fontSize: SIZES.small, fontStyle: "italic" }}>
                Previous file will be replaced by new one if provided.
              </Text>
            </Text>
          </>
        );
      case ProfileEditE.SKILLS:
        const prevSkills = prevData[UserFormFieldKeysE.SkillsKey];
        return (
          <DropdownSearchableInput setData={setData} prevData={prevSkills} />
        );
      default:
        break;
    }
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(createResolver()),
    defaultValues: { ...createDefaultValues() },
  });

  return (
    <View style={{ width: "80%" }}>
      <HeadingCard
        cardHeading="Edit Data"
        handleRightButtonClick={toogleModal}
        leftIconData={icons.editIcon}
        rightIconData={icons.xOutlined}
      >
        <View style={{ gap: 10 }}>
          {renderField()}
          <Button
            handleClick={handleButtonClick}
            isLoading={isLoading}
            label="Update"
          />
        </View>
      </HeadingCard>
    </View>
  );
};

export default EditDataModal;
