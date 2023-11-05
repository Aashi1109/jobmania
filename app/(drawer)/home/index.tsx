import { Stack, useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native";

import {
  CustomModal,
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  UserProfileModalData,
  Welcome,
} from "@/components";
import { COLORS, SIZES, icons, images } from "@/constants";
import { DrawerActions } from "@react-navigation/native";

const Home = () => {
  const router = useRouter();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleModal = () => {
    setIsModalVisible((prevState) => !prevState);
  };
  const navigation = useNavigation();

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
              iconUrl={images.profile}
              dimension="100%"
              handlePress={toggleModal}
            />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <CustomModal modalVisible={isModalVisible} toggleModal={toggleModal}>
            <UserProfileModalData
              iconImage={icons.editIcon}
              bio="Lorem ipsum dolor"
              image={images.profile}
              name={"Park Dae Suk"}
              subInfos={[
                {
                  infoText:
                    "laboriosam voluptas iusto laudantium consectetur eaque odio rerum! Magni quibusdam accusamus.",
                  infoTitle: "About",
                },
              ]}
            />
          </CustomModal>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) router.push(`/search/${searchTerm}`);
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
