import React from "react";
import { ActivityIndicator, Text, Pressable, View } from "react-native";

import styles from "./verticaljoblist.style";
import useFetch from "../../../hooks/useFetch";
import { COLORS } from "../../../constants";
import { useRouter } from "expo-router";
import VerticalJobCard from "../../common/cards/nearby/VerticalJobCard";
import { useAuth } from "@/context/AuthContext";

interface VerticalJobListProps {
  heading: string;
  rightButtonProperties: {
    isVisible: boolean;
    routePath: string;
    text: string;
  };
  showLikeButton?: boolean;
}
const VerticalJobList = ({
  heading,
  showLikeButton = false,
  rightButtonProperties,
}: VerticalJobListProps) => {
  const router = useRouter();
  const { user } = useAuth();

  const userAddress = user?.location?.address;
  const { isLoading, error, data } = useFetch("search", {
    query: `nearby jobs in ${userAddress ? userAddress : "India"}`,
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{heading}</Text>
        {rightButtonProperties.isVisible && (
          <Pressable
            onPress={() => router.push(rightButtonProperties.routePath)}
          >
            <Text style={styles.headerBtn}>Show all</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator
            size={"large"}
            color={COLORS.primary}
          ></ActivityIndicator>
        ) : error ? (
          <Text>Something went wrong.</Text>
        ) : (
          data?.map((job) => (
            <VerticalJobCard
              showLikeButton={showLikeButton}
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

export default VerticalJobList;
