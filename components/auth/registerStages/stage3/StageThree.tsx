import CustomInput from "@/components/common/inputs/customInput/CustomInput";
import React from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";

import styles from "./stagethree.style";
import { yupResolver } from "@hookform/resolvers/yup";
import { stageThreeSchema } from "@/utils/validations/formSchema";
import StageWrapper from "../StageWrapper";

const StageThree = ({ setData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(stageThreeSchema),
  });

  const handleClick = () => {
    const validationResult = handleSubmit((data) => {});
  };
  return (
    <StageWrapper handleClick={handleClick}>
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

export default StageThree;
