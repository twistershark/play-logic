import React from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';

import Done from '../../assets/done.png'
import LockedPadlock from '../../assets/lockedPadlock.png'
import UnlockedPadlock from '../../assets/unlockedPadlock.png'

const StageBox = ({id}) =>  {
  return (
    <View style = {styles.container}>
      <TouchableOpacity> 
        <View style = {[styles.box, id%2==0? {backgroundColor: '#FFE342'}: ' ']}>  
          <Text style = {styles.text}>{id}</Text>
        </View>
        <View>
          <Image source = {Done}/> 
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
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center', 
  },

  text: {
    fontSize: '2.5rem',
    color: '#538900'
  }
})


export default StageBox; 
