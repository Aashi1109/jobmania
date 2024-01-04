import AuthScreen from "@/components/auth/AuthScreen";
import Popup from "@/components/popup/Popup";
import { COLORS } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { usePopup } from "@/context/PopupContext";
import { Redirect } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

const auth = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={COLORS.primary} />
      </View>
    );
  }

  if (user) {
    return <Redirect href={"/(app)/(drawer)/home"} />;
  }
  return <AuthScreen />;
};

export default auth;
