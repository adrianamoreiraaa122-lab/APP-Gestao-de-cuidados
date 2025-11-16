/* eslint-disable import/no-named-as-default */

import styled from 'styled-components/native';

export const Background = styled.View`
    flex: 1;
    background-color: #FFFFFF;
    justify-content: center;
    align-items: center;
`;

export const Container = styled.View`
    width: 100%;
    align-items: center;
`;

export const Logo = styled.Image`
    width: 280px;
    height: 200px;
    margin-bottom: 36px;
`;

export const LogoName = styled.Text`
    color: #6C63FF;
    font-size: 36px;
    font-weight: 500;
    align-items: center;
    margin-bottom: 100px;
`;


export const AreaButtons = styled.View`
    width: 100%;
    align-items: center;
    gap: 28px;
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
