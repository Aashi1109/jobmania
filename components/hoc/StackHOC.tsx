import { useAuth } from "@/context/AuthContext";
import { Stack, useRouter } from "expo-router";
import { useNavigation } from "expo-router/src/useNavigation";
import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import ScreenHeaderBtn from "../common/header/ScreenHeaderBtn";
import { COLORS, SIZES, icons, images } from "@/constants";
import { DrawerActions } from "@react-navigation/native";
import CustomModal from "../common/modal/CustomModal";
import UserProfileModalData from "../user/UserProfileModel";

const StackHOC = ({ children }) => {
  const navigation = useNavigation();

  const { user } = useAuth();
  const userProfileImage = user?.profileImage?.profileUrl;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible((prevState) => !prevState);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimension="60%"
              handlePress={() =>
                navigation.dispatch(DrawerActions.toggleDrawer())
              }
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={userProfileImage ? userProfileImage : images.profile}
              dimension="100%"
              handlePress={toggleModal}
              isUri={!!userProfileImage}
            />
          ),

          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <CustomModal modalVisible={isModalVisible} toggleModal={toggleModal}>
            <UserProfileModalData userData={user} />
          </CustomModal>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StackHOC;
