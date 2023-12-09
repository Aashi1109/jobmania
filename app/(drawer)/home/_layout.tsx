import AuthHelpers from "@/firebase/firebaseAuth";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";

const _layout = () => {
  // useEffect(() => {
  //   const checkUserAuth = async () => {
  //     const authHelpers = new AuthHelpers();

  //     const isAuthenticated = await authHelpers.authObserver();
  //     console.log("isAuthenticated -> ", isAuthenticated);

  //     if (!isAuthenticated) {
  //       <Redirect href={"/(auth)/auth"} />;
  //     }
  //   };
  //   checkUserAuth();
  // }, []);
  return <Stack />;
};

export default _layout;
