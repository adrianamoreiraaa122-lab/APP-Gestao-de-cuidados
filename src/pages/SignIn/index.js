import React from "react";
import { 
    Background, 
    Container, 
    Logo, 
    LogoName, 
    AreaInput,
    Input,
    AreaButtons, 
    Access, 
    CreateAccount, 
    AccessText, 
    CreateAccountText,
    ResetText, 
    AreaReset 
} from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {

    const navigation = useNavigation();

    return (
        <Background>
            <Container>
                <Logo source={require('../../assets/logo_healthsenior.png')} />

                <LogoName>
                    Health Senior
                </LogoName>

                <AreaInput>
                    <Input
                        placeholder="Digite seu e-mail"
                        placeholderTextColor="#6C63FF"
                    />                
                </AreaInput>
                <AreaInput>
                    <Input
                        placeholder="Digite sua senha"
                        placeholderTextColor="#6C63FF"
                    />                
                </AreaInput>

                <AreaButtons>
                    <Access activeOpacity={0.85} onPress={() => navigation.navigate('AppTabs')}>
                        <AccessText>Acessar</AccessText>
                    </Access>
                </AreaButtons>
                <AreaReset>
                    <ResetText onPress={() => navigation.navigate('Reset')}>
                        Esqueceu sua senha?
                    </ResetText>
                </AreaReset>
                <AreaButtons>
                    <CreateAccount activeOpacity={0.7} onPress={() => navigation.navigate('SignUp')}>
                        <CreateAccountText>Crie uma conta agora.</CreateAccountText>
                    </CreateAccount>
                </AreaButtons>
            </Container>
        </Background>
    );
}
