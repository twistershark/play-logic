import React, { useCallback } from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';

import ActionBox from './ActionBox';
import MoveBox from './MoveBox';
import IfBox from './IfBox';
import LoopBox from './LoopBox';
import Main from './Main';
import Loop from './Loop';

import map from '../../assets/mapas/mapa_completo.png';
import play from '../../assets/play.png';
import reset from '../../assets/reset.png';
import backArrow from '../../assets/backarrow.png';

import { useAction } from '../../hooks/actions';

const Stage = () => {
  const navigation = useNavigation();
  const { handleReset } = useAction();

  const handleGoBack = useCallback(() => {
    handleReset();
    navigation.goBack();
  }, [navigation, handleReset]);

  const handleGameReset = useCallback(() => {
    handleReset();
  }, [handleReset]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ImageBackground source={map} style={styles.imgMap} />
        <View style={styles.instructionSection}>
          <ActionBox />
          <MoveBox />
          <IfBox />
          <LoopBox />
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.runOptions}>
          <TouchableOpacity onPress={handleGoBack}>
            <Image source={backArrow} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={play} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGameReset}>
            <Image source={reset} />
          </TouchableOpacity>
        </View>
        <View style={styles.runSection}>
          <Main />
          <Loop />
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
    marginLeft: '0.8rem',
  },
  instructionSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '0.8rem',
    marginHorizontal: '1.8rem',
  },
  section: {
    flex: 1,
  },
  runOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  runSection: {
    flex: 1,
    justifyContent: 'space-around',
    marginTop: -5,
    marginHorizontal: 5,
  },

});

export default Stage;
