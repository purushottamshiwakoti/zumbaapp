import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import VehicleScreen from "./src/screens/VehicleScreen";

import { Ionicons } from "@expo/vector-icons";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import useAuthStore from "./src/hooks/useAuth,";
import AddVehicle from "./src/screens/AddVehicle";
import DetailVehicleList from "./src/screens/DetailVehicleList";
import SelectScreen from "./src/screens/SelectScreen";
import AdminHome from "./src/screens/AdminHome";
import ProgressReport from "./src/screens/ProgressReport";
import DietPlans from "./src/screens/DietPlans";
import Trainee from "./src/screens/Trainee";
import Members from "./src/screens/Members";
import AddTrainee from "./src/screens/AddTrainee";
import AddDietPlans from "./src/screens/AddDietPlans";
import ViewTrainee from "./src/screens/ViewTrainee";
import ViewDiet from "./src/screens/VIewDiet";
import ViewProgress from "./src/screens/ViewProgress";
import AddProgress from "./src/screens/AddProgress";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const { id, role } = useAuthStore();
  console.log(role);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {id ? (
          <Stack.Group>
            {role != "ADMIN" ? (
              <Stack.Screen name="Home" component={TabNav} />
            ) : (
              <Stack.Screen name="Admin" component={AdminHome} />
            )}
            <Stack.Screen name="AdminReport" component={ProgressReport} />
            <Stack.Screen name="AdminDiet" component={DietPlans} />
            <Stack.Screen name="AdminTrainee" component={Trainee} />
            <Stack.Screen name="Members" component={Members} />
            <Stack.Screen name="AddTrainee" component={AddTrainee} />
            <Stack.Screen name="AddDiet" component={AddDietPlans} />
            <Stack.Screen name="ViewTrainee" component={ViewTrainee} />
            <Stack.Screen name="ViewDiet" component={ViewDiet} />
            <Stack.Screen name="ViewProgress" component={ViewProgress} />
            <Stack.Screen name="AddProgress" component={AddProgress} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Select" component={SelectScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Vehicle") {
            iconName = focused ? "car" : "car-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home">
        {(props) => <HomeScreen {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
