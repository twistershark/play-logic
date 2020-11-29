import React, { useState } from 'react';
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

import map from '../../assets/mapas/mapa_completo.png';
import play from '../../assets/play.png';
import reset from '../../assets/reset.png';
import backArrow from '../../assets/backarrow.png';

const Stage = () => {
  const navigation = useNavigation();
  const [instruction, setInstruction] = useState([]);
  const array = [];

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
          <TouchableOpacity onPress={() => { navigation.goBack(); }}>
            <Image source={backArrow} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={play} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={reset} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10, marginHorizontal: 5 }}>
          <Main />
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

});

export default Stage;
