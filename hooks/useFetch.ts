import { fetchDataJSearch } from "./../utils/helpers/generalHelpers";
import { useEffect, useState } from "react";

// import { RAPID_API_KEY } from "@env";

// const rapidApiKey = RAPID_API_KEY;
const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchDataJSearch(endpoint, query);
      setData(data);
    } catch (e) {
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { isLoading, error, data, refetch };
};

export default useFetch;
