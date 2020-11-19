import React from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';

import Done from '../../assets/done.png'
import LockedPadlock from '../../assets/lockedPadlock.png'
import UnlockedPadlock from '../../assets/unlockedPadlock.png'

const StageBox = ({id, status}) =>  {
  return (
    <View style = {styles.container}>
      <TouchableOpacity> 
        <View style = {[styles.box, id%2==0? {backgroundColor: '#FFE342'}: ' ']}>  
          <Text style = {[styles.text, {alignSelf: 'center', paddingTop: 15}]}>{id}</Text>
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
    color: '#538900'
  },
  status: {
    alignItems: 'flex-end',
    paddingRight: 8,
    paddingTop: 5,
  },
  image: {
    width:20,
    height: 20, 
    
  }

})


export default StageBox; 
