import CustomInput from "@/components/common/inputs/customInput/CustomInput";

import { View } from "react-native";
import { useForm } from "react-hook-form";

import styles from "./stagefour.style";
import { yupResolver } from "@hookform/resolvers/yup";
import { stageFourSchema } from "@/utils/validations/formSchema";
import StageWrapper from "../StageWrapper";
import { AuthScreenStagesE } from "@/definitions/enums";

const StageFour = ({ setData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(stageFourSchema),
  });

  const handleClick = async () => {
    await handleSubmit((data) => {
      setData({ data: data });
    })();
    setData({ stage: AuthScreenStagesE.REGISTER_COMPLETE });
  };
  return (
    <StageWrapper handleNextClick={handleClick} handleSkipClick={handleClick}>
      <View style={styles.inputContainer}>
        <CustomInput
          label="portfolio"
          control={control}
          errors={errors}
          placeholder="Enter website link"
        />
        <CustomInput
          label="other"
          control={control}
          errors={errors}
          placeholder="Enter link"
        />
      </View>
    </StageWrapper>
  );
};

export default StageFour;
