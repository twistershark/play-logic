import React from 'react';

import {
  Container,
  Title,
  Logout,
  Logo,
  LogoutText,
} from './styles';

import { useAuth } from '../../hooks/auth';
import  logoImg  from '../../assets/logo.png'

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Logo  source = {logoImg}/>
    </Container>
  );
};

export default Dashboard;
