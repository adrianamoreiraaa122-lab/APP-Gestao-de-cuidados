import { useNavigation } from "@react-navigation/native";
import {
    Access,
    AccessText,
    AreaButtons,
    AreaInput,
    Background,
    Container,
    CreateAccount,
    CreateAccountText,
    Input,
    Logo,
    LogoName
} from "./styles";

export default function SignUp() {

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
                        placeholder="Digite seu nome completo"
                        placeholderTextColor="#6C63FF"
                    />                
                </AreaInput>
                <AreaInput>
                    <Input
                        placeholder="Digite seu CPF"
                        placeholderTextColor="#6C63FF"
                    />                
                </AreaInput>
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
                <AreaInput>
                    <Input
                        placeholder="Repita sua senha"
                        placeholderTextColor="#6C63FF"
                    />                
                </AreaInput>


                <AreaButtons>
                    <Access activeOpacity={0.85} onPress={() => navigation.navigate('SignIn')}>
                        <AccessText>Criar conta</AccessText>
                    </Access>

                    <CreateAccount activeOpacity={0.7} onPress={() => navigation.navigate('SignIn')}>
                        <CreateAccountText>Já tem uma conta?</CreateAccountText>
                    </CreateAccount>
                </AreaButtons>
            </Container>
        </Background>
    );
}
