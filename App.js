import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Routes from './src/routes/index';

import AuthProvider from "./src/contexts/AuthContext";

export default function App(){
    return(
        <AuthProvider>
            <NavigationContainer>
                <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
                <Routes />
            </NavigationContainer>
        </AuthProvider>
    )
}
