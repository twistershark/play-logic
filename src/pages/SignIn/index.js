import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Logo,
  FormContainer,
  SocialLoginContainer,
  SocialLogin,
  SocialLogo,
  SocialLoginText,
  SignUpButton,
  SignUpText,
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';
import googleLogo from '../../assets/social/google.png';
import facebookLogo from '../../assets/social/facebook.png';

import { useAuth } from '../../hooks/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const { login, googleLogin, facebookLogin } = useAuth();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Logo source={logoImg} />
          <FormContainer>
            <Input value={email} placeholder="Email" onChangeText={(userEmail) => setEmail(userEmail)} />
            <Input value={password} placeholder="Senha" onChangeText={(userPassword) => setPassword(userPassword)} secureTextEntry />
          </FormContainer>
          <Button onPress={() => login(email, password)}>Entrar</Button>

          <SocialLoginContainer>
            <SocialLogin onPress={() => googleLogin()}>
              <SocialLogo source={googleLogo} />
              <SocialLoginText>Entrar com a conta Google</SocialLoginText>
            </SocialLogin>

            <SocialLogin onPress={() => facebookLogin()}>
              <SocialLogo source={facebookLogo} />
              <SocialLoginText>Entrar com Facebook</SocialLoginText>
            </SocialLogin>
          </SocialLoginContainer>

          <SignUpButton onPress={() => navigation.navigate('SignUp')}>
            <SignUpText>Não tem cadastro? Cadastre-se aqui!</SignUpText>
          </SignUpButton>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
