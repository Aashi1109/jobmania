import { Stack, useRouter } from "expo-router";

import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

import { COLORS, icons, images, SIZES } from "../constants";
import Welcome from "../components/home/welcome/Welcome";
import Popularjobs from "../components/home/popular/Popularjobs";
import Nearbyjobs from "../components/home/nearby/Nearbyjobs";
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn";
// @ts-ignore
import { CustomModal, UserProfileModalData } from "@/components";

const Home = ({ navigation }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleDrawer = () => {
    navigation?.toggleDrawer();
  };

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
              handlePress={toggleDrawer}
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
