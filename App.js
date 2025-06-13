import "react-native-screens/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import BibleScreen from "./screens/BibleScreen";
import ImagesScreen from "./screens/ImagesScreen";
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Bible") {
              iconName = "bible";
            } else if (route.name === "Images") {
              iconName = "image";
            }
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#e50000",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Bible" component={BibleScreen} />
        <Tab.Screen name="Images" component={ImagesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
