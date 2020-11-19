import React from 'react';

import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { useNavigation } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
// import { useAuth } from '../../hooks/auth';

import backArrow from '../../assets/backarrow.png';

import StageBox from '../../components/StageBox';

const Stage = () => {
  Orientation.lockToLandscape();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backNavigation} onPress={() => navigation.goBack()}>
        <Image source={backArrow} />
      </TouchableOpacity>
      <View style={styles.stages}>
        <StageBox id={1} status={0} />
        <StageBox id={2} status={1} />
        <StageBox id={3} status={2} />
      </View>
    </SafeAreaView>

  );
};

export default Stage;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },

  backNavigation: {
    marginTop: '2rem',
    marginLeft: '0.75rem',
  },
  stages: {
    flex: 1,
    marginTop: '-2rem',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: '1rem',
  },
});
