import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';

import Input from '../../components/Input';
import Button from '../../components/Button';

import backArrow from '../../assets/backarrow.png';
import googleLogo from '../../assets/social/google.png';
import facebookLogo from '../../assets/social/facebook.png';

import { useAuth } from '../../hooks/auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const navigation = useNavigation();

  const { register, googleLogin, facebookLogin } = useAuth();

  Orientation.lockToPortrait();

  const handleSignUp = useCallback(() => {
    if (password === passwordConfirmation && password.length) {
      if (email.length) {
        register(email, password);
      }
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
        <TouchableOpacity style={styles.backNavigation} onPress={() => navigation.goBack()}>
          <Image source={backArrow} />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.title}>Cadastre-se</Text>
          <View style={styles.formContainer}>
            <Input value={email} placeholder="Email" onChangeText={(userEmail) => setEmail(userEmail)} />
            <Input value={password} placeholder="Senha" onChangeText={(userPassword) => setPassword(userPassword)} secureTextEntry />
            <Input value={passwordConfirmation} placeholder="Confirmar Senha" onChangeText={(userPasswordConfirmation) => setPasswordConfirmation(userPasswordConfirmation)} secureTextEntry />
          </View>

          <Text style={styles.informationText}>
            Ao registrar-se você concorda com nosso termos de serviço e política de privacidade
          </Text>

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

          <Button onPress={() => handleSignUp()}>Cadastrar</Button>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = EStyleSheet.create({
  backNavigation: {
    marginTop: '2rem',
    marginLeft: '0.75rem',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
  },

  title: {
    marginTop: '1rem',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#fff',
  },

  formContainer: {
    marginTop: '1.25rem',
  },

  informationText: {
    marginTop: '0.5rem',
    fontSize: '0.75rem',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

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
});
