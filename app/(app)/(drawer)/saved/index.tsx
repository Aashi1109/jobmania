import VerticalJobCard from "@/components/common/cards/nearby/VerticalJobCard";
import StackHOC from "@/components/hoc/StackHOC";
import { COLORS, FONT, SIZES } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { fetchDataJSearch } from "@/utils/helpers/generalHelpers";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const SavedJobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const { user, loading: isUserLoading } = useAuth();

  useEffect(() => {
    const fetchSavedJobsData = async () => {
      if (user) {
        const userSavedJobs = user.savedJobs;

        try {
          const jobDetailsArray = [];
          for (const savedJob of userSavedJobs) {
            const jobDetails = await fetchDataJSearch("job-details", {
              job_id: savedJob.jobId,
            });
            if (jobDetails && jobDetails?.length) {
              jobDetailsArray.push(jobDetails[0]);
            }
          }

          setData(jobDetailsArray);
        } catch (e) {
          setError("Error fething some jobs");
          alert(e);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSavedJobsData();
  }, [user]);

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
          {data.length ? (
            data?.map((job) => (
              <VerticalJobCard
                showLikeButton={true}
                job={job}
                key={`nearby-job-${job?.job_id}`}
                handleNavigate={() =>
                  router.push(`/job-details/${job?.job_id}`)
                }
              />
            ))
          ) : (
            <Text>No saved jobs found</Text>
          )}
          {isLoading || isUserLoading ? (
            <ActivityIndicator
              size={"large"}
              color={COLORS.primary}
            ></ActivityIndicator>
          ) : (
            error && <Text>{error}</Text>
          )}
        </View>
      </View>
    </StackHOC>
  );
};

export default SavedJobs;
