import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { AuthProvider } from "@/context/AuthContext";
import PopupProvider from "@/context/PopupContext";
import Popup from "@/components/popup/Popup";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "home",
};

const Layout = () => {
  const [fontsLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PopupProvider>
        <AuthProvider>
          <Popup />
          <Slot />
        </AuthProvider>
      </PopupProvider>
    </SafeAreaProvider>
  );
};

export default Layout;
