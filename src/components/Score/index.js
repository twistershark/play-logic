import React, { useState } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';

import menu from '../../assets/menu.png';
import nextFase from '../../assets/nextFase.png';
import scoreText from '../../assets/Score.png';
import star from '../../assets/star.png';
import noStar from '../../assets/emptyStar.png';
import { useAction } from '../../hooks/actions';

const ScorePage = ({
  isVisible, score, id, handleCloseModal,
}) => {
  const [visible, setVisible] = useState(isVisible);
  Orientation.lockToLandscape();
  const navigation = useNavigation();
  const { handleReset } = useAction();

  const returnToStages = () => {
    handleReset();
    navigation.navigate('Stages');
    setVisible(false);
  };
  return (
    <Modal isVisible={visible} transparent>
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
            <TouchableOpacity onPress={returnToStages} style={styles.button}>
              <Image source={menu} />
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
    marginVertical: 40,
    marginHorizontal: 60,
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
