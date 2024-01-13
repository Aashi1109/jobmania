import { View } from "react-native";
import HeadingCard from "../cards/HeadingCard";
import { icons } from "@/constants";
import CustomInput from "../inputs/customInput/CustomInput";
import { ProfileEditE, UserFormFieldKeysE } from "@/definitions/enums";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { useState } from "react";

const EditDataModal = ({
  currentEditingField,
  toogleModal,
}: {
  currentEditingField: ProfileEditE;
  toogleModal: Function;
}) => {
  // states
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    formState: { errors },
  } = useForm();
  let currentLabel = "";
  let currentLabelPlaceholder = "";

  // functions
  const handleButtonClick = async () => {};

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

      default:
        break;
    }
  };

  return (
    <HeadingCard
      cardHeading="Edit Data"
      handleRightButtonClick={null}
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
  );
};

export default EditDataModal;
