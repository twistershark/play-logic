import styled from 'styled-components/native';

export const BackNavigation = styled.TouchableOpacity`
  margin-top: 32px;
  margin-left: 12px;
`;

export const BackArrow = styled.Image``;

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;

  padding: 0 24px;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #fff;
`;

export const FormContainer = styled.View`
  margin-top: 20px;
`;

export const InformationText = styled.Text`
  margin-top: 8px;
  font-size: 12px;
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

export const LoginButton = styled.TouchableOpacity``;

export const SocialLoginContainer = styled.View`
  margin-top: 16px;
  width: 100%;
`;

export const SocialLogin = styled.TouchableOpacity`
  background: #426B00;
  border-radius: 10px;
  width: 100%;
  height: 50px;
  margin-top: 16px;
  flex-direction: row;
  align-items: center;

`;

export const SocialLogo = styled.Image`
  margin-right: 50px;
  margin-left: 20px;
`;

export const SocialLoginText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
