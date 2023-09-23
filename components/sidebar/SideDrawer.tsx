import { createDrawerNavigator } from "@react-navigation/drawer";
import AppliedJobs from "@/components/appliedJobs/AppliedJobs";
import FavouriteJobs from "@/components/favouriteJobs/FavouriteJobs";
import { NavigationContainer } from "@react-navigation/native";
import CustomSidebarMenu from "@/components/sidebar/CustomSidebarMenu";
import Home from "@/app";

const SideDrawer = () => {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
      >
        <Drawer.Screen
          name={"Home"}
          component={Home}
          options={{ drawerLabel: "Home" }}
        />
        <Drawer.Screen
          name={"AppliedJobs"}
          component={AppliedJobs}
          options={{ drawerLabel: "Applied Jobs" }}
        />
        <Drawer.Screen
          name={"FavouriteJobs"}
          component={FavouriteJobs}
          options={{ drawerLabel: "Applied Jobs" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default SideDrawer;
