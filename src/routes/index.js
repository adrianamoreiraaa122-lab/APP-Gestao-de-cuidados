import { View, ActivityIndicator } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import AuthRoutes from "./auth.routes";
import AppTabs from "./app.routes";

export default function Routes(){
    const { signed, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
                <ActivityIndicator size={40} color="#000" />
            </View>
        );
    }

    return signed ? <AppTabs /> : <AuthRoutes />;
}
