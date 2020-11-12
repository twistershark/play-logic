import React from 'react';

import {
  Container,
  Title,
  Logout,
  LogoutText,
} from './styles';

import { useAuth } from '../../hooks/auth';
import { Text ,TouchableOpacity} from 'react-native'

const Dashboard = ({navigation}) => {
  const { logout } = useAuth();

  return (
    <Container>
      <Title>Dashboard</Title>
      <Logout onPress={() => logout()}>
        <LogoutText>LogOut</LogoutText>
      </Logout>
      <TouchableOpacity onPress = { () => navigation.navigate("Profile")}> 
      <Text>Profile</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Dashboard;
