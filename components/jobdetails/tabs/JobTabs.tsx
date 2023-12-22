import React from "react";
import { FlatList, Text, Pressable, View } from "react-native";
import styles from "./tabs.style";
import { SIZES } from "../../../constants";

const TabButton = ({ name, activeTab, onHandleSearchType }) => {
  return (
    <Pressable style={styles.btn(name, activeTab)} onPress={onHandleSearchType}>
      <Text style={styles.btnText(name, activeTab)}>{name}</Text>
    </Pressable>
  );
};
const JobTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
      />
    </View>
  );
};

export default JobTabs;
