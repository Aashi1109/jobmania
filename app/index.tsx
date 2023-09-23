import { Stack, useRouter } from "expo-router";

import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

import { COLORS, icons, SIZES } from "../constants";
import Welcome from "../components/home/welcome/Welcome";
import Popularjobs from "../components/home/popular/Popularjobs";
import Nearbyjobs from "../components/home/nearby/Nearbyjobs";
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn";
// @ts-ignore
import profile from "../assets/images/kemal.jpg";

const Home = ({ navigation }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const toggleDrawer = () => {
    navigation?.toggleDrawer();
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
              iconUrl={profile}
              dimension="100%"
              handlePress={null}
            />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
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
