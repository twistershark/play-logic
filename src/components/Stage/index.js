import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context';
import EStyleSheet from 'react-native-extended-stylesheet'; 
import { useNavigation } from '@react-navigation/native';

import ActionBox from '../../components/ActionBox';
import MoveBox from '../../components/MoveBox'; 
import LoopBox from '../../components/LoopBox'; 
import IfBox from '../../components/IfBox'; 

import map from '../../assets/mapas/Mapa_Ver3_semBorda.png';
import play from  '../../assets/play.png';
import reset from  '../../assets/reset.png';
import backArrow from '../../assets/backarrow.png';

const Stage = () => {

  const navigation = useNavigation(); 
  return (
    <SafeAreaView style = {styles.container}> 
      <View>
          <ImageBackground source = {map} style = {styles.imgMap}>
          </ImageBackground>
          <View style = {styles.instructionSection}>
            <ActionBox/> 
            <MoveBox/> 
            <IfBox/>
            <LoopBox/> 
          </View>
      </View>
      <View style = {styles.section}>
          <View style = { styles.runOptions}>
            <TouchableOpacity onPress =  {() => {navigation.goBack()}}>
              <Image source = {backArrow} style = {{width: 30, height: 30}}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source = {play}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source = {reset}/>
            </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>
  );
};

const styles = EStyleSheet.create({
  container: { 
    flexDirection: 'row', 
  },
  imgMap: {
    width: '29.3rem',
    height: '18.7rem',
    marginLeft: '0.8rem'
  },
  instructionSection: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    marginTop: '0.8rem',
  }, 
  section: {
    flex: 1,
  },
  runOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
  }
  
})

export default Stage;
