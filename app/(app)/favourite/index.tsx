import { Drawer } from "expo-router/drawer";
import { SafeAreaView } from "react-native";

const Favourite = () => {
  return (
    <SafeAreaView>
      <Drawer.Screen
        name="/(app)/favourite"
        options={{
          drawerLabel: "Favourite",
          title: "Favourite",
        }}
      />
    </SafeAreaView>
  );
};

export default Favourite;
