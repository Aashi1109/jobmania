import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import styles from "./nearbyjobs.style";
import useFetch from "../../../hooks/useFetch";
import { COLORS } from "../../../constants";
import { useRouter } from "expo-router";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

const Nearbyjobs = () => {
  const router = useRouter();
  const { isLoading, error, data } = useFetch("search", {
    query: "nearby jobs, maharashtra",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity onPress={() => router.push(`/search/Nearby Jobs`)}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator
            size={"large"}
            colors={COLORS.primary}
          ></ActivityIndicator>
        ) : error ? (
          <Text>Something went wrong.</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
