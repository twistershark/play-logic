import React, { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Container, Title, Button, ButtonText } from './styles';

const Dashboard: React.FC = () => {
  const { navigate } = useNavigation();

  const handleButtonPress = useCallback(() => {
    navigate('Profile');
  }, []);
  
  return (
    <Container>
      <Title>Blincadeirinha</Title>
      <Button
        onPress={handleButtonPress}
      >
        <ButtonText>Botão</ButtonText>
      </Button>

    </Container>
  
  );
}

export default Dashboard;