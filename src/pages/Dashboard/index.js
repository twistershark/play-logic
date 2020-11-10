import React from 'react';

import {
  Container,
  Title,
  Logout,
  LogoutText,
} from './styles';

import { useAuth } from '../../hooks/auth';

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Title>Dashboard</Title>
      <Logout onPress={() => logout()}>
        <LogoutText>LogOut</LogoutText>
      </Logout>
    </Container>
  );
};

export default Dashboard;
