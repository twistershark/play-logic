import React, { useState } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import Modal from 'react-native-modal';
import EStyleSheet from 'react-native-extended-stylesheet';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';

import menu from '../../assets/menu.png';
import nextFase from '../../assets/nextFase.png';
import reset from '../../assets/reset.png';
import scoreText from '../../assets/Score.png';
import star from '../../assets/star.png';
import noStar from '../../assets/emptyStar.png';

const ScorePage = ({ isVisible, score }) => {
  const [visible, setVisible] = useState(isVisible);
  Orientation.lockToLandscape();
  const navigation = useNavigation();

  return (
    <Modal isVisible={visible}>
      <View style={styles.modal}>
        <View style={{ padding: 15, alignItems: 'center' }}>
          <View style={styles.container}>
            <Image source={scoreText} />
          </View>
          <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
            <Image source={score >= 1 ? star : noStar} style={styles.starView} />
            <Image source={score >= 2 ? star : noStar} style={styles.starView} />
            <Image source={score === 3 ? star : noStar} style={styles.starView} />
          </View>
          <View style={styles.rowButtons}>
            <TouchableOpacity onPress={() => setVisible(false)} style={styles.button}>
              <Image source={reset} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Stages'); setVisible(false); }} style={styles.button}>
              <Image source={menu} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.button}>
              <Image source={nextFase} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ScorePage;

const styles = EStyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  container: {
    flex: 1,
  },
  rowButtons: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 40,
  },
  starView: {
    marginHorizontal: 10,
  },

});
