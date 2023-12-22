import AuthScreen from "@/components/auth/AuthScreen";
import CustomDrawerContent from "@/components/drawer/CustomDrawerContent";
import { COLORS, SIZES, icons } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { Drawer } from "expo-router/drawer";
import { Image } from "react-native";
import { ActivityIndicator, View } from "react-native";

const _layout = () => {
  const { user, loading, signOut } = useAuth();

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

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: COLORS.gray,
        drawerLabelStyle: {
          fontSize: SIZES.medium,
          color: COLORS.primary,
          padding: 0,
          marginLeft: -20,
          marginTop: 5,
        },
      }}
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          signOut={signOut}
          userName={user.fullName}
        />
      )}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: "Home",
          drawerLabel: "Home",

          drawerIcon: ({ size, color }) => (
            <Image
              source={icons.home}
              resizeMode="cover"
              style={{
                width: size * 0.8,
                height: size * 0.8,
                tintColor: COLORS.primary,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          drawerLabel: "Profile",
          drawerIcon: ({ size, color }) => (
            <Image
              source={icons.profileIcon}
              resizeMode="cover"
              style={{
                width: size * 0.8,
                height: size * 0.8,
                tintColor: COLORS.primary,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="saved"
        options={{
          title: "Saved Job",
          drawerLabel: "Saved Job",
          drawerIcon: ({ size, color }) => (
            <Image
              source={icons.saved}
              resizeMode="cover"
              style={{
                width: size * 0.8,
                height: size * 0.8,
                tintColor: COLORS.primary,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="setting"
        options={{
          title: "Setting",
          drawerLabel: "Setting",
          drawerIcon: ({ size, color }) => (
            <Image
              source={icons.setting}
              resizeMode="cover"
              style={{
                width: size * 0.8,
                height: size * 0.8,
                tintColor: COLORS.primary,
              }}
            />
          ),
        }}
      />
    </Drawer>
  );
};

export default _layout;
