import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet, Image} from 'react-native'; 

const MainList = () => {
  const data = [
    {key: 1, value: 0}, {key: 2, value: 0}, {key: 3, value: 0}, {key: 4, value: 0},
    {key: 5, value: 0}, {key: 6, value: 0}, {key: 7, value: 0}, {key: 8, value: 0}];  

  return (
    <View>
      <Text style = {styles.title}>MAIN</Text>
     <FlatList
     style = {{borderColor: '#592C15', borderWidth: 3}}
      data = {data}
      numColumns = {4}
      renderItem = {({item}) => <View style = {styles.item}> 
        <Image source = {null}/> 
      </View>}/>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontWeight:'bold',
    fontSize:16, 

  },
  item: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFE342',
    margin: 4
  }
})
export default MainList;