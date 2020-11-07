import React from 'react';

import { Container, Logo, FormContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

const SignIn = () => (
  <Container>
    <Logo source={logoImg} />
    <FormContainer>
      <Input placeholder="Email" />
      <Input placeholder="Senha" />
      <Button>Entrar</Button>
    </FormContainer>
  </Container>
);

export default SignIn;
