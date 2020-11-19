import React from 'react';

import { 
  SafeAreaView,  
  View, 
  TouchableOpacity,
  Image,
} from 'react-native';  
import EStyleSheet from 'react-native-extended-stylesheet';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import backArrow from '../../assets/backarrow.png';

import StageBox from '../../components/StageBox';

import ScreenOrientation, {LANDSCAPE} from 'react-native-orientation-locker/ScreenOrientation'; 

const Stage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView> 
      <ScreenOrientation orientation = {LANDSCAPE}></ScreenOrientation>
        <View style={styles.backNavigation}>
          <TouchableOpacity  onPress={() => navigation.goBack()}>
            <Image source={backArrow} />
          </TouchableOpacity>
        </View>
        <View style = {styles.stages}>
          <StageBox id = {1} status = {0}/> 
          <StageBox id = {2} status = {1}/> 
          <StageBox id = {3} status = {2}/> 
        </View> 
      
    </SafeAreaView>
  );
};

export default Stage;

const styles = EStyleSheet.create({
  backNavigation: {
    marginTop: '2rem',
    marginLeft: '0.75rem',
  },
  stages: { 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: '6rem', 
    marginLeft: '6rem',
    paddingHorizontal: 15, 
  }
});