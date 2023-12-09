import AuthHelpers from "@/firebase/firebaseAuth";
import { Redirect, router, useRouter } from "expo-router";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const checkUserAuth = async () => {
      const authHelpers = new AuthHelpers();

      const isAuthenticated = await authHelpers.authObserver();

      console.log("isAuthenticated -> ", isAuthenticated);
      if (!isAuthenticated) {
        // return <Redirect href={"/(auth)/auth"} />;
        router.replace("/(auth)/auth");
      }
    };
    checkUserAuth();
  }, []);
  return <Redirect href={"/(drawer)/home"} />;
};

export default Home;
