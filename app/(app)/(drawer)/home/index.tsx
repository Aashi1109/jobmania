import { router } from "expo-router";
import { useState } from "react";

import { VerticalJobList, Popularjobs, Welcome } from "@/components";

import StackHOC from "@/components/hoc/StackHOC";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <StackHOC>
      <Welcome
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleClick={() => {
          if (searchTerm) router.push(`/(app)/search/${searchTerm}`);
        }}
      />
      <Popularjobs />
      <VerticalJobList
        heading="Nearby Jobs"
        rightButtonProperties={{
          isVisible: true,
          routePath: "/search/Nearby Jobs",
          text: "Show all",
        }}
      />
    </StackHOC>
  );
};

export default Home;
