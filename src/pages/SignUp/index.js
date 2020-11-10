import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  BackNavigation,
  BackArrow,
  Container,
  Title,
  FormContainer,
  InformationText,
  SocialLoginContainer,
  SocialLogin,
  SocialLogo,
  SocialLoginText,
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import backArrow from '../../assets/backarrow.png';
import googleLogo from '../../assets/social/google.png';
import facebookLogo from '../../assets/social/facebook.png';

import { useAuth } from '../../hooks/auth';

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();

  const navigation = useNavigation();

  const { register, googleLogin, facebookLogin } = useAuth();

  const handleSignUp = useCallback(() => {
    if (password === passwordConfirmation) {
      register(email, password);
    }
  }, [register, email, password, passwordConfirmation]);

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
        <BackNavigation onPress={() => navigation.goBack()}>
          <BackArrow source={backArrow} />
        </BackNavigation>
        <Container>
          <Title>Cadastre-se</Title>
          <FormContainer>
            <Input value={email} placeholder="Email" onChangeText={(userEmail) => setEmail(userEmail)} />
            <Input value={password} placeholder="Senha" onChangeText={(userPassword) => setPassword(userPassword)} secureTextEntry />
            <Input value={passwordConfirmation} placeholder="Confirmar Senha" onChangeText={(userPasswordConfirmation) => setPasswordConfirmation(userPasswordConfirmation)} secureTextEntry />
          </FormContainer>

          <InformationText>
            Ao registrar-se você concorda com nosso termos de serviço e política de privacidade
          </InformationText>

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

          <Button onPress={() => handleSignUp()}>Cadastrar</Button>

        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
