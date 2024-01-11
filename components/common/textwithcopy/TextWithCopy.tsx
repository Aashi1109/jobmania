import { icons } from "@/constants";
import { usePopup } from "@/context/PopupContext";
import { copyToClipboard } from "@/utils/helpers/generalHelpers";
import { useState } from "react";
import { Image } from "react-native";
import { Text } from "react-native";
import { Pressable, View } from "react-native";
import styles from "./textwithcopy.style";

const TextWithCopy = ({ text }: { text: string }) => {
  const [isTextCopied, setIsTextCopied] = useState(false);
  const { dispatch: dispatchPopup } = usePopup();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Pressable
        onPress={async () => {
          await copyToClipboard(text);
          setIsTextCopied(true);
          dispatchPopup({
            type: "CREATE_POPUP",
            payload: { message: "Copied text" },
          });
          setTimeout(() => {
            setIsTextCopied((prevState) => !prevState);
          }, 3000);
        }}
      >
        {/* <View style={styles.imageContainer}> */}
        <Image
          source={isTextCopied ? icons.checkOutlined : icons.copyOutlined}
          resizeMode="contain"
          style={styles.image}
        />
        {/* </View> */}
      </Pressable>
    </View>
  );
};

export default TextWithCopy;
