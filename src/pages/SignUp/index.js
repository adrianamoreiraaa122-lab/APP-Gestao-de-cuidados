import { useState, useContext } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";

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

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const { register } = useContext(AuthContext);

    async function handleRegister() {

        if (!name || !cpf || !email || !password || !repeatPassword) {
            Alert.alert("Atenção", "Preencha todos os campos!");
            return;
        }

        if (password !== repeatPassword) {
            Alert.alert("Senhas diferentes", "As senhas não coincidem!");
            return;
        }

        try {
            await register(name, cpf, email, password);

            Alert.alert("Sucesso!", "Conta criada com sucesso!", [
                {
                    text: "OK",
                    onPress: () => navigation.navigate("SignIn")
                }
            ]);

        } catch (error) {
            console.log(error);
            Alert.alert("Erro ao criar conta", error.message);
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Background>
                    <Container>
                        <Logo source={require('../../assets/logo_healthsenior.png')} />

                        <LogoName>Health Senior</LogoName>

                        <AreaInput>
                            <Input
                                placeholder="Digite seu nome completo"
                                placeholderTextColor="#6C63FF"
                                value={name}
                                onChangeText={setName}
                            />
                        </AreaInput>

                        <AreaInput>
                            <Input
                                placeholder="Digite seu CPF"
                                placeholderTextColor="#6C63FF"
                                value={cpf}
                                onChangeText={setCpf}
                            />
                        </AreaInput>

                        <AreaInput>
                            <Input
                                placeholder="Digite seu e-mail"
                                placeholderTextColor="#6C63FF"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </AreaInput>

                        <AreaInput>
                            <Input
                                placeholder="Digite sua senha"
                                placeholderTextColor="#6C63FF"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </AreaInput>

                        <AreaInput>
                            <Input
                                placeholder="Repita sua senha"
                                placeholderTextColor="#6C63FF"
                                secureTextEntry
                                value={repeatPassword}
                                onChangeText={setRepeatPassword}
                            />
                        </AreaInput>

                        <AreaButtons>
                            <Access activeOpacity={0.85} onPress={handleRegister}>
                                <AccessText>Criar conta</AccessText>
                            </Access>

                            <CreateAccount
                                activeOpacity={0.7}
                                onPress={() => navigation.navigate('SignIn')}
                            >
                                <CreateAccountText>Já tem uma conta?</CreateAccountText>
                            </CreateAccount>
                        </AreaButtons>
                    </Container>
                </Background>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
