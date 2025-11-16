import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from '@expo/vector-icons';

import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Reset from '../pages/Reset';

import Home from '../pages/Home';
import Calendar from '../pages/Calendar';
import Medicines from '../pages/Medicines';
import Health from '../pages/Health';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function AppTabs() {
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

function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Reset" component={Reset} />
      <Stack.Screen name="AppTabs" component={AppTabs} />
    </Stack.Navigator>
  );
}

export default AuthRoutes;
