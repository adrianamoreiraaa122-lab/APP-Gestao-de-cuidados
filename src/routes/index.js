import { View } from "react-native";
import AuthRoutes from "./auth.routes";

function Routes(){
    const signed = false;

    return(
        signed ? <View></View> : <AuthRoutes/>
    )
}

export default Routes;