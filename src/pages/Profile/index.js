import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, FlatList } from 'react-native';

// import { Container } from './styles';
import backArrow from '../../assets/backarrow.png'
import userImage from '../../assets/userImage.png'

import ScoreList from '../../components/ScoreList'
const Profile = ({navigation}) => {
  const score = [
    {key: '1', star:3},
    {key: '2', star:2},
    {key: '3', star:-1}, 
  ]

  return(
    <View style = {styles.container}>
        <TouchableOpacity onPress = {() => navigation.goBack()} >
        <Image source = {backArrow} style = {styles.BackNavigation}/>
        </TouchableOpacity>
        <View style = {styles.profile}> 
          <View style = {styles.profileImage}>
              <Image source = {userImage} style = {styles.userImage}/>
          </View>
          <Text style = {styles.userName }>Nome do Usuário</Text>
          <TouchableOpacity>
            <Text style = {{color: 'white'}}>Alterar</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.score}>
          <ScoreList score= {score} /> 
        </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
      flex:1, 
    
  },
  BackNavigation: {
    marginTop: 32, 
    marginLeft: 12,     
  },
  profile: {
    alignSelf: 'center',
    alignItems: 'center', 
    marginTop: 15,
  },  
  profileImage: {
  width: 200,
  height:200,
  borderRadius:100,
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  },
  userImage: {
    width:170,
    height: 170,
  },
  userName: {
    fontSize: 24,
    color: '#ffffff'
  },
  score: {
    marginTop: 66, 
    alignItems: 'center', 

  }
})

export default Profile;
