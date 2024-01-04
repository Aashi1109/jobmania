import VerticalJobCard from "@/components/common/cards/nearby/VerticalJobCard";
import StackHOC from "@/components/hoc/StackHOC";
import { COLORS, FONT, SIZES } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { fetchDataJSearch } from "@/utils/helpers/generalHelpers";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const SavedJobs = () => {
  const { user, loading: isUserLoading } = useAuth();
  const userSavedJobs = user.savedJobs;

  // useEffect(() => {
  //   const fetchSavedJobsData = async () => {
  //     if (user) {
  //       const userSavedJobs = user.savedJobs;

  //       try {
  //         const jobDetailsArray = [];
  //         for (const savedJob of userSavedJobs) {
  //           const jobDetails = await fetchDataJSearch("job-details", {
  //             job_id: savedJob.jobId,
  //           });
  //           if (jobDetails && jobDetails?.length) {
  //             jobDetailsArray.push(jobDetails[0]);
  //           }
  //         }

  //         setData(jobDetailsArray);
  //       } catch (e) {
  //         setError("Error fething some jobs");
  //         alert(e);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //   };

  //   fetchSavedJobsData();
  // }, [user]);

  return (
    <StackHOC>
      <View>
        <Text
          style={{
            fontSize: SIZES.large,
            fontFamily: FONT.medium,
            color: COLORS.primary,
          }}
        >
          {"Your saved jobs"}
        </Text>
        <View
          style={{
            marginTop: SIZES.medium,
            gap: SIZES.small,
          }}
        >
          {isUserLoading ? (
            <ActivityIndicator
              size={"large"}
              color={COLORS.primary}
            ></ActivityIndicator>
          ) : userSavedJobs.length ? (
            userSavedJobs?.map((job) => (
              <VerticalJobCard
                showLikeButton={true}
                job={job}
                key={`nearby-job-${job?.jobId}`}
                handleNavigate={() => router.push(`/job-details/${job?.jobId}`)}
              />
            ))
          ) : (
            <Text>No saved jobs found</Text>
          )}
        </View>
      </View>
    </StackHOC>
  );
};

export default SavedJobs;
