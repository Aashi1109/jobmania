import { Text, TextInput, View } from "react-native";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";

import styles from "./custominput.styles";

interface CustomInputProps {
  label: string;
  control: Control<FieldValues>;
  errors: FieldErrors<FieldValues>;
  placeholder: string;
  labelText?: string;
  hideText?: boolean;
}
const CustomInput = ({
  label,
  labelText,
  control,
  hideText = false,
  placeholder,
  errors,
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
            style={styles.input}
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            secureTextEntry={hideText}
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
