/* eslint-disable import/no-named-as-default */

import styled from 'styled-components/native';

export const Background = styled.View`
    flex: 1;
    background-color: #FFFFFF;
    justify-content: center;
    align-items: center;
`;

export const Container = styled.KeyboardAvoidingView`
    width: 100%;
    align-items: center;
`;

export const Logo = styled.Image`
    margin-top: 30px;
    width: 280px;
    height: 200px;
    margin-bottom: 36px;
`;

export const LogoName = styled.Text`
    color: #6C63FF;
    font-size: 36px;
    font-weight: 500;
    align-items: center;
    margin-bottom: 10px;
`;

export const AreaInput = styled.View`
    width: 80%;
    align-items: center;
`;

export const Input = styled.TextInput`
    width: 100%;
    align-items: center;
    border-width: 1px;
    border-radius: 6px;
    padding: 12px;
    border-color: #6C63FF;
    margin-bottom: 10px;
`;


export const AreaButtons = styled.View`
    width: 100%;
    align-items: center;
    gap: 10px;
    margin-top: 30px;
`;

export const Access = styled.TouchableOpacity`
    width: 80%;
    padding: 10px;
    border-radius: 6px;
    background-color: #6C63FF;
    align-items: center;
`;

export const AccessText = styled.Text`
    color: #FFFFFF;
    font-size: 20px;
`;

export const CreateAccount = styled.TouchableOpacity`
    width: 80%;
    padding: 15px;
    border-radius: 10px;
    align-items: center;
`;

export const CreateAccountText = styled.Text`
    color: #6C63FF;
    font-size: 16px;
`;
