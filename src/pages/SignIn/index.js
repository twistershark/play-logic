import React, { useCallback, useState } from 'react';

import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Orientation from 'react-native-orientation-locker';

import { useNavigation } from '@react-navigation/native';

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

  Orientation.lockToPortrait();

  const handleLogIn = useCallback(() => {
    if (email.length && password.length) {
      login(email, password);
    }
  }, [email, login, password]);

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
        <SafeAreaView style={styles.container}>
          <Image style={styles.logo} source={logoImg} />
          <View style={styles.formContainer}>
            <Input value={email} placeholder="Email" onChangeText={(userEmail) => setEmail(userEmail)} />
            <Input value={password} placeholder="Senha" onChangeText={(userPassword) => setPassword(userPassword)} secureTextEntry />
          </View>
          <Button onPress={handleLogIn}>Entrar</Button>

          <View style={styles.socialLoginContainer}>
            <TouchableOpacity style={styles.socialLogin} onPress={() => googleLogin()}>
              <Image style={styles.socialLogo} source={googleLogo} />
              <Text style={styles.socialLoginText}>Entrar com a conta Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialLogin} onPress={() => facebookLogin()}>
              <Image style={styles.socialLogo} source={facebookLogo} />
              <Text style={styles.socialLoginText}>Entrar com Facebook</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>Não tem cadastro? Cadastre-se aqui!</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
  },

  logo: {
    marginTop: '7rem',
  },

  formContainer: {
    marginTop: '2.5rem',
  },

  loginButton: {},

  socialLoginContainer: {
    marginTop: '2rem',
    width: '100%',
  },

  socialLogin: {
    backgroundColor: '#426B00',
    borderRadius: '0.625rem',
    width: '100%',
    height: '3.125rem',
    marginTop: '1rem',
    flexDirection: 'row',
    alignItems: 'center',
  },

  socialLogo: {
    marginRight: '3.125rem',
    marginLeft: '1.25rem',
  },

  socialLoginText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  signUpButton: {
    marginTop: '2.5rem',
  },

  signUpText: {
    fontSize: '1rem',
    color: '#fff',
    fontWeight: 'bold',
  },
});
