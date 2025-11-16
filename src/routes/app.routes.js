import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import Home from "../pages/Home";
import Calendar from "../pages/Calendar";
import Medicines from "../pages/Medicines";
import Health from "../pages/Health";

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          )
        }}  
      />

      <Tab.Screen 
        name="Agenda" 
        component={Calendar}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="calendar-alt" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen 
        name="Medicamentos" 
        component={Medicines}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="pills" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen 
        name="Saúde" 
        component={Health}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="heartbeat" size={size} color={color} />
          )
        }}
      />

    </Tab.Navigator>
  );
}
