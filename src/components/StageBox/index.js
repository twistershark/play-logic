import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';


const StageBox = ({id}) =>  {
  return (
    <View style = {styles.container}>
      <TouchableOpacity> 
        <View style = {[styles.box, id%2==0? {backgroundColor: '#FFE342'}: ' ']}>  
          <Text style = {styles.text}>{id}</Text>
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
    width: 100,
    height: 100,
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
