import { Text, View } from "react-native";
import { Drawer } from "../navigators";
import Home from "@/app";
import AppliedJobs from "@/app/(drawer)/applied";
import Favourite from "@/app/(drawer)/favourite";
import SavedJobs from "@/app/(drawer)/saved";
import Setting from "@/app/(drawer)/setting";

const SideDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name={"index"}
        options={{ drawerLabel: "Home" }}
        component={Home}
      />
      <Drawer.Screen
        name={"jobs/applied"}
        options={{ drawerLabel: "Applied Jobs" }}
        component={AppliedJobs}
      />
      <Drawer.Screen
        name={"jobs/favourite"}
        options={{ drawerLabel: "Favourite Jobs" }}
        component={Favourite}
      />
      <Drawer.Screen
        name={"jobs/saved"}
        options={{ drawerLabel: "Saved Jobs" }}
        component={SavedJobs}
      />
      <Drawer.Screen
        name={"setting"}
        options={{ drawerLabel: "Setting" }}
        component={Setting}
      />
    </Drawer.Navigator>
  );
};

export default SideDrawer;
