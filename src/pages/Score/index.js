import React, { useState } from 'react';

import {
  View,
  Image,
  Text,
} from 'react-native';

import Modal from 'react-native-modal';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';

import menu from '../../assets/menu.png';
import nextFase from '../../assets/nextFase.png';
import reset from '../../assets/reset.png';
import score from '../../assets/Score.png';

const ScorePage = () => {
  const [visible, setVisible] = useState(false);
  Orientation.lockToLandscape();
  const navigation = useNavigation();

  return (
    <View style={{
      backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center',
    }}
    >
      <TouchableOpacity onPress={() => { setVisible(true); }}>
        <Text>
          Clicar
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={visible}
      >
        <View style={styles.modal}>
          <View style={{ padding: 20, alignItems: 'center' }}>
            <View style={styles.container}>
              <Image source={score} />
            </View>
            <View style={styles.rowButtons}>
              <TouchableOpacity onPress={() => { setVisible(false); }} style={styles.button}>
                <Image source={reset} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Stages')} style={styles.button}>
                <Image source={menu} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} style={styles.button}>
                <Image source={nextFase} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>

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
  viewScore: {
  },
  rowButtons: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  button: {
    marginLeft: 40,
    marginRight: 40,

  },

});
