import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 50px;
  background: #592C15;
  border-radius: 10px;
  margin-top: 24px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
`;
