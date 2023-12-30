import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import app from "./firebaseConfig";

const authRef = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default authRef;
