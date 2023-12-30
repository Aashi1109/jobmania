import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { COLORS, icons, JOB_DETAILS_TABS, SIZES } from "../../../constants";
import useFetch from "../../../hooks/useFetch";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../../components";
import { useCallback, useState } from "react";

const JobDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(JOB_DETAILS_TABS[0]);
  const jobId = params.id;

  const { isLoading, error, data, refetch } = useFetch("job-details", {
    job_id: jobId,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case JOB_DETAILS_TABS[1]:
        return (
          <Specifics
            title={"Qualifications"}
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
      case JOB_DETAILS_TABS[0]:
        return (
          <JobAbout info={data[0]?.job_description ?? "No data provided"} />
        );
      case JOB_DETAILS_TABS[2]:
        return (
          <Specifics
            title={"Responsibilities"}
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
      default:
        return null;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension={"60%"}
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension={"60%"}
              handlePress={undefined}
            />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs
                tabs={JOB_DETAILS_TABS}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter
          jobId={jobId}
          url={
            data[0]?.job_google_link ??
            "https://careers.google.com/jobs/results/"
          }
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
