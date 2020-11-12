import React from 'react'
import { View, Text, FlatList, StyleSheet, Image} from 'react-native'

import {container } from './styles'

import emptyStar from '../../assets/emptyStar.png'
import star from '../../assets/star.png'
import noStar from '../../assets/null.png'



const scoreList = ({score}) => {
  const renderItem = (item) => {
    return (
      <View style = {[item.key%2? {backgroundColor: '#592C15'}: {backgroundColor: '#7F4726'}, styles.itemList]} >
          <View style = {styles.itemView}>
            <Text style = {styles.text}>{item.key}</Text>
          </View>
        <View style = {styles.itemView}>
          <Image source = {item.star>-1? (item.star>0? star : emptyStar): noStar} style = {item.star>-1? styles.imageScore: {width:30, height:5, marginLeft: 30}}/>
          <Image source = {item.star>-1? (item.star>1? star : emptyStar): ''} style = {styles.imageScore}/>
          <Image source = {item.star>-1? (item.star>2? star : emptyStar): ''} style = {styles.imageScore}/>
        </View>
      </View>
    )
  }
  return (
    <View style = {styles.container}> 
      <View style = {styles.header} > 
        <View style = {styles.itemHeader}><Text style = {styles.text}>FASE</Text></View>
        <View style = {styles.itemHeader}><Text style = {styles.text}>PONTOS</Text></View> 
      </View>
      <FlatList data = {score}
      renderItem = {({item}) => renderItem(item)} /> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width:250,
    height:160,
  },
  header: {
    flexDirection: 'row', 
    backgroundColor: '#1A260180',
    height:40,
  },
  itemHeader: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1, 
    borderColor:'black', 
  },
  itemList: {
    height:40, 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
  itemView: {
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
    padding: 15
  },
  imageScore: {
    width: 30,
    height: 30,
    marginHorizontal: 2 
  }
})

export default scoreList; 

