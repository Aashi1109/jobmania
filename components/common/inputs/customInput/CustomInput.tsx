import { Text, TextInput, View } from "react-native";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import styles from "./custominput.styles";

interface CustomInputProps {
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  placeholder: string;
}
const CustomInput = ({
  label,
  register,
  placeholder,
  errors,
}: CustomInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        {...register(label)}
      />
      {errors[label]?.message && (
        <Text style={styles.error}>{errors[label]?.message.toString()}</Text>
      )}
    </View>
  );
};

export default CustomInput;
