import { AuthScreenStagesE } from "@/definitions/enums";
import {
  stageFourSchema,
  stageTwoSchema,
} from "@/utils/validations/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import StageWrapper from "../StageWrapper";
import styles from "./stagetwo.style";
import CustomInput from "@/components/common/inputs/customInput/CustomInput";

const StageTwo = ({
  setData,
  isLoading,
}: {
  setData: Function;
  isLoading: boolean;
}) => {
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(stageTwoSchema),
    defaultValues: {
      fullName: "",
      about: "",
      profileHeading: "",
      location: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
    setData({ stage: AuthScreenStagesE.REGISTER_STAGE_3, data });
  };

  return (
    <StageWrapper
      isLoading={isLoading}
      handleNextClick={handleSubmit(onSubmit)}
      handleSkipClick={null}
    >
      <View style={styles.inputContainer}>
        <CustomInput
          label="fullName"
          labelText="Full Name"
          control={control}
          errors={errors}
          placeholder="Jane Doe"
        />
        <CustomInput
          label="profileHeading"
          labelText="Profile Heading"
          control={control}
          errors={errors}
          placeholder="SDE"
        />
        <CustomInput
          label="about"
          control={control}
          errors={errors}
          placeholder="Short description about yourself"
        />
        <CustomInput
          label="location"
          control={control}
          errors={errors}
          placeholder="Current location"
        />
      </View>
    </StageWrapper>
  );
};

export default StageTwo;
