import { View } from "react-native";

import Button from "@/components/common/Button";
import DropdownSearchableInput from "@/components/common/inputs/dropdown/DropdownSearchableInput";
import FileUpload from "@/components/common/inputs/fileupload/FileUpload";
import { COLORS } from "@/constants";
import { AuthScreenStagesE } from "@/definitions/enums";

const StageTwo = ({ setData }: { setData: Function }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ gap: 14 }}>
        <DropdownSearchableInput />
        <FileUpload setPickedFile={setData} />
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

export default StageTwo;
