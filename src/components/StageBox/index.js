import React from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';

import {useNavigation} from '@react-navigation/native'

import Done from '../../assets/done.png'
import LockedPadlock from '../../assets/lockedPadlock.png'
import UnlockedPadlock from '../../assets/unlockedPadlock.png'

const StageBox = ({id, status}) =>  {
  const navigation = useNavigation(); 
  
  return (
    <View style = {styles.container}>
      <TouchableOpacity onPress = { () => navigation.navigate(`Stage${id}`)}> 
        <View style = {[styles.box, id%2==0? {backgroundColor: '#FFE342'}: ' ']}>  
          <Text style = {styles.text}>{id}</Text>
          <View style = {styles.status}>
            <Image source = {status>0?  (status==1? UnlockedPadlock : LockedPadlock) : Done} style = {styles.image}/>
          </View>
        </View>     
      </TouchableOpacity>
    </View>
  )
}
const styles = EStyleSheet.create({
  container: {
    flex: 1
  },  
  box: {
    width: '6.2rem',
    height: '6.2rem',
    backgroundColor: '#592C15',
    borderRadius: '0.6rem',
    justifyContent: 'center',
    
  },
  text: {
    fontSize: '2rem',
    color: '#538900',
    alignSelf: 'center', 
    paddingTop: '1rem'

  },
  status: {
    alignItems: 'flex-end',
    paddingRight: '0.5rem',
    paddingTop: '0.4rem',
  },
  image: {
    width:'1.2rem',
    height: '1.2rem', 
  }
})


export default StageBox; 
