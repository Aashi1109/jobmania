import { Text, TextInput, View } from "react-native";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";

import styles from "./custominput.styles";
import { COLORS } from "@/constants";

interface CustomInputProps {
  label: string;
  control: Control<FieldValues>;
  errors: FieldErrors<FieldValues>;
  placeholder: string;
  labelText?: string;
  hideText?: boolean;
  editable?: boolean;
}
const CustomInput = ({
  label,
  labelText,
  control,
  hideText = false,
  placeholder,
  errors,
  editable = true,
}: CustomInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {labelText ? labelText : label.toLowerCase()}
      </Text>
      <Controller
        control={control}
        name={label}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            editable={editable}
            style={styles.input}
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            secureTextEntry={hideText}
            placeholderTextColor={COLORS.inputPlaceHolderColor}
          />
        )}
      />
      {errors[label] && (
        <Text style={styles.error}>{errors[label]?.message.toString()}</Text>
      )}
    </View>
  );
};

export default CustomInput;
