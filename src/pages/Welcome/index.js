import React from "react";
import { 
    Background, 
    Container, 
    Logo, 
    LogoName, 
    AreaButtons, 
    Access, 
    CreateAccount, 
    AccessText, 
    CreateAccountText 
} from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function Welcome() {

    const navigation = useNavigation();

    return (
        <Background>
            <Container>
                <Logo source={require('../../assets/logo_healthsenior.png')} />

                <LogoName>
                    Health Senior
                </LogoName>

                <AreaButtons>
                    <Access activeOpacity={0.85} onPress={() => navigation.navigate('SignIn')}>
                        <AccessText>Acessar</AccessText>
                    </Access>

                    <CreateAccount activeOpacity={0.7} onPress={() => navigation.navigate('SignUp')}>
                        <CreateAccountText>Crie uma conta agora.</CreateAccountText>
                    </CreateAccount>
                </AreaButtons>
            </Container>
        </Background>
    );
}
