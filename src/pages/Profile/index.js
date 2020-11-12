import React from 'react';

import {
Container, 
BackNavigation,
BackArrow,
ProfileView,
ProfileImage,
UserImage,
UserName,
Options,
TextOptions,
Score
} from './styles';

import backArrow from '../../assets/backarrow.png'
import userImage from '../../assets/userImage.png'

import ScoreList from '../../components/ScoreList'

const Profile = ({navigation}) => {
  const score = [
    {key: '1', star:3},
    {key: '2', star:2},
    {key: '3', star:-1}, 
  ]
  const user = true; 
  return(
      <Container>
          <BackNavigation onPress = {() => navigation.goBack()} >
            <BackArrow source = {backArrow}/>
          </BackNavigation>
          <ProfileView> 
            <ProfileImage>
                <UserImage source = {userImage}/>
            </ProfileImage>
            <UserName>Nome do Usuário</UserName>
            <Options>
                <TextOptions>{ user? "Logout" : "Login" }</TextOptions>
            </Options>
          </ProfileView>
          <Score>
            <ScoreList score= {score} /> 
          </Score>
      </Container>
  );

};



export default Profile;
