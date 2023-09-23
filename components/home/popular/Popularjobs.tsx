import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import useFetch from "../../../hooks/useFetch";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import { useRouter } from "expo-router";

const Popularjobs = () => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState();
  const { isLoading, error, data } = useFetch("search", {
    query: "popular jobs, maharashtra",
    num_pages: 1,
  });

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity onPress={() => router.push(`/search/Popular Jobs`)}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size={"large"} colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong.</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                handleCardPress={handleCardPress}
                selectedJob={selectedJob}
              />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
