import React, { useState } from 'react';

import { 
  SafeAreaView, 
  Text, 
  TouchableOpacity ,
  Image,
  View,
  Layout
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import  logoImg  from '../../assets/logo.png'
import  volumeOn  from '../../assets/volumeON.png'
import  volumeOff  from '../../assets/volumeOFF.png'
import  iconUser  from '../../assets/IconUser.png'
import play from '../../assets/IconPlay.png'

import ScreenOrientation, {PORTRAIT} from 'react-native-orientation-locker/ScreenOrientation';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigation = useNavigation();
  const [imageVolume, setImageVolume] = useState(true);

  const setImage =() =>{
    setImageVolume(!imageVolume);
  }
  
  return (
    <SafeAreaView>
      <ScreenOrientation orientation = {PORTRAIT}/>
      <View style = {styles.topArea}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source = {iconUser}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={setImage}>
          <Image source = {imageVolume? volumeOn : volumeOff}/>
        </TouchableOpacity>
      </View>
      <View style = {styles.bodyArea}>
        <Image style = {styles.logo} source = {logoImg}/>
        <TouchableOpacity onPress = {() => navigation.navigate('Stage')}>
            <Image style = {styles.playImage} source = {play}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    
  );
};

export default Dashboard;

const styles = EStyleSheet.create({
  logo: {
    alignItems: 'center',
    marginTop: '7rem'
  },

  playImage: {
    alignItems: 'center',
    marginTop: '8rem',
  },
  topArea: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bodyArea: {
    alignItems: 'center',
    justifyContent: 'center'
  },

});