import React from "react";
import { 
    Background, 
    Container, 
    Logo, 
    ResetText, 
    AreaInput,
    Input,
    AreaButtons, 
    Access, 
    AccountLogin, 
    AccessText, 
    AccountLoginText,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function Reset() {

    const navigation = useNavigation();

    return (
        <Background>
            <Container>
                <Logo source={require('../../assets/logo_healthsenior.png')} />

                <ResetText>
                    Esqueceu sua senha?
                </ResetText>

                <AreaInput>
                    <Input
                        placeholder="Digite seu e-mail"
                        placeholderTextColor="#6C63FF"
                    />                
                </AreaInput>

                <AreaButtons>
                    <Access activeOpacity={0.85} onPress={() => navigation.navigate('SignI')}>
                        <AccessText>Redefinir senha</AccessText>
                    </Access>

                    <AccountLogin activeOpacity={0.7} onPress={() => navigation.navigate('SignIn')}>
                        <AccountLoginText>Fazer Login.</AccountLoginText>
                    </AccountLogin>
                </AreaButtons>
            </Container>
        </Background>
    );
}
