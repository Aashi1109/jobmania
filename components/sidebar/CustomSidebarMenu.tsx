import { Image, SafeAreaView, Text, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { DUMMY_IMAGE_URL } from "@/constants";

const CustomSidebarMenu = (props: any) => {
  return (
    <SafeAreaView>
      <Image source={{ uri: DUMMY_IMAGE_URL }} />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomSidebarMenu;
