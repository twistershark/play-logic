import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;

  padding: 0 24px;
`;

export const Logo = styled.Image`
  margin-top: 80px;
`;

export const FormContainer = styled.View`
  margin-top: 40px;
`;

export const LoginButton = styled.TouchableOpacity``;

export const SocialLoginContainer = styled.View`
  margin-top: 32px;
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

export const SignUpButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const SignUpText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;
