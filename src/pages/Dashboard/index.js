import React from 'react';

import {
  Container,
  Logo,
  LogoView,
  Play,
  PlayNavigation,
  Profile,
  TopView,
  User,
  UserName,
  Volume,
  VolumeView,
} from './styles';

import { useAuth } from '../../hooks/auth';

import  logoImg  from '../../assets/logo.png'
import  volumeOn  from '../../assets/volumeON.png'
import  volumeOff  from '../../assets/volumeOFF.png'
import  iconUser  from '../../assets/IconUser.png'
import play from '../../assets/IconPlay.png'



const Dashboard = ({navigation}) => {
  let volume = true;
  return (
    <Container>
      <TopView>
        <Profile onPress = {() => {}}>
          <User source = {iconUser}/>
          <UserName>Nome do usuário</UserName>
        </Profile>
        <VolumeView onPress = {(volume) => {}}>
          <Volume source = { volume? volumeOn : volumeOff}/>
        </VolumeView>
      </TopView>
      <LogoView>
        <Logo  source = {logoImg}/>
      </LogoView>
      <PlayNavigation onPress = {() => {}}>
        <Play source = {play}/>
      </PlayNavigation>
    </Container>
  );
};

export default Dashboard;
