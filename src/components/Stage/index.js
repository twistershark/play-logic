import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import EStyleSheet from 'react-native-extended-stylesheet'; 

import map from '../../assets/mapas/Mapa_Ver3_semBorda.png';

const Stage = () => {
  return (
    <SafeAreaView style = {styles.container}> 
      <View>
          <ImageBackground source = {map} style = {styles.imgMap}>
          </ImageBackground>
          <View>

          </View>
      </View>
      <View>
          <Text>Área da main</Text>
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
  }

})

export default Stage;
