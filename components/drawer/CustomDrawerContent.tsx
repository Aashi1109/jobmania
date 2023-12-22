import { Image, Pressable, Text, View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { COLORS, SIZES, icons } from "@/constants";
import HeadText from "../common/headtext/HeadText";
import WelcomeContent from "../WelcomeContent";
import VerticalDivider from "../common/VerticalDivider";

const CustomDrawerContent = (props: any) => {
  const { signOut, userName } = props;
  return (
    <View
      style={{ flex: 1, paddingVertical: 45, paddingHorizontal: 32, gap: 20 }}
    >
      <HeadText fontSize={34} color={COLORS.tertiary} />
      <View style={{ gap: 10 }}>
        <WelcomeContent showDescriptionText={false} />
        <Text style={{ fontSize: SIZES.medium, fontWeight: "400" }}>
          {userName}
        </Text>
      </View>
      <VerticalDivider width={"40%"}></VerticalDivider>

      <DrawerContentScrollView {...props} style={{ marginHorizontal: -20 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Pressable onPress={() => signOut()}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            justifyContent: "flex-start",
            alignContent: "center",
          }}
        >
          <Image
            source={icons.moveUp}
            resizeMode="cover"
            style={{
              width: 19,
              height: 19,
              tintColor: COLORS.primary,
            }}
          />
          <Text style={{ fontSize: SIZES.medium, color: COLORS.primary }}>
            Logout
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CustomDrawerContent;
