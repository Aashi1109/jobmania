import { Text, View } from "react-native";
import { TextInput } from "react-native";

import styles from "./stagethree.style";
import Button from "@/components/common/Button";
import { COLORS } from "@/constants";
import { AuthScreenStagesE } from "@/definitions/enums";

const StageThree = ({ setData }: { setData: Function }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.label}>Portfolio Link</Text>
          <TextInput style={styles.input} placeholder="https://..." />
        </View>
        <View>
          <Text style={styles.label}>Other Link</Text>
          <TextInput style={styles.input} placeholder="LinkedIn, Github ..." />
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Button
            label="Skip"
            backgroundColor={COLORS.gray}
            handleClick={() =>
              setData({ stage: AuthScreenStagesE.REGISTER_STAGE_3 })
            }
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            label="Next"
            handleClick={() =>
              setData({ stage: AuthScreenStagesE.REGISTER_STAGE_3 })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default StageThree;
